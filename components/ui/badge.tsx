import type { ReactNode } from "react";
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";

type Tone = "neutral" | "teal" | "navy" | "dark" | "success" | "flash";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-surface text-body",
  teal: "border-teal-200 bg-teal-50 text-teal-800",
  navy: "border-navy-200 bg-navy-50 text-navy-700",
  dark: "border-white/15 bg-white/[0.06] text-navy-100",
  success: "border-success/20 bg-success-soft text-success",
  flash: "border-flash-line bg-flash-soft text-flash",
};

/** Small label for capability tags, statuses, and product markers. */
export function Badge({
  children,
  tone = "neutral",
  className,
  mono = false,
  title,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  mono?: boolean;
  /** Native tooltip — used where a short label needs its caveat attached. */
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs leading-none font-medium",
        mono && "font-mono text-[0.6875rem] tracking-[0.06em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The status marker for anything not yet live. Shared so "Data Capture" reads
 * the same wherever it appears, and so the teal matches the roadmap's own
 * "In development" tone rather than a second colour meaning the same thing.
 */
export function InDevelopmentBadge({ className }: { className?: string }) {
  return (
    <Badge tone="teal" mono className={cn("px-2 py-0.5", className)}>
      In development
    </Badge>
  );
}

/**
 * How fast FlashEDC produces a study design, marked wherever the build is
 * drawn. The bolt is the speed mark and the only place the flash hue is used.
 *
 * The label is the short figure only; the qualifier it depends on — that this
 * is time to a *review-ready draft*, not to a live study — lives in the Speed
 * section on /flashedc and in the title text here. Never show the figure
 * without that context somewhere on the page.
 */
export function SpeedBadge({ label, className }: { label: string; className?: string }) {
  return (
    <Badge
      tone="flash"
      mono
      className={cn("gap-1 px-2 py-0.5", className)}
      title="Protocol to a review-ready study build — edit-check specifications and programming code included — against roughly ten weeks by hand. A study going live still follows the same review, approval, and validation path."
    >
      <Zap className="size-3 shrink-0 fill-current" aria-hidden />
      {label}
    </Badge>
  );
}

/** The `Protocol → EDC & Data Capture` style positional label used for both products. */
export function PositionTag({
  children,
  tone = "teal",
  className,
}: {
  children: ReactNode;
  tone?: "teal" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs tracking-[0.08em] uppercase",
        tone === "teal" ? "text-teal-700" : "text-teal-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
