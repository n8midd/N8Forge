import Link from "next/link";
import { CTA } from "../lib/contact";

type ServicePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export function ServicePageContent({
  eyebrow,
  title,
  intro,
  sections,
}: ServicePageProps) {
  return (
    <article className="bg-off-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-steel">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-neutral">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 border border-steel-light/60 bg-white p-6 md:p-8">
          <h2 className="font-display text-xl font-semibold text-charcoal">
            {CTA.label}
          </h2>
          <p className="mt-2 text-sm text-steel">{CTA.deliverable}</p>
          <p className="mt-2 text-sm text-charcoal">{CTA.response}</p>
          <Link
            href={CTA.href}
            className="mt-6 inline-flex bg-ember px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-deep"
          >
            {CTA.label}
          </Link>
        </div>
      </div>
    </article>
  );
}
