import Image from "next/image";
import Link from "next/link";
import { CTA } from "../lib/contact";

type ServiceProof = {
  body: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  hrefLabel: string;
  external?: boolean;
};

type ServicePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  proof?: ServiceProof;
};

export function ServicePageContent({
  eyebrow,
  title,
  intro,
  sections,
  proof,
}: ServicePageProps) {
  return (
    <article className="bg-off-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember-ink">
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

        {proof ? (
          <figure className="mt-14 border border-steel-light/60 bg-white">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-steel-light/60">
              <Image
                src={proof.imageSrc}
                alt={proof.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="p-6 md:p-8">
              <p className="text-sm leading-relaxed text-neutral">{proof.body}</p>
              {proof.external ? (
                <a
                  href={proof.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-ember-ink hover:text-ember-deep"
                >
                  {proof.hrefLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link
                  href={proof.href}
                  className="mt-4 inline-block text-sm font-semibold text-ember-ink hover:text-ember-deep"
                >
                  {proof.hrefLabel}
                </Link>
              )}
            </figcaption>
          </figure>
        ) : null}

        <div className="mt-14 border border-steel-light/60 bg-white p-6 md:p-8">
          <h2 className="font-display text-xl font-semibold text-charcoal">
            {CTA.label}
          </h2>
          <p className="mt-2 text-sm text-steel">{CTA.deliverable}</p>
          <p className="mt-2 text-sm text-charcoal">{CTA.response}</p>
          <Link
            href={CTA.href}
            className="mt-6 inline-flex bg-ember px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-ember-deep hover:text-charcoal"
          >
            {CTA.label}
          </Link>
        </div>
      </div>
    </article>
  );
}
