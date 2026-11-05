"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navigation, primaryCTA, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // A subtle elevation change once the page has moved, so the header separates
  // from the hero without being heavy at rest.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Escape closes the open menu; a click outside the nav does too.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "shadow-nav" : "border-b border-line",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 lg:h-18">
            <Link
              href="/"
              aria-label="ClinDaddy — home"
              className="shrink-0 rounded-md"
              data-analytics="nav_click"
              data-analytics-label="Home"
            >
              <Logo priority />
            </Link>

            {/* Desktop navigation */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {navigation.map((item) =>
                  item.children ? (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenMenu(item.label)}
                      onMouseLeave={() => setOpenMenu((current) => (current === item.label ? null : current))}
                    >
                      <DropdownTrigger
                        item={item}
                        panelId={panelId(item.label)}
                        open={openMenu === item.label}
                        active={isActive(item.href)}
                        onToggle={() => setOpenMenu((current) => (current === item.label ? null : item.label))}
                      />
                      <DropdownPanel
                        item={item}
                        id={panelId(item.label)}
                        open={openMenu === item.label}
                      />
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        data-analytics="nav_click"
                        data-analytics-label={item.label}
                        className={cn(
                          "inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors",
                          isActive(item.href)
                            ? "text-teal-700"
                            : "text-body hover:bg-surface hover:text-ink",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                href={primaryCTA.href}
                size="sm"
                className="hidden sm:inline-flex"
                analytics="cta_demo_click"
                data-analytics-label="Request a Demo"
                data-analytics-location="navbar"
              >
                {primaryCTA.label}
              </Button>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/*
        Deliberately a sibling of <header>, never a child of it. The header
        carries `backdrop-blur-md`, and a `backdrop-filter` other than `none`
        makes an element the containing block for its `position: fixed`
        descendants. Nested inside, this panel's `top-16 bottom-0` resolved
        against the header's own 64px box rather than the viewport, so both
        edges landed on the same line and it collapsed to zero height — the
        burger flipped to an X and no menu appeared. Moving it out here is the
        fix; putting it back inside reintroduces the bug.
      */}
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/* -------------------------------------------------------------------------- */

/** Stable id linking a dropdown trigger to the panel it controls. */
function panelId(label: string) {
  return `nav-panel-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

function DropdownTrigger({
  item,
  panelId,
  open,
  active,
  onToggle,
}: {
  item: NavItem;
  panelId: string;
  open: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      className={cn(
        "inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-sm font-medium transition-colors",
        active || open ? "text-teal-700" : "text-body hover:bg-surface hover:text-ink",
      )}
    >
      {item.label}
      <ChevronDown
        aria-hidden
        className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
      />
    </button>
  );
}

function DropdownPanel({ item, id, open }: { item: NavItem; id: string; open: boolean }) {
  if (!item.children) return null;

  return (
    <div
      id={id}
      className={cn(
        "absolute top-full left-0 z-50 w-[19rem] pt-2 transition-all duration-200",
        open ? "visible opacity-100" : "invisible -translate-y-1 opacity-0",
      )}
    >
      <ul className="overflow-hidden rounded-xl border border-line bg-white p-2 shadow-raised">
        {item.children.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              data-analytics="nav_click"
              data-analytics-label={`${item.label} — ${child.label}`}
              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
            >
              <span className="block text-sm font-medium text-ink">{child.label}</span>
              {child.description ? (
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">{child.description}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-navigation"
      hidden={!open}
      className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
    >
      <Container className="py-6">
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.label} className="border-b border-line py-1">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center text-base font-medium text-ink"
                >
                  {item.label}
                </Link>

                {item.children ? (
                  <ul className="mb-2 flex flex-col gap-0.5 pl-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="flex min-h-10 items-center text-sm text-muted"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <Button
          href={primaryCTA.href}
          size="lg"
          className="mt-6 w-full"
          analytics="cta_demo_click"
          data-analytics-label="Request a Demo"
          data-analytics-location="mobile-nav"
        >
          {primaryCTA.label}
        </Button>
      </Container>
    </div>
  );
}
