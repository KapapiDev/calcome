import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createCompoundMetadata } from "../metadata";
import { calculateCompoundInterest } from "../calculate";
import { validateCompoundInterestForm } from "../validation";
import { LocalizedCompoundInterestPage } from "./localized-compound-interest-page";

describe("localized compound interest pages", () => {
  it("keeps validated inputs and calculation results identical across locales", () => {
    const values = {
      initialPrincipal: "10000000",
      recurringContribution: "500000",
      contributionFrequency: "monthly" as const,
      durationYears: "10",
      annualInterestRate: "5",
      compoundingFrequency: "monthly" as const,
      contributionTiming: "end" as const,
      inflationRate: "",
      taxRate: "",
    };
    const korean = validateCompoundInterestForm(values, "ko").data!;
    const english = validateCompoundInterestForm(values, "en").data!;
    expect(english).toEqual(korean);
    expect(calculateCompoundInterest(english)).toEqual(
      calculateCompoundInterest(korean),
    );
  });

  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });
  it("renders the Korean experience and localized SEO", () => {
    render(<LocalizedCompoundInterestPage locale="ko" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "복리 계산기" }),
    ).toBeVisible();
    expect(screen.getByLabelText("초기 투자금 *")).toBeVisible();
    const metadata = createCompoundMetadata("ko");
    expect(metadata.alternates).toMatchObject({
      canonical: "/ko/finance/compound-interest",
      languages: {
        ko: "/ko/finance/compound-interest",
        en: "/en/finance/compound-interest",
      },
    });
  });

  it("renders a complete English experience without Korean calculator labels", async () => {
    const user = userEvent.setup();
    const { container } = render(<LocalizedCompoundInterestPage locale="en" />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Compound Interest Calculator",
      }),
    ).toBeVisible();
    expect(screen.getByLabelText("Initial investment *")).toBeVisible();
    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    expect(screen.getByText(/does not convert exchange rates/)).toBeVisible();
    expect(container).not.toHaveTextContent("초기 투자금");
    expect(container).not.toHaveTextContent("예상 결과 계산하기");
    expect(container).not.toHaveTextContent("자주 묻는 질문");
    await user.type(screen.getByLabelText("Initial investment *"), "1000000");
    await user.type(
      screen.getByLabelText("Recurring contribution *"),
      "100000",
    );
    await user.type(screen.getByLabelText("Investment period *"), "10");
    await user.type(screen.getByLabelText("Annual interest rate *"), "5");
    await user.click(
      screen.getByRole("button", { name: "Calculate estimated results" }),
    );
    expect(
      screen.getByRole("table", {
        name: "Year-by-year compound interest details",
      }),
    ).toBeVisible();
    expect(screen.getByTestId("compound-growth-chart")).toHaveAttribute(
      "data-animation-duration",
      "1300",
    );
    expect(container).not.toHaveTextContent("상세 내역 보기");
    expect(container.textContent).not.toMatch(/[가-힣]/);
    const metadata = createCompoundMetadata("en");
    expect(metadata.alternates).toMatchObject({
      canonical: "/en/finance/compound-interest",
      languages: {
        ko: "/ko/finance/compound-interest",
        en: "/en/finance/compound-interest",
      },
    });
  });
});
