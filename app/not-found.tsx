import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { primaryCTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for is not here.",
  robots: { index: false, follow: true },
};

const LINKS = [
  { label: "FlashEDC", href: "/flashedc" },
  { label: "FlashAnalysis", href: "/flashanalysis" },
  { label: "Compliance", href: "/trust" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Company", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="border-b border-rule bg-paper">
      <Container>
        <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-2xl">
            <Eyebrow>Error 404</Eyebrow>

            <h1 className="mt-6 text-[38px] leading-[1.08] tracking-[-0.02em] sm:text-[48px] lg:text-[60px] lg:leading-[1.04]">
              This page does not exist.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-[1.6] text-text-2 lg:text-[18px]">
              The link may be out of date, or the page may have moved. Everything on the site is
              reachable from the navigation below.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/" size="lg">
                Back to the homepage
              </Button>
              <Button href={primaryCTA.href} size="lg" variant="secondary" analytics="cta_demo_click">
                {primaryCTA.label}
              </Button>
            </div>

            <div className="mt-14 border-t border-rule pt-6">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-brand"
                    >
                      {item.label}
                      <ArrowRight className="size-3.5 text-text-3" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Image
            src="/images/clindaddy-logo.png"
            alt="ClinDaddy"
            width={1042}
            height={447}
            priority
            className="mx-auto h-auto w-full max-w-[520px] object-contain"
          />
        </div>
      </Container>
    </section>
  );
}
