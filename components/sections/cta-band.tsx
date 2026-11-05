import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * The closing call to action. One primary action everywhere, with an optional
 * secondary that changes meaning per page — never a second competing primary.
 */
export function CtaBand({
  eyebrow = "Next step",
  title,
  body,
  primary,
  secondary,
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: { label: string; href: string; analytics?: string };
  secondary?: { label: string; href: string; analytics?: string };
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-navy-950" : "bg-surface",
        className,
      )}
    >
      {dark ? (
        <div aria-hidden className="absolute inset-0 bg-grid-dark mask-fade-edges opacity-60" />
      ) : null}

      <Container className="relative py-20 sm:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>
            <h2
              className={cn(
                "mt-5 text-[1.75rem] leading-[1.15] font-semibold sm:text-4xl",
                dark ? "text-white" : "text-ink",
              )}
            >
              {title}
            </h2>
            {body ? (
              <p className={cn("mt-4 text-base leading-relaxed", dark ? "text-navy-300" : "text-body")}>
                {body}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              href={primary.href}
              size="lg"
              variant={dark ? "onDark" : "primary"}
              analytics={primary.analytics ?? "cta_demo_click"}
              data-analytics-label={primary.label}
              data-analytics-location="cta-band"
            >
              {primary.label}
            </Button>
            {secondary ? (
              <Button
                href={secondary.href}
                size="lg"
                variant={dark ? "onDarkOutline" : "secondary"}
                analytics={secondary.analytics}
                data-analytics-label={secondary.label}
                data-analytics-location="cta-band"
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
