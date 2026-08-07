import type { Metadata } from "next";
import { ServicePageContent } from "../../components/ServicePageContent";
import { SiteShell } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Website Redesign for Local Businesses | N8Forge",
  description:
    "Redesign outdated or template websites for East Texas service businesses. Keep your domain and booking tools — get a modern site that converts. Free game plan, flat pricing.",
};

export default function WebsiteRedesignPage() {
  return (
    <SiteShell>
      <ServicePageContent
        eyebrow="Redesign"
        title="Website redesign when your current site is holding you back"
        intro="Many businesses already have a site — outdated design, hard to update, slow on mobile, or stuck on a generic booking page. A redesign keeps what works (domain, reviews, booking systems) and rebuilds the experience customers see first."
        sections={[
          {
            heading: "When redesign makes sense",
            body: "Your site looks dated next to competitors, booking is hard to find, the phone number is buried, or you’re embarrassed to share the URL. If the site is just a digital business card with no path to action, a rethink usually pays off.",
          },
          {
            heading: "What stays / what changes",
            body: "You can keep your domain, email, Vagaro or other booking platforms, and Google Business Profile. We replace weak layout, unclear copy, and clunky mobile experience with a structure aimed at calls, bookings, and estimates.",
          },
          {
            heading: "How the project works",
            body: "You request a free website game plan. I review the current site and recommend pages, features, and a flat price. After we agree, I rebuild and launch on a timeline that typically sits around 10 business days for scoped projects.",
          },
          {
            heading: "Example path",
            body: "Lux Massage Therapy moved from a Vagaro template page to a branded site with the same booking backend embedded as a clear next step. That pattern works for many local services: better marketing site, familiar tools for appointments.",
          },
        ]}
      />
    </SiteShell>
  );
}
