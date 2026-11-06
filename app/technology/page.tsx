import type { Metadata } from "next";

import { LayerStack } from "@/components/diagrams/flow-chain";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { technologyConcepts, technologyPrinciples, technologyStack } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA } from "@/lib/site";

const description =
  "How ClinDaddy works: a six-pass AI pipeline for interpretation, deterministic engines for execution, human review checkpoints, and second-eye QC — with the model layer separable from the pipeline.";

export const metadata: Metadata = pageMetadata({
  title: "Technology",
  description,
  path: "/technology",
});

/** The FlashEDC pipeline, top to bottom. */
const FLASHEDC_ARCHITECTURE = [
  { title: "Protocol", description: "The sponsor protocol and any amendments." },
  { title: "Document processing", description: "Text, tables, and structure extracted from the source document." },
  { title: "Routed AI pipeline", description: "Each part of the document routed to a prompt suited to that content." },
  { title: "Deterministic code generation", description: "Specifications turned into study-builder code by defined processing." },
  { title: "Second-eye QC", description: "Adversarial review of the generated design." },
  { title: "Human review", description: "A study builder corrects and approves." },
  { title: "EDC study design", description: "Versioned, CDASH-aligned design." },
  { title: "Data collection", description: "Sites enter data on FlashEDC's own EDC runtime." },
];

/** The FlashAnalysis pipeline, top to bottom. */
const FLASHANALYSIS_ARCHITECTURE = [
  { title: "Clinical data", description: "Collected data admitted under a provenance policy." },
  { title: "Provenance policy", description: "Real and synthetic data governed explicitly, not by convention." },
  { title: "Deterministic SDTM", description: "Standards transformation executed, not generated." },
  { title: "ADaM", description: "Analysis-ready datasets with recorded derivations." },
  { title: "TLFs", description: "Tables, listings, and figures produced from specifications." },
  { title: "Independent QC", description: "The computation re-implemented and compared." },
  { title: "Cross-artifact QC", description: "Datasets, specifications, and outputs checked against each other." },
  { title: "Submission", description: "Define-XML, aCRF, cSDRG, ADRG, and the eCTD-lite package." },
  { title: "Audit & lineage", description: "Append-only logging; outputs traceable to source." },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="AI where language is the input. Deterministic engines everywhere else."
        lead="The interesting engineering problem in clinical data is not generating text. It is deciding precisely where a language model is allowed to act, and what happens to its output before that output becomes a clinical number."
        actions={
          <HeroActions
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: "Read the governance model", href: "/trust" }}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* Principles                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Design principles"
          title="Four rules the architecture is built around."
          lead="These are constraints rather than features. They rule out approaches that would be simpler to build and impossible to defend."
        />

        <BorderedGrid columns={2} className="mt-14">
          {technologyPrinciples.map((principle, index) => (
            <BorderedGridCell key={principle.title}>
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base leading-snug font-semibold">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{principle.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Architecture                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered>
        <SectionHeading
          eyebrow="Architecture"
          title="Two pipelines, one set of rules."
          lead="Both engines push the same way: interpretation first, execution second, review third. Everything downstream of a specification is machine-checkable, which is what makes independent QC possible at all."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="rounded-[6px] border border-line bg-surface p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold">FlashEDC</h3>
                <span className="text-[13px] text-brand">
                  Protocol → EDC & Data Capture
                </span>
              </div>
              <LayerStack layers={FLASHEDC_ARCHITECTURE} className="mt-6" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[6px] border border-line bg-surface p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold">FlashAnalysis</h3>
                <span className="text-[13px] text-text-3">
                  Data → Submission
                </span>
              </div>
              <LayerStack layers={FLASHANALYSIS_ARCHITECTURE} className="mt-6" />
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-relaxed text-muted">
          The build is drafted in minutes, not weeks, in our internal benchmarks. That is time to a
          study design ready for human review — not to a live study, which still follows the same
          review, approval and validation path.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {technologyStack.map((item) => (
            <div key={item.layer} className="bg-white p-6">
              <p className="text-xs text-text-3">
                {item.layer}
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{item.detail}</p>
            </div>
          ))}
        </div>

        <Reveal className="mt-14">
          <IllustrationFigure
            src="/images/technology-illustration.jpg"
            alt="Illustration of the ClinDaddy character before a two-chamber machine: a soft document-reading chamber labelled AI on one side, a mechanical chamber of rails and gears executing a specification labelled ENGINE on the other, and a single green approval lamp labelled HUMAN above both."
            width={1408}
            height={768}
            sizes="(min-width: 1024px) 64rem, 100vw"
            caption="Illustration. Interpretation happens in the first chamber; everything a clinical number depends on is executed in the second, and a person holds the approval."
          />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Concepts                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Technical concepts"
          title="How the AI layer is kept on a leash."
          lead="A single prompt asked to do everything is impossible to review. The pipeline is decomposed so that each pass has a bounded job, a reviewable output, and a defined point at which a person can intervene."
        />

        <BorderedGrid columns={4} className="mt-14">
          {technologyConcepts.map((concept) => (
            <BorderedGridCell key={concept.title}>
              <h3 className="text-[0.9375rem] leading-snug font-semibold">{concept.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{concept.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Limits                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="dark" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <Eyebrow tone="dark">What this is not</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-4xl">
              Automating clinical work means accepting limits on the automation.
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed text-navy-300">
              A model that can write anything can also invent a value, a visit, or a derivation that
              no protocol called for. So the model is never the component producing the contents of
              a clinical dataset.
            </p>
            <p className="text-base leading-relaxed text-navy-300">
              Everything downstream of a specification is deterministic processing with a recorded
              result. Specifications are generated, reviewed, corrected, and approved — and only
              then executed.
            </p>
            <p className="text-base leading-relaxed text-navy-300">
              The same principle governs the model layer itself: because it is separable from the
              pipeline, the provider behind a given pass can change without redesigning the
              workflow. That is a design property, not a claim about any specific vendor.
            </p>

            <div className="mt-2 border-t border-white/10 pt-5">
              <p className="text-sm leading-relaxed text-navy-400">
                We do not describe these systems as autonomous, and we do not describe outcomes we
                have not documented.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Ask us the hard questions about the architecture."
        body="If you are evaluating the technology rather than the pitch, we would rather have that conversation early."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: "Talk to ClinDaddy", href: "/contact" }}
      />
    </>
  );
}


