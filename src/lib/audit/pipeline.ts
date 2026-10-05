import { customAlphabet } from "nanoid";
import { crawlSite } from "./crawler";
import { fetchPageSpeedMetrics } from "./pagespeed";
import {
  buildCategoryScores,
  scanConversion,
  scanLocal,
  scanMobile,
  scanPerformance,
  scanSeo,
  scanTrust,
} from "./scanners";
import { explainFindings, finalizeFindings } from "./ai";
import { assertPublicHost, tryNormalizeUrl } from "./url";
import type { PipelineResult } from "./types";
import { createServiceClient } from "../supabase/server";
import type { Json } from "../supabase/types";
import type { AuditSource } from "../supabase/types";

const slugAlphabet = customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  10,
);

export function makePublicSlug(hint?: string | null): string {
  const base = (hint || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
  const id = slugAlphabet();
  return base ? `${base}-${id}` : id;
}

export async function runAuditPipeline(
  url: string,
  options?: { businessName?: string | null },
): Promise<PipelineResult> {
  const normalized = tryNormalizeUrl(url);
  if ("error" in normalized) {
    throw new Error(normalized.error);
  }

  await assertPublicHost(normalized.hostname);

  const [crawl, psi] = await Promise.all([
    crawlSite(normalized.href, normalized.origin),
    fetchPageSpeedMetrics(normalized.href),
  ]);

  const seo = scanSeo(crawl);
  const performance = scanPerformance(psi);
  const local = scanLocal(crawl);
  const conversion = scanConversion(crawl);
  const trust = scanTrust(crawl);
  const mobile = scanMobile(crawl, psi);

  const allCandidates = [
    ...seo.findings,
    ...performance.findings,
    ...local.findings,
    ...conversion.findings,
    ...trust.findings,
    ...mobile.findings,
  ];

  const highCount = allCandidates.filter((f) => f.priority === "high").length;
  const scores = buildCategoryScores({
    seo: seo.score,
    performance: performance.score,
    local: local.score,
    conversion: conversion.score,
    mobile: mobile.score,
    trust: trust.score,
    highCount,
  });

  const explained = await explainFindings(allCandidates, {
    url: normalized.href,
    title: crawl.homepage.title,
    businessHint: options?.businessName,
  });
  let findings = finalizeFindings(explained);

  const mediumCount = findings.filter((f) => f.priority === "medium").length;
  const lowCount = findings.filter((f) => f.priority === "low").length;
  // Recompute high after dedupe
  const highAfter = findings.filter((f) => f.priority === "high").length;
  const finalScores = buildCategoryScores({
    seo: seo.score,
    performance: performance.score,
    local: local.score,
    conversion: conversion.score,
    mobile: mobile.score,
    trust: trust.score,
    highCount: highAfter,
  });

  return {
    scores: finalScores,
    findings,
    pages: crawl.pages.map((p) => ({
      url: p.url,
      status_code: p.statusCode,
      title: p.title,
      meta_description: p.metaDescription,
      is_homepage: p.isHomepage,
      signals: {
        wordCount: p.wordCount,
        h1: p.h1,
        hasForm: p.hasForm,
        hasTelLink: p.hasTelLink,
        jsonLdTypes: p.jsonLdTypes,
      },
    })),
    raw_metrics: {
      psi,
      homepageTitle: crawl.homepage.title,
      discoveredUrls: crawl.discoveredUrls,
      brokenInternalSamples: crawl.brokenInternalSamples,
      sitemapFound: crawl.sitemapFound,
      robotsBlocksAll: crawl.robotsBlocksAll,
      high_priority_count: highAfter,
      medium_priority_count: mediumCount,
      low_priority_count: lowCount,
    },
  };
}

/**
 * Creates the audit row and returns immediately. Caller should schedule
 * `executeAuditJob` via next/server `after()` so the client can poll.
 */
export async function createAuditRecord(input: {
  url: string;
  source: AuditSource;
  businessName?: string | null;
}): Promise<{ id: string; public_slug: string; normalizedHref: string }> {
  const normalized = tryNormalizeUrl(input.url);
  if ("error" in normalized) {
    throw new Error(normalized.error);
  }

  await assertPublicHost(normalized.hostname);

  const supabase = createServiceClient();
  const public_slug = makePublicSlug(input.businessName);

  const { data: audit, error: insertError } = await supabase
    .from("audits")
    .insert({
      public_slug,
      url: input.url.trim(),
      normalized_url: normalized.href,
      status: "running",
      source: input.source,
      business_name: input.businessName?.trim() || null,
    })
    .select("id, public_slug")
    .single();

  if (insertError || !audit) {
    console.error(insertError);
    throw new Error("Could not create audit record.");
  }

  return {
    id: audit.id,
    public_slug: audit.public_slug,
    normalizedHref: normalized.href,
  };
}

export async function executeAuditJob(input: {
  auditId: string;
  url: string;
  source: AuditSource;
  businessName?: string | null;
}): Promise<void> {
  const supabase = createServiceClient();

  try {
    const result = await runAuditPipeline(input.url, {
      businessName: input.businessName,
    });

    if (input.source === "prospect") {
      result.findings = result.findings.map((f) => ({
        ...f,
        is_unlocked_only: false,
      }));
    }

    const high = result.findings.filter((f) => f.priority === "high").length;
    const medium = result.findings.filter((f) => f.priority === "medium").length;
    const low = result.findings.filter((f) => f.priority === "low").length;

    const { error: updateError } = await supabase
      .from("audits")
      .update({
        status: "completed",
        overall_score: result.scores.overall,
        seo_score: result.scores.seo,
        performance_score: result.scores.performance,
        local_score: result.scores.local,
        lead_gen_score: result.scores.conversion,
        mobile_score: result.scores.mobile,
        trust_score: result.scores.trust,
        growth_opportunity: result.scores.growth,
        high_priority_count: high,
        medium_priority_count: medium,
        low_priority_count: low,
        raw_metrics: result.raw_metrics as Json,
        crawled_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      })
      .eq("id", input.auditId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    if (result.pages.length) {
      await supabase.from("audit_pages").insert(
        result.pages.map((p) => ({
          audit_id: input.auditId,
          url: p.url,
          status_code: p.status_code,
          title: p.title,
          meta_description: p.meta_description,
          is_homepage: p.is_homepage,
          signals: p.signals as Json,
        })),
      );
    }

    if (result.findings.length) {
      await supabase.from("audit_findings").insert(
        result.findings.map((f) => ({
          audit_id: input.auditId,
          code: f.code,
          category: f.category,
          priority: f.priority,
          difficulty: f.difficulty,
          title: f.title,
          issue: f.issue,
          why_it_matters: f.why_it_matters,
          recommended_fix: f.recommended_fix,
          is_unlocked_only: f.is_unlocked_only,
          sort_order: f.sort_order,
        })),
      );
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Audit failed unexpectedly.";
    await supabase
      .from("audits")
      .update({
        status: "failed",
        error_message: message.slice(0, 500),
        completed_at: new Date().toISOString(),
      })
      .eq("id", input.auditId);
    console.error("Audit job failed:", err);
  }
}

/** Synchronous full run (tests / scripts). */
export async function createAndRunAudit(input: {
  url: string;
  source: AuditSource;
  businessName?: string | null;
}): Promise<{ id: string; public_slug: string }> {
  const record = await createAuditRecord(input);
  await executeAuditJob({
    auditId: record.id,
    url: record.normalizedHref,
    source: input.source,
    businessName: input.businessName,
  });
  return { id: record.id, public_slug: record.public_slug };
}
