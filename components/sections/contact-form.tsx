"use client";

import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import {
  EMPTY_SUBMISSION,
  INTEREST_OPTIONS,
  isInterestValue,
  validateSubmission,
  type ContactSubmission,
  type FieldErrors,
} from "@/lib/contact-shared";
import { cn } from "@/lib/utils";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "sent" }
  | { state: "failed"; message: string; configured: boolean };

/**
 * The contact form.
 *
 * The form never reports success it did not receive. If no provider is
 * configured on the server, the visitor is told plainly and given the email
 * address instead — see `app/api/contact/route.ts`.
 */
export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const formId = useId();
  const [values, setValues] = useState<ContactSubmission>(EMPTY_SUBMISSION);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const errorRef = useRef<HTMLParagraphElement>(null);

  /**
   * Pre-select the interest that brought the visitor here, e.g. the
   * `?interest=demo` link behind every "Request a Demo" button. Read from the
   * URL after mount so the page itself can stay statically rendered.
   */
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("interest");
    if (!requested || !isInterestValue(requested)) return;
    setValues((current) =>
      current.interest.includes(requested)
        ? current
        : { ...current, interest: [...current.interest, requested] },
    );
  }, []);

  function update<K extends keyof ContactSubmission>(key: K, value: ContactSubmission[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function toggleInterest(value: (typeof INTEREST_OPTIONS)[number]["value"]) {
    update(
      "interest",
      values.interest.includes(value)
        ? values.interest.filter((item) => item !== value)
        : [...values.interest, value],
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldErrors = validateSubmission(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus({ state: "idle" });
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });
    track("contact_form_submit", { interest: values.interest.join(",") });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; configured?: boolean; fields?: FieldErrors }
        | null;

      if (response.ok && payload?.ok) {
        track("contact_form_success", { interest: values.interest.join(",") });
        setStatus({ state: "sent" });
        return;
      }

      if (payload?.fields) {
        setErrors(payload.fields);
        setStatus({ state: "idle" });
        requestAnimationFrame(() => errorRef.current?.focus());
        return;
      }

      track("contact_form_error", { status: String(response.status) });
      setStatus({
        state: "failed",
        configured: payload?.configured !== false,
        message:
          payload?.message ??
          "The message could not be sent. Please email us directly instead.",
      });
    } catch {
      track("contact_form_error", { status: "network" });
      setStatus({
        state: "failed",
        configured: true,
        message: "We could not reach the server. Please email us directly instead.",
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div
        className="flex flex-col items-start rounded-2xl border border-success/20 bg-success-soft p-7 sm:p-9"
        role="status"
      >
        <CircleCheck className="size-6 text-success" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-ink">Thank you — your message is on its way.</h3>
        <p className="mt-3 text-sm leading-relaxed text-body">
          Someone from ClinDaddy will reply to the address you gave us. If it is easier, you can
          also write to{" "}
          <a
            className="font-medium text-teal-800 underline decoration-teal-300 underline-offset-2"
            href={`mailto:${fallbackEmail}`}
            data-analytics="outbound_email_click"
            data-analytics-label="contact-confirmation"
          >
            {fallbackEmail}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-7"
          onClick={() => {
            setValues(EMPTY_SUBMISSION);
            setStatus({ state: "idle" });
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {errorCount > 0 ? (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-danger/20 bg-danger-soft px-4 py-3 text-sm text-danger"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          Please correct the highlighted {errorCount === 1 ? "field" : "fields"} and try again.
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          required
          error={errors.name}
          value={values.name}
          onChange={(value) => update("name", value)}
          autoComplete="name"
        />
        <Field
          id={`${formId}-company`}
          label="Company"
          value={values.company}
          onChange={(value) => update("company", value)}
          autoComplete="organization"
        />
        <Field
          id={`${formId}-role`}
          label="Role"
          value={values.role}
          onChange={(value) => update("role", value)}
          autoComplete="organization-title"
        />
        <Field
          id={`${formId}-email`}
          label="Email"
          type="email"
          required
          error={errors.email}
          value={values.email}
          onChange={(value) => update("email", value)}
          autoComplete="email"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          Interest <span className="text-muted">— select all that apply</span>
        </legend>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {INTEREST_OPTIONS.map((option) => {
            const checked = values.interest.includes(option.value);
            return (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                  checked
                    ? "border-teal-400 bg-teal-50 text-ink"
                    : "border-line bg-white text-body hover:border-navy-300",
                )}
              >
                <input
                  type="checkbox"
                  name="interest"
                  value={option.value}
                  checked={checked}
                  onChange={() => toggleInterest(option.value)}
                  className="size-4 shrink-0 accent-[var(--color-teal-600)]"
                />
                {option.label}
              </label>
            );
          })}
        </div>

        {errors.interest ? (
          <p className="mt-2 text-xs text-danger">{errors.interest}</p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor={`${formId}-message`} className="text-sm font-medium text-ink">
          Message <span className="text-danger">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          placeholder="Tell us about the studies you run, the systems you use, and what you would like to see."
          className={cn(
            "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm leading-relaxed text-ink transition-colors placeholder:text-muted/70",
            errors.message ? "border-danger" : "border-line-strong focus:border-navy-400",
          )}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="mt-2 text-xs text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status.state === "failed" ? (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-xl border border-warning/20 bg-warning-soft px-4 py-3.5"
        >
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-warning">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {status.message}
          </p>
          {!status.configured ? (
            <p className="text-sm leading-relaxed text-warning">
              You can reach us at{" "}
              <a
                className="font-medium underline decoration-warning/40 underline-offset-2"
                href={`mailto:${fallbackEmail}`}
                data-analytics="outbound_email_click"
                data-analytics-label="contact-error"
              >
                {fallbackEmail}
              </a>
              .
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <Button type="submit" size="lg" disabled={status.state === "submitting"}>
          {status.state === "submitting" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
        <p className="text-xs leading-relaxed text-muted">
          We use your details only to reply. Nothing is added to a mailing list.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label} {required ? <span className="text-danger">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-xl border bg-white px-4 text-sm text-ink transition-colors",
          error ? "border-danger" : "border-line-strong focus:border-navy-400",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
