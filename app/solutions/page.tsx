import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/sections/cta-band";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Eyebrow, Section } from "@/components/ui/section";
import { solutions } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA } from "@/lib/site";

const description =
  "ClinDaddy for CROs and for pharma and biotech sponsors: less manual study-build and programming effort, faster startup, consistent designs, independent QC, traceability, and submission readiness.";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description,
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built for the teams that carry the clinical data workload."
        lead="The same platform, read two ways. CROs feel the effort and the margin. Sponsors feel the inconsistency and the difficulty of reconstructing what happened. Both are costs of the same manual work — the work the platform takes on today, and the base a wider set of life-sciences services is being built from."
        actions={
          <HeroActions
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: "Explore the Platform", href: "/platform" }}
          />
        }
        aside={
          <IllustrationFigure
            src="/images/solutions-illustration.jpg"
            alt="Illustration of the ClinDaddy character standing between two desks: a CRO operations desk stacked high with study folders on one side, and a sponsor desk holding one protocol and one finished submission package on the other."
            width={1379}
            height={752}
            sizes="(min-width: 1024px) 34rem, 100vw"
            priority
            caption="Illustration. The same platform, read from the CRO's side and the sponsor's."
          />
        }
      />

      {solutions.map((solution, index) => (
        <Section
          key={solution.id}
          id={solution.id}
          tone={index % 2 === 0 ? "light" : "surface"}
          bordered
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Eyebrow>{solution.audience}</Eyebrow>
              <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold sm:text-4xl">
                {solution.headline}
              </h2>
            </div>

            <div className="lg:pt-14">
              <p className="text-base leading-relaxed text-body">{solution.intro}</p>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                  Relevant products
                </span>
                {solution.relevantProducts.map((name) => (
                  <Badge key={name} tone={name === "FlashEDC" ? "teal" : "navy"}>
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <BorderedGrid columns={4} className="mt-14">
            {solution.outcomes.map((outcome) => (
              <BorderedGridCell key={outcome.title}>
                <h3 className="text-[0.9375rem] leading-snug font-semibold">{outcome.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{outcome.description}</p>
              </BorderedGridCell>
            ))}
          </BorderedGrid>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
              data-analytics="cta_platform_click"
              data-analytics-label={`${solution.audience} — platform`}
            >
              See how the platform works
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={solution.id === "cros" ? "/flashedc" : "/flashanalysis"}
              className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 transition-colors hover:text-navy-700"
              data-analytics="product_explore_click"
              data-analytics-label={solution.audience}
            >
              {solution.id === "cros" ? "Explore FlashEDC" : "Explore FlashAnalysis"}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Section>
      ))}

      {/* ------------------------------------------------------------------ */}
      {/* Scope note                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="dark" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="dark">Scope</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-4xl">
              Outcomes we describe, and outcomes we can demonstrate.
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed text-navy-300">
              The outcomes on this page describe what the platform is built to change — the
              mechanical effort inside study build, standards transformation, programming, QC, and
              submission documentation.
            </p>
            <p className="text-base leading-relaxed text-navy-300">
              They are not measured results from customer deployments, and we do not publish
              percentages we cannot substantiate. Where a number appears on this site it is an
              engineering metric, stated as such.
            </p>
            <p className="text-sm leading-relaxed text-navy-400">
              If you want to know what a specific claim is based on, ask us directly. We would
              rather answer that question than have you assume.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Tell us where the manual effort sits in your studies."
        body="We will show you the parts of that work the platform takes on today, and the parts it does not."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: "Talk to ClinDaddy", href: "/contact" }}
      />
    </>
  );
}
