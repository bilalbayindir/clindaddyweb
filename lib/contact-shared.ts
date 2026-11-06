/**
 * Contact form contract, shared by the browser form and the server route.
 *
 * Kept free of any environment access so it is safe to import from a client
 * component — the provider credentials live in `lib/contact.ts`, which is
 * server-only.
 */

export const INTEREST_OPTIONS = [
  { value: "demo", label: "Product demo" },
  { value: "pilot", label: "Pilot program" },
  { value: "partnership", label: "Partnership" },
  { value: "investment", label: "Investment" },
  { value: "validation", label: "Validation documentation" },
  { value: "early-access", label: "Early access to a module" },
  { value: "other", label: "Other" },
] as const;

export type InterestValue = (typeof INTEREST_OPTIONS)[number]["value"];

export type ContactSubmission = {
  name: string;
  company: string;
  role: string;
  email: string;
  interest: InterestValue[];
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactSubmission, string>>;

export const EMPTY_SUBMISSION: ContactSubmission = {
  name: "",
  company: "",
  role: "",
  email: "",
  interest: [],
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 5000;

export function isInterestValue(value: string): value is InterestValue {
  return INTEREST_OPTIONS.some((option) => option.value === value);
}

/** The same rules run in the browser and on the server. */
export function validateSubmission(submission: ContactSubmission): FieldErrors {
  const errors: FieldErrors = {};

  if (!submission.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  if (!submission.email.trim()) {
    errors.email = "Please give us an email address to reply to.";
  } else if (!EMAIL_PATTERN.test(submission.email.trim())) {
    errors.email = "That does not look like a valid email address.";
  }

  if (submission.interest.length === 0) {
    errors.interest = "Choose at least one reason for getting in touch.";
  }

  const message = submission.message.trim();
  if (!message) {
    errors.message = "Please add a short message so we know how to help.";
  } else if (message.length < 10) {
    errors.message = "A little more detail would help us route this properly.";
  }

  return errors;
}

/** Coerce an arbitrary request body into a submission, then validate it. */
export function parseSubmission(body: unknown): {
  submission: ContactSubmission;
  errors: FieldErrors;
} {
  const source = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const asString = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

  const interest = Array.isArray(source.interest)
    ? Array.from(
        new Set(
          source.interest
            .map(asString)
            .filter((value): value is InterestValue => isInterestValue(value)),
        ),
      )
    : [];

  const submission: ContactSubmission = {
    name: asString(source.name).slice(0, 200),
    company: asString(source.company).slice(0, 200),
    role: asString(source.role).slice(0, 200),
    email: asString(source.email).slice(0, 320),
    interest,
    message: asString(source.message).slice(0, MAX_MESSAGE),
  };

  return { submission, errors: validateSubmission(submission) };
}
