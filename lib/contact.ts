/**
 * Contact delivery.
 *
 * The site deliberately owns no email infrastructure. The form posts to a
 * single server route, which hands the submission to whichever provider has
 * been configured through environment variables. With nothing configured the
 * route reports that honestly rather than pretending the message was sent.
 *
 * Server-only: this module reads non-public environment variables, so it must
 * never be imported by a client component. The shared form contract lives in
 * `lib/contact-shared.ts`.
 */

import { INTEREST_OPTIONS, type ContactSubmission } from "./contact-shared";

/** How the submission was handled, reported back to the form verbatim. */
export type DeliveryResult =
  | { ok: true; provider: string }
  | { ok: false; configured: false; message: string }
  | { ok: false; configured: true; message: string };

/**
 * Two providers are supported today, both driven entirely by environment
 * variables so no credential ever reaches the browser:
 *
 *   CONTACT_WEBHOOK_URL   — POST the submission as JSON to any endpoint
 *                           (a form service, an internal API, a queue).
 *   RESEND_API_KEY        — send it as an email through Resend. Also requires
 *   CONTACT_FROM_EMAIL      a verified sender address, and a recipient in
 *   CONTACT_TO_EMAIL        (falling back to NEXT_PUBLIC_CONTACT_EMAIL).
 *
 * Adding another provider means adding one branch here; the route, the form,
 * and the response shape do not change.
 */
type ProviderConfig =
  | { kind: "webhook"; webhookUrl: string }
  | { kind: "resend"; resendKey: string; fromEmail: string; toEmail: string }
  | { kind: "none" };

function resolveProvider(): ProviderConfig {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) return { kind: "webhook", webhookUrl };

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  if (resendKey && fromEmail && toEmail) {
    return { kind: "resend", resendKey, fromEmail, toEmail };
  }

  return { kind: "none" };
}

/**
 * Whether a delivery provider exists in this deployment. Exported so the route
 * can report the real configuration state on paths that never reach
 * `deliverSubmission` — a request rejected before delivery must not claim a
 * provider is configured, or the form would hide the direct-email fallback.
 */
export function isContactProviderConfigured(): boolean {
  return resolveProvider().kind !== "none";
}

export async function deliverSubmission(submission: ContactSubmission): Promise<DeliveryResult> {
  const provider = resolveProvider();

  if (provider.kind === "webhook") {
    return postJson(provider.webhookUrl, {
      ...submission,
      submittedAt: new Date().toISOString(),
    });
  }

  if (provider.kind === "resend") {
    return postJson(
      "https://api.resend.com/emails",
      {
        from: provider.fromEmail,
        to: [provider.toEmail],
        reply_to: submission.email,
        subject: `ClinDaddy enquiry — ${interestLabels(submission) || "general"}`,
        text: formatPlainText(submission),
      },
      { Authorization: `Bearer ${provider.resendKey}`, provider: "resend" },
    );
  }

  return {
    ok: false,
    configured: false,
    message:
      "No contact provider is configured for this deployment, so nothing was sent. Please email us directly and we will reply.",
  };
}

const FAILURE: DeliveryResult = {
  ok: false,
  configured: true,
  message: "The message could not be delivered. Please email us directly instead.",
};

async function postJson(
  url: string,
  payload: unknown,
  options: { Authorization?: string; provider?: string } = {},
): Promise<DeliveryResult> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (options.Authorization) headers.Authorization = options.Authorization;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) return FAILURE;
    return { ok: true, provider: options.provider ?? "webhook" };
  } catch {
    return {
      ok: false,
      configured: true,
      message: "We could not reach the message service. Please email us directly instead.",
    };
  }
}

function interestLabels(submission: ContactSubmission): string {
  return submission.interest
    .map((value) => INTEREST_OPTIONS.find((option) => option.value === value)?.label ?? value)
    .join(", ");
}

function formatPlainText(submission: ContactSubmission): string {
  return [
    `Name: ${submission.name}`,
    `Company: ${submission.company || "—"}`,
    `Role: ${submission.role || "—"}`,
    `Email: ${submission.email}`,
    `Interest: ${interestLabels(submission)}`,
    "",
    submission.message,
  ].join("\n");
}
