import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { COMPOUND_ANIMATION_DURATION } from "@/features/compound-interest/components/compound-animation";

import { SavingsCalculator } from "./savings-calculator";

const scrollIntoView = vi.fn();

describe("SavingsCalculator", () => {
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

  async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("정기 납입액 *"), "100000");
    await user.type(screen.getByLabelText("저축 기간 *"), "1");
    await user.type(screen.getByLabelText("연 이자율 *"), "3.5");
  }

  it("starts empty with placeholders, stable results, chart, and details", () => {
    render(<SavingsCalculator />);
    expect(screen.getByLabelText("정기 납입액 *")).toHaveValue("");
    expect(screen.getByLabelText("정기 납입액 *")).toHaveAttribute(
      "placeholder",
      "예: 100,000",
    );
    expect(screen.getByLabelText("저축 기간 *")).toHaveValue("");
    expect(screen.getByLabelText("연 이자율 *")).toHaveValue("");
    for (const input of [
      screen.getByLabelText("정기 납입액 *"),
      screen.getByLabelText("저축 기간 *"),
      screen.getByLabelText("연 이자율 *"),
    ]) {
      expect(input).toHaveClass("text-base", "sm:text-sm");
    }
    expect(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    ).toHaveClass("h-11");
    expect(screen.getByRole("button", { name: "초기화" })).toHaveClass("h-11");
    expect(withinResults().getAllByText("-")).toHaveLength(3);
    expect(screen.getByTestId("savings-growth-chart")).toHaveAttribute(
      "data-animation-duration",
      String(COMPOUND_ANIMATION_DURATION),
    );
    expect(
      screen.getByText("상세 내역 보기").closest("details"),
    ).toHaveAttribute("open");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("calculates exact records, animates together, opens details, and scrolls", async () => {
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    await fillRequired(user);
    await user.selectOptions(screen.getByLabelText("이자 방식 *"), "compound");
    await user.click(screen.getByLabelText("기간 초"));
    await user.click(screen.getByLabelText("비과세"));
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
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
    expect(screen.getByTestId("savings-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "1",
    );
    expect(screen.getByRole("table")).toBeVisible();
    expect(screen.getAllByRole("row")).toHaveLength(13);
    expect(
      screen.getByText("추가 결과와 적용 가정").closest("details"),
    ).toHaveAttribute("open");
    expect(screen.getByText(/계산이 완료되었습니다/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("supports English UI and identical numeric result labels", async () => {
    const user = userEvent.setup();
    const { container } = render(<SavingsCalculator locale="en" />);
    await user.type(screen.getByLabelText("Recurring deposit *"), "100000");
    await user.type(screen.getByLabelText("Savings period *"), "1");
    await user.type(screen.getByLabelText("Annual interest rate *"), "3.5");
    await user.click(
      screen.getByRole("button", { name: "Calculate maturity estimate" }),
    );
    expect(screen.getByText("Estimated maturity amount")).toBeVisible();
    expect(screen.getAllByTestId("animated-won")[1]).toHaveAccessibleName(
      "₩1,200,000",
    );
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });

  it("keeps validation failures from scrolling and focuses the first error", async () => {
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    const deposit = screen.getByLabelText("정기 납입액 *");
    await user.type(deposit, "0");
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    expect(screen.getByRole("alert")).toBeVisible();
    await waitFor(() => expect(deposit).toHaveFocus());
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("dismisses numeric input focus after a successful keyboard submit", async () => {
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    await fillRequired(user);
    const rate = screen.getByLabelText("연 이자율 *");
    rate.focus();
    await user.keyboard("{Enter}");
    expect(rate).not.toHaveFocus();
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
  });

  it("reset cancels results, animation, and restores placeholders", async () => {
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    await fillRequired(user);
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("정기 납입액 *")).toHaveValue("");
    expect(screen.getByTestId("savings-growth-chart")).toHaveAttribute(
      "data-animation-active",
      "false",
    );
    expect(
      screen.getByText("상세 내역 보기").closest("details"),
    ).toHaveAttribute("open");
    expect(
      screen.getByText("추가 결과와 적용 가정").closest("details"),
    ).not.toHaveAttribute("open");
  });

  it("replays synchronized animations on recalculation", async () => {
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    await fillRequired(user);
    const calculate = screen.getByRole("button", {
      name: "만기 결과 계산하기",
    });
    await user.click(calculate);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId("savings-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "1",
    );
    await user.click(calculate);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(2));
    expect(screen.getByTestId("savings-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "2",
    );
    expect(
      new Set(
        screen
          .getAllByTestId("animated-won")
          .map((node) => node.dataset.animationRun),
      ),
    ).toEqual(new Set(["2"]));
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it("renders final values immediately when reduced motion is preferred", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    await fillRequired(user);
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    expect(screen.getByTestId("savings-growth-chart")).toHaveAttribute(
      "data-animation-active",
      "false",
    );
    expect(screen.getAllByTestId("animated-won")[1]).toHaveTextContent(
      "₩1,200,000",
    );
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      }),
    );
  });
});

function withinResults() {
  return within(screen.getByTestId("primary-results"));
}
