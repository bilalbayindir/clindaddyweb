import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FlowChain } from "@/components/diagrams/flow-chain";
import { LineageTrace } from "@/components/diagrams/lineage-trace";
import { QcDiagram } from "@/components/diagrams/qc-diagram";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { Container } from "@/components/ui/container";
import { Eyebrow, Section } from "@/components/ui/section";
import { trustPillars, trustPrinciples } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA, trustAnchors } from "@/lib/site";

const description =
  "ClinDaddy separates interpretation from execution, production from QC, and automation from approval: deterministic engines execute, humans approve, and every output is traceable to its source.";

export const metadata: Metadata = pageMetadata({
  title: "Trust & governance",
  description,
  path: "/trust",
});

const EXECUTION_CHAIN = [
  { title: "AI", description: "Reads and interprets language." },
  { title: "Specification", description: "A reviewable, editable artifact." },
  { title: "Deterministic engine", description: "Executes the approved specification." },
  { title: "Clinical output", description: "Produced by defined processing." },
];

const HUMAN_CHAIN = [
  { title: "AI", description: "Drafts." },
  { title: "Draft", description: "A working artifact." },
  { title: "Human review", description: "A person reads it." },
  { title: "Correction", description: "Judgement captured in the artifact." },
  { title: "Second-eye QC", description: "Independent adversarial review." },
  { title: "Approved output", description: "Signed off by a named reviewer." },
];

const LINEAGE_HOPS = [
  { kind: "Output", label: "Table 14.2.1 · Mean SYSBP", detail: "Week 12" },
  { kind: "Dataset", label: "ADVS.VSSTRESN", detail: "ADaM" },
  { kind: "Specification", label: "ADVS-014 derivation", detail: "approved" },
  { kind: "Transformation", label: "SDTM VS → ADVS", detail: "processing step" },
  { kind: "Source record", label: "VS · USUBJID 1001 · V2", detail: "collected value 128" },
];

/** The diagram shown against each pillar. */
const DIAGRAMS: Record<string, ReactNode> = {
  "deterministic-execution": <FlowChain steps={EXECUTION_CHAIN} label="Deterministic execution path" />,
  traceability: (
    <LineageTrace
      title="Lineage · one value traced to its record"
      value="5 hops"
      hops={LINEAGE_HOPS}
    />
  ),
  "independent-qc": <QcDiagram />,
  "human-in-the-loop": (
    <div className="flex flex-col gap-6">
      <FlowChain steps={HUMAN_CHAIN} label="Human review path" />
      <IllustrationFigure
        src="/images/trust-illustration.jpg"
        alt="Illustration of a reviewer approving a submission after production data and independent QC results have been reconciled."
        width={1408}
        height={768}
        sizes="(min-width: 1024px) 40rem, 100vw"
        caption="Illustration. Approval is an explicit act performed by a person — the last step in the chain, never an inferred state."
      />
    </div>
  ),
};

export default function TrustPage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Trust & governance"
        title="AI assists. Deterministic systems execute. Humans approve."
        lead="ClinDaddy is not uncontrolled autonomous AI. Interpretation is separated from execution, production is separated from independent QC, and approval is an explicit human act. Everything in between is traceable."
        actions={
          <HeroActions
            tone="dark"
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: "Read the technology", href: "/technology" }}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* In-page navigation                                                  */}
      {/* ------------------------------------------------------------------ */}
      <nav
        aria-label="Trust topics"
        className="border-b border-line bg-white"
      >
        <Container className="flex flex-wrap gap-x-8 gap-y-3 py-5">
          {trustAnchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-ink"
              data-analytics="nav_click"
              data-analytics-label={anchor.label}
            >
              {anchor.label}
            </a>
          ))}
        </Container>
      </nav>

      {trustPillars.map((pillar, index) => (
        <Section
          key={pillar.id}
          id={pillar.id}
          tone={index % 2 === 0 ? "light" : "surface"}
          bordered
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <Eyebrow>
                {pillar.index} · {pillar.eyebrow}
              </Eyebrow>

              <h2 className="mt-5 text-[1.625rem] leading-[1.15] font-semibold sm:text-[2rem]">
                {pillar.title}
              </h2>

              <div className="mt-6 flex flex-col gap-4">
                {pillar.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-body">
                    {paragraph}
                  </p>
                ))}
              </div>

              <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-3 py-3.5 text-sm leading-relaxed text-body">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-teal-500" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-mono text-[0.625rem] leading-relaxed tracking-[0.08em] text-muted uppercase">
                {pillar.diagramLabel}
              </p>
            </div>

            <Reveal className="min-w-0">{DIAGRAMS[pillar.id]}</Reveal>
          </div>
        </Section>
      ))}

      {/* ------------------------------------------------------------------ */}
      {/* Governance commitments                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="dark" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="dark">Our commitments</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-4xl">
              What we will not claim on this website.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-300">
              A trust page is only worth reading if it also states its limits. These are ours, and
              they are the reason some sections of this site are deliberately short.
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {trustPrinciples.map((principle, index) => (
              <li key={principle} className="flex gap-6 py-6">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-navy-100">{principle}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        title="Bring your governance questions to the demo."
        body="Validation approach, audit trails, QC independence, and human approval are fair questions to ask before anything else."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: "Talk to ClinDaddy", href: "/contact" }}
      />
    </>
  );
}
