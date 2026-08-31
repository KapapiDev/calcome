import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  CalculatorActions,
  PrimaryResults,
  compactCalculatorSettingsClass,
  calculatorSettingsClass,
  calculatorWorkspaceClass,
  dashboardCalculatorWorkspaceClass,
} from "./calculator-workspace";

describe("calculator workspace", () => {
  it("uses one mobile column, practical tablet columns, and desktop-only sticky settings", () => {
    expect(calculatorWorkspaceClass).toContain("md:grid-cols-");
    expect(calculatorWorkspaceClass).not.toContain("grid-cols-2");
    expect(calculatorSettingsClass).toContain("lg:sticky");
    expect(calculatorSettingsClass).not.toContain("md:sticky");
  });

  it("fills only empty numeric example placeholders and preserves user input", () => {
    render(
      <form>
        <input aria-label="원금" value="500" readOnly />
        <input aria-label="수익" placeholder="1,000" />
        <input aria-label="설명" placeholder="직접 입력" />
        <CalculatorActions submitLabel="계산하기" onReset={() => undefined} />
      </form>,
    );

    fireEvent.click(screen.getByRole("button", { name: "예시 입력" }));

    expect(screen.getByRole("textbox", { name: "원금" })).toHaveValue("500");
    expect(screen.getByRole("textbox", { name: "수익" })).toHaveValue("1,000");
    expect(screen.getByRole("textbox", { name: "설명" })).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent(
      "빈 입력칸에 예시 값을 채웠습니다.",
    );
  });

  it("localizes first-run, example, and reset actions for English forms", () => {
    render(
      <form>
        <input aria-label="Amount" placeholder="1000" />
        <CalculatorActions submitLabel="Calculate" onReset={() => undefined} />
      </form>,
    );

    expect(screen.getByText(/New here\?/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Fill example" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("focuses the first invalid input, preserves other values, and offers recovery", () => {
    render(
      <form>
        <label htmlFor="amount">Amount</label>
        <input id="amount" required />
        <label htmlFor="rate">Rate</label>
        <input id="rate" type="number" min="0" defaultValue="-1" />
        <input aria-label="Already entered" defaultValue="250" />
        <CalculatorActions submitLabel="Calculate" onReset={() => undefined} />
      </form>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Calculate" }));

    expect(screen.getByLabelText("Amount")).toHaveFocus();
    expect(screen.getByRole("alert")).toHaveTextContent("Amount");
    expect(screen.getByLabelText("Already entered")).toHaveValue("250");
    expect(
      screen.getByRole("button", { name: "Go to problem" }),
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Calculate" }));

    expect(screen.getByLabelText("Rate")).toHaveFocus();
    expect(screen.getByRole("alert")).toHaveTextContent("Rate");
    expect(screen.getByLabelText("Already entered")).toHaveValue("250");
  });

  it("renders three prioritized metrics plus shared repeat-use actions", () => {
    render(
      <PrimaryResults
        metrics={[
          { label: "결과", value: "1" },
          { label: "원금", value: "2" },
          { label: "수익", value: "3" },
        ]}
      />,
    );

    expect(screen.getByTestId("primary-results").children).toHaveLength(3);
    expect(
      screen.getByRole("button", { name: "다시 계산" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "결과 복사" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "다른 계산기" })).toHaveAttribute(
      "href",
      "/calculators",
    );
  });

  it("copies only result labels and values with accessible success feedback", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <PrimaryResults
        metrics={[
          { label: "결과", value: "10%" },
          { label: "원금", value: "100원" },
          { label: "수익", value: "10원" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "결과 복사" }));

    expect(writeText).toHaveBeenCalledWith(
      "결과: 10%\n원금: 100원\n수익: 10원",
    );
    expect(await screen.findByRole("status")).toHaveTextContent(
      "결과를 복사했습니다.",
    );
  });

  it("moves repeat calculation back to the nearest calculator form", () => {
    Element.prototype.scrollIntoView = vi.fn();

    render(
      <div>
        <form>
          <input aria-label="첫 입력" />
        </form>
        <section>
          <PrimaryResults
            metrics={[
              { label: "결과", value: "1" },
              { label: "원금", value: "2" },
              { label: "수익", value: "3" },
            ]}
          />
        </section>
      </div>,
    );

    fireEvent.click(screen.getByRole("button", { name: "다시 계산" }));
    expect(screen.getByRole("textbox", { name: "첫 입력" })).toHaveFocus();
  });

  it("provides a compact settings variant with desktop sticky positioning", () => {
    expect(compactCalculatorSettingsClass).toContain("p-4");
    expect(compactCalculatorSettingsClass).toContain("rounded-xl");
    expect(compactCalculatorSettingsClass).toContain("lg:sticky");
    expect(compactCalculatorSettingsClass).toContain("lg:top-6");
  });

  it("provides a dashboard variant with a narrow fixed settings sidebar", () => {
    expect(dashboardCalculatorWorkspaceClass).toContain(
      "lg:grid-cols-[21rem_minmax(0,1fr)]",
    );
    expect(dashboardCalculatorWorkspaceClass).not.toContain("0.36fr");
  });
});
