import Link from "next/link";
import { SiteShell } from "../components/SiteShell";
import { CTA } from "../lib/contact";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="bg-off-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember-ink">
            404
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
            This page is not here
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-steel">
            The link may be outdated, or the page may have moved. You can head
            home, look at recent work, or request a free website game plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-ember px-6 py-3 text-sm font-semibold text-charcoal hover:bg-ember-deep"
            >
              Back to home
            </Link>
            <Link
              href="/portfolio"
              className="border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-off-white"
            >
              Portfolio
            </Link>
            <Link
              href={CTA.href}
              className="border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-off-white"
            >
              {CTA.label}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
