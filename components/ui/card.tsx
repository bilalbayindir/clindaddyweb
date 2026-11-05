import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** A restrained bordered surface. Used sparingly — not everything is a card. */
export function Card({
  children,
  className,
  tone = "light",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "surface" | "dark";
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-7",
        tone === "light" && "border-line bg-white",
        tone === "surface" && "border-line bg-surface",
        tone === "dark" && "border-white/10 bg-white/[0.03]",
        interactive && "transition-colors duration-200 hover:border-navy-300",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * A grid drawn with hairlines rather than card chrome — closer to a
 * specification table than a set of boxes, which suits technical content.
 */
export function BorderedGrid({
  children,
  columns = 3,
  className,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border-t border-l border-line bg-white",
        "grid grid-cols-1",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** One cell inside `BorderedGrid`. */
export function BorderedGridCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-r border-b border-line p-6 sm:p-7", className)}>{children}</div>
  );
}
