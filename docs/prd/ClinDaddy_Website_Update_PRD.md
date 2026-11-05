# PRD: clindaddy.com website update

**Owner:** Bilal Bayindir, Founder & CEO
**Executor:** Claude Code (coding agent)
**Date:** November 2026
**Status:** Ready for implementation

---

## 1. Why we're doing this

Startup programs (AWS, Google, Microsoft, NVIDIA, Cloudflare) and investors now read clindaddy.com next to our pitch deck. The site currently undersells the company and contradicts the deck in several places:

| Topic | Website today | Deck / actual position |
|---|---|---|
| EDC data capture | "In development" | Built: FlashEDC includes its own EDC runtime |
| Compliance | "Does not publish certifications or regulatory status" | Built to 21 CFR Part 11 and GxP; validation documentation available on request |
| FlashEDC dependency | "Depends on a specific EDC environment" | Standalone. No dependency on any third-party or former-employer EDC |
| Go-to-market | Not described | Land with a fixed-price SDTM/ADaM/TLF deliverable, expand to a per-study FlashEDC licence, discounted pilots for first customers |
| Roadmap | "Coming soon" list with mixed statuses | Clear sequence: Today → Next (RTSM/IRT, 2027) → patient-facing modules → trial operations → AI CRO |
| Company | Not stated | ClinDaddy LLC, Pennsylvania, formed November 1, 2026 |
| Contact | hello@clindaddy.com only | Add address and a demo/pilot call to action |

**Goal:** the website, the pitch deck and every startup-program application tell one consistent, confident story.

**Hard rule:** every statement on the site must be true today. Confident wording is fine; unverifiable numbers, fake customers, fake logos and fake testimonials are not. Section 9 lists the claims Bilal must confirm before launch.

---

## 2. Instructions for the coding agent

1. **Inspect the repo first.** Find the framework, routing, components, styling system and deployment setup. Match the existing design system. Do not introduce a new framework.
2. **Do all git work yourself:** create a branch (`website-update-nov-2026`), commit in logical steps, push, open the PR, and merge after Bilal approves. Do not hand Bilal git chores.
3. **Before merging,** run the build, lint and a link checker. Then post screenshots of every changed page at desktop (1440px) and mobile (390px) widths.
4. **Stop and ask** only if a requirement is ambiguous, or if a claim in Section 9 is unconfirmed.

---

## 3. Site map (after update)

| Route | Status | Purpose |
|---|---|---|
| `/` | Rewrite | Home: positioning, two products, pipeline, roadmap teaser, CTA |
| `/platform` | Update | How the connected pipeline works |
| `/flashedc` | Update | Product page |
| `/flashanalysis` | Update | Product page |
| `/roadmap` | **New** | Full roadmap |
| `/pilot` | **New** | Pilot program for first customers |
| `/solutions` | Update | CROs, and pharma/biotech sponsors |
| `/trust` | Update | Compliance, security, validation |
| `/technology` | Update | Architecture and AI approach |
| `/about` | Update | Company, founder, vision |
| `/investors` | Update | Thesis, traction to date, raise |
| `/contact` | Update | Form plus address |

Main nav: Platform · FlashEDC · FlashAnalysis · Roadmap · Pilot Program · Trust · About · **Request a demo** (button).
Footer: all pages plus Investors and Contact, and "© 2026 ClinDaddy LLC · 1028 W Airy St, Norristown, PA 19401".

---

## 4. Global copy and terminology

- **Company name:** "ClinDaddy" in body copy; "ClinDaddy LLC" in the footer and legal text.
- **Tagline:** *From protocol to submission, one AI-native platform.*
- **One-liner:** AI-built eCRFs, EDC data collection and CDISC SDTM/ADaM/TLF automation for small and mid-size sponsors.
- **Products:** "FlashEDC" (study build + data collection) and "FlashAnalysis" (submission outputs). Never "Flash EDC".
- **Standards:** write "CDISC", "CDASH", "SDTM", "ADaM", "Define-XML", "21 CFR Part 11" and "GxP" exactly as shown.
- **Remove everywhere:**
  - "Architected, not built"
  - "Read the statuses literally"
  - "depends on a specific EDC environment"
  - "internal CRO tool"
  - "No customer has paid…"
  - "No study-delivery history…"
  - the footer disclaimer "Nothing on this site represents… commercial traction".
- **Replace removed lines with** accurate, neutral status labels (Section 5.5) and a short legal footer (Section 5.12).
- **Primary CTA:** "Request a demo". **Secondary CTA:** "Join the pilot program".
- **Tone:** confident, specific, regulatory-literate. No hype words such as "revolutionary" or "game-changing".

---

## 5. Page requirements

### 5.1 Home (`/`)

1. **Hero**
   - H1: *From protocol to submission, one AI-native platform.*
   - Subhead: *ClinDaddy turns a clinical trial protocol into CDISC-standard eCRFs, runs EDC data collection, and automates SDTM, ADaM and TLF outputs with independent QC.*
   - CTAs: Request a demo · Join the pilot program.
2. **The problem.** Three cards:
   - Protocol-to-eCRF build is manual.
   - Submission programming is repeated for every study.
   - Enterprise tools are priced for big pharma.
3. **Two products, one pipeline.**
   - FlashEDC card: Protocol Analyzer, AI eCRF Designer with an assistant (the user always has the final say), its own EDC runtime with versioned designs, CDASH naming.
   - FlashAnalysis card: SDTM/ADaM/TLF automation, independent QC code in SAS, R and SQL, full traceability, Define-XML/aCRF/cSDRG/ADRG, works with any EDC's raw data.
4. **Pipeline strip:** Protocol → eCRFs → EDC → SDTM → ADaM → TLFs, with FlashEDC and FlashAnalysis segments in two colours. Caption: *21 CFR Part 11 and GxP controls at every step.*
5. **Why now.**
   - FDA requires CDISC study data standards for regulated submissions.
   - Frontier LLMs can now read a full protocol and return structured specifications.
   - Lean biotechs want fixed prices.
6. **Roadmap teaser:** four chips (Today / Next / Then / Vision) linking to `/roadmap`.
7. **Pilot program band:** "Now accepting pilot sponsors", with a short pitch and a link to `/pilot`.
8. **Founder strip:** "Built by a clinical data insider: 13+ years building EDC software", with a link to `/about`.
9. **Final CTA band.**

**Speed claim:** keep "10 to 30 minutes" for protocol-to-study-build only if Bilal confirms it (Section 9). Phrase it as *"minutes, not weeks, in our internal benchmarks"*, and show the benchmark basis as a footnote.

### 5.2 Platform (`/platform`)
- **Explainer:** one shared data model from protocol to submission package. Because the platform designed the eCRF, it already knows the SDTM mapping.
- **Diagram:** the six steps, data lineage arrows, and the human review checkpoints.
- **Section:** "Human in the loop". AI drafts and a qualified user approves. Every AI suggestion is logged in the audit trail.

### 5.3 FlashEDC (`/flashedc`)
- **Sections:**
  - Protocol Analyzer
  - eCRF Designer (panel-style layout by default, alternative layouts, auto-reorganization of manually built forms)
  - AI design assistant
  - Study workspace (sponsors sign in, pick an existing study or load a new protocol)
  - Versioning (a published design is never modified; updates create version +1)
  - Data collection (EDC runtime)
  - Standards (CDASH field IDs, codelists, eCRF naming)
- **Status label:** Available (study build + EDC).
- **CTA:** Request a demo.

### 5.4 FlashAnalysis (`/flashanalysis`)
- **Sections:**
  - Inputs: FlashEDC, any EDC export, or the sponsor's own specs, accepted at every step
  - SDTM
  - ADaM
  - TLFs
  - Independent QC (downloadable SAS, R and SQL code at each QC step)
  - Traceability page (inputs, process files and outputs per step as downloads)
  - Submission artifacts (Define-XML, aCRF, cSDRG, ADRG, eCTD-ready package)
- **Sold separately:** state that FlashAnalysis works with any EDC, so sponsors don't have to switch EDC.
- **Status label:** Available.
- **Test-count line:** keep the "~2,500 automated tests" line as an engineering-quality signal, if still accurate.

### 5.5 Roadmap (`/roadmap`), new

A horizontal timeline (vertical on mobile) with these status labels:

| Stage | Items | Label |
|---|---|---|
| Today | FlashEDC (AI study build + EDC), FlashAnalysis (SDTM/ADaM/TLF, Define-XML, reviewer guides) | **Available** |
| Next, 2027 | RTSM / IRT (randomization and trial supply) | **In development** |
| Then | eConsent, ePRO, eCOA, eSource | **Planned: designed on the same data model** |
| Then | CTMS, eTMF | **Planned** |
| Vision | AI CRO: every system and service a small sponsor needs, on one platform | **Vision** |

- **Intro copy:** each module reuses the protocol-derived data model, so new modules ship faster and integrate on day one.
- **Interest capture:** add "Interested in early access to a module?". Each card gets a button that opens the contact form with Interest pre-filled as "Early access: <module>".

### 5.6 Pilot program (`/pilot`), new

This page answers the investor feedback that the go-to-market path was unclear.

- **Who it's for:**
  - US small and mid-size biotech sponsors in Phase I–II.
  - Boutique CROs and biostatistics firms.
- **What a pilot is:** one real deliverable, either an SDTM/ADaM/TLF package from your current EDC data or one FlashEDC study build.
- **Terms:** discounted pilot pricing in exchange for a reference and a case study, with a written path to a full-price per-study contract.
- **How it works:**
  1. Intro call
  2. Data/spec handoff
  3. Delivery with QC evidence
  4. Review
  5. Next study
- **Commercial model:**
  - Fixed price per deliverable.
  - Per-study software licence.
  - **No price numbers.** Use "Pricing is scoped per study; request a proposal."
- **Partner track:** CROs and biostatistics firms can white-label FlashAnalysis output.
- **CTA:** "Apply for a pilot". This opens the contact form with Interest = Pilot.

### 5.7 Solutions (`/solutions`)
- **CROs:** faster study start-up, consistent standards output, white-label partner option.
- **Pharma & biotech:** fixed-price submission deliverables, no EDC switch required, a path to the full pipeline.
- **Copy rule:** remove the percentage disclaimers, and phrase benefits as capabilities rather than measured customer results.

### 5.8 Trust (`/trust`)
- **Built for regulated use:**
  - 21 CFR Part 11 controls: audit trail, e-signatures, access control, versioning.
  - GxP-aligned development.
  - CDISC conformance.
- **Validation:** "Validation documentation is available on request under NDA." Add a request button.
- **Security:**
  - Isolated environment per sponsor.
  - Encryption in transit and at rest.
  - Role-based access.
- **Exact wording:** only claim the items Bilal confirms (Section 9).
- **AI governance:**
  - Models never make final decisions.
  - All AI outputs are reviewable and logged.
  - No sponsor data is used to train third-party models.
- **Do not claim:** SOC 2, ISO 27001, HIPAA certification, or "FDA-approved". None are held.

### 5.9 Technology (`/technology`)
- **Stack:** .NET 10, PostgreSQL (JSON document storage), React/TypeScript, and a model-agnostic AI layer using frontier LLMs.
- **Status:** remove "Data capture: In development". Data capture is built.
- **Diagram:** keep the architecture diagram and append-only audit log, and update the labels.

### 5.10 About (`/about`)
- **Company:** ClinDaddy LLC, founded November 2026 in Norristown, Pennsylvania.
- **Founder:** Bilal Bayindir, Founder & CEO. MS Computer Science, University of Delaware; 13+ years building EDC software. Designed and built FlashEDC and FlashAnalysis. LinkedIn link.
- **Vision:** the AI CRO, phrased as a destination.
- **Remove:** "One person today", "No study-delivery history and no management history".
- **Hiring:** add a "We're hiring as we grow" line listing the planned roles:
  - senior clinical programmer
  - life-sciences sales lead
  - full-stack engineer
  - quality and validation lead

### 5.11 Investors (`/investors`)
- **Thesis:** mandatory standards plus AI capability plus an underserved small-sponsor segment.
- **Product:** both products built and demo-ready.
- **Go-to-market:** land with a deliverable, expand with a licence, scale through partners. Link to `/pilot`.
- **Roadmap summary:** short version, linking to `/roadmap`.
- **The raise:** "Raising a $2M seed round". Show this line only if Bilal confirms (Section 9).
- **CTA:** "Request the investor deck". This opens the contact form with Interest = Investment.
- **Remove:** the "What this website does not say" section.

### 5.12 Contact (`/contact`) and footer
- **Form fields:**
  - Name*, Company, Role, Email*, Message*.
  - Interest: Product demo, Pilot program, Partnership, Investment, Early access (module), Other.
  - Interest supports pre-fill via the query string `?interest=`.
- **Contact details:**
  - hello@clindaddy.com as the general address.
  - bilal.bayindir@clindaddy.com for the founder.
  - Address: 1028 W Airy St, Norristown, PA 19401.
- **Legal footer, replacing the current disclaimer:**
  - *"ClinDaddy software supports, but does not replace, sponsor responsibility for regulatory submissions. Product names are trademarks of ClinDaddy LLC."*
  - Link to the privacy policy (create a basic one if none exists).

---

## 6. Non-functional requirements

- **Responsive:** 390px to 1440px, with no horizontal scroll.
- **Performance:** Lighthouse 90+ for Performance, Accessibility, Best Practices and SEO on Home, Pilot and Roadmap.
- **Accessibility:** WCAG 2.1 AA, 4.5:1 text contrast, alt text, keyboard-navigable nav and form, and status shown as text as well as colour.
- **SEO:**
  - A unique title and meta description per page.
  - Open Graph image.
  - `sitemap.xml` and `robots.txt`.
  - JSON-LD `Organization` (ClinDaddy LLC, address, URL, logo) and `SoftwareApplication` for each product.
  - Target phrases: "AI EDC", "protocol to eCRF", "SDTM automation", "ADaM automation", "CDISC submission software", "EDC for small biotech".
- **Analytics:** track CTA clicks (Request a demo, Join pilot, Request investor deck) as events, using the site's existing analytics if present.
- **Forms:**
  - Spam protection (honeypot or the existing provider).
  - A success message after submitting.
  - Submissions delivered to hello@clindaddy.com.

---

## 7. Out of scope

- Pricing numbers, customer logos, testimonials and case studies. Add these later when real pilots exist.
- A blog or CMS.
- Any product code changes in FlashEDC or FlashAnalysis.

---

## 8. Acceptance criteria

- [ ] None of the phrases in the Section 4 "Remove everywhere" list appear anywhere on the site (grep the built output).
- [ ] The Roadmap and Pilot pages are live and in the nav.
- [ ] Product statuses on Home, FlashEDC, Technology, Roadmap and Investors all match Section 5.5.
- [ ] Every CTA opens the contact form with the right Interest pre-filled.
- [ ] Footer shows ClinDaddy LLC and the Norristown address.
- [ ] No SOC 2, ISO, HIPAA-certified or FDA-approved claims appear anywhere.
- [ ] The build, lint and link checks pass, and the Lighthouse targets are met.
- [ ] Desktop and mobile screenshots of every page are posted to the PR, and Bilal has approved.
- [ ] Merged and deployed by the agent; the production URL has been verified.

---

## 9. Claims Bilal must confirm before launch

The agent should ask for one yes/no answer per item. Anything not confirmed gets softened or removed.

1. FlashEDC's EDC runtime (sites entering data) works end to end today.
2. "10 to 30 minutes" protocol-to-study-build: is this measured, and on which protocols?
3. 21 CFR Part 11 controls present today: audit trail, e-signatures, role-based access, versioning (list which).
4. Validation documentation exists and can be shared under NDA.
5. Encryption at rest and in transit, and isolated environments per sponsor.
6. No sponsor data is sent to model providers for training.
7. Approximately 2,500 automated tests is still accurate.
8. Public mention of the $2M seed raise.
9. RTSM/IRT target year 2027.
