/**
 * Deterministic scoring weights. AI must never mutate these or final scores.
 * Each category totals 100 points; deductions clamp at 0.
 */

export const SEO_WEIGHTS = {
  title: 10,
  metaDescription: 5,
  h1: 5,
  canonical: 5,
  https: 5,
  sitemap: 5,
  robots: 5,
  structuredData: 10,
  internalLinks: 10,
  altText: 10,
  serviceContent: 10,
  localSignals: 10,
  indexability: 10,
} as const;

export const PERFORMANCE_WEIGHTS = {
  psiScore: 30,
  lcp: 20,
  inp: 15,
  cls: 15,
  imagesJs: 10,
  renderBlockingCaching: 10,
} as const;

export const LOCAL_WEIGHTS = {
  phone: 15,
  addressOrArea: 15,
  cityInTitle: 10,
  cityInH1: 10,
  serviceAreaContent: 15,
  localSchema: 15,
  locationPages: 10,
  localTrust: 10,
} as const;

export const CONVERSION_WEIGHTS = {
  primaryCta: 15,
  ctaAboveFold: 10,
  clickablePhone: 15,
  contactForm: 15,
  formSimplicity: 5,
  mobileCta: 10,
  clearServices: 10,
  clearNextStep: 10,
  socialProofCues: 5,
  faqOrPricing: 5,
} as const;

export const MOBILE_WEIGHTS = {
  psiMobile: 50,
  viewport: 15,
  tapPhone: 20,
  mobileCta: 15,
} as const;

export const TRUST_WEIGHTS = {
  testimonials: 20,
  about: 15,
  team: 10,
  insuranceLicense: 15,
  policies: 10,
  social: 10,
  realPhotos: 10,
  contactInfo: 10,
} as const;

/** Overall is weighted average of category scores. */
export const OVERALL_WEIGHTS = {
  seo: 0.2,
  performance: 0.15,
  local: 0.2,
  conversion: 0.2,
  mobile: 0.1,
  trust: 0.15,
} as const;

export function clampScore(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}
