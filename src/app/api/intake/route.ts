import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  formatIntakeBody,
  formatIntakeSubject,
  formatLeadConfirmationBody,
  SITE_URL,
} from "../../../lib/contact";
import {
  honeypotFilled,
  INTAKE_MAX_BODY_BYTES,
  parseIntake,
} from "../../../lib/intake";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const EMAIL_RATE_MAX = 3;
const EMAIL_RATE_WINDOW_MS = 60 * 60 * 1000;

type RateBucket = { count: number; resetAt: number };

const ipBuckets = new Map<string, RateBucket>();
const emailBuckets = new Map<string, RateBucket>();

function touchRateLimit(
  map: Map<string, RateBucket>,
  key: string,
  max: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const bucket = map.get(key);

  if (!bucket || now >= bucket.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (bucket.count >= max) {
    return true;
  }

  bucket.count += 1;
  return false;
}

function clientIp(request: Request): string {
  // Prefer platform-provided real IP when present (Vercel).
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Leftmost is the original client when set by a trusted proxy.
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

function isJsonContentType(request: Request): boolean {
  const ct = request.headers.get("content-type") ?? "";
  return ct.toLowerCase().includes("application/json");
}

/**
 * Block cross-site browser posts when Origin is present and not this deployment
 * (or the configured SITE_URL). Missing Origin is allowed for non-browser clients.
 */
function isDisallowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const allowed = new Set<string>([new URL(request.url).origin]);
    try {
      allowed.add(new URL(SITE_URL).origin);
    } catch {
      // ignore invalid SITE_URL
    }
    if (process.env.NODE_ENV === "development") {
      allowed.add("http://localhost:3000");
      allowed.add("http://127.0.0.1:3000");
    }
    return !allowed.has(origin);
  } catch {
    return false;
  }
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INTAKE_TO_EMAIL ?? "n8middleton@gmail.com";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "N8Forge Intake <onboarding@resend.dev>";

  if (!apiKey) {
    return jsonError("Email service is not configured.", 500);
  }

  if (!isJsonContentType(request)) {
    return jsonError("Unsupported content type.", 415);
  }

  if (isDisallowedOrigin(request)) {
    return jsonError("Invalid request origin.", 403);
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const size = Number(contentLength);
    if (Number.isFinite(size) && size > INTAKE_MAX_BODY_BYTES) {
      return jsonError("Request too large.", 413);
    }
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  if (raw.length > INTAKE_MAX_BODY_BYTES) {
    return jsonError("Request too large.", 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw) as unknown;
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const ip = clientIp(request);
  if (touchRateLimit(ipBuckets, ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return jsonError("Too many requests. Please try again in a few minutes.", 429);
  }

  // Bots that fill honeypot get a bland success (no email sent).
  if (honeypotFilled(payload)) {
    return NextResponse.json({ ok: true });
  }

  const values = parseIntake(payload);
  if (!values) {
    return jsonError(
      "Please complete name, business, a valid email, and what you need.",
      400,
    );
  }

  // Limit confirmation-email abuse to a single inbox.
  if (
    touchRateLimit(
      emailBuckets,
      values.email.toLowerCase(),
      EMAIL_RATE_MAX,
      EMAIL_RATE_WINDOW_MS,
    )
  ) {
    return jsonError("Too many requests for this email. Please try again later.", 429);
  }

  const resend = new Resend(apiKey);

  try {
    const { error: ownerError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: values.email,
      subject: formatIntakeSubject(values),
      text: formatIntakeBody(values),
    });

    if (ownerError) {
      console.error("Resend owner error:", ownerError);
      return jsonError("Could not send your intake. Please try again.", 502);
    }

    const { error: leadError } = await resend.emails.send({
      from: fromEmail,
      to: [values.email],
      replyTo: toEmail,
      subject: "Got your website game plan request — N8Forge",
      text: formatLeadConfirmationBody(values),
    });

    if (leadError) {
      // Owner mail already sent — still treat as success for the lead.
      console.error("Resend lead confirmation error:", leadError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Intake send failed:", err);
    return jsonError("Could not send your intake. Please try again.", 500);
  }
}
