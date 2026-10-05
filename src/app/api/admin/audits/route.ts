import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import type { LeadRow, LeadStatus } from "@/lib/supabase/types";

export const runtime = "nodejs";

const STATUSES: LeadStatus[] = [
  "new",
  "not_contacted",
  "contacted",
  "interested",
  "demo_meeting",
  "quote_sent",
  "won",
  "lost",
];

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return null;
  }
  return user;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const service = createServiceClient();
  const { data: audits, error } = await service
    .from("audits")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const ids = (audits || []).map((a) => a.id);
  const { data: leads } = ids.length
    ? await service.from("leads").select("*").in("audit_id", ids)
    : { data: [] as LeadRow[] };

  const leadsByAudit = new Map<string, LeadRow[]>();
  for (const lead of (leads || []) as LeadRow[]) {
    const list = leadsByAudit.get(lead.audit_id) || [];
    list.push(lead);
    leadsByAudit.set(lead.audit_id, list);
  }

  const { data: topFindings } = ids.length
    ? await service
        .from("audit_findings")
        .select("audit_id, title, priority, sort_order")
        .in("audit_id", ids)
        .eq("priority", "high")
        .order("sort_order", { ascending: true })
    : { data: [] as { audit_id: string; title: string }[] };

  const biggestByAudit = new Map<string, string>();
  for (const f of topFindings || []) {
    if (!biggestByAudit.has(f.audit_id)) {
      biggestByAudit.set(f.audit_id, f.title);
    }
  }

  const rows = (audits || []).map((a) => {
    const ls = leadsByAudit.get(a.id) || [];
    const primary = ls[0];
    return {
      id: a.id,
      slug: a.public_slug,
      url: a.url,
      business_name: a.business_name || primary?.business_name || null,
      email: primary?.email || null,
      phone: primary?.phone || null,
      overall_score: a.overall_score,
      seo_score: a.seo_score,
      lead_gen_score: a.lead_gen_score,
      biggest_issue: biggestByAudit.get(a.id) || null,
      status: a.status,
      source: a.source,
      created_at: a.created_at,
      lead_status: primary?.lead_status || null,
      quote_requested: primary?.quote_requested || false,
      lead_id: primary?.id || null,
      notes: primary?.notes || null,
    };
  });

  return NextResponse.json({ rows });
}

export async function PATCH(request: Request) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { leadId?: string; lead_status?: string; notes?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!body.leadId) {
    return NextResponse.json({ error: "leadId required" }, { status: 400 });
  }

  const updates: { lead_status?: LeadStatus; notes?: string } = {};
  if (body.lead_status && STATUSES.includes(body.lead_status as LeadStatus)) {
    updates.lead_status = body.lead_status as LeadStatus;
  }
  if (typeof body.notes === "string") {
    updates.notes = body.notes.slice(0, 2000);
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const service = createServiceClient();
  const { error } = await service
    .from("leads")
    .update(updates)
    .eq("id", body.leadId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
