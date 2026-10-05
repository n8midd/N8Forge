import type { CrawlResult, FindingCandidate, PageSignals, PsiMetrics } from "../types";
import {
  clampScore,
  CONVERSION_WEIGHTS,
  LOCAL_WEIGHTS,
  MOBILE_WEIGHTS,
  OVERALL_WEIGHTS,
  PERFORMANCE_WEIGHTS,
  SEO_WEIGHTS,
  TRUST_WEIGHTS,
} from "../scoring/weights";
import type { CategoryScores } from "../types";
import type { GrowthOpportunity } from "../../supabase/types";

const CITY_LIKE =
  /\b(TX|Texas|Nacogdoches|Tyler|Lufkin|Longview|Houston|Dallas|Austin|San Antonio|city of|serving)\b/i;
const AREA_LIKE =
  /\b(service area|areas we serve|serving|we serve|surrounding|county|counties|mobile service)\b/i;

function hasLocalBusinessSchema(types: string[]): boolean {
  return types.some((t) =>
    /LocalBusiness|HomeAndConstructionBusiness|ProfessionalService|Electrician|Plumber|RoofingContractor|GeneralContractor|Attorney|Dentist|Restaurant|Store/i.test(
      t,
    ),
  );
}

export function scanSeo(
  crawl: CrawlResult,
): { score: number; findings: FindingCandidate[] } {
  const p = crawl.homepage;
  const findings: FindingCandidate[] = [];
  let score = 100;
  const deduct = (pts: number) => {
    score -= pts;
  };

  // Title
  if (!p.title) {
    findings.push({
      code: "seo.missing_title",
      category: "seo",
      priority: "high",
      difficulty: "easy",
      title: "Your page is missing a title",
    });
    deduct(SEO_WEIGHTS.title);
  } else if (p.title.length < 20) {
    findings.push({
      code: "seo.short_title",
      category: "seo",
      priority: "medium",
      difficulty: "easy",
      title: "Your page title is too short",
      context: { title: p.title },
    });
    deduct(SEO_WEIGHTS.title * 0.5);
  } else if (p.title.length > 65) {
    findings.push({
      code: "seo.long_title",
      category: "seo",
      priority: "low",
      difficulty: "easy",
      title: "Your page title is too long",
      context: { title: p.title, length: p.title.length },
    });
    deduct(SEO_WEIGHTS.title * 0.3);
  }

  // Meta
  if (!p.metaDescription) {
    findings.push({
      code: "seo.missing_meta",
      category: "seo",
      priority: "high",
      difficulty: "easy",
      title: "Missing meta description",
    });
    deduct(SEO_WEIGHTS.metaDescription);
  } else if (p.metaDescription.length < 50) {
    findings.push({
      code: "seo.short_meta",
      category: "seo",
      priority: "medium",
      difficulty: "easy",
      title: "Meta description is too short",
    });
    deduct(SEO_WEIGHTS.metaDescription * 0.5);
  } else if (p.metaDescription.length > 170) {
    findings.push({
      code: "seo.long_meta",
      category: "seo",
      priority: "low",
      difficulty: "easy",
      title: "Meta description is too long",
    });
    deduct(SEO_WEIGHTS.metaDescription * 0.3);
  }

  // H1
  if (p.h1.length === 0) {
    findings.push({
      code: "seo.missing_h1",
      category: "seo",
      priority: "high",
      difficulty: "easy",
      title: "No clear main headline",
    });
    deduct(SEO_WEIGHTS.h1);
  } else if (p.h1.length > 1) {
    findings.push({
      code: "seo.multiple_h1",
      category: "seo",
      priority: "medium",
      difficulty: "easy",
      title: "Too many main headlines",
      context: { count: p.h1.length },
    });
    deduct(SEO_WEIGHTS.h1 * 0.5);
  }

  if (p.h2.length === 0 && p.wordCount > 100) {
    findings.push({
      code: "seo.heading_structure",
      category: "seo",
      priority: "low",
      difficulty: "easy",
      title: "Weak heading structure",
    });
    deduct(2);
  }

  const allHeadings = [...p.h1, ...p.h2, ...p.h3];
  const seen = new Set<string>();
  let dup = false;
  for (const h of allHeadings) {
    const k = h.toLowerCase();
    if (seen.has(k) && h.length > 8) dup = true;
    seen.add(k);
  }
  if (dup) {
    findings.push({
      code: "seo.duplicate_headings",
      category: "seo",
      priority: "low",
      difficulty: "easy",
      title: "Duplicate headings",
    });
  }

  if (!p.canonical) {
    findings.push({
      code: "seo.missing_canonical",
      category: "seo",
      priority: "medium",
      difficulty: "medium",
      title: "Missing canonical URL",
    });
    deduct(SEO_WEIGHTS.canonical);
  }

  if (!p.hasHttps) {
    findings.push({
      code: "seo.not_https",
      category: "seo",
      priority: "high",
      difficulty: "medium",
      title: "Site is not secure (HTTPS)",
    });
    deduct(SEO_WEIGHTS.https);
  }

  if (crawl.robotsBlocksAll) {
    findings.push({
      code: "seo.robots_blocks",
      category: "seo",
      priority: "high",
      difficulty: "medium",
      title: "Robots rules may block search engines",
    });
    deduct(SEO_WEIGHTS.robots + SEO_WEIGHTS.indexability);
  } else if (!crawl.robotsTxt) {
    findings.push({
      code: "seo.missing_robots",
      category: "seo",
      priority: "low",
      difficulty: "easy",
      title: "No robots.txt file",
    });
    deduct(SEO_WEIGHTS.robots * 0.5);
  }

  if (!crawl.sitemapFound) {
    findings.push({
      code: "seo.missing_sitemap",
      category: "seo",
      priority: "medium",
      difficulty: "medium",
      title: "Sitemap not found",
    });
    deduct(SEO_WEIGHTS.sitemap);
  }

  if (p.jsonLdTypes.length === 0) {
    findings.push({
      code: "seo.no_structured_data",
      category: "seo",
      priority: "medium",
      difficulty: "advanced",
      title: "No structured data",
    });
    deduct(SEO_WEIGHTS.structuredData);
  }

  const internalCount = p.links.filter((l) => l.isInternal).length;
  if (internalCount < 3) {
    findings.push({
      code: "seo.weak_internal_links",
      category: "seo",
      priority: "medium",
      difficulty: "easy",
      title: "Few internal links",
      context: { count: internalCount },
    });
    deduct(SEO_WEIGHTS.internalLinks * 0.7);
  }

  if (crawl.brokenInternalSamples.length > 0) {
    findings.push({
      code: "seo.broken_links",
      category: "seo",
      priority: "high",
      difficulty: "medium",
      title: "Broken internal links",
      context: { sample: crawl.brokenInternalSamples[0] },
    });
    deduct(Math.min(10, crawl.brokenInternalSamples.length * 3));
  }

  const imgs = p.images.filter((i) => i.src);
  const missingAlt = imgs.filter((i) => !i.alt).length;
  if (imgs.length > 0 && missingAlt / imgs.length > 0.4) {
    findings.push({
      code: "seo.missing_alt",
      category: "seo",
      priority: "medium",
      difficulty: "easy",
      title: "Images missing alt text",
      context: { missingAlt, total: imgs.length },
    });
    deduct(SEO_WEIGHTS.altText * (missingAlt / imgs.length));
  }

  if (!p.ogTitle || !p.ogImage) {
    findings.push({
      code: "seo.missing_og",
      category: "seo",
      priority: "low",
      difficulty: "easy",
      title: "Missing social share previews",
    });
    deduct(3);
  }

  if (p.wordCount < 150) {
    findings.push({
      code: "seo.thin_content",
      category: "seo",
      priority: "high",
      difficulty: "medium",
      title: "Homepage content is thin",
      context: { wordCount: p.wordCount },
    });
    deduct(SEO_WEIGHTS.serviceContent * 0.6);
  }

  if (!p.hasServiceMarkers && p.wordCount > 50) {
    findings.push({
      code: "seo.weak_service_content",
      category: "seo",
      priority: "high",
      difficulty: "medium",
      title: "Services are not clearly described",
    });
    deduct(SEO_WEIGHTS.serviceContent * 0.5);
  }

  // Local signals portion of SEO bucket
  const localBits =
    (p.phoneNumbers.length ? 4 : 0) +
    (CITY_LIKE.test(p.title + p.h1.join(" ") + p.textContent.slice(0, 500))
      ? 3
      : 0) +
    (hasLocalBusinessSchema(p.jsonLdTypes) ? 3 : 0);
  if (localBits < 5) {
    deduct(SEO_WEIGHTS.localSignals * ((5 - localBits) / 5) * 0.5);
  }

  return { score: clampScore(score), findings };
}

export function scanPerformance(psi: PsiMetrics): {
  score: number;
  findings: FindingCandidate[];
} {
  const findings: FindingCandidate[] = [];
  let score = 100;
  const psiScore = psi.mobileScore ?? psi.desktopScore;

  if (psiScore == null) {
    // Neutral mid score when PSI unavailable; surface issue lightly
    score = 55;
    findings.push({
      code: "performance.low_score",
      category: "performance",
      priority: "medium",
      difficulty: "medium",
      title: "Overall speed needs work",
      context: { note: "PageSpeed data unavailable", error: psi.error },
    });
    return { score, findings };
  }

  // Scale from PSI
  score =
    PERFORMANCE_WEIGHTS.psiScore * (psiScore / 100) +
    (100 - PERFORMANCE_WEIGHTS.psiScore);

  if (psiScore < 50) {
    findings.push({
      code: "performance.low_score",
      category: "performance",
      priority: "high",
      difficulty: "advanced",
      title: "Overall speed needs work",
      context: { mobileScore: psi.mobileScore, desktopScore: psi.desktopScore },
    });
    score -= 10;
  } else if (psiScore < 75) {
    findings.push({
      code: "performance.low_score",
      category: "performance",
      priority: "medium",
      difficulty: "medium",
      title: "Overall speed needs work",
      context: { mobileScore: psi.mobileScore },
    });
    score -= 5;
  }

  if (psi.lcpMs != null && psi.lcpMs > 2500) {
    findings.push({
      code: "performance.slow_lcp",
      category: "performance",
      priority: psi.lcpMs > 4000 ? "high" : "medium",
      difficulty: "medium",
      title: "Main content loads slowly",
      context: { lcpMs: Math.round(psi.lcpMs) },
    });
    score -= PERFORMANCE_WEIGHTS.lcp * Math.min(1, (psi.lcpMs - 2500) / 2500);
  }

  if (psi.inpMs != null && psi.inpMs > 200) {
    findings.push({
      code: "performance.poor_inp",
      category: "performance",
      priority: psi.inpMs > 500 ? "high" : "medium",
      difficulty: "advanced",
      title: "Page feels unresponsive",
      context: { inpMs: Math.round(psi.inpMs) },
    });
    score -= PERFORMANCE_WEIGHTS.inp * 0.5;
  }

  if (psi.cls != null && psi.cls > 0.1) {
    findings.push({
      code: "performance.poor_cls",
      category: "performance",
      priority: psi.cls > 0.25 ? "high" : "medium",
      difficulty: "medium",
      title: "Layout shifts while loading",
      context: { cls: Number(psi.cls.toFixed(3)) },
    });
    score -= PERFORMANCE_WEIGHTS.cls * 0.5;
  }

  if (psi.totalByteWeight != null && psi.totalByteWeight > 2_000_000) {
    findings.push({
      code: "performance.heavy_images",
      category: "performance",
      priority: "medium",
      difficulty: "medium",
      title: "Images are too heavy",
      context: { bytes: psi.totalByteWeight },
    });
    score -= 5;
  }

  if (psi.unusedJsBytes != null && psi.unusedJsBytes > 150_000) {
    findings.push({
      code: "performance.heavy_js",
      category: "performance",
      priority: "medium",
      difficulty: "advanced",
      title: "Too much JavaScript",
    });
    score -= 5;
  }

  if (psi.renderBlockingCount != null && psi.renderBlockingCount > 2) {
    findings.push({
      code: "performance.render_blocking",
      category: "performance",
      priority: "low",
      difficulty: "advanced",
      title: "Resources block first paint",
    });
    score -= 4;
  }

  return { score: clampScore(score), findings };
}

function anyPage(pages: PageSignals[], pred: (p: PageSignals) => boolean) {
  return pages.some(pred);
}

export function scanLocal(crawl: CrawlResult): {
  score: number;
  findings: FindingCandidate[];
} {
  const p = crawl.homepage;
  const pages = crawl.pages;
  const findings: FindingCandidate[] = [];
  let score = 100;
  const blob =
    p.title +
    " " +
    p.h1.join(" ") +
    " " +
    p.metaDescription +
    " " +
    p.textContent.slice(0, 4000);

  if (p.phoneNumbers.length === 0 && !p.hasTelLink) {
    findings.push({
      code: "local.missing_phone",
      category: "local",
      priority: "high",
      difficulty: "easy",
      title: "Phone number is hard to find",
    });
    score -= LOCAL_WEIGHTS.phone;
  }

  if (!/\b\d{1,5}\s+\w+/.test(blob) && !AREA_LIKE.test(blob)) {
    findings.push({
      code: "local.missing_address",
      category: "local",
      priority: "medium",
      difficulty: "easy",
      title: "Business address is unclear",
    });
    score -= LOCAL_WEIGHTS.addressOrArea * 0.5;
  }

  if (!CITY_LIKE.test(blob)) {
    findings.push({
      code: "local.missing_city",
      category: "local",
      priority: "high",
      difficulty: "easy",
      title: "City is not clear",
    });
    score -= 10;
  }

  if (!AREA_LIKE.test(blob)) {
    findings.push({
      code: "local.weak_service_area",
      category: "local",
      priority: "high",
      difficulty: "easy",
      title: "Service area is not clear",
    });
    score -= LOCAL_WEIGHTS.serviceAreaContent;
  }

  if (!hasLocalBusinessSchema(p.jsonLdTypes)) {
    findings.push({
      code: "local.no_local_schema",
      category: "local",
      priority: "medium",
      difficulty: "advanced",
      title: "Missing local business markup",
    });
    score -= LOCAL_WEIGHTS.localSchema;
  }

  if (!CITY_LIKE.test(p.title)) {
    findings.push({
      code: "local.city_not_in_title",
      category: "local",
      priority: "medium",
      difficulty: "easy",
      title: "City missing from page title",
    });
    score -= LOCAL_WEIGHTS.cityInTitle;
  }

  if (!CITY_LIKE.test(p.h1.join(" "))) {
    findings.push({
      code: "local.city_not_in_h1",
      category: "local",
      priority: "medium",
      difficulty: "easy",
      title: "City missing from main headline",
    });
    score -= LOCAL_WEIGHTS.cityInH1;
  }

  const locationPages = pages.filter((pg) =>
    /area|location|city|service-area|nacogdoches|tyler|lufkin/i.test(pg.url),
  );
  if (locationPages.length === 0 && !AREA_LIKE.test(blob)) {
    findings.push({
      code: "local.no_location_pages",
      category: "local",
      priority: "low",
      difficulty: "medium",
      title: "Few location or service-area pages",
    });
    score -= LOCAL_WEIGHTS.locationPages * 0.6;
  }

  if (!p.hasTestimonialMarkers && !p.hasReviewMarkers) {
    findings.push({
      code: "local.weak_testimonials_local",
      category: "local",
      priority: "low",
      difficulty: "medium",
      title: "Few local trust signals",
    });
    score -= LOCAL_WEIGHTS.localTrust * 0.5;
  }

  return { score: clampScore(score), findings };
}

export function scanConversion(crawl: CrawlResult): {
  score: number;
  findings: FindingCandidate[];
} {
  const p = crawl.homepage;
  const pages = crawl.pages;
  const findings: FindingCandidate[] = [];
  let score = 100;

  if (p.ctaCandidates.length === 0) {
    findings.push({
      code: "conversion.no_primary_cta",
      category: "conversion",
      priority: "high",
      difficulty: "easy",
      title: "Main call-to-action is unclear",
    });
    score -= CONVERSION_WEIGHTS.primaryCta;
    findings.push({
      code: "conversion.cta_not_above_fold",
      category: "conversion",
      priority: "high",
      difficulty: "easy",
      title: "Main CTA is difficult to find",
    });
    score -= CONVERSION_WEIGHTS.ctaAboveFold;
  }

  if (!p.hasTelLink) {
    findings.push({
      code: "conversion.no_clickable_phone",
      category: "conversion",
      priority: "high",
      difficulty: "easy",
      title: "Phone number is not click-to-call",
    });
    score -= CONVERSION_WEIGHTS.clickablePhone;
  }

  const hasForm = anyPage(pages, (pg) => pg.hasForm);
  if (!hasForm) {
    findings.push({
      code: "conversion.no_contact_form",
      category: "conversion",
      priority: "high",
      difficulty: "medium",
      title: "No contact or quote form",
    });
    score -= CONVERSION_WEIGHTS.contactForm;
  } else {
    const complex = pages.find((pg) => pg.hasForm && pg.formFieldCount > 8);
    if (complex) {
      findings.push({
        code: "conversion.complex_form",
        category: "conversion",
        priority: "low",
        difficulty: "easy",
        title: "Contact form may be too long",
        context: { fields: complex.formFieldCount },
      });
      score -= CONVERSION_WEIGHTS.formSimplicity;
    }
  }

  if (!p.hasStickyCues) {
    findings.push({
      code: "conversion.no_sticky_mobile_cta",
      category: "conversion",
      priority: "medium",
      difficulty: "medium",
      title: "No sticky mobile call-to-action",
    });
    score -= CONVERSION_WEIGHTS.mobileCta * 0.7;
  }

  if (!p.hasServiceMarkers) {
    findings.push({
      code: "conversion.unclear_services",
      category: "conversion",
      priority: "high",
      difficulty: "medium",
      title: "Services are not obvious",
    });
    score -= CONVERSION_WEIGHTS.clearServices;
  }

  if (p.ctaCandidates.length < 2) {
    findings.push({
      code: "conversion.unclear_next_step",
      category: "conversion",
      priority: "medium",
      difficulty: "easy",
      title: "Next step is unclear",
    });
    score -= CONVERSION_WEIGHTS.clearNextStep * 0.6;
  }

  if (!p.hasFaqMarkers && !anyPage(pages, (pg) => pg.hasFaqMarkers)) {
    findings.push({
      code: "conversion.no_faq",
      category: "conversion",
      priority: "low",
      difficulty: "easy",
      title: "No FAQ section",
    });
    score -= 3;
  }

  if (!p.hasPricingMarkers) {
    findings.push({
      code: "conversion.no_pricing_signal",
      category: "conversion",
      priority: "medium",
      difficulty: "easy",
      title: "No pricing expectations set",
    });
    score -= CONVERSION_WEIGHTS.faqOrPricing;
  }

  if (!p.hasTestimonialMarkers && !p.hasReviewMarkers) {
    score -= CONVERSION_WEIGHTS.socialProofCues;
  }

  return { score: clampScore(score), findings };
}

export function scanTrust(crawl: CrawlResult): {
  score: number;
  findings: FindingCandidate[];
} {
  const p = crawl.homepage;
  const pages = crawl.pages;
  const findings: FindingCandidate[] = [];
  let score = 100;

  if (!p.hasTestimonialMarkers && !p.hasReviewMarkers) {
    findings.push({
      code: "trust.no_testimonials",
      category: "trust",
      priority: "high",
      difficulty: "medium",
      title: "Missing testimonials",
    });
    score -= TRUST_WEIGHTS.testimonials;
  }

  if (!p.hasAboutLink && !anyPage(pages, (pg) => /about/i.test(pg.url))) {
    findings.push({
      code: "trust.no_about",
      category: "trust",
      priority: "medium",
      difficulty: "easy",
      title: "Weak about / company story",
    });
    score -= TRUST_WEIGHTS.about;
  }

  if (!p.hasTeamMarkers) {
    findings.push({
      code: "trust.no_team",
      category: "trust",
      priority: "low",
      difficulty: "easy",
      title: "Owner/team not featured",
    });
    score -= TRUST_WEIGHTS.team * 0.7;
  }

  if (!p.hasInsuranceMarkers && !p.hasLicenseMarkers) {
    findings.push({
      code: "trust.no_insurance_license",
      category: "trust",
      priority: "medium",
      difficulty: "easy",
      title: "Insurance/licensing not shown",
    });
    score -= TRUST_WEIGHTS.insuranceLicense;
  }

  if (!p.hasPrivacyLink && !anyPage(pages, (pg) => pg.hasPrivacyLink)) {
    findings.push({
      code: "trust.no_privacy",
      category: "trust",
      priority: "low",
      difficulty: "easy",
      title: "Privacy policy missing",
    });
    score -= TRUST_WEIGHTS.policies;
  }

  if (!p.hasSocialLinks) {
    findings.push({
      code: "trust.no_social",
      category: "trust",
      priority: "low",
      difficulty: "easy",
      title: "No social or Google profile links",
    });
    score -= TRUST_WEIGHTS.social;
  }

  const realPhotoHint =
    p.images.length >= 3 &&
    p.images.some((i) => /upload|project|job|gallery|work|client/i.test(i.src + i.alt));
  if (p.images.length < 2 || (!realPhotoHint && p.images.length < 4)) {
    findings.push({
      code: "trust.no_real_photos",
      category: "trust",
      priority: "medium",
      difficulty: "medium",
      title: "Few real business photos",
    });
    score -= TRUST_WEIGHTS.realPhotos * 0.6;
  }

  if (p.phoneNumbers.length === 0 && !p.hasMailto && !p.hasForm) {
    findings.push({
      code: "trust.weak_contact",
      category: "trust",
      priority: "high",
      difficulty: "easy",
      title: "Contact details are incomplete",
    });
    score -= TRUST_WEIGHTS.contactInfo;
  }

  return { score: clampScore(score), findings };
}

export function scanMobile(
  crawl: CrawlResult,
  psi: PsiMetrics,
): { score: number; findings: FindingCandidate[] } {
  const p = crawl.homepage;
  const findings: FindingCandidate[] = [];
  let score = 100;

  if (psi.mobileScore != null) {
    score =
      MOBILE_WEIGHTS.psiMobile * (psi.mobileScore / 100) +
      (100 - MOBILE_WEIGHTS.psiMobile);
    if (psi.mobileScore < 50) {
      findings.push({
        code: "mobile.low_psi",
        category: "mobile",
        priority: "high",
        difficulty: "advanced",
        title: "Mobile experience needs improvement",
        context: { mobileScore: psi.mobileScore },
      });
    } else if (psi.mobileScore < 75) {
      findings.push({
        code: "mobile.low_psi",
        category: "mobile",
        priority: "medium",
        difficulty: "medium",
        title: "Mobile experience needs improvement",
        context: { mobileScore: psi.mobileScore },
      });
      score -= 5;
    }
  } else {
    score = 60;
  }

  if (!p.hasViewport) {
    findings.push({
      code: "mobile.no_viewport",
      category: "mobile",
      priority: "high",
      difficulty: "easy",
      title: "Mobile viewport not set",
    });
    score -= MOBILE_WEIGHTS.viewport;
  }

  if (!p.hasTelLink) {
    findings.push({
      code: "mobile.no_tap_phone",
      category: "mobile",
      priority: "high",
      difficulty: "easy",
      title: "Phone is hard to use on mobile",
    });
    score -= MOBILE_WEIGHTS.tapPhone;
  }

  if (!p.hasStickyCues && p.ctaCandidates.length === 0) {
    findings.push({
      code: "mobile.no_mobile_cta",
      category: "mobile",
      priority: "medium",
      difficulty: "medium",
      title: "Weak mobile call-to-action",
    });
    score -= MOBILE_WEIGHTS.mobileCta;
  }

  return { score: clampScore(score), findings };
}

export function computeOverall(scores: {
  seo: number;
  performance: number;
  local: number;
  conversion: number;
  mobile: number;
  trust: number;
}): number {
  const raw =
    scores.seo * OVERALL_WEIGHTS.seo +
    scores.performance * OVERALL_WEIGHTS.performance +
    scores.local * OVERALL_WEIGHTS.local +
    scores.conversion * OVERALL_WEIGHTS.conversion +
    scores.mobile * OVERALL_WEIGHTS.mobile +
    scores.trust * OVERALL_WEIGHTS.trust;
  return clampScore(raw);
}

export function growthFrom(
  overall: number,
  highCount: number,
): GrowthOpportunity {
  if (overall < 55 || highCount >= 4) return "high";
  if (overall < 75 || highCount >= 2) return "medium";
  return "low";
}

export function buildCategoryScores(parts: {
  seo: number;
  performance: number;
  local: number;
  conversion: number;
  mobile: number;
  trust: number;
  highCount: number;
}): CategoryScores {
  const overall = computeOverall(parts);
  return {
    seo: parts.seo,
    performance: parts.performance,
    local: parts.local,
    conversion: parts.conversion,
    mobile: parts.mobile,
    trust: parts.trust,
    overall,
    growth: growthFrom(overall, parts.highCount),
  };
}

export const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 } as const;
