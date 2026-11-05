import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { evidence, investorQuestions, investorThesis, lifecycleStages, maturityStatement } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const description =
  "The ClinDaddy investment thesis: a bounded initial wedge in protocol-to-EDC study design and data capture, downstream expansion across standards, analysis, QC, and submission, and a long-term platform that projects one canonical study model into the systems a trial runs on.";

export const metadata: Metadata = pageMetadata({
  title: "Investors",
  description,
  path: "/investors",
});

const THESIS_PARTS = [investorThesis.wedge, investorThesis.expansion];

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Building the Clinical Data Automation Layer."
        lead={investorThesis.intro}
        actions={
          <HeroActions
            primary={{ label: "Talk to ClinDaddy", href: "/contact?interest=investment", analytics: "cta_investor_click" }}
            secondary={{ label: "Explore the Platform", href: "/platform" }}
          />
        }
        aside={
          <IllustrationFigure
            src="/images/lifecycle-illustration.jpg"
            alt="Illustration of the clinical data lifecycle running from protocol through FlashEDC, data collection, and FlashAnalysis to submission."
            width={1408}
            height={768}
            sizes="(min-width: 1024px) 34rem, 100vw"
            priority
            caption="Illustration. One lifecycle, two engines — the shape of the platform thesis."
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* Thesis                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Investment thesis"
          title="A narrow wedge, then the same model downstream."
          lead="The expansion story is not a second product line. It is the same study continuing through stages that are already effort-heavy and already specification-driven — and, further out, the same neutral study model projected into the systems a trial runs on."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {THESIS_PARTS.map((part) => (
            <Reveal key={part.label}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 sm:p-9">
                <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-700 uppercase">
                  {part.label}
                </p>
                <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{part.product}</h3>
                <p className="mt-3 text-base font-medium text-ink">{part.statement}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{part.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Long-term platform */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-navy-200 bg-navy-50/50 p-7 sm:p-9">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-navy-600 uppercase">
              {investorThesis.platform.label}
            </p>
            <h3 className="mt-4 text-xl font-semibold sm:text-2xl">
              {investorThesis.platform.statement}
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-body">
              {investorThesis.platform.body}
            </p>

            <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
              {lifecycleStages.map((stage, index) => (
                <li key={stage.id} className="flex items-center gap-3">
                  <span className="rounded-full border border-navy-200 bg-white px-3.5 py-1.5 text-xs font-medium text-navy-700">
                    {stage.title}
                  </span>
                  {index < lifecycleStages.length - 1 ? (
                    <span aria-hidden className="text-navy-300">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Technology position                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Current technology position"
            title={maturityStatement.headline}
            lead={maturityStatement.body[0]}
          />

          <div>
            <dl className="flex flex-col divide-y divide-line border-y border-line">
              {evidence.map((item) => (
                <div key={item.label} className="py-6">
                  <dt className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
                      {item.label}
                    </span>
                    <span className="text-lg font-semibold text-ink">{item.value}</span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-xs leading-relaxed text-muted">{maturityStatement.body[1]}</p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Diligence questions                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Diligence"
          title="The questions we expect, answered in the open."
          lead="These are the answers as they stand today. Where something is not yet established, the answer says so."
        />

        <BorderedGrid columns={2} className="mt-14">
          {investorQuestions.map((item, index) => (
            <BorderedGridCell key={item.title}>
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base leading-snug font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Credibility                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="dark" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="dark">A note on claims</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-4xl">
              What this website does not say.
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed text-navy-300">
              We do not publish customer names, deployment counts, funding, revenue, partnerships,
              certifications, or regulatory status, because none of that has been established in a
              form we are prepared to stand behind.
            </p>
            <p className="text-base leading-relaxed text-navy-300">
              What we can show is working technology: a FlashEDC internal CRO tool that drafts a full
              study build — edit-check specifications and programming code included — in 10 to 30
              minutes against roughly ten weeks by hand, and a FlashAnalysis platform covered by
              approximately 2,500 passing tests with policy-driven provenance governance.
            </p>
            <p className="text-sm leading-relaxed text-navy-400">
              Anything beyond that, we would rather demonstrate in a conversation than assert on a
              page.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Start a conversation with the team."
        body="Tell us what you need to evaluate, and we will give you the working technology rather than the narrative."
        primary={{ label: "Talk to ClinDaddy", href: "/contact?interest=investment", analytics: "cta_investor_click" }}
        secondary={{ label: "Explore the Platform", href: "/platform" }}
      />
    </>
  );
}
