import type { Metadata } from "next";
import { SiteShell } from "../../components/SiteShell";
import { owner } from "../../lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How N8Forge collects and uses contact information from website game plan requests.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <article className="bg-off-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ember">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-charcoal md:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-5 text-sm text-steel">Last updated: August 2026</p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-neutral">
            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Who we are
              </h2>
              <p className="mt-3">
                N8Forge is operated by {owner.name} in {owner.location}. This
                policy explains how contact details submitted through this website
                are handled.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                What we collect
              </h2>
              <p className="mt-3">
                When you submit the website game plan form, we collect the
                information you provide: name, business name, email address,
                phone number (optional), package interest, and a short description
                of what you need.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                How we use it
              </h2>
              <p className="mt-3">
                We use this information only to respond to your inquiry, prepare a
                recommended site structure and pricing, and follow up about a
                potential project. We do not sell your information or share it
                with third parties for marketing.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Email delivery
              </h2>
              <p className="mt-3">
                Form submissions are delivered by email through Resend, a third-
                party email service, so I can receive your request and send you a
                confirmation. Resend processes message content solely to deliver
                email on our behalf.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Analytics
              </h2>
              <p className="mt-3">
                This site may use Vercel Analytics for basic, privacy-oriented
                traffic measurement. That service does not rely on the personal
                details from the contact form.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                How long we keep it
              </h2>
              <p className="mt-3">
                Inquiry emails are retained as long as needed to manage the
                conversation and any related work, then deleted or archived in the
                ordinary course of email management.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Your requests
              </h2>
              <p className="mt-3">
                To ask what information we hold about you, or request deletion of
                an inquiry, email{" "}
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
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-charcoal">
                Changes
              </h2>
              <p className="mt-3">
                If this policy changes in a material way, the updated version will
                be posted on this page with a new “last updated” date.
              </p>
            </section>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
