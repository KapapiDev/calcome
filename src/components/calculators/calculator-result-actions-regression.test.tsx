import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CalculatorResultContext } from "./calculator-result-context";

const ENGLISH_METRICS = [
  { label: "Final balance", value: "$1,250", featured: true },
  { label: "Interest earned", value: "$250" },
] as const;

const KOREAN_METRICS = [
  { label: "최종 금액", value: "1,250,000원", featured: true },
  { label: "이자", value: "250,000원" },
] as const;

describe("CalculatorResultContext shared action accessibility regression", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps result actions in keyboard order with mobile-safe touch targets", () => {
    render(<CalculatorResultContext metrics={ENGLISH_METRICS} />);

    const scenario = screen.getByRole("button", {
      name: "Save current result as scenario",
    });
    const share = screen.getByRole("button", { name: "Copy / Share result" });
    const print = screen.getByRole("button", { name: "Print / Save PDF" });
    const buttons = screen.getAllByRole("button");

    expect(buttons.indexOf(scenario)).toBeLessThan(buttons.indexOf(share));
    expect(buttons.indexOf(share)).toBeLessThan(buttons.indexOf(print));

    for (const button of [scenario, share, print]) {
      expect(button).toHaveClass("min-h-11");
      expect(button.parentElement).toHaveClass("flex-col");
    }

    expect(
      screen.getByText(/Inputs, URLs, and browser storage are not used/),
    ).toBeVisible();
    expect(
      screen.getByText(/Inputs and URLs are not included or stored/),
    ).toBeVisible();
    expect(
      screen.getByText(/without uploading or automatically saving your inputs or results/),
    ).toBeVisible();
  });

  it("announces action outcomes and shares only the displayed result summary", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });

    render(
      <main>
        <h1>Compound Interest Calculator</h1>
        <input aria-label="Principal" defaultValue="$999 private input" />
        <CalculatorResultContext metrics={ENGLISH_METRICS} />
      </main>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Save current result as scenario" }),
    );
    expect(screen.getByText("Current result saved as a scenario.")).toHaveAttribute(
      "role",
      "status",
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy / Share result" }));
    await waitFor(() => expect(share).toHaveBeenCalledTimes(1));

    const payload = share.mock.calls[0]?.[0];
    expect(payload.text).toContain("Final balance: $1,250");
    expect(payload.text).toContain("Interest earned: $250");
    expect(payload.text).not.toContain("$999 private input");
    expect(payload).not.toHaveProperty("url");
    expect(screen.getByText("Result summary shared.")).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("blocks scenario, share, and print actions together when the result is stale", () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const writeText = vi.fn().mockResolvedValue(undefined);
    const print = vi.fn();
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    Object.defineProperty(window, "print", {
      configurable: true,
      value: print,
    });

    render(
      <div>
        <CalculatorResultContext metrics={ENGLISH_METRICS} />
        <div data-testid="stale-result-notice">Inputs changed.</div>
      </div>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Save current result as scenario" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy / Share result" }));
    fireEvent.click(screen.getByRole("button", { name: "Print / Save PDF" }));

    expect(share).not.toHaveBeenCalled();
    expect(writeText).not.toHaveBeenCalled();
    expect(print).not.toHaveBeenCalled();
    expect(
      screen.getByText("Inputs changed. Recalculate before saving this scenario."),
    ).toHaveAttribute("role", "status");
    expect(
      screen.getByText("Inputs changed. Recalculate before sharing this result."),
    ).toHaveAttribute("aria-atomic", "true");
    expect(
      screen.getByText("Inputs changed. Recalculate before printing this summary."),
    ).toHaveAttribute("role", "status");
  });

  it("preserves previous-result comparison while keeping Korean action copy localized", () => {
    const { rerender } = render(
      <CalculatorResultContext metrics={ENGLISH_METRICS} />,
    );

    rerender(
      <CalculatorResultContext
        metrics={[
          { label: "Final balance", value: "$1,400", featured: true },
          { label: "Interest earned", value: "$400" },
        ]}
      />,
    );

    expect(
      screen.getByText("Compare with the previous calculation"),
    ).toBeVisible();
    expect(screen.getByText("$1,250")).toBeVisible();
    expect(screen.getByText("$1,400")).toBeVisible();

    rerender(<CalculatorResultContext metrics={KOREAN_METRICS} />);
    expect(
      screen.getByRole("button", { name: "현재 결과를 시나리오로 저장" }),
    ).toHaveClass("min-h-11");
    expect(screen.getByRole("button", { name: "결과 복사·공유" })).toHaveClass(
      "min-h-11",
    );
    expect(screen.getByRole("button", { name: "결과 인쇄·PDF 저장" })).toHaveClass(
      "min-h-11",
    );
    expect(
      screen.getByText(/입력값이나 URL은 포함하거나 저장하지 않습니다/),
    ).toBeVisible();
  });
});
