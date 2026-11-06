import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PipelineStage } from "@/components/landing/pipeline-stage";
import { PilotForm } from "@/components/landing/pilot-form";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { Container } from "@/components/ui/container";
import { products } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absolute: true,
});

const COMPARISON = [
  {
    task: "Database build",
    usually: "Specified and built by hand from the protocol",
    withUs: "Drafted from the protocol in 10–30 minutes, then reviewed by your data manager",
  },
  {
    task: "Edit checks",
    usually: "Written and tested one by one",
    withUs: "Generated from the specification, then approved",
  },
  {
    task: "SDTM and ADaM",
    usually: "Programmed and double-programmed per study",
    withUs: "Generated, with independent QC code you can rerun",
  },
  {
    task: "Submission files",
    usually: "Assembled at the end, under deadline",
    withUs: "Define-XML and reviewer guides produced with the datasets",
  },
];

const AUDIT = [
  { time: "11-04 14:02", by: "J. Rivera, DM", action: "Approved", rest: "form VS, version 3", tone: "ok" },
  { time: "11-04 13:57", by: "J. Rivera, DM", action: "", rest: "Edited edit check VS-004, reason: amendment 2", tone: "" },
  { time: "11-04 13:41", by: "ClinDaddy AI", action: "Proposed", rest: "edit check VS-004", tone: "signal" },
  { time: "11-04 13:40", by: "ClinDaddy AI", action: "Proposed", rest: "form VS from protocol §7.2", tone: "signal" },
];

const ROADMAP = [
  { status: "Available now", color: "text-[#0B6B4D]", item: "FlashEDC and FlashAnalysis" },
  { status: "2027, in development", color: "text-[#A3360A]", item: "RTSM / IRT" },
  { status: "Planned", color: "text-text-3", item: "eConsent, ePRO, eCOA, eSource" },
  { status: "Planned", color: "text-text-3", item: "CTMS, eTMF" },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section id="top">
        <Container>
          <div className="flex flex-wrap items-start gap-10 pb-12 pt-9 sm:pt-12 lg:gap-14 lg:pb-24 lg:pt-[72px]">
            <div className="flex min-w-0 flex-1 basis-[380px] flex-col gap-7 pt-0 lg:pt-2">
              <p className="flex items-center gap-3 text-[15px] text-text-2">
                <span aria-hidden className="h-0.5 w-7 shrink-0 bg-signal" />
                <span className="hidden sm:inline">For sponsors and CROs running Phase I–II studies</span>
                <span className="sm:hidden">For sponsors and CROs, Phase I–II</span>
              </p>

              <h1 className="text-[38px] leading-[1.08] tracking-[-0.02em] text-ink sm:text-[48px] lg:text-[60px] lg:leading-[1.04]">
                Your protocol already describes the study. We build everything that follows.
              </h1>

              <p className="text-base leading-[1.6] text-text-2 lg:text-[18px]">
                ClinDaddy turns a protocol into a CDISC study build, runs data collection in its own
                EDC, and delivers SDTM, ADaM and TLFs with independent QC. Your data managers review
                and sign off at every step.
              </p>

              <div className="border-y border-rule py-3 lg:hidden">
                <p className="text-[15px] font-semibold text-ink">
                  Review-ready study build draft in{" "}
                  <span className="whitespace-nowrap">10–30 minutes.*</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-3">
                  * Protocol upload to draft, on internal test protocols. Method on request.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="#pilot"
                  data-analytics="cta_demo_click"
                  data-analytics-label="Request a demo"
                  data-analytics-location="hero"
                  className="rounded-[4px] bg-ink-strong px-[22px] py-[15px] text-base font-medium text-white transition-colors hover:bg-ink-deep"
                >
                  Request a demo
                </Link>
                <Link
                  href="#products"
                  data-analytics="cta_how_it_works_click"
                  data-analytics-label="How it works"
                  className="text-base font-medium text-ink underline decoration-1 underline-offset-4 hover:text-brand"
                >
                  How it works
                </Link>
              </div>

              <div className="mt-2 hidden lg:block">
                <dl className="grid grid-cols-[96px_1fr] gap-x-4 gap-y-2.5 border-t border-rule pt-[18px] text-sm">
                  <dt className="text-text-3">Study build</dt>
                  <dd className="font-semibold text-ink">Review-ready draft in 10–30 minutes*</dd>
                  <dt className="text-text-3">Standards</dt>
                  <dd className="text-ink">CDASH, SDTM, ADaM, Define-XML</dd>
                  <dt className="text-text-3">Controls</dt>
                  <dd className="text-ink">Audit trail, versioned designs, human approval</dd>
                  <dt className="text-text-3">QC code</dt>
                  <dd className="text-ink">SAS, R and SQL, yours to rerun</dd>
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-text-3">
                  * Measured from protocol upload to a review-ready study build draft, on internal
                  test protocols. Method available on request.
                </p>
              </div>
            </div>

            <div className="w-[720px] max-w-full flex-none">
              <PipelineStage />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* What changes for your team                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-rule bg-white">
        <Container>
          <div className="flex flex-wrap gap-10 py-12 sm:py-16 lg:gap-14 lg:py-[104px]">
            <div className="flex min-w-0 flex-1 basis-[320px] flex-col gap-4">
              <h2 className="text-[30px] leading-[1.1] tracking-[-0.015em] lg:text-[42px]">
                What changes for your team
              </h2>
              <p className="max-w-[36ch] text-base leading-[1.6] text-text-2">
                The work still gets reviewed by the people accountable for it. They stop rebuilding
                it by hand.
              </p>
            </div>

            {/* Desktop table */}
            <div className="hidden min-w-0 flex-[2_1_640px] overflow-x-auto md:block">
              <table className="w-full border-collapse text-[15px] leading-normal">
                <thead>
                  <tr className="text-left text-[13px] text-text-3">
                    <th className="w-[26%] border-b border-ink pb-3 pr-4 font-medium">Task</th>
                    <th className="w-[34%] border-b border-ink pb-3 pr-4 font-medium">Usually</th>
                    <th className="w-[40%] border-b border-ink pb-3 font-medium">With ClinDaddy</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.task}>
                      <td className="border-b border-rule py-[18px] pr-4 font-medium text-ink">{row.task}</td>
                      <td className="border-b border-rule py-[18px] pr-4 text-text-2">{row.usually}</td>
                      <td className="border-b border-rule py-[18px] text-ink">{row.withUs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked list */}
            <div className="flex min-w-0 flex-1 basis-full flex-col border-t border-ink md:hidden">
              {COMPARISON.map((row) => (
                <div key={row.task} className="flex flex-col gap-1.5 border-b border-rule py-4">
                  <p className="text-[15px] font-medium text-ink">{row.task}</p>
                  <p className="text-[15px] leading-normal text-text-2">
                    {row.withUs}
                    {row.task === "Database build" ? "." : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Products                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="products" className="border-t border-rule">
        <Container>
          <div className="flex flex-col gap-10 py-12 sm:py-16 lg:gap-12 lg:py-[104px]">
            <h2 className="max-w-[22ch] text-[30px] leading-[1.1] tracking-[-0.015em] lg:text-[42px]">
              Two products on one data model. Start with either.
            </h2>

            <div className="flex flex-wrap border-t border-ink">
              <article className="flex min-w-0 flex-1 basis-[440px] flex-col gap-5 pb-2 pt-8 lg:pr-12">
                <div className="flex flex-wrap items-baseline gap-4">
                  <h3 className="text-[26px] font-medium text-ink lg:text-[32px]">FlashEDC</h3>
                  <span className="text-sm text-text-3">Study build and data collection</span>
                </div>
                <p className="max-w-[46ch] text-base leading-[1.6] text-text-2">
                  Reads the protocol, drafts the visits, CDASH forms, codelists and edit checks, and
                  runs the study in its own EDC once your team approves the design.
                </p>
                <dl className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-3 text-[15px]">
                  <dt className="text-text-3">You provide</dt>
                  <dd className="text-ink">Protocol (PDF)</dd>
                  <dt className="text-text-3">You receive</dt>
                  <dd className="text-ink">Review-ready study build, then a live EDC</dd>
                  <dt className="text-text-3">Changes</dt>
                  <dd className="text-ink">New design version on every change; nothing overwritten</dd>
                </dl>
                <Link
                  href="/contact?interest=demo"
                  data-analytics="product_demo_click"
                  data-analytics-label="FlashEDC"
                  className="text-[15px] font-medium text-ink underline decoration-1 underline-offset-4 hover:text-brand"
                >
                  Request a FlashEDC demo
                </Link>
              </article>

              <article className="flex min-w-0 flex-1 basis-[440px] flex-col gap-5 border-t border-rule pb-2 pt-8 lg:border-l lg:border-t-0 lg:pl-12">
                <div className="flex flex-wrap items-baseline gap-4">
                  <h3 className="text-[26px] font-medium text-ink lg:text-[32px]">FlashAnalysis</h3>
                  <span className="text-sm text-text-3">Standards and submission outputs</span>
                </div>
                <p className="max-w-[46ch] text-base leading-[1.6] text-text-2">
                  Takes raw data from FlashEDC or any other EDC and produces SDTM, ADaM, TLFs and the
                  files a reviewer expects, with full traceability.
                </p>
                <dl className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-3 text-[15px]">
                  <dt className="text-text-3">You provide</dt>
                  <dd className="text-ink">EDC export and, if you have them, your specs</dd>
                  <dt className="text-text-3">You receive</dt>
                  <dd className="text-ink">SDTM, ADaM, TLFs, Define-XML, aCRF, reviewer guides</dd>
                  <dt className="text-text-3">QC</dt>
                  <dd className="text-ink">Independent QC code in SAS, R and SQL</dd>
                </dl>
                <Link
                  href="/contact?interest=demo"
                  data-analytics="product_demo_click"
                  data-analytics-label="FlashAnalysis"
                  className="text-[15px] font-medium text-ink underline decoration-1 underline-offset-4 hover:text-brand"
                >
                  Request a FlashAnalysis demo
                </Link>
              </article>
            </div>

            <div className="mt-4 border-t border-rule pt-10">
              <IllustrationFigure
                src="/images/lifecycle-illustration.jpg"
                alt="Illustration of the clinical data lifecycle running from protocol through FlashEDC data collection and FlashAnalysis to submission."
                width={1408}
                height={768}
                sizes="(min-width: 1280px) 1240px, 100vw"
                caption="Illustration. The lifecycle both products cover: protocol, eCRFs and EDC at the front; SDTM, ADaM and TLFs at the back."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Review and audit trail                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="review" className="bg-ink-strong text-white">
        <Container>
          <div className="flex flex-wrap items-start gap-10 py-12 sm:py-16 lg:gap-14 lg:py-[104px]">
            <div className="flex min-w-0 flex-1 basis-[360px] flex-col gap-5">
              <h2 className="text-[30px] leading-[1.1] tracking-[-0.015em] text-white lg:text-[42px]">
                Nothing goes live until a person signs it off.
              </h2>
              <p className="max-w-[40ch] text-base leading-[1.6] text-navy-300">
                The AI proposes. Your data manager approves, edits or rejects, and every decision is
                recorded with who, when and why.
              </p>
              <Link
                href="/contact?interest=validation"
                data-analytics="cta_validation_click"
                data-analytics-label="Request validation documentation (NDA)"
                className="text-[15px] font-medium text-white underline decoration-1 underline-offset-4 hover:text-white/80"
              >
                Request validation documentation (NDA)
              </Link>
            </div>

            <div className="min-w-0 flex-1 basis-[560px] overflow-x-auto rounded-[6px] border border-[#2B4360] bg-ink-deep">
              <div className="flex justify-between border-b border-[#2B4360] px-[18px] py-3.5 text-[13px] text-navy-300">
                <span>Audit trail · Study SYN-014</span>
                <span>Example, synthetic data</span>
              </div>
              <table className="w-full border-collapse font-mono text-[13px] leading-normal text-[#E6EBF1]">
                <thead>
                  <tr className="text-left text-[#8FA0B5]">
                    <th className="px-[18px] py-3 font-normal">Time</th>
                    <th className="px-[18px] py-3 font-normal">By</th>
                    <th className="px-[18px] py-3 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {AUDIT.map((row, index) => (
                    <tr
                      key={`${row.time}-${row.action}-${row.rest}`}
                      className={`border-t border-[#22384F] ${index === 3 ? "hidden sm:table-row" : ""}`}
                    >
                      <td className="px-[18px] py-3 text-[#8FA0B5]">{row.time}</td>
                      <td className="px-[18px] py-3">{row.by}</td>
                      <td className="px-[18px] py-3">
                        {row.action ? (
                          <span style={{ color: row.tone === "ok" ? "#6CD0A6" : "#F4A27E" }}>{row.action}</span>
                        ) : null}
                        {row.action ? " " : ""}
                        {row.rest}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Roadmap                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section id="roadmap">
        <Container>
          <div className="flex flex-col gap-10 py-12 sm:py-16 lg:gap-10 lg:py-[104px]">
            <h2 className="text-[30px] leading-[1.1] tracking-[-0.015em] lg:text-[42px]">Roadmap</h2>
            <div className="grid gap-6 border-t border-ink pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {ROADMAP.map((item) => (
                <div key={item.item} className="flex flex-col gap-2">
                  <p className={`text-[13px] font-semibold ${item.color}`}>{item.status}</p>
                  <p className="text-[17px] text-ink">{item.item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Founder                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section id="founder" className="border-t border-rule bg-white">
        <Container>
          <div className="flex flex-wrap items-center gap-10 py-12 sm:py-16 lg:gap-14 lg:py-[104px]">
            <Image
              src="/images/clindaddy-mark.png"
              alt="ClinDaddy mascot"
              width={259}
              height={447}
              className="h-auto w-[100px] flex-none object-contain sm:w-[140px]"
            />
            <div className="flex min-w-0 flex-1 basis-[560px] flex-col gap-6">
              <blockquote className="max-w-[40ch] font-display text-[22px] leading-[1.4] text-ink sm:text-[30px] sm:leading-[1.35]">
                “I’ve spent more than thirteen years building EDC software. Every study started the
                same way: someone reading the protocol and rebuilding it by hand. ClinDaddy removes
                the rebuild, not the people who check it.”
              </blockquote>
              <p className="text-[15px] text-text-2">
                <span className="font-semibold text-ink">Bilal Bayindir</span>, Founder and CEO
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Pilot                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section id="pilot" className="border-t border-rule">
        <Container>
          <div className="flex flex-wrap items-start gap-10 py-12 sm:py-16 lg:gap-14 lg:py-[104px]">
            <div className="flex min-w-0 flex-1 basis-[380px] flex-col gap-5">
              <h2 className="text-[34px] leading-[1.06] tracking-[-0.02em] lg:text-[48px]">
                Start with one study.
              </h2>
              <p className="max-w-[42ch] text-[17px] leading-[1.6] text-text-2">
                Send a protocol or a dataset. We deliver one study build or one SDTM package at a
                fixed pilot price, with a written path to a per-study contract.
              </p>
              <p className="text-[15px] text-text-2">
                Or write to{" "}
                <a href={`mailto:${site.contactEmail}`} className="underline decoration-1 underline-offset-4">
                  {site.contactEmail}
                </a>
              </p>
            </div>
            <div className="min-w-0 flex-1 basis-[480px]">
              <PilotForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Structured data — facts only. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            description: site.description,
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
