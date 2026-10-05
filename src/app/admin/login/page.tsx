import { AuditShell } from "@/components/audit/AuditShell";
import { AdminLoginForm } from "@/components/audit/AdminLoginForm";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <AuditShell>
      <div className="mx-auto max-w-lg px-6 py-20">
        <h1 className="text-center font-display text-3xl font-bold text-charcoal">
          Admin sign in
        </h1>
        <p className="mt-2 text-center text-sm text-steel">
          Supabase Auth — allowlisted emails only.
        </p>
        <AdminLoginForm />
      </div>
    </AuditShell>
  );
}
