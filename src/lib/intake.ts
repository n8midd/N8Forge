import {
  packageOptions,
  type IntakeValues,
  type PackageValue,
} from "./contact";

/** Reject oversized payloads before parsing excessive work. */
export const INTAKE_MAX_BODY_BYTES = 16_384;

export const INTAKE_FIELD_LIMITS = {
  name: 100,
  business: 150,
  email: 254,
  phone: 40,
  need: 4000,
  website: 200,
} as const;

const packageValues = new Set<string>(packageOptions.map((o) => o.value));

/** Practical email check; rejects header-breaking control characters. */
export function isValidEmail(email: string): boolean {
  if (email.length === 0 || email.length > INTAKE_FIELD_LIMITS.email) {
    return false;
  }
  if (/[\r\n\0\x00-\x1f\x7f]/.test(email)) {
    return false;
  }
  // Single @, domain with at least one dot, no spaces.
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    email,
  );
}

/** Strip CR/LF and other controls so values cannot inject email headers. */
export function sanitizeSingleLine(value: string, maxLen: number): string {
  return value
    .replace(/[\r\n\0\x00-\x1f\x7f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

/** Allow newlines in body text but strip NULs / exotic controls. */
export function sanitizeMultiline(value: string, maxLen: number): string {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\0\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function honeypotFilled(payload: unknown): boolean {
  if (!payload || typeof payload !== "object") return false;
  const website = (payload as { website?: unknown }).website;
  return typeof website === "string" && website.trim().length > 0;
}

/**
 * Validate and normalize intake. Returns null if invalid.
 * Does not trust client package values outside the allowlist.
 */
export function parseIntake(payload: unknown): IntakeValues | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const v = payload as Record<string, unknown>;

  if (
    typeof v.name !== "string" ||
    typeof v.business !== "string" ||
    typeof v.email !== "string" ||
    typeof v.need !== "string"
  ) {
    return null;
  }

  if (typeof v.phone !== "undefined" && typeof v.phone !== "string") {
    return null;
  }
  if (typeof v.package !== "undefined" && typeof v.package !== "string") {
    return null;
  }
  if (typeof v.website !== "undefined" && typeof v.website !== "string") {
    return null;
  }

  // Reject large pre-sanitize payloads that signal abuse.
  if (
    v.name.length > INTAKE_FIELD_LIMITS.name * 2 ||
    v.business.length > INTAKE_FIELD_LIMITS.business * 2 ||
    (typeof v.email === "string" && v.email.length > INTAKE_FIELD_LIMITS.email * 2) ||
    v.need.length > INTAKE_FIELD_LIMITS.need * 2
  ) {
    return null;
  }

  const name = sanitizeSingleLine(v.name, INTAKE_FIELD_LIMITS.name);
  const business = sanitizeSingleLine(v.business, INTAKE_FIELD_LIMITS.business);
  const email = sanitizeSingleLine(v.email, INTAKE_FIELD_LIMITS.email).toLowerCase();
  const phone = sanitizeSingleLine(v.phone ?? "", INTAKE_FIELD_LIMITS.phone);
  const need = sanitizeMultiline(v.need, INTAKE_FIELD_LIMITS.need);
  const website = sanitizeSingleLine(v.website ?? "", INTAKE_FIELD_LIMITS.website);

  if (!name || !business || !need || !isValidEmail(email)) {
    return null;
  }

  let pkg: PackageValue | "" = "";
  if (v.package !== undefined && v.package !== null) {
    if (typeof v.package !== "string") return null;
    if (v.package === "") {
      pkg = "";
    } else if (packageValues.has(v.package)) {
      pkg = v.package as PackageValue;
    } else {
      return null;
    }
  }

  return {
    name,
    business,
    email,
    phone,
    need,
    package: pkg,
    website,
  };
}
