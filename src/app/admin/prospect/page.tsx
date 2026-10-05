import Link from "next/link";
import { redirect } from "next/navigation";
import { AuditShell } from "../../../components/audit/AuditShell";
import { AuditUrlForm } from "../../../components/audit/AuditUrlForm";
import { isAdminEmail } from "../../../lib/admin";
import { createClient, isSupabaseConfigured } from "../../../lib/supabase/server";

export const metadata = {
  title: "Prospect a website",
  robots: { index: false, follow: false },
};

export default async function AdminProspectPage() {
  if (!isSupabaseConfigured()) {
    redirect("/admin");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login");
  }

  return (
    <AuditShell>
      <div className="mx-auto max-w-lg px-6 py-16 md:px-8">
        <Link href="/admin" className="text-sm text-primary hover:underline">
          ← Back to pipeline
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold text-charcoal">
          Prospecting tool
        </h1>
        <p className="mt-2 text-neutral">
          Generate a shareable audit without requiring the business owner to
          submit the form. Use it in outreach.
        </p>
        <div className="mt-8 rounded-none border border-steel-light/40 bg-white p-6">
          <AuditUrlForm
            variant="inline"
            source="prospect"
            showBusinessName
          />
        </div>
      </div>
    </AuditShell>
  );
}
