import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/contact";

const paths = [
  "/",
  "/about",
  "/portfolio",
  "/nacogdoches-web-design",
  "/local-seo",
  "/website-redesign",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
