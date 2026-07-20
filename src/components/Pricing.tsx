import { foundingClientPackage } from "../lib/contact";

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
    <section id="pricing" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Pricing
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          <span className="font-semibold text-charcoal">
            Founding clients start at $400
          </span>{" "}
          — limited to {foundingClientPackage.spotsTotal} spots. Standard packages
          are below for businesses that need more after the founding offer fills.
        </p>

        <article className="mt-10 border-2 border-ember bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-block bg-ember px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Limited — {foundingClientPackage.spotsTotal} spots
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-charcoal md:text-3xl">
                {foundingClientPackage.name}
              </h3>
            </div>
            <p className="font-display text-4xl font-bold text-charcoal">
              {foundingClientPackage.price}
            </p>
          </div>

          <ul className="mt-8 grid gap-2.5 text-sm text-charcoal sm:grid-cols-2">
            {foundingClientPackage.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-steel">
            {foundingClientPackage.terms}
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex bg-ember px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ember-deep"
          >
            Request a Free Website Plan
          </a>
        </article>

        <div className="mt-16 border-t border-steel-light/60 pt-12">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-steel">
            Standard packages
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-12">
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
                  Request a Free Website Plan
                </a>
              </article>
            ))}
          </div>
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

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <p className="font-display text-lg font-semibold text-charcoal">
                Founding Client
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-charcoal">
                $49
                <span className="text-lg font-medium text-steel">/month</span>
              </p>
            </div>
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
            Request a Free Website Plan
          </a>
        </div>
      </div>
    </section>
  );
}
