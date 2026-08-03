const websiteTiers = [
  {
    name: "Starter Website",
    price: "$400",
    bestFor: "New or small businesses that need a professional online presence.",
    features: [
      "Up to 5 pages",
      "Contact form",
      "Mobile-friendly design",
      "Google Maps integration",
      "Basic SEO setup",
      "Social media links",
      "One month of support",
    ],
  },
  {
    name: "Growth Website",
    price: "$750",
    bestFor:
      "Businesses looking to generate more calls, quote requests, and local leads.",
    features: [
      "Everything in Starter, plus:",
      "Up to 8 pages",
      "Photo gallery or project portfolio",
      "Customer testimonials",
      "Enhanced quote or contact form",
      "Google Analytics setup",
      "Improved local SEO",
      "Two months of support",
    ],
  },
  {
    name: "Professional Website",
    price: "$1,000",
    bestFor:
      "Businesses that need booking, advanced lead generation, or a more complete customer experience.",
    features: [
      "Everything in Growth, plus:",
      "Online booking or scheduling",
      "Blog or news section",
      "Review integration",
      "Advanced forms",
      "Speed optimization",
      "Enhanced analytics",
      "Three months of support",
    ],
  },
] as const;

const careFeatures = [
  "Updates",
  "Backups",
  "Hosting",
  "Security",
  "Small content edits",
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Pricing
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          <span className="font-semibold text-charcoal">
            Websites start at $400.
          </span>{" "}
          Choose Starter for a solid online presence, Growth for more leads, or
          Professional when you need booking and a fuller customer experience.
        </p>

        <div className="mt-12 grid gap-10 border-t border-steel-light/60 pt-10 md:grid-cols-3 md:gap-8">
          {websiteTiers.map((tier) => (
            <article key={tier.name} className="flex flex-col">
              <h3 className="font-display text-xl font-semibold text-charcoal">
                {tier.name}
              </h3>
              <p className="mt-3 font-display text-3xl font-bold text-charcoal">
                {tier.price}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-sm text-charcoal">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${
                        feature.endsWith("plus:")
                          ? "bg-transparent"
                          : "bg-ember"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={
                        feature.endsWith("plus:")
                          ? "font-medium text-steel"
                          : undefined
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-steel">
                <span className="font-medium text-charcoal">Best for:</span>{" "}
                {tier.bestFor}
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit border border-charcoal px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-ember hover:bg-ember hover:text-off-white"
              >
                Request a Free Website Plan
              </a>
            </article>
          ))}
        </div>

        <div className="mt-16 border-t border-steel-light/60 pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
            Add-on
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-charcoal md:text-3xl">
            Monthly Care
          </h3>
          <p className="mt-3 max-w-2xl text-steel">
            Pair care with your website package for predictable upkeep. Hosting
            and maintenance start at{" "}
            <span className="font-semibold text-charcoal">$49/month</span>.
          </p>

          <ul className="mt-8 grid gap-2.5 text-sm text-charcoal sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {careFeatures.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-8 inline-flex w-fit border border-charcoal px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-ember hover:bg-ember hover:text-off-white"
          >
            Request a Free Website Plan
          </a>
        </div>
      </div>
    </section>
  );
}
