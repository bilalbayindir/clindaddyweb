import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FlashAnalysisPanel, FlashEdcPanel } from "@/components/diagrams/product-panels";
import { LifecycleRail } from "@/components/diagrams/lifecycle-rail";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { DemoSection } from "@/components/sections/demo-section";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
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
        aside={
          <IllustrationFigure
            src="/images/lifecycle-illustration.jpg"
            alt="Illustration of the clinical data lifecycle running from protocol through FlashEDC data collection and FlashAnalysis to submission."
            width={1408}
            height={768}
            sizes="(min-width: 1024px) 34rem, 100vw"
            priority
            caption="Illustration. Protocol, eCRFs and EDC at the front; SDTM, ADaM and TLFs downstream."
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
          <div className="rounded-[6px] border border-line bg-white p-6 sm:p-8 lg:p-10">
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
      {/* One protocol read, many systems                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="One protocol read, many systems"
              title="The study model is the product. EDC is its first projection."
              lead="The protocol is read once into a system-neutral study model: visits, forms, fields, codelists and edit checks, each carrying the protocol source behind it. EDC is the first system projected from that model — RTSM follows in 2027, then patient-facing capture and trial operations."
            />
            <Link
              href="/roadmap"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-ink-strong"
              data-analytics="nav_click"
              data-analytics-label="Roadmap"
            >
              See what is available now
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <IllustrationFigure
            src="/images/platform-illustration.jpg"
            alt="Illustration of the ClinDaddy character holding one study model card that projects into EDC, RTSM, eSource, CTMS, eTMF, ePRO, eCOA and eConsent panels."
            width={1408}
            height={768}
            sizes="(min-width: 1024px) 40rem, 100vw"
            caption="Illustration. One study model, projected outward. EDC is available today; RTSM is in development for 2027; the rest are planned."
          />
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

