/**
 * Structured site content.
 *
 * Copy lives here rather than inside JSX so pages stay presentational and the
 * same facts can be reused across routes without drifting out of sync.
 *
 * Sourcing rule: every claim below traces to the approved build specification.
 * Nothing here invents customers, revenue, funding, certifications, regulatory
 * status, market size, or accuracy figures. Where information has not been
 * supplied, the UI shows an explicit placeholder instead.
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
  /** True where the step is not yet live, so the UI can say so inline. */
  inDevelopment?: boolean;
  /** Short speed figure, e.g. "10–30 min", drawn as a bolt beside the step. */
  speed?: string;
};

export type Product = {
  /** "01" / "02" — used as a restrained ordinal marker in the layout. */
  index: string;
  slug: string;
  name: string;
  /** The short positional statement, e.g. "Protocol → EDC & Data Capture". */
  tagline: string;
  summary: string;
  description: string;
  /** Short capability labels used in lists and comparison grids. */
  capabilities: string[];
  /**
   * Capabilities in `capabilities` that are not yet live. Kept as a separate
   * list because `capabilities` is a plain string array reused in several
   * places; the flag rides alongside rather than restructuring it.
   */
  inDevelopmentCapabilities?: string[];
  /** Fully described capabilities used on the product pages. */
  detail: Capability[];
  workflow: WorkflowStep[];
  href: string;
};

/* ==========================================================================
   Lifecycle — the primary visual metaphor
   ========================================================================== */

export type LifecycleStage = {
  id: string;
  title: string;
  description: string;
  /** True where the stage is not yet live, so the rail can say so inline. */
  inDevelopment?: boolean;
  /** Short speed figure, e.g. "10–30 min", drawn as a bolt beside the stage. */
  speed?: string;
};

export const lifecycleStages: LifecycleStage[] = [
  {
    id: "protocol",
    title: "Protocol",
    description: "The sponsor protocol and its amendments define what must be collected.",
  },
  {
    id: "study-build",
    title: "Study Build",
    description: "Visits, forms, fields, code lists, and edit checks become an EDC study design.",
    speed: "10–30 min",
  },
  {
    id: "data-capture",
    title: "Data Capture",
    description: "Sites and subjects enter data into the EDC environment.",
    inDevelopment: true,
  },
  {
    id: "sdtm",
    title: "SDTM",
    description: "Collected data is mapped to CDISC SDTM submission datasets.",
  },
  {
    id: "adam",
    title: "ADaM",
    description: "Analysis-ready datasets and derivations are produced.",
  },
  {
    id: "analysis",
    title: "Analysis",
    description: "Tables, listings, and figures are generated with traceability to source.",
  },
  {
    id: "qc",
    title: "QC",
    description: "Independent and cross-artifact checks review the outputs.",
  },
  {
    id: "submission",
    title: "Submission",
    description: "Define-XML, aCRF, cSDRG, ADRG, and the eCTD-lite package are assembled.",
  },
];

/** The stage ranges each product is accountable for, by lifecycle stage id. */
export const lifecycleOwnership = {
  flashedc: {
    label: "FlashEDC",
    tagline: "Protocol → EDC & Data Capture",
    stageIds: ["protocol", "study-build", "data-capture"],
  },
  flashanalysis: {
    label: "FlashAnalysis",
    tagline: "Clinical Data → Analysis → Submission",
    stageIds: ["sdtm", "adam", "analysis", "qc", "submission"],
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
    tagline: "Protocol → EDC & Data Capture",
    summary:
      "Transform a clinical trial protocol into a structured EDC study build in 10 to 30 minutes — against roughly ten weeks by hand — then capture study data against it.",
    description:
      "FlashEDC analyzes a clinical trial protocol and generates the study build — visits, forms, fields, code lists, edit-check specifications, and the programming code behind them — in 10 to 30 minutes, against roughly ten weeks to do the same build by hand. The same structure is what sites and subjects then capture data against, with human review before anything is finalized.",
    capabilities: [
      "Visit structure",
      "Forms & CRFs",
      "Fields & controls",
      "Code lists",
      "Edit checks",
      "Generated programming code",
      "Human review",
      "Second-eye QC",
      "Excel output",
      "SQL Server output",
      "Data capture",
      "Live study database",
    ],
    inDevelopmentCapabilities: ["Data capture"],
    detail: [
      {
        title: "Study design in minutes",
        description:
          "A protocol becomes a review-ready study design in roughly 10 to 30 minutes, depending on the size of the protocol. That is time to a draft a study builder can review — not time to a live study, which still requires the same review and approval as any build.",
      },
      {
        title: "Protocol analysis",
        description:
          "Accepts the protocol document as supplied — PDF, DOCX, TXT, or RTF — and reads the schedule of assessments, endpoints, and data-collection intent from it.",
      },
      {
        title: "Study structure generation",
        description:
          "Produces the visit and folder structure plus the assessment matrix that determines what is collected at each point in the study.",
      },
      {
        title: "Form generation",
        description:
          "Creates forms and CRFs with their fields, control types, and the code lists those fields draw on.",
      },
      {
        title: "Edit-check generation",
        description:
          "Generates edit-check specifications and the corresponding programming code, so checks are reviewable as specification before they are executed.",
      },
      {
        title: "Human review",
        description:
          "Every generated artifact is editable. Study builders review and correct the output before it is finalized.",
      },
      {
        title: "Second-eye QC",
        description:
          "An adversarial review pass looks for defects in the generated design, resolves what is safe to resolve, and routes everything unresolved to a human reviewer.",
      },
      {
        title: "Data capture",
        description:
          "The study the design produces is also where data is collected. Sites and subjects enter data into the EDC study built from the reviewed design, so the structure that was reviewed at study build is the structure data is captured against.",
        inDevelopment: true,
      },
      {
        title: "Long-running jobs",
        description:
          "Protocol analysis runs as a background job with progress reporting, and can be cancelled or resumed without losing completed work.",
      },
    ],
    workflow: [
      { title: "Protocol", description: "Protocol document supplied in PDF, DOCX, TXT, or RTF." },
      { title: "Protocol Analysis", description: "Schedule of assessments and collection intent extracted." },
      { title: "Study Skeleton", description: "Visit and folder structure with the assessment matrix." },
      { title: "Human Review", description: "The skeleton is reviewed and corrected before expansion." },
      { title: "Forms & Fields", description: "Forms, fields, controls, and code lists generated." },
      { title: "Edit Checks", description: "Check specifications and programming code generated." },
      { title: "Second-Eye QC", description: "Adversarial review; unresolved issues routed to a human." },
      { title: "EDC Study Design", description: "Exportable study design for the EDC environment.", speed: "10–30 min" },
      { title: "Data Capture", description: "Sites and subjects enter data into the EDC study.", inDevelopment: true },
    ],
    href: "/flashedc",
  },
  {
    index: "02",
    slug: "flashanalysis",
    name: "FlashAnalysis",
    tagline: "Clinical Data → Analysis → Submission",
    summary:
      "Transform clinical data into standards, analysis-ready datasets, clinical outputs, QC evidence, and submission artifacts.",
    description:
      "FlashAnalysis automates downstream clinical programming and standards workflows while enforcing deterministic execution, independent QC, and traceability from every output back to the source record.",
    capabilities: [
      "Data intake",
      "Provenance governance",
      "SDTM",
      "ADaM",
      "TLFs",
      "Independent QC",
      "Cross-artifact QC",
      "Define-XML",
      "aCRF",
      "cSDRG",
      "ADRG",
      "eCTD-lite package",
      "Standards governance",
      "Reconciliation",
      "Audit trail",
      "Data lineage",
    ],
    detail: [
      {
        title: "Data intake",
        description:
          "Enforces provenance policies that govern how real and synthetic data may be used, so the origin of a dataset is a first-class property rather than a convention.",
      },
      {
        title: "SDTM",
        description:
          "Transforms clinical data into CDISC SDTM datasets using deterministic processing rather than model-generated values.",
      },
      {
        title: "ADaM",
        description:
          "Creates analysis-ready datasets and the derivations behind them, with each derivation tied to its specification.",
      },
      {
        title: "TLF generation",
        description:
          "Generates tables, listings, and figures with traceability back to the source records that produced each number.",
      },
      {
        title: "Independent QC",
        description:
          "Re-implements the computation independently of production, so QC does not simply reproduce the same implementation and agree with the same defect.",
      },
      {
        title: "Cross-artifact QC",
        description:
          "Checks consistency between datasets, specifications, and outputs — catching the mismatches that per-artifact review misses.",
      },
      {
        title: "Submission metadata",
        description:
          "Generates Define-XML, aCRF, cSDRG, ADRG, and an eCTD-lite package for the submission.",
      },
      {
        title: "Reconciliation",
        description:
          "Compares CRO and vendor deliverables against sponsor outputs and surfaces the differences.",
      },
      {
        title: "Auditability",
        description:
          "Provides append-only audit logging and lineage from any output back to the source records behind it.",
      },
    ],
    workflow: [
      { title: "Clinical Data", description: "Collected data admitted under a provenance policy." },
      { title: "Provenance Gate", description: "Real and synthetic data handled under explicit policy." },
      { title: "SDTM", description: "Deterministic transformation to CDISC SDTM." },
      { title: "ADaM", description: "Analysis-ready datasets and derivations." },
      { title: "TLFs", description: "Tables, listings, and figures with source traceability." },
      { title: "Independent QC", description: "Independent re-implementation and comparison." },
      { title: "Submission Metadata", description: "Define-XML, aCRF, cSDRG, ADRG, eCTD-lite package." },
      { title: "Audit & Lineage", description: "Append-only audit log; outputs traced to source." },
    ],
    href: "/flashanalysis",
  },
];

export const flashedc = products[0];
export const flashanalysis = products[1];

/* ==========================================================================
   Canonical Study Model — the product underneath the products
   ========================================================================== */

/**
 * How fast FlashEDC builds a study.
 *
 * Both numbers describe the *same* build — protocol to a review-ready output,
 * edit-check specifications and programming code included — so the comparison
 * is like for like. The fast number is still not "a live study in 30 minutes",
 * and the note says so; keep the two figures together, or the fast one reads
 * as a claim it is not.
 */
export const flashedcSpeed = {
  headline: "Ten weeks of study build, drafted in under half an hour.",
  lead: "FlashEDC turns a protocol into a review-ready study build in minutes — visits, forms, fields, and code lists, and the edit-check specifications and programming code that go with them. The build still has to be reviewed and approved exactly as any build does; the automation removes the assembly, not the review.",
  note: "The minutes figure is time to a study build ready for human review, not time to a live study. A study going live still follows the same review, approval, and validation path.",
  stats: [
    {
      value: "10–30 min",
      label: "Protocol → review-ready study build",
      detail:
        "Varies with protocol size. Covers the full build: visit and form structure, fields and code lists, edit-check specifications, and the generated programming code.",
    },
    {
      value: "~10 weeks",
      label: "The same build by hand",
      detail: "The effort that build takes manually today — the work the draft replaces.",
    },
  ],
} as const;

/**
 * The unifying idea behind the roadmap: one protocol read becomes a single,
 * system-neutral study model, and that model is *projected* into whichever
 * system a study runs on. Only the EDC projection exists today.
 */
export const canonicalStudyModel: {
  headline: string;
  intro: string;
  pull: string;
  steps: Capability[];
  note: string;
} = {
  headline: "One protocol read, projected into the systems a trial runs on.",
  intro:
    "FlashEDC does not build one system. It reads the protocol once and produces a canonical, system-neutral study model — visits, forms, fields, code lists, edit checks — with each element carrying the protocol page and sentence behind it. That neutral model is the product; each trial system is a projection of it.",
  pull: "EDC is our first projection, not our product. The product is the model underneath it.",
  steps: [
    { title: "Protocol read", description: "The protocol is read once, by the interpretation pipeline." },
    { title: "Canonical study model", description: "A system-neutral design with provenance on every element." },
    { title: "Projection", description: "The model is projected into each target system's design format." },
  ],
  note: "A model that projects into any system is a platform. A build that loads into one vendor's schema is a feature. The projections are the part that has to be proven, target by target — one exists today.",
};

export type RoadmapStatus = "built" | "in-development" | "architected";

export type RoadmapSystem = {
  id: string;
  name: string;
  fullName: string;
  /** What the system does, in plain terms. */
  scope: string;
  status: RoadmapStatus;
  /** The status as it appears to a reader. Kept literal and unembellished. */
  statusLabel: string;
};

/**
 * The systems one protocol read can eventually project into.
 *
 * The status column is written to be read literally. Only EDC is built. Do not
 * upgrade these labels in the telling — presenting a roadmap item as shipped is
 * the fastest way to lose a diligence conversation, and the reason this list is
 * published with its statuses at all.
 */
export const roadmapSystems: RoadmapSystem[] = [
  {
    id: "edc",
    name: "EDC",
    fullName: "Electronic data capture",
    scope: "Visits, forms, edit checks, codelists.",
    status: "built",
    statusLabel: "Built",
  },
  {
    id: "rtsm",
    name: "RTSM / IRT",
    fullName: "Randomisation and trial supply management",
    scope: "Randomisation and supply.",
    status: "in-development",
    statusLabel: "In development",
  },
  {
    id: "esource",
    name: "eSource",
    fullName: "eSource",
    scope: "Source data capture.",
    status: "architected",
    statusLabel: "Architected, not built",
  },
  {
    id: "ctms",
    name: "CTMS",
    fullName: "Clinical trial management system",
    scope: "Trial and site management.",
    status: "architected",
    statusLabel: "Architected, not built",
  },
  {
    id: "etmf",
    name: "eTMF",
    fullName: "Electronic trial master file",
    scope: "Trial master file.",
    status: "architected",
    statusLabel: "Architected, not built",
  },
  {
    id: "epro",
    name: "ePRO",
    fullName: "Electronic patient-reported outcomes",
    scope: "Patient-reported outcomes.",
    status: "architected",
    statusLabel: "Architected, not built",
  },
  {
    id: "ecoa",
    name: "eCOA",
    fullName: "Electronic clinical outcome assessments",
    scope: "Clinical outcome assessments.",
    status: "architected",
    statusLabel: "Architected, not built",
  },
  {
    id: "econsent",
    name: "eConsent",
    fullName: "Electronic informed consent",
    scope: "Electronic informed consent.",
    status: "architected",
    statusLabel: "Architected, not built",
  },
];

export const roadmapNote =
  "Read the status column literally. Only EDC is built, against development builds. Everything below it is the roadmap this work points at, not capability we have today. The claim worth making is architectural, and it is true now: the same neutral study model that projects into an EDC is what will project into a different system.";

/**
 * The systems still ahead of us — the roadmap minus what is already built.
 * Derived rather than hand-listed so the "coming soon" diagram can never drift
 * out of step with the status column it is drawn from.
 */
export const plannedSystems: RoadmapSystem[] = roadmapSystems.filter(
  (system) => system.status !== "built",
);

/**
 * The end state, said once and honestly. This is a destination, never the
 * present tense, and it is only ever stated alongside the status column above.
 */
export const aiCroDestination = {
  headline: "The destination is an AI CRO.",
  body: "A CRO is paid to do the work of running a trial, with software as its instrument. Software that can produce trial systems from a single protocol read points somewhere further: a CRO whose instrument is that software. That is the destination this architecture points at — not where ClinDaddy is today.",
  today:
    "Today ClinDaddy is a clinical data automation company with two engines. EDC is built; RTSM is in development; the rest of the systems above are architected, not built.",
} as const;

/* ==========================================================================
   Homepage — the problem
   ========================================================================== */

export const problemPoints: Capability[] = [
  {
    title: "Protocol interpretation",
    description:
      "Study teams read the protocol by hand and translate its intent into a design that can be built.",
  },
  {
    title: "EDC study construction",
    description:
      "Visits, forms, fields, controls, and code lists are assembled manually in the EDC environment.",
  },
  {
    title: "Edit-check specification and programming",
    description:
      "Checks are written as specifications, then implemented again as code in the EDC environment.",
  },
  {
    title: "Data standards transformation",
    description:
      "Collected data is mapped into SDTM and ADaM by programming that has to be maintained study after study.",
  },
  {
    title: "Statistical programming",
    description:
      "Tables, listings, and figures are produced by hand-written programs, each with its own derivations.",
  },
  {
    title: "Quality control",
    description:
      "QC is a second full effort, and its value depends on it being genuinely independent of the first.",
  },
  {
    title: "Reconciliation",
    description:
      "CRO and vendor deliverables are compared against sponsor outputs largely through manual review.",
  },
  {
    title: "Submission documentation",
    description:
      "Define-XML, aCRF, cSDRG, and ADRG are assembled and kept consistent with the datasets they describe.",
  },
  {
    title: "Audit and traceability",
    description:
      "Reconstructing why an output looks the way it does often means tracing across tools and teams.",
  },
];

/* ==========================================================================
   Platform — how the two products connect
   ========================================================================== */

export const connectionPoints: Capability[] = [
  {
    title: "One study identity",
    description:
      "A study is identified once. The design produced at study build and the datasets produced downstream belong to the same study rather than to two disconnected tools.",
  },
  {
    title: "Specifications carry forward",
    description:
      "The structure produced at study build — visits, forms, fields, code lists, and edit checks — is the same specification that governs downstream processing.",
  },
  {
    title: "Consistent governance",
    description:
      "Provenance policy, audit logging, independent QC, and human review apply across both engines instead of being re-implemented per tool.",
  },
];

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
      "Reviewers see drafts, corrections, and QC results, and are the ones who approve a study design or a deliverable.",
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
      "Different parts of a document are routed to prompts suited to that content instead of being sent through a single generic path.",
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
      "Long analyses run as jobs with progress, cancellation, and resume, because protocol analysis is not an instant operation.",
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
    title: "Deterministic execution",
    description:
      "Everything downstream of a specification is executable, repeatable processing with a recorded result.",
  },
];

/* ==========================================================================
   Trust & governance
   ========================================================================== */

export type TrustPillar = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  body: string[];
  /** Kicker shown alongside the pillar's diagram. */
  diagramLabel: string;
  points: string[];
};

export const trustPillars: TrustPillar[] = [
  {
    id: "deterministic-execution",
    index: "01",
    eyebrow: "Deterministic execution",
    title: "The model drafts. The engine executes.",
    body: [
      "Generative AI assists with interpretation and specification generation — the parts of the work that involve reading and structuring language.",
      "Deterministic engines execute those specifications. The AI does not fabricate final clinical numbers.",
      "The distinction is the point. An interpretation can be reviewed, corrected, and re-run. A number produced by a language model can only be trusted or distrusted.",
    ],
    diagramLabel: "AI → Specification → Deterministic Engine → Clinical Output",
    points: [
      "AI output is always a reviewable artifact, never a final value",
      "Deterministic processing is repeatable and produces the same result",
      "Specifications are the boundary between interpretation and execution",
    ],
  },
  {
    id: "traceability",
    index: "02",
    eyebrow: "Complete traceability",
    title: "Every output connects back to its source.",
    body: [
      "Outputs can be traced to the source records, specifications, transformations, and processing steps that produced them.",
      "That chain is what makes a review meaningful: a reviewer can follow a number in a table back to the record and the rule that generated it.",
      "Audit logging is append-only, so the history of a decision is preserved rather than overwritten.",
    ],
    diagramLabel: "Source record → Specification → Transformation → Output",
    points: [
      "Source records and the specifications applied to them",
      "Transformations and processing steps recorded per run",
      "Lineage from a figure back to the records behind it",
    ],
  },
  {
    id: "independent-qc",
    index: "03",
    eyebrow: "Independent QC",
    title: "Production and QC are separated on purpose.",
    body: [
      "Production computation and QC computation are intentionally separated.",
      "The goal is to avoid the failure mode where QC simply reproduces the same implementation and agrees with the same bug — a second run of the same code is not a second opinion.",
      "Independent QC re-implements the computation, then compares results. Cross-artifact QC extends that check across datasets, specifications, and outputs.",
    ],
    diagramLabel: "Source data → Production and Independent QC → Compare → Review",
    points: [
      "QC re-implements the computation rather than re-running it",
      "Differences are surfaced for review, not silently reconciled",
      "Cross-artifact checks cover datasets, specifications, and outputs together",
    ],
  },
  {
    id: "human-in-the-loop",
    index: "04",
    eyebrow: "Human in the loop",
    title: "Automation should remove mechanical work — not remove accountability.",
    body: [
      "Generated work is a draft. A person reviews it, corrects it, and the corrected version is what proceeds.",
      "Second-eye QC runs independently of the author, and anything it cannot safely resolve is routed to a human rather than decided automatically.",
      "Approval is an explicit act performed by a named person, not an inferred state.",
    ],
    diagramLabel: "AI → Draft → Human review → Correction → Second-eye QC → Approved output",
    points: [
      "Drafts are reviewed before they are built upon",
      "Corrections are captured in the artifact itself",
      "Approval is explicit and attributable",
    ],
  },
];

export const trustPrinciples = [
  "Working technology with a clear path toward productization.",
  "AI is presented as enabling technology, not as the product's identity.",
  "Nothing on this site describes regulatory approval, production deployments, or commercial traction that has not been documented.",
] as const;

/* ==========================================================================
   Differentiation
   ========================================================================== */

export const differentiators: Capability[] = [
  {
    title: "AI plus deterministic execution",
    description:
      "Generative AI assists with interpretation and specifications. Deterministic engines produce clinical outputs.",
  },
  {
    title: "Human controlled",
    description: "Users review and approve the decisions that matter.",
  },
  {
    title: "Independent QC",
    description: "Production and QC are intentionally separated.",
  },
  {
    title: "Traceable",
    description: "Outputs can be connected back to the source data behind them.",
  },
  {
    title: "One model, many systems",
    description:
      "The protocol is read once into a system-neutral study model. FlashEDC and FlashAnalysis are the first two things projected from it — not the only things it is built to project.",
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
    headline: "Turn Clinical Data Operations into a Competitive Advantage.",
    intro:
      "Study build, data capture, and statistical programming are effort-heavy, repeatable, and margin-sensitive. FlashEDC builds the study — structure, edit-check specifications, and programming code — in 10 to 30 minutes against roughly ten weeks by hand, and FlashAnalysis carries it from there. Both move the mechanical part of that work into tooling that produces consistent, reviewable output — from one protocol read, with the same model architected to reach the wider systems a CRO runs.",
    outcomes: [
      {
        title: "Reduced manual study-build effort",
        description:
          "Visit structures, forms, fields, code lists, edit-check specifications, and the programming code behind them are generated from the protocol in 10 to 30 minutes instead of assembled by hand over roughly ten weeks — and the same design is what data is then captured against.",
      },
      {
        title: "Faster study startup",
        description:
          "A reviewable study build is available in 10 to 30 minutes rather than weeks, so the review that used to gate startup starts sooner.",
      },
      {
        title: "Consistent study designs",
        description:
          "The same generation path across studies produces designs that are comparable rather than individually improvised.",
      },
      {
        title: "Reduced statistical programming effort",
        description:
          "SDTM, ADaM, and TLF production is specification-driven, with derivations recorded rather than re-derived.",
      },
      {
        title: "Independent QC",
        description:
          "QC re-implements the computation instead of re-running production, so it can actually find defects.",
      },
      {
        title: "Reconciliation",
        description:
          "CRO and vendor deliverables are compared against sponsor outputs and differences are surfaced.",
      },
      {
        title: "Traceability",
        description:
          "Outputs connect back to source records, which shortens the path from a query to an answer.",
      },
      {
        title: "Better margins",
        description:
          "Less mechanical re-work per study is less unbillable effort per study.",
      },
    ],
    relevantProducts: ["FlashEDC", "FlashAnalysis"],
  },
  {
    id: "pharma-biotech",
    audience: "Pharma & Biotech",
    headline: "Build and analyze clinical data with greater speed, consistency, and traceability.",
    intro:
      "Sponsors carry the cost of inconsistency and the burden of reconstructing what happened. ClinDaddy keeps the study design, the datasets, and the submission artifacts connected to their sources.",
    outcomes: [
      {
        title: "Faster study startup",
        description:
          "Protocol-to-EDC generation produces a buildable study build in 10 to 30 minutes against roughly ten weeks by hand — and the same design is what the study then captures data against.",
      },
      {
        title: "Reproducibility",
        description:
          "Deterministic execution means the same specification produces the same result on a re-run.",
      },
      {
        title: "Data lineage",
        description:
          "Every output can be traced back through its transformations to the source records behind it.",
      },
      {
        title: "QC",
        description:
          "Independent QC and cross-artifact QC check the work rather than confirming it.",
      },
      {
        title: "Submission readiness",
        description:
          "Define-XML, aCRF, cSDRG, ADRG, and an eCTD-lite package are generated alongside the outputs they describe.",
      },
      {
        title: "Visibility into vendor deliverables",
        description:
          "Reconciliation against CRO and vendor deliverables turns a manual review into a comparison.",
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
  /** Caption describing the synthetic artifact shown beside the step. */
  artifact: string;
};

export const demos: Record<"flashedc" | "flashanalysis", { steps: DemoStep[]; note: string }> = {
  flashedc: {
    note: "Illustrative walkthrough using a synthetic protocol. No customer or confidential study material is shown.",
    steps: [
      {
        title: "Upload protocol",
        description: "Supply the protocol document in PDF, DOCX, TXT, or RTF.",
        artifact: "Document intake with format detection and job initialization.",
      },
      {
        title: "Analyze",
        description: "The pipeline reads the schedule of assessments and collection intent.",
        artifact: "Background job with progress reporting, cancellation, and resume.",
      },
      {
        title: "Review study skeleton",
        description: "Visits and the assessment matrix are reviewed and corrected before expansion.",
        artifact: "Editable visit structure with the assessment matrix.",
      },
      {
        title: "Generate forms",
        description: "Forms, fields, controls, and code lists are generated from the approved skeleton.",
        artifact: "Form and field definitions with bound code lists.",
      },
      {
        title: "Generate edit checks",
        description: "Check specifications and their programming code are produced together.",
        artifact: "Edit-check specification paired with generated code.",
      },
      {
        title: "Review",
        description: "Second-eye QC runs, then reviewers resolve anything it escalated.",
        artifact: "Adversarial review findings with resolution state.",
      },
      {
        title: "Export study",
        description: "The approved design is exported for the EDC environment.",
        artifact: "Excel study design and SQL Server study-builder output.",
      },
    ],
  },
  flashanalysis: {
    note: "Illustrative walkthrough. Datasets, tables, and figures shown are synthetic.",
    steps: [
      {
        title: "Load data",
        description: "Data is admitted under a provenance policy covering real and synthetic sources.",
        artifact: "Provenance record attached to each delivered dataset.",
      },
      {
        title: "Generate SDTM",
        description: "Collected data is transformed into CDISC SDTM by deterministic processing.",
        artifact: "SDTM domain mapping with the transformation applied per record.",
      },
      {
        title: "Generate ADaM",
        description: "Analysis-ready datasets and their derivations are produced.",
        artifact: "Derivation specification linked to each analysis variable.",
      },
      {
        title: "Generate TLFs",
        description: "Tables, listings, and figures are generated with traceability to source.",
        artifact: "Output table with each value linked to its source records.",
      },
      {
        title: "Run independent QC",
        description: "QC re-implements the computation and compares results.",
        artifact: "Comparison report listing matches and differences.",
      },
      {
        title: "Trace output",
        description: "Any value can be followed back through its transformations.",
        artifact: "Lineage view from a figure value back to source records.",
      },
      {
        title: "Generate submission artifacts",
        description: "Submission metadata and the package are assembled from the same sources.",
        artifact: "Define-XML, aCRF, cSDRG, ADRG, and eCTD-lite package.",
      },
    ],
  },
};

/* ==========================================================================
   Evidence — current technology position
   ========================================================================== */

export type EvidenceItem = {
  label: string;
  value: string;
  detail: string;
};

export const evidence: EvidenceItem[] = [
  {
    label: "FlashAnalysis",
    value: "~2,500 passing tests",
    detail:
      "The current FlashAnalysis codebase is covered by approximately 2,500 passing tests, alongside a policy-driven approach to governing real versus synthetic data.",
  },
  {
    label: "FlashEDC",
    value: "Working internal CRO tool",
    detail:
      "FlashEDC is a working internal CRO tool with strong engine fidelity. It currently depends on a specific EDC environment.",
  },
];

export const maturityStatement = {
  headline: "Working technology with a clear path toward productization.",
  body: [
    "ClinDaddy's products are working technology, not finished commercial SaaS. FlashEDC is in internal use as a CRO tool; FlashAnalysis is a tested, policy-driven platform.",
    "Internal engineering metrics describe code health and coverage. They are not evidence of commercial traction, and we do not present them as such.",
  ],
} as const;

/* ==========================================================================
   About
   ========================================================================== */

export const aboutPillars: Capability[] = [
  {
    title: "Why ClinDaddy exists",
    description:
      "Clinical trials still depend on enormous amounts of manual data work. The same study is built, programmed, checked, and documented by hand at every sponsor and every CRO, and the effort resets with each new study.",
  },
  {
    title: "The problem being solved",
    description:
      "The work between an approved protocol and a submission is largely mechanical translation: from protocol to study design, from collected data to standards, from standards to analysis, from analysis to submission artifacts. It is high-volume, high-consequence, and largely repetitive.",
  },
  {
    title: "Why this approach",
    description:
      "Automating that work only helps if the result can be trusted. So AI is confined to interpretation, deterministic engines perform the computation, humans approve the outcome, and the whole path is traceable.",
  },
  {
    title: "The long-term vision",
    description:
      "A single, system-neutral study model, read once from the protocol and projected into the systems a trial runs on — from EDC and data capture through analysis and submission, and eventually into the wider set of systems a CRO operates.",
  },
];

/**
 * The team, carried over from the pitch deck in the deck's own voice.
 *
 * Two things are deliberate. The protocol count is described as *development
 * builds* — no customer has paid for one and no trial has run on one — and the
 * study-delivery and management gaps are stated outright rather than left for
 * a reader to notice. Both are the same rule `maturityStatement` follows.
 */
export const team = {
  heading: "Who is building it",
  lead: "One person today. That is worth stating plainly, because at this stage it is the most useful thing a reader can know.",
  members: [
    {
      name: "Bilal Bayindir",
      role: "Founder",
      credential: "MS Computer Science, University of Delaware · 13+ years building EDC software",
      bio: "Thirteen years inside EDC software — the layer studies are built on, not the studies themselves. That distinction is the credential, and it is worth stating precisely: it is knowledge of how a study build is represented, from the object model and codelist architecture through the edit-check specification and identifier derivations. FlashEDC operates entirely at that layer.",
    },
  ],
  artifact: {
    label: "The artifact is the credential",
    body: "The pipeline was designed, built, and run against more than ten real protocols by one person — as development builds, produced to test and improve the tool. No customer has paid for a build, and no trial has run on one.",
  },
  notClaimed: {
    label: "What is not claimed",
    body: "No study-delivery history and no management history. Closing that gap is the purpose of the first hire, and it is stated here rather than left for a reader to discover.",
  },
} as const;

/* ==========================================================================
   Investors
   ========================================================================== */

export const investorThesis = {
  headline: "Building the Clinical Data Automation Layer.",
  intro:
    "ClinDaddy addresses labor-intensive clinical-data workflows at multiple points in the clinical-trial lifecycle. The initial wedge is a single, well-bounded problem; the expansion follows the data downstream.",
  wedge: {
    label: "Initial wedge",
    product: "FlashEDC",
    statement: "Protocol to EDC study design and data capture.",
    body: "The narrowest, most repeatable problem in the lifecycle: turning a protocol into a study design, then capturing the data against it. It has a clear input, a reviewable output, and a measurable cost today.",
  },
  expansion: {
    label: "Downstream expansion",
    product: "FlashAnalysis",
    statement: "Clinical data → standards → analysis → QC → submission.",
    body: "The same data continues into SDTM, ADaM, TLFs, QC, and submission artifacts. Each stage is effort-heavy and specification-driven, which is what makes it automatable. Beyond the lifecycle, the same neutral study model is what is architected to project into the wider systems a trial runs on — RTSM, eSource, CTMS, eTMF, ePRO, eCOA, and eConsent.",
  },
  platform: {
    label: "Long-term platform",
    statement: "One canonical study model, projected into the systems a trial runs on.",
    body: "The protocol is read once into a system-neutral study model. Today it projects into EDC and the data capture that follows, and downstream into standards, analysis, QC, and submission. The same model is architected to project into the wider systems a CRO operates — RTSM, eSource, CTMS, eTMF, ePRO, eCOA, and eConsent — of which only EDC is built today.",
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
      "The work is high-volume, high-consequence, and repeated per study by every sponsor and CRO. Errors are expensive and late-stage corrections are more expensive still.",
  },
  {
    title: "Why is this difficult?",
    description:
      "Clinical work cannot be fully autonomous. It requires deterministic execution, independent QC, human approval, and traceability — constraints that rule out the obvious approaches.",
  },
  {
    title: "What technology exists?",
    description:
      "A working FlashEDC internal CRO tool with strong engine fidelity, and a FlashAnalysis platform covered by approximately 2,500 passing tests with policy-driven provenance governance.",
  },
  {
    title: "What differentiates ClinDaddy?",
    description:
      "AI assists with interpretation; deterministic engines execute; humans approve; everything is traceable. Trustworthy automation rather than an AI wrapper.",
  },
  {
    title: "What is the expansion opportunity?",
    description:
      "One protocol read becomes a system-neutral study model. The same model that projects into EDC is what projects into RTSM, eSource, CTMS, eTMF, ePRO, eCOA, and eConsent — so expansion is the same model reaching more systems, not a new product line. Only EDC is built today.",
  },
  {
    title: "Who could buy it?",
    description:
      "CROs looking to reduce study-build and programming effort, and pharma and biotech sponsors looking for speed, reproducibility, and submission readiness.",
  },
  {
    title: "What is the path to a larger platform?",
    description:
      "Prove further projections of the same neutral model — beginning with RTSM, which is in development, then the systems that are architected rather than built. The destination those projections point at is an AI CRO, said as a destination rather than as today's capability.",
  },
];
