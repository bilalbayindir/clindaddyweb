import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { aboutPillars, team } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA, secondaryCTA, siteAddress } from "@/lib/site";

const description =
  "ClinDaddy LLC is a clinical data automation company founded in November 2026 in Norristown, Pennsylvania. It builds FlashEDC and FlashAnalysis: protocol to eCRFs and EDC data collection, then SDTM, ADaM, TLFs and submission artifacts.";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description,
  path: "/about",
});

const COMPANY_FACTS = [
  { label: "Company", value: "ClinDaddy LLC" },
  { label: "Founded", value: "November 2026" },
  { label: "Based", value: siteAddress },
  { label: "Products", value: "FlashEDC · FlashAnalysis" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Clinical data work should not be rebuilt by hand for every study."
        lead="ClinDaddy builds the software layer that turns a protocol into a study — and carries the resulting data to submission. It was founded in 2026 by someone who spent 13 years building the systems studies run on."
        actions={
          <HeroActions
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
          />
        }
      />

      {/* Company facts */}
      <section className="border-b border-rule bg-white">
        <Container>
          <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_FACTS.map((fact) => (
              <div key={fact.label} className="bg-white px-6 py-6">
                <p className="text-xs text-text-3">{fact.label}</p>
                <p className="mt-2 text-sm font-medium text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why, what, how, where next */}
      <Section tone="surface" bordered>
        <SectionHeading eyebrow="The company" title="Four questions, answered plainly." />

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

      {/* Founder */}
      <Section tone="light" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow>{team.heading}</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold sm:text-4xl">
              {team.lead}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-body">
              A company of one at the start is not a weakness to hide; it is the reason the products
              are coherent. Both were designed and built by the same person who has to defend them
              in a diligence conversation.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {team.members.map((member) => (
              <div key={member.name} className="rounded-[6px] border border-line bg-white p-7 sm:p-9">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <span className="text-sm text-brand">
                    {member.role}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-ink">{member.credential}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Hiring */}
      <Section tone="surface" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow={team.hiring.label}
            title="The next four roles."
            lead={team.hiring.body}
          />

          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {team.hiring.roles.map((role, index) => (
              <li key={role} className="flex items-baseline gap-6 py-5">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium text-ink">{role}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Vision */}
      <Section tone="dark" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="dark">The long view</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-4xl">
              Toward an AI CRO.
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed text-navy-300">
              A CRO is paid to do the work of running a trial, with software as its instrument.
              Software that can produce trial systems from a single protocol read points somewhere
              further: a CRO whose instrument is that software.
            </p>
            <p className="text-base leading-relaxed text-navy-300">
              That is the destination, not where ClinDaddy is today. Today it is a clinical data
              automation company with two finished products: FlashEDC and FlashAnalysis. RTSM is in
              development for 2027; patient-facing capture and trial operations are planned on the
              same data model.
            </p>
            <Reveal>
              <p className="text-sm leading-relaxed text-navy-400">
                The roadmap shows each module&apos;s current status, so this paragraph can be checked
                against it.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Start a conversation."
        body="Whether you are running studies, evaluating the technology, or looking at the company, we would rather talk than pitch."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
      />
    </>
  );
}


