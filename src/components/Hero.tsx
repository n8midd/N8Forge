export function Hero() {
  return (
    <section
      id="top"
      className="hero-atmosphere relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 md:justify-center md:pb-24 md:pt-32"
    >
      <div className="hero-grain absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-8">
        <p className="animate-rise font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
          N8Forge
        </p>
        <h1 className="animate-rise animate-rise-delay-1 mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-off-white sm:text-5xl md:mt-4 md:text-6xl">
          Websites That Help East Texas Businesses Get More Calls, Bookings &amp;
          Customers
        </h1>
        <p className="animate-rise animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          Custom-built locally in Nacogdoches. Straightforward pricing starting at
          $400. Work directly with the developer from start to finish.
        </p>
        <p className="animate-rise animate-rise-delay-2 mt-3 max-w-xl text-sm text-white/75">
          Affordable websites built specifically for small East Texas businesses —
          without agency overhead.
        </p>
        <div className="animate-rise animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="bg-ember px-6 py-3 text-sm font-semibold text-off-white transition-colors hover:bg-ember-deep"
          >
            Get Your Free Website Game Plan
          </a>
          <a
            href="#work"
            className="group text-sm font-semibold text-off-white transition-colors hover:text-ember"
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
    </section>
  );
}
