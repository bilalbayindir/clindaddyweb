import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { legalFooter, site, siteAddress } from "@/lib/site";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "FlashEDC", href: "/flashedc" },
      { label: "FlashAnalysis", href: "/flashanalysis" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Trust and governance", href: "/trust" },
      { label: "Investors", href: "/investors" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: site.contactEmail, href: `mailto:${site.contactEmail}` },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-white">
      <Container>
        <div className="flex flex-wrap justify-between gap-10 py-12">
          <div className="flex flex-col gap-2.5">
            <Image
              src="/images/clindaddy-wordmark.png"
              alt="ClinDaddy"
              width={740}
              height={155}
              className="h-6 w-[112px] object-contain object-left"
            />
            <p className="text-sm text-text-2">{siteAddress}</p>
            <p className="text-sm text-text-2">© 2026 {site.legalName}</p>
          </div>

          <div className="flex flex-wrap gap-14">
            {COLUMNS.map((column) => (
              <div key={column.heading} className="flex min-w-[9rem] flex-col gap-2.5 text-sm">
                <p className="font-semibold text-ink">{column.heading}</p>
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-text-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="border-t border-rule py-6 text-xs leading-relaxed text-text-3">
          {legalFooter}
        </p>
      </Container>
    </footer>
  );
}
