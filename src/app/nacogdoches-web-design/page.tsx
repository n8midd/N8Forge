import { JsonLd, serviceJsonLd } from "../../components/JsonLd";
import { ServicePageContent } from "../../components/ServicePageContent";
import { SiteShell } from "../../components/SiteShell";
import { SITE_URL, caseStudyLux } from "../../lib/contact";
import { pageMetadata } from "../../lib/metadata";

const title = "Nacogdoches web design for local service businesses";
const description =
  "Custom web design for Nacogdoches and East Texas service businesses. Flat-rate packages from $400. Work directly with a local developer — free website game plan, no obligation.";
const path = "/nacogdoches-web-design";

export const metadata = pageMetadata({
  title: "Nacogdoches Web Design",
  description,
  path,
});

export default function NacogdochesWebDesignPage() {
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
        eyebrow="Nacogdoches"
        title={title}
        intro="If you run a service business in Nacogdoches, your website should help people call, book, or request a quote — not bury them in a template. N8Forge builds custom sites locally with straightforward pricing and one-on-one support."
        sections={[
          {
            heading: "Built for how local customers search",
            body: "Homeowners and nearby residents often search on their phone, glance at services, check location, then call or book. I design for that path: clear headlines, mobile layout, Maps, and a form or booking button that is hard to miss.",
          },
          {
            heading: "Transparent packages",
            body: "Starter websites begin at $400 for smaller businesses that need a professional presence. Growth and Professional tiers add portfolio, testimonials, stronger lead forms, booking, and longer support. You get a flat rate before build work starts.",
          },
          {
            heading: "You work with Nathan in Nacogdoches",
            body: "No call center, no offshore support queue. From game plan through launch, you deal with the person writing the code. Typical delivery is about 10 business days after we agree on scope and content.",
          },
          {
            heading: "Real client work nearby",
            body: "Lux Massage Therapy moved from a generic booking template to a branded site with a clear path to book. Arreguin HR Consulting had no website and very little internet visibility — we built the first professional site, local pages, and a consultation path. Demos are labeled as demos on the portfolio page.",
          },
        ]}
        proof={{
          body: "Lux Massage Therapy in Nacogdoches moved from a generic booking page to a branded site with a clear path to book.",
          imageSrc: caseStudyLux.screenshots.afterDesktop,
          imageAlt: "Lux Massage Therapy custom website",
          href: caseStudyLux.afterUrl,
          hrefLabel: "Visit the live client site",
          external: true,
        }}
      />
    </SiteShell>
  );
}
