import OpenAI from "openai";
import { FINDING_TEMPLATES } from "./templates";
import type { FindingCandidate, ScoredFinding } from "./types";
import { PRIORITY_ORDER } from "./scanners";

function applyTemplate(c: FindingCandidate): {
  issue: string;
  why_it_matters: string;
  recommended_fix: string;
  title: string;
} {
  const t = FINDING_TEMPLATES[c.code];
  return {
    title: c.title || t.title,
    issue: t.issue,
    why_it_matters: t.why_it_matters,
    recommended_fix: t.recommended_fix,
  };
}

/**
 * Enriches findings with plain-English copy.
 * Never receives or returns numeric scores.
 */
export async function explainFindings(
  candidates: FindingCandidate[],
  siteContext: { url: string; title: string; businessHint?: string | null },
): Promise<Omit<ScoredFinding, "is_unlocked_only" | "sort_order">[]> {
  const baseline = candidates.map((c) => {
    const t = applyTemplate(c);
    return {
      ...c,
      title: t.title,
      issue: t.issue,
      why_it_matters: t.why_it_matters,
      recommended_fix: t.recommended_fix,
    };
  });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || candidates.length === 0) {
    return baseline;
  }

  try {
    const openai = new OpenAI({ apiKey });
    const payload = candidates.map((c) => ({
      code: c.code,
      title: c.title,
      category: c.category,
      priority: c.priority,
      context: c.context || {},
      default: applyTemplate(c),
    }));

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You rewrite website audit findings for local business owners in plain English. Return JSON: { \"findings\": [ { \"code\": string, \"title\": string, \"issue\": string, \"why_it_matters\": string, \"recommended_fix\": string } ] }. Do not invent new issue codes. Do not mention technical jargon (LCP, CLS, INP, JSON-LD) unless briefly explained. Keep each field to 1-2 sentences. Be specific to the site context when possible.",
        },
        {
          role: "user",
          content: JSON.stringify({
            website: siteContext.url,
            pageTitle: siteContext.title,
            businessHint: siteContext.businessHint || null,
            findings: payload,
          }),
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) return baseline;

    const parsed = JSON.parse(raw) as {
      findings?: {
        code: string;
        title?: string;
        issue?: string;
        why_it_matters?: string;
        recommended_fix?: string;
      }[];
    };

    const byCode = new Map(
      (parsed.findings || []).map((f) => [f.code, f] as const),
    );

    return baseline.map((b) => {
      const ai = byCode.get(b.code);
      if (!ai) return b;
      return {
        ...b,
        title: ai.title?.trim() || b.title,
        issue: ai.issue?.trim() || b.issue,
        why_it_matters: ai.why_it_matters?.trim() || b.why_it_matters,
        recommended_fix: ai.recommended_fix?.trim() || b.recommended_fix,
      };
    });
  } catch (err) {
    console.error("AI explain failed, using templates:", err);
    return baseline;
  }
}

export function finalizeFindings(
  explained: Omit<ScoredFinding, "is_unlocked_only" | "sort_order">[],
): ScoredFinding[] {
  const sorted = [...explained].sort((a, b) => {
    const pd = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (pd !== 0) return pd;
    return a.code.localeCompare(b.code);
  });

  // Dedupe by code (first wins)
  const seen = new Set<string>();
  const unique: ScoredFinding[] = [];
  for (const f of sorted) {
    if (seen.has(f.code)) continue;
    seen.add(f.code);
    unique.push({
      ...f,
      is_unlocked_only: true,
      sort_order: unique.length,
    });
  }

  // Top 5 free (prefer high priority first — already sorted)
  const freeCount = Math.min(5, unique.length);
  for (let i = 0; i < freeCount; i++) {
    unique[i].is_unlocked_only = false;
  }

  return unique;
}
