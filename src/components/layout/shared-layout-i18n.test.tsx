import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SkipLink } from "./skip-link";

describe("shared localized layout UI", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    delete document.documentElement.dataset.theme;
    document.documentElement.style.colorScheme = "";
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  it("renders English navigation, footer, skip link, and accessibility labels", async () => {
    const { container } = render(
      <>
        <SkipLink locale="en" />
        <SiteHeader locale="en" pathname="/en/finance/compound-interest" />
        <SiteFooter locale="en" />
      </>,
    );

    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveClass("min-h-11", "focus:inline-flex");
    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toHaveTextContent("Calculators");
    expect(
      screen.getByRole("navigation", { name: "Footer navigation" }),
    ).toHaveTextContent("CalculatorsAboutPrivacy PolicyTermsContact");
    expect(screen.getByLabelText("Select language")).toHaveTextContent(
      "English",
    );
    expect(
      await screen.findByRole("button", { name: "Switch to dark mode" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "CalCome•" })).toHaveClass(
      "min-h-11",
    );
    expect(
      screen
        .getByRole("navigation", { name: "Primary navigation" })
        .querySelector('a[href="/en/calculators"]'),
    ).toHaveClass("min-h-11");
    for (const link of screen
      .getByRole("navigation", { name: "Footer navigation" })
      .querySelectorAll("a")) {
      expect(link).toHaveClass(
        "min-h-11",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
      );
    }

    const allowedKoreanOption = "한국어";
    expect(container.textContent?.replace(allowedKoreanOption, "")).not.toMatch(
      /[가-힣]/,
    );
  });

  it("keeps the existing Korean shared UI", async () => {
    render(
      <>
        <SkipLink locale="ko" />
        <SiteHeader locale="ko" pathname="/ko/finance/compound-interest" />
        <SiteFooter locale="ko" />
      </>,
    );
    expect(screen.getByRole("link", { name: "본문으로 건너뛰기" })).toHaveClass(
      "min-h-11",
      "focus:inline-flex",
    );
    expect(
      screen.getByRole("navigation", { name: "주요 탐색" }),
    ).toHaveTextContent("계산기");
    expect(
      screen.getByRole("navigation", { name: "하단 탐색" }),
    ).toHaveTextContent("계산기소개개인정보처리방침이용약관문의");
    expect(screen.getByLabelText("언어 선택")).toHaveTextContent("한국어");
    expect(
      await screen.findByRole("button", { name: "다크 모드로 전환" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "CalCome•" })).toHaveClass(
      "min-h-11",
    );
  });
});
