"use client";

import { CircleCheck } from "lucide-react";
import { useState } from "react";

import { track } from "@/lib/analytics";

type State = "idle" | "sending" | "sent" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function PilotForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({ name: "", company: "", email: "", start: "protocol" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Honeypot: a real person never fills this.
    if ((form.elements.namedItem("website") as HTMLInputElement | null)?.value) {
      setState("sent");
      return;
    }

    if (!values.name.trim() || !values.email.trim()) {
      setState("error");
      setMessage("Please add your name and work email.");
      return;
    }
    if (!EMAIL.test(values.email.trim())) {
      setState("error");
      setMessage("That does not look like a valid email address.");
      return;
    }

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          company: values.company,
          email: values.email,
          interest: ["pilot"],
          message:
            values.start === "protocol"
              ? "Pilot request: a protocol, for a FlashEDC study build."
              : "Pilot request: a dataset, for an SDTM package.",
        }),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (response.ok && payload?.ok) {
        track("pilot_form_submit", { start: values.start });
        setState("sent");
        return;
      }
      setState("error");
      setMessage(
        payload?.message ??
          "The request could not be sent. Please email hello@clindaddy.com instead.",
      );
    } catch {
      setState("error");
      setMessage("We could not reach the server. Please email hello@clindaddy.com instead.");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col items-start rounded-[6px] border border-rule bg-white p-8" role="status">
        <CircleCheck className="size-6 text-[#0E7C5A]" aria-hidden />
        <h3 className="mt-4 text-2xl text-ink">Request received.</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-text-2">
          Thank you. Someone from ClinDaddy will reply to the address you gave us with a scope and a
          fixed pilot price.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-[18px] rounded-[6px] border border-rule bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" id="pilot-name" value={values.name} onChange={(v) => setValues({ ...values, name: v })} autoComplete="name" />
        <Field label="Company" id="pilot-company" value={values.company} onChange={(v) => setValues({ ...values, company: v })} autoComplete="organization" />
      </div>
      <Field label="Work email" id="pilot-email" type="email" value={values.email} onChange={(v) => setValues({ ...values, email: v })} autoComplete="email" />

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-sm font-medium text-ink">What would you like to start with?</legend>
        {[
          ["protocol", "A protocol, for a FlashEDC study build"],
          ["dataset", "A dataset, for an SDTM package"],
        ].map(([value, label]) => (
          <label key={value} className="flex items-center gap-2.5 text-[15px] text-ink">
            <input
              type="radio"
              name="start"
              value={value}
              checked={values.start === value}
              onChange={() => setValues({ ...values, start: value })}
              className="size-[18px] accent-[#142B44]"
            />
            {label}
          </label>
        ))}
      </fieldset>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="pilot-website">Website</label>
        <input id="pilot-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" ? (
        <p role="alert" className="text-sm text-danger">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="h-12 self-start rounded-[4px] bg-ink-strong px-[22px] text-[15px] font-medium text-white transition-colors hover:bg-ink-deep disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Request a pilot"}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-[4px] border border-input-border bg-white px-3 text-[15px] text-ink focus:border-ink-strong"
      />
    </div>
  );
}
