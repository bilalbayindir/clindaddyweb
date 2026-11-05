import type { WorkflowStep } from "@/lib/content";
import { InDevelopmentBadge, SpeedBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * A numbered vertical workflow.
 *
 * Used where a sequence is long enough that a horizontal chain would either
 * shrink to illegible labels or force horizontal scrolling. Top-to-bottom
 * order is unambiguous at every width, which matters when the point of the
 * diagram is that the steps happen in this order.
 */
export function WorkflowTimeline({
  steps,
  tone = "light",
  className,
  label,
}: {
  steps: WorkflowStep[];
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}) {
  const dark = tone === "dark";
  const lastIndex = steps.length - 1;

  return (
    <ol className={cn("mx-auto flex max-w-3xl flex-col", className)} aria-label={label}>
      {steps.map((step, index) => {
        const isLast = index === lastIndex;

        return (
          <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0 sm:gap-7">
            {/* Spine connecting each step to the next. */}
            {!isLast ? (
              <span
                aria-hidden
                className={cn(
                  "absolute top-9 bottom-0 left-[1.125rem] w-px",
                  dark ? "bg-white/15" : "bg-line-strong",
                )}
              />
            ) : null}

            <span
              aria-hidden
              className={cn(
                "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-[0.6875rem] tracking-tight",
                isLast
                  ? dark
                    ? "border-teal-400/50 bg-teal-500/15 text-teal-200"
                    : "border-teal-500 bg-teal-50 text-teal-800"
                  : dark
                    ? "border-white/15 bg-navy-950 text-navy-200"
                    : "border-line-strong bg-white text-muted",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0 flex-1 pt-1.5">
              <h3
                className={cn(
                  "text-base leading-snug font-semibold",
                  dark ? "text-white" : "text-ink",
                )}
              >
                {step.title}
              </h3>
              {step.speed ? <SpeedBadge label={step.speed} className="mt-2" /> : null}
              {step.inDevelopment ? <InDevelopmentBadge className="mt-2" /> : null}
              {step.description ? (
                <p
                  className={cn(
                    "mt-1.5 text-sm leading-relaxed",
                    dark ? "text-navy-300" : "text-muted",
                  )}
                >
                  {step.description}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
