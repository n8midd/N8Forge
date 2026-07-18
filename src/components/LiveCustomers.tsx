import { liveCustomers } from "../lib/contact";

export function LiveCustomers() {
  return (
    <section id="clients" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          Success
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          Live customers
        </h2>
        <p className="mt-3 max-w-xl text-steel">
          Real East Texas businesses online with N8Forge — not demos, live sites
          serving real customers.
        </p>

        <ul className="mt-12 divide-y divide-steel-light/70 border-y border-steel-light/70">
          {liveCustomers.map((customer) => (
            <li key={customer.href}>
              <a
                href={customer.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 py-6 transition-transform duration-300 hover:-translate-y-0.5 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <span className="min-w-0">
                  <span className="font-display text-2xl font-semibold text-charcoal transition-colors group-hover:text-ember md:text-3xl">
                    {customer.name}
                  </span>
                  <span className="mt-1 block text-sm text-steel">
                    {customer.location}
                  </span>
                </span>
                <span className="flex items-center gap-3 text-sm text-steel md:max-w-md md:text-right">
                  {customer.description}
                  <span className="shrink-0 font-semibold text-ember transition-transform group-hover:translate-x-0.5">
                    Visit →
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
