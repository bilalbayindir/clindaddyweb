import type { ReactNode } from "react";

import { WorkflowTimeline } from "@/components/diagrams/workflow-timeline";
import { CtaBand } from "@/components/sections/cta-band";
import { DemoSection } from "@/components/sections/demo-section";
import { HeroActions, PageHero } from "@/components/sections/page-hero";
import { Badge, InDevelopmentBadge } from "@/components/ui/badge";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import type { Product } from "@/lib/content";
import { primaryCTA, secondaryCTA } from "@/lib/site";

/**
 * The shared shell for a product page.
 *
 * FlashEDC and FlashAnalysis present the same way on purpose: the same
 * hero → workflow → capabilities → demonstration → closing CTA order, so the
 * two products read as two engines of one platform rather than two unrelated
 * offerings. Anything product-specific is passed in.
 */
export function ProductPage({
  product,
  heroTitle,
  heroAside,
  workflowLead,
  maturity,
  children,
}: {
  product: Product;
  heroTitle: string;
  /** Visual placed beside the hero copy. */
  heroAside: ReactNode;
  workflowLead: string;
  maturity: { title: string; body: string; note?: string };
  /** Additional product-specific sections, rendered after capabilities. */
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={`${product.name} · ${product.tagline}`}
        title={heroTitle}
        lead={product.description}
        actions={
          <HeroActions
            primary={{ label: primaryCTA.label, href: primaryCTA.href }}
            secondary={{ label: "See the workflow", href: "#workflow" }}
          />
        }
        aside={heroAside}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Workflow                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered id="workflow">
        <SectionHeading
          eyebrow="Workflow"
          title={`What ${product.name} does, in order.`}
          lead={workflowLead}
        />

        <Reveal className="mt-14">
          <WorkflowTimeline
            steps={product.workflow}
            label={`${product.name} workflow`}
          />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* Capabilities                                                        */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="light" bordered id="capabilities">
        <SectionHeading
          eyebrow="Capabilities"
          title="What it produces."
          lead={product.summary}
        />

        <ul className="mt-9 flex flex-wrap gap-2">
          {product.capabilities.map((capability) => (
            <li key={capability} className="flex flex-wrap items-center gap-1.5">
              <Badge tone="neutral">{capability}</Badge>
              {product.inDevelopmentCapabilities?.includes(capability) ? (
                <InDevelopmentBadge className="px-2.5 py-1" />
              ) : null}
            </li>
          ))}
        </ul>

        <BorderedGrid columns={3} className="mt-12">
          {product.detail.map((item) => (
            <BorderedGridCell key={item.title}>
              <h3 className="text-[0.9375rem] leading-snug font-semibold">{item.title}</h3>
              {item.inDevelopment ? <InDevelopmentBadge className="mt-2" /> : null}
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>
      </Section>

      {children}

      {/* ------------------------------------------------------------------ */}
      {/* Demonstration                                                       */}
      {/* ------------------------------------------------------------------ */}
      <DemoSection products={[product]} only={product.slug as "flashedc" | "flashanalysis"} />

      {/* ------------------------------------------------------------------ */}
      {/* Maturity                                                            */}
      {/* ------------------------------------------------------------------ */}
      <Section tone="surface" bordered>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionHeading eyebrow="Where it is today" title={maturity.title} />

          <div>
            <p className="text-base leading-relaxed text-body">{maturity.body}</p>
            {maturity.note ? (
              <p className="mt-5 text-sm leading-relaxed text-muted">{maturity.note}</p>
            ) : null}
          </div>
        </div>
      </Section>

      <CtaBand
        title={`See ${product.name} against your own protocol or dataset.`}
        body="Bring a study and we will walk through what the platform produces — and where a human still has to decide."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
      />
    </>
  );
}
