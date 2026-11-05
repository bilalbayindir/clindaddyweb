import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FlashAnalysisPanel, FlashEdcPanel } from "@/components/diagrams/product-panels";
import { FlowChain } from "@/components/diagrams/flow-chain";
import { LifecycleRail } from "@/components/diagrams/lifecycle-rail";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { DemoSection } from "@/components/sections/demo-section";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { ProductCard } from "@/components/sections/product-card";
import { Badge } from "@/components/ui/badge";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import {
  aiCroDestination,
  canonicalStudyModel,
  connectionPoints,
  products,
  roadmapNote,
  roadmapSystems,
  type RoadmapStatus,
} from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA } from "@/lib/site";

const description =
  "One platform, two engines: FlashEDC turns a protocol into an EDC study build in 10 to 30 minutes — edit-check specifications and programming code included — against roughly ten weeks by hand, and captures the data against it. FlashAnalysis carries clinical data through standards, analysis, QC, and submission. One canonical study model, projected into the systems a trial runs on.";

export const metadata: Metadata = pageMetadata({
  title: "Platform",
  description,
  path: "/platform",
});

/** Status colour, kept in one place so the roadmap reads consistently. */
const ROADMAP_TONES: Record<RoadmapStatus, "success" | "teal" | "neutral"> = {
  built: "success",
  "in-development": "teal",
  architected: "neutral",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="One platform. Two engines. One clinical data lifecycle."
        lead="Clinical data work is one continuous chain of translation: protocol to study design, collected data to standards, standards to analysis, analysis to submission artifacts. ClinDaddy splits that chain into two engines that meet in the middle."
        actions={
          <HeroActions
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: "See how it works", href: "#demo" }}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* The lifecycle                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="The lifecycle"
          title="Eight stages from protocol to submission."
          lead="FlashEDC is accountable for the front of the chain — protocol, study build, and the data capture that follows. It reaches a review-ready study build in 10 to 30 minutes, edit-check specifications and programming code included, against roughly ten weeks to do the same build by hand. FlashAnalysis is accountable for everything downstream. The middle stage is no longer a handoff to a system we do not touch: it is where the study the platform built is used to collect its own data."
        />

        <Reveal className="mt-14">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 lg:p-10">
            <LifecycleRail variant="panel" />
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* The two engines                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered id="engines">
        <SectionHeading
          eyebrow="The two engines"
          title="Each engine owns a clearly bounded piece of the work."
          lead="Neither product is a general-purpose assistant. Each one takes a defined input, produces a defined artifact, and stops at a point where a person can review it."
        />

        <div className="mt-14 flex flex-col gap-6">
          <Reveal>
            <ProductCard product={products[0]}>
              <FlashEdcPanel />
            </ProductCard>
          </Reveal>

          <Reveal>
            <ProductCard product={products[1]}>
              <FlashAnalysisPanel />
            </ProductCard>
          </Reveal>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Interfaces shown are illustrative and built with synthetic values. They are not customer
          systems, and no study data is reproduced anywhere on this site.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* How they connect                                                    */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="How the two connect"
          title="A single chain of custody, rather than two handoffs."
          lead="Point tools create the gap they were meant to close: the design lives in one system, the datasets in another, and the submission documents in a third. The platform is built so the same study identity runs through both engines."
        />

        <BorderedGrid columns={3} className="mt-14">
          {connectionPoints.map((point) => (
            <BorderedGridCell key={point.title}>
              <h3 className="text-[0.9375rem] leading-snug font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/flashedc"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
            data-analytics="product_explore_click"
            data-analytics-label="FlashEDC"
          >
            Explore FlashEDC
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/flashanalysis"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 transition-colors hover:text-navy-700"
            data-analytics="product_explore_click"
            data-analytics-label="FlashAnalysis"
          >
            Explore FlashAnalysis
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy-600 transition-colors hover:text-navy-700"
            data-analytics="nav_click"
            data-analytics-label="Technology"
          >
            Read about the technology
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* One protocol read, many systems                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered id="model">
        <SectionHeading
          eyebrow="One protocol read, many systems"
          title={canonicalStudyModel.headline}
          lead={canonicalStudyModel.intro}
        />

        <Reveal className="mt-14">
          <FlowChain steps={canonicalStudyModel.steps} label="Canonical study model" />
        </Reveal>

        <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-snug font-medium text-ink">
          {canonicalStudyModel.pull}
        </p>

        <Reveal className="mt-14">
          <IllustrationFigure
            src="/images/platform-illustration.jpg"
            alt="Illustration of the ClinDaddy character holding up one glowing study model card, with light beams projecting from it into eight system panels labelled EDC, RTSM, eSource, CTMS, eTMF, ePRO, eCOA, and eConsent. Only the EDC panel is fully lit; the other seven are faint outlines."
            width={1408}
            height={768}
            sizes="(min-width: 1024px) 64rem, 100vw"
            caption="Illustration. One study model, projected outward — EDC built, RTSM in development, the rest architected. The status column below is the one to read."
          />
        </Reveal>

        <BorderedGrid columns={4} className="mt-14">
          {roadmapSystems.map((system) => (
            <BorderedGridCell key={system.id}>
              <h3 className="text-[0.9375rem] leading-snug font-semibold">{system.name}</h3>
              <p className="mt-1 text-xs text-muted">{system.fullName}</p>
              <div className="mt-3">
                <Badge tone={ROADMAP_TONES[system.status]}>{system.statusLabel}</Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{system.scope}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">{roadmapNote}</p>

        {/* The destination, stated only here — beside the status column, never alone. */}
        <div className="mt-10 rounded-2xl border border-navy-200 bg-navy-50/50 p-7 sm:p-9">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-navy-600 uppercase">
            Destination
          </p>
          <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{aiCroDestination.headline}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-body">{aiCroDestination.body}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{aiCroDestination.today}</p>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Governance teaser                                                   */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="dark" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            <Eyebrow tone="dark">Governance</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-4xl">
              Neither engine is allowed to be the last word.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-300">
              AI assists with interpretation. Deterministic engines execute the specifications.
              Humans approve the result, and the reasoning behind every number stays traceable.
            </p>
          </div>

          <Link
            href="/trust"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200 lg:justify-self-end"
            data-analytics="nav_click"
            data-analytics-label="Trust & governance"
          >
            Read the governance model
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Section>

      <DemoSection products={products} />

      <CtaBand
        title="See the platform against a study you already know."
        body="We will walk through one protocol and one dataset, and show exactly where the automation stops and a reviewer takes over."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: "Talk to ClinDaddy", href: "/contact" }}
      />
    </>
  );
}
