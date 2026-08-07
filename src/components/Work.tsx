import Image from "next/image";
import Link from "next/link";
import { portfolio } from "../lib/contact";

export function Work() {
  return (
    <section id="work" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          Proof
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          See what I build
        </h2>
        <p className="mt-3 max-w-2xl text-steel">
          Real client work and clearly labeled demo concepts. Demo sites show
          approach and design quality — they are not paying customers.
        </p>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {portfolio.map((project) => (
            <li key={project.href}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col border border-steel-light/60 bg-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                {project.screenshot ? (
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-steel-light/60 bg-surface">
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} website preview`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-end border-b border-steel-light/60 bg-primary/10 p-6">
                    <span className="font-display text-2xl font-semibold text-primary">
                      {project.name}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`w-fit text-xs font-semibold uppercase tracking-wide ${
                      project.label === "Client site"
                        ? "text-ember"
                        : "text-steel"
                    }`}
                  >
                    {project.label}
                  </span>
                  <span className="mt-2 font-display text-xl font-semibold text-charcoal transition-colors group-hover:text-ember">
                    {project.name}
                  </span>
                  {project.location ? (
                    <span className="mt-1 text-sm text-steel">{project.location}</span>
                  ) : null}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral">
                    {project.description}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-ember">
                    Open site →
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-steel">
          <Link href="/portfolio" className="font-medium text-primary hover:text-primary-light">
            View full portfolio
          </Link>
        </p>
      </div>
    </section>
  );
}
