"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "FlashEDC", href: "/flashedc" },
  { label: "FlashAnalysis", href: "/flashanalysis" },
  { label: "Compliance", href: "/trust" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Company", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-rule bg-paper">
        <Container>
          <div className="flex h-[4.5rem] items-center justify-between gap-6">
            <Link
              href="/"
              aria-label="ClinDaddy — home"
              className="flex shrink-0 items-center gap-2.5 rounded-[2px]"
              data-analytics="nav_click"
              data-analytics-label="Home"
            >
              <Image
                src="/images/clindaddy-mark.png"
                alt=""
                aria-hidden
                width={259}
                height={447}
                priority
                className="h-[38px] w-[22px] object-contain"
              />
              <Image
                src="/images/clindaddy-wordmark.png"
                alt="ClinDaddy"
                width={740}
                height={155}
                priority
                className="h-[26px] w-[124px] object-contain object-left"
              />
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  data-analytics="nav_click"
                  data-analytics-label={link.label}
                  className={cn(
                    "text-[15px] transition-colors hover:text-brand",
                    pathname === link.href ? "text-ink-strong" : "text-ink",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#pilot"
                data-analytics="cta_demo_click"
                data-analytics-label="Request a demo"
                data-analytics-location="navbar"
                className="rounded-[4px] bg-ink-strong px-[18px] py-[11px] text-[15px] font-medium text-white transition-colors hover:bg-ink-deep"
              >
                Request a demo
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center rounded-[4px] border border-input-border bg-white lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
      </header>

      <div
        id="mobile-navigation"
        hidden={!mobileOpen}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-rule bg-paper lg:hidden"
      >
        <Container className="py-8">
          <nav aria-label="Mobile">
            <ul className="flex flex-col divide-y divide-rule border-y border-rule">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-12 items-center text-[17px] text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/#pilot"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex min-h-12 w-full items-center justify-center rounded-[4px] bg-ink-strong px-5 text-[15px] font-medium text-white"
          >
            Request a demo
          </Link>
        </Container>
      </div>
    </>
  );
}
