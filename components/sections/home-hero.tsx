import { ComingSoon } from "@/components/diagrams/coming-soon";
import { LifecycleRail } from "@/components/diagrams/lifecycle-rail";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { plannedSystems } from "@/lib/content";
import { primaryCTA, secondaryCTA } from "@/lib/site";

/**
 * The homepage hero.
 *
 * The promise is stated in five words and then immediately drawn, so a visitor
 * sees the span of the platform before reading any product detail.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      {/* Faint engineering grid, fading out toward the edges. */}
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade-edges opacity-80" />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-teal-50 opacity-70 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl pt-16 text-center sm:pt-20 lg:pt-24">
          <Eyebrow className="justify-center">Clinical data automation</Eyebrow>

          <h1 className="mt-7 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-[3.25rem] lg:text-[4rem]">
            From Protocol to Submission.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
            Clinical data automation built for the real-world complexity of clinical trials.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href={primaryCTA.href}
              size="lg"
              analytics="cta_demo_click"
              data-analytics-label={primaryCTA.label}
              data-analytics-location="home-hero"
            >
              {primaryCTA.label}
            </Button>
            <Button
              href={secondaryCTA.href}
              size="lg"
              variant="secondary"
              analytics="cta_platform_click"
              data-analytics-label={secondaryCTA.label}
              data-analytics-location="home-hero"
            >
              {secondaryCTA.label}
            </Button>
          </div>

          <p className="mt-8 font-mono text-[0.6875rem] leading-relaxed tracking-[0.08em] text-teal-700 uppercase">
            AI assists. Deterministic systems execute. Humans approve. Everything is traceable.
          </p>
        </div>

        {/* The lifecycle, drawn — and, below it, the systems it points at next. */}
        <div className="mt-14 pb-20 sm:mt-16">
          <div className="rounded-2xl border border-line bg-white/80 p-6 shadow-card backdrop-blur-sm sm:p-8 lg:p-10">
            <LifecycleRail />
          </div>

          <ComingSoon systems={plannedSystems} className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
