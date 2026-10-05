import Image from "next/image";
import type { CaseStudyContent } from "../lib/contact";

type CaseStudyProps = {
  study: CaseStudyContent;
  tone?: "off-white" | "surface";
};

function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden border border-steel-light/60 bg-white ${className ?? ""}`}>
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
    </div>
  );
}

export function CaseStudy({ study, tone = "off-white" }: CaseStudyProps) {
  const { screenshots, testimonial, results, highlight } = study;
  const hasBeforeShots = Boolean(screenshots.beforeDesktop && screenshots.beforeMobile);
  const sectionId = study.id === "lux" ? "case-study" : `case-study-${study.id}`;

  return (
    <section
      id={sectionId}
      className={`scroll-mt-8 py-20 md:py-28 ${tone === "surface" ? "bg-surface" : "bg-off-white"}`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember-ink">
          Case study
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          {study.client}
        </h2>
        <p className="mt-1 text-steel">
          {study.owner} · {study.location}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-charcoal">
              The need
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral md:text-base">
              {study.need}
              {study.beforeUrl ? (
                <>
                  {" "}
                  <a
                    href={study.beforeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary transition-colors hover:text-primary-light"
                  >
                    {study.beforeLinkLabel ?? "View previous site →"}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </>
              ) : null}
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-charcoal">
              What we built
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral md:text-base">
              {study.built}{" "}
              <a
                href={study.afterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary transition-colors hover:text-primary-light"
              >
                Visit live site →
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 border border-steel-light/60 bg-white p-6 md:p-8">
          <h3 className="font-display text-lg font-semibold text-charcoal">
            Results
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-steel">
            Documented outcomes only — not invented traffic or revenue numbers.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {results.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-charcoal">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <h3 className="font-display text-xl font-semibold text-charcoal">
            {hasBeforeShots ? "Before & after" : "Starting point & after"}
          </h3>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            {hasBeforeShots ? (
              <figure>
                <figcaption className="mb-3 text-sm font-semibold uppercase tracking-wide text-steel">
                  {screenshots.beforeCaption ?? "Before"}
                </figcaption>
                <div className="space-y-4">
                  <ScreenshotFrame
                    src={screenshots.beforeDesktop!}
                    alt={`${study.client} previous site on desktop`}
                    width={1280}
                    height={800}
                  />
                  <ScreenshotFrame
                    src={screenshots.beforeMobile!}
                    alt={`${study.client} previous site on mobile`}
                    width={390}
                    height={844}
                    className="mx-auto max-w-[220px]"
                  />
                </div>
              </figure>
            ) : study.startingPoint ? (
              <div className="border border-steel-light/60 bg-white p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-steel">
                  Starting point
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral md:text-base">
                  {study.startingPoint}
                </p>
              </div>
            ) : null}
            <figure>
              <figcaption className="mb-3 text-sm font-semibold uppercase tracking-wide text-steel">
                {screenshots.afterCaption ?? "After — Custom N8Forge site"}
              </figcaption>
              <div className="space-y-4">
                <ScreenshotFrame
                  src={screenshots.afterDesktop}
                  alt={`${study.client} custom website on desktop`}
                  width={1280}
                  height={800}
                />
                <ScreenshotFrame
                  src={screenshots.afterMobile}
                  alt={`${study.client} custom website on mobile`}
                  width={390}
                  height={844}
                  className="mx-auto max-w-[220px]"
                />
              </div>
            </figure>
          </div>
        </div>

        {highlight ? (
          <div className="mt-14 border border-steel-light/60 bg-white p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-charcoal">
              {highlight.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral md:text-base">
              {highlight.body}
            </p>
          </div>
        ) : null}

        {testimonial ? (
          <blockquote className="mt-14 border-l-4 border-ember-ink pl-6">
            <p className="text-lg leading-relaxed text-charcoal md:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="mt-4 text-sm text-steel">
              — {testimonial.author}, {testimonial.business}
            </footer>
          </blockquote>
        ) : null}
      </div>
    </section>
  );
}
