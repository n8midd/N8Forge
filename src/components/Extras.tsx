const extras = [
  "Google Business Profile optimization",
  "Local SEO",
  "Contact forms",
  "Appointment booking",
  "Review management",
  "Monthly analytics reports",
  "Website maintenance",
  "Performance optimization",
] as const;

export function Extras() {
  return (
    <section id="extras" className="scroll-mt-8 bg-off-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Extras
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          The website often leads to additional services. These create recurring
          revenue and deeper client relationships.
        </p>

        <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {extras.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-b border-steel-light/50 py-3 text-charcoal"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ember" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
