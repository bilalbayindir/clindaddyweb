import type { Metadata } from "next";

import { WorkflowTimeline } from "@/components/diagrams/workflow-timeline";
import { Reveal } from "@/components/motion/reveal";
import { ProductPage } from "@/components/sections/product-page";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { flashedc } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const description =
  "FlashEDC reads a clinical trial protocol and produces CDASH-aligned eCRFs, edit checks and a versioned study design — then runs the study on ClinDaddy's own EDC runtime, with human review before anything is finalized.";

export const metadata: Metadata = pageMetadata({
  title: "FlashEDC — Protocol to eCRFs, then EDC data collection",
  description,
  path: "/flashedc",
});

/** The review loop, drawn separately from the linear build workflow. */
const REVIEW_LOOP: { title: string; description: string }[] = [
  {
    title: "Generate",
    description: "The pipeline produces a draft: skeleton first, then eCRFs, fields and edit checks.",
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

const BUILD_POINTS = [
  {
    title: "Minutes, not weeks",
    description:
      "A review-ready study design is drafted from the protocol in minutes in our internal benchmarks, rather than assembled by hand over weeks. The review and approval path is unchanged.",
  },
  {
    title: "Standards at design time",
    description:
      "CDASH field identifiers, codelists and eCRF naming are applied while the study is designed, not retrofitted before submission.",
  },
  {
    title: "Versioned by default",
    description:
      "A published design is never edited in place. Updates create a new version, so the design a site collected against stays reconstructable.",
  },
  {
    title: "Its own EDC runtime",
    description:
      "The study runs on FlashEDC's EDC data collection. Sites enter data against the design a reviewer approved.",
  },
];

export default function FlashEdcPage() {
  return (
    <ProductPage
      product={flashedc}
      heroTitle="Turn a clinical trial protocol into an EDC study — and capture the data."
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
        title: "Available today.",
        body: "FlashEDC is a finished product: protocol analysis, eCRF design and the EDC runtime that collects the data. It is demo-ready now.",
        note: "Status describes the product, not commercial traction. There are no customers or case studies to point to yet.",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* What makes it different                                             */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="Study build, then data collection"
          title="One design, from protocol to the site's screen."
          lead="The structure that was reviewed at study build is the structure data is captured against. There is no second build in another system, and no translation step between design and collection."
        />

        <IllustrationFigure
          className="mt-12"
          src="/images/flashedc-speed-illustration.jpg"
          alt="Illustration of a protocol document entering a study-build machine and emerging as visit, form and lab-panel artifacts, with a clock reading 10–30 minutes and a stack labelled ten weeks of manual processes behind it."
          width={1379}
          height={752}
          sizes="(min-width: 1024px) 64rem, 100vw"
          caption="Illustration. A protocol becomes a review-ready study build; the time shown is to a review-ready build, not to a live study. Live studies follow the same review, approval and validation path."
        />

        <BorderedGrid columns={2} className="mt-14">
          {BUILD_POINTS.map((point) => (
            <BorderedGridCell key={point.title}>
              <h3 className="text-[0.9375rem] leading-snug font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">
          The speed figure is time to a study build ready for human review, not time to a live
          study. A study going live still follows the same review, approval and validation path.
        </p>
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
