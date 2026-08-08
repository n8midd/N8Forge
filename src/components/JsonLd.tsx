import { SITE_URL, owner } from "../lib/contact";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  // Escape < so a rogue string cannot break out of the <script> element.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "N8Forge",
    url: SITE_URL,
    email: owner.email,
    telephone: "+1-512-481-8028",
    description:
      "Custom websites for East Texas service businesses. Flat-rate packages from $400. Based in Nacogdoches, TX.",
    priceRange: "$400–$1000",
    areaServed: [
      {
        "@type": "City",
        name: "Nacogdoches",
        containedInPlace: {
          "@type": "State",
          name: "Texas",
        },
      },
      {
        "@type": "AdministrativeArea",
        name: "East Texas",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nacogdoches",
      addressRegion: "TX",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: owner.name,
    },
  };
}

export function faqPageJsonLd(
  faqs: readonly { q: string; a: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  providerName?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: {
      "@type": "LocalBusiness",
      name: input.providerName ?? "N8Forge",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "East Texas",
    },
  };
}
