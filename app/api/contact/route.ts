import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    /\S+@\S+\.\S+/.test(b.email) &&
    typeof b.projectType === "string" &&
    b.projectType.trim().length > 0 &&
    typeof b.message === "string" &&
    b.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Please fill in all required fields with a valid email." },
      { status: 400 }
    );
  }

  const { name, email, company, projectType, message } = body;
  const to = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !to) {
    console.log("[ghaya contact] RESEND_API_KEY / CONTACT_EMAIL not set — logging submission instead:", {
      name,
      email,
      company,
      projectType,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Ghaya Films <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `New Ghaya inquiry — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Project type: ${projectType}`,
      "",
      "What's your ghaya?",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("[ghaya contact] Resend error:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
