import { CornerDownRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type LineageHop = {
  /** Where in the chain this sits, e.g. "Output", "Dataset", "Record". */
  kind: string;
  /** The concrete artifact or field, e.g. "ADSL.AGE". */
  label: string;
  /** Optional qualifier, e.g. the specification that governs the step. */
  detail?: string;
};

/**
 * One value, traced from the output the reviewer is looking at back to the
 * record it came from. Reads top-down as "this came from", which is the
 * question a reviewer actually asks.
 */
export function LineageTrace({
  title,
  value,
  hops,
  tone = "light",
  className,
}: {
  title: string;
  value?: string;
  hops: LineageHop[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[6px] border",
        dark ? "border-white/12 bg-white/[0.03]" : "border-line bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-4 border-b px-5 py-3",
          dark ? "border-white/10" : "border-line",
        )}
      >
        <p
          className={cn(
            "font-mono text-[0.6875rem] tracking-[0.12em] uppercase",
            dark ? "text-navy-300" : "text-muted",
          )}
        >
          {title}
        </p>
        {value ? (
          <p
            className={cn(
              "font-mono text-xs font-medium",
              dark ? "text-teal-200" : "text-teal-700",
            )}
          >
            {value}
          </p>
        ) : null}
      </div>

      <ol className="px-5 py-4">
        {hops.map((hop, index) => {
          const isLast = index === hops.length - 1;
          return (
            <li key={`${hop.kind}-${hop.label}`} className="relative flex gap-4 pb-4 last:pb-0">
              {/* Spine connecting the hops. */}
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-4 bottom-0 left-[0.3125rem] w-px",
                    dark ? "bg-white/15" : "bg-line-strong",
                  )}
                />
              ) : null}

              <span
                aria-hidden
                className={cn(
                  "relative z-10 mt-1.5 size-[0.6875rem] shrink-0 rounded-full border-2 bg-white",
                  index === 0
                    ? dark
                      ? "border-teal-300"
                      : "border-teal-500"
                    : dark
                      ? "border-navy-400"
                      : "border-navy-300",
                  dark && "bg-navy-950",
                )}
              />

              <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className={cn(
                    "font-mono text-[0.625rem] tracking-[0.1em] uppercase",
                    dark ? "text-navy-400" : "text-muted",
                  )}
                >
                  {hop.kind}
                </span>
                <span
                  className={cn(
                    "font-mono text-xs font-medium break-all",
                    dark ? "text-navy-100" : "text-ink",
                  )}
                >
                  {hop.label}
                </span>
                {hop.detail ? (
                  <span className={cn("text-xs", dark ? "text-navy-300" : "text-muted")}>· {hop.detail}</span>
                ) : null}
              </div>

              {!isLast ? (
                <CornerDownRight
                  aria-hidden
                  className={cn("mt-1 size-3 shrink-0", dark ? "text-navy-500" : "text-navy-200")}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

