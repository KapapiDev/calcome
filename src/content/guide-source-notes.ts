import type { GuideLocale } from "./guides";

// Describe the claim supported by each source; none endorses CalCome's outputs.
export const guideSourceNotes: Record<string, Record<GuideLocale, string>> = {
  "https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596": {
    ko: "국세청의 연간 근로소득 세액공제 안내입니다. 급여 구간에 따라 근로소득세액공제 한도가 달라지므로, 실수령액 모델의 고정된 간편 상한으로 공식 연말정산 세액을 재현할 수 없다는 범위 설명에 사용합니다. 월 원천징수표의 세액을 이 자료로 산출한 것은 아닙니다.",
    en: "NTS guidance on annual earned-income tax credits explains that credit limits vary with salary. It supports the limitation that the Net Salary model's fixed simplified cap does not reproduce the official year-end calculation. This reference is not the basis for the monthly withholding-table amount.",
  },
  "https://syndication.finra.org/content/how-are-your-investments-doing-returns-explained":
    {
      ko: "금융업 자율규제기관 FINRA의 교육 자료입니다. 기간을 맞춘 연환산 비교와 비용·배당을 포함한 수익 계산의 중요성을 뒷받침합니다. 이 페이지의 100 기준 비교표는 CalCome이 만든 가상 사례이며 FINRA의 상품 수익률이나 검증 결과가 아닙니다.",
      en: "Educational material from financial-industry self-regulator FINRA supports annualizing returns over comparable periods and accounting for costs and distributions. The comparison starting at 100 is CalCome's hypothetical example, not FINRA product performance or validation of this tool.",
    },
  "https://www.fidelity.com/learning-center/investment-products/fixed-income-bonds/bond-prices-rates-yields":
    {
      ko: "금융회사 Fidelity의 교육 자료입니다. 현재수익률과 만기수익률이 다른 이유, 매입가격·쿠폰·만기 상환금의 관계를 설명합니다. CalCome의 1년 만기 비교는 자체 산술 예시이며 실제 상품 견적이나 금융당국의 인증이 아닙니다.",
      en: "Educational material from financial provider Fidelity explains current yield versus yield to maturity and the role of purchase price, coupons and repayment. CalCome's one-year comparison is its own arithmetic example, not a product quote or regulatory certification.",
    },
  "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-86":
    {
      ko: "미국 SEC의 투자자 교육 자료입니다. 시장금리와 고정금리 채권 가격의 반대 방향 관계를 뒷받침합니다. 1,050을 할인한 표의 수치는 CalCome의 가정에 따른 계산이며, 특정 채권 가격이나 실현 수익을 보장하지 않습니다.",
      en: "Investor education from the U.S. SEC supports the inverse relationship between market interest rates and fixed-rate bond prices. The table discounting 1,050 is CalCome's calculation under stated assumptions, not a specific bond quote or a guarantee of realized returns.",
    },
  "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html":
    {
      ko: "유럽중앙은행은 기준환율을 정보 제공용으로 설명하며 거래용 사용을 권장하지 않습니다. 이 가이드에서는 기준환율과 실제 적용환율의 구분에 사용합니다. 표의 USD/KRW 1,300·1,350은 가정값이며 ECB의 현재 고시환율이 아닙니다.",
      en: "The European Central Bank describes its reference rates as informational and discourages using them for transactions. This supports distinguishing reference and applied rates. The USD/KRW rates of 1,300 and 1,350 here are hypothetical, not current ECB quotes.",
    },
  "https://www.consumerfinance.gov/consumer-tools/sending-money/": {
    ko: "미국 CFPB의 송금 안내입니다. 총비용·환율·수취액을 함께 비교해야 하는 이유를 뒷받침합니다. 미국의 제도 안내를 한국 거래의 법적 권리로 일반화하지 않으며, 6,000원 수수료는 CalCome의 가정값입니다.",
    en: "U.S. CFPB transfer guidance supports comparing total cost, exchange rate and the amount received. Its U.S. regulatory guidance is not a statement of legal rights for Korean transactions. The KRW 6,000 fee is CalCome's hypothetical assumption.",
  },
  "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862&mi=6583": {
    ko: "국세청의 월급여 간이세액표 안내입니다. 본인 포함 가족 수와 80%·100%·120% 선택 구조, 350만원 이상 352만원 미만·가족 1명 구간의 127,220원과 대조했습니다. 이 사례는 자녀 0명이며 해당 안내의 자녀 공제액을 적용하지 않습니다. 실제 지급 시점의 적용표와 개인 요건은 별도로 확인해야 합니다.",
    en: "NTS guidance on South Korea's monthly withholding table supports counting the employee in the family total and the 80%/100%/120% options. The cited KRW 3.50m–below 3.52m band with one family member shows KRW 127,220. This child-free case does not use the page's child-credit amounts. Confirm the applicable table and eligibility for the actual payment date.",
  },
};
