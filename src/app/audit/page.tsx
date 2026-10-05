import type { Metadata } from "next";
import { AuditShell } from "../../components/audit/AuditShell";
import { AuditUrlForm } from "../../components/audit/AuditUrlForm";

export const metadata: Metadata = {
  title: "Free Website Audit",
  description:
    "Enter your website and get a free analysis of SEO, performance, local visibility, mobile experience, and ability to generate leads.",
};

export default function AuditLandingPage() {
  return (
    <AuditShell>
      <section className="hero-atmosphere relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="hero-grain absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
            Free website audit
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-off-white sm:text-5xl md:text-6xl">
            Is Your Website Helping You Get Customers?
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Enter your website and get a free analysis of your SEO, performance,
            local visibility, mobile experience, and ability to generate leads.
          </p>
          <AuditUrlForm variant="hero" />
          <ul className="mt-10 flex flex-col gap-2 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <li>Free website audit</li>
            <li>No technical knowledge required</li>
            <li>Results explained in plain English</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
        <h2 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
          What we check
        </h2>
        <p className="mt-3 max-w-2xl text-neutral">
          One focused report across the signals that actually drive local
          customers — not a wall of developer jargon.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "SEO",
              d: "Titles, structure, indexability, links, and service content search engines need.",
            },
            {
              t: "Performance",
              d: "Whether your site loads fast enough that mobile visitors stay.",
            },
            {
              t: "Local visibility",
              d: "City, service area, phone, and local signals customers rely on.",
            },
            {
              t: "Lead generation",
              d: "CTAs, forms, click-to-call, and a clear next step to contact you.",
            },
            {
              t: "Mobile experience",
              d: "How the site works on the phones most local customers use.",
            },
            {
              t: "Trust",
              d: "Testimonials, about, credentials, and contact details that close deals.",
            },
          ].map((item) => (
            <div key={item.t}>
              <h3 className="font-display text-lg font-semibold text-primary">
                {item.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    </AuditShell>
  );
}
