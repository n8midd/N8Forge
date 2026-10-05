import Image from "next/image";
import { caseStudyLux } from "../lib/contact";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-atmosphere relative flex flex-col justify-center overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32"
    >
      <div className="hero-grain absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div>
          <p className="animate-rise font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
            N8Forge
          </p>
          <h1 className="animate-rise animate-rise-delay-1 mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-off-white sm:text-5xl md:mt-4 md:text-6xl">
            East Texas websites that get more calls and bookings.
          </h1>
          <p className="animate-rise animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Custom-built locally in Nacogdoches. Straightforward pricing starting at
            $400. Work directly with the developer from start to finish.
          </p>
          <div className="animate-rise animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="bg-ember px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-ember-deep hover:text-charcoal"
            >
              Get Your Free Website Game Plan
            </a>
            <a
              href="#work"
              className="group text-sm font-semibold text-off-white transition-colors hover:text-white"
            >
              See my work
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
          <p className="animate-rise animate-rise-delay-3 mt-4 max-w-lg text-sm text-white/70">
            I&apos;ll review your business and send you a recommended site structure,
            features, and flat-rate price — no obligation.
          </p>
        </div>

        <a
          href="#work"
          className="animate-rise animate-rise-delay-3 relative hidden overflow-hidden border border-white/20 bg-white/5 lg:block"
        >
          <Image
            src={caseStudyLux.screenshots.afterDesktop}
            alt="Lux Massage Therapy website built by N8Forge"
            width={704}
            height={440}
            className="h-auto w-full object-cover object-top"
            priority
          />
        </a>
      </div>
    </section>
  );
}
