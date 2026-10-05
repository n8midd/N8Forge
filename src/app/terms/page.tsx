import Link from "next/link";
import { SiteShell } from "../../components/SiteShell";
import { owner } from "../../lib/contact";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Terms",
  description:
    "How N8Forge website projects are scoped, priced, and delivered. No long-term lock-in for the build itself.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteShell>
      <article className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember-ink">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
            Terms
          </h1>
          <p className="mt-5 text-sm text-steel">Last updated: October 2026</p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-neutral">
            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Who these terms cover
              </h2>
              <p className="mt-3">
                N8Forge is operated by {owner.name} in {owner.location}. These
                terms apply when you request a website game plan or hire N8Forge
                to design, build, or care for a website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Game plans
              </h2>
              <p className="mt-3">
                A website game plan is a no-obligation recommendation: proposed
                structure, features, and a flat-rate price. Requesting a plan
                does not commit you to a project.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Scope, price, and timeline
              </h2>
              <p className="mt-3">
                Paid work starts after we agree on scope, price, and timeline in
                writing. Typical turnaround is about 10 business days after we
                agree on the plan and you provide the content we need. Larger
                projects or content delays can take longer. There is no long-term
                lock-in for the build itself.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Payment
              </h2>
              <p className="mt-3">
                Website packages are billed as agreed in writing before work
                starts. Optional Monthly Care is a separate, cancelable
                subscription for hosting and small updates. Domain registration
                and third-party tools (booking, email, analytics) may have their
                own fees.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Ownership
              </h2>
              <p className="mt-3">
                When the project is paid and delivered, the website we built for
                you is yours. You can host it with Monthly Care or move it to
                your own account.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Your content
              </h2>
              <p className="mt-3">
                You are responsible for having the right to use the text, photos,
                logos, and other materials you provide. I will not knowingly
                publish content you do not have permission to use.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Questions
              </h2>
              <p className="mt-3">
                Email{" "}
                <a
                  href={`mailto:${owner.email}`}
                  className="font-medium text-primary hover:text-primary-light"
                >
                  {owner.email}
                </a>{" "}
                or call{" "}
                <a
                  href={owner.phoneHref}
                  className="font-medium text-primary hover:text-primary-light"
                >
                  {owner.phone}
                </a>
                . See also the{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary hover:text-primary-light"
                >
                  privacy policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
