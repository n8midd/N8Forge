"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Row = {
  id: string;
  slug: string;
  url: string;
  business_name: string | null;
  email: string | null;
  phone: string | null;
  overall_score: number | null;
  seo_score: number | null;
  lead_gen_score: number | null;
  biggest_issue: string | null;
  status: string;
  source: string;
  created_at: string;
  lead_status: string | null;
  quote_requested: boolean;
  lead_id: string | null;
  notes: string | null;
};

const STATUSES = [
  "new",
  "not_contacted",
  "contacted",
  "interested",
  "demo_meeting",
  "quote_sent",
  "won",
  "lost",
] as const;

export function AdminDashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/audits");
      const data = (await res.json()) as { rows?: Row[]; error?: string };
      if (!res.ok) {
        setError(data.error || "Failed to load");
        setRows([]);
      } else {
        setRows(data.rows || []);
        setError(null);
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateLead(
    leadId: string,
    patch: { lead_status?: string; notes?: string },
  ) {
    const res = await fetch("/api/admin/audits", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, ...patch }),
    });
    if (res.ok) load();
  }

  function outreach(row: Row) {
    const report = `${window.location.origin}/report/${row.slug}`;
    const text = `Hi — I was looking at your website (${row.url}) and noticed a few things that may be making it harder for customers to find or contact you.\n\nI put together a free website audit here:\n${report}\n\nHappy to walk through the top fixes if useful.`;
    void navigator.clipboard.writeText(text);
  }

  if (loading) {
    return <p className="text-steel">Loading pipeline…</p>;
  }

  if (error) {
    return <p className="text-red-700">{error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-steel-light/50 text-xs uppercase tracking-wide text-steel">
            <th className="py-2 pr-3 font-medium">Business / Site</th>
            <th className="py-2 pr-3 font-medium">Scores</th>
            <th className="py-2 pr-3 font-medium">Biggest issue</th>
            <th className="py-2 pr-3 font-medium">Contact</th>
            <th className="py-2 pr-3 font-medium">Status</th>
            <th className="py-2 pr-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-steel-light/30 align-top">
              <td className="py-3 pr-3">
                <p className="font-semibold text-charcoal">
                  {row.business_name || "—"}
                </p>
                <a
                  href={row.url}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {row.url.replace(/^https?:\/\//, "").slice(0, 40)}
                </a>
                <p className="mt-1 text-xs text-steel">
                  {row.source} · {new Date(row.created_at).toLocaleDateString()}
                </p>
              </td>
              <td className="py-3 pr-3 whitespace-nowrap">
                <p>
                  Overall{" "}
                  <strong>{row.overall_score ?? "—"}</strong>
                </p>
                <p className="text-steel">
                  SEO {row.seo_score ?? "—"} · Leads {row.lead_gen_score ?? "—"}
                </p>
              </td>
              <td className="py-3 pr-3 max-w-[12rem]">
                {row.biggest_issue || "—"}
              </td>
              <td className="py-3 pr-3">
                <p>{row.email || "—"}</p>
                <p className="text-steel">{row.phone || ""}</p>
                {row.quote_requested ? (
                  <p className="mt-1 text-xs font-semibold text-ember">
                    Quote requested
                  </p>
                ) : null}
              </td>
              <td className="py-3 pr-3">
                {row.lead_id ? (
                  <select
                    className="border border-steel-light/50 bg-white px-2 py-1"
                    value={row.lead_status || "new"}
                    onChange={(e) =>
                      updateLead(row.lead_id!, { lead_status: e.target.value })
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="text-steel">No lead yet</span>
                )}
              </td>
              <td className="py-3 pr-3 space-y-2">
                <Link
                  href={`/report/${row.slug}`}
                  className="block text-primary hover:underline"
                  target="_blank"
                >
                  Open report
                </Link>
                <button
                  type="button"
                  className="block text-left text-primary hover:underline"
                  onClick={() => outreach(row)}
                >
                  Copy outreach
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? (
        <p className="mt-6 text-steel">No audits yet. Use Prospecting to generate one.</p>
      ) : null}
    </div>
  );
}
