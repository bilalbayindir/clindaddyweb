/**
 * Site-wide configuration: identity, navigation, and contact routing.
 *
 * Anything an operator is expected to change before launch lives here rather
 * than being scattered through components. Values that must differ per
 * environment are read from `NEXT_PUBLIC_*` env vars — see `.env.example`.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const site = {
  name: "ClinDaddy",
  legalName: "ClinDaddy LLC",
  /** Used in metadata, JSON-LD, and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.clindaddy.com",
  title: "ClinDaddy | Clinical Data Automation from Protocol to Submission",
  description:
    "ClinDaddy automates clinical data workflows from protocol and EDC study design through data capture, analysis, QC, and regulatory submission.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@clindaddy.com",
  founderEmail: "bilal.bayindir@clindaddy.com",
  address: {
    street: "1028 W Airy St",
    city: "Norristown",
    state: "PA",
    postalCode: "19401",
    country: "US",
  },
  productNames: ["FlashEDC", "FlashAnalysis"] as const,
} as const;

export const siteAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`;

/** The one primary conversion action, reused across every page. */
export const primaryCTA = {
  label: "Request a demo",
  href: "/contact?interest=demo",
} as const;

export const secondaryCTA = {
  label: "Join the pilot program",
  href: "/pilot",
} as const;

export const navigation: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "FlashEDC", href: "/flashedc" },
  { label: "FlashAnalysis", href: "/flashanalysis" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Pilot Program", href: "/pilot" },
  { label: "Trust", href: "/trust" },
  { label: "About", href: "/about" },
];

export const footerNavigation: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "FlashEDC", href: "/flashedc" },
      { label: "FlashAnalysis", href: "/flashanalysis" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pilot program", href: "/pilot" },
      { label: "Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Trust & governance", href: "/trust" },
      { label: "Technology", href: "/technology" },
      { label: "Solutions", href: "/solutions" },
      { label: "Privacy policy", href: "/privacy" },
    ],
  },
];

/**
 * In-page jump targets shown on the trust page. Kept beside the navigation so
 * labels and section ids cannot drift apart.
 */
export const trustAnchors = [
  { label: "Regulatory", href: "#regulatory" },
  { label: "Deterministic execution", href: "#deterministic-execution" },
  { label: "Independent QC", href: "#independent-qc" },
  { label: "AI governance", href: "#ai-governance" },
] as const;

export const legalFooter =
  "ClinDaddy software supports, but does not replace, sponsor responsibility for regulatory submissions. Product names are trademarks of ClinDaddy LLC.";
