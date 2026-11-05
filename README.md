# Clindaddy — website

Marketing, product, and investor site for **Clindaddy**, a clinical data
automation company. Two products are presented on one platform:

| Product | Span |
| --- | --- |
| **FlashEDC** | Protocol → EDC study design & data capture |
| **FlashAnalysis** | Clinical data → standards → analysis → QC → submission |

The governing specification is [`PRD.md`](./PRD.md). Where this README and the
PRD disagree, the PRD wins.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run assets       # regenerate brand assets from ./pics (needs Python + Pillow)
```

Copy `.env.example` to `.env.local` before deploying — see
[Environment](#environment).

---

## Stack

- **Next.js 15** (App Router) with **React 19**
- **TypeScript**, strict mode
- **Tailwind CSS v4** — CSS-first configuration, no `tailwind.config.js`
- **Motion** (Framer Motion) for section reveals
- **lucide-react** for icons
- **@vercel/analytics** for event tracking

---

## Structure

```text
app/
  layout.tsx            Root layout: fonts, navigation, footer, analytics
  page.tsx              Home
  platform/             Platform overview
  flashedc/             FlashEDC product page
  flashanalysis/        FlashAnalysis product page
  technology/           How the system works
  trust/                Governance model
  solutions/            CROs and pharma/biotech
  investors/            Investment thesis
  about/                Company
  contact/              Contact form
  api/contact/          Contact form endpoint
  sitemap.ts robots.ts not-found.tsx
components/
  ui/                   Button, Badge, Card, Container, Section
  layout/               Navbar, Footer
  sections/             Page-level blocks (heroes, CTA band, demo, forms)
  diagrams/             Lifecycle rail, QC diagram, lineage, workflow, panels
  motion/               Reveal / Stagger wrappers
  brand/                Logo lockup
lib/
  site.ts               Identity, navigation, CTAs
  content.ts            All site copy as structured data
  contact.ts            Server-only contact delivery
  contact-shared.ts     Form contract shared by browser and server
  analytics.ts          Tracked event names
scripts/
  prepare-assets.py     Brand asset pipeline
pics/                   Source artwork (input to the pipeline)
public/images/          Generated assets (output of the pipeline)
```

---

## Design system

Defined once in `app/globals.css` using Tailwind v4's `@theme` block:

- **Teal** — the product accent (`--color-teal-*`)
- **Navy** — structure, dark surfaces, primary buttons (`--color-navy-*`)
- **Semantic inks** — `ink`, `body`, `muted`, plus `line` / `surface` neutrals
- **Faces** — Instrument Sans (display), Inter (body), IBM Plex Mono (data)

Component classes come from `@utility` definitions in the same file
(`eyebrow`, `bg-grid`, `mask-fade-edges`, …). Change a token there and it
propagates everywhere.

---

## Brand assets

`pics/` holds the source artwork. `scripts/prepare-assets.py` cuts the logo off
its backdrop, splits it into mark / wordmark / tagline variants (including
white-on-dark versions), generates the favicons and the 1200×630 social card,
and resizes the editorial illustrations into `public/images/`.

```bash
npm run assets       # requires: python -m pip install pillow numpy
```

The script is deterministic — re-running it reproduces the same files, so the
generated assets can be committed rather than built in CI.

---

## Environment

Only `NEXT_PUBLIC_*` variables reach the browser. Never prefix a credential.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and the sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Published contact address (placeholder until set) |
| `CONTACT_WEBHOOK_URL` | Forward contact submissions as JSON |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Send contact submissions by email |

Configure **one** contact provider. With none configured, `/api/contact`
returns `configured: false` and the form tells the visitor plainly that nothing
was sent and offers the email address instead — it never reports a false
success.

---

## Content and claims

All copy lives in `lib/content.ts`. Two rules apply to every change:

1. **No fabrication.** Do not invent customers, partnerships, investors,
   funding, revenue, market statistics, certifications, regulatory status, or
   accuracy figures. Where information has not been supplied, the UI shows an
   explicit placeholder — see `teamPlaceholder`.
2. **No mature-SaaS language.** The products are *working technology with a
   clear path toward productization*. Internal engineering metrics (such as the
   FlashAnalysis test count) are presented as engineering metrics, never as
   evidence of commercial traction.

Brand rules: the company is **Clindaddy**; the products are **FlashEDC** and
**FlashAnalysis**. No other company or product names are used anywhere on the
site. AI is presented as enabling technology, never as the product's identity.

Demo interfaces and the lineage example use synthetic values and are labelled
as illustrative. No patient data, confidential study data, credentials, or
internal URLs appear anywhere in this repository.
