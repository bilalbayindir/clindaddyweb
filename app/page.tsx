import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FlashAnalysisPanel, FlashEdcPanel } from "@/components/diagrams/product-panels";
import { CtaBand } from "@/components/sections/cta-band";
import { HomeHero } from "@/components/sections/home-hero";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { ProductCard } from "@/components/sections/product-card";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import {
  differentiators,
  evidence,
  flashanalysis,
  flashedc,
  maturityStatement,
  problemPoints,
  products,
  solutions,
  trustPillars,
} from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  // The homepage title is already the full brand line; the `%s | ClinDaddy`
  // template would append the company name a second time.
  absolute: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* ---------------------------------------------------------------- */}
      {/* The problem                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="surface" bordered>
        <SectionHeading
          eyebrow="The problem"
          title="Clinical trials still depend on enormous amounts of manual data work."
          lead="Between an approved protocol and a submission sits a large body of translation work. It is high-volume, high-consequence, and repeated for every study."
        />

        <BorderedGrid columns={3} className="mt-14">
          {problemPoints.map((point) => (
            <BorderedGridCell key={point.title}>
              <h3 className="text-[0.9375rem] leading-snug font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </BorderedGridCell>
          ))}
        </BorderedGrid>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          We make no claims here about market size or the cost of that work. The description above
          is what the process involves — the same steps, performed by hand, at every sponsor and
          every CRO.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Platform                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light" bordered id="platform">
        <SectionHeading
          eyebrow="The platform"
          title="One platform. Two engines. One clinical data lifecycle."
          lead="FlashEDC covers the front of the lifecycle — protocol to an EDC study build in 10 to 30 minutes, including edit-check specifications and programming code, against roughly ten weeks by hand — and the data capture built on that design. FlashAnalysis covers everything downstream: clinical data through standards, analysis, QC, and submission."
        />

        <Reveal className="mt-14">
          <IllustrationFigure
            src="/images/lifecycle-illustration.jpg"
            alt="Illustration of the clinical data lifecycle running from protocol through FlashEDC, data collection, and FlashAnalysis to submission."
            width={1408}
            height={768}
            sizes="(min-width: 1280px) 1216px, 100vw"
            priority
            caption="Illustration. The full lifecycle the two engines cover: protocol to EDC study design and data capture at the front, data through standards, analysis, QC, and submission at the back."
          />
        </Reveal>

        <div className="mt-8 flex flex-col gap-6">
          <Reveal>
            <ProductCard product={flashedc}>
              <FlashEdcPanel />
            </ProductCard>
          </Reveal>

          <Reveal>
            <ProductCard product={flashanalysis}>
              <FlashAnalysisPanel />
            </ProductCard>
          </Reveal>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Interfaces shown are illustrative and built with synthetic values. They are not
          customer systems, and no study data is reproduced anywhere on this site.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Trust, condensed                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" bordered id="trust">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Trust & governance"
              title="AI assists. Deterministic systems execute. Humans approve."
              lead="ClinDaddy is not uncontrolled autonomous AI. Interpretation is separated from execution, production is separated from QC, and approval is an explicit human act."
            />

            <Link
              href="/trust"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200"
              data-analytics="nav_click"
              data-analytics-label="Trust & governance"
            >
              See how the controls work
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {trustPillars.map((pillar) => (
              <li key={pillar.id} className="flex gap-6 py-6">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-300">
                  {pillar.index}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white">{pillar.eyebrow}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-300">{pillar.points[0]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Differentiation                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light" bordered>
        <SectionHeading
          eyebrow="Why ClinDaddy"
          title="Trustworthy clinical-data automation — not an AI wrapper."
          lead="The difference is not that the model is smarter. It is that the model is not the thing producing the clinical numbers."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="border-t border-line pt-6">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Evidence and maturity                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="surface" bordered>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="Where the technology is today"
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

        {/* Audiences */}
        <div className="mt-16 border-t border-line pt-10">
          <Eyebrow>Who we build for</Eyebrow>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/solutions#${solution.id}`}
                className="group rounded-xl border border-line bg-white p-6 transition-colors hover:border-navy-300"
                data-analytics="nav_click"
                data-analytics-label={solution.audience}
              >
                <p className="text-base font-semibold text-ink">{solution.audience}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{solution.headline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}

            <Link
              href="/investors"
              className="group rounded-xl border border-line bg-white p-6 transition-colors hover:border-navy-300"
              data-analytics="cta_investor_click"
              data-analytics-label="Investors"
            >
              <p className="text-base font-semibold text-ink">Investors</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Building the clinical data automation layer.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700">
                Read the thesis
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Start a conversation about your clinical data workflow."
        body="Tell us where the manual effort sits in your studies. We will show you what the platform does today and what it does not."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: "Talk to ClinDaddy", href: "/contact" }}
      />

      {/* Structured data for search engines — facts only, no claims. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ClinDaddy",
            description:
              "Clinical data automation company spanning the clinical-trial data lifecycle from protocol to regulatory submission.",
            url: site.url,
            brand: products.map((product) => ({
              "@type": "Brand",
              name: product.name,
              slogan: product.tagline,
            })),
          }),
        }}
      />
    </>
  );
}
