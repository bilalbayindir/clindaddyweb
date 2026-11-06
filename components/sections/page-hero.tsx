import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * The opening block for every inner page, so the h1, eyebrow, and lead sit in
 * the same place and at the same scale across the site.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b",
        dark ? "border-white/10 bg-ink-strong" : "border-rule bg-paper",
        className,
      )}
    >
      <Container className="relative">
        <div
          className={cn(
            "grid gap-12 py-12 sm:py-16 lg:py-20",
            aside && "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16",
          )}
        >
          <div className={cn(!aside && "max-w-3xl")}>
            <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>

            <h1
              className={cn(
                "mt-6 text-[38px] leading-[1.08] tracking-[-0.02em] font-normal sm:text-[48px] lg:text-[60px] lg:leading-[1.04]",
                dark ? "text-white" : "text-ink",
              )}
            >
              {title}
            </h1>

            {lead ? (
              <p
                className={cn(
                  "mt-6 max-w-2xl text-base leading-[1.6] lg:text-[18px]",
                  dark ? "text-navy-300" : "text-text-2",
                )}
              >
                {lead}
              </p>
            ) : null}

            {actions ? <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
          </div>

          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}

/** Convenience wrapper so page heroes use identical CTA styling. */
export function HeroActions({
  primary,
  secondary,
  tone = "light",
}: {
  primary: { label: string; href: string; analytics?: string };
  secondary?: { label: string; href: string; analytics?: string };
  tone?: "light" | "dark";
}) {
  return (
    <>
      <Button
        href={primary.href}
        size="lg"
        variant={tone === "dark" ? "onDark" : "primary"}
        analytics={primary.analytics ?? "cta_demo_click"}
        data-analytics-label={primary.label}
        data-analytics-location="page-hero"
      >
        {primary.label}
      </Button>
      {secondary ? (
        <Button
          href={secondary.href}
          size="lg"
          variant={tone === "dark" ? "onDarkOutline" : "secondary"}
          analytics={secondary.analytics}
          data-analytics-label={secondary.label}
          data-analytics-location="page-hero"
        >
          {secondary.label}
        </Button>
      ) : null}
    </>
  );
}
