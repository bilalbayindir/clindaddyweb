import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { InDevelopmentBadge, SpeedBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type FlowStep = {
  /** Short label, e.g. "Deterministic Engine". */
  title: string;
  /** Optional one-line explanation shown beneath the label. */
  description?: string;
  /** Optional short mono caption, e.g. "Repeatable". */
  note?: string;
  /** True where the step is not yet live, so the diagram can say so inline. */
  inDevelopment?: boolean;
  /** Short speed figure, e.g. "10–30 min", drawn as a bolt beside the step. */
  speed?: string;
};

/**
 * A left-to-right process chain that becomes a top-to-bottom chain on small
 * screens, so the sequence still reads correctly without horizontal scrolling.
 */
export function FlowChain({
  steps,
  tone = "light",
  className,
  label,
}: {
  steps: FlowStep[];
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}) {
  return (
    <ol
      className={cn("flex flex-col items-stretch gap-0 lg:flex-row", className)}
      aria-label={label}
    >
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          <li
            className={cn(
              "flex flex-1 flex-col justify-center rounded-xl border p-5",
              tone === "light" && "border-line bg-white",
              tone === "dark" && "border-white/12 bg-white/[0.04]",
            )}
          >
            <span
              className={cn(
                "font-mono text-[0.625rem] tracking-[0.14em]",
                tone === "dark" ? "text-teal-300" : "text-teal-700",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "mt-2 text-sm leading-snug font-semibold",
                tone === "dark" ? "text-white" : "text-ink",
              )}
            >
              {step.title}
            </span>
            {step.description ? (
              <span
                className={cn(
                  "mt-1.5 text-xs leading-relaxed",
                  tone === "dark" ? "text-navy-300" : "text-muted",
                )}
              >
                {step.description}
              </span>
            ) : null}
            {step.note ? (
              <span
                className={cn(
                  "mt-2 font-mono text-[0.625rem] tracking-[0.08em] uppercase",
                  tone === "dark" ? "text-navy-400" : "text-navy-400",
                )}
              >
                {step.note}
              </span>
            ) : null}
          </li>

          {index < steps.length - 1 ? (
            <li aria-hidden className="flex shrink-0 items-center justify-center py-1.5 lg:px-1.5 lg:py-0">
              <ArrowRight
                className={cn(
                  "size-4 rotate-90 lg:rotate-0",
                  tone === "dark" ? "text-navy-400" : "text-navy-300",
                )}
              />
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}

/**
 * A vertical stack of stacked layers — used for architecture diagrams where
 * each stage sits on top of the one below it.
 */
export function LayerStack({
  layers,
  tone = "light",
  className,
}: {
  layers: FlowStep[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ol className={cn("relative flex flex-col gap-2", className)}>
      {layers.map((layer, index) => (
        <li key={layer.title} className="relative">
          <div
            className={cn(
              "flex items-start gap-4 rounded-xl border px-5 py-4",
              tone === "light" && "border-line bg-white hover:border-navy-200",
              tone === "dark" && "border-white/12 bg-white/[0.04]",
              "transition-colors duration-200",
            )}
          >
            <span
              className={cn(
                "mt-0.5 font-mono text-[0.625rem] tracking-[0.14em]",
                tone === "dark" ? "text-teal-300" : "text-teal-700",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className={cn("text-sm font-semibold", tone === "dark" ? "text-white" : "text-ink")}>
                {layer.title}
              </p>
              {layer.speed ? <SpeedBadge label={layer.speed} className="mt-1.5" /> : null}
              {layer.inDevelopment ? <InDevelopmentBadge className="mt-1.5" /> : null}
              {layer.description ? (
                <p
                  className={cn(
                    "mt-1 text-xs leading-relaxed",
                    tone === "dark" ? "text-navy-300" : "text-muted",
                  )}
                >
                  {layer.description}
                </p>
              ) : null}
            </div>
          </div>

          {index < layers.length - 1 ? (
            <span
              aria-hidden
              className={cn(
                "mx-auto block h-2 w-px",
                tone === "dark" ? "bg-white/20" : "bg-line-strong",
              )}
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
