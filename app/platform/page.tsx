import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FlashAnalysisPanel, FlashEdcPanel } from "@/components/diagrams/product-panels";
import { LifecycleRail } from "@/components/diagrams/lifecycle-rail";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { DemoSection } from "@/components/sections/demo-section";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { ProductCard } from "@/components/sections/product-card";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { products } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA, secondaryCTA } from "@/lib/site";

const description =
  "One shared data model from protocol to submission package: FlashEDC builds the study and collects the data, FlashAnalysis carries it through SDTM, ADaM, TLFs and submission artifacts. Because the platform designed the eCRF, it already knows the SDTM mapping.";

export const metadata: Metadata = pageMetadata({
  title: "Platform",
  description,
  path: "/platform",
});

const CONNECTION_POINTS = [
  {
    title: "One study identity",
    description:
      "A study is identified once. The design produced at study build and the datasets produced downstream belong to the same study, not to two disconnected tools.",
  },
  {
    title: "Specifications carry forward",
    description:
      "Visits, forms, fields, codelists and edit checks are the same specification that governs downstream processing — so the SDTM mapping starts from what was designed.",
  },
  {
    title: "One governance model",
    description:
      "Audit logging, independent QC and human approval apply across both engines instead of being re-implemented per tool.",
  },
];

const REVIEW_POINTS = [
  {
    title: "AI drafts",
    description:
      "The model reads the protocol and drafts specifications. It never writes the final clinical value.",
  },
  {
    title: "A qualified person approves",
    description:
      "Every AI suggestion is editable and reviewable, and approval is an explicit act by a named person.",
  },
  {
    title: "Every suggestion is logged",
    description:
      "AI output, corrections and approvals sit in an append-only audit trail, so the reasoning survives the decision.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="One platform. Two engines. One clinical data lifecycle."
        lead="Clinical data work is one continuous chain of translation: protocol to study design, collected data to standards, standards to analysis, analysis to submission. ClinDaddy splits that chain into two engines that meet in the middle — on one shared data model."
        actions={
          <HeroActions
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* The lifecycle                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="The lifecycle"
          title="Protocol to TLFs, without re-describing the study."
          lead="Because the platform designed the eCRF, it already knows the SDTM mapping. The study is described once, at design time, and the same description carries into data collection and the submission datasets."
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
          lead="Neither product is a general-purpose assistant. Each takes a defined input, produces a defined artifact, and stops at a point where a person can review it."
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
          {CONNECTION_POINTS.map((point) => (
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
      {/* Human in the loop                                                   */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="dark" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionHeading
            tone="dark"
            eyebrow="Human in the loop"
            title="AI drafts. A qualified user approves."
            lead="Automation should remove mechanical work, not accountability. The platform is built so a person is always the last step."
          />
          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {REVIEW_POINTS.map((point) => (
              <li key={point.title} className="py-5">
                <h3 className="text-base font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-300">{point.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/trust"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200"
          data-analytics="nav_click"
          data-analytics-label="Trust & governance"
        >
          Read the governance model
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Section>

      <DemoSection products={products} />

      <CtaBand
        title="See the platform against a study you already know."
        body="We will walk through one protocol and one dataset, and show exactly where the automation stops and a reviewer takes over."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
      />
    </>
  );
}
