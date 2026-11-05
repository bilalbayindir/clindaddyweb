import type { Metadata } from "next";

import { QcDiagram } from "@/components/diagrams/qc-diagram";
import { Reveal } from "@/components/motion/reveal";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { ProductPage } from "@/components/sections/product-page";
import { Section, SectionHeading } from "@/components/ui/section";
import { flashanalysis } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const description =
  "FlashAnalysis transforms clinical data into CDISC SDTM and ADaM datasets, tables, listings, and figures, with independent QC, traceability to source, and submission artifacts generated alongside the outputs they describe.";

export const metadata: Metadata = pageMetadata({
  title: "FlashAnalysis — Clinical data to analysis and submission",
  description,
  path: "/flashanalysis",
});

export default function FlashAnalysisPage() {
  return (
    <ProductPage
      product={flashanalysis}
      heroTitle="From Clinical Data to Analysis and Submission."
      heroAside={
        <IllustrationFigure
          src="/images/flashanalysis-illustration.jpg"
          alt="Illustration of the ClinDaddy character at a console showing raw clinical data flowing through SDTM and ADaM to results, with a separate QC rail converging on a match and lineage traced back to source rows."
          width={1440}
          height={785}
          sizes="(min-width: 1024px) 34rem, 100vw"
          priority
          caption="Illustration. One dataset path from raw data to results, a QC run kept deliberately separate, and every value traceable to the row it came from."
        />
      }
      workflowLead="Collected data enters at the top. Submission artifacts come out at the bottom, having passed through standards transformation, analysis, and two independent checks."
      maturity={{
        title: "Available today — and sold on its own.",
        body: "FlashAnalysis is a finished product: SDTM, ADaM, TLFs, independent QC and submission artifacts, covered by approximately 2,500 automated tests.",
        note: "It works with FlashEDC data, any other EDC's export, or the sponsor's own specifications. A sponsor does not have to switch EDC to use it.",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Any EDC input                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Sold separately"
            title="Keep your EDC. Add the analysis layer."
            lead="FlashAnalysis is not a reason to migrate systems. It accepts data from FlashEDC, any other EDC, or the sponsor's own specifications, and produces the submission package from there."
          />
          <div className="flex flex-col gap-4 lg:pt-14">
            <p className="text-base leading-relaxed text-body">
              Many small sponsors already have an EDC they are comfortable with, and a programming
              gap downstream. FlashAnalysis can be bought as one deliverable — an SDTM/ADaM/TLF
              package, an independent QC run, or a submission-readiness check — without changing
              where the data is collected.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              FlashEDC and FlashAnalysis connect when a sponsor uses both, but neither depends on
              the other to be useful.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Independent QC                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Independent QC"
          title="A second run of the same code is not a second opinion."
          lead="If QC re-executes production, it agrees with production by construction — including when production is wrong. FlashAnalysis separates the two computations on purpose, then compares the results and hands the differences to a reviewer."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <Reveal>
            <QcDiagram />
          </Reveal>

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-body">
              Production executes the approved specification. Independent QC re-implements the
              computation from the same specification by a different route. The comparison between
              the two results is the evidence — not the fact that both runs finished.
            </p>
            <p className="text-base leading-relaxed text-body">
              Cross-artifact QC extends that check beyond a single output: datasets, specifications,
              and the documents that describe them are compared against each other, which catches
              the inconsistencies that per-artifact review cannot see.
            </p>
            <p className="text-sm leading-relaxed text-muted">
              Differences are surfaced for review. They are never reconciled silently, and nothing
              is released on the assumption that a discrepancy was benign.
            </p>
          </div>
        </div>
      </Section>
    </ProductPage>
  );
}
