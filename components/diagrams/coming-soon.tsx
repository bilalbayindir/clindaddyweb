import { Badge } from "@/components/ui/badge";
import type { RoadmapSystem } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Status colour, matching the roadmap grid on /platform so a reader who has
 * seen one page recognises the other. Total on purpose: anything that is not
 * explicitly in development falls to the neutral "architected" tone, so a
 * system added to the roadmap later cannot render with no status styling.
 */
function statusTone(status: RoadmapSystem["status"]) {
  return status === "in-development" ? "teal" : "neutral";
}

/**
 * The systems a study model projects into next — drawn as a diagram rather
 * than a list, and set below the workflow it follows on from.
 *
 * The dashed border is doing real work: everything inside is a plan, and the
 * frame should say that before a single status label is read. The statuses are
 * the roadmap's own strings, passed through verbatim, because the one rule this
 * diagram exists to honour is that a roadmap item is never dressed up as
 * shipped.
 */
export function ComingSoon({
  systems,
  className,
}: {
  systems: RoadmapSystem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-16 rounded-2xl border border-dashed border-line-strong bg-surface/60 p-6 sm:p-8",
        className,
      )}
    >
      <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
        Coming soon
      </p>
      <h3 className="mt-3 text-lg leading-snug font-semibold text-ink">
        The systems the same model projects into next.
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Read the statuses literally. Only EDC is built today; everything below is the roadmap this
        work points at, not capability that exists yet.
      </p>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {systems.map((system) => (
          <li key={system.id} className="bg-white p-5">
            <p className="text-sm leading-snug font-semibold text-ink">{system.name}</p>
            <p className="mt-1 text-xs text-muted">{system.fullName}</p>
            <div className="mt-3">
              <Badge tone={statusTone(system.status)}>{system.statusLabel}</Badge>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">{system.scope}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
