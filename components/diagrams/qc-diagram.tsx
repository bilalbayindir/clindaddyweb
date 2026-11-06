import { Check, GitCompareArrows, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Production and independent QC as two genuinely separate lanes.
 *
 * Built from layout rather than a fixed-size SVG so the fork and merge reflow
 * on narrow screens instead of being scaled down to illegibility.
 */
export function QcDiagram({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <div className={cn("flex flex-col items-stretch", className)}>
      <Node
        tone={tone}
        title="Source data"
        caption="Collected clinical data"
        className="mx-auto w-full max-w-xs"
      />

      <Fork direction="down" tone={tone} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Lane
          tone={tone}
          title="Production"
          caption="Executes the approved specification"
          accent="navy"
          icon={<GitCompareArrows className="size-3.5" aria-hidden />}
        />
        <Lane
          tone={tone}
          title="Independent QC"
          caption="Re-implements the computation"
          accent="teal"
          icon={<ShieldCheck className="size-3.5" aria-hidden />}
        />
      </div>

      <Fork direction="up" tone={tone} />

      <Node
        tone={tone}
        title="Compare"
        caption="Differences surfaced, never silently reconciled"
        emphasis
        className="mx-auto w-full max-w-xs"
      />

      <div aria-hidden className="mx-auto h-5 w-px bg-line-strong" />

      <Node
        tone={tone}
        title="Review"
        caption="A person resolves what the comparison found"
        icon={<Check className="size-3.5" aria-hidden />}
        className="mx-auto w-full max-w-xs"
      />
    </div>
  );
}

function Node({
  title,
  caption,
  icon,
  emphasis = false,
  tone,
  className,
}: {
  title: string;
  caption?: string;
  icon?: ReactNode;
  emphasis?: boolean;
  tone: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "rounded-[4px] border px-5 py-4 text-center",
        emphasis
          ? dark
            ? "border-teal-400/40 bg-teal-500/15"
            : "border-navy-900 bg-navy-900 text-white"
          : dark
            ? "border-white/12 bg-white/[0.04]"
            : "border-line bg-white",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center justify-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase",
          emphasis ? (dark ? "text-teal-200" : "text-white") : dark ? "text-navy-100" : "text-ink",
        )}
      >
        {icon}
        {title}
      </p>
      {caption ? (
        <p
          className={cn(
            "mt-1.5 text-xs leading-relaxed",
            emphasis ? (dark ? "text-teal-100/80" : "text-navy-200") : dark ? "text-navy-300" : "text-muted",
          )}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function Lane({
  title,
  caption,
  accent,
  icon,
  tone,
}: {
  title: string;
  caption: string;
  accent: "navy" | "teal";
  icon: ReactNode;
  tone: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "rounded-[4px] border px-5 py-4",
        accent === "teal"
          ? dark
            ? "border-teal-400/35 bg-teal-500/10"
            : "border-teal-300 bg-teal-50"
          : dark
            ? "border-white/12 bg-white/[0.04]"
            : "border-navy-200 bg-navy-50/50",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase",
          accent === "teal" ? (dark ? "text-teal-200" : "text-teal-800") : dark ? "text-navy-100" : "text-navy-700",
        )}
      >
        {icon}
        {title}
      </p>
      <p className={cn("mt-1.5 text-xs leading-relaxed", dark ? "text-navy-300" : "text-body")}>{caption}</p>
    </div>
  );
}

/**
 * The split/join connector.
 *
 * `down` forks one source into two lanes; `up` merges two lanes into one
 * result. The legs sit on the centres of the two grid columns, offset by a
 * quarter of the `gap-4` between them so the lines actually meet the cards.
 * With the lanes stacked on narrow screens the whole fork becomes a rule.
 */
function Fork({ direction, tone }: { direction: "down" | "up"; tone: "light" | "dark" }) {
  const line = tone === "dark" ? "bg-white/20" : "bg-line-strong";
  const legLeft = "calc(25% - 4px)";
  const legRight = "calc(75% + 4px)";
  const legRightInset = "calc(25% - 4px)";

  const legPosition = direction === "down" ? "top-1/2 h-1/2" : "top-0 h-1/2";

  return (
    <div aria-hidden className="h-10">
      {/* Stacked layout: one continuous rule. */}
      <div className="flex h-full justify-center sm:hidden">
        <span className={cn("w-px", line)} />
      </div>

      {/* Side-by-side layout: crossbar, stem, and two legs. */}
      <div className="relative hidden h-full sm:block">
        <span className={cn("absolute top-1/2 h-px", line)} style={{ left: legLeft, right: legRightInset }} />
        <span
          className={cn(
            "absolute left-1/2 w-px -translate-x-1/2",
            line,
            direction === "down" ? "top-0 h-1/2" : "top-1/2 h-1/2",
          )}
        />
        <span className={cn("absolute w-px", line, legPosition)} style={{ left: legLeft }} />
        <span className={cn("absolute w-px", line, legPosition)} style={{ left: legRight }} />
      </div>
    </div>
  );
}

