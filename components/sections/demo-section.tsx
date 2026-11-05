"use client";

import { useState } from "react";

import { FlashAnalysisPanel, FlashEdcPanel } from "@/components/diagrams/product-panels";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { track } from "@/lib/analytics";
import { demos, type Product } from "@/lib/content";
import { cn } from "@/lib/utils";

type DemoKey = keyof typeof demos;

/**
 * Interactive product walkthrough.
 *
 * Each step is selectable and pairs with the artifact it produces, so the
 * section demonstrates the workflow rather than only describing it. The
 * interfaces shown are illustrative and built from synthetic values.
 */
export function DemoSection({
  products,
  only,
}: {
  products: Product[];
  /** Pin the walkthrough to a single product, hiding the product switcher. */
  only?: DemoKey;
}) {
  const [active, setActive] = useState<DemoKey>(only ?? "flashedc");
  const [stepIndex, setStepIndex] = useState(0);

  const demo = demos[active];
  const step = demo.steps[stepIndex];
  const showSwitcher = only === undefined;

  function selectProduct(key: DemoKey) {
    setActive(key);
    setStepIndex(0);
    track("demo_tab_interaction", { product: key });
  }

  function selectStep(index: number) {
    setStepIndex(index);
    track("demo_step_interaction", { product: active, step: index + 1 });
  }

  return (
    <section id="demo" className="scroll-mt-24 border-t border-line bg-white">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Demonstration</Eyebrow>
            <h2 className="mt-5 text-[1.75rem] leading-[1.15] font-semibold sm:text-4xl">
              See the workflow, step by step.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              Evidence is more useful than adjectives. Walk the pipeline each product runs,
              and the artifact it produces at every stage.
            </p>
          </div>

          {/* Product switcher */}
          <div
            role="tablist"
            aria-label="Choose a product"
            className={cn(
              "inline-flex shrink-0 rounded-full border border-line bg-surface p-1",
              !showSwitcher && "hidden",
            )}
          >
            {products.map((product) => {
              const key = product.slug as DemoKey;
              const selected = active === key;
              return (
                <button
                  key={product.slug}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => selectProduct(key)}
                  className={cn(
                    "min-h-9 rounded-full px-4 text-sm font-medium transition-colors",
                    selected ? "bg-white text-ink shadow-card" : "text-muted hover:text-ink",
                  )}
                >
                  {product.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
          {/* Step list */}
          <ol className="flex flex-col" aria-label={`${active} walkthrough steps`}>
            {demo.steps.map((item, index) => {
              const selected = index === stepIndex;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => selectStep(index)}
                    aria-current={selected ? "step" : undefined}
                    className={cn(
                      "group flex w-full items-start gap-4 border-l-2 py-3.5 pr-3 pl-4 text-left transition-colors",
                      selected
                        ? "border-teal-500 bg-surface"
                        : "border-line hover:border-navy-300 hover:bg-surface/60",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 font-mono text-[0.625rem] tracking-[0.1em]",
                        selected ? "text-teal-700" : "text-muted",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-sm font-medium",
                          selected ? "text-ink" : "text-body group-hover:text-ink",
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted">
                        {item.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Artifact */}
          <div className="min-w-0">
            {active === "flashedc" ? <FlashEdcPanel /> : <FlashAnalysisPanel />}

            <div
              className="mt-5 flex flex-col gap-2 rounded-xl border border-line bg-surface px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4"
              aria-live="polite"
            >
              <p className="shrink-0 font-mono text-[0.625rem] tracking-[0.12em] text-teal-700 uppercase">
                {step.title}
              </p>
              <p className="text-sm leading-relaxed text-body">{step.artifact}</p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted">{demo.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
