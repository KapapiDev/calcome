import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { COMPOUND_ANIMATION_DURATION } from "@/features/compound-interest/components/compound-animation";

import { CagrCalculator } from "./cagr-calculator";

const scrollIntoView = vi.fn();

describe("CagrCalculator", () => {
  beforeEach(() => {
    window.localStorage.clear();
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
    await user.type(screen.getByLabelText("시작값 *"), "10000000");
    await user.type(screen.getByLabelText("종료값 *"), "15000000");
    await user.type(screen.getByLabelText("투자 기간 *"), "5");
  }

  it("starts empty with mobile-safe inputs and stable result areas", () => {
    render(<CagrCalculator />);
    for (const [label, placeholder] of [
      ["시작값 *", "예: 10,000,000"],
      ["종료값 *", "예: 15,000,000"],
      ["투자 기간 *", "예: 5"],
    ]) {
      const input = screen.getByLabelText(label);
      expect(input).toHaveValue("");
      expect(input).toHaveAttribute("placeholder", placeholder);
      expect(input).toHaveClass("text-base", "sm:text-sm");
    }
    expect(screen.getByLabelText("기간 단위 *")).toHaveValue("years");
    expect(
      within(screen.getByTestId("primary-results")).getAllByText("0.00%"),
    ).toHaveLength(2);
    expect(screen.getByTestId("cagr-growth-chart")).toHaveAttribute(
      "data-animation-duration",
      String(COMPOUND_ANIMATION_DURATION),
    );
    expect(
      screen.getByText("상세 내역 보기").closest("details"),
    ).toHaveAttribute("open");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("calculates, animates, scrolls, and renders all result details", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));

    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      }),
    );
    expect(screen.getAllByTestId("animated-cagr-value")).toHaveLength(6);
    for (const value of screen.getAllByTestId("animated-cagr-value")) {
      expect(value).toHaveAttribute(
        "data-animation-duration",
        String(COMPOUND_ANIMATION_DURATION),
      );
      expect(value).toHaveAttribute("data-animation-run", "1");
    }
    expect(
      screen.getAllByTestId("animated-cagr-value")[0],
    ).toHaveAccessibleName("8.45%");
    expect(screen.getByTestId("cagr-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "1",
    );
    expect(
      screen.getByRole("img", { name: /동일한 CAGR로 연결한 추정 성장 경로/ }),
    ).toBeVisible();
    expect(
      screen.getByRole("table", { name: "CAGR 기준 기간별 성장 상세 내역" }),
    ).toBeVisible();
    expect(screen.getAllByRole("row")).toHaveLength(7);
    for (const label of [
      "CAGR",
      "총 성장률",
      "절대 손익",
      "시작값",
      "종료값",
      "투자 기간",
      "성장 배수",
    ]) {
      expect(
        screen
          .getAllByText(label)
          .some(
            (element) => element.offsetParent !== null || element.isConnected,
          ),
      ).toBe(true);
    }
    expect(
      screen.getByText("추가 결과와 적용 가정").closest("details"),
    ).toHaveAttribute("open");
  });

  it("supports loss calculations and keeps the growth visualization", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    await user.type(screen.getByLabelText("시작값 *"), "10000000");
    await user.type(screen.getByLabelText("종료값 *"), "8100000");
    await user.type(screen.getByLabelText("투자 기간 *"), "2");
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    expect(
      screen.getAllByTestId("animated-cagr-value")[0],
    ).toHaveAccessibleName("-10.00%");
    expect(screen.getByTestId("cagr-growth-chart")).toHaveAttribute(
      "data-animation-active",
      "true",
    );
  });

  it("focuses validation errors without scrolling", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    const initial = screen.getByLabelText("시작값 *");
    await user.type(initial, "0");
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    await waitFor(() => expect(initial).toHaveFocus());
    expect(screen.getByRole("alert")).toBeVisible();
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("clears stale results and links invalid fields to the error summary", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    expect(screen.getByRole("table")).toBeVisible();

    const initial = screen.getByLabelText("시작값 *");
    await user.clear(initial);
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));

    await waitFor(() => expect(initial).toHaveFocus());
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByTestId("cagr-growth-chart")).toHaveAttribute(
      "data-animation-active",
      "false",
    );
    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "cagr-error-summary",
    );
    expect(initial).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("cagr-error-summary"),
    );
  });

  it("dismisses focus, replays on recalculation, and resets cleanly", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    await fillRequired(user);
    const period = screen.getByLabelText("투자 기간 *");
    period.focus();
    await user.keyboard("{Enter}");
    expect(period).not.toHaveFocus();
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(2));
    expect(screen.getByTestId("cagr-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "2",
    );
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("시작값 *")).toHaveValue("");
    expect(screen.getByTestId("cagr-growth-chart")).toHaveAttribute(
      "data-animation-active",
      "false",
    );
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("renders immediately and scrolls without motion when requested", async () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    const user = userEvent.setup();
    render(<CagrCalculator />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    expect(screen.getAllByTestId("animated-cagr-value")[0]).toHaveTextContent(
      "8.45%",
    );
    expect(screen.getByTestId("cagr-growth-chart")).toHaveAttribute(
      "data-animation-active",
      "false",
    );
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      }),
    );
  });

  it("renders fully localized English UI", async () => {
    const user = userEvent.setup();
    const { container } = render(<CagrCalculator locale="en" />);
    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Beginning value *"), "10000000");
    await user.type(screen.getByLabelText("Ending value *"), "15000000");
    await user.type(screen.getByLabelText("Investment period *"), "5");
    await user.click(screen.getByRole("button", { name: "Calculate CAGR" }));
    expect(
      screen.getByRole("heading", { name: "CAGR analysis" }),
    ).toBeVisible();
    expect(
      screen.getAllByTestId("animated-cagr-value")[2],
    ).toHaveAccessibleName("$5,000,000");
    expect(
      screen.getAllByTestId("animated-cagr-value")[0],
    ).toHaveAccessibleName("8.45%");
    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(
      screen.getAllByTestId("animated-cagr-value")[2],
    ).toHaveAccessibleName("£5,000,000");
    expect(
      screen.getAllByTestId("animated-cagr-value")[0],
    ).toHaveAccessibleName("8.45%");
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
});
