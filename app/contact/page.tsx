import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { IllustrationFigure } from "@/components/sections/illustration-figure";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";
import { site, siteAddress } from "@/lib/site";

const description =
  "Talk to ClinDaddy about a product demo, a pilot, partnership, or investment. Tell us about the studies you run and the systems you use.";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

const EXPECTATIONS = [
  {
    title: "A reply, not a sequence",
    body: "Your message reaches a person. There is no drip campaign behind this form and no list you get added to.",
  },
  {
    title: "A working session, not a slide deck",
    body: "For product conversations we would rather look at a protocol or a dataset you already know than walk through slides.",
  },
  {
    title: "Straight answers about scope",
    body: "Where the platform does not do something yet, we will say so in the first conversation rather than the third.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a Conversation."
        lead="Tell us what you are working on. Whether it is a study you want to build faster, a dataset you want traced, or the company itself, this reaches a person who can answer."
        aside={
          <IllustrationFigure
            src="/images/contact-illustration.jpg"
            alt="Illustration of the ClinDaddy character sitting at a tidy desk mid-conversation, gesturing warmly toward the viewer, with a glowing panel beside him reading REQUEST A DEMO."
            width={1379}
            height={752}
            sizes="(min-width: 1024px) 34rem, 100vw"
            priority
            caption="Illustration. A person on the other end, not a support queue."
          />
        }
      />

      <section className="bg-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
            {/* Form */}
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">Send us a message.</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Fields marked <span className="text-danger">*</span> are required.
              </p>

              <div className="mt-9">
                <ContactForm fallbackEmail={site.contactEmail} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-8 lg:border-l lg:border-line lg:pl-16">
              <div>
                <Eyebrow>Email directly</Eyebrow>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="mt-4 inline-flex items-center gap-2.5 text-base font-medium text-teal-700 transition-colors hover:text-teal-800"
                  data-analytics="outbound_email_click"
                  data-analytics-label="contact-sidebar"
                >
                  <Mail className="size-4" aria-hidden />
                  {site.contactEmail}
                </a>
                <a
                  href={`mailto:${site.founderEmail}`}
                  className="mt-3 flex items-center gap-2.5 text-sm text-body transition-colors hover:text-ink"
                  data-analytics="outbound_email_click"
                  data-analytics-label="founder email"
                >
                  <Mail className="size-4" aria-hidden />
                  {site.founderEmail}
                </a>
              </div>

              <div className="border-t border-line pt-8">
                <Eyebrow>Address</Eyebrow>
                <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-body">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {siteAddress}
                </p>
              </div>

              <div className="border-t border-line pt-8">
                <Eyebrow>What to expect</Eyebrow>
                <ul className="mt-6 flex flex-col gap-6">
                  {EXPECTATIONS.map((item) => (
                    <li key={item.title}>
                      <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-line bg-surface p-5">
                <p className="text-xs leading-relaxed text-muted">
                  Please do not send patient data, confidential study data, or any other sensitive
                  material through this form. If a conversation needs it, we will set up an
                  appropriate channel first.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
