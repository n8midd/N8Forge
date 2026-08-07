import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "../../components/SiteShell";
import { CTA, portfolio } from "../../lib/contact";

export const metadata: Metadata = {
  title: "Portfolio — Client Sites & Demo Concepts | N8Forge",
  description:
    "See client websites and clearly labeled demo concepts from N8Forge in Nacogdoches, TX. Real work first — demos never presented as paid clients.",
};

export default function PortfolioPage() {
  return (
    <SiteShell>
      <section className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
            Portfolio
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
            Work that shows the approach
          </h1>
          <p className="mt-4 max-w-2xl text-steel">
            Client sites are labeled as such. Demo and concept sites show design
            quality and industry patterns — never fake social proof.
          </p>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {portfolio.map((project) => (
              <li key={project.href}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border border-steel-light/60 bg-white"
                >
                  {project.screenshot ? (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-steel-light/60">
                      <Image
                        src={project.screenshot}
                        alt={`${project.name} preview`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-end bg-primary/10 p-6">
                      <span className="font-display text-2xl font-semibold text-primary">
                        {project.name}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        project.label === "Client site" ? "text-ember" : "text-steel"
                      }`}
                    >
                      {project.label}
                    </span>
                    <p className="mt-2 font-display text-xl font-semibold text-charcoal group-hover:text-ember">
                      {project.name}
                    </p>
                    <p className="mt-2 text-sm text-steel">{project.description}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <Link
            href={CTA.href}
            className="mt-12 inline-flex bg-ember px-6 py-3 text-sm font-semibold text-white hover:bg-ember-deep"
          >
            {CTA.label}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
