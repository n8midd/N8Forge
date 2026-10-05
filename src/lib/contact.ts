export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.n8-forge.com";

export const CTA = {
  label: "Get Your Free Website Game Plan",
  href: "/#contact",
  homeHref: "#contact",
  deliverable:
    "I'll review your business and send you a recommended site structure, features, and flat-rate price — no obligation.",
  response: "I'll personally respond within one business day. No sales pressure.",
  turnaround: "Typical turnaround is about 10 business days after we agree on the plan.",
} as const;

export const contact = {
  email: "n8middleton@gmail.com",
  phone: "512-481-8028",
  phoneHref: "tel:+15124818028",
  smsHref: "sms:+15124818028",
  social: [{ label: "Facebook", href: "https://www.facebook.com/n8forge" }],
} as const;

export const owner = {
  name: "Nathan Middleton",
  location: "Nacogdoches, TX",
  serviceArea: "East Texas · Based in Nacogdoches",
  experience: "18 years of professional software experience",
  tagline:
    "You work directly with me from the first conversation through launch — no call centers, no ticket queues.",
  ...contact,
} as const;

export type ProjectLabel = "Client site" | "Demo / concept";

export type PortfolioProject = {
  name: string;
  href: string;
  label: ProjectLabel;
  description: string;
  location?: string;
  screenshot?: string;
};

export const portfolio: PortfolioProject[] = [
  {
    name: "Lux Massage Therapy",
    href: "https://nacluxmassage.com/",
    label: "Client site",
    location: "Nacogdoches, TX",
    description:
      "Branded marketing site with clear services and one-tap booking through Vagaro.",
    screenshot: "/case-studies/lux/after-desktop.png",
  },
  {
    name: "Arreguin HR Consulting",
    href: "https://arreguinhrconsulting.com/",
    label: "Client site",
    location: "Nacogdoches, TX",
    description:
      "Custom site for an East Texas HR consultancy that previously had no website — services, local pages, and a clear consultation path.",
    screenshot: "/case-studies/arreguin/after-desktop.png",
  },
  {
    name: "Evolution Sweets",
    href: "https://evolution-sweets.vercel.app/",
    label: "Client site",
    location: "Nacogdoches, TX",
    description:
      "Kid-owned freeze-dried candy shop — product catalog, local pickup, and online ordering path.",
    screenshot: "/case-studies/evolution-sweets/desktop.png",
  },
  {
    name: "Pool Service",
    href: "https://demo-pool-service-company.vercel.app",
    label: "Demo / concept",
    description:
      "Service-company concept site with clear calls to action for local customers.",
    screenshot: "/portfolio/pool-desktop.png",
  },
  {
    name: "BBQ Business",
    href: "https://demo-bbq-business.vercel.app",
    label: "Demo / concept",
    description:
      "Food-business concept site built for local discovery and orders of interest.",
    screenshot: "/portfolio/bbq-desktop.png",
  },
  {
    name: "Lawn Care",
    href: "https://demo-lawn-care-business.vercel.app",
    label: "Demo / concept",
    description:
      "Outdoor-services concept with booking-ready layout for homeowners.",
    screenshot: "/portfolio/lawn-desktop.png",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  business: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nathan took our Vagaro page and turned it into a website that actually feels like Lux Massage Therapy. Clients can learn about our services, find us easily on mobile, and book without confusion. It looks professional, and I finally have something I'm proud to share.",
    author: "Valarie Middleton, LMT",
    business: "Lux Massage Therapy",
  },
];

export type CaseStudyHighlight = {
  title: string;
  body: string;
};

export type CaseStudyScreenshots = {
  afterDesktop: string;
  afterMobile: string;
  beforeDesktop?: string;
  beforeMobile?: string;
  beforeCaption?: string;
  afterCaption?: string;
};

export type CaseStudyContent = {
  id: string;
  client: string;
  owner: string;
  location: string;
  afterUrl: string;
  need: string;
  built: string;
  results: readonly string[];
  screenshots: CaseStudyScreenshots;
  beforeUrl?: string;
  beforeLinkLabel?: string;
  startingPoint?: string;
  highlight?: CaseStudyHighlight;
  testimonial?: Testimonial;
};

export const caseStudyLux: CaseStudyContent = {
  id: "lux",
  client: "Lux Massage Therapy",
  owner: "Valarie Middleton, LMT",
  location: "Nacogdoches, TX",
  beforeUrl: "https://mysite.vagaro.com/luxmassagetherapy1",
  beforeLinkLabel: "View original Vagaro page →",
  afterUrl: "https://nacluxmassage.com/",
  need:
    "Valarie relied on a generic Vagaro booking page — template look, limited branding, and no real home for her business online.",
  built:
    "A custom site at nacluxmassage.com with branded design, mobile-first layout, clear services, and direct Book on Vagaro integration.",
  highlight: {
    title: "Booking that fits the business",
    body: "Online booking still runs through Vagaro — the platform Valarie already uses — but it feels native on the new site. Clients browse services, learn about Lux, and book without confusion.",
  },
  results: [
    "Moved from a generic Vagaro template landing page to a branded marketing site on a custom domain",
    "Primary homepage CTA reaches Book on Vagaro in a single clear action",
    "Mobile-first layout so clients can learn about services and book on phone",
    "Services, location, and contact presented as a real business — not only a scheduler",
  ],
  testimonial: testimonials[0],
  screenshots: {
    beforeDesktop: "/case-studies/lux/before-desktop.png",
    beforeMobile: "/case-studies/lux/before-mobile.png",
    beforeCaption: "Before — Vagaro template",
    afterDesktop: "/case-studies/lux/after-desktop.png",
    afterMobile: "/case-studies/lux/after-mobile.png",
    afterCaption: "After — Custom N8Forge site",
  },
};

export const caseStudyArreguin: CaseStudyContent = {
  id: "arreguin",
  client: "Arreguin HR Consulting",
  owner: "Tarah Arreguin, MBA, PHR",
  location: "Nacogdoches, TX",
  afterUrl: "https://arreguinhrconsulting.com/",
  need:
    "Tarah was launching Arreguin HR Consulting, LLC in Nacogdoches and East Texas with no website and almost no internet presence. Prospective clients had nowhere to learn who she is, what fractional HR support looks like, or how to start a conversation.",
  built:
    "A custom site at arreguinhrconsulting.com: branded professional presence, situation-based entry points (employee problem, handbook, hiring, manager support, ongoing HR), service pages, local pages for East Texas / Nacogdoches / Lufkin, founder story, resources, and a clear path to schedule a consultation or request an HR assessment.",
  startingPoint:
    "No website and very low internet visibility. Prospective clients had nowhere to find the firm, services, or a way to start a conversation.",
  highlight: {
    title: "A consultation path that fits a consulting practice",
    body: "Visitors start with the situation they are facing — not HR jargon — then move to schedule a consultation, request an assessment, or contact the firm. There is no booking widget to force; the site matches how a consulting relationship actually begins.",
  },
  results: [
    "First professional website and custom domain — previously no site",
    "Named local presence for HR consulting in Nacogdoches, Lufkin, and East Texas",
    "Situation-based paths so owners can start without HR jargon",
    "Consultation and assessment CTAs throughout the site",
    "Credentials, services, and service area presented as a real firm instead of a blank search result",
    "Resource articles as an ongoing visibility base",
  ],
  screenshots: {
    afterDesktop: "/case-studies/arreguin/after-desktop.png",
    afterMobile: "/case-studies/arreguin/after-mobile.png",
    afterCaption: "After — Custom N8Forge site",
  },
};

export const packageOptions = [
  { value: "starter", label: "Starter Website ($400)" },
  { value: "growth", label: "Growth Website ($750)" },
  { value: "professional", label: "Professional Website ($1,000)" },
  { value: "care", label: "Monthly Care ($49/mo)" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export type PackageValue = (typeof packageOptions)[number]["value"];

export type IntakeValues = {
  name: string;
  business: string;
  email: string;
  phone: string;
  need: string;
  package: PackageValue | "";
  /** Honeypot — must remain empty for real humans. */
  website: string;
};

export const initialIntake: IntakeValues = {
  name: "",
  business: "",
  email: "",
  phone: "",
  need: "",
  package: "",
  website: "",
};

const packageLabels: Record<PackageValue, string> = {
  starter: "Starter Website ($400)",
  growth: "Growth Website ($750)",
  professional: "Professional Website ($1,000)",
  care: "Monthly Care ($49/mo)",
  unsure: "Not sure yet",
};

export function packageLabel(value: PackageValue | ""): string {
  if (!value) return "(none)";
  return packageLabels[value] ?? value;
}

export function formatIntakeSubject(values: IntakeValues): string {
  // Fields are already single-line sanitized in parseIntake; keep subject short.
  const label = (values.business || values.name || "New inquiry").slice(0, 80);
  return `Website game plan — ${label}`;
}

export function formatIntakeBody(values: IntakeValues): string {
  return [
    "=== WEBSITE GAME PLAN REQUEST ===",
    `Name: ${values.name}`,
    `Business: ${values.business}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "(none)"}`,
    `Package interest: ${packageLabel(values.package)}`,
    "",
    "What they need:",
    values.need || "(none)",
  ].join("\n");
}

export function formatLeadConfirmationBody(values: IntakeValues): string {
  return [
    `Hi ${values.name || "there"},`,
    "",
    "Thanks for requesting a free website game plan from N8Forge. I received your note and will personally reply within one business day.",
    "",
    "What you asked about:",
    values.need || "(you can reply to this email to add more detail)",
    "",
    values.package
      ? `Package interest: ${packageLabel(values.package)}`
      : null,
    "",
    "No obligation and no sales pressure — just a clear recommended structure, features, and flat-rate price for your business.",
    "",
    `If you'd rather talk sooner, call or text me at ${owner.phone}, or reply to this email.`,
    "",
    "— Nathan Middleton",
    "N8Forge · Nacogdoches, TX",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function siteHostname(): string {
  try {
    return new URL(SITE_URL).hostname;
  } catch {
    return "www.n8-forge.com";
  }
}
