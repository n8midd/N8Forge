export const contact = {
  email: "n8middleton@gmail.com",
  phone: "512-481-8028",
  phoneHref: "tel:+15124818028",
  social: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
} as const;

export const demos = [
  {
    name: "Pool Service",
    href: "https://demo-pool-service-company.vercel.app",
    description: "Service company site with clear calls to action",
  },
  {
    name: "BBQ Business",
    href: "https://demo-bbq-business.vercel.app",
    description: "Food business site built for local customers",
  },
  {
    name: "Lawn Care",
    href: "https://demo-lawn-care-business.vercel.app",
    description: "Outdoor services site with booking-ready layout",
  },
] as const;

export type PackageInterest =
  | "Starter Website"
  | "Professional"
  | "Not sure yet";

export type CarePlanInterest =
  | "Yes — with my package"
  | "No thanks"
  | "Not sure yet";

export const pageOptions = [
  "Home",
  "About",
  "Services",
  "Pricing",
  "Gallery / Portfolio",
  "Blog",
  "Contact",
  "FAQ",
  "Testimonials / Reviews",
  "Booking / Appointments",
] as const;

export const featureOptions = [
  "Contact form",
  "Online booking",
  "Google Maps",
  "Photo gallery",
  "Blog",
  "Customer reviews",
  "Analytics",
  "SEO basics",
  "Speed optimization",
  "Multi-location pages",
] as const;

export const integrationOptions = [
  "Google Business Profile",
  "Google Analytics",
  "Email marketing (Mailchimp, etc.)",
  "Payment processing (Stripe, Square, etc.)",
  "Scheduling (Calendly, etc.)",
  "CRM",
  "Social media feeds",
  "None / not sure",
] as const;

export type ImageStatus =
  | "I have photos ready"
  | "I need help with photos"
  | "Mix of both"
  | "Not sure yet";

export type TextStatus =
  | "I have copy written"
  | "I need help writing copy"
  | "Mix of both"
  | "Not sure yet";

export type DomainStatus =
  | "I already own a domain"
  | "I need to buy a domain"
  | "Not sure yet";

export type ExistingSiteStatus =
  | "No existing website"
  | "Yes — redesign / rebuild"
  | "Yes — keep and improve";

export type Timeframe =
  | "ASAP"
  | "2–4 weeks"
  | "1–2 months"
  | "Flexible / exploring";

export type IntakeValues = {
  name: string;
  business: string;
  email: string;
  phone: string;
  packageInterest: PackageInterest;
  carePlanInterest: CarePlanInterest;
  businessDescription: string;
  pages: string[];
  customPages: string;
  pageNotes: string;
  imageStatus: ImageStatus;
  textStatus: TextStatus;
  brandNotes: string;
  features: string[];
  integrations: string[];
  otherIntegrations: string;
  domainStatus: DomainStatus;
  domainName: string;
  existingSiteStatus: ExistingSiteStatus;
  existingSiteUrl: string;
  timeframe: Timeframe;
  additionalNotes: string;
};

export const initialIntake: IntakeValues = {
  name: "",
  business: "",
  email: "",
  phone: "",
  packageInterest: "Not sure yet",
  carePlanInterest: "Not sure yet",
  businessDescription: "",
  pages: ["Home", "About", "Services", "Contact"],
  customPages: "",
  pageNotes: "",
  imageStatus: "Not sure yet",
  textStatus: "Not sure yet",
  brandNotes: "",
  features: ["Contact form", "SEO basics"],
  integrations: [],
  otherIntegrations: "",
  domainStatus: "Not sure yet",
  domainName: "",
  existingSiteStatus: "No existing website",
  existingSiteUrl: "",
  timeframe: "Flexible / exploring",
  additionalNotes: "",
};

function listOrNone(items: string[]): string {
  return items.length ? items.join(", ") : "(none)";
}

export function formatIntakeSubject(values: IntakeValues): string {
  return `Website intake — ${values.business || values.name || "New inquiry"}`;
}

export function formatIntakeBody(values: IntakeValues): string {
  return [
    "=== CONTACT ===",
    `Name: ${values.name}`,
    `Business: ${values.business}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "(none)"}`,
    `Package interest: ${values.packageInterest}`,
    `Monthly Care add-on: ${values.carePlanInterest}${
      values.packageInterest === "Starter Website"
        ? " ($50/mo if Starter)"
        : values.packageInterest === "Professional"
          ? " ($150/mo if Professional)"
          : " ($50/mo Starter · $150/mo Professional)"
    }`,
    `About the business: ${values.businessDescription || "(none)"}`,
    "",
    "=== PAGES ===",
    `Selected: ${listOrNone(values.pages)}`,
    `Custom pages: ${values.customPages || "(none)"}`,
    `Page notes: ${values.pageNotes || "(none)"}`,
    "",
    "=== CONTENT ===",
    `Images: ${values.imageStatus}`,
    `Text / copy: ${values.textStatus}`,
    `Brand / logo notes: ${values.brandNotes || "(none)"}`,
    "",
    "=== FEATURES ===",
    listOrNone(values.features),
    "",
    "=== INTEGRATIONS ===",
    listOrNone(values.integrations),
    `Other: ${values.otherIntegrations || "(none)"}`,
    "",
    "=== DOMAIN & EXISTING SITE ===",
    `Domain: ${values.domainStatus}`,
    `Domain name: ${values.domainName || "(none)"}`,
    `Existing site: ${values.existingSiteStatus}`,
    `Existing URL: ${values.existingSiteUrl || "(none)"}`,
    "",
    "=== TIMELINE ===",
    `Timeframe: ${values.timeframe}`,
    `Additional notes: ${values.additionalNotes || "(none)"}`,
  ].join("\n");
}

export function isValidIntake(values: unknown): values is IntakeValues {
  if (!values || typeof values !== "object") return false;
  const v = values as Partial<IntakeValues>;
  return (
    typeof v.name === "string" &&
    v.name.trim().length > 0 &&
    typeof v.business === "string" &&
    v.business.trim().length > 0 &&
    typeof v.email === "string" &&
    v.email.trim().length > 0 &&
    Array.isArray(v.pages)
  );
}
