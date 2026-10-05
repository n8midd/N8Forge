import { after } from "next/server";
import { NextResponse } from "next/server";
import { createAuditRecord, executeAuditJob } from "@/lib/audit/pipeline";
import { tryNormalizeUrl } from "@/lib/audit/url";
import { site_url_origin_ok } from "@/lib/audit/http";
import { clientIp, touchRateLimit } from "@/lib/rate-limit";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export const runtime = "nodejs";
export const maxDuration = 120;

const RATE_MAX = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return jsonError(
      "Audit service is not configured. Add Supabase environment variables.",
      503,
    );
  }

  if (!site_url_origin_ok(request)) {
    return jsonError("Invalid request origin.", 403);
  }

  let body: {
    url?: string;
    businessName?: string;
    source?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const url = typeof body.url === "string" ? body.url : "";
  const normalized = tryNormalizeUrl(url);
  if ("error" in normalized) {
    return jsonError(normalized.error, 400);
  }

  let source: "self_serve" | "prospect" = "self_serve";
  if (body.source === "prospect") {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !isAdminEmail(user.email)) {
      return jsonError("Admin authentication required for prospecting.", 401);
    }
    source = "prospect";
  } else {
    const ip = clientIp(request);
    if (touchRateLimit(`audit:${ip}`, RATE_MAX, RATE_WINDOW_MS)) {
      return jsonError(
        "Too many audits from this network. Please try again later.",
        429,
      );
    }
  }

  const businessName =
    typeof body.businessName === "string" ? body.businessName : null;

  try {
    const record = await createAuditRecord({
      url: normalized.href,
      source,
      businessName,
    });

    after(async () => {
      await executeAuditJob({
        auditId: record.id,
        url: record.normalizedHref,
        source,
        businessName,
      });
    });

    return NextResponse.json({
      id: record.id,
      slug: record.public_slug,
    });
  } catch (err) {
    console.error("Audit create failed:", err);
    const message =
      err instanceof Error ? err.message : "Audit failed. Please try again.";
    return jsonError(message, 500);
  }
}
