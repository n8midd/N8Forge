import { SITE_URL } from "../contact";

/**
 * Block cross-site browser posts when Origin is present and not this deployment.
 */
export function site_url_origin_ok(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const allowed = new Set<string>([new URL(request.url).origin]);
    try {
      allowed.add(new URL(SITE_URL).origin);
    } catch {
      // ignore
    }
    if (process.env.NODE_ENV === "development") {
      allowed.add("http://localhost:3000");
      allowed.add("http://127.0.0.1:3000");
    }
    return allowed.has(origin);
  } catch {
    return false;
  }
}
