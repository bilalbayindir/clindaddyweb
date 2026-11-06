/**
 * Structured site content.
 *
 * Copy lives here rather than inside JSX so pages stay presentational and the
 * same facts can be reused across routes without drifting out of sync.
 *
 * Sourcing rule: every claim below is one ClinDaddy can stand behind today.
 * No customers, revenue, funding rounds, certifications, or measured customer
 * results are asserted. Where a number appears it is an internal engineering
 * benchmark and is labelled as such.
 */

/* ==========================================================================
   Shared types
   ========================================================================== */

export type Capability = {
  title: string;
  description: string;
  /** True where the capability is not yet live, so the UI can say so inline. */
  inDevelopment?: boolean;
};

export type WorkflowStep = {
  title: string;
  description?: string;
  inDevelopment?: boolean;
  speed?: string;
};

export type Product = {
  index: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  capabilities: string[];
  inDevelopmentCapabilities?: string[];
  detail: Capability[];
  workflow: WorkflowStep[];
  href: string;
};

/* ==========================================================================
   Lifecycle — protocol to submission
   ========================================================================== */

export type LifecycleStage = {
  id: string;
  title: string;
  description: string;
  inDevelopment?: boolean;
  speed?: string;
};

export const lifecycleStages: LifecycleStage[] = [
  {
    id: "protocol",
    title: "Protocol",
    description: "The protocol and its amendments define what the study must collect.",
  },
  {
    id: "ecrf",
    title: "eCRFs",
    description: "The protocol is read once and turned into CDASH-aligned visits, forms and fields.",
  },
  {
    id: "edc",
    title: "EDC",
    description: "Sites enter data into FlashEDC's own runtime, against the reviewed design.",
  },
  {
    id: "sdtm",
    title: "SDTM",
    description: "Collected data is mapped to CDISC SDTM submission datasets.",
  },
  {
    id: "adam",
    title: "ADaM",
    description: "Analysis-ready datasets and their derivations are produced.",
  },
  {
    id: "tlf",
    title: "TLFs",
    description: "Tables, listings and figures are generated with traceability to source.",
  },
];

export const lifecycleOwnership = {
  flashedc: {
    label: "FlashEDC",
    tagline: "Protocol → eCRFs → EDC",
    stageIds: ["protocol", "ecrf", "edc"],
  },
  flashanalysis: {
    label: "FlashAnalysis",
    tagline: "Clinical data → SDTM → ADaM → TLFs",
    stageIds: ["sdtm", "adam", "tlf"],
  },
} as const;

/* ==========================================================================
   Products
   ========================================================================== */

export const products: Product[] = [
  {
    index: "01",
    slug: "flashedc",
    name: "FlashEDC",
    tagline: "Protocol → eCRFs → EDC",
    summary:
      "An AI protocol analyzer, an eCRF designer with a review assistant, and ClinDaddy's own EDC runtime for data collection.",
    description:
      "FlashEDC reads a clinical trial protocol and produces a review-ready study design — visits, forms, fields, CDASH-aligned codelists and edit checks — then runs the study on its own EDC runtime. Sites enter data against the design a reviewer approved, and every change is versioned.",
    capabilities: [
      "Protocol Analyzer",
      "AI eCRF Designer",
      "Design assistant",
      "Review-ready study builds",
      "CDASH field IDs and codelists",
      "Edit-check generation",
      "Database specifications",
      "Own EDC runtime",
      "Versioned designs",
      "Human review",
      "Second-eye QC",
    ],
    detail: [
      {
        title: "Protocol Analyzer",
        description:
          "Reads the protocol document as supplied and extracts the schedule of assessments, endpoints and data-collection intent that define the study.",
      },
      {
        title: "AI eCRF Designer",
        description:
          "Turns that reading into a panel-style study design: visits, forms, fields, controls and CDASH-aligned codelists. Alternative layouts are supported, and manually built forms can be reorganised automatically.",
      },
      {
        title: "Design assistant",
        description:
          "A conversational assistant drafts and revises design elements. The user always has the final say; every suggestion is editable and reviewable before it reaches the study.",
      },
      {
        title: "Study workspace",
        description:
          "Sponsors sign in, open an existing study or load a new protocol. Each study keeps its own design, versions and review history.",
      },
      {
        title: "Versioning",
        description:
          "A published design is never edited in place. Updates create a new version, so the design a site collected against remains reconstructable.",
      },
      {
        title: "EDC data collection",
        description:
          "FlashEDC includes its own EDC runtime. Sites and subjects enter data against the approved design, with the structure that was reviewed at build time being the structure data is captured against.",
      },
      {
        title: "Standards",
        description:
          "CDASH field identifiers, codelists and eCRF naming are applied at design time, so the study starts aligned with the standards its submission will need.",
      },
      {
        title: "Review and QC",
        description:
          "Generated work arrives as a draft. A qualified reviewer corrects it, a second adversarial pass looks for defects, and approval is an explicit act by a named person.",
      },
    ],
    workflow: [
      { title: "Protocol", description: "Protocol supplied in PDF, DOCX, TXT or RTF." },
      { title: "Protocol analysis", description: "Assessments, endpoints and collection intent extracted." },
      { title: "Study skeleton", description: "Visits and the assessment matrix drafted for review." },
      { title: "Review", description: "A study builder corrects the skeleton before expansion." },
      { title: "eCRFs & fields", description: "Forms, fields, controls and codelists generated." },
      { title: "Edit checks", description: "Check specifications and programming code generated." },
      { title: "Second-eye QC", description: "Adversarial review; unresolved issues go to a human." },
      { title: "EDC study", description: "The reviewed design runs on FlashEDC's EDC runtime." },
      { title: "Data collection", description: "Sites enter data against the approved, versioned design." },
    ],
    href: "/flashedc",
  },
  {
    index: "02",
    slug: "flashanalysis",
    name: "FlashAnalysis",
    tagline: "Clinical data → SDTM → ADaM → TLFs",
    summary:
      "SDTM, ADaM and TLF automation with independent QC, traceability and submission artifacts — from FlashEDC data or any EDC export.",
    description:
      "FlashAnalysis takes clinical data from FlashEDC, another EDC, or the sponsor's own specifications and produces CDISC SDTM and ADaM datasets, tables, listings and figures, independent QC code, and the submission artifacts that describe them. It works with any EDC's raw data, so a sponsor does not have to switch systems.",
    capabilities: [
      "Any EDC input",
      "SDTM",
      "ADaM",
      "TLFs",
      "Independent QC in SAS, R and SQL",
      "Traceability",
      "Define-XML",
      "aCRF",
      "cSDRG",
      "ADRG",
      "eCTD-ready package",
      "Pinnacle 21 clean-up",
    ],
    detail: [
      {
        title: "Inputs at every step",
        description:
          "Accepts FlashEDC data, an export from any other EDC, or the sponsor's own specifications. A study does not have to start on FlashEDC to use FlashAnalysis.",
      },
      {
        title: "SDTM",
        description:
          "Maps collected data into CDISC SDTM domains using deterministic processing, with the mapping recorded against each source variable.",
      },
      {
        title: "ADaM",
        description:
          "Builds analysis-ready datasets and the derivations behind them, with each derivation tied to its specification.",
      },
      {
        title: "TLFs",
        description:
          "Generates tables, listings and figures from specifications, with every value traceable to the records that produced it.",
      },
      {
        title: "Independent QC",
        description:
          "QC re-implements the computation by a different route and compares results. Downloadable SAS, R and SQL QC code is produced at each step, rather than a second run of the production code.",
      },
      {
        title: "Traceability page",
        description:
          "Inputs, process files and outputs are exposed per step as downloads, so a reviewer can follow any number back to its source.",
      },
      {
        title: "Submission artifacts",
        description:
          "Define-XML, aCRF, cSDRG, ADRG and an eCTD-ready clinical data package are assembled from the same sources as the datasets they describe.",
      },
      {
        title: "Pinnacle 21 clean-up",
        description:
          "Submission datasets are checked and cleaned against Pinnacle 21 rules before the package is handed over.",
      },
    ],
    workflow: [
      { title: "Clinical data", description: "FlashEDC data, any EDC export, or sponsor specifications." },
      { title: "SDTM", description: "Deterministic mapping to CDISC SDTM domains." },
      { title: "ADaM", description: "Analysis-ready datasets and recorded derivations." },
      { title: "TLFs", description: "Tables, listings and figures with source traceability." },
      { title: "Independent QC", description: "Separate implementation in SAS, R and SQL." },
      { title: "Submission artifacts", description: "Define-XML, aCRF, cSDRG, ADRG, eCTD package." },
      { title: "Review", description: "Differences and outputs reviewed and approved by a person." },
    ],
    href: "/flashanalysis",
  },
];

export const flashedc = products[0];
export const flashanalysis = products[1];

/* ==========================================================================
   Roadmap
   ========================================================================== */

export type RoadmapItem = {
  name: string;
  label: string;
};

export type RoadmapStage = {
  id: string;
  stage: string;
  timeline: string;
  status: "available" | "in-development" | "planned" | "vision";
  statusLabel: string;
  description: string;
  items: RoadmapItem[];
};

export const roadmapStages: RoadmapStage[] = [
  {
    id: "today",
    stage: "Today",
    timeline: "Available now",
    status: "available",
    statusLabel: "Available",
    description:
      "Two finished products, demo-ready today: study build and EDC data collection, then submission outputs from any EDC's data.",
    items: [
      { name: "FlashEDC", label: "AI study build and EDC data collection" },
      { name: "FlashAnalysis", label: "SDTM, ADaM, TLFs, Define-XML and reviewer guides" },
    ],
  },
  {
    id: "next",
    stage: "Next",
    timeline: "2027",
    status: "in-development",
    statusLabel: "In development",
    description:
      "The first new module on the same protocol-derived data model: randomisation and trial supply, integrated with the study the platform already knows.",
    items: [{ name: "RTSM / IRT", label: "Randomisation and trial supply management" }],
  },
  {
    id: "then-patient",
    stage: "Then",
    timeline: "Patient-facing",
    status: "planned",
    statusLabel: "Planned: same data model",
    description:
      "Patient-facing capture, designed on the same study model rather than bolted on as a separate system.",
    items: [
      { name: "eConsent", label: "Electronic informed consent" },
      { name: "ePRO", label: "Electronic patient-reported outcomes" },
      { name: "eCOA", label: "Electronic clinical outcome assessments" },
      { name: "eSource", label: "Direct source capture" },
    ],
  },
  {
    id: "then-ops",
    stage: "Then",
    timeline: "Trial operations",
    status: "planned",
    statusLabel: "Planned",
    description:
      "The operational systems a sponsor or CRO runs alongside the clinical data, connected to the same study identity.",
    items: [
      { name: "CTMS", label: "Clinical trial management" },
      { name: "eTMF", label: "Electronic trial master file" },
    ],
  },
  {
    id: "vision",
    stage: "Vision",
    timeline: "The destination",
    status: "vision",
    statusLabel: "Vision",
    description:
      "Every system and service a small sponsor needs to run a trial, on one platform — an AI CRO, with software as the instrument.",
    items: [{ name: "AI CRO", label: "One platform for the trial a small sponsor runs" }],
  },
];

export const roadmapNote =
  "Each module reuses the protocol-derived data model, so new modules ship faster and integrate on day one. The Today column is what is available now.";

/* ==========================================================================
   Homepage — problem, why now
   ========================================================================== */

export const problemPoints: Capability[] = [
  {
    title: "Protocol-to-eCRF build is manual",
    description:
      "Study teams read the protocol by hand and rebuild visits, forms, fields, codelists and edit checks for every study.",
  },
  {
    title: "Submission programming is repeated",
    description:
      "SDTM, ADaM and TLF work is re-specified and re-programmed study after study, even when the standards have not changed.",
  },
  {
    title: "Enterprise tools are priced for big pharma",
    description:
      "Small and mid-size sponsors carry the same data burden with a fraction of the systems team — and often with no internal CDISC programmers at all.",
  },
];

export const whyNow: Capability[] = [
  {
    title: "CDISC standards are mandatory",
    description:
      "FDA requires CDISC study data standards for regulated submissions, so every sponsor needs SDTM, ADaM and Define-XML — not only the large ones.",
  },
  {
    title: "Frontier models can read a protocol",
    description:
      "A full protocol can now be read and returned as structured specifications, which makes protocol-to-eCRF automation tractable in a way it was not a few years ago.",
  },
  {
    title: "Lean biotechs want fixed prices",
    description:
      "Small sponsors would rather buy one deliverable at a fixed price than license an enterprise platform and hire a team to operate it.",
  },
];

/* ==========================================================================
   Pilot program
   ========================================================================== */

export const pilotProgram = {
  headline: "One real deliverable, before any long-term commitment.",
  intro:
    "The pilot program is for the first customers who want to test ClinDaddy on a live study rather than a slide deck. A pilot is one bounded piece of work, delivered with QC evidence, at a discounted price.",
  audiences: [
    {
      title: "US small and mid-size biotech sponsors",
      description: "Phase I–II sponsors with a protocol to build or data ready for SDTM, ADaM and TLFs.",
    },
    {
      title: "Boutique CROs and biostatistics firms",
      description:
        "Teams that want additional EDC build or programming capacity without adding headcount — including white-label FlashAnalysis output.",
    },
  ],
  what: [
    {
      title: "An SDTM / ADaM / TLF package",
      description:
        "One package built from your current EDC data, with independent QC code and the submission artifacts that go with it.",
    },
    {
      title: "One FlashEDC study build",
      description:
        "One protocol turned into a review-ready study design and run on FlashEDC's EDC runtime, ready for sites.",
    },
  ],
  steps: [
    { title: "Intro call", description: "Scope, data source and the deliverable are agreed in one conversation." },
    { title: "Handoff", description: "You provide the protocol or the data and specifications." },
    { title: "Delivery", description: "The deliverable is produced with QC evidence and traceability." },
    { title: "Review", description: "We walk through the output, the QC results and the limits together." },
    { title: "Next study", description: "If it works, the next study is scoped on a full-price contract." },
  ],
  terms: [
    "Discounted pilot pricing in exchange for a reference and a case study.",
    "A written path to a full-price per-study contract after the pilot.",
    "Fixed price per deliverable; pricing is scoped per study. No price numbers are published.",
    "Partner track: CROs and biostatistics firms can white-label FlashAnalysis output.",
  ],
  cta: "Apply for a pilot",
} as const;

/* ==========================================================================
   Technology
   ========================================================================== */

export const technologyPrinciples: Capability[] = [
  {
    title: "AI assists with interpretation",
    description:
      "Generative AI is used where language is the input — reading protocols, drafting specifications, structuring ambiguous source material.",
  },
  {
    title: "Deterministic engines execute",
    description:
      "Specifications are executed by deterministic engines. Clinical outputs are produced by defined processing, not by a language model.",
  },
  {
    title: "Humans approve",
    description:
      "Reviewers see drafts, corrections and QC results, and are the ones who approve a study design or a deliverable.",
  },
  {
    title: "Everything is traceable",
    description:
      "Outputs connect back to the specification and the source record behind them, with an append-only audit log.",
  },
];

export const technologyConcepts: Capability[] = [
  {
    title: "Six-pass AI pipeline",
    description:
      "Protocol interpretation is decomposed into passes rather than one prompt, so each pass has a bounded job and a reviewable output.",
  },
  {
    title: "Routed prompting",
    description:
      "Different parts of a document are routed to prompts suited to that content instead of one generic path.",
  },
  {
    title: "Human review checkpoints",
    description:
      "The pipeline stops at defined points where a person reviews and corrects before downstream work builds on the result.",
  },
  {
    title: "Editable outputs",
    description:
      "Generated artifacts are working documents. Corrections are made in the artifact, not by re-running and hoping for a better answer.",
  },
  {
    title: "Background jobs",
    description:
      "Long analyses run as jobs with progress, cancellation and resume, because protocol analysis is not an instant operation.",
  },
  {
    title: "Provider-swappable AI",
    description:
      "The model layer is separable from the pipeline, so the provider behind a given pass can change without redesigning the workflow.",
  },
  {
    title: "Second-eye QC",
    description:
      "A separate adversarial pass reviews generated work for defects and escalates what it cannot safely resolve.",
  },
  {
    title: "Append-only audit log",
    description:
      "Every design change, review decision and processing run is recorded rather than overwritten.",
  },
];

export const technologyStack = [
  { layer: "Services", detail: ".NET 10" },
  { layer: "Data", detail: "PostgreSQL with JSON document storage" },
  { layer: "Interface", detail: "React and TypeScript" },
  { layer: "AI", detail: "Model-agnostic layer using frontier LLMs" },
] as const;

/* ==========================================================================
   Trust & governance
   ========================================================================== */

export type TrustPillar = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  body: string[];
  diagramLabel: string;
  points: string[];
};

export const trustPillars: TrustPillar[] = [
  {
    id: "regulatory",
    index: "01",
    eyebrow: "Built for regulated use",
    title: "Designed to the controls a regulated submission expects.",
    body: [
      "ClinDaddy is built to 21 CFR Part 11 and GxP standards, with the controls that posture depends on: audit trail, e-signatures, role-based access and versioning.",
      "Study data is handled under CDISC conventions at design time — CDASH-aligned field identifiers and codelists — so the study starts close to the standards its submission will need.",
      "Validation documentation is available on request under NDA. We do not claim a third-party certification or audit that has not taken place.",
    ],
    diagramLabel: "21 CFR Part 11 · GxP · CDISC",
    points: [
      "Audit trail, e-signatures, role-based access and versioning",
      "CDASH-aligned design; SDTM, ADaM and Define-XML downstream",
      "Validation documentation available under NDA",
    ],
  },
  {
    id: "deterministic-execution",
    index: "02",
    eyebrow: "Deterministic execution",
    title: "The model drafts. The engine executes.",
    body: [
      "Generative AI assists with interpretation and specification generation — the parts of the work that involve reading and structuring language.",
      "Deterministic engines execute those specifications. The AI does not fabricate final clinical numbers.",
      "An interpretation can be reviewed, corrected and re-run. A number produced by a language model can only be trusted or distrusted.",
    ],
    diagramLabel: "AI → Specification → Deterministic engine → Clinical output",
    points: [
      "AI output is always a reviewable artifact, never a final value",
      "Deterministic processing is repeatable and produces the same result",
      "Specifications are the boundary between interpretation and execution",
    ],
  },
  {
    id: "independent-qc",
    index: "03",
    eyebrow: "Independent QC",
    title: "Production and QC are separated on purpose.",
    body: [
      "Production computation and QC computation are intentionally separated.",
      "The goal is to avoid the failure mode where QC reproduces the same implementation and agrees with the same bug — a second run of the same code is not a second opinion.",
      "Independent QC re-implements the computation, then compares results. Cross-artifact QC extends that check across datasets, specifications and outputs.",
    ],
    diagramLabel: "Source data → Production and independent QC → Compare → Review",
    points: [
      "QC re-implements the computation rather than re-running it",
      "Downloadable SAS, R and SQL QC code at each step",
      "Differences are surfaced for review, never silently reconciled",
    ],
  },
  {
    id: "ai-governance",
    index: "04",
    eyebrow: "AI governance",
    title: "Models never make the final decision.",
    body: [
      "AI drafts; a qualified person reviews and approves. Every AI suggestion is logged in the audit trail and remains editable.",
      "The model layer is separable from the pipeline, so the provider behind a given pass can change without redesigning the workflow.",
      "Sponsor data is handled under the terms set out during evaluation; data-handling and hosting details are shared under NDA.",
    ],
    diagramLabel: "AI draft → Human review → Correction → Approval → Audit log",
    points: [
      "Models never make final decisions",
      "Every AI output is reviewable and logged",
      "Provider-swappable model layer",
    ],
  },
];

export const trustPrinciples = [
  "We do not claim third-party security certifications or regulatory approval. None are held.",
  "We do not publish customer names, testimonials or measured customer results before they exist.",
  "Validation documentation is shared under NDA rather than summarized as a marketing claim.",
] as const;

/* ==========================================================================
   Differentiation
   ========================================================================== */

export const differentiators: Capability[] = [
  {
    title: "One platform, two engines",
    description:
      "Study build, EDC data collection and submission outputs share one study identity, so the protocol is not re-described at every handoff.",
  },
  {
    title: "AI plus deterministic execution",
    description:
      "Generative AI assists with interpretation. Deterministic engines produce clinical outputs.",
  },
  {
    title: "Independent QC built in",
    description:
      "Production and QC are intentionally separated, with downloadable QC code at each step.",
  },
  {
    title: "Works with any EDC",
    description:
      "FlashAnalysis accepts any EDC's raw data, so a sponsor does not have to switch systems to use it.",
  },
  {
    title: "Traceable by construction",
    description:
      "Outputs connect back to the specification and source record behind them, with an append-only audit log.",
  },
  {
    title: "Fixed price per deliverable",
    description:
      "One study build, one dataset, one TLF package or one submission QC — scoped and priced per deliverable.",
  },
];

/* ==========================================================================
   Solutions
   ========================================================================== */

export type Solution = {
  id: string;
  audience: string;
  headline: string;
  intro: string;
  outcomes: Capability[];
  relevantProducts: string[];
};

export const solutions: Solution[] = [
  {
    id: "cros",
    audience: "CROs",
    headline: "Add EDC and programming capacity without adding headcount.",
    intro:
      "Study build, data capture and statistical programming are effort-heavy, repeatable and margin-sensitive. FlashEDC builds the study; FlashAnalysis carries it through SDTM, ADaM and TLFs. Both can run alongside your existing systems, and FlashAnalysis output can be white-labelled.",
    outcomes: [
      {
        title: "Overflow study builds",
        description:
          "Turn a protocol into a review-ready EDC study without pulling builders off another study.",
      },
      {
        title: "Overflow programming",
        description:
          "SDTM, ADaM and TLF packages produced with independent QC code you can hand to a sponsor.",
      },
      {
        title: "Consistent designs",
        description:
          "The same generation path across studies produces comparable designs rather than individually improvised ones.",
      },
      {
        title: "White-label partner track",
        description:
          "Deliver FlashAnalysis output under your own brand, with the QC evidence behind it.",
      },
    ],
    relevantProducts: ["FlashEDC", "FlashAnalysis"],
  },
  {
    id: "pharma-biotech",
    audience: "Pharma & Biotech",
    headline: "Fixed-price clinical data deliverables, without switching EDC.",
    intro:
      "Small and mid-size sponsors carry the same data burden as large pharma with a fraction of the team. ClinDaddy delivers one bounded piece at a fixed price — a study build, an SDTM/ADaM/TLF package, or a submission QC — on your EDC or ours.",
    outcomes: [
      {
        title: "Protocol to eCRFs",
        description:
          "A review-ready study design with CDASH-aligned codelists and edit checks, then data collection on FlashEDC's runtime.",
      },
      {
        title: "Submission datasets",
        description:
          "SDTM and ADaM datasets, TLFs, Define-XML and reviewer guides from your current EDC data.",
      },
      {
        title: "Independent QC",
        description:
          "A second implementation in SAS, R and SQL, with the differences surfaced for review.",
      },
      {
        title: "No EDC switch",
        description:
          "FlashAnalysis works with any EDC's raw data, so the platform can sit alongside the system you already run.",
      },
    ],
    relevantProducts: ["FlashEDC", "FlashAnalysis"],
  },
];

/* ==========================================================================
   Demo walkthroughs (synthetic examples only)
   ========================================================================== */

export type DemoStep = {
  title: string;
  description: string;
  artifact: string;
};

export const demos: Record<"flashedc" | "flashanalysis", { steps: DemoStep[]; note: string }> = {
  flashedc: {
    note: "Illustrative walkthrough using a synthetic protocol. No customer or confidential study material is shown.",
    steps: [
      { title: "Upload protocol", description: "Supply the protocol in PDF, DOCX, TXT or RTF.", artifact: "Document intake with format detection and job initialization." },
      { title: "Analyze", description: "The pipeline reads the schedule of assessments and collection intent.", artifact: "Background job with progress, cancellation and resume." },
      { title: "Review study skeleton", description: "Visits and the assessment matrix are reviewed and corrected.", artifact: "Editable visit structure with the assessment matrix." },
      { title: "Generate eCRFs", description: "Forms, fields, controls and CDASH codelists are generated.", artifact: "Form and field definitions with bound codelists." },
      { title: "Generate edit checks", description: "Check specifications and their programming code are produced together.", artifact: "Edit-check specification paired with generated code." },
      { title: "Review", description: "Second-eye QC runs, then reviewers resolve what it escalated.", artifact: "Adversarial review findings with resolution state." },
      { title: "Open the EDC", description: "The approved design runs on FlashEDC; sites enter data against it.", artifact: "Versioned study workspace and EDC data-entry screen." },
    ],
  },
  flashanalysis: {
    note: "Illustrative walkthrough. Datasets, tables and figures shown are synthetic.",
    steps: [
      { title: "Load data", description: "FlashEDC data, any EDC export, or sponsor specifications.", artifact: "Provenance record attached to each delivered dataset." },
      { title: "Generate SDTM", description: "Collected data is transformed into CDISC SDTM deterministically.", artifact: "SDTM domain mapping with the transformation per record." },
      { title: "Generate ADaM", description: "Analysis-ready datasets and their derivations are produced.", artifact: "Derivation specification linked to each analysis variable." },
      { title: "Generate TLFs", description: "Tables, listings and figures are generated with source traceability.", artifact: "Output table with each value linked to its source records." },
      { title: "Run independent QC", description: "QC re-implements the computation in SAS, R and SQL and compares.", artifact: "Comparison report listing matches and differences." },
      { title: "Trace output", description: "Any value can be followed back through its transformations.", artifact: "Lineage view from a figure value back to source records." },
      { title: "Generate submission artifacts", description: "Define-XML, aCRF, cSDRG, ADRG and the eCTD package are assembled.", artifact: "Submission package built from the same sources." },
    ],
  },
};

/* ==========================================================================
   Evidence
   ========================================================================== */

export type EvidenceItem = {
  label: string;
  value: string;
  detail: string;
};

export const evidence: EvidenceItem[] = [
  {
    label: "FlashAnalysis",
    value: "~2,500 automated tests",
    detail:
      "The current FlashAnalysis codebase is covered by approximately 2,500 automated tests. Passing tests describe code health, not commercial traction.",
  },
  {
    label: "FlashEDC",
    value: "Study build + EDC",
    detail:
      "FlashEDC runs protocol analysis, eCRF design and its own EDC data collection. The products are demo-ready today.",
  },
];

export const maturityStatement = {
  headline: "Finished products, available for a live demo.",
  body: [
    "FlashEDC and FlashAnalysis are finished, working products. ClinDaddy is early as a company — there are no customers, case studies or certifications to point to yet — and the products are demo-ready now.",
    "Engineering metrics describe code health and coverage. They are not evidence of commercial traction, and we do not present them as such.",
  ],
} as const;

/* ==========================================================================
   About
   ========================================================================== */

export const aboutPillars: Capability[] = [
  {
    title: "Why ClinDaddy exists",
    description:
      "Clinical trials still depend on enormous amounts of manual data work. The same study is built, programmed, checked and documented by hand at every sponsor and every CRO, and the effort resets with each new study.",
  },
  {
    title: "What we build",
    description:
      "FlashEDC turns a protocol into CDASH-aligned eCRFs and runs the study on its own EDC runtime. FlashAnalysis turns clinical data into SDTM, ADaM and TLFs with independent QC and the submission artifacts behind them.",
  },
  {
    title: "How we build it",
    description:
      "AI is confined to interpretation and drafting. Deterministic engines execute specifications, humans approve the result, and the whole path is traceable. That constraint shapes the architecture more than any feature.",
  },
  {
    title: "Where we are going",
    description:
      "One protocol-derived study model, projected into the systems a trial runs on. EDC is the first projection. RTSM follows in 2027, then patient-facing capture and trial operations, toward an AI CRO.",
  },
];

export const team = {
  heading: "Who is building it",
  lead: "A clinical data insider, building the layer studies are built on.",
  members: [
    {
      name: "Bilal Bayindir",
      role: "Founder & CEO",
      credential: "MS Computer Science, University of Delaware · 13+ years building EDC software",
      bio: "Thirteen years inside EDC software — the layer studies are built on, not the studies themselves. That distinction is the credential: knowledge of how a study build is represented, from the object model and codelist architecture through the edit-check specification and identifier derivations. FlashEDC and FlashAnalysis were designed and built at that layer.",
    },
  ],
  hiring: {
    label: "We're hiring as we grow",
    body: "The next roles are the ones that close the gap between working products and a company that can deliver at scale.",
    roles: [
      "Senior clinical programmer",
      "Life-sciences sales lead",
      "Full-stack engineer",
      "Quality and validation lead",
    ],
  },
} as const;

/* ==========================================================================
   Investors
   ========================================================================== */

export const investorThesis = {
  headline: "Building the clinical data automation layer.",
  intro:
    "ClinDaddy addresses labor-intensive clinical-data workflows at multiple points in the trial lifecycle. The initial wedge is a single, well-bounded deliverable; the expansion follows the data downstream.",
  wedge: {
    label: "Initial wedge",
    product: "FlashEDC",
    statement: "Protocol to eCRFs, then EDC data collection.",
    body: "The narrowest, most repeatable problem in the lifecycle: turning a protocol into a review-ready study design, then capturing data against it. Clear input, reviewable output, measurable cost today.",
  },
  expansion: {
    label: "Downstream expansion",
    product: "FlashAnalysis",
    statement: "Clinical data → SDTM → ADaM → TLFs → submission.",
    body: "The same data continues into standards, analysis, QC and submission artifacts. Each stage is effort-heavy and specification-driven, which is what makes it automatable — and each can be sold as one deliverable.",
  },
  platform: {
    label: "Long-term platform",
    statement: "One canonical study model, projected into the systems a trial runs on.",
    body: "The protocol is read once into a system-neutral study model. Today it projects into EDC and the downstream submission chain. RTSM is in development for 2027; patient-facing capture and trial operations follow, toward an AI CRO.",
  },
  gtm: {
    label: "Go-to-market",
    statement: "Land with a deliverable, expand with a licence, scale through partners.",
    body: "A fixed-price SDTM/ADaM/TLF package or one FlashEDC study build is the first sale. The per-study software licence follows, and CROs and biostatistics firms can white-label FlashAnalysis output. Discounted pilots are available for the first customers.",
  },
} as const;

export const investorQuestions: Capability[] = [
  {
    title: "What problem is being solved?",
    description:
      "Manual translation work across the clinical-data lifecycle: protocol to study design, collected data to standards, standards to analysis, analysis to submission artifacts.",
  },
  {
    title: "Why is the problem valuable?",
    description:
      "The work is high-volume, high-consequence and repeated per study by every sponsor and CRO. Errors are expensive and late-stage corrections are more expensive still.",
  },
  {
    title: "Why is this difficult?",
    description:
      "Clinical work cannot be fully autonomous. It requires deterministic execution, independent QC, human approval and traceability — constraints that rule out the obvious approaches.",
  },
  {
    title: "What technology exists?",
    description:
      "Two finished products: FlashEDC (protocol analysis, eCRF design and EDC runtime) and FlashAnalysis (~2,500 automated tests, SDTM/ADaM/TLF, independent QC, Define-XML and reviewer guides).",
  },
  {
    title: "How does it make money?",
    description:
      "Fixed price per deliverable, a per-study software licence, and discounted paid pilots for the first customers. Pricing is scoped per study.",
  },
  {
    title: "How does it reach customers?",
    description:
      "Land with a fixed-price deliverable, expand to a per-study software licence, and scale through CRO and biostatistics partners who can white-label FlashAnalysis output.",
  },
];
