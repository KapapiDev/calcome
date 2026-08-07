import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { COMPOUND_ANIMATION_DURATION } from "@/features/compound-interest/components/compound-animation";

import { DepositCalculator } from "./deposit-calculator";

const scrollIntoView = vi.fn();

describe("DepositCalculator", () => {
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
    await user.type(screen.getByLabelText("예치 원금 *"), "10000000");
    await user.type(screen.getByLabelText("예치 기간 *"), "1");
    await user.type(screen.getByLabelText("연 이자율 *"), "3.5");
  }
  it("starts empty with placeholders and stable result areas", () => {
    render(<DepositCalculator />);
    expect(screen.getByLabelText("예치 원금 *")).toHaveValue("");
    expect(screen.getByLabelText("예치 원금 *")).toHaveAttribute(
      "placeholder",
      "예: 10,000,000",
    );
    expect(screen.getByLabelText("예치 기간 *")).toHaveValue("");
    expect(screen.getByLabelText("연 이자율 *")).toHaveValue("");
    for (const input of [
      screen.getByLabelText("예치 원금 *"),
      screen.getByLabelText("예치 기간 *"),
      screen.getByLabelText("연 이자율 *"),
    ]) {
      expect(input).toHaveClass("text-base", "sm:text-sm");
    }
    expect(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    ).toHaveClass("h-11");
    expect(screen.getByRole("button", { name: "초기화" })).toHaveClass("h-11");
    expect(
      within(screen.getByTestId("primary-results")).getAllByText("-"),
    ).toHaveLength(3);
    expect(screen.getByTestId("deposit-growth-chart")).toHaveAttribute(
      "data-animation-duration",
      String(COMPOUND_ANIMATION_DURATION),
    );
    expect(
      screen.getByText("상세 내역 보기").closest("details"),
    ).toHaveAttribute("open");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
  it("calculates, animates, scrolls, and renders engine schedule records", async () => {
    const user = userEvent.setup();
    render(<DepositCalculator />);
    await fillRequired(user);
    await user.selectOptions(screen.getByLabelText("이자 방식 *"), "compound");
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
    expect(screen.getByTestId("deposit-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "1",
    );
    expect(screen.getByRole("table")).toBeVisible();
    expect(screen.getAllByRole("row")).toHaveLength(13);
    expect(
      screen.getByText("추가 결과와 적용 가정").closest("details"),
    ).toHaveAttribute("open");
  });
  it("renders fully localized English UI", async () => {
    const user = userEvent.setup();
    const { container } = render(<DepositCalculator locale="en" />);
    await user.type(screen.getByLabelText("Initial deposit *"), "10000000");
    await user.type(screen.getByLabelText("Deposit period *"), "1");
    await user.type(screen.getByLabelText("Annual interest rate *"), "3.5");
    await user.click(
      screen.getByRole("button", { name: "Calculate maturity estimate" }),
    );
    expect(screen.getAllByTestId("animated-won")[1]).toHaveAccessibleName(
      "₩10,000,000",
    );
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
  it("focuses the first invalid field without scrolling", async () => {
    const user = userEvent.setup();
    render(<DepositCalculator />);
    const amount = screen.getByLabelText("예치 원금 *");
    await user.type(amount, "0");
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    await waitFor(() => expect(amount).toHaveFocus());
    expect(screen.getByRole("alert")).toBeVisible();
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
  it("dismisses numeric input focus after a successful keyboard submit", async () => {
    const user = userEvent.setup();
    render(<DepositCalculator />);
    await fillRequired(user);
    const rate = screen.getByLabelText("연 이자율 *");
    rate.focus();
    await user.keyboard("{Enter}");
    expect(rate).not.toHaveFocus();
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
  });
  it("replays on recalculation and reset restores the empty state", async () => {
    const user = userEvent.setup();
    render(<DepositCalculator />);
    await fillRequired(user);
    const calculate = screen.getByRole("button", {
      name: "만기 결과 계산하기",
    });
    await user.click(calculate);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    await user.click(calculate);
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(2));
    expect(screen.getByTestId("deposit-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "2",
    );
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("예치 원금 *")).toHaveValue("");
    expect(screen.getByTestId("deposit-growth-chart")).toHaveAttribute(
      "data-animation-active",
      "false",
    );
  });
  it("disables chart and number motion for reduced-motion users", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    const user = userEvent.setup();
    render(<DepositCalculator />);
    await fillRequired(user);
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    expect(screen.getByTestId("deposit-growth-chart")).toHaveAttribute(
      "data-animation-active",
      "false",
    );
    expect(screen.getAllByTestId("animated-won")[1]).toHaveTextContent(
      "₩10,000,000",
    );
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      }),
    );
  });
});
