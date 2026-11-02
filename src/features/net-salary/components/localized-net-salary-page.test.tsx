import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocalizedNetSalaryPage } from "./localized-net-salary-page";
import { createNetSalaryMetadata } from "../metadata";
describe("LocalizedNetSalaryPage", () => {
  it.each(["ko", "en"] as const)(
    "explains the annual child-credit transition in %s without the monthly-table age claim",
    (locale) => {
      const { container } = render(<LocalizedNetSalaryPage locale={locale} />);
      expect(container.textContent).not.toMatch(/8~20|8–20|8-20/);
      expect(
        screen.getByLabelText(
          locale === "ko"
            ? "공제요건을 확인한 자녀 수"
            : "Eligible children (check tax year)",
        ),
      ).toBeVisible();
      expect(container.textContent).toContain(
        locale === "ko" ? "9세 이상" : "age 9 or older for 2026",
      );
      expect(container.textContent).toContain(
        locale === "ko"
          ? "2017년생은 이 경과규정에서 제외"
          : "excluding children born in 2017",
      );
      expect(
        screen.getByRole("link", {
          name:
            locale === "ko"
              ? "소득세법 법률 제21548호: 2026년 자녀세액공제 연령 경과규정"
              : "Income Tax Act No. 21548: 2026 child-credit age transition",
        }),
      ).toHaveAttribute(
        "href",
        "https://www.law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010102&lsId=001565",
      );
    },
  );
  it("renders Korean content and structured data", () => {
    const { container } = render(<LocalizedNetSalaryPage locale="ko" />);
    expect(
      screen.getByRole("heading", { name: "실수령액 계산기", level: 1 }),
    ).toBeVisible();
    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).toHaveTextContent("BreadcrumbList");
  });
  it("renders English with South Korea and KRW scope", () => {
    const { container } = render(<LocalizedNetSalaryPage locale="en" />);
    expect(
      screen.getByRole("heading", {
        name: "South Korea Net Salary Calculator",
        level: 1,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "South Korea salary details (KRW)",
      }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
  it("defines localized canonical and hreflang metadata", () => {
    expect(createNetSalaryMetadata("en").alternates).toMatchObject({
      canonical: "/en/employment/net-salary",
      languages: {
        ko: "/ko/employment/net-salary",
        en: "/en/employment/net-salary",
      },
    });
  });
});
