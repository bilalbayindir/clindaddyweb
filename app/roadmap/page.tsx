import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/sections/cta-band";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Eyebrow, Section } from "@/components/ui/section";
import { roadmapNote, roadmapStages, type RoadmapStage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA, secondaryCTA } from "@/lib/site";

const description =
  "The ClinDaddy roadmap: FlashEDC and FlashAnalysis available today, RTSM/IRT in development for 2027, patient-facing modules and trial operations planned on the same data model, and the AI CRO as the destination.";

export const metadata: Metadata = pageMetadata({
  title: "Roadmap",
  description,
  path: "/roadmap",
});

const TONES: Record<RoadmapStage["status"], "success" | "teal" | "neutral" | "navy"> = {
  available: "success",
  "in-development": "teal",
  planned: "neutral",
  vision: "navy",
};

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        title="Two products today. More of the trial next."
        lead="Every module is designed on the same protocol-derived data model, so new systems ship faster and integrate on day one. The status below each item is literal."
        actions={
          <HeroActions
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
          />
        }
      />

      <Section tone="surface" bordered>
        <div className="relative">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[0.4375rem] w-px bg-line sm:left-[0.5625rem]"
          />

          <ol className="flex flex-col gap-14">
            {roadmapStages.map((stage) => (
              <li key={stage.id} id={stage.id} className="relative pl-10 sm:pl-14">
                <span
                  aria-hidden
                  className="absolute top-2 left-0 size-3.5 rounded-full border-2 border-teal-500 bg-white sm:size-4"
                />

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <Eyebrow>{stage.stage}</Eyebrow>
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                    {stage.timeline}
                  </span>
                  <Badge tone={TONES[stage.status]}>{stage.statusLabel}</Badge>
                </div>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
                  {stage.description}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {stage.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col rounded-xl border border-line bg-white p-5"
                    >
                      <h3 className="text-base font-semibold text-ink">{item.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.label}</p>

                      {stage.status === "in-development" || stage.status === "planned" ? (
                        <Link
                          href={`/contact?interest=early-access&module=${encodeURIComponent(item.name)}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
                          data-analytics="cta_early_access_click"
                          data-analytics-label={`Early access — ${item.name}`}
                        >
                          Interested in early access?
                          <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                      ) : stage.status === "available" ? (
                        <Link
                          href={
                            item.name === "FlashEDC" ? "/flashedc" : "/flashanalysis"
                          }
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
                          data-analytics="product_explore_click"
                          data-analytics-label={item.name}
                        >
                          Explore
                          <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-14 max-w-3xl text-xs leading-relaxed text-muted">{roadmapNote}</p>
      </Section>

      <CtaBand
        title="Want to shape what ships next?"
        body="Early-access conversations are how we decide which module comes after RTSM. Tell us what your studies need."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
      />
    </>
  );
}
