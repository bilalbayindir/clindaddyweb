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
        tone === "light" && "bg-paper",
        tone === "surface" && "bg-white",
        tone === "dark" && "bg-ink-strong text-white",
        bordered && "border-t border-rule",
        className,
      )}
    >
      <Container size={size} className="py-12 sm:py-16 lg:py-[6.5rem]">
        {children}
      </Container>
    </Tag>
  );
}

/** Small section label. Sans, sentence case, with a signal-coloured rule. */
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
        "eyebrow flex items-center gap-3",
        tone === "light" && "text-text-3",
        tone === "teal" && "text-brand",
        tone === "dark" && "text-navy-300",
        className,
      )}
    >
      <span aria-hidden className="h-0.5 w-7 bg-signal" />
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
          "text-[1.875rem] leading-[1.08] font-normal sm:text-[2.625rem] sm:leading-[1.1]",
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
            "max-w-2xl text-base leading-[1.6] sm:text-[1.0625rem]",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-navy-300" : "text-text-2",
          )}
        >
          {lead}
        </div>
      ) : null}

      {children}
    </div>
  );
}
