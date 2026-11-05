import { NextResponse } from "next/server";

import { deliverSubmission, isContactProviderConfigured, type DeliveryResult } from "@/lib/contact";
import { parseSubmission } from "@/lib/contact-shared";

/**
 * Contact form endpoint.
 *
 * Knows nothing about providers — it validates, delegates, and reports what
 * actually happened. A submission that could not be delivered returns a
 * non-2xx status and `ok: false`, so the form can never show a false success.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, configured: isContactProviderConfigured(), message: "Malformed request." },
      { status: 400 },
    );
  }

  const { submission, errors } = parseSubmission(body);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, fields: errors }, { status: 400 });
  }

  let result: DeliveryResult;

  try {
    result = await deliverSubmission(submission);
  } catch {
    // A provider failure must never surface as a stack trace to the visitor.
    result = {
      ok: false,
      configured: isContactProviderConfigured(),
      message: "Something went wrong on our side. Please email us directly instead.",
    };
  }

  if (result.ok) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(result, { status: result.configured ? 502 : 503 });
}
