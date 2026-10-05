import type { PsiMetrics } from "./types";

type LighthouseCategory = { score: number | null };
type LighthouseAudit = {
  numericValue?: number;
  score?: number | null;
  details?: { overallSavingsBytes?: number; items?: unknown[] };
};

type PsiResponse = {
  lighthouseResult?: {
    categories?: { performance?: LighthouseCategory };
    audits?: Record<string, LighthouseAudit>;
  };
  error?: { message?: string };
};

async function fetchPsiStrategy(
  url: string,
  strategy: "mobile" | "desktop",
  apiKey?: string,
): Promise<{ score: number | null; audits: Record<string, LighthouseAudit>; error?: string }> {
  const endpoint = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.set("category", "performance");
  if (apiKey) endpoint.searchParams.set("key", apiKey);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    const res = await fetch(endpoint.href, { signal: controller.signal });
    const data = (await res.json()) as PsiResponse;
    if (!res.ok) {
      return {
        score: null,
        audits: {},
        error: data.error?.message || `PageSpeed HTTP ${res.status}`,
      };
    }
    const score = data.lighthouseResult?.categories?.performance?.score;
    return {
      score: typeof score === "number" ? Math.round(score * 100) : null,
      audits: data.lighthouseResult?.audits || {},
    };
  } catch (err) {
    return {
      score: null,
      audits: {},
      error: err instanceof Error ? err.message : "PageSpeed request failed",
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchPageSpeedMetrics(url: string): Promise<PsiMetrics> {
  const apiKey = process.env.PAGESPEED_API_KEY;
  const [mobile, desktop] = await Promise.all([
    fetchPsiStrategy(url, "mobile", apiKey),
    fetchPsiStrategy(url, "desktop", apiKey),
  ]);

  const audits = mobile.audits;
  const lcp = audits["largest-contentful-paint"]?.numericValue ?? null;
  const inp =
    audits["interaction-to-next-paint"]?.numericValue ??
    audits["experimental-interaction-to-next-paint"]?.numericValue ??
    null;
  const cls = audits["cumulative-layout-shift"]?.numericValue ?? null;
  const totalByteWeight = audits["total-byte-weight"]?.numericValue ?? null;
  const unusedJsBytes =
    audits["unused-javascript"]?.details?.overallSavingsBytes ?? null;
  const renderBlocking =
    audits["render-blocking-resources"]?.details?.items?.length ?? null;

  const errors = [mobile.error, desktop.error].filter(Boolean);
  return {
    mobileScore: mobile.score,
    desktopScore: desktop.score,
    lcpMs: lcp,
    inpMs: inp,
    cls,
    totalByteWeight,
    unusedJsBytes,
    renderBlockingCount: renderBlocking,
    error: errors.length ? errors.join("; ") : undefined,
  };
}
