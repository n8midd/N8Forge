import type {
  FindingCategory,
  FindingDifficulty,
  FindingPriority,
  GrowthOpportunity,
} from "../supabase/types";

export type ScoreCategory =
  | "seo"
  | "performance"
  | "local"
  | "conversion"
  | "mobile"
  | "trust";

export type FindingCode =
  | "seo.missing_title"
  | "seo.short_title"
  | "seo.long_title"
  | "seo.missing_meta"
  | "seo.short_meta"
  | "seo.long_meta"
  | "seo.missing_h1"
  | "seo.multiple_h1"
  | "seo.heading_structure"
  | "seo.missing_canonical"
  | "seo.not_https"
  | "seo.robots_blocks"
  | "seo.missing_robots"
  | "seo.missing_sitemap"
  | "seo.no_structured_data"
  | "seo.weak_internal_links"
  | "seo.broken_links"
  | "seo.missing_alt"
  | "seo.missing_og"
  | "seo.thin_content"
  | "seo.weak_service_content"
  | "seo.duplicate_headings"
  | "performance.slow_lcp"
  | "performance.poor_inp"
  | "performance.poor_cls"
  | "performance.heavy_images"
  | "performance.heavy_js"
  | "performance.render_blocking"
  | "performance.weak_caching"
  | "performance.low_score"
  | "local.missing_phone"
  | "local.missing_address"
  | "local.missing_city"
  | "local.weak_service_area"
  | "local.no_local_schema"
  | "local.city_not_in_title"
  | "local.city_not_in_h1"
  | "local.no_location_pages"
  | "local.weak_testimonials_local"
  | "conversion.no_primary_cta"
  | "conversion.cta_not_above_fold"
  | "conversion.no_clickable_phone"
  | "conversion.no_contact_form"
  | "conversion.complex_form"
  | "conversion.no_sticky_mobile_cta"
  | "conversion.unclear_services"
  | "conversion.unclear_next_step"
  | "conversion.no_faq"
  | "conversion.no_pricing_signal"
  | "trust.no_testimonials"
  | "trust.no_about"
  | "trust.no_team"
  | "trust.no_insurance_license"
  | "trust.no_privacy"
  | "trust.no_social"
  | "trust.no_real_photos"
  | "trust.weak_contact"
  | "mobile.low_psi"
  | "mobile.no_viewport"
  | "mobile.no_tap_phone"
  | "mobile.no_mobile_cta";

export type FindingCandidate = {
  code: FindingCode;
  category: FindingCategory;
  priority: FindingPriority;
  difficulty: FindingDifficulty;
  title: string;
  /** Optional context for AI / templates */
  context?: Record<string, string | number | boolean | null | undefined>;
  /** Points deducted (or score inputs handled per scanner) */
};

export type PageSignals = {
  url: string;
  statusCode: number;
  title: string;
  metaDescription: string;
  canonical: string | null;
  h1: string[];
  h2: string[];
  h3: string[];
  textContent: string;
  wordCount: number;
  images: { src: string; alt: string }[];
  links: { href: string; text: string; isInternal: boolean }[];
  hasForm: boolean;
  formFieldCount: number;
  hasTelLink: boolean;
  hasMailto: boolean;
  phoneNumbers: string[];
  hasHttps: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  jsonLdTypes: string[];
  hasViewport: boolean;
  ctaCandidates: string[];
  hasStickyCues: boolean;
  hasFaqMarkers: boolean;
  hasPrivacyLink: boolean;
  hasTermsLink: boolean;
  hasAboutLink: boolean;
  hasContactLink: boolean;
  hasSocialLinks: boolean;
  hasTestimonialMarkers: boolean;
  hasInsuranceMarkers: boolean;
  hasLicenseMarkers: boolean;
  hasReviewMarkers: boolean;
  hasTeamMarkers: boolean;
  hasPricingMarkers: boolean;
  hasServiceMarkers: boolean;
  isHomepage: boolean;
};

export type CrawlResult = {
  homepage: PageSignals;
  pages: PageSignals[];
  robotsTxt: string | null;
  sitemapFound: boolean;
  robotsBlocksAll: boolean;
  brokenInternalSamples: string[];
  discoveredUrls: string[];
};

export type PsiMetrics = {
  mobileScore: number | null;
  desktopScore: number | null;
  lcpMs: number | null;
  inpMs: number | null;
  cls: number | null;
  totalByteWeight: number | null;
  unusedJsBytes: number | null;
  renderBlockingCount: number | null;
  error?: string;
};

export type CategoryScores = {
  seo: number;
  performance: number;
  local: number;
  conversion: number;
  mobile: number;
  trust: number;
  overall: number;
  growth: GrowthOpportunity;
};

export type ScoredFinding = FindingCandidate & {
  issue: string;
  why_it_matters: string;
  recommended_fix: string;
  is_unlocked_only: boolean;
  sort_order: number;
};

export type PipelineResult = {
  scores: CategoryScores;
  findings: ScoredFinding[];
  pages: {
    url: string;
    status_code: number;
    title: string;
    meta_description: string;
    is_homepage: boolean;
    signals: Record<string, unknown>;
  }[];
  raw_metrics: Record<string, unknown>;
};
