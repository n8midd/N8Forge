import { NextResponse } from "next/server";
import {
  createServiceClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data: audit, error } = await supabase
    .from("audits")
    .select(
      "id, public_slug, status, overall_score, error_message, url, business_name",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !audit) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: audit.id,
    slug: audit.public_slug,
    status: audit.status,
    overall_score: audit.overall_score,
    error_message: audit.error_message,
    url: audit.url,
    business_name: audit.business_name,
  });
}
