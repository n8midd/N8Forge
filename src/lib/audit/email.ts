import { Resend } from "resend";
import { SITE_URL } from "../contact";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return {
    client: new Resend(apiKey),
    to: process.env.INTAKE_TO_EMAIL ?? "n8middleton@gmail.com",
    from:
      process.env.RESEND_FROM_EMAIL ??
      "N8Forge Audit <onboarding@resend.dev>",
  };
}

export async function notifyAuditLead(input: {
  name: string;
  businessName: string;
  email: string;
  phone?: string | null;
  website: string;
  reportUrl: string;
  overallScore: number | null;
}) {
  const r = getResend();
  if (!r) {
    console.warn("RESEND_API_KEY missing — skip lead email");
    return;
  }

  const text = [
    "New website audit lead",
    "",
    `Name: ${input.name}`,
    `Business: ${input.businessName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "—"}`,
    `Website: ${input.website}`,
    `Score: ${input.overallScore ?? "—"} / 100`,
    `Report: ${input.reportUrl}`,
    "",
    `Source: ${SITE_URL}`,
  ].join("\n");

  await r.client.emails.send({
    from: r.from,
    to: [r.to],
    replyTo: input.email,
    subject: `Audit lead: ${input.businessName} (${input.overallScore ?? "?"} / 100)`,
    text,
  });
}

export async function notifyQuoteRequest(input: {
  name?: string | null;
  businessName?: string | null;
  email?: string | null;
  phone?: string | null;
  website: string;
  reportUrl: string;
  findingTitle?: string | null;
  note?: string | null;
  overallScore: number | null;
}) {
  const r = getResend();
  if (!r) {
    console.warn("RESEND_API_KEY missing — skip quote email");
    return;
  }

  const text = [
    "Fix This For Me / quote request",
    "",
    `Name: ${input.name || "—"}`,
    `Business: ${input.businessName || "—"}`,
    `Email: ${input.email || "—"}`,
    `Phone: ${input.phone || "—"}`,
    `Website: ${input.website}`,
    `Score: ${input.overallScore ?? "—"} / 100`,
    `Finding: ${input.findingTitle || "Full site optimization"}`,
    `Note: ${input.note || "—"}`,
    `Report: ${input.reportUrl}`,
  ].join("\n");

  await r.client.emails.send({
    from: r.from,
    to: [r.to],
    replyTo: input.email || undefined,
    subject: `Quote request: ${input.businessName || input.website}`,
    text,
  });
}
