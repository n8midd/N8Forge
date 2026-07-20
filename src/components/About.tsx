import { owner } from "../lib/contact";

export function About() {
  return (
    <section id="about" className="scroll-mt-8 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
          About
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
          {owner.name}
        </h2>
        <p className="mt-1 text-steel">{owner.location}</p>

        <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-neutral md:text-lg">
          <p>
            I&apos;m the owner and builder at N8Forge, with{" "}
            {owner.experience.toLowerCase()}. {owner.tagline}
          </p>
        </div>

        <dl className="mt-10 grid gap-6 text-sm sm:grid-cols-2 md:grid-cols-3">
          <div>
            <dt className="text-steel">Phone</dt>
            <dd className="mt-1">
              <a
                href={owner.phoneHref}
                className="font-medium text-charcoal transition-colors hover:text-primary"
              >
                {owner.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-steel">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${owner.email}`}
                className="font-medium text-charcoal transition-colors hover:text-primary"
              >
                {owner.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-steel">Social</dt>
            <dd className="mt-1">
              {owner.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-charcoal transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
