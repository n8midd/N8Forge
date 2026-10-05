import { isIP } from "node:net";
import { lookup } from "node:dns/promises";

const BLOCKED_HOSTS = new Set([
  "localhost",
  "metadata.google.internal",
  "metadata",
]);

function isPrivateIp(ip: string): boolean {
  if (ip === "127.0.0.1" || ip === "::1" || ip === "0.0.0.0") return true;
  if (ip.startsWith("10.")) return true;
  if (ip.startsWith("192.168.")) return true;
  if (ip.startsWith("169.254.")) return true;
  if (ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80")) return true;
  const m = /^172\.(\d+)\./.exec(ip);
  if (m) {
    const n = Number(m[1]);
    if (n >= 16 && n <= 31) return true;
  }
  return false;
}

export type NormalizedUrl = {
  href: string;
  origin: string;
  hostname: string;
  input: string;
};

export function tryNormalizeUrl(raw: string): NormalizedUrl | { error: string } {
  let input = raw.trim();
  if (!input) return { error: "Please enter a website URL." };
  if (!/^https?:\/\//i.test(input)) {
    input = `https://${input}`;
  }

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return { error: "That does not look like a valid URL." };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { error: "URL must start with http:// or https://." };
  }

  const hostname = url.hostname.toLowerCase();
  if (!hostname || hostname.includes(" ")) {
    return { error: "That does not look like a valid website." };
  }

  if (BLOCKED_HOSTS.has(hostname) || hostname.endsWith(".local")) {
    return { error: "That host cannot be audited." };
  }

  if (isIP(hostname) && isPrivateIp(hostname)) {
    return { error: "That address cannot be audited." };
  }

  // Normalize path: drop hash, keep pathname
  url.hash = "";
  if (url.pathname === "") url.pathname = "/";

  return {
    href: url.href,
    origin: url.origin,
    hostname,
    input: raw.trim(),
  };
}

export async function assertPublicHost(hostname: string): Promise<void> {
  if (isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw new Error("That address cannot be audited.");
    }
    return;
  }

  try {
    const results = await lookup(hostname, { all: true });
    for (const r of results) {
      if (isPrivateIp(r.address)) {
        throw new Error("That host resolves to a private address.");
      }
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes("private")) throw err;
    // DNS failure will surface at fetch time
  }
}

export function sameOrigin(base: string, candidate: string): boolean {
  try {
    const a = new URL(base);
    const b = new URL(candidate, base);
    return a.origin === b.origin;
  } catch {
    return false;
  }
}

export function absoluteUrl(base: string, href: string): string | null {
  try {
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      return null;
    }
    const u = new URL(href, base);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    u.hash = "";
    return u.href;
  } catch {
    return null;
  }
}
