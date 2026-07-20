export const contact = {
  email: "n8middleton@gmail.com",
  phone: "512-481-8028",
  phoneHref: "tel:+15124818028",
  social: [{ label: "Facebook", href: "https://www.facebook.com/n8forge" }],
} as const;

export const owner = {
  name: "Nathan Middleton",
  location: "Nacogdoches, TX",
  experience: "18 years of professional software experience",
  tagline:
    "You work directly with me from the first conversation through launch — no call centers, no ticket queues.",
  ...contact,
} as const;

export const foundingClientPackage = {
  name: "East Texas Founding Client Package",
  price: "$400",
  spotsTotal: 3,
  features: [
    "Custom website with up to five pages",
    "Mobile-friendly design",
    "Contact, booking, or estimate-request form",
    "Basic local SEO",
    "Help writing content and selecting photos",
    "Delivered in approximately 10 business days",
    "Affordable hosting and maintenance starting at $49/month",
  ],
  maintenance: "$49/month",
  terms:
    "First three clients receive this $400 launch price in exchange for an honest testimonial and permission to feature the project.",
} as const;

export const caseStudyLux = {
  client: "Lux Massage Therapy",
  owner: "Valarie Middleton, LMT",
  location: "Nacogdoches, TX",
  beforeUrl: "https://mysite.vagaro.com/luxmassagetherapy1",
  afterUrl: "https://nacluxmassage.com/",
  need:
    "Valarie relied on a generic Vagaro booking page — template look, limited branding, and no real home for her business online.",
  built:
    "A custom site at nacluxmassage.com with branded design, mobile-first layout, clear services, and direct Book on Vagaro integration.",
  booking:
    "Online booking still runs through Vagaro — the platform Valarie already uses — but it feels native on the new site. Clients browse services, learn about Lux, and book without confusion.",
  testimonial: {
    quote:
      "Nathan took our Vagaro page and turned it into a website that actually feels like Lux Massage Therapy. Clients can learn about our services, find us easily on mobile, and book without confusion. It looks professional, and I finally have something I'm proud to share.",
    author: "Valarie Middleton, LMT",
    business: "Lux Massage Therapy",
  },
  screenshots: {
    beforeDesktop: "/case-studies/lux/before-desktop.png",
    beforeMobile: "/case-studies/lux/before-mobile.png",
    afterDesktop: "/case-studies/lux/after-desktop.png",
    afterMobile: "/case-studies/lux/after-mobile.png",
  },
} as const;

export type IntakeValues = {
  name: string;
  business: string;
  email: string;
  phone: string;
  need: string;
};

export const initialIntake: IntakeValues = {
  name: "",
  business: "",
  email: "",
  phone: "",
  need: "",
};

export function formatIntakeSubject(values: IntakeValues): string {
  return `Website plan request — ${values.business || values.name || "New inquiry"}`;
}

export function formatIntakeBody(values: IntakeValues): string {
  return [
    "=== WEBSITE PLAN REQUEST ===",
    `Name: ${values.name}`,
    `Business: ${values.business}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "(none)"}`,
    "",
    "What they need:",
    values.need || "(none)",
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
    typeof v.need === "string" &&
    v.need.trim().length > 0
  );
}
