"use client";

import { useState } from "react";
import type { AuditFindingRow } from "@/lib/supabase/types";

const priorityLabel = {
  high: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority",
} as const;

const priorityDot = {
  high: "bg-red-600",
  medium: "bg-amber-500",
  low: "bg-emerald-600",
} as const;

export function FindingCard({
  finding,
  auditId,
  showFixCta,
}: {
  finding: Pick<
    AuditFindingRow,
    | "id"
    | "title"
    | "issue"
    | "why_it_matters"
    | "recommended_fix"
    | "priority"
    | "difficulty"
    | "category"
  >;
  auditId: string;
  showFixCta: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function requestFix() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/audit/${auditId}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ findingTitle: finding.title }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not send request.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Network error.");
    }
    setBusy(false);
  }

  return (
    <article className="border-b border-steel-light/40 py-6 last:border-0">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-block h-2.5 w-2.5 rounded-full ${priorityDot[finding.priority]}`}
          aria-hidden
        />
        <h3 className="font-display text-lg font-semibold text-charcoal">
          {finding.title}
        </h3>
      </div>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-steel">
        {priorityLabel[finding.priority]} · {finding.category} ·{" "}
        {finding.difficulty} fix
      </p>
      <dl className="mt-4 space-y-3 text-sm leading-relaxed text-neutral">
        <div>
          <dt className="font-semibold text-charcoal">Issue</dt>
          <dd className="mt-0.5">{finding.issue}</dd>
        </div>
        <div>
          <dt className="font-semibold text-charcoal">Why it matters</dt>
          <dd className="mt-0.5">{finding.why_it_matters}</dd>
        </div>
        <div>
          <dt className="font-semibold text-charcoal">Recommended fix</dt>
          <dd className="mt-0.5">{finding.recommended_fix}</dd>
        </div>
      </dl>
      {showFixCta ? (
        <div className="mt-4">
          {done ? (
            <p className="text-sm font-medium text-primary">
              Request received — I&apos;ll follow up soon.
            </p>
          ) : (
            <button
              type="button"
              onClick={requestFix}
              disabled={busy}
              className="bg-ember px-4 py-2 text-sm font-semibold text-charcoal hover:bg-ember-deep disabled:opacity-60"
            >
              {busy ? "Sending…" : "Fix This For Me"}
            </button>
          )}
          {error ? (
            <p className="mt-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
