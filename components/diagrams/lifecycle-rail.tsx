"use client";

import { motion, useReducedMotion } from "motion/react";

import { InDevelopmentBadge, SpeedBadge } from "@/components/ui/badge";
import { lifecycleOwnership, lifecycleStages } from "@/lib/content";
import { cn } from "@/lib/utils";

const FLASHEDC_STAGE_IDS = new Set<string>(lifecycleOwnership.flashedc.stageIds);
const FLASHANALYSIS_STAGE_IDS = new Set<string>(lifecycleOwnership.flashanalysis.stageIds);

/** Which product owns a given lifecycle stage, or null for the shared middle. */
function ownerOf(stageId: string): "flashedc" | "flashanalysis" | null {
  if (FLASHEDC_STAGE_IDS.has(stageId)) return "flashedc";
  if (FLASHANALYSIS_STAGE_IDS.has(stageId)) return "flashanalysis";
  return null;
}

/**
 * The clinical data lifecycle, drawn as a single connected rail.
 *
 * This is the site's primary visual metaphor: eight stages from protocol to
 * submission, with FlashEDC and FlashAnalysis shown as the spans they are
 * accountable for. It becomes a vertical, grouped list on small screens rather
 * than being scaled down, because the sequence has to stay readable on a phone.
 */
export function LifecycleRail({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "panel";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const withDescriptions = variant === "panel";

  /** The speed figure, if any stage carries one, for the caveat beneath the rail. */
  const speed = lifecycleStages.find((stage) => stage.speed)?.speed;

  const reveal = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.25 + index * 0.07, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className={cn("w-full", className)}>
      {/* ---------------------------------------------------------------- */}
      {/* Desktop: horizontal rail                                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="hidden lg:block">
        {/* Product spans, sitting above the stages they cover. */}
        <div className="grid grid-cols-8 gap-x-3">
          <ProductSpan
            className="col-span-3 col-start-1"
            name={lifecycleOwnership.flashedc.label}
            tagline={lifecycleOwnership.flashedc.tagline}
          />
          <ProductSpan
            className="col-span-5 col-start-4"
            name={lifecycleOwnership.flashanalysis.label}
            tagline={lifecycleOwnership.flashanalysis.tagline}
          />
        </div>

        {/* The rail itself. */}
        <div className="relative mt-4 grid grid-cols-8 gap-x-3">
          <motion.div
            aria-hidden
            className="absolute top-[1.125rem] h-px origin-left bg-line-strong"
            style={{ left: "calc((100% - 5.25rem) / 16)", right: "calc((100% - 5.25rem) / 16)" }}
            initial={reduceMotion ? undefined : { scaleX: 0 }}
            animate={reduceMotion ? undefined : { scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {lifecycleStages.map((stage, index) => {
            const owner = ownerOf(stage.id);
            return (
              <motion.div
                key={stage.id}
                className="relative z-10 flex flex-col items-center text-center"
                {...reveal(index)}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border bg-white font-mono text-[0.6875rem] tracking-tight",
                    owner
                      ? "border-teal-300 text-teal-700"
                      : "border-line-strong text-muted",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "mt-3 text-[0.8125rem] leading-tight font-semibold",
                    owner ? "text-ink" : "text-body",
                  )}
                >
                  {stage.title}
                </span>
                {stage.speed ? <SpeedBadge label={stage.speed} className="mt-1.5" /> : null}
                {stage.inDevelopment ? (
                  <InDevelopmentBadge className="mt-1.5" />
                ) : null}
                {withDescriptions ? (
                  <span className="mt-2 text-xs leading-relaxed text-muted">{stage.description}</span>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Mobile: vertical rail with product groupings                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-1 lg:hidden">
        <MobileGroup
          label={lifecycleOwnership.flashedc.label}
          tagline={lifecycleOwnership.flashedc.tagline}
          stageIds={lifecycleOwnership.flashedc.stageIds as unknown as string[]}
          withDescriptions={withDescriptions}
        />
        <MobileGroup
          label={lifecycleOwnership.flashanalysis.label}
          tagline={lifecycleOwnership.flashanalysis.tagline}
          stageIds={lifecycleOwnership.flashanalysis.stageIds as unknown as string[]}
          withDescriptions={withDescriptions}
        />
      </div>

      {/* The speed figure is never shown bare: it is time to a draft, and
          saying so only in a tooltip would lose the caveat on every touch
          device. */}
      {speed ? (
        <p className="mt-7 text-center text-xs leading-relaxed text-muted">
          FlashEDC builds the study — structure, edit-check specifications, and programming code —
          in {speed}, against roughly ten weeks to do the same build by hand. That is time to a
          build ready for review, not to a live study, which still follows the same approval and
          validation path as any build.
        </p>
      ) : null}
    </div>
  );
}

/** The bracket that labels the stages a product is accountable for. */
function ProductSpan({
  name,
  tagline,
  className,
}: {
  name: string;
  tagline: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col justify-end", className)}>
      <div className="rounded-t-lg border border-b-0 border-line bg-surface px-4 py-3 text-center">
        <p className="text-[13px] text-brand">{name}</p>
        <p className="mt-1 text-xs text-body">{tagline}</p>
      </div>
    </div>
  );
}

/** A product's stages, grouped under a labelled accent bar on small screens. */
function MobileGroup({
  label,
  tagline,
  stageIds,
  withDescriptions,
}: {
  label: string;
  tagline: string;
  stageIds: string[];
  withDescriptions: boolean;
}) {
  const stages = lifecycleStages.filter((stage) => stageIds.includes(stage.id));

  return (
    <div className="relative mt-6 pl-6 first:mt-0">
      <span aria-hidden className="absolute top-1 bottom-1 left-[0.6875rem] w-px bg-teal-200" />

      <p className="text-[13px] text-brand">{label}</p>
      <p className="mt-1 text-xs text-muted">{tagline}</p>

      <div className="mt-4 flex flex-col gap-6">
        {stages.map((stage) => (
          <MobileStage
            key={stage.id}
            index={lifecycleStages.findIndex((s) => s.id === stage.id)}
            title={stage.title}
            description={stage.description}
            inDevelopment={stage.inDevelopment}
            speed={stage.speed}
            owner={label === "FlashEDC" ? "flashedc" : "flashanalysis"}
            withDescriptions={withDescriptions}
          />
        ))}
      </div>
    </div>
  );
}

function MobileStage({
  index,
  title,
  description,
  inDevelopment,
  speed,
  owner,
  withDescriptions,
}: {
  index: number;
  title: string;
  description: string;
  inDevelopment?: boolean;
  speed?: string;
  owner: "flashedc" | "flashanalysis" | null;
  withDescriptions: boolean;
}) {
  return (
    <div className="relative">
      <span
        className={cn(
          "absolute top-0 -left-6 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border bg-white font-mono text-[0.5625rem]",
          owner ? "border-teal-300 text-teal-700" : "border-line-strong text-muted",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className={cn("text-sm font-semibold", owner ? "text-ink" : "text-body")}>{title}</p>
      {speed ? <SpeedBadge label={speed} className="mt-1.5" /> : null}
      {inDevelopment ? <InDevelopmentBadge className="mt-1.5" /> : null}
      {withDescriptions ? (
        <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}

