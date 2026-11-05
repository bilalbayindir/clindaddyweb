import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/metadata";
import { site, siteAddress } from "@/lib/site";

const description =
  "How ClinDaddy LLC handles information submitted through clindaddy.com, including the contact form, analytics and email.";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description,
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "Who we are",
    body: `${site.legalName}, ${siteAddress}. You can reach us at ${site.contactEmail}.`,
  },
  {
    title: "What we collect",
    body: "When you submit the contact form we collect the name, company, role, email address, interest and message you provide. We also receive standard server logs and aggregate page analytics. We do not ask for patient data, confidential study data or any other sensitive material through this site.",
  },
  {
    title: "How we use it",
    body: "We use your details only to reply to your inquiry and to route it to the right person. We do not add you to a mailing list, sell your details, or use them for advertising.",
  },
  {
    title: "Analytics",
    body: "The site uses Vercel Analytics to understand aggregate page usage. It does not set advertising cookies or track you across other sites.",
  },
  {
    title: "Sharing",
    body: "We share information only with service providers that host the site or deliver email on our behalf, and only to the extent needed to operate the site. We do not sell personal information.",
  },
  {
    title: "Retention",
    body: "Inquiry emails are kept for as long as needed to handle the conversation and any resulting engagement, then deleted or archived under our normal business records policy.",
  },
  {
    title: "Your choices",
    body: `You can ask us to access, correct or delete the information you sent us by writing to ${site.contactEmail}.`,
  },
  {
    title: "Changes",
    body: "If this policy changes, the updated version will be posted on this page with a new effective date.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy."
        lead="A short policy for a site that collects very little: the information you choose to send us, and aggregate analytics."
      />

      <Container className="max-w-3xl py-16 sm:py-20">
        <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
          Effective November 2026
        </p>

        <div className="mt-10 flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-body">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          This page describes the website only. Data handled during a clinical engagement is
          governed by the applicable agreement, not by this policy.
        </p>
      </Container>
    </>
  );
}
