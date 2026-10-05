"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LeadCaptureForm({
  auditId,
  defaultWebsite,
}: {
  auditId: string;
  defaultWebsite: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: defaultWebsite,
    company: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/audit/${auditId}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string; ok?: boolean };
      if (!res.ok) {
        setError(data.error || "Could not send.");
        setLoading(false);
        return;
      }
      router.refresh();
      // Stay on report — lead unlocks findings server-side
      return;
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid gap-3 sm:grid-cols-2"
      id="unlock-report"
    >
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-sm font-medium text-charcoal">Name</span>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full border border-steel-light/50 px-3 py-2.5 outline-none ring-primary focus:ring-2"
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-sm font-medium text-charcoal">
          Business name
        </span>
        <input
          required
          value={form.businessName}
          onChange={(e) =>
            setForm((f) => ({ ...f, businessName: e.target.value }))
          }
          className="w-full border border-steel-light/50 px-3 py-2.5 outline-none ring-primary focus:ring-2"
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-sm font-medium text-charcoal">Email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full border border-steel-light/50 px-3 py-2.5 outline-none ring-primary focus:ring-2"
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="mb-1 block text-sm font-medium text-charcoal">
          Phone <span className="font-normal text-steel">(optional)</span>
        </span>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full border border-steel-light/50 px-3 py-2.5 outline-none ring-primary focus:ring-2"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1 block text-sm font-medium text-charcoal">Website</span>
        <input
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className="w-full border border-steel-light/50 px-3 py-2.5 outline-none ring-primary focus:ring-2"
        />
      </label>
      {error ? (
        <p className="sm:col-span-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-ember px-6 py-3 text-sm font-semibold text-charcoal hover:bg-ember-deep disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send Me My Full Report"}
        </button>
      </div>
    </form>
  );
}
