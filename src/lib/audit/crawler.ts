import * as cheerio from "cheerio";
import type { PageSignals } from "./types";
import { absoluteUrl, sameOrigin } from "./url";

const USER_AGENT =
  "N8ForgeWebsiteAudit/1.0 (+https://n8forge.com; website quality audit)";
const MAX_HTML_BYTES = 1_500_000;
const FETCH_TIMEOUT_MS = 12_000;

const PHONE_RE =
  /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}/g;

const CTA_WORDS =
  /\b(get\s+(a\s+)?free\s+estimate|free\s+quote|request\s+(a\s+)?quote|get\s+started|contact\s+us|call\s+now|book\s+now|schedule|hire\s+us|learn\s+more)\b/i;

const PRIORITY_PATH_HINTS = [
  "contact",
  "about",
  "service",
  "services",
  "quote",
  "estimate",
  "pricing",
  "areas",
  "location",
  "gallery",
  "projects",
  "work",
  "testimonial",
  "review",
  "faq",
];

export async function fetchText(
  url: string,
  opts?: { accept?: string },
): Promise<{ ok: boolean; status: number; text: string; finalUrl: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: opts?.accept ?? "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
      },
    });
    const buf = await res.arrayBuffer();
    const sliced = buf.byteLength > MAX_HTML_BYTES ? buf.slice(0, MAX_HTML_BYTES) : buf;
    const text = new TextDecoder("utf-8", { fatal: false }).decode(sliced);
    return {
      ok: res.ok,
      status: res.status,
      text,
      finalUrl: res.url || url,
    };
  } catch {
    return { ok: false, status: 0, text: "", finalUrl: url };
  } finally {
    clearTimeout(timer);
  }
}

function extractJsonLdTypes(html: string): string[] {
  const $ = cheerio.load(html);
  const types: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).html();
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as unknown;
      const visit = (node: unknown) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach(visit);
          return;
        }
        const obj = node as Record<string, unknown>;
        const t = obj["@type"];
        if (typeof t === "string") types.push(t);
        if (Array.isArray(t)) {
          t.forEach((x) => {
            if (typeof x === "string") types.push(x);
          });
        }
        if (obj["@graph"]) visit(obj["@graph"]);
      };
      visit(data);
    } catch {
      // ignore invalid JSON-LD
    }
  });
  return types;
}

export function parsePageHtml(
  html: string,
  pageUrl: string,
  statusCode: number,
  isHomepage: boolean,
): PageSignals {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();

  const title = ($("title").first().text() || "").trim();
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() ||
    $('meta[property="og:description"]').attr("content")?.trim() ||
    "";
  const canonical =
    $('link[rel="canonical"]').attr("href")?.trim() ||
    $('meta[property="og:url"]').attr("content")?.trim() ||
    null;

  const h1 = $("h1")
    .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
    .get()
    .filter(Boolean);
  const h2 = $("h2")
    .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
    .get()
    .filter(Boolean);
  const h3 = $("h3")
    .map((_, el) => $(el).text().replace(/\s+/g, " ").trim())
    .get()
    .filter(Boolean);

  const textContent = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = textContent ? textContent.split(/\s+/).length : 0;

  const images = $("img")
    .map((_, el) => ({
      src: $(el).attr("src") || "",
      alt: ($(el).attr("alt") || "").trim(),
    }))
    .get();

  const links = $("a[href]")
    .map((_, el) => {
      const href = $(el).attr("href") || "";
      const abs = absoluteUrl(pageUrl, href);
      return {
        href: abs || href,
        text: $(el).text().replace(/\s+/g, " ").trim(),
        isInternal: abs ? sameOrigin(pageUrl, abs) : false,
      };
    })
    .get()
    .filter((l) => l.href);

  const forms = $("form");
  const formFieldCount = forms.find("input, select, textarea").length;
  const hasForm = forms.length > 0;

  const hasTelLink = $('a[href^="tel:"]').length > 0;
  const hasMailto = $('a[href^="mailto:"]').length > 0;
  const phoneNumbers = Array.from(new Set(textContent.match(PHONE_RE) || []));

  let hasHttps = false;
  try {
    hasHttps = new URL(pageUrl).protocol === "https:";
  } catch {
    hasHttps = false;
  }

  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim() || null;
  const ogDescription =
    $('meta[property="og:description"]').attr("content")?.trim() || null;
  const ogImage = $('meta[property="og:image"]').attr("content")?.trim() || null;

  const hasViewport = Boolean($('meta[name="viewport"]').attr("content"));

  const ctaCandidates: string[] = [];
  $("a, button").each((_, el) => {
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t && CTA_WORDS.test(t)) ctaCandidates.push(t);
  });

  const fullHtml = html.toLowerCase();
  const hasStickyCues =
    /sticky|fixed bottom|mobile-cta|call-bar|floating/.test(fullHtml) ||
    $("[class*='sticky'], [class*='fixed']").length > 0;

  const bodyLower = textContent.toLowerCase();
  const hasFaqMarkers =
    /faq|frequently asked|common questions/.test(bodyLower) ||
    $('script[type="application/ld+json"]').text().includes("FAQPage");
  const hasPrivacyLink = links.some((l) => /privacy/i.test(l.href) || /privacy/i.test(l.text));
  const hasTermsLink = links.some(
    (l) => /terms/i.test(l.href) || /terms of/i.test(l.text),
  );
  const hasAboutLink = links.some((l) => /about/i.test(l.href) || /^about/i.test(l.text));
  const hasContactLink = links.some(
    (l) => /contact/i.test(l.href) || /contact/i.test(l.text),
  );
  const hasSocialLinks = links.some((l) =>
    /facebook|instagram|linkedin|youtube|tiktok|x\.com|twitter|maps\.google|g\.page|business\.google/i.test(
      l.href,
    ),
  );

  const hasTestimonialMarkers =
    /testimonial|what our customers|client reviews|customer reviews|"[^"]{20,}"/.test(
      bodyLower,
    ) || /testimonial|review/i.test($("[class*='testimonial'], [class*='review']").text());
  const hasInsuranceMarkers = /insured|insurance|fully insured|liability/.test(bodyLower);
  const hasLicenseMarkers =
    /licensed|license #|lic\.|certif|bonded/.test(bodyLower);
  const hasReviewMarkers =
    /google reviews?|★|stars?|\d\.\d\s*\/\s*5|rating/.test(bodyLower);
  const hasTeamMarkers =
    /our team|meet the|owner|founder|about me|years of experience/.test(bodyLower);
  const hasPricingMarkers =
    /free estimate|free quote|starting at|pricing|how much|cost/.test(bodyLower);
  const hasServiceMarkers =
    /our services|what we offer|services we|we offer|we provide/.test(bodyLower) ||
    h2.some((h) => /service/i.test(h));

  return {
    url: pageUrl,
    statusCode,
    title,
    metaDescription,
    canonical,
    h1,
    h2,
    h3,
    textContent: textContent.slice(0, 50_000),
    wordCount,
    images,
    links,
    hasForm,
    formFieldCount,
    hasTelLink,
    hasMailto,
    phoneNumbers,
    hasHttps,
    ogTitle,
    ogDescription,
    ogImage,
    jsonLdTypes: extractJsonLdTypes(html),
    hasViewport,
    ctaCandidates,
    hasStickyCues,
    hasFaqMarkers,
    hasPrivacyLink,
    hasTermsLink,
    hasAboutLink,
    hasContactLink,
    hasSocialLinks,
    hasTestimonialMarkers,
    hasInsuranceMarkers,
    hasLicenseMarkers,
    hasReviewMarkers,
    hasTeamMarkers,
    hasPricingMarkers,
    hasServiceMarkers,
    isHomepage,
  };
}

function scorePathPriority(url: string): number {
  const path = new URL(url).pathname.toLowerCase();
  let score = 0;
  for (const hint of PRIORITY_PATH_HINTS) {
    if (path.includes(hint)) score += 2;
  }
  if (path === "/" || path === "") score -= 1;
  return score;
}

export type CrawlResult = import("./types").CrawlResult;

export async function crawlSite(
  startHref: string,
  origin: string,
): Promise<CrawlResult> {
  const homeFetch = await fetchText(startHref);
  if (!homeFetch.ok && homeFetch.status === 0) {
    throw new Error("Could not reach that website. Check the URL and try again.");
  }
  if (!homeFetch.ok && homeFetch.status >= 400) {
    throw new Error(
      `Website returned HTTP ${homeFetch.status}. The site may be down or blocking crawlers.`,
    );
  }

  const homepage = parsePageHtml(
    homeFetch.text,
    homeFetch.finalUrl,
    homeFetch.status,
    true,
  );

  const robotsUrl = new URL("/robots.txt", origin).href;
  const robotsFetch = await fetchText(robotsUrl, { accept: "text/plain,*/*" });
  const robotsTxt =
    robotsFetch.ok && robotsFetch.text ? robotsFetch.text.slice(0, 20_000) : null;
  const robotsBlocksAll = Boolean(
    robotsTxt &&
      /user-agent:\s*\*/i.test(robotsTxt) &&
      /disallow:\s*\/\s*$/im.test(robotsTxt),
  );

  let sitemapFound = false;
  if (robotsTxt) {
    const sm = robotsTxt.match(/sitemap:\s*(\S+)/i);
    if (sm?.[1]) {
      const smFetch = await fetchText(sm[1], { accept: "application/xml,text/xml,*/*" });
      sitemapFound = smFetch.ok;
    }
  }
  if (!sitemapFound) {
    for (const path of ["/sitemap.xml", "/sitemap_index.xml"]) {
      const smFetch = await fetchText(new URL(path, origin).href, {
        accept: "application/xml,text/xml,*/*",
      });
      if (smFetch.ok && /<urlset|<sitemapindex/i.test(smFetch.text)) {
        sitemapFound = true;
        break;
      }
    }
  }

  const internal = new Set<string>();
  for (const link of homepage.links) {
    if (!link.isInternal) continue;
    const abs = absoluteUrl(homepage.url, link.href);
    if (!abs || !sameOrigin(origin, abs)) continue;
    try {
      const u = new URL(abs);
      if (/\.(pdf|jpg|jpeg|png|gif|webp|svg|zip|mp4|css|js)$/i.test(u.pathname)) {
        continue;
      }
      u.hash = "";
      u.search = "";
      const path = u.pathname.replace(/\/+$/, "") || "/";
      internal.add(`${u.origin}${path === "/" ? "/" : path}`);
    } catch {
      // ignore
    }
  }

  const homeKey = (() => {
    try {
      const u = new URL(homepage.url);
      const path = u.pathname.replace(/\/$/, "") || "/";
      return u.origin + (path === "/" ? "/" : path);
    } catch {
      return homepage.url;
    }
  })();

  const candidates = Array.from(internal)
    .filter((u) => u !== homeKey && u !== homepage.url)
    .sort((a, b) => scorePathPriority(b) - scorePathPriority(a))
    .slice(0, 8);

  const pages: PageSignals[] = [homepage];
  const brokenInternalSamples: string[] = [];

  // Sample a few homepage internal links for broken status
  const sampleLinks = homepage.links
    .filter((l) => l.isInternal)
    .map((l) => absoluteUrl(homepage.url, l.href))
    .filter((x): x is string => Boolean(x))
    .slice(0, 12);

  await Promise.all(
    sampleLinks.map(async (href) => {
      const res = await fetchText(href);
      if (res.status === 404 || res.status === 410 || res.status >= 500) {
        brokenInternalSamples.push(href);
      }
    }),
  );

  // Fetch priority internal pages
  const pageResults = await Promise.all(
    candidates.map(async (href) => {
      const res = await fetchText(href);
      if (!res.ok) {
        if (res.status === 404 || res.status >= 500) {
          brokenInternalSamples.push(href);
        }
        return null;
      }
      return parsePageHtml(res.text, res.finalUrl, res.status, false);
    }),
  );

  for (const p of pageResults) {
    if (p) pages.push(p);
  }

  return {
    homepage,
    pages,
    robotsTxt,
    sitemapFound,
    robotsBlocksAll,
    brokenInternalSamples: Array.from(new Set(brokenInternalSamples)).slice(0, 10),
    discoveredUrls: candidates,
  };
}
