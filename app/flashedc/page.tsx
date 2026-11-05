import type { Metadata } from "next";

import { WorkflowTimeline } from "@/components/diagrams/workflow-timeline";
import { Reveal } from "@/components/motion/reveal";
import { ProductPage } from "@/components/sections/product-page";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { Section, SectionHeading } from "@/components/ui/section";
import { flashedc, flashedcSpeed } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const description =
  "FlashEDC analyzes a clinical trial protocol and generates the visits, forms, fields, code lists, and edit checks needed to build the study in an EDC environment — and captures study data against that same design, with human review before anything is finalized.";

export const metadata: Metadata = pageMetadata({
  title: "FlashEDC — Protocol to EDC study design and data capture",
  description,
  path: "/flashedc",
});

/** The review loop, drawn separately from the linear build workflow. */
const REVIEW_LOOP: { title: string; description: string }[] = [
  {
    title: "Generate",
    description: "The pipeline produces a draft: skeleton first, then forms, fields, and checks.",
  },
  {
    title: "Review",
    description: "A study builder reads the draft and corrects it directly in the artifact.",
  },
  {
    title: "Second-eye QC",
    description:
      "An adversarial pass looks for defects, resolves what is safe to resolve, and escalates the rest.",
  },
  {
    title: "Approve",
    description: "Nothing is finalized until a named reviewer approves it.",
  },
];

export default function FlashEdcPage() {
  return (
    <ProductPage
      product={flashedc}
      heroTitle="Turn a Clinical Trial Protocol into an EDC Study — and capture the data."
      heroAside={
        <IllustrationFigure
          src="/images/flashedc-illustration.jpg"
          alt="Illustration of a study builder reviewing a clinical protocol while generated visit, form, and field structure appears as a study design."
          width={1408}
          height={768}
          sizes="(min-width: 1024px) 34rem, 100vw"
          priority
          caption="Illustration. The study builder reviews the generated design; the protocol stays the source of truth."
        />
      }
      workflowLead="The protocol goes in at the top. A reviewable study design comes out at the bottom — with two points where a person has to look at it before the next stage runs."
      maturity={{
        title: "A working internal tool, not a finished product.",
        body: "FlashEDC runs in internal CRO use with strong engine fidelity: the generation path from protocol to study design is real and exercised on real protocols.",
        note: "It currently depends on a specific EDC environment, which is the main constraint on how it is deployed today. We describe it that way rather than as a generally available commercial product.",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Speed — how fast the design arrives                                 */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Speed"
          title={flashedcSpeed.headline}
          lead={flashedcSpeed.lead}
        />

        {/* Sits directly above the figures, and the caveat below them, so the
            "10-30 MIN" in the artwork can never be read on its own as a claim
            about time to a *live* study. */}
        <IllustrationFigure
          className="mt-12"
          src="/images/flashedc-speed-illustration.jpg"
          alt="Illustration of a protocol document dropping into a chute, a stack of generated study-design cards emerging from the other side, a clock reading 10-30 MIN, and a tall stack of folders labelled ~10 WEEKS fading out behind."
          width={1379}
          height={752}
          sizes="(min-width: 1024px) 64rem, 100vw"
          caption="Illustration. The protocol goes in and a study design comes out in 10–30 minutes — against roughly ten weeks to assemble the same build by hand. That is time to a review-ready build, not to a live study."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {flashedcSpeed.stats.map((stat) => (
            <div key={stat.label} className="bg-white p-7 sm:p-9">
              <p className="text-[2.25rem] leading-none font-semibold tracking-tight text-ink sm:text-[2.5rem]">
                {stat.value}
              </p>
              <p className="mt-4 text-sm font-medium text-body">{stat.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{stat.detail}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">{flashedcSpeed.note}</p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Human review — the part that is not automated                       */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered>
        <SectionHeading
          eyebrow="Human review"
          title="Generation is the fast part. Review is the point."
          lead="A study design that nobody checked is not an asset. FlashEDC is built so the output arrives as a draft a study builder can correct — not as a finished artifact to be accepted or rejected."
        />

        <Reveal className="mt-14">
          <WorkflowTimeline steps={REVIEW_LOOP} label="Review and approval loop" />
        </Reveal>

        <p className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-muted">
          Corrections are made in the artifact itself. Re-running the pipeline to get a different
          answer is not the workflow, because the reviewer&apos;s judgement has to survive into the
          final design.
        </p>
      </Section>
    </ProductPage>
  );
}
