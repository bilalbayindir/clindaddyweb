import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Single source of truth for horizontal rhythm across every page. */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-10",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-[82.5rem]",
        size === "wide" && "max-w-[90rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
