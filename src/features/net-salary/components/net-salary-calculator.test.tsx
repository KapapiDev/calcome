import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NetSalaryCalculator } from "./net-salary-calculator";
const scrollIntoView = vi.fn();
describe("NetSalaryCalculator", () => {
  beforeEach(() => {
    scrollIntoView.mockReset();
    Element.prototype.scrollIntoView = scrollIntoView;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });
  it("starts empty with a stable responsive result workspace", () => {
    render(<NetSalaryCalculator />);
    expect(
      screen.getByLabelText("연봉", { selector: 'input[type="radio"]' }),
    ).toBeChecked();
    expect(
      screen.getByLabelText("연봉", { selector: "input:not([type=radio])" }),
    ).toHaveValue("");
    expect(screen.getByPlaceholderText("예: 50,000,000")).toHaveClass(
      "text-base",
      "sm:text-sm",
    );
    expect(screen.getByTestId("deduction-chart")).toBeVisible();
  });
  it("calculates, animates, scrolls and renders every deduction", async () => {
    const user = userEvent.setup();
    render(<NetSalaryCalculator />);
    await user.type(screen.getByPlaceholderText("예: 50,000,000"), "60000000");
    await user.type(screen.getByPlaceholderText("예: 200,000"), "200000");
    await user.click(screen.getByRole("button", { name: "실수령액 계산하기" }));
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      }),
    );
    expect(screen.getAllByTestId("animated-won")).toHaveLength(3);
    expect(screen.getByRole("img")).toHaveAccessibleName(/월 실수령액/);
    expect(screen.getByText("국민연금", { selector: "th" })).toBeVisible();
  });
  it("clears stale results when a valid calculation becomes invalid", async () => {
    const user = userEvent.setup();
    render(<NetSalaryCalculator />);
    const salary = screen.getByPlaceholderText("예: 50,000,000");
    await user.type(salary, "60000000");
    await user.click(screen.getByRole("button", { name: "실수령액 계산하기" }));
    expect(screen.getByText("국민연금", { selector: "th" })).toBeVisible();
    await user.clear(salary);
    await user.click(screen.getByRole("button", { name: "실수령액 계산하기" }));
    expect(screen.getByRole("alert")).toBeVisible();
    expect(
      screen.getAllByText("계산하면 공제 항목별 금액이 표시됩니다."),
    ).toHaveLength(2);
    expect(screen.queryByText("국민연금", { selector: "th" })).toBeNull();
  });
  it("does not scroll on validation and reset restores empty values", async () => {
    const user = userEvent.setup();
    render(<NetSalaryCalculator />);
    await user.click(screen.getByRole("button", { name: "실수령액 계산하기" }));
    expect(screen.getByRole("alert")).toBeVisible();
    expect(scrollIntoView).not.toHaveBeenCalled();
    await user.type(screen.getByPlaceholderText("예: 50,000,000"), "50000000");
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByPlaceholderText("예: 50,000,000")).toHaveValue("");
  });
  it("renders final values immediately for reduced motion", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    const user = userEvent.setup();
    render(<NetSalaryCalculator locale="en" />);
    await user.type(screen.getByPlaceholderText("e.g. 50,000,000"), "60000000");
    await user.click(
      screen.getByRole("button", { name: "Calculate take-home pay" }),
    );
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      }),
    );
    expect(screen.getAllByTestId("animated-won")[0]).toHaveTextContent(/₩/);
  });
});
