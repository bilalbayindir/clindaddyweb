import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";

import { WorkflowTimeline } from "@/components/diagrams/workflow-timeline";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { pilotProgram } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA } from "@/lib/site";

const description =
  "ClinDaddy's pilot program: one real deliverable — an SDTM/ADaM/TLF package or one FlashEDC study build — at discounted pilot pricing, with a written path to a full-price per-study contract.";

export const metadata: Metadata = pageMetadata({
  title: "Pilot program",
  description,
  path: "/pilot",
});

export default function PilotPage() {
  return (
    <>
      <PageHero
        eyebrow="Pilot program"
        title={pilotProgram.headline}
        lead={pilotProgram.intro}
        actions={
          <HeroActions
            primary={{ label: "Apply for a pilot", href: "/contact?interest=pilot", analytics: "cta_pilot_click" }}
            secondary={{ label: primaryCTA.label, href: primaryCTA.href }}
          />
        }
      />

      {/* Who it is for */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Who it is for"
          title="Two kinds of team, one bounded piece of work."
          lead="A pilot is designed to answer a practical question: can this deliverable be produced to your standard, on your data, in a way you can defend?"
        />

        <BorderedGrid columns={2} className="mt-14">
          {pilotProgram.audiences.map((audience) => (
            <BorderedGridCell key={audience.title}>
              <h3 className="text-base leading-snug font-semibold">{audience.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{audience.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Section>

      {/* What a pilot is */}
      <Section tone="light" bordered>
        <SectionHeading
          eyebrow="What a pilot is"
          title="One real deliverable, not a trial licence."
          lead="Choose the piece that is most useful to you. Both are produced with QC evidence, and both can be reviewed against your own specifications."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {pilotProgram.what.map((item) => (
            <Reveal key={item.title}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 sm:p-9">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="How it works"
          title="Five steps, no procurement cycle."
          lead="A pilot is scoped in one conversation and delivered as one package. If it works, the next study is scoped on a full-price contract."
        />

        <Reveal className="mt-14">
          <WorkflowTimeline steps={[...pilotProgram.steps]} label="Pilot program steps" />
        </Reveal>
      </Section>

      {/* Terms */}
      <Section tone="dark" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Terms"
              title="Discounted because you are early, not because the work is smaller."
              lead="Pilot pricing is exchanged for a reference and a case study, with a written path to a full-price contract."
            />
          </div>

          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {pilotProgram.terms.map((term) => (
              <li key={term} className="flex gap-4 py-5">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-teal-300" aria-hidden />
                <p className="text-base leading-relaxed text-navy-100">{term}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-navy-400">
          Pricing is scoped per study. There are no price numbers on this site; a proposal states the
          deliverable, the scope and the fixed price.
        </p>
      </Section>

      <CtaBand
        title="Apply for a pilot."
        body="Tell us the study, the data source and the deliverable you would find most useful. We will reply with a scope and a fixed price."
        primary={{ label: "Apply for a pilot", href: "/contact?interest=pilot", analytics: "cta_pilot_click" }}
        secondary={{ label: primaryCTA.label, href: primaryCTA.href }}
      />
    </>
  );
}
