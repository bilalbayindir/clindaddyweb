import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FlashAnalysisPanel, FlashEdcPanel } from "@/components/diagrams/product-panels";
import { CtaBand } from "@/components/sections/cta-band";
import { HomeHero } from "@/components/sections/home-hero";
import { ProductCard } from "@/components/sections/product-card";
import { BorderedGrid, BorderedGridCell } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import {
  evidence,
  flashanalysis,
  flashedc,
  problemPoints,
  products,
  roadmapStages,
  team,
  whyNow,
} from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { primaryCTA, secondaryCTA, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
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
          title="Clinical data work is still assembled by hand, study after study."
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
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Two products, one pipeline                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light" bordered id="platform">
        <SectionHeading
          eyebrow="Two products, one pipeline"
          title="Build the study. Then carry the data to submission."
          lead="FlashEDC covers protocol to eCRFs to EDC data collection. FlashAnalysis covers clinical data through SDTM, ADaM and TLFs, with independent QC and the submission artifacts behind them. One study identity runs through both."
        />

        <div className="mt-14 flex flex-col gap-6">
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
          Interfaces shown are illustrative and built with synthetic values. They are not customer
          systems, and no study data is reproduced anywhere on this site.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why now                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" bordered>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Why now"
              title="The standards are mandatory. The models can finally read the protocol."
              lead="Three changes make this the right moment to automate the clinical data lifecycle."
            />
            <Link
              href="/technology"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200"
              data-analytics="nav_click"
              data-analytics-label="Technology"
            >
              See how the platform works
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {whyNow.map((point, index) => (
              <li key={point.title} className="flex gap-6 py-6">
                <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-teal-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-300">{point.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Roadmap teaser                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light" bordered>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Roadmap"
            title="Two products today. More of the trial next."
            lead="Every module reuses the protocol-derived data model, so new systems integrate on day one. Statuses are literal."
          />
          <Link
            href="/roadmap"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
            data-analytics="nav_click"
            data-analytics-label="Roadmap"
          >
            See the full roadmap
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roadmapStages.slice(0, 4).map((stage) => (
            <Link
              key={stage.id}
              href={`/roadmap#${stage.id}`}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-navy-300"
              data-analytics="nav_click"
              data-analytics-label={`Roadmap — ${stage.stage}`}
            >
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
                {stage.stage} · {stage.timeline}
              </span>
              <span className="mt-4 text-base font-semibold text-ink">
                {stage.items.map((item) => item.name).join(" · ")}
              </span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700">
                {stage.statusLabel}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Pilot band                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="surface" bordered>
        <div className="grid gap-10 rounded-2xl border border-navy-200 bg-navy-50/60 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>Pilot program</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold sm:text-4xl">
              Now accepting pilot sponsors.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
              One real deliverable — an SDTM/ADaM/TLF package from your current EDC data, or one
              FlashEDC study build — at discounted pilot pricing, with a written path to a
              full-price per-study contract.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href="/pilot"
              className="inline-flex h-12 items-center justify-center rounded-full bg-navy-900 px-7 text-sm font-medium text-white transition-colors hover:bg-navy-800"
              data-analytics="cta_pilot_click"
              data-analytics-label="Join the pilot program"
            >
              {secondaryCTA.label}
            </Link>
            <Link
              href={primaryCTA.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-navy-300 px-7 text-sm font-medium text-navy-800 transition-colors hover:bg-white"
              data-analytics="cta_demo_click"
              data-analytics-label={primaryCTA.label}
            >
              {primaryCTA.label}
            </Link>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Evidence + founder                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="light" bordered>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Where the technology is today"
              title="Finished products, demo-ready now."
              lead="FlashEDC and FlashAnalysis are working products. ClinDaddy is early as a company, and we say so."
            />

            <dl className="mt-10 flex flex-col divide-y divide-line border-y border-line">
              {evidence.map((item) => (
                <div key={item.label} className="py-5">
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
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-line bg-white p-7 sm:p-9">
            <Eyebrow>Built by a clinical data insider</Eyebrow>
            <p className="mt-5 text-[1.375rem] leading-snug font-semibold sm:text-2xl">
              13+ years building EDC software.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-body">
              {team.members[0].bio}
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800"
              data-analytics="nav_click"
              data-analytics-label="About"
            >
              More about ClinDaddy
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand
        title="See the platform against a study you already know."
        body="Bring a protocol or a dataset and we will walk through what the platform produces today, and where a person still has to decide."
        primary={{ label: primaryCTA.label, href: primaryCTA.href }}
        secondary={{ label: secondaryCTA.label, href: secondaryCTA.href, analytics: "cta_pilot_click" }}
      />

      {/* Structured data for search engines — facts only. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            description:
              "Clinical data automation company spanning the clinical-trial data lifecycle from protocol to regulatory submission.",
            url: site.url,
            email: site.contactEmail,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.street,
              addressLocality: site.address.city,
              addressRegion: site.address.state,
              postalCode: site.address.postalCode,
              addressCountry: site.address.country,
            },
            brand: products.map((product) => ({
              "@type": "Brand",
              name: product.name,
              slogan: product.tagline,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            products.map((product) => ({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: product.name,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description: product.summary,
              url: `${site.url}${product.href}`,
              publisher: { "@type": "Organization", name: site.legalName },
            })),
          ),
        }}
      />
    </>
  );
}
