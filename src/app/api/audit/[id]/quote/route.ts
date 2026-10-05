import { NextResponse } from "next/server";
import { notifyQuoteRequest } from "@/lib/audit/email";
import { site_url_origin_ok } from "@/lib/audit/http";
import { SITE_URL } from "@/lib/contact";
import { clientIp, touchRateLimit } from "@/lib/rate-limit";
import {
  createServiceClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

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
  if (touchRateLimit(`quote:${clientIp(request)}`, 8, 15 * 60 * 1000)) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  let body: {
    findingTitle?: string;
    note?: string;
    name?: string;
    email?: string;
    phone?: string;
    businessName?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return jsonError("Invalid body", 400);
  }

  const supabase = createServiceClient();
  const { data: audit } = await supabase
    .from("audits")
    .select("id, public_slug, url, overall_score, business_name, status")
    .eq("id", id)
    .maybeSingle();

  if (!audit || audit.status !== "completed") {
    return jsonError("Audit not found.", 404);
  }

  const { data: lead } = await supabase
    .from("leads")
    .select("*")
    .eq("audit_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lead) {
    await supabase
      .from("leads")
      .update({
        quote_requested: true,
        quote_note: (body.note || body.findingTitle || "").slice(0, 500) || null,
        lead_status:
          lead.lead_status === "new" || lead.lead_status === "not_contacted"
            ? "interested"
            : lead.lead_status,
      })
      .eq("id", lead.id);
  } else if (body.email && body.name && body.businessName) {
    await supabase.from("leads").insert({
      audit_id: id,
      name: body.name.slice(0, 120),
      business_name: body.businessName.slice(0, 160),
      email: body.email.trim().toLowerCase().slice(0, 200),
      phone: body.phone?.slice(0, 40) || null,
      website: audit.url,
      quote_requested: true,
      quote_note: (body.note || body.findingTitle || "").slice(0, 500) || null,
      lead_status: "interested",
    });
  }

  const reportUrl = `${SITE_URL}/report/${audit.public_slug}`;

  try {
    await notifyQuoteRequest({
      name: body.name || lead?.name,
      businessName: body.businessName || lead?.business_name || audit.business_name,
      email: body.email || lead?.email,
      phone: body.phone || lead?.phone,
      website: audit.url,
      reportUrl,
      findingTitle: body.findingTitle,
      note: body.note,
      overallScore: audit.overall_score,
    });
  } catch (err) {
    console.error("Quote email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
