import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CalculatorsPage, { metadata } from "./page";

describe("calculator directory", () => {
  it("defines unique metadata and a canonical URL", () => {
    expect(metadata.title).toBe("금융 계산기 모음");
    expect(metadata.alternates).toEqual({ canonical: "/calculators" });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/calculators",
      siteName: "CalCome",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("lists the currently published calculators", () => {
    const { container } = render(<CalculatorsPage />);

    expect(screen.getByRole("heading", { name: "모든 계산기" })).toBeVisible();
    expect(
      within(screen.getByRole("list", { name: "공개 계산기" })).getAllByRole(
        "listitem",
      ),
    ).toHaveLength(51);
    expect(screen.getByRole("link", { name: /배당금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/dividend",
    );
    expect(
      screen.getByRole("link", { name: /주식 수익률 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/stock-profit-loss");
    expect(
      screen.getByRole("link", { name: /주식 물타기 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/stock-average-cost");
    expect(
      screen.getByRole("link", { name: /부동산 중개보수 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/real-estate-brokerage-fee");
    expect(
      screen.getByRole("link", { name: /전세 월세 전환 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/jeonse-monthly-rent-conversion");
    expect(
      screen.getByRole("link", { name: /전월세 전환율 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/rent-conversion-rate");
    expect(
      screen.getByRole("link", { name: /신용카드 할부 수수료 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/credit-card-installment-interest");
    expect(
      screen.getByRole("link", { name: /대출 상환 기간 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/debt-repayment-period");
    expect(
      screen.getByRole("link", { name: /대출 한도 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/loan-affordability");
    expect(
      screen.getByRole("link", { name: /프리랜서 3.3% 세금 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/freelancer-3-3-tax");
    expect(
      screen.getByRole("link", { name: /원천징수세 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/withholding-tax");
    expect(
      screen.getByRole("link", { name: /종합소득세 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/comprehensive-income-tax");
    expect(
      screen.getByRole("link", { name: /부가가치세 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/value-added-tax");
    expect(
      screen.getByRole("link", { name: /종합부동산세 계산기/ }),
    ).toHaveAttribute(
      "href",
      "/ko/finance/comprehensive-real-estate-holding-tax",
    );
    expect(screen.getByRole("link", { name: /재산세 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/property-tax",
    );
    expect(screen.getByRole("link", { name: /상속세 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/inheritance-tax",
    );
    expect(screen.getByRole("link", { name: /증여세 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/gift-tax",
    );
    expect(
      screen.getByRole("link", { name: /양도소득세 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/capital-gains-tax");
    expect(
      screen.getByRole("link", { name: /부동산 취득세 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/real-estate-acquisition-tax");
    expect(screen.getByRole("link", { name: /DTI 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/dti",
    );
    expect(
      screen.getByRole("link", { name: /대출 이자 비교 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/loan-interest-comparison");
    expect(
      screen.getByRole("link", { name: /대출 대환 절감 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/loan-refinancing-savings");
    expect(
      screen.getByRole("link", { name: /만기 일시상환액 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/balloon-payment");
    expect(
      screen.getByRole("link", { name: /주택담보대출 상환액 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/mortgage-payment");
    expect(
      screen.getByRole("link", { name: /전세대출 이자 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/jeonse-loan-interest");
    expect(
      screen.getByRole("link", { name: /신용대출 이자 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/credit-loan-interest");
    expect(
      screen.getByRole("link", { name: /대출 중도상환수수료 계산기/ }),
    ).toHaveAttribute("href", "/ko/finance/early-loan-repayment-fee");
    expect(screen.getByRole("link", { name: /LTV 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/ltv",
    );
    expect(screen.getByRole("link", { name: /DSR 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/dsr",
    );
    expect(
      screen.getByRole("link", { name: /주휴수당 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/weekly-holiday-pay");
    expect(screen.getByRole("link", { name: /CAGR 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/cagr",
    );
    expect(screen.getByRole("link", { name: /예금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/fixed-deposit",
    );
    expect(screen.getByRole("link", { name: /적금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/savings",
    );
    expect(screen.getByRole("link", { name: /대출 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/loan",
    );
    expect(screen.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/compound-interest",
    );
    expect(screen.getByRole("link", { name: /퇴직금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/employment/severance-pay",
    );
    expect(
      screen.getByRole("link", { name: /실업급여 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/unemployment-benefits");
    expect(
      screen.getByRole("link", { name: /실수령액 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/net-salary");
    expect(screen.getByRole("link", { name: /시급 계산기/ })).toHaveAttribute(
      "href",
      "/ko/employment/hourly-wage",
    );
    expect(
      screen.getByRole("link", { name: /4대보험 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/social-insurance");
    expect(
      screen.getByRole("link", { name: /평균임금 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/average-wage");
    expect(
      screen.getByRole("link", { name: /연봉 인상률 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/salary-raise");
    expect(
      screen.getByRole("link", { name: /연봉·월급 환산 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/salary-conversion");
    expect(
      screen.getByRole("link", { name: /연장근로수당 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/overtime-pay");
    expect(
      screen.getByRole("link", { name: /휴일근로수당 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/holiday-work-pay");
    expect(
      screen.getByRole("link", { name: /최저임금 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/minimum-wage");
    expect(
      screen.getByRole("link", { name: /연차수당 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/annual-leave-allowance");
    expect(
      screen.getByRole("link", { name: /퇴직연금 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/retirement-pension");
    expect(
      screen.getByRole("link", { name: /세전 급여 역산 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/gross-up-salary");

    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(JSON.parse(jsonLd!.textContent!)).toMatchObject({
      "@type": "CollectionPage",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: 51,
        itemListElement: [
          {
            position: 1,
            name: "LTV 계산기",
            url: "https://www.calcome.com/ko/finance/ltv",
          },
          {
            position: 2,
            name: "DSR 계산기",
            url: "https://www.calcome.com/ko/finance/dsr",
          },
          {
            position: 3,
            name: "주휴수당 계산기",
            url: "https://www.calcome.com/ko/employment/weekly-holiday-pay",
          },
          {
            position: 4,
            name: "CAGR 계산기",
            url: "https://www.calcome.com/ko/finance/cagr",
          },
          {
            position: 5,
            name: "예금 계산기",
            url: "https://www.calcome.com/ko/finance/fixed-deposit",
          },
          {
            position: 6,
            name: "적금 계산기",
            url: "https://www.calcome.com/ko/finance/savings",
          },
          {
            position: 7,
            name: "대출 계산기",
            url: "https://www.calcome.com/ko/finance/loan",
          },
          {
            position: 8,
            name: "복리 계산기",
            url: "https://www.calcome.com/ko/finance/compound-interest",
          },
          {
            position: 9,
            name: "퇴직금 계산기",
            url: "https://www.calcome.com/ko/employment/severance-pay",
          },
          {
            position: 10,
            name: "실업급여 계산기",
            url: "https://www.calcome.com/ko/employment/unemployment-benefits",
          },
          {
            position: 11,
            name: "실수령액 계산기",
            url: "https://www.calcome.com/ko/employment/net-salary",
          },
          {
            position: 12,
            name: "시급 계산기",
            url: "https://www.calcome.com/ko/employment/hourly-wage",
          },
          {
            position: 13,
            name: "4대보험 계산기",
            url: "https://www.calcome.com/ko/employment/social-insurance",
          },
          {
            position: 14,
            name: "평균임금 계산기",
            url: "https://www.calcome.com/ko/employment/average-wage",
          },
          {
            position: 15,
            name: "연봉 인상률 계산기",
            url: "https://www.calcome.com/ko/employment/salary-raise",
          },
          {
            position: 16,
            name: "연봉·월급 환산 계산기",
            url: "https://www.calcome.com/ko/employment/salary-conversion",
          },
          {
            position: 17,
            name: "연장근로수당 계산기",
            url: "https://www.calcome.com/ko/employment/overtime-pay",
          },
          {
            position: 18,
            name: "야간근로수당 계산기",
            url: "https://www.calcome.com/ko/employment/night-work-pay",
          },
          {
            position: 19,
            name: "휴일근로수당 계산기",
            url: "https://www.calcome.com/ko/employment/holiday-work-pay",
          },
          {
            position: 20,
            name: "최저임금 계산기",
            url: "https://www.calcome.com/ko/employment/minimum-wage",
          },
          {
            position: 21,
            name: "연차수당 계산기",
            url: "https://www.calcome.com/ko/employment/annual-leave-allowance",
          },
          {
            position: 22,
            name: "퇴직연금 계산기",
            url: "https://www.calcome.com/ko/employment/retirement-pension",
          },
          {
            position: 23,
            name: "세전 급여 역산 계산기",
            url: "https://www.calcome.com/ko/employment/gross-up-salary",
          },
          {
            position: 24,
            name: "대출 이자 비교 계산기",
            url: "https://www.calcome.com/ko/finance/loan-interest-comparison",
          },
          {
            position: 25,
            name: "대출 대환 절감 계산기",
            url: "https://www.calcome.com/ko/finance/loan-refinancing-savings",
          },
          {
            position: 26,
            name: "만기 일시상환액 계산기",
            url: "https://www.calcome.com/ko/finance/balloon-payment",
          },
          {
            position: 27,
            name: "주택담보대출 상환액 계산기",
            url: "https://www.calcome.com/ko/finance/mortgage-payment",
          },
          {
            position: 28,
            name: "전세대출 이자 계산기",
            url: "https://www.calcome.com/ko/finance/jeonse-loan-interest",
          },
          {
            position: 29,
            name: "신용대출 이자 계산기",
            url: "https://www.calcome.com/ko/finance/credit-loan-interest",
          },
          {
            position: 30,
            name: "대출 중도상환수수료 계산기",
            url: "https://www.calcome.com/ko/finance/early-loan-repayment-fee",
          },
          {
            position: 31,
            name: "DTI 계산기",
            url: "https://www.calcome.com/ko/finance/dti",
          },
          {
            position: 32,
            name: "부동산 취득세 계산기",
            url: "https://www.calcome.com/ko/finance/real-estate-acquisition-tax",
          },
          {
            position: 33,
            name: "양도소득세 계산기",
            url: "https://www.calcome.com/ko/finance/capital-gains-tax",
          },
          {
            position: 34,
            name: "증여세 계산기",
            url: "https://www.calcome.com/ko/finance/gift-tax",
          },
          {
            position: 35,
            name: "상속세 계산기",
            url: "https://www.calcome.com/ko/finance/inheritance-tax",
          },
          {
            position: 36,
            name: "재산세 계산기",
            url: "https://www.calcome.com/ko/finance/property-tax",
          },
          {
            position: 37,
            name: "종합부동산세 계산기",
            url: "https://www.calcome.com/ko/finance/comprehensive-real-estate-holding-tax",
          },
          {
            position: 38,
            name: "부가가치세 계산기",
            url: "https://www.calcome.com/ko/finance/value-added-tax",
          },
          {
            position: 39,
            name: "종합소득세 계산기",
            url: "https://www.calcome.com/ko/finance/comprehensive-income-tax",
          },
          {
            position: 40,
            name: "원천징수세 계산기",
            url: "https://www.calcome.com/ko/finance/withholding-tax",
          },
          {
            position: 41,
            name: "프리랜서 3.3% 세금 계산기",
            url: "https://www.calcome.com/ko/finance/freelancer-3-3-tax",
          },
          {
            position: 42,
            name: "대출 한도 계산기",
            url: "https://www.calcome.com/ko/finance/loan-affordability",
          },
          {
            position: 43,
            name: "대출 상환 기간 계산기",
            url: "https://www.calcome.com/ko/finance/debt-repayment-period",
          },
          {
            position: 44,
            name: "신용카드 할부 수수료 계산기",
            url: "https://www.calcome.com/ko/finance/credit-card-installment-interest",
          },
          {
            position: 45,
            name: "전월세 전환율 계산기",
            url: "https://www.calcome.com/ko/finance/rent-conversion-rate",
          },
          {
            position: 46,
            name: "전세 월세 전환 계산기",
            url: "https://www.calcome.com/ko/finance/jeonse-monthly-rent-conversion",
          },
          {
            position: 47,
            name: "부동산 중개보수 계산기",
            url: "https://www.calcome.com/ko/finance/real-estate-brokerage-fee",
          },
          {
            position: 48,
            name: "주식 물타기 계산기",
            url: "https://www.calcome.com/ko/finance/stock-average-cost",
          },
          {
            position: 49,
            name: "주식 수익률 계산기",
            url: "https://www.calcome.com/ko/finance/stock-profit-loss",
          },
          {
            position: 50,
            name: "배당금 계산기",
            url: "https://www.calcome.com/ko/finance/dividend",
          },
        ],
      },
    });
  });
});
