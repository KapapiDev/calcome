import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SeveranceCalculator } from "./severance-calculator";

const scrollIntoView = vi.fn();
describe("SeveranceCalculator", () => {
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
    await user.type(screen.getByLabelText("1일 평균임금 *"), "100000");
    await user.type(screen.getByLabelText("입사일 *"), "2023-01-01");
    await user.type(screen.getByLabelText("퇴직일 *"), "2024-01-01");
  }
  it("starts empty with mobile-safe inputs and stable results", () => {
    render(<SeveranceCalculator />);
    expect(screen.getByLabelText("1일 평균임금 *")).toHaveValue("");
    expect(screen.getByLabelText("1일 평균임금 *")).toHaveClass(
      "text-base",
      "sm:text-sm",
    );
    expect(screen.getByTestId("primary-results")).toBeVisible();
    expect(screen.getByTestId("service-timeline")).toHaveTextContent(
      /계산하면/,
    );
  });
  it("calculates, animates, scrolls, and opens details", async () => {
    const user = userEvent.setup();
    render(<SeveranceCalculator />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: "퇴직금 계산하기" }));
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      }),
    );
    expect(screen.getAllByTestId("animated-won")).toHaveLength(3);
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩3,000,000",
    );
    expect(screen.getByTestId("service-timeline")).toHaveTextContent("1.00년");
    expect(
      screen.getByText("계산 요약과 적용 가정").closest("details"),
    ).toHaveAttribute("open");
  });
  it("supports manual service entry and reset", async () => {
    const user = userEvent.setup();
    render(<SeveranceCalculator />);
    await user.type(screen.getByLabelText("1일 평균임금 *"), "100000");
    await user.click(screen.getByLabelText("년·월·일 직접 입력"));
    await user.type(screen.getByLabelText("년 *"), "2");
    await user.click(screen.getByRole("button", { name: "퇴직금 계산하기" }));
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩6,000,000",
    );
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("1일 평균임금 *")).toHaveValue("");
    expect(screen.getByTestId("service-timeline")).toHaveTextContent(
      /계산하면/,
    );
  });
  it("keeps validation failures from scrolling", async () => {
    const user = userEvent.setup();
    render(<SeveranceCalculator />);
    await user.click(screen.getByRole("button", { name: "퇴직금 계산하기" }));
    expect(screen.getByRole("alert")).toBeVisible();
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
  it("clears stale results and links invalid fields to the error summary", async () => {
    const user = userEvent.setup();
    render(<SeveranceCalculator />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: "퇴직금 계산하기" }));
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩3,000,000",
    );

    const averageWage = screen.getByLabelText("1일 평균임금 *");
    await user.clear(averageWage);
    await user.click(screen.getByRole("button", { name: "퇴직금 계산하기" }));

    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "severance-error-summary",
    );
    expect(averageWage).toHaveAttribute("aria-invalid", "true");
    expect(averageWage).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("severance-error-summary"),
    );
    expect(screen.getAllByTestId("animated-won")[0]).not.toHaveAccessibleName(
      "₩3,000,000",
    );
    expect(screen.getByTestId("service-timeline")).toHaveTextContent(
      /계산하면/,
    );
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
    render(<SeveranceCalculator />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: "퇴직금 계산하기" }));
    await waitFor(() =>
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      }),
    );
    expect(screen.getAllByTestId("animated-won")[0]).toHaveTextContent(
      "₩3,000,000",
    );
  });
  it("renders English without Korean", () => {
    const { container } = render(<SeveranceCalculator locale="en" />);
    expect(
      screen.getByRole("heading", { name: "Severance conditions" }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
});
