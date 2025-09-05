import { NextRequest, NextResponse } from 'next/server';

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

function validate(body: unknown): {
  valid: boolean;
  errors?: string[];
  data?: ContactPayload;
} {
  const errors: string[] = [];
  const bodyObj = body as Record<string, unknown>;
  const data: ContactPayload = {
    name: String(bodyObj?.name || '').trim(),
    email: String(bodyObj?.email || '').trim(),
    company: bodyObj?.company ? String(bodyObj.company).trim() : undefined,
    projectType: bodyObj?.projectType
      ? String(bodyObj.projectType).trim()
      : undefined,
    budget: bodyObj?.budget ? String(bodyObj.budget).trim() : undefined,
    message: String(bodyObj?.message || '').trim(),
  };

  if (!data.name) {
    errors.push('name is required');
  }
  if (!data.email) {
    errors.push('email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('email is invalid');
  }
  if (!data.message || data.message.length < 10) {
    errors.push('message must be at least 10 characters');
  }

  return {
    valid: errors.length === 0,
    errors: errors.length ? errors : undefined,
    data,
  };
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { valid, errors, data } = validate(json);
    if (!valid) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }
    // mark as used without exposing
    void data;

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
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid JSON' },
      { status: 400 }
    );
  }
}
