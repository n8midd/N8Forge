"use client";

import { useState } from "react";

export function FixThisForMeGlobal({
  auditId,
  hasLead,
}: {
  auditId: string;
  hasLead: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function request() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/audit/${auditId}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          findingTitle: "Complete website optimization",
          note: "Request custom quote / Fix These Problems",
        }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error || "Could not send.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Network error.");
    }
    setBusy(false);
  }

  if (!hasLead) {
    return (
      <a
        href="#unlock-report"
        className="inline-block bg-ember px-6 py-3 text-sm font-semibold text-charcoal hover:bg-ember-deep"
      >
        Unlock Full Report &amp; Get Help
      </a>
    );
  }

  if (done) {
    return (
      <p className="font-medium text-primary">
        Quote request sent — I&apos;ll personally follow up.
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={request}
        disabled={busy}
        className="bg-ember px-6 py-3 text-sm font-semibold text-charcoal hover:bg-ember-deep disabled:opacity-60"
      >
        {busy ? "Sending…" : "Fix These Problems"}
      </button>
      {error ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
