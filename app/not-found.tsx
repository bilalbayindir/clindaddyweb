import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { navigation, primaryCTA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for is not here.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade-edges opacity-70" />

      <Container className="relative">
        <div className="max-w-2xl py-24 sm:py-32">
          <Eyebrow>Error 404</Eyebrow>

          <h1 className="mt-6 text-[2rem] leading-[1.1] font-semibold sm:text-[2.75rem]">
            This page does not exist.
          </h1>

          <p className="mt-6 text-base leading-relaxed text-body sm:text-lg">
            The link may be out of date, or the page may have moved. Everything on the site is
            reachable from the navigation above.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Back to the homepage
            </Button>
            <Button href={primaryCTA.href} size="lg" variant="secondary" analytics="cta_demo_click">
              {primaryCTA.label}
            </Button>
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <p className="text-[13px] text-text-3">
              Main sections
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-teal-700"
                  >
                    {item.label}
                    <ArrowRight className="size-3.5 text-muted" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

