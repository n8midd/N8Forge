/**
 * Default plain-English copy when OpenAI is unavailable.
 * Keys match FindingCode. Scores are never derived from this file.
 */

import type { FindingCode } from "./types";

export type FindingTemplate = {
  title: string;
  issue: string;
  why_it_matters: string;
  recommended_fix: string;
};

export const FINDING_TEMPLATES: Record<FindingCode, FindingTemplate> = {
  "seo.missing_title": {
    title: "Your page is missing a title",
    issue: "The homepage does not have a proper page title.",
    why_it_matters:
      "Search engines use the title to understand and display your business. Visitors also see it in browser tabs and search results.",
    recommended_fix:
      "Add a clear title that names your primary service and city (for example: “Tree Service in Nacogdoches, TX | Your Company”).",
  },
  "seo.short_title": {
    title: "Your page title is too short",
    issue: "The page title is too short to describe your business well.",
    why_it_matters:
      "Short titles miss the chance to rank for services and location searches.",
    recommended_fix:
      "Expand the title to include your main service, business name, and city.",
  },
  "seo.long_title": {
    title: "Your page title is too long",
    issue: "The page title is longer than search engines typically display.",
    why_it_matters:
      "Long titles get cut off in search results, hiding your most important words.",
    recommended_fix:
      "Shorten the title to roughly 50–60 characters, leading with service and location.",
  },
  "seo.missing_meta": {
    title: "Missing meta description",
    issue: "There is no meta description on the homepage.",
    why_it_matters:
      "The meta description is the short pitch under your listing in Google. A strong one earns more clicks.",
    recommended_fix:
      "Write a 140–160 character description that states what you do, where you serve, and how to contact you.",
  },
  "seo.short_meta": {
    title: "Meta description is too short",
    issue: "Your meta description is very short.",
    why_it_matters: "You are missing words that help people choose your listing.",
    recommended_fix:
      "Add a fuller summary of services, area, and a clear reason to call or request a quote.",
  },
  "seo.long_meta": {
    title: "Meta description is too long",
    issue: "Your meta description is longer than Google usually shows.",
    why_it_matters: "Important lines get truncated in search results.",
    recommended_fix: "Trim the description to about 160 characters with the strongest offer first.",
  },
  "seo.missing_h1": {
    title: "No clear main headline",
    issue: "The homepage is missing a single main H1 headline.",
    why_it_matters:
      "Visitors and search engines need one clear headline that says what you do.",
    recommended_fix:
      "Add one H1 that states your service and location (example: “Affordable Roof Repair in Tyler, TX”).",
  },
  "seo.multiple_h1": {
    title: "Too many main headlines",
    issue: "The page uses multiple H1 headings.",
    why_it_matters:
      "Multiple H1s dilute the main message and confuse search engines about your primary offering.",
    recommended_fix: "Keep one H1 on the homepage and use H2/H3 for supporting sections.",
  },
  "seo.heading_structure": {
    title: "Weak heading structure",
    issue: "Page headings skip levels or do not organize content clearly.",
    why_it_matters: "Clear headings help visitors scan and help search engines understand topics.",
    recommended_fix: "Organize content with H2 sections for services, process, and contact.",
  },
  "seo.missing_canonical": {
    title: "Missing canonical URL",
    issue: "No canonical URL tag was found.",
    why_it_matters:
      "Without a canonical tag, Google may treat similar URLs as duplicate pages.",
    recommended_fix: "Add a canonical link pointing to the preferred homepage URL.",
  },
  "seo.not_https": {
    title: "Site is not secure (HTTPS)",
    issue: "The site is not loading over HTTPS.",
    why_it_matters:
      "Browsers mark non-HTTPS sites as not secure. Search engines also prefer HTTPS.",
    recommended_fix: "Install an SSL certificate and redirect all traffic to HTTPS.",
  },
  "seo.robots_blocks": {
    title: "Robots rules may block search engines",
    issue: "robots.txt appears to block crawlers from important content.",
    why_it_matters: "If crawlers are blocked, your pages cannot appear in Google.",
    recommended_fix:
      "Allow search engines to crawl key pages while still blocking private admin areas.",
  },
  "seo.missing_robots": {
    title: "No robots.txt file",
    issue: "A robots.txt file was not found.",
    why_it_matters: "A simple robots file helps guide crawlers and can point to your sitemap.",
    recommended_fix: "Add a robots.txt that allows crawling and references your sitemap.",
  },
  "seo.missing_sitemap": {
    title: "Sitemap not found",
    issue: "No XML sitemap was detected.",
    why_it_matters: "A sitemap helps Google discover all important pages faster.",
    recommended_fix: "Generate and publish an XML sitemap, then submit it in Search Console.",
  },
  "seo.no_structured_data": {
    title: "No structured data",
    issue: "No JSON-LD structured data was found for the business.",
    why_it_matters:
      "Structured data helps Google understand your business type, services, and contact info.",
    recommended_fix:
      "Add LocalBusiness (or a more specific type) and Service schema with accurate NAP and services.",
  },
  "seo.weak_internal_links": {
    title: "Few internal links",
    issue: "The homepage has limited internal links to other key pages.",
    why_it_matters:
      "Internal links guide visitors to services and help search engines find important pages.",
    recommended_fix:
      "Link from the homepage to services, about, contact, and any location pages.",
  },
  "seo.broken_links": {
    title: "Broken internal links",
    issue: "Some internal links appear to be broken.",
    why_it_matters: "Broken links frustrate visitors and waste crawl budget.",
    recommended_fix: "Fix or remove broken links on the homepage and key service pages.",
  },
  "seo.missing_alt": {
    title: "Images missing alt text",
    issue: "Multiple images lack descriptive alt text.",
    why_it_matters:
      "Alt text improves accessibility and helps images support your SEO topics.",
    recommended_fix:
      "Describe each image in plain language, including service context where relevant.",
  },
  "seo.missing_og": {
    title: "Missing social share previews",
    issue: "Open Graph tags for social sharing are incomplete or missing.",
    why_it_matters:
      "When someone shares your site, a weak preview looks less trustworthy and gets fewer clicks.",
    recommended_fix:
      "Add og:title, og:description, and a strong og:image showing your work or brand.",
  },
  "seo.thin_content": {
    title: "Homepage content is thin",
    issue: "The homepage has relatively little text content.",
    why_it_matters:
      "Thin pages struggle to rank and leave visitors unsure about services and fit.",
    recommended_fix:
      "Expand the homepage with services, service area, process, and a clear call to action.",
  },
  "seo.weak_service_content": {
    title: "Services are not clearly described",
    issue: "Service offerings are hard to identify from homepage content.",
    why_it_matters:
      "If visitors cannot quickly see what you offer, they leave for a clearer competitor.",
    recommended_fix:
      "List your main services in plain English with short benefits and links to deeper pages.",
  },
  "seo.duplicate_headings": {
    title: "Duplicate headings",
    issue: "Repeated identical headings appear on the page.",
    why_it_matters: "Duplicate headings make content harder to scan and weaker for SEO.",
    recommended_fix: "Make each heading unique and specific to that section’s message.",
  },
  "performance.slow_lcp": {
    title: "Main content loads slowly",
    issue: "Your main website content loads slowly on mobile.",
    why_it_matters:
      "Visitors on slower connections may leave before seeing your services.",
    recommended_fix:
      "Compress the hero image, reduce heavy scripts, and prioritize above-the-fold content.",
  },
  "performance.poor_inp": {
    title: "Page feels unresponsive",
    issue: "The site can feel slow to respond to taps and clicks.",
    why_it_matters: "Laggy pages reduce trust and hurt conversion on mobile.",
    recommended_fix:
      "Reduce third-party scripts and heavy JavaScript that block user interaction.",
  },
  "performance.poor_cls": {
    title: "Layout shifts while loading",
    issue: "Page elements jump around as the site loads.",
    why_it_matters:
      "Layout shift makes the site feel unfinished and can cause mis-taps on buttons.",
    recommended_fix:
      "Set image dimensions and avoid inserting ads or banners that push content down.",
  },
  "performance.heavy_images": {
    title: "Images are too heavy",
    issue: "Large image files are slowing the site.",
    why_it_matters: "Heavy images are a common reason mobile visitors leave early.",
    recommended_fix:
      "Use modern compressed formats (WebP/AVIF) and correctly sized images for each breakpoint.",
  },
  "performance.heavy_js": {
    title: "Too much JavaScript",
    issue: "The site ships a large amount of JavaScript.",
    why_it_matters: "Extra scripts slow phones and delay contact buttons and forms.",
    recommended_fix:
      "Remove unused plugins/scripts and defer non-critical JavaScript.",
  },
  "performance.render_blocking": {
    title: "Resources block first paint",
    issue: "Render-blocking CSS/JS delays the first meaningful view of the page.",
    why_it_matters: "Visitors wait longer before they can understand what you offer.",
    recommended_fix:
      "Inline critical CSS where practical and defer non-critical stylesheets and scripts.",
  },
  "performance.weak_caching": {
    title: "Caching could be stronger",
    issue: "Static assets do not appear to use long-lived caching.",
    why_it_matters:
      "Returning visitors re-download assets, which keeps the site feeling slow.",
    recommended_fix:
      "Enable browser caching/CDN cache headers for images, fonts, CSS, and JS.",
  },
  "performance.low_score": {
    title: "Overall speed needs work",
    issue: "PageSpeed performance scores are lower than ideal.",
    why_it_matters:
      "Slow sites rank less competitively and convert fewer phone calls and form fills.",
    recommended_fix:
      "Prioritize mobile speed: image compression, fewer scripts, and a lighter theme/builder setup.",
  },
  "local.missing_phone": {
    title: "Phone number is hard to find",
    issue: "A clear phone number was not detected on the homepage.",
    why_it_matters:
      "Local customers often want to call. Hiding the number loses ready-to-buy leads.",
    recommended_fix:
      "Show a clickable phone number in the header and near primary calls to action.",
  },
  "local.missing_address": {
    title: "Business address is unclear",
    issue: "No clear business address or service address was found.",
    why_it_matters:
      "Address details build local trust and support local search relevance.",
    recommended_fix:
      "Add your address (or “serving [cities]” if you are mobile-based) in the footer and contact area.",
  },
  "local.missing_city": {
    title: "City is not clear",
    issue: "Your primary city is not clearly stated on the homepage.",
    why_it_matters:
      "Local searchers need to know you serve their area before they contact you.",
    recommended_fix:
      "Mention your primary city near the headline and in the opening paragraph.",
  },
  "local.weak_service_area": {
    title: "Service area is not clear",
    issue: "The website does not clearly identify the areas you serve.",
    why_it_matters:
      "Unclear service areas reduce local relevance and cause out-of-area inquiry waste.",
    recommended_fix:
      "Add your primary cities and service area to the homepage and relevant service pages.",
  },
  "local.no_local_schema": {
    title: "Missing local business markup",
    issue: "LocalBusiness structured data was not found.",
    why_it_matters:
      "Schema helps Google connect your site to your real-world business profile.",
    recommended_fix:
      "Add LocalBusiness JSON-LD with name, phone, address/service area, and hours if applicable.",
  },
  "local.city_not_in_title": {
    title: "City missing from page title",
    issue: "The page title does not include a local city or region.",
    why_it_matters: "Location in the title is a strong signal for local service searches.",
    recommended_fix: "Include your primary city in the homepage title tag.",
  },
  "local.city_not_in_h1": {
    title: "City missing from main headline",
    issue: "The main H1 does not mention your city or region.",
    why_it_matters:
      "Visitors scanning the page should immediately see that you serve their area.",
    recommended_fix: "Put the city or service area into the homepage H1.",
  },
  "local.no_location_pages": {
    title: "Few location or service-area pages",
    issue: "Dedicated location or service-area pages were not clearly found.",
    why_it_matters:
      "Location pages help you rank for city-specific searches and convert area traffic.",
    recommended_fix:
      "Create focused pages for your top cities or neighborhoods with real local proof.",
  },
  "local.weak_testimonials_local": {
    title: "Few local trust signals",
    issue: "Local project examples or area-specific testimonials are limited.",
    why_it_matters:
      "Local proof reassures nearby customers that you work in their community.",
    recommended_fix:
      "Add reviews and project photos that name nearby towns or recognizable local landmarks.",
  },
  "conversion.no_primary_cta": {
    title: "Main call-to-action is unclear",
    issue: "No clear primary call-to-action was detected.",
    why_it_matters:
      "If visitors do not know what to do next, they leave without contacting you.",
    recommended_fix:
      "Add a prominent button such as “Get a Free Estimate” or “Call Now” near the top of the page.",
  },
  "conversion.cta_not_above_fold": {
    title: "Main CTA is difficult to find",
    issue: "The primary call-to-action is not clearly available near the top of the page.",
    why_it_matters:
      "Many visitors decide within seconds. A buried CTA means lost estimate requests.",
    recommended_fix:
      "Place a clear Get a Free Estimate (or Call) button near the top of the homepage.",
  },
  "conversion.no_clickable_phone": {
    title: "Phone number is not click-to-call",
    issue: "No clickable phone link was found.",
    why_it_matters: "On mobile, tap-to-call is often the highest-converting action.",
    recommended_fix: "Wrap your phone number in a tel: link in the header and footer.",
  },
  "conversion.no_contact_form": {
    title: "No contact or quote form",
    issue: "A contact or request-quote form was not detected.",
    why_it_matters:
      "Some customers prefer forms over phone. Missing forms lose after-hours leads.",
    recommended_fix:
      "Add a short form (name, phone, service needed, message) on the contact and homepage paths.",
  },
  "conversion.complex_form": {
    title: "Contact form may be too long",
    issue: "The contact form asks for many fields.",
    why_it_matters: "Long forms reduce completion rates, especially on phones.",
    recommended_fix:
      "Keep the form to essentials: name, phone or email, and what they need.",
  },
  "conversion.no_sticky_mobile_cta": {
    title: "No sticky mobile call-to-action",
    issue: "No persistent mobile call or quote action was detected.",
    why_it_matters:
      "Sticky mobile CTAs keep contact options available while people scroll your services.",
    recommended_fix:
      "Add a simple sticky mobile bar with Call and Get Estimate actions.",
  },
  "conversion.unclear_services": {
    title: "Services are not obvious",
    issue: "It is hard to tell which services you offer at a glance.",
    why_it_matters:
      "Confused visitors will choose a competitor with a clearer offer list.",
    recommended_fix:
      "Feature 3–6 core services with short labels and links above the fold or just below.",
  },
  "conversion.unclear_next_step": {
    title: "Next step is unclear",
    issue: "After browsing, the next step is not spelled out clearly enough.",
    why_it_matters: "People convert when the path is obvious: call, form, or book.",
    recommended_fix:
      "End key sections with the same clear next step: call or request a free estimate.",
  },
  "conversion.no_faq": {
    title: "No FAQ section",
    issue: "An FAQ was not found.",
    why_it_matters:
      "FAQs answer objections (price range, timeline, service area) that block contact.",
    recommended_fix:
      "Add 5–8 common questions customers ask before hiring you.",
  },
  "conversion.no_pricing_signal": {
    title: "No pricing expectations set",
    issue: "There is little signal about pricing, free estimates, or how quotes work.",
    why_it_matters:
      "Price uncertainty is a major reason people leave without contacting local businesses.",
    recommended_fix:
      "State that estimates are free, or share starting ranges / how quoting works.",
  },
  "trust.no_testimonials": {
    title: "Missing testimonials",
    issue: "Customer testimonials or reviews are not clearly present.",
    why_it_matters: "Local service buyers heavily rely on social proof.",
    recommended_fix:
      "Add 3–5 named testimonials and link to your Google reviews if available.",
  },
  "trust.no_about": {
    title: "Weak about / company story",
    issue: "An about story or company background page/section was not clear.",
    why_it_matters: "People hire people. An about section builds local trust.",
    recommended_fix:
      "Write a short about section covering years of experience, area served, and who you are.",
  },
  "trust.no_team": {
    title: "Owner/team not featured",
    issue: "Owner or team information is limited.",
    why_it_matters:
      "Showing real people differentiates you from anonymous out-of-town companies.",
    recommended_fix: "Add a photo and short bio of the owner or core team.",
  },
  "trust.no_insurance_license": {
    title: "Insurance/licensing not shown",
    issue: "Insurance, licensing, or certification details were not found.",
    why_it_matters:
      "High-ticket or home-entry services convert better when credentials are visible.",
    recommended_fix:
      "Display license numbers, insurance status, and certifications near CTAs and the footer.",
  },
  "trust.no_privacy": {
    title: "Privacy policy missing",
    issue: "A privacy policy link was not found.",
    why_it_matters:
      "Forms and ads often expect a privacy policy; missing one looks incomplete.",
    recommended_fix: "Add a simple privacy policy and link it in the footer.",
  },
  "trust.no_social": {
    title: "No social or Google profile links",
    issue: "Social media or Google Business links were not clearly present.",
    why_it_matters:
      "Profile links let people verify you are an active, real local business.",
    recommended_fix:
      "Link to Google Business Profile and your strongest social channel in the footer.",
  },
  "trust.no_real_photos": {
    title: "Few real business photos",
    issue: "The site may rely on stock-looking media without clear project photos.",
    why_it_matters: "Real job photos increase trust faster than generic stock images.",
    recommended_fix:
      "Feature before/after or on-the-job photos from real local projects.",
  },
  "trust.weak_contact": {
    title: "Contact details are incomplete",
    issue: "Contact pathways are limited or inconsistent.",
    why_it_matters: "If people cannot verify how to reach you, they will not hire you.",
    recommended_fix:
      "Show consistent phone, email/form, and service area across the header, contact page, and footer.",
  },
  "mobile.low_psi": {
    title: "Mobile experience needs improvement",
    issue: "Mobile performance is weaker than it should be for a local service site.",
    why_it_matters:
      "Most local searches happen on phones. A clumsy mobile site loses the lead.",
    recommended_fix:
      "Improve mobile speed and simplify the mobile layout so the CTA remains easy to use.",
  },
  "mobile.no_viewport": {
    title: "Mobile viewport not set",
    issue: "A proper mobile viewport meta tag was not found.",
    why_it_matters: "Without it, the site may appear zoomed-out and hard to use on phones.",
    recommended_fix: "Add a standard viewport meta tag for mobile browsers.",
  },
  "mobile.no_tap_phone": {
    title: "Phone is hard to use on mobile",
    issue: "Tap-to-call is missing or not prominent on mobile layouts.",
    why_it_matters: "Phone leads are often the primary conversion for local service businesses.",
    recommended_fix: "Make the phone number large, tappable, and available on every page.",
  },
  "mobile.no_mobile_cta": {
    title: "Weak mobile call-to-action",
    issue: "Mobile call-to-action placement is weak.",
    why_it_matters:
      "Mobile visitors convert when the next step is always one tap away.",
    recommended_fix:
      "Add a sticky or highly visible mobile CTA for estimates and calls.",
  },
};
