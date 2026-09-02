import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CalculatorActions,
  PrimaryResults,
} from "@/components/calculators/calculator-workspace";
import { buttonVariants } from "@/components/ui/button";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("shared interaction and accessibility hardening", () => {
  it("respects reduced motion for mobile completion and recalculate scrolling", async () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn((query: string) => ({
        matches:
          query === "(max-width: 767px)" ||
          query === "(prefers-reduced-motion: reduce)",
      })),
    });

    render(
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
          <input aria-label="Amount" defaultValue="100" />
          <CalculatorActions
            submitLabel="Calculate"
            onReset={() => undefined}
          />
        </form>
        <section>
          <PrimaryResults
            metrics={[
              { label: "Result", value: "$10" },
              { label: "Principal", value: "$100" },
              { label: "Return", value: "$10" },
            ]}
          />
        </section>
      </div>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Calculate" }));

    await waitFor(() =>
      expect(screen.getByTestId("primary-results")).toHaveFocus(),
    );
    expect(scrollIntoView).toHaveBeenCalledWith({
      block: "start",
      behavior: "auto",
    });

    fireEvent.click(screen.getByRole("button", { name: "Recalculate" }));
    expect(scrollIntoView).toHaveBeenLastCalledWith({
      block: "start",
      behavior: "auto",
    });
  });

  it("names and announces the shared result target while keeping focus visible", () => {
    render(
      <PrimaryResults
        metrics={[
          { label: "Result", value: "$10" },
          { label: "Principal", value: "$100" },
          { label: "Return", value: "$10" },
        ]}
      />,
    );

    const results = screen.getByTestId("primary-results");
    expect(results).toHaveAttribute("aria-label", "Calculation results");
    expect(results).toHaveAttribute("aria-live", "polite");
    expect(results).toHaveAttribute("aria-atomic", "true");
    expect(results).toHaveAttribute("tabindex", "-1");
    expect(results).toHaveClass("focus:ring-3", "focus:ring-ring/50");
  });

  it("keeps shared calculator actions touch-sized and wrap-safe at narrow widths", () => {
    render(
      <form>
        <CalculatorActions submitLabel="Calculate" onReset={() => undefined} />
      </form>,
    );

    for (const name of ["Calculate", "Fill example", "Reset"]) {
      expect(screen.getByRole("button", { name })).toHaveClass(
        "min-h-11",
        "min-w-0",
        "whitespace-normal",
        "text-center",
      );
    }

    render(
      <PrimaryResults
        metrics={[
          { label: "Result", value: "$10" },
          { label: "Principal", value: "$100" },
          { label: "Return", value: "$10" },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Another calculator" })).toHaveClass(
      "min-h-11",
      "min-w-0",
      "whitespace-normal",
      "motion-reduce:transition-none",
    );
  });

  it("preserves focus, dark-mode, touch-target, and reduced-motion rules in shared buttons", () => {
    const classes = buttonVariants({ variant: "outline", size: "default" });

    expect(classes).toContain("focus-visible:ring-3");
    expect(classes).toContain("h-11");
    expect(classes).toContain("dark:bg-input/30");
    expect(classes).toContain("motion-reduce:transition-none");
    expect(classes).toContain("motion-reduce:active:translate-y-0");
  });
});
