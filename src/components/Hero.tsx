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
        <p className="animate-rise font-display text-5xl font-extrabold tracking-tight text-off-white sm:text-6xl md:text-8xl lg:text-9xl">
          N8Forge
        </p>
        <h1 className="animate-rise animate-rise-delay-1 mt-4 max-w-xl font-display text-2xl font-semibold leading-snug text-off-white sm:text-3xl md:mt-6 md:text-4xl">
          Websites for local businesses that need to look sharp and get found.
        </h1>
        <p className="animate-rise animate-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
          Clear design, mobile-ready builds, and packages that grow with you —
          from a starter site to ongoing care.
        </p>
        <div className="animate-rise animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="bg-ember px-6 py-3 text-sm font-semibold text-off-white transition-colors hover:bg-ember-deep"
          >
            Request a site
          </a>
          <a
            href="#work"
            className="group text-sm font-semibold text-off-white transition-colors hover:text-ember"
          >
            See demos
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
