import { NextResponse } from "next/server";
import { notifyAuditLead } from "@/lib/audit/email";
import { site_url_origin_ok } from "@/lib/audit/http";
import { SITE_URL } from "@/lib/contact";
import { clientIp, touchRateLimit } from "@/lib/rate-limit";
import {
  createServiceClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request, { params }: Params) {
  if (!isSupabaseConfigured()) {
    return jsonError("Not configured", 503);
  }
  if (!site_url_origin_ok(request)) {
    return jsonError("Invalid request origin.", 403);
  }

  const { id } = await params;
  const ip = clientIp(request);
  if (touchRateLimit(`lead:${ip}`, 10, 15 * 60 * 1000)) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  let body: {
    name?: string;
    businessName?: string;
    email?: string;
    phone?: string;
    website?: string;
    company?: string; // honeypot
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return jsonError("Invalid body", 400);
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim().slice(0, 120);
  const businessName = (body.businessName || "").trim().slice(0, 160);
  const email = (body.email || "").trim().toLowerCase().slice(0, 200);
  const phone = (body.phone || "").trim().slice(0, 40) || null;
  const website = (body.website || "").trim().slice(0, 300) || null;

  if (!name || !businessName || !EMAIL_RE.test(email)) {
    return jsonError("Please provide name, business name, and a valid email.", 400);
  }

  const supabase = createServiceClient();
  const { data: audit, error } = await supabase
    .from("audits")
    .select("id, public_slug, url, overall_score, status")
    .eq("id", id)
    .maybeSingle();

  if (error || !audit || audit.status !== "completed") {
    return jsonError("Audit not found or not ready.", 404);
  }

  const { data: existing } = await supabase
    .from("leads")
    .select("id")
    .eq("audit_id", id)
    .eq("email", email)
    .maybeSingle();

  if (!existing) {
    const { error: leadError } = await supabase.from("leads").insert({
      audit_id: id,
      name,
      business_name: businessName,
      email,
      phone,
      website: website || audit.url,
      lead_status: "new",
    });
    if (leadError) {
      console.error(leadError);
      return jsonError("Could not save your details.", 500);
    }
  }

  await supabase
    .from("audit_findings")
    .update({ is_unlocked_only: false })
    .eq("audit_id", id);

  const reportUrl = `${SITE_URL}/report/${audit.public_slug}`;

  try {
    await notifyAuditLead({
      name,
      businessName,
      email,
      phone,
      website: website || audit.url,
      reportUrl,
      overallScore: audit.overall_score,
    });
  } catch (err) {
    console.error("Lead email failed:", err);
  }

  return NextResponse.json({ ok: true, unlocked: true });
}
