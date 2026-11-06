# PRD: clindaddy.com landing page redesign

**Owner:** Bilal Bayindir, Founder & CEO
**Executor:** Claude Code
**Date:** November 2026
**Reference files (attached):**
- `landing-reference-desktop.html`: the approved desktop mockup, including the exact animation markup and keyframes
- `landing-reference-mobile.html`: the approved mobile mockup

---

## 1. Goal

Replace the current home page with the approved redesign. The current site reads as AI-generated: monospace eyebrow labels on every section, centred hero, pill buttons, four-box feature grids, and self-deprecating copy. The new direction is editorial and clinical: a serif headline face, a technical sans, thin rules, real tables and one purposeful animation.

**Success means:**
- The home page matches the reference mockups at desktop (1440px) and mobile (390px) widths.
- The design tokens (Section 4) are applied site-wide, so the other pages look consistent with the home page.
- The hero animation plays smoothly and respects reduced-motion settings.
- Lighthouse scores on Home are 90+ for Performance, Accessibility, Best Practices and SEO.

---

## 2. Instructions for the coding agent

1. **Inspect the repo** (Next.js on the current site). Build the page as React components in the existing app; do not paste the reference HTML in as-is. The reference files define the exact visuals, copy and timing.
2. **Do all git work yourself:**
   - Branch `landing-redesign`.
   - Logical commits.
   - Push and open a PR with desktop and mobile screenshots, plus a short screen recording or GIF of the animation.
   - Merge and deploy after Bilal approves.
   - Never hand Bilal git chores.
3. **Asset paths:** the reference files point images to `/images/clindaddy-mark.png` and `/images/clindaddy-wordmark.png`. Both already exist on the site.
4. **Fix while you're there:** `clindaddy-mark-inverse.png` and `clindaddy-wordmark-inverse.png` are broken. The inverse mark is identical to the normal one, and the inverse wordmark renders as 0×0, which leaves the dark footer with no logo. The new footer is light and uses the normal wordmark, so remove the inverse references, or regenerate correct white versions if any page still needs them.
5. **Stop and ask** only if something in this PRD conflicts with the codebase, or if a claim in Section 10 is unconfirmed.

---

## 3. Page structure (in order)

| # | Section | Anchor | Background |
|---|---|---|---|
| 1 | Header / nav | — | `paper` with a bottom rule |
| 2 | Hero: text, plus the animated stage on the right | `#top` | `paper` |
| 3 | What changes for your team (comparison table) | — | `surface` |
| 4 | Two products (spec sheets) | `#products` | `paper` |
| 5 | Review & audit trail | `#review` | `ink` (dark) |
| 6 | Roadmap | `#roadmap` | `paper` |
| 7 | Founder quote | `#founder` | `surface` |
| 8 | Pilot request form | `#pilot` | `paper` |
| 9 | Footer | — | `surface` with a top rule |

Every section is separated by a 1px `rule` line. Do not add section eyebrow labels. Do not wrap content in rounded cards, except the pilot form and the audit-trail panel.

---

## 4. Design tokens

Implement these as CSS variables (or Tailwind theme values, if the site uses Tailwind) and use them site-wide.

### Colour

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F6F6F3` | Page background |
| `surface` | `#FFFFFF` | Alternate sections, form, stage |
| `ink` | `#101828` | Primary text |
| `ink-strong` | `#142B44` | Buttons, dark section background, dark tiles |
| `ink-deep` | `#0F2133` | Audit-trail panel on the dark section |
| `text-2` | `#475467` | Body and secondary text |
| `text-3` | `#5D6B7E` | Labels, captions, `dt` |
| `rule` | `#D9DCE1` | Hairlines |
| `rule-strong` | `#101828` | Table header rules, section top rules |
| `input-border` | `#C9CED6` | Form fields |
| `brand` | `#1F4E79` | Links |
| `signal` | `#D9480F` | Accent, used sparingly: the hero dash, animation scan line and arrows, "in development" |
| `signal-text` | `#A3360A` | Signal-coloured text on light backgrounds |
| `ok` | `#0E7C5A` / text `#0B6B4D` | Approved / clean states |

### Type

Load from Google Fonts, or self-host via `next/font`.

- **Display:** `Newsreader`, weights 400 and 500, optical sizes 6–72. Used for all h1–h3 and the founder quote.
- **Text:** `IBM Plex Sans`, weights 400, 500 and 600.
- **Data:** `IBM Plex Mono`, weights 400 and 500. Used only for data: animation chips, the audit trail, dataset names.

| Role | Desktop | Mobile |
|---|---|---|
| h1 | Newsreader 400, 60px / 1.04, letter-spacing −0.02em | 38px / 1.08 |
| h2 | Newsreader 400, 42px / 1.1, −0.015em (pilot h2: 48px) | 30px |
| h3 (product names) | Newsreader 500, 32px | 26px |
| Founder quote | Newsreader 400, 30px / 1.35 | 22px / 1.4 |
| Body | Plex Sans 16–18px / 1.6, colour `text-2` | 15–16px |
| Small / labels | Plex Sans 13–15px, colour `text-3` | — |

### Shape and spacing

- **Radius:** 4px for buttons and inputs; 6px for the form, audit panel and animation cards; 8px for the stage. No pill shapes.
- **Buttons:**
  - Primary: `ink-strong` background, white text, 15–16px weight 500, padding 15×22.
  - Secondary: a text link underlined with `text-underline-offset: 4px`.
- **Container:** max-width 1240px, 40px side padding (20px on mobile).
- **Section padding:** 104px vertical on desktop, 48px on mobile.
- **Shadow:** only on the stage: `0 1px 2px rgba(16,24,40,.04), 0 12px 32px rgba(16,24,40,.06)`.
- **Never use:** gradient fills, emoji, icon-tile grids, or uppercase monospace eyebrows.

---

## 5. Section specs and copy

Use the copy exactly as written; it's also in the reference files.

### 5.1 Header
- **Left:** mascot mark (22×38) and wordmark (124×26), linking to the top of the page.
- **Right, nav links:** FlashEDC, FlashAnalysis, Compliance, Roadmap, Company.
- **Primary button:** "Request a demo", linking to `#pilot`.
- **Mobile:** logo plus a 44×44 menu button that opens a full-screen sheet containing the same links.

### 5.2 Hero
**Layout:** two columns. Left text column is about 380px minimum; the 720×520 animated stage sits on the right. On screens narrower than 1160px, the stage drops below the text.

**Left column:**
- **Kicker:** a 28×2px `signal` dash, then "For sponsors and CROs running Phase I–II studies".
- **H1:** "Your protocol already describes the study. We build everything that follows."
- **Body:** "ClinDaddy turns a protocol into a CDISC study build, runs data collection in its own EDC, and delivers SDTM, ADaM and TLFs with independent QC. Your data managers review and sign off at every step."
- **Buttons:** "Request a demo" (primary) and "How it works" (text link to `#products`).
- **Definition list,** with a top rule:
  - Standards: CDASH, SDTM, ADaM, Define-XML
  - Controls: Audit trail, versioned designs, human approval
  - QC code: SAS, R and SQL, yours to rerun

### 5.3 What changes for your team
- **Left:**
  - h2 "What changes for your team"
  - "The work still gets reviewed by the people accountable for it. They stop rebuilding it by hand."
- **Right: a 3-column table** (Task / Usually / With ClinDaddy). The header row has a `rule-strong` bottom border; rows have `rule` borders. On mobile, collapse it to a stacked list showing Task plus "With ClinDaddy".

| Task | Usually | With ClinDaddy |
|---|---|---|
| Database build | Specified and built by hand from the protocol | Drafted from the protocol, reviewed by your data manager |
| Edit checks | Written and tested one by one | Generated from the specification, then approved |
| SDTM and ADaM | Programmed and double-programmed per study | Generated, with independent QC code you can rerun |
| Submission files | Assembled at the end, under deadline | Define-XML and reviewer guides produced with the datasets |

### 5.4 Products (`#products`)
- **h2:** "Two products on one data model. Start with either."
- **Layout:** two columns under a `rule-strong` top line, separated by a vertical `rule`. Each column has the name (h3), a one-line descriptor, a paragraph, a spec `dl`, and a link.

**FlashEDC** — "Study build and data collection"
- Paragraph: "Reads the protocol, drafts the visits, CDASH forms, codelists and edit checks, and runs the study in its own EDC once your team approves the design."
- You provide: Protocol (PDF)
- You receive: Review-ready study build, then a live EDC
- Changes: New design version on every change; nothing overwritten
- Link: "Request a FlashEDC demo"

**FlashAnalysis** — "Standards and submission outputs"
- Paragraph: "Takes raw data from FlashEDC or any other EDC and produces SDTM, ADaM, TLFs and the files a reviewer expects, with full traceability."
- You provide: EDC export and, if you have them, your specs
- You receive: SDTM, ADaM, TLFs, Define-XML, aCRF, reviewer guides
- QC: Independent QC code in SAS, R and SQL
- Link: "Request a FlashAnalysis demo"

### 5.5 Review & audit trail (`#review`, dark section)
- **Left:**
  - h2: "Nothing goes live until a person signs it off."
  - Body: "The AI proposes. Your data manager approves, edits or rejects, and every decision is recorded with who, when and why."
  - Link: "Request validation documentation (NDA)", which opens the contact form with Interest = Validation docs.
- **Right: an audit-trail panel.** Header reads "Audit trail · Study SYN-014" on the left and "Example, synthetic data" on the right. Table in Plex Mono 13px (Time / By / Action). "Approved" is shown in `#6CD0A6`, "Proposed" in `#F4A27E`.

| Time | By | Action |
|---|---|---|
| 11-04 14:02 | J. Rivera, DM | **Approved** form VS, version 3 |
| 11-04 13:57 | J. Rivera, DM | Edited edit check VS-004, reason: amendment 2 |
| 11-04 13:41 | ClinDaddy AI | **Proposed** edit check VS-004 |
| 11-04 13:40 | ClinDaddy AI | **Proposed** form VS from protocol §7.2 |

### 5.6 Roadmap (`#roadmap`)
Four columns under a `rule-strong` top line, each with a small status label and an item:

| Status label | Colour | Item |
|---|---|---|
| Available now | `ok` | FlashEDC and FlashAnalysis |
| 2027, in development | `signal-text` | RTSM / IRT |
| Planned | `text-3` | eConsent, ePRO, eCOA, eSource |
| Planned | `text-3` | CTMS, eTMF |

On mobile, stack them as a vertical list.

### 5.7 Founder (`#founder`)
- **Image:** the mascot at 140×242.
- **Quote:** "I've spent more than thirteen years building EDC software. Every study started the same way: someone reading the protocol and rebuilding it by hand. ClinDaddy removes the rebuild, not the people who check it."
- **Attribution:** "Bilal Bayindir, Founder and CEO"

### 5.8 Pilot (`#pilot`)
- **Left:**
  - h2: "Start with one study."
  - Body: "Send a protocol or a dataset. We deliver one study build or one SDTM package at a fixed pilot price, with a written path to a per-study contract."
  - Line: "Or write to hello@clindaddy.com"
- **Right: a form on `surface`** with a `rule` border and 6px radius:
  - Fields: Name, Company, Work email (all real `<label>` elements).
  - Radio group: "What would you like to start with?" with options "A protocol, for a FlashEDC study build" and "A dataset, for an SDTM package".
  - Submit button: "Request a pilot".
  - Wire it to the existing contact pipeline with Interest = Pilot. Add a success state, a honeypot field, and email validation.

### 5.9 Footer
- **Left:** wordmark, "1028 W Airy St, Norristown, PA 19401", "© 2026 ClinDaddy LLC".
- **Right:** three columns:
  - Product: FlashEDC, FlashAnalysis, Roadmap
  - Company: About, Trust and governance, Investors
  - Contact: hello@clindaddy.com, Privacy
- **Keep** the legal line from the previous PRD.

---

## 6. Hero animation spec

The exact markup and keyframes are in `landing-reference-desktop.html`, inside `#how`. Port them faithfully.

### 6.1 Story
The animation is a 15-second loop with five acts of 3 seconds each. Only one act is visible at a time.

| Act | Time | Rail label | What happens | Caption title / subtitle |
|---|---|---|---|---|
| 1 | 0–3s | 01 READ | Two protocol pages flip. A scan line sweeps down the page and highlights "5 Study population", "7 Schedule of assessments" and "9 Safety reporting". On the right, a "Parsing protocol" checklist ticks in five items. | Reading the protocol / Every page: objectives, eligibility, visit schedule, endpoints. |
| 2 | 3–6s | 02 ANALYZE | A small protocol thumbnail, with a dashed arrow leading to a schedule-of-assessments grid (Scr, D1, D8, D15, EOT × 6 assessments). Dots pop in column by column. Then tags appear: "5 visits", "6 assessments", "window ±2 days". | Analyzing the design / Visits, assessments and timing become a structured study model. |
| 3 | 6–9s | 03 EXTRACT | A CDASH "Vital Signs · VS" form builds row by row, with variable names. A "Generated spec" stack appears: test codes, units, an edit check, a codelist. An "APPROVED · DM review" stamp lands, and the mascot bubble says "Looks right. Approved." | Extracting the build / CDASH forms, codelists and edit checks, drafted for your sign-off. |
| 4 | 9–12s | 04 COLLECT | Three site cards (101 Boston, 102 Austin, 103 Toronto) with pulsing live dots. Data packets travel along dashed lanes into a FlashEDC table. Row 103-002 shows SYSBP 260 with "Query", then switches to 126 with "Resolved". The enrollment bar fills to 24 / 36. | Collecting the data / Sites enter data in FlashEDC; edit checks raise queries instantly. |
| 5 | 12–15s | 05 SUBMIT | Tiles build in order: SDTM (DM, VS, AE, LB) → ADaM (ADSL, ADVS, ADAE) → TLFs (T 14.1.1, T 14.3.1, F 14.2.1). A submission package appears (define.xml, acrf.pdf, csdrg.pdf, adrg.pdf) with "0 conformance errors" and "Ready to file". The mascot bubble says "Ready to file!" | Submitting with confidence / SDTM, ADaM, TLFs and Define-XML, validated and packaged. |

**Persistent elements:**
- A progress rail at the top: five segments that fill in sequence. The fifth uses `signal`. The active label turns `ink-strong`.
- The mascot sits bottom-left with a gentle 3-second bob.
- The caption sits beside the mascot and crossfades per act.

### 6.2 Implementation
- **Build it as one React component**, `<PipelineStage />`, at a fixed 720×520 internal size.
  - Scale it responsively with a wrapper that uses `transform: scale()`. Compute the scale from the container width (mobile ≈ 0.497 at 358px).
  - Text inside the stage stays real DOM text. Do not render the animation to canvas or video.
- **Animation engine:** pure CSS keyframes, as in the reference (one shared 15s clock; acts staggered by `animation-delay: 3s × act`; children offset within the act).
  - It must stay CSS-only, with no JS animation libraries. It is cheap and smooth on mobile.
- **Fill mode:** use `animation-fill-mode: backwards` on delayed children so nothing flashes before it animates in.
- **Pause when off-screen:** use an `IntersectionObserver` to toggle `animation-play-state: paused` when the stage leaves the viewport.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, show only Act 5 (the final state) and the full rail, with no motion. The reference CSS already has this rule.
- **Accessibility:**
  - The stage gets `role="img"` and an `aria-label` that describes the five steps.
  - Add a visually hidden ordered list of the five act captions for screen readers.
- **Example data:** all values in the animation (subject IDs, sites, BP values, form and field counts) are illustrative. Keep a small "Illustrative example" caption under the stage, in `text-3` at 12px.
- **Later, optional:** a Rive version of the mascot for richer character motion. Out of scope for this PR.

---

## 7. Mobile (390px)

Follow `landing-reference-mobile.html`:
- Header with a menu button.
- The hero stacks: kicker, h1 at 38px, body, then a full-width primary button.
- The stage is scaled to fit the width (about 358×259).
- The table becomes a stacked list.
- Products: two stacked items, each with a top rule.
- The dark review section shows a 3-row audit log.
- Founder quote.
- Pilot section has the email field and button only. The full form can open on submit, or live on `/pilot`.
- A short footer.

No horizontal scroll at any width from 320px to 1440px.

---

## 8. Rest of the site

- Apply the Section 4 tokens (colours, fonts, radii, buttons, rules) to all other pages: Platform, FlashEDC, FlashAnalysis, Roadmap, Pilot, Trust, Technology, About, Investors, Contact, Privacy.
- Remove the monospace uppercase eyebrows and the pill tags across the site.
- Replace any "Statuses are literal" or "we say so" style copy with neutral statements, following the earlier website-update PRD.
- Keep each page's existing content; only the styling and the header and footer change. A full rewrite of those pages is not in scope.

---

## 9. Non-functional requirements

- **Performance:**
  - Fonts via `next/font` with `display: swap`, subset to Latin.
  - Mascot and wordmark served through `next/image` with explicit sizes.
  - No layout shift from the stage (reserve its height).
- **Accessibility:**
  - WCAG 2.1 AA.
  - All text at least 4.5:1 contrast. The listed tokens pass; recheck any new combinations.
  - Focus rings visible on all links and inputs.
  - Form errors announced to screen readers.
- **SEO:**
  - Title: "ClinDaddy — From protocol to CDISC submission".
  - Meta description built from the hero body text.
  - Open Graph image: a static frame of Act 5 with the h1.
  - Keep the existing JSON-LD.
- **Analytics:** events for Request a demo, How it works, the product demo links, Validation docs, and pilot form submits.

---

## 10. Claims Bilal must confirm before merging

Ask him one yes/no question per item; soften or remove anything he doesn't confirm.

1. FlashEDC's EDC runtime (sites entering data, edit checks, queries) works end to end. *(The hero copy and Act 4 depend on this.)*
2. Audit trail and design versioning exist in the product today. *(The hero `dl` and the review section depend on this.)*
3. Validation documentation exists and can be shared under NDA.
4. QC code is downloadable in SAS, R and SQL.
5. The founder quote wording is approved.
6. RTSM / IRT target year is 2027.

---

## 11. Acceptance criteria

- [ ] The home page matches the reference mockups at 1440px and 390px: layout, copy, tokens and fonts.
- [ ] The animation runs its 15-second, five-act loop with no flashes; it pauses off-screen and shows the static Act 5 under reduced motion.
- [ ] The pilot form submits to the existing pipeline with Interest = Pilot and shows a success state.
- [ ] No pill buttons, monospace eyebrows, gradients or emoji anywhere on the site.
- [ ] The footer logo renders, and the inverse-logo bug is resolved.
- [ ] Lighthouse 90+ on Home, in all four categories.
- [ ] PR includes desktop and mobile screenshots, plus an animation recording.
- [ ] Bilal has approved; the agent merges and deploys, then verifies production.
