import type { Metadata } from "next";

import { FlowChain } from "@/components/diagrams/flow-chain";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { aboutPillars, aiCroDestination, team } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA } from "@/lib/site";

const description =
  "Why ClinDaddy exists: clinical trials depend on enormous amounts of manual data work, and automating it only helps if the result can be trusted. AI assists, deterministic engines execute, humans approve.";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description,
  path: "/about",
});

const APPROACH_CHAIN = [
  { title: "AI assists", description: "Interpretation and specification." },
  { title: "Deterministic engines execute", description: "Repeatable processing." },
  { title: "Humans approve", description: "Explicit, attributable sign-off." },
  { title: "Everything is traceable", description: "Outputs connected to source." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Clinical data work should not be rebuilt by hand for every study."
        lead="ClinDaddy exists because the same mechanical translation happens at every sponsor and every CRO, on every study, and the effort resets each time a new protocol is approved."
        actions={
          <HeroActions
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: "Explore the Platform", href: "/platform" }}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* Why, what, how, where next                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="The company"
          title="Four questions, answered plainly."
        />

        <BorderedGrid columns={2} className="mt-14">
          {aboutPillars.map((pillar, index) => (
            <BorderedGridCell key={pillar.title}>
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base leading-snug font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* The lifecycle                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="The long view"
            title="One canonical study model, spanning the whole lifecycle."
            lead="The two products are not two businesses. They are the first two projections of one system-neutral study model read from the protocol, and the value of covering both is that the study does not have to be re-described at every handoff."
          />

          <Reveal className="min-w-0">
            <IllustrationFigure
              src="/images/lifecycle-illustration.jpg"
              alt="Illustration of the clinical data lifecycle running from protocol through FlashEDC, data collection, and FlashAnalysis to submission."
              width={1408}
              height={768}
              sizes="(min-width: 1024px) 40rem, 100vw"
              caption="Illustration. Protocol to submission — FlashEDC covering protocol, study build, and data capture; FlashAnalysis covering the downstream chain."
            />
          </Reveal>
        </div>

        {/* The destination, said as a destination — never as today's capability. */}
        <div className="mt-14 grid gap-8 rounded-2xl border border-navy-200 bg-navy-50/50 p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14">
          <h3 className="text-xl font-semibold sm:text-2xl">{aiCroDestination.headline}</h3>
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-body">{aiCroDestination.body}</p>
            <p className="text-sm leading-relaxed text-muted">{aiCroDestination.today}</p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Approach                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="The approach"
          title="Four rules, applied to everything we build."
          lead="Automating clinical work is only useful if the output can be defended. That constraint shapes the architecture more than any other decision we have made."
        />

        <Reveal className="mt-14">
          <FlowChain steps={APPROACH_CHAIN} label="The ClinDaddy approach" />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Team                                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow>{team.heading}</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold sm:text-4xl">
              {team.lead}
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {team.members.map((member) => (
              <div key={member.name} className="rounded-2xl border border-line bg-white p-7 sm:p-9">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-700 uppercase">
                    {member.role}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-ink">{member.credential}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-700 uppercase">
                {team.artifact.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body">{team.artifact.body}</p>
            </div>

            <div className="rounded-2xl border border-navy-200 bg-navy-50/50 p-7 sm:p-9">
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-navy-600 uppercase">
                {team.notClaimed.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body">{team.notClaimed.body}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Maturity                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="dark" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="dark">Maturity</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-4xl">
              Working technology with a clear path toward productization.
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed text-navy-300">
              We are honest about the stage we are at. FlashEDC is in internal CRO use. FlashAnalysis
              is a tested, policy-driven platform. Neither is presented as mature commercial
              software, because neither is.
            </p>
            <p className="text-sm leading-relaxed text-navy-400">
              If you are evaluating ClinDaddy, that distinction should be part of your assessment —
              not something you discover later.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Start a conversation."
        body="Whether you are running studies, evaluating the technology, or looking at the company, we would rather talk than pitch."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: "Talk to ClinDaddy", href: "/contact" }}
      />
    </>
  );
}
