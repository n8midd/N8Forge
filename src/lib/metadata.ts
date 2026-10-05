import type { Metadata } from "next";
import { SITE_URL } from "./contact";

export function pageUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = pageUrl(input.path);
  const title =
    input.path === "/"
      ? { absolute: `${input.title} | N8Forge` }
      : input.title;
  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: "N8Forge",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}
