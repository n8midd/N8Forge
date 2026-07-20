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
        <h1 className="animate-rise animate-rise-delay-1 mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-off-white sm:text-5xl md:mt-4 md:text-6xl">
          Custom Websites for East Texas Service Businesses
        </h1>
        <p className="animate-rise animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          Professional websites built around your business, with straightforward
          pricing and personal local support.
        </p>
        <p className="animate-rise animate-rise-delay-2 mt-3 max-w-xl text-sm text-white/75">
          Limited founding offer: custom websites from{" "}
          <a href="#pricing" className="font-semibold text-white underline-offset-2 hover:text-ember hover:underline">
            $400
          </a>{" "}
          for the first three East Texas clients.
        </p>
        <div className="animate-rise animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="bg-ember px-6 py-3 text-sm font-semibold text-off-white transition-colors hover:bg-ember-deep"
          >
            Request a Free Website Plan
          </a>
          <a
            href="#case-study"
            className="group text-sm font-semibold text-off-white transition-colors hover:text-ember"
          >
            See the Lux case study
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
