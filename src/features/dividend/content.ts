export type DividendLocale = "ko" | "en";

export const dividendContent = {
  ko: {
    title: "배당금 계산기",
    metaTitle: "배당금 계산기 | 연간·세후 배당금 계산",
    description:
      "보유 수량과 주당 연간 배당금, 지급 횟수, 원천징수율로 예상 연간 배당금과 세후 배당금을 계산합니다.",
    category: "투자 계산기",
    intro:
      "회사가 공시한 주당 연간 배당금과 본인에게 적용할 세율을 확인한 뒤 예상 현금흐름을 계산하세요.",
    input: "배당 가정",
    shares: "보유 수량",
    annualDividendPerShare: "주당 연간 배당금",
    paymentsPerYear: "연간 지급 횟수",
    withholdingTaxRate: "예상 원천징수율",
    calculate: "배당금 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산된 배당금",
    netAnnualDividend: "예상 세후 연간 배당금",
    grossAnnualDividend: "세전 연간 배당금",
    grossDividendPerPayment: "회당 세전 배당금",
    estimatedTax: "예상 원천징수액",
    netMonthlyAverage: "월평균 세후 배당금",
    details: "계산 상세",
    empty: "계산하면 연간, 회당, 월평균 배당금이 표시됩니다.",
    note: "배당금과 세율을 직접 확인해 입력하는 단순 추정치이며 실제 지급액과 다를 수 있습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "보유 수량에 주당 연간 배당금을 곱해 세전 연간 배당금을 계산합니다.",
      "입력한 원천징수율을 세전 배당금에 적용해 예상 세금과 세후 금액을 계산합니다.",
      "연간 지급 횟수로 나눈 회당 금액과 12개월로 나눈 월평균 세후 금액을 함께 보여 줍니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "배당은 회사 결정에 따라 감액, 중단 또는 지급 일정 변경이 발생할 수 있습니다.",
      "국가, 계좌 유형, 소득 구분과 조세조약에 따라 실제 세율과 추가 납부·환급액이 달라질 수 있습니다.",
      "환율, 증권사 비용, 재투자 수익은 포함하지 않으며 지급 횟수가 같아도 회차별 금액은 다를 수 있습니다.",
    ],
    faq: [
      [
        "주당 배당금은 무엇을 입력하나요?",
        "최근 한 번의 배당금이 아니라 회사가 공시한 주당 연간 배당금 합계를 입력하세요.",
      ],
      [
        "분기 배당은 지급 횟수를 어떻게 입력하나요?",
        "일반적인 분기 배당은 4를 입력하되 실제 지급 일정은 회사 공시를 확인하세요.",
      ],
      [
        "원천징수율 15.4%가 항상 맞나요?",
        "아니요. 15.4%는 일부 국내 배당의 일반적인 단순 가정일 뿐이므로 본인에게 적용되는 세율을 확인해야 합니다.",
      ],
      [
        "배당수익률도 계산되나요?",
        "아니요. 이 계산기는 배당 현금흐름을 계산하며, 투자금 또는 주가 대비 수익률은 별도의 배당수익률 계산이 필요합니다.",
      ],
    ] as const,
  },
  en: {
    title: "Dividend Calculator",
    metaTitle: "Dividend Calculator | Annual and After-Tax Income",
    description:
      "Estimate annual and after-tax dividends from shares, annual dividend per share, payment frequency, and a confirmed withholding rate.",
    category: "Investment calculator",
    intro:
      "Confirm the company's annual dividend per share and your applicable tax assumption before estimating cash flow.",
    input: "Dividend assumptions",
    shares: "Shares held",
    annualDividendPerShare: "Annual dividend per share",
    paymentsPerYear: "Payments per year",
    withholdingTaxRate: "Estimated withholding rate",
    calculate: "Calculate dividends",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Calculated dividends",
    netAnnualDividend: "Estimated net annual dividend",
    grossAnnualDividend: "Gross annual dividend",
    grossDividendPerPayment: "Gross dividend per payment",
    estimatedTax: "Estimated withholding",
    netMonthlyAverage: "Average net dividend per month",
    details: "Calculation details",
    empty:
      "Calculate to see annual, per-payment, and monthly-average dividends.",
    note: "A simple estimate based on dividend and tax assumptions you confirm; actual payments may differ.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Shares are multiplied by annual dividend per share for the gross annual dividend.",
      "Your withholding-rate assumption is applied to estimate tax and the net annual dividend.",
      "The calculator also divides gross annual dividends by payment count and net annual dividends by 12.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "A company may reduce, suspend, or reschedule dividends at its discretion.",
      "Actual tax can vary by country, account type, income classification, and tax treaty, including later payments or refunds.",
      "Currency movements, brokerage costs, and reinvestment returns are excluded, and individual payments may be unequal.",
    ],
    faq: [
      [
        "Which dividend per share should I enter?",
        "Enter the company's stated total annual dividend per share, not only its latest payment.",
      ],
      [
        "What frequency should I use for quarterly dividends?",
        "Use 4 for a typical quarterly schedule, after confirming the company's actual timetable.",
      ],
      [
        "Why is the withholding rate not prefilled?",
        "The applicable rate varies by country, account type, income classification, and tax treaty, so confirm the rate that applies to you.",
      ],
      [
        "Does this calculate dividend yield?",
        "No. This calculator estimates dividend cash flow; yield requires an investment amount or share price.",
      ],
    ] as const,
  },
} as const;
