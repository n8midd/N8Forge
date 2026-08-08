import type { Metadata } from "next";
import { JsonLd, serviceJsonLd } from "../../components/JsonLd";
import { ServicePageContent } from "../../components/ServicePageContent";
import { SiteShell } from "../../components/SiteShell";
import { SITE_URL } from "../../lib/contact";

const title = "Local SEO that supports more calls and customers";
const description =
  "Local SEO and Google Business Profile help for East Texas businesses. Get found for the services you offer in Nacogdoches and nearby markets — on top of a solid website.";
const path = "/local-seo";

export const metadata: Metadata = {
  title: "Local SEO & Google Business Help | N8Forge East Texas",
  description,
};

export default function LocalSeoPage() {
  return (
    <SiteShell>
      <JsonLd
        data={serviceJsonLd({
          name: title,
          description,
          url: `${SITE_URL}${path}`,
        })}
      />
      <ServicePageContent
        eyebrow="Local visibility"
        title={title}
        intro="A website alone is not enough if people cannot find you on Google. I help East Texas service businesses show up where local customers search — Maps, Business Profile, and on-site basics that match how you actually sell."
        sections={[
          {
            heading: "What local customers need",
            body: "They need to know you serve their area, what you do, how to reach you, and whether you look trustworthy. That means accurate hours and location, clear service pages, and a profile that matches your real business name and photos.",
          },
          {
            heading: "What I can help with",
            body: "Google Business Profile setup and cleanup, on-page SEO for service and location pages, Google Maps and Analytics, and content that matches search intent (services, service areas, FAQs) without stuffing keywords.",
          },
          {
            heading: "Website + local presence together",
            body: "Profiles send people to your site. Your site should convert them with forms, calls, and booking. I plan both so you are not paying for visibility that dumps visitors into a weak page.",
          },
          {
            heading: "Honest expectations",
            body: "Local SEO is ongoing, not a magic once-and-done switch. Rankings depend on competition, reviews, consistency, and quality of the site. I'll be direct about what is realistic for your niche and town.",
          },
        ]}
      />
    </SiteShell>
  );
}
