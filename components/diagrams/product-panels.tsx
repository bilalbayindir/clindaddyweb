import { Check, CircleAlert, FileSpreadsheet, FolderTree, Table2 } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Interfaces shown in the demo sections.
 *
 * Everything inside them is invented for illustration — synthetic subjects,
 * fictional fields, small round numbers. The chrome labels each panel as an
 * illustrative interface so a screenshot of this page can never be mistaken
 * for a real study or a real deployment.
 */

/* --------------------------------------------------------------------------
   Window chrome
   -------------------------------------------------------------------------- */

export function AppWindow({
  title,
  status,
  children,
  className,
}: {
  title: string;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[6px] border border-line bg-white shadow-card",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        <p className="truncate font-mono text-[0.6875rem] text-muted">{title}</p>
        <span className="ml-auto shrink-0">
          {status ?? (
            <span className="rounded border border-line bg-white px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-[0.08em] text-muted uppercase">
              Illustrative
            </span>
          )}
        </span>
      </div>
      {children}
    </div>
  );
}

function PaneHeader({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-line px-4 py-2">
      {icon ? <span className="text-navy-300">{icon}</span> : null}
      <p className="font-mono text-[0.5625rem] tracking-[0.12em] text-muted uppercase">{children}</p>
    </div>
  );
}

function Chip({ tone, children }: { tone: "ok" | "review"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-[0.04em] whitespace-nowrap",
        tone === "ok"
          ? "border-teal-200 bg-teal-50 text-teal-800"
          : "border-warning/20 bg-warning-soft text-warning",
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------------
   FlashEDC — study builder
   -------------------------------------------------------------------------- */

const STUDY_VISITS = [
  { name: "Screening", code: "V1" },
  { name: "Cycle 1 Day 1", code: "V2" },
  { name: "Cycle 1 Day 8", code: "V3" },
  { name: "End of Treatment", code: "V4" },
  { name: "Follow-up", code: "V5" },
];

const STUDY_FIELDS = [
  { name: "BRTHDTC", type: "Date", list: "ISO 8601" },
  { name: "SEX", type: "Radio", list: "CDL_SEX" },
  { name: "RACE", type: "Checkbox", list: "CDL_RACE" },
  { name: "COUNTRY", type: "Dropdown", list: "CDL_COUNTRY" },
];

const EDIT_CHECKS = [
  { id: "EC-DM-001", rule: "BRTHDTC not after consent date", state: "ok" as const },
  { id: "EC-DM-002", rule: "SEX required at V1", state: "ok" as const },
  { id: "EC-DM-003", rule: "RACE: maximum 5 selections", state: "review" as const },
  { id: "EC-VS-001", rule: "SYSBP within 60–250 mmHg", state: "ok" as const },
];

export function FlashEdcPanel({ className }: { className?: string }) {
  return (
    <AppWindow title="FlashEDC · Study builder · Protocol SYN-014" className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_minmax(0,13rem)]">
        {/* Visit / folder structure */}
        <div className="hidden border-line lg:block lg:border-r">
          <PaneHeader icon={<FolderTree className="size-3" aria-hidden />}>Visits</PaneHeader>
          <ul className="p-2">
            {STUDY_VISITS.map((visit) => (
              <li
                key={visit.code}
                className="flex items-center justify-between rounded px-2 py-1.5 text-[0.6875rem] text-body hover:bg-surface"
              >
                <span className="truncate">{visit.name}</span>
                <span className="ml-2 shrink-0 font-mono text-[0.5625rem] text-muted">{visit.code}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Generated form */}
        <div className="border-line lg:border-r">
          <PaneHeader icon={<FileSpreadsheet className="size-3" aria-hidden />}>Form · Demographics</PaneHeader>
          <div className="p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_5.5rem] gap-x-3 border-b border-line pb-2 font-mono text-[0.5625rem] tracking-[0.1em] text-muted uppercase">
              <span>Field</span>
              <span>Type</span>
              <span>Code list</span>
            </div>
            {STUDY_FIELDS.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-[minmax(0,1fr)_4.5rem_5.5rem] items-center gap-x-3 border-b border-line/70 py-2 last:border-0"
              >
                <span className="truncate font-mono text-[0.6875rem] text-ink">{field.name}</span>
                <span className="text-[0.6875rem] text-body">{field.type}</span>
                <span className="truncate font-mono text-[0.625rem] text-teal-700">{field.list}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit-check specifications */}
        <div className="hidden sm:block">
          <PaneHeader icon={<Check className="size-3" aria-hidden />}>Edit checks</PaneHeader>
          <ul className="divide-y divide-line">
            {EDIT_CHECKS.map((check) => (
              <li key={check.id} className="px-4 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.625rem] text-ink">{check.id}</span>
                  <Chip tone={check.state}>{check.state === "ok" ? "Generated" : "Review"}</Chip>
                </div>
                <p className="mt-1 text-[0.6875rem] leading-snug text-muted">{check.rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppWindow>
  );
}

/* --------------------------------------------------------------------------
   FlashAnalysis — standards and QC
   -------------------------------------------------------------------------- */

const DATASETS = [
  { name: "DM", stage: "SDTM" },
  { name: "VS", stage: "SDTM" },
  { name: "AE", stage: "SDTM" },
  { name: "ADSL", stage: "ADaM" },
  { name: "ADAE", stage: "ADaM" },
];

const VS_ROWS = [
  { subject: "1001", test: "SYSBP", result: "128", numeric: "128" },
  { subject: "1001", test: "DIABP", result: "82", numeric: "82" },
  { subject: "1002", test: "SYSBP", result: "134", numeric: "134" },
  { subject: "1002", test: "DIABP", result: "86", numeric: "86" },
];

export function FlashAnalysisPanel({ className }: { className?: string }) {
  return (
    <AppWindow title="FlashAnalysis · Standards pipeline · Study SYN-014" className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_minmax(0,13rem)]">
        {/* Dataset inventory */}
        <div className="hidden border-line lg:block lg:border-r">
          <PaneHeader icon={<Table2 className="size-3" aria-hidden />}>Datasets</PaneHeader>
          <ul className="p-2">
            {DATASETS.map((dataset) => (
              <li
                key={dataset.name}
                className="flex items-center justify-between rounded px-2 py-1.5 font-mono text-[0.6875rem] text-body hover:bg-surface"
              >
                <span>{dataset.name}</span>
                <span className="text-[0.5625rem] text-muted">{dataset.stage}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SDTM domain excerpt */}
        <div className="border-line lg:border-r">
          <PaneHeader icon={<Table2 className="size-3" aria-hidden />}>VS · Vital signs</PaneHeader>
          <div className="overflow-x-auto p-4">
            <div className="grid min-w-[20rem] grid-cols-4 gap-x-4 border-b border-line pb-2 font-mono text-[0.5625rem] tracking-[0.1em] text-muted uppercase">
              <span>USUBJID</span>
              <span>VSTESTCD</span>
              <span>VSORRES</span>
              <span>VSSTRESN</span>
            </div>
            {VS_ROWS.map((row) => (
              <div
                key={`${row.subject}-${row.test}`}
                className="grid min-w-[20rem] grid-cols-4 gap-x-4 border-b border-line/70 py-2 font-mono text-[0.6875rem] text-body last:border-0"
              >
                <span className="text-ink">{row.subject}</span>
                <span>{row.test}</span>
                <span>{row.result}</span>
                <span className="text-teal-700">{row.numeric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* QC summary */}
        <div className="hidden sm:block">
          <PaneHeader icon={<Check className="size-3" aria-hidden />}>QC</PaneHeader>
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between text-[0.6875rem]">
              <span className="text-muted">Independent checks</span>
              <span className="font-mono text-ink">1,284</span>
            </div>
            <div className="flex items-center justify-between text-[0.6875rem]">
              <span className="text-muted">Differences</span>
              <span className="flex items-center gap-1.5 font-mono text-warning">
                <CircleAlert className="size-3" aria-hidden />3
              </span>
            </div>

            <div className="border-t border-line pt-3">
              <p className="font-mono text-[0.5625rem] tracking-[0.1em] text-muted uppercase">Cross-artifact</p>
              <ul className="mt-2 space-y-1.5">
                {["ADSL.AGE ↔ spec", "ADAE ↔ ADaM spec", "Define-XML ↔ datasets"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.6875rem] text-body">
                    <Check className="size-3 shrink-0 text-success" aria-hidden />
                    <span className="truncate font-mono">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

