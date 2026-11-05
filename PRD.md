Yes. The best version is to combine the **PRD + implementation instructions + design direction + coding-agent workflow** into **one master build specification**.

I would actually use the following as the single prompt/file you give the AI coding agent. It eliminates the need for the model to interpret two separate documents.

# Clindaddy Website

## Master Product Requirements Document + AI Build Specification

**Version:** 1.0
**Status:** Final MVP Build Specification
**Company:** Clindaddy
**Primary Products:** FlashEDC, FlashAnalysis
**Primary Website Goal:** Investor credibility + customer discovery + product demonstration

---

# 1. ROLE

You are a **senior frontend engineer, UI/UX designer, product designer, and technical architect**.

Your task is to **build the actual Clindaddy website**, not merely describe it or create a mockup.

You have two responsibilities:

1. Follow the product/content requirements in this document.
2. Make strong professional implementation decisions where the PRD does not specify exact details.

The final result should be a polished, production-quality website suitable for presentation to:

* Pharma executives
* Biotech executives
* CRO executives
* Clinical-data professionals
* CTOs
* Technology partners
* Investors

Do not create a generic AI startup website.

---

# 2. COMPANY

## Company Name

**Clindaddy**

Clindaddy is a clinical data automation company/platform spanning the clinical-trial data lifecycle from **protocol to regulatory submission**.

The company's core story is:

> **From Protocol to Submission.**

---

# 3. PRODUCT BRAND ARCHITECTURE

Clindaddy has two primary products.

## FlashEDC

**Positioning:**

> Protocol → EDC

FlashEDC transforms a clinical trial protocol into an EDC study design.

Capabilities include:

* Visit/folder structure
* Forms/CRFs
* Fields
* Control types
* Code lists
* Edit-check specifications
* Generated edit-check programming code
* Excel study-design output
* SQL Server study-builder output
* Human review
* Second-eye QC

---

## FlashAnalysis

**Positioning:**

> Clinical Data → Analysis → Submission

FlashAnalysis handles downstream clinical programming and data-standard workflows.

Capabilities include:

* Data intake
* Provenance governance
* SDTM transformation
* ADaM derivation
* Tables, Listings, and Figures
* Independent QC
* Cross-artifact QC
* Define-XML
* aCRF
* cSDRG
* ADRG
* eCTD-lite package generation
* Standards governance
* CRO/vendor reconciliation
* Audit trail
* Data lineage

---

# 4. CRITICAL BRAND RULES

The company is:

> **Clindaddy**

The products are:

> **FlashEDC**

> **FlashAnalysis**

Do NOT use:

* CytelAI
* Cytel AI
* FlashDM

Do not invent another company or product name.

AI should be presented as an **enabling technology**, not as the company's identity.

Do not make the company look like an "AI wrapper."

The differentiator is:

> **Trustworthy clinical-data automation.**

---

# 5. CORE COMPANY MESSAGE

The website should make visitors understand:

> **Clindaddy is building the clinical data automation layer from protocol to submission.**

The two products represent complementary stages of the lifecycle:

```text
PROTOCOL
    ↓
FLASHEDC
Protocol → EDC
    ↓
DATA COLLECTION
    ↓
FLASHANALYSIS
Clinical Data → Analysis → Submission
    ↓
SUBMISSION
```

The technology philosophy connecting the products is:

> **AI assists. Deterministic systems execute. Humans approve. Everything is traceable.**

This message should appear prominently throughout the website.

---

# 6. STRATEGIC PRODUCT STORY

The complete lifecycle is:

```text
Protocol
   ↓
Study Build
   ↓
Data Capture
   ↓
SDTM
   ↓
ADaM
   ↓
Analysis
   ↓
QC
   ↓
Submission
```

This lifecycle is the primary visual metaphor for the website.

Do not rely only on text to communicate it.

Create visual workflow diagrams that make the lifecycle immediately understandable.

---

# 7. WEBSITE OBJECTIVES

## Primary

1. Establish Clindaddy as a credible clinical-data technology company.
2. Explain the two products clearly.
3. Demonstrate working technology.
4. Communicate the scale and importance of the automation opportunity without unsupported claims.
5. Establish trust with CRO, pharma, biotech, and clinical-data professionals.
6. Generate investor conversations.
7. Generate customer discovery and pilot conversations.
8. Establish a foundation for future product expansion.

## Secondary

* Recruit technical/clinical talent.
* Establish thought leadership.
* Provide a professional company presence.
* Create a foundation for future documentation and product interfaces.

Primary KPI:

> **Qualified conversations generated**

Do not optimize primarily for raw traffic.

---

# 8. TARGET AUDIENCES

## Investors

Target:

* Life-sciences software investors
* Healthcare AI investors
* Clinical-trial technology investors
* Growth/PE investors
* Angels
* Seed investors

The site must answer:

* What problem is being solved?
* Why is the problem valuable?
* Why now?
* Why is this difficult?
* What technology exists?
* What differentiates Clindaddy?
* What is the expansion opportunity?
* Who could buy it?
* What is the path toward a larger platform?

---

## CROs

Focus on:

* Study-build labor
* Statistical programming
* QC
* Reconciliation
* Operational efficiency
* Margins
* Faster study startup

---

## Pharma & Biotech

Focus on:

* Faster study startup
* Reproducibility
* Traceability
* Data lineage
* QC
* Submission readiness
* Vendor visibility

---

## Technology Partners

Potential audiences include:

* EDC vendors
* Clinical data platforms
* CDM platforms
* Statistical programming platforms
* CRO technology organizations

Do not claim partnerships unless explicitly provided.

---

# 9. WEBSITE INFORMATION ARCHITECTURE

Create:

```text
/
├── Home
├── Platform
│   ├── FlashEDC
│   └── FlashAnalysis
├── Technology
├── Trust
├── Solutions
│   ├── CROs
│   └── Pharma & Biotech
├── About
├── Investors
└── Contact
```

Recommended primary navigation:

```text
Platform
Technology
Trust
Solutions
About

                         [Request a Demo]
```

Investors may be in the main navigation or footer.

Keep navigation simple.

---

# 10. TECHNOLOGY STACK

Use:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui where appropriate
* Lucide icons
* Motion/Framer Motion where appropriate

Use:

> **Next.js App Router**

Use TypeScript throughout the project.

The website must be deployable to:

> **Vercel**

Do not introduce unnecessary backend infrastructure.

The MVP is primarily a:

> Marketing + product + investor + demo website.

---

# 11. PROJECT STRUCTURE

Use a clean structure such as:

```text
clindaddy-website/

├── app/
│   ├── page.tsx
│   ├── platform/
│   ├── flashedc/
│   ├── flashanalysis/
│   ├── technology/
│   ├── trust/
│   ├── solutions/
│   ├── investors/
│   ├── about/
│   └── contact/
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Lifecycle.tsx
│   ├── ProductCard.tsx
│   ├── Workflow.tsx
│   ├── ArchitectureDiagram.tsx
│   ├── TrustSection.tsx
│   ├── Demo.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
│
├── public/
│   ├── logo.svg
│   ├── images/
│   └── videos/
│
└── package.json
```

Create reusable components where reuse actually makes sense.

Do not over-engineer.

---

# 12. VISUAL DESIGN

## Design personality

The site should feel:

> **Clinical + Technical + Trustworthy + Modern + Enterprise**

The design should feel closer to a sophisticated enterprise technology company than a generic AI startup.

Possible visual inspiration:

* premium enterprise SaaS
* modern biotech
* clinical software
* infrastructure/developer platforms
* sophisticated data products

Do NOT copy another company's design.

---

# 13. VISUAL DESIGN — AVOID

Do not use:

* robot imagery
* giant AI brains
* cheesy AI graphics
* generic healthcare stock photos
* excessive neon
* excessive gradients
* cyberpunk aesthetics
* crypto aesthetics
* generic startup templates
* excessive glassmorphism
* excessive floating cards

Avoid making every section look like a collection of cards.

---

# 14. VISUAL DESIGN — PREFER

Use:

* excellent typography
* strong hierarchy
* generous whitespace
* subtle borders
* restrained shadows
* clinical data visualizations
* workflow diagrams
* dataset lineage
* architecture diagrams
* product UI mockups
* structured grids
* subtle motion
* technical illustrations
* elegant transitions

The website should look expensive and deliberate.

---

# 15. COLOR SYSTEM

Use a restrained enterprise/clinical color palette.

Establish:

* primary color
* secondary color
* background colors
* text colors
* muted text
* borders
* success/warning/error states

Do not use too many colors.

Do not use excessive gradients.

Create a coherent design system and reuse it consistently.

---

# 16. HOMEPAGE

The homepage is the highest-priority page.

It must answer:

1. What is Clindaddy?
2. What does it automate?
3. Why is it different?
4. Does the technology appear credible?
5. How can someone engage?

---

# 17. HOMEPAGE HERO

Headline:

> **From Protocol to Submission.**

Supporting headline:

> **Clinical data automation built for the real-world complexity of clinical trials.**

Alternative supporting language may be used if it improves the design:

> **AI-powered clinical data automation from protocol to regulatory submission.**

Primary CTA:

> **Request a Demo**

Secondary CTA:

> **Explore the Platform**

---

# 18. HERO VISUAL

Create a premium visual lifecycle.

Concept:

```text
PROTOCOL
    ↓
EDC STUDY
    ↓
DATA
    ↓
SDTM
    ↓
ADaM
    ↓
TLFs
    ↓
QC
    ↓
SUBMISSION
```

Visually identify:

```text
FLASHEDC
Protocol → EDC
```

and:

```text
FLASHANALYSIS
Clinical Data → Analysis → Submission
```

The visual should communicate that Clindaddy spans the lifecycle.

Use subtle animation if appropriate.

---

# 19. HOMEPAGE PROBLEM SECTION

Headline:

> **Clinical trials still depend on enormous amounts of manual data work.**

Explain:

* Protocol interpretation
* EDC study construction
* Data standards transformation
* Statistical programming
* QC
* Submission documentation
* Reconciliation
* Audit and traceability

Do not invent market-size statistics.

Do not invent labor-cost statistics.

---

# 20. PLATFORM SECTION

Headline:

> **One platform. Two engines. One clinical data lifecycle.**

Create two major product presentations.

---

## FlashEDC

Label:

> **Protocol → EDC**

Description:

> Transform a clinical trial protocol into a structured EDC study design.

Capabilities:

* Visit structure
* Forms
* Fields
* Code lists
* Edit checks
* Generated programming code
* Human review
* Excel output
* Database output

CTA:

> **Explore FlashEDC**

---

## FlashAnalysis

Label:

> **Clinical Data → Analysis → Submission**

Description:

> Transform clinical data into standards, analysis-ready datasets, clinical outputs, QC evidence, and submission artifacts.

Capabilities:

* SDTM
* ADaM
* TLFs
* Independent QC
* Cross-artifact QC
* Define-XML
* aCRF
* cSDRG
* ADRG
* Reconciliation
* Audit trail
* Data lineage

CTA:

> **Explore FlashAnalysis**

---

# 21. FLASHEDC PAGE

Route:

`/flashedc`

Hero:

> **Turn a Clinical Trial Protocol into an EDC Study.**

Supporting copy:

> FlashEDC analyzes a clinical trial protocol and generates the structure needed to build the study in an EDC environment.

---

## FlashEDC workflow

Create a visual workflow:

```text
Protocol
   ↓
Protocol Analysis
   ↓
Study Skeleton
   ↓
Human Review
   ↓
Forms & Fields
   ↓
Edit Checks
   ↓
Second-Eye QC
   ↓
EDC Study Design
```

---

## FlashEDC capabilities

### Protocol Analysis

Supports protocol documents including:

* PDF
* DOCX
* TXT
* RTF

### Study Structure Generation

Creates:

* visit/folder structures
* assessment matrices

### Form Generation

Creates:

* forms
* fields
* controls
* code lists

### Edit-Check Generation

Generates:

* edit-check specifications
* programming code

### Human Review

Users can review and edit outputs before finalization.

### Second-Eye QC

Uses adversarial review to identify safe issues and route unresolved issues to human review.

### Long-Running Jobs

Support:

* background processing
* progress
* cancellation
* resume

---

# 22. FLASHANALYSIS PAGE

Route:

`/flashanalysis`

Hero:

> **From Clinical Data to Analysis and Submission.**

Supporting copy:

> FlashAnalysis automates downstream clinical programming and standards workflows while enforcing deterministic execution, independent QC, and traceability.

---

## FlashAnalysis workflow

```text
Clinical Data
     ↓
Provenance Gate
     ↓
SDTM
     ↓
ADaM
     ↓
TLFs
     ↓
Independent QC
     ↓
Submission Metadata
     ↓
Audit & Lineage
```

---

# 23. FLASHANALYSIS CAPABILITIES

### Data Intake

Enforces provenance policies governing real and synthetic data.

### SDTM

Transforms clinical data into CDISC SDTM using deterministic processing.

### ADaM

Creates analysis-ready datasets and derivations.

### TLF Generation

Generates:

* Tables
* Listings
* Figures

with traceability to source records.

### Independent QC

Re-implements computations independently to detect errors.

### Cross-artifact QC

Checks consistency between:

* datasets
* specifications
* outputs

### Submission Metadata

Generates:

* Define-XML
* aCRF
* cSDRG
* ADRG
* eCTD-lite package

### Reconciliation

Compares CRO/vendor deliverables against sponsor outputs.

### Auditability

Provides append-only audit logging and lineage from outputs back to source records.

---

# 24. TRUST & GOVERNANCE PAGE

Route:

`/trust`

This should be one of the strongest pages on the website.

Hero:

> **AI assists. Deterministic systems execute. Humans approve.**

Do not position Clindaddy as uncontrolled autonomous AI.

---

# 25. TRUST PILLAR 1

## Deterministic Execution

Explain:

Generative AI assists with interpretation and specification generation.

Deterministic engines execute those specifications.

The AI does not simply fabricate final clinical numbers.

Create an architecture visualization:

```text
AI
 ↓
Specification
 ↓
Deterministic Engine
 ↓
Clinical Output
```

---

# 26. TRUST PILLAR 2

## Complete Traceability

Explain that outputs can be traced to:

* source records
* specifications
* transformations
* processing steps
* outputs

Create a visual lineage example.

---

# 27. TRUST PILLAR 3

## Independent QC

Explain that production computation and QC computation are intentionally separated.

The goal is to avoid having QC simply reproduce the same implementation and agree with the same bug.

Create a visual:

```text
SOURCE DATA
     │
     ├──────────────→ PRODUCTION
     │                    ↓
     │                 OUTPUT
     │
     └──────────────→ INDEPENDENT QC
                          ↓
                       COMPARE
                          ↓
                       REVIEW
```

---

# 28. HUMAN-IN-THE-LOOP

Create a prominent visual:

```text
AI
 ↓
Draft
 ↓
Human Review
 ↓
Correction
 ↓
Independent / Second-Eye QC
 ↓
Approved Output
```

Headline:

> **Automation should remove mechanical work — not remove accountability.**

---

# 29. TECHNOLOGY PAGE

Route:

`/technology`

Audience:

* CTOs
* investors
* technical buyers
* enterprise partners

The technology page should explain how the system works without requiring visitors to understand every implementation detail.

---

# 30. FLASHEDC ARCHITECTURE

Show:

```text
Protocol
    ↓
Document Processing
    ↓
Routed AI Pipeline
    ↓
Deterministic Code Generation
    ↓
Second-Eye QC
    ↓
Human Review
    ↓
EDC Study Design
```

Technology concepts:

* Six-pass AI pipeline
* Routed prompting
* Human review checkpoints
* Editable outputs
* Background jobs
* Progress/cancel/resume
* Provider-swappable AI
* Second-Eye QC

Present these visually.

---

# 31. FLASHANALYSIS ARCHITECTURE

Show:

```text
Clinical Data
     ↓
Provenance Policy
     ↓
Deterministic SDTM
     ↓
ADaM
     ↓
TLFs
     ↓
Independent QC
     ↓
Cross-artifact QC
     ↓
Submission
     ↓
Audit / Lineage
```

---

# 32. WHY CLINDADDY IS DIFFERENT

Do not say:

> "Our AI is smarter."

Instead emphasize:

### AI + Deterministic Execution

Generative AI assists with interpretation and specifications.

Deterministic engines produce clinical outputs.

### Human Controlled

Users review and approve important decisions.

### Independent QC

Production and QC are intentionally separated.

### Traceable

Outputs can be connected to source data.

### End-to-End Opportunity

The products address complementary stages of the clinical-data lifecycle.

---

# 33. DEMO EXPERIENCE

Evidence is more important than marketing claims.

Create reusable demo sections/components.

---

## FlashEDC demo

Visual workflow:

```text
Upload Protocol
       ↓
Analyze
       ↓
Review Study Skeleton
       ↓
Generate Forms
       ↓
Generate Edit Checks
       ↓
Review
       ↓
Export Study
```

---

## FlashAnalysis demo

```text
Load Data
   ↓
Generate SDTM
   ↓
Generate ADaM
   ↓
Generate TLFs
   ↓
Run Independent QC
   ↓
Trace Output
   ↓
Generate Submission Artifacts
```

Use synthetic or sanitized examples.

Never expose confidential clinical/customer information.

---

# 34. SOLUTIONS PAGE

Route:

`/solutions`

Create two major sections.

---

## CROs

Headline:

> **Turn Clinical Data Operations into a Competitive Advantage.**

Focus on:

* Reduced manual study-build effort
* Faster study startup
* Consistent study designs
* Reduced statistical programming effort
* Independent QC
* Reconciliation
* Traceability
* Better margins

---

## Pharma & Biotech

Headline:

> **Build and analyze clinical data with greater speed, consistency, and traceability.**

Focus on:

* Faster study startup
* Reproducibility
* Data lineage
* QC
* Submission readiness
* Visibility into vendor deliverables

---

# 35. INVESTOR PAGE

Route:

`/investors`

Hero:

> **Building the Clinical Data Automation Layer.**

---

## Investment thesis

Clindaddy addresses labor-intensive clinical-data workflows at multiple points in the clinical-trial lifecycle.

### Initial wedge

> **FlashEDC**

Protocol-to-EDC automation.

### Downstream expansion

> **FlashAnalysis**

Clinical data → standards → analysis → QC → submission.

### Long-term platform

```text
Protocol
   ↓
Study Build
   ↓
Data Capture
   ↓
Standards
   ↓
Analysis
   ↓
QC
   ↓
Submission
```

---

# 36. INVESTOR CREDIBILITY RULES

Be precise and honest.

Preferred wording:

> **Working technology with a clear path toward productization.**

Do not claim:

* Large commercial revenue
* Production customer deployments
* Regulatory approval
* Commercial traction
* Full autonomy
* Vendor neutrality

unless those claims are explicitly provided later.

Do not invent:

* customers
* partnerships
* investors
* funding
* revenue
* market statistics
* certifications
* regulatory status

---

# 37. CURRENT TECHNOLOGY POSITION

The available source material describes working technology/MVPs rather than mature commercial SaaS products.

For FlashAnalysis, the current source describes approximately:

> **2,500 passing tests**

and a policy-driven approach to real versus synthetic data.

For FlashEDC, the current source describes:

> a working internal CRO tool with strong engine fidelity and current dependency on a specific EDC environment.

If these facts are displayed, present them accurately and without exaggeration.

Do not convert internal technical metrics into claims of commercial success.

---

# 38. ABOUT PAGE

Route:

`/about`

Answer:

* Why was Clindaddy created?
* What problem does it solve?
* Why this approach?
* What is the long-term vision?
* Who is building it?

Do NOT invent founder credentials.

If founder information is not provided, create an elegant editable placeholder section.

---

# 39. CONTACT PAGE

Route:

`/contact`

Hero:

> **Start a Conversation.**

Form:

```text
Name
Company
Role
Email
Interest

[ ] Investment
[ ] Product Demo
[ ] Pilot
[ ] Partnership
[ ] Other

Message

[Submit]
```

Primary CTA:

> **Request a Demo**

Create a clean frontend form.

If no backend/email provider is configured, create a clean abstraction so a provider can be connected later.

Do not fake successful form submissions.

---

# 40. GLOBAL CTA STRATEGY

Primary CTA throughout the website:

> **Request a Demo**

Secondary CTAs:

* Explore the Platform
* Explore FlashEDC
* Explore FlashAnalysis
* See How It Works
* Talk to Clindaddy
* Start a Conversation

Keep CTA language consistent.

---

# 41. ANIMATION

Use animation intentionally.

Good uses:

* lifecycle progression
* workflow arrows
* diagram highlighting
* card reveals
* subtle section entrance
* product UI transitions
* hover states

Avoid:

* excessive bouncing
* spinning graphics
* excessive parallax
* distracting motion
* animation on every element

Respect:

`prefers-reduced-motion`

---

# 42. RESPONSIVE DESIGN

The website must work exceptionally well on:

* 1440px desktop
* 1280px desktop
* 1024px tablet
* 768px tablet
* 390px mobile
* 375px mobile

Do not merely shrink desktop layouts.

Complex workflow diagrams should be redesigned for mobile.

Navigation must become a proper mobile menu.

Buttons must have suitable touch targets.

Typography must scale appropriately.

---

# 43. ACCESSIBILITY

Implement:

* semantic HTML
* keyboard navigation
* visible focus states
* ARIA labels where necessary
* accessible forms
* adequate contrast
* meaningful alt text
* reduced-motion support

Do not sacrifice accessibility for visual effects.

---

# 44. SEO

Use the Next.js Metadata API.

Every major page needs:

* title
* description
* Open Graph metadata
* Twitter/X metadata
* canonical URL

Homepage:

**Title:**

> Clindaddy | Clinical Data Automation from Protocol to Submission

**Description:**

> Clindaddy automates clinical data workflows from protocol and EDC study design through analysis, QC, and regulatory submission.

Create sensible page-specific metadata for every route.

Do not keyword-stuff.

---

# 45. ANALYTICS

The MVP should have analytics capability.

Recommended:

> Vercel Analytics

Track important events such as:

* Demo CTA clicks
* Contact form submissions
* Investor CTA clicks
* Product page visits
* Demo interaction
* Video completion if videos are added

Primary KPI:

> Qualified conversations generated.

---

# 46. PRODUCT MATURITY LANGUAGE

The website must accurately represent product maturity.

Preferred language:

> **Working technology with a clear path toward productization.**

Do not present prototypes as mature enterprise SaaS.

Do not imply regulatory approval.

Do not imply autonomous operation.

Do not imply production deployment unless explicitly documented.

---

# 47. WEBSITE COPY PRINCIPLES

## Do

* Use precise clinical terminology.
* Explain technical concepts simply.
* Show workflows visually.
* Emphasize trust.
* Emphasize traceability.
* Distinguish AI assistance from deterministic execution.
* Show evidence.
* Be honest about maturity.
* Use technical details strategically.

## Do not

* Call everything "AI-powered."
* Claim full autonomy.
* Claim regulatory approval.
* Claim commercial traction that does not exist.
* Use vague AI buzzwords.
* Overpromise accuracy.
* Present prototypes as mature SaaS.
* Claim vendor neutrality before it exists.

---

# 48. TECHNICAL ARCHITECTURE PRINCIPLES

The website code itself should be:

* modular
* typed
* maintainable
* responsive
* accessible
* SEO-friendly

Use TypeScript interfaces/types for structured content.

Example:

```ts
type Product = {
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
};
```

Keep content separate from presentation where practical.

Do not put huge blocks of repeated content directly into JSX if they can be represented cleanly as structured data.

---

# 49. PERFORMANCE

Optimize for:

* fast initial page load
* optimized images
* minimal JavaScript where possible
* appropriate server/client component usage
* lazy loading for videos
* optimized fonts
* minimal unnecessary dependencies

Do not add large libraries merely for visual effects.

---

# 50. SECURITY / PRIVACY

The website should not expose:

* real patient data
* confidential study data
* customer data
* credentials
* API keys
* internal URLs
* proprietary datasets

Use synthetic/sanitized demo content.

Never hardcode secrets.

Use environment variables for any future integrations.

---

# 51. NO FABRICATION RULE

This rule overrides the temptation to make the site sound more impressive.

If information is not in this specification:

**DO NOT INVENT IT.**

This includes:

* customers
* revenue
* funding
* investors
* employees
* partnerships
* certifications
* regulatory approvals
* accuracy percentages
* market size
* deployment numbers
* clinical trial sponsors
* founder credentials
* testimonials

Use placeholders where necessary.

---

# 52. DEVELOPMENT PHASES

## Phase 1 — Foundation

Build:

* project setup
* design system
* typography
* color system
* navigation
* footer
* logo treatment
* responsive foundation

---

## Phase 2 — Core Website

Build:

1. Home
2. Platform
3. FlashEDC
4. FlashAnalysis
5. Technology
6. Trust

---

## Phase 3 — Business Development

Build:

7. Solutions
8. Contact
9. Demo components

---

## Phase 4 — Fundraising

Build:

10. Investors
11. Technology evidence
12. Traction section where supported
13. Founder section once supplied

---

## Phase 5 — Product Demonstration

Add:

* product videos
* interactive demos
* sanitized examples
* architecture diagrams
* sample outputs

---

# 53. ACCEPTANCE CRITERIA

The website is ready for launch when:

* [ ] Clindaddy is clearly identified as the company.
* [ ] FlashEDC is clearly identified as Protocol → EDC.
* [ ] FlashAnalysis is clearly identified as Data → Analysis → Submission.
* [ ] The complete lifecycle is visually understandable.
* [ ] No CytelAI branding remains.
* [ ] No FlashDM branding remains.
* [ ] AI is presented as enabling technology.
* [ ] Deterministic execution is clearly explained.
* [ ] Human review is clearly explained.
* [ ] Independent QC is clearly explained.
* [ ] Traceability is clearly explained.
* [ ] Current product maturity is represented honestly.
* [ ] Demo CTA works.
* [ ] Investor CTA works.
* [ ] Contact page works.
* [ ] Website is responsive.
* [ ] HTTPS-ready deployment works.
* [ ] Analytics can be configured.
* [ ] SEO metadata exists.
* [ ] No confidential information is exposed.
* [ ] TypeScript has no errors.
* [ ] Production build succeeds.
* [ ] Navigation has no broken links.
* [ ] Mobile navigation works.
* [ ] Forms have proper validation.
* [ ] Accessibility basics are implemented.
* [ ] No fabricated claims exist.

---

# 54. FINAL DESIGN TEST

Before declaring the project complete, review the website as four different people.

## Investor

Can I understand:

* what Clindaddy does?
* why it matters?
* why it is difficult?
* what the wedge is?
* how the company can expand?

## CRO executive

Can I understand:

* how FlashEDC helps?
* how FlashAnalysis helps?
* where labor is removed?
* where QC improves?

## Pharma/biotech executive

Can I understand:

* how this affects study startup?
* data quality?
* traceability?
* submission readiness?

## CTO / technical buyer

Can I understand:

* where AI is used?
* where deterministic execution occurs?
* how QC works?
* how traceability works?
* how human review works?

If any of these audiences cannot understand the story within approximately 30 seconds, improve the page.

---

# 55. FINAL QUALITY BAR

The finished website should feel like a company that could credibly present itself to:

* a pharma executive
* a CRO executive
* a clinical-data leader
* a CTO
* a serious healthcare investor

The website should communicate:

**Clindaddy**

> **From Protocol to Submission.**

**FlashEDC**

> **Protocol → EDC**

**FlashAnalysis**

> **Clinical Data → Analysis → Submission**

And the technology philosophy:

> **AI assists. Deterministic systems execute. Humans approve. Everything is traceable.**

Prioritize:

> **Clarity → Credibility → Visual Quality → Usability → Maintainability**

---

# 56. BUILD INSTRUCTION

Do not stop at a wireframe.

Do not return only HTML snippets.

Do not merely describe what should be built.

**Create the actual working Next.js application.**

Implement all core routes, components, styling, responsive layouts, animations, metadata, and navigation described above.

After implementation:

1. Run the type checker.
2. Run linting.
3. Run the production build.
4. Fix all errors.
5. Inspect every page.
6. Check desktop and mobile layouts.
7. Check all navigation links.
8. Check all CTAs.
9. Remove accidental placeholder/fabricated content.
10. Verify there is no CytelAI or FlashDM branding.
11. Verify the final visual hierarchy.
12. Ensure the final website communicates the Protocol → Submission story immediately.

The result should be a **complete, polished MVP website**, not a prototype description.

### One important change I made

I merged your original PRD with the build prompt, but I also made one strategic improvement: **I separated product requirements from implementation constraints while keeping them in one document.**

That matters because an AI coding agent can otherwise start "interpreting" the PRD and make decisions like:

* inventing customer logos,
* adding fake testimonials,
* claiming regulatory compliance,
* turning FlashEDC into a generic AI chatbot,
* making FlashAnalysis sound like an autonomous statistical programmer,
* or building only a pretty landing page instead of the actual multi-page site.

The combined version explicitly prevents those behaviors while still giving the model freedom to make **good UI/engineering decisions**.

If you're going to give this to **Claude Code/Cursor/etc. inside your existing repository**, I would use this as the master `PRD.md` and then give the agent one short instruction: **"Read PRD.md and implement it completely."**
