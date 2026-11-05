import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Container } from "./container";

/**
 * A page section. `tone` switches the surface treatment; `bordered` adds the
 * hairline rule that separates stacked sections on light backgrounds.
 */
export function Section({
  children,
  className,
  id,
  tone = "light",
  bordered = false,
  size = "default",
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "surface" | "dark" | "none";
  bordered?: boolean;
  size?: "default" | "wide" | "narrow";
  as?: "section" | "div";
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative scroll-mt-24",
        tone === "light" && "bg-white",
        tone === "surface" && "bg-surface",
        tone === "dark" && "bg-navy-950 text-navy-100",
        bordered && "border-t border-line",
        className,
      )}
    >
      <Container size={size} className="py-20 sm:py-24 lg:py-28">
        {children}
      </Container>
    </Tag>
  );
}

/** Small monospace label that sits above a heading. */
export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "teal";
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-2.5",
        tone === "light" && "text-navy-500",
        tone === "teal" && "text-teal-700",
        tone === "dark" && "text-teal-300",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-6",
          tone === "dark" ? "bg-teal-300/60" : "bg-navy-300",
        )}
      />
      {children}
    </p>
  );
}

/**
 * Eyebrow + heading + optional lead paragraph, with consistent spacing so
 * sections read as one system rather than a series of one-off layouts.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
  headingLevel: Heading = "h2",
  titleClassName,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
  titleClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone === "dark" ? "dark" : "light"} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <Heading
        className={cn(
          "text-[1.75rem] leading-[1.15] font-semibold sm:text-4xl lg:text-[2.625rem]",
          align === "center" && "max-w-4xl",
          tone === "dark" && "text-white",
          titleClassName,
        )}
      >
        {title}
      </Heading>

      {lead ? (
        <div
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-navy-200" : "text-body",
          )}
        >
          {lead}
        </div>
      ) : null}

      {children}
    </div>
  );
}
