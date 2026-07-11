import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  formatIntakeBody,
  formatIntakeSubject,
  isValidIntake,
  type IntakeValues,
} from "../../../lib/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INTAKE_TO_EMAIL ?? "n8middleton@gmail.com";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "N8Forge Intake <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidIntake(payload)) {
    return NextResponse.json(
      { error: "Please complete name, business, and email." },
      { status: 400 },
    );
  }

  const values = payload as IntakeValues;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: values.email,
      subject: formatIntakeSubject(values),
      text: formatIntakeBody(values),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your intake. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Intake send failed:", err);
    return NextResponse.json(
      { error: "Could not send your intake. Please try again." },
      { status: 500 },
    );
  }
}
