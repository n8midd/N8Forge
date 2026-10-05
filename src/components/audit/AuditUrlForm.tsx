"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  variant?: "hero" | "inline";
  source?: "self_serve" | "prospect";
  defaultBusinessName?: string;
  showBusinessName?: boolean;
};

export function AuditUrlForm({
  variant = "hero",
  source = "self_serve",
  defaultBusinessName = "",
  showBusinessName = false,
}: Props) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [businessName, setBusinessName] = useState(defaultBusinessName);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          businessName: businessName || undefined,
          source,
        }),
      });
      const data = (await res.json()) as {
        id?: string;
        slug?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not start the audit.");
        setLoading(false);
        return;
      }
      if (data.id) {
        router.push(`/audit/running/${data.id}`);
        return;
      }
      setError("Unexpected response. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={onSubmit}
      className={
        isHero
          ? "mt-8 w-full max-w-xl space-y-3"
          : "w-full max-w-lg space-y-3"
      }
    >
      {showBusinessName ? (
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-white/80">
            Business name
          </span>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="ABC Roofing"
            className="w-full border border-white/20 bg-white/10 px-4 py-3 text-off-white placeholder:text-white/45 outline-none ring-ember focus:ring-2"
          />
        </label>
      ) : null}
      <label className="block">
        <span className={isHero ? "sr-only" : "mb-1 block text-sm font-medium"}>
          Website URL
        </span>
        <div className={isHero ? "flex flex-col gap-3 sm:flex-row" : "space-y-3"}>
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourbusiness.com"
            className={
              isHero
                ? "min-w-0 flex-1 border border-white/20 bg-white/10 px-4 py-3 text-off-white placeholder:text-white/45 outline-none ring-ember focus:ring-2"
                : "w-full border border-steel-light/50 bg-white px-4 py-3 text-charcoal outline-none ring-primary focus:ring-2"
            }
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 bg-ember px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-ember-deep disabled:opacity-60"
          >
            {loading ? "Analyzing…" : "Analyze My Website"}
          </button>
        </div>
      </label>
      {error ? (
        <p className={`text-sm ${isHero ? "text-accent-light" : "text-red-700"}`} role="alert">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p className={`text-sm ${isHero ? "text-white/75" : "text-steel"}`}>
          Crawling pages and running checks — usually under a minute.
        </p>
      ) : null}
    </form>
  );
}
