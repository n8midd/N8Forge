import Image from "next/image";
import { caseStudyLux } from "../lib/contact";

export function CaseStudy() {
  const { screenshots, testimonial } = caseStudyLux;

  return (
    <section id="case-study" className="scroll-mt-8 bg-off-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          Case study
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          {caseStudyLux.client}
        </h2>
        <p className="mt-1 text-steel">
          {caseStudyLux.owner} · {caseStudyLux.location}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-charcoal">
              The need
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral md:text-base">
              {caseStudyLux.need}{" "}
              <a
                href={caseStudyLux.beforeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary transition-colors hover:text-primary-light"
              >
                View original Vagaro page →
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-charcoal">
              What we built
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral md:text-base">
              {caseStudyLux.built}{" "}
              <a
                href={caseStudyLux.afterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary transition-colors hover:text-primary-light"
              >
                Visit live site →
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-display text-xl font-semibold text-charcoal">
            Before &amp; after
          </h3>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <figure>
              <figcaption className="mb-3 text-sm font-semibold uppercase tracking-wide text-steel">
                Before — Vagaro template
              </figcaption>
              <div className="space-y-4">
                <div className="overflow-hidden border border-steel-light/60 bg-white">
                  <Image
                    src={screenshots.beforeDesktop}
                    alt="Lux Massage Therapy Vagaro page on desktop"
                    width={1280}
                    height={800}
                    className="h-auto w-full"
                  />
                </div>
                <div className="mx-auto max-w-[220px] overflow-hidden border border-steel-light/60 bg-white">
                  <Image
                    src={screenshots.beforeMobile}
                    alt="Lux Massage Therapy Vagaro page on mobile"
                    width={390}
                    height={844}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </figure>
            <figure>
              <figcaption className="mb-3 text-sm font-semibold uppercase tracking-wide text-steel">
                After — Custom N8Forge site
              </figcaption>
              <div className="space-y-4">
                <div className="overflow-hidden border border-steel-light/60 bg-white">
                  <Image
                    src={screenshots.afterDesktop}
                    alt="Lux Massage Therapy custom website on desktop"
                    width={1280}
                    height={800}
                    className="h-auto w-full"
                  />
                </div>
                <div className="mx-auto max-w-[220px] overflow-hidden border border-steel-light/60 bg-white">
                  <Image
                    src={screenshots.afterMobile}
                    alt="Lux Massage Therapy custom website on mobile"
                    width={390}
                    height={844}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>

        <div className="mt-14 border border-steel-light/60 bg-white p-6 md:p-8">
          <h3 className="font-display text-lg font-semibold text-charcoal">
            Booking that fits the business
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral md:text-base">
            {caseStudyLux.booking}
          </p>
        </div>

        <blockquote className="mt-14 border-l-4 border-ember pl-6">
          <p className="text-lg leading-relaxed text-charcoal md:text-xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-steel">
            — {testimonial.author}, {testimonial.business}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
