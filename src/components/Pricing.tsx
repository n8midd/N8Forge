const websiteTiers = [
  {
    name: "Starter Website",
    price: "$500–800",
    features: [
      "5 pages",
      "Contact form",
      "Mobile optimized",
      "Google Maps",
      "Basic SEO",
      "One month support",
    ],
  },
  {
    name: "Professional",
    price: "$1,200–2,000",
    features: [
      "Everything in Starter",
      "Online booking",
      "Blog",
      "Reviews",
      "Analytics",
      "Speed optimization",
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
    <section id="pricing" className="scroll-mt-8 bg-off-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Pricing
        </h2>
        <p className="mt-3 max-w-xl text-steel">
          Choose a website package. Add Monthly Care for ongoing updates,
          hosting, and support.
        </p>

        <div className="mt-12 grid gap-10 border-t border-steel-light/60 pt-10 md:grid-cols-2 md:gap-12">
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
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit border border-charcoal px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-ember hover:bg-ember hover:text-off-white"
              >
                Get started
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
            Pair care with your website package for predictable upkeep. Recurring
            care is where a web business becomes much more reliable month to month.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-display text-lg font-semibold text-charcoal">
                With Starter
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-charcoal">
                $50
                <span className="text-lg font-medium text-steel">/month</span>
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-charcoal">
                With Professional
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-charcoal">
                $150
                <span className="text-lg font-medium text-steel">/month</span>
              </p>
            </div>
          </div>

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
            Add care to my project
          </a>
        </div>
      </div>
    </section>
  );
}
