import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UnemploymentBenefitsCalculator } from "./unemployment-benefits-calculator";

const scrollIntoView = vi.fn();
describe("UnemploymentBenefitsCalculator", () => {
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
  async function fill(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("퇴직 전 1일 평균임금 *"), "200000");
    await user.type(screen.getByLabelText("고용보험 가입기간 *"), "48");
    await user.type(screen.getByLabelText("퇴직 당시 만 나이 *"), "40");
  }
  it("starts empty with mobile-safe controls and stable result placeholders", () => {
    render(<UnemploymentBenefitsCalculator />);
    expect(screen.getByLabelText("퇴직 전 1일 평균임금 *")).toHaveValue("");
    expect(screen.getByLabelText("퇴직 전 1일 평균임금 *")).toHaveClass(
      "text-base",
      "sm:text-sm",
    );
    expect(screen.getByTestId("primary-results")).toBeVisible();
    expect(screen.getByTestId("benefit-timeline")).toHaveTextContent(
      /계산하면/,
    );
  });
  it("calculates, animates, scrolls, and shows the statutory cap", async () => {
    const user = userEvent.setup();
    render(<UnemploymentBenefitsCalculator />);
    await fill(user);
    await user.click(
      screen.getByRole("button", { name: "예상 급여 계산하기" }),
    );
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      }),
    );
    expect(screen.getAllByTestId("animated-won")).toHaveLength(2);
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩12,258,000",
    );
    expect(screen.getByRole("img")).toHaveAccessibleName(/180일/);
    expect(screen.getByText("상한 적용")).toBeVisible();
  });
  it("keeps validation failures from scrolling and reset restores empty inputs", async () => {
    const user = userEvent.setup();
    render(<UnemploymentBenefitsCalculator />);
    await user.click(
      screen.getByRole("button", { name: "예상 급여 계산하기" }),
    );
    expect(screen.getByRole("alert")).toBeVisible();
    expect(scrollIntoView).not.toHaveBeenCalled();
    await fill(user);
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("퇴직 전 1일 평균임금 *")).toHaveValue("");
    expect(screen.getByTestId("benefit-timeline")).toHaveTextContent(
      /계산하면/,
    );
  });
  it("clears stale results and links invalid fields to the error summary", async () => {
    const user = userEvent.setup();
    render(<UnemploymentBenefitsCalculator />);
    await fill(user);
    await user.click(
      screen.getByRole("button", { name: "예상 급여 계산하기" }),
    );
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩12,258,000",
    );

    const wageInput = screen.getByLabelText("퇴직 전 1일 평균임금 *");
    await user.clear(wageInput);
    await user.click(
      screen.getByRole("button", { name: "예상 급여 계산하기" }),
    );

    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "unemployment-error-summary",
    );
    expect(wageInput).toHaveAttribute(
      "aria-describedby",
      "averageDailyWage-error unemployment-error-summary",
    );
    expect(screen.getAllByTestId("animated-won")[0]).not.toHaveAccessibleName(
      "₩12,258,000",
    );
    expect(screen.getByTestId("benefit-timeline")).toHaveTextContent(
      /계산하면/,
    );
    expect(
      screen.getByText("계산하면 상·하한 적용과 산식이 표시됩니다."),
    ).toBeVisible();
  });
  it("uses immediate results and scrolling for reduced motion", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    const user = userEvent.setup();
    render(<UnemploymentBenefitsCalculator locale="en" />);
    await user.type(screen.getByLabelText("Average daily wage *"), "200000");
    await user.type(
      screen.getByLabelText("Employment-insurance period *"),
      "48",
    );
    await user.type(screen.getByLabelText("Age at separation *"), "40");
    await user.click(screen.getByRole("button", { name: "Estimate benefits" }));
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      }),
    );
    expect(screen.getAllByTestId("animated-won")[0]).toHaveTextContent(
      "₩12,258,000",
    );
  });
});
