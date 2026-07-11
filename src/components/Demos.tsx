import { demos } from "../lib/contact";

export function Demos() {
  return (
    <section id="work" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Work
        </h2>
        <p className="mt-3 max-w-xl text-steel">
          Three live demos for local service businesses. Open any site to see
          the approach.
        </p>

        <ul className="mt-12 divide-y divide-steel-light/70 border-y border-steel-light/70">
          {demos.map((demo) => (
            <li key={demo.href}>
              <a
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 py-6 transition-transform duration-300 hover:-translate-y-0.5 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <span className="font-display text-2xl font-semibold text-charcoal transition-colors group-hover:text-ember md:text-3xl">
                  {demo.name}
                </span>
                <span className="flex items-center gap-3 text-sm text-steel md:max-w-md md:text-right">
                  {demo.description}
                  <span className="shrink-0 font-semibold text-ember transition-transform group-hover:translate-x-0.5">
                    View →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
