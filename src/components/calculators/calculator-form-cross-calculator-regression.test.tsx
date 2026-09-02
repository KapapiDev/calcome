import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AgeCalculator } from "@/features/age/components/age-calculator";
import { BusinessCashRunwayCalculator } from "@/features/business-cash-runway/components/business-cash-runway-calculator";

const scrollIntoViewMock = vi.fn();

describe("calculator form interaction cross-calculator regression", () => {
  beforeEach(() => {
    scrollIntoViewMock.mockReset();
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoViewMock,
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
  });

  it("keeps date calculators on the shared English keyboard, stale-result, and reset contract", async () => {
    const { container } = render(<AgeCalculator locale="en" />);
    const form = container.querySelector("form");
    const birthDate = container.querySelector<HTMLInputElement>("#birthDate");

    expect(form).not.toBeNull();
    expect(birthDate).not.toBeNull();

    fireEvent.change(birthDate!, { target: { value: "" } });
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the highlighted input.",
    );
    expect(birthDate).toHaveFocus();

    fireEvent.change(birthDate!, { target: { value: "1995-06-15" } });
    fireEvent.submit(form!);

    fireEvent.input(birthDate!, { target: { value: "1996-06-15" } });
    expect(screen.getByTestId("stale-result-notice")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    await waitFor(() => expect(birthDate).toHaveFocus());
    expect(screen.queryByTestId("stale-result-notice")).not.toBeInTheDocument();
  });

  it("keeps business calculators on the shared Korean validation and focus-return contract", async () => {
    const { container } = render(<BusinessCashRunwayCalculator locale="ko" />);
    const form = container.querySelector("form");
    const startingCash =
      container.querySelector<HTMLInputElement>("#startingCash");

    expect(form).not.toBeNull();
    expect(startingCash).not.toBeNull();

    fireEvent.change(startingCash!, { target: { value: "" } });
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "입력값을 확인해 주세요.",
    );
    expect(startingCash).toHaveFocus();

    fireEvent.click(screen.getByRole("button", { name: "초기화" }));
    await waitFor(() => expect(startingCash).toHaveFocus());
    expect(startingCash).toHaveValue("120,000,000");
  });
});
