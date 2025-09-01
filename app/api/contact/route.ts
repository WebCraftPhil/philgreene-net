import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
};

function isValidEmail(email: string): boolean {
  // Simple RFC 5322-inspired check
  return /.+@.+\..+/.test(email);
}

function validate(body: any): { valid: boolean; errors?: string[]; data?: ContactPayload } {
  const errors: string[] = [];
  const data: ContactPayload = {
    name: String(body?.name || "").trim(),
    email: String(body?.email || "").trim(),
    company: body?.company ? String(body.company).trim() : undefined,
    projectType: body?.projectType ? String(body.projectType).trim() : undefined,
    budget: body?.budget ? String(body.budget).trim() : undefined,
    message: String(body?.message || "").trim(),
  };

  if (!data.name) errors.push("name is required");
  if (!data.email) errors.push("email is required");
  else if (!isValidEmail(data.email)) errors.push("email is invalid");
  if (!data.message || data.message.length < 10) errors.push("message must be at least 10 characters");

  return { valid: errors.length === 0, errors: errors.length ? errors : undefined, data };
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { valid, errors, data } = validate(json);
    if (!valid) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // At this point, you can forward to an email service, a webhook,
    // or persist to a datastore. Example (pseudo):
    // if (process.env.CONTACT_WEBHOOK_URL) {
    //   await fetch(process.env.CONTACT_WEBHOOK_URL, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
    //   });
    // }

    // For now, just return success with minimal echo (no secrets)
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }
}

