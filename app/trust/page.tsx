import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FlowChain } from "@/components/diagrams/flow-chain";
import { QcDiagram } from "@/components/diagrams/qc-diagram";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { trustPillars, trustPrinciples } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA, secondaryCTA, trustAnchors } from "@/lib/site";

const description =
  "ClinDaddy is built to 21 CFR Part 11 and GxP standards, with CDISC conformance, deterministic execution, independent QC, human approval and AI governance documented for evaluation.";

export const metadata: Metadata = pageMetadata({
  title: "Trust & governance",
  description,
  path: "/trust",
});

const COMPLIANCE_CHAIN = [
  { title: "21 CFR Part 11", description: "Audit trail, e-signatures, access control, versioning." },
  { title: "GxP", description: "Validated development and change control." },
  { title: "CDISC", description: "CDASH at design; SDTM, ADaM and Define-XML downstream." },
  { title: "Human approval", description: "Explicit, attributable sign-off." },
];

const EXECUTION_CHAIN = [
  { title: "AI", description: "Reads and interprets language." },
  { title: "Specification", description: "A reviewable, editable artifact." },
  { title: "Deterministic engine", description: "Executes the approved specification." },
  { title: "Clinical output", description: "Produced by defined processing." },
];

const AI_CHAIN = [
  { title: "AI draft", description: "Editable, reviewable, logged." },
  { title: "Human review", description: "A qualified person reads and corrects." },
  { title: "Approval", description: "A named person signs off." },
  { title: "Audit log", description: "Append-only record of the decision." },
];

const DIAGRAMS: Record<string, ReactNode> = {
  regulatory: <FlowChain steps={COMPLIANCE_CHAIN} label="Regulatory posture" />,
  "deterministic-execution": <FlowChain steps={EXECUTION_CHAIN} label="Deterministic execution path" />,
  "independent-qc": <QcDiagram />,
  "ai-governance": <FlowChain steps={AI_CHAIN} label="AI governance path" />,
};

export default function TrustPage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Trust & governance"
        title="Built for regulated use. Honest about what is not certified."
        lead="ClinDaddy is built to 21 CFR Part 11 and GxP standards, with CDISC conformance, deterministic execution, independent QC and explicit human approval. No third-party certification or audit is claimed."
        actions={
          <HeroActions
            tone="dark"
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: "Read the technology", href: "/technology" }}
          />
        }
      />

      {/* In-page navigation */}
      <nav aria-label="Trust topics" className="border-b border-line bg-white">
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

            <Reveal className="min-w-0 lg:self-center">{DIAGRAMS[pillar.id]}</Reveal>
          </div>
        </Section>
      ))}

      {/* Validation */}
      <Section tone="surface" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Validation"
            title="Documentation is available under NDA."
            lead="Validation documentation, security details and hosting controls are shared during evaluation rather than summarized as a marketing claim."
          />

          <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-white p-7 sm:p-9">
            <p className="text-sm leading-relaxed text-body">
              Tell us what your quality or procurement process needs and we will route the request
              to the right person.
            </p>
            <Button href="/contact?interest=other" variant="primary">
              Request validation documentation
            </Button>
            <p className="text-xs leading-relaxed text-muted">
              Please do not send confidential study data through the website.
            </p>
          </div>
        </div>
      </Section>

      {/* Limits */}
      <Section tone="dark" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="dark">Limits</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-4xl">
              What we do not claim.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-300">
              A trust page is only worth reading if it also states its limits. These are ours.
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
        body="Validation approach, audit trails, QC independence and human approval are fair questions to ask before anything else."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
      />
    </>
  );
}
