import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { footerNavigation, primaryCTA, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-navy-200">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo variant="inverse" />
            <p className="mt-6 text-sm leading-relaxed text-navy-300">
              Clinical data automation from protocol to regulatory submission.
            </p>
            <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-teal-300 uppercase">
              AI assists. Deterministic systems execute.
              <br />
              Humans approve. Everything is traceable.
            </p>
            <Button
              href={primaryCTA.href}
              variant="onDark"
              size="sm"
              className="mt-7"
              analytics="cta_demo_click"
              data-analytics-label="Request a Demo"
              data-analytics-location="footer"
            >
              {primaryCTA.label}
            </Button>
          </div>

          {/* Link columns */}
          {footerNavigation.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-mono text-[0.6875rem] tracking-[0.14em] text-navy-400 uppercase">
                {group.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-200 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-navy-400">
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-navy-400">
              Working technology with a clear path toward productization. Nothing on this site
              represents regulatory approval, a production deployment, or commercial traction.
            </p>
          </div>

          <a
            href={`mailto:${site.contactEmail}`}
            className="inline-flex items-center gap-1.5 text-sm text-navy-200 transition-colors hover:text-white"
            data-analytics="outbound_email_click"
            data-analytics-label="Footer email"
          >
            {site.contactEmail}
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>
      </Container>
    </footer>
  );
}
