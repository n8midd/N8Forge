"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AuditRunningClient({ id }: { id: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("Starting analysis…");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const messages = [
      "Crawling your homepage…",
      "Checking SEO and structure…",
      "Measuring performance…",
      "Reviewing local visibility and lead conversion…",
      "Writing plain-English recommendations…",
    ];
    const interval = setInterval(() => {
      setStep((s) => {
        const next = Math.min(s + 1, messages.length - 1);
        setMessage(messages[next]);
        return next;
      });
    }, 4000);

    let cancelled = false;
    let attempts = 0;

    async function poll() {
      attempts += 1;
      try {
        const res = await fetch(`/api/audit/${id}`);
        const data = (await res.json()) as {
          status?: string;
          slug?: string;
          error_message?: string;
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok) {
          setError(data.error || "Could not load audit status.");
          return;
        }
        if (data.status === "completed" && data.slug) {
          router.replace(`/report/${data.slug}`);
          return;
        }
        if (data.status === "failed") {
          setError(
            data.error_message || "The audit failed. Please try another URL.",
          );
          return;
        }
        // Still running — self-serve audits run inline in POST, so status may already be done.
        // Keep polling briefly for safety.
        if (attempts < 90) {
          setTimeout(poll, 2000);
        } else {
          setError("This is taking longer than expected. Refresh or try again.");
        }
      } catch {
        if (!cancelled) {
          setError("Network error while checking status.");
        }
      }
    }

    // Immediate poll — create endpoint is synchronous
    poll();

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [id, router]);

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center md:px-8">
      <div
        className="mx-auto mb-8 h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-ember"
        aria-hidden
      />
      <h1 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
        Analyzing your website
      </h1>
      <p className="mt-4 text-neutral" aria-live="polite">
        {error || message}
      </p>
      {error ? (
        <a
          href="/audit"
          className="mt-8 inline-block bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
        >
          Try another URL
        </a>
      ) : (
        <p className="mt-6 text-sm text-steel">
          Hang tight — most scans finish in under a minute.
        </p>
      )}
    </div>
  );
}
