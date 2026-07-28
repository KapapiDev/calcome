import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { COMPOUND_ANIMATION_DURATION } from "@/features/compound-interest/components/compound-animation";
import { LoanCalculator } from "./loan-calculator";

const scrollIntoView = vi.fn();
describe("LoanCalculator", () => {
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
    await user.type(screen.getByLabelText("대출 금액 *"), "12000000");
    await user.type(screen.getByLabelText("연 이자율 *"), "6");
    await user.type(screen.getByLabelText("대출 기간 *"), "1");
  }
  it("starts empty with stable result, comparison, and schedule sections", () => {
    render(<LoanCalculator />);
    expect(screen.getByLabelText("대출 금액 *")).toHaveValue("");
    expect(screen.getByLabelText("대출 금액 *")).toHaveAttribute(
      "placeholder",
      "예: 100,000,000",
    );
    for (const input of [
      screen.getByLabelText("대출 금액 *"),
      screen.getByLabelText("연 이자율 *"),
      screen.getByLabelText("대출 기간 *"),
    ]) {
      expect(input).toHaveClass("text-base", "sm:text-sm");
    }
    expect(
      within(screen.getByTestId("primary-results")).getAllByText("-"),
    ).toHaveLength(3);
    expect(
      screen.getByRole("heading", { name: "상환 방식 비교" }),
    ).toBeVisible();
    expect(
      screen.getByText("상환 일정 보기").closest("details"),
    ).toHaveAttribute("open");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
  it("calculates exact schedule, comparison, synchronized results, and scrolling", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    await fill(user);
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      }),
    );
    expect(screen.getAllByTestId("animated-won")).toHaveLength(3);
    expect(
      new Set(
        screen
          .getAllByTestId("animated-won")
          .map((node) => node.dataset.animationRun),
      ),
    ).toEqual(new Set(["1"]));
    expect(screen.getByText("총 이자가 더 적음")).toBeVisible();
    expect(screen.getByRole("table")).toBeVisible();
    expect(screen.getAllByRole("row")).toHaveLength(13);
    expect(
      screen.getByText("추가 정보와 적용 가정").closest("details"),
    ).toHaveAttribute("open");
    expect(COMPOUND_ANIMATION_DURATION).toBe(1300);
  });
  it("keeps bullet repayment and its complete engine schedule", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    await fill(user);
    await user.selectOptions(screen.getByLabelText("상환 방식 *"), "bullet");
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );
    expect(screen.getByText("매월 이자 납부액")).toBeVisible();
    expect(screen.getByRole("table")).toBeVisible();
    expect(screen.getByText(/마지막 회차에 원금 전액/)).toBeVisible();
  });
  it("renders English without unintended Korean", async () => {
    const user = userEvent.setup();
    const { container } = render(<LoanCalculator locale="en" />);
    await user.type(screen.getByLabelText("Loan amount *"), "12000000");
    await user.type(screen.getByLabelText("Annual interest rate *"), "6");
    await user.type(screen.getByLabelText("Loan term *"), "1");
    await user.click(
      screen.getByRole("button", { name: "Calculate repayments" }),
    );
    expect(
      screen.getByRole("heading", { name: "Repayment comparison" }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
  it("focuses validation without scrolling", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    const amount = screen.getByLabelText("대출 금액 *");
    await user.type(amount, "0");
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );
    await waitFor(() => expect(amount).toHaveFocus());
    expect(screen.getByRole("alert")).toBeVisible();
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
  it("clears stale results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    await fill(user);
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );
    await waitFor(() => expect(screen.getByRole("table")).toBeVisible());
    expect(screen.getAllByTestId("animated-won")).toHaveLength(3);

    const amount = screen.getByLabelText("대출 금액 *");
    await user.clear(amount);
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute("id", "loan-error-summary");
      expect(amount).toHaveAttribute("aria-invalid", "true");
      expect(amount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("loan-error-summary"),
      );
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
      expect(screen.queryAllByTestId("animated-won")).toHaveLength(0);
      expect(
        within(screen.getByTestId("primary-results")).getAllByText("-"),
      ).toHaveLength(3);
    });
  });
  it("dismisses numeric input focus after a successful keyboard submit", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    await fill(user);
    const period = screen.getByLabelText("대출 기간 *");
    period.focus();
    await user.keyboard("{Enter}");
    expect(period).not.toHaveFocus();
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
  });
  it("replays on recalculation and reset restores empty state", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    await fill(user);
    const calculate = screen.getByRole("button", {
      name: "상환 결과 계산하기",
    });
    await user.click(calculate);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    await user.click(calculate);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(2));
    expect(
      new Set(
        screen
          .getAllByTestId("animated-won")
          .map((node) => node.dataset.animationRun),
      ),
    ).toEqual(new Set(["2"]));
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("대출 금액 *")).toHaveValue("");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
  it("renders final results immediately for reduced motion", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    const user = userEvent.setup();
    render(<LoanCalculator />);
    await fill(user);
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );
    expect(screen.getAllByTestId("animated-won")[0]).toHaveTextContent(
      "₩1,032,797",
    );
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      }),
    );
  });
});
