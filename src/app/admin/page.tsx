import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminDashboard } from "../../components/audit/AdminDashboard";
import { AuditShell } from "../../components/audit/AuditShell";
import { isAdminEmail } from "../../lib/admin";
import { createClient, isSupabaseConfigured } from "../../lib/supabase/server";

export const metadata = {
  title: "Admin — Audits",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <AuditShell>
        <div className="mx-auto max-w-lg px-6 py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Not configured</h1>
          <p className="mt-3 text-neutral">
            Set Supabase environment variables to use the admin dashboard.
          </p>
        </div>
      </AuditShell>
    );
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
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-charcoal">
              Sales pipeline
            </h1>
            <p className="mt-1 text-sm text-steel">
              Signed in as {user.email}
            </p>
          </div>
          <div className="flex gap-3 text-sm font-semibold">
            <Link
              href="/admin/prospect"
              className="bg-ember px-4 py-2 text-charcoal hover:bg-ember-deep"
            >
              Prospect a site
            </Link>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="border border-steel-light/50 px-4 py-2 text-charcoal hover:bg-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <AdminDashboard />
        </div>
      </div>
    </AuditShell>
  );
}
