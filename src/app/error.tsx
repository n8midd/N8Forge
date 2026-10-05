"use client";

import Link from "next/link";
import { SiteShell } from "../components/SiteShell";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <SiteShell>
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember-ink">
            Error
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
            Something went wrong
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel">
            Please try again. If it keeps happening, use the contact form or call
            and I will follow up.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="bg-ember px-6 py-3 text-sm font-semibold text-charcoal hover:bg-ember-deep"
            >
              Try again
            </button>
            <Link
              href="/"
              className="border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-off-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
