// Original, hypothetical comparisons. These figures are not current product quotes.
export const costGuideSlugs = [
  "loan-term-total-interest",
  "refinancing-break-even",
  "investment-fees-compound",
] as const;

export const costGuideSources = {
  "loan-term-total-interest": [
    {
      label: "CFPB — Loan term choices",
      href: "https://www.consumerfinance.gov/owning-a-home/explore/understand-the-different-kinds-of-loans-available/",
    },
  ],
  "refinancing-break-even": [
    {
      label:
        "Federal Reserve — A Consumer's Guide to Mortgage Refinancings (archived education)",
      href: "https://www.federalreserve.gov/pubs/refinancings/default.htm",
    },
  ],
  "investment-fees-compound": [
    {
      label:
        "SEC Investor.gov — How Fees and Expenses Affect Your Investment Portfolio",
      href: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated",
    },
  ],
};

export const costGuideSourceNotes = {
  [costGuideSources["loan-term-total-interest"][0].href]: {
    ko: "미국 CFPB의 교육 자료는 상환기간에 따른 월 납입액과 총이자의 차이를 설명합니다. 한국의 대출 규정이나 승인 기준의 근거로 사용하지 않습니다. 1억원·연 4% 비교 수치는 CalCome의 가정과 산식으로 계산했습니다.",
    en: "CFPB education explains how loan term affects monthly payments and lifetime interest. It is not evidence of Korean lending rules or approval criteria. The KRW 100m, 4% scenarios are CalCome's hypothetical calculations.",
  },
  [costGuideSources["refinancing-break-even"][0].href]: {
    ko: "미국 연준의 과거 교육 자료에서 전환 비용을 월 절감액으로 나누는 단순 회수기간 개념을 참고했습니다. 현행 미국·한국의 법규나 비용률은 적용하지 않았습니다. 5%→4%와 비용 0·100만·300만원은 자체 가정입니다.",
    en: "Archived Federal Reserve education supports the simple costs-divided-by-monthly-savings payback concept. No current U.S. or Korean rules or fee rates are inferred. Rates of 5% and 4%, and costs of zero, KRW 1m and 3m, are our assumptions.",
  },
  [costGuideSources["investment-fees-compound"][0].href]: {
    ko: "미국 SEC의 교육 자료는 반복 비용이 투자 원금과 이후 복리에 영향을 준다는 원리를 설명합니다. 이 표는 SEC의 수익률 예시를 복제하지 않고, CalCome의 월 복리·연 수익률에서 비용률 차감 모델로 계산한 가상 비교입니다.",
    en: "SEC education explains how ongoing costs reduce capital available to compound. This table uses CalCome's monthly compounding and return-minus-fee model with hypothetical inputs; it does not reproduce the SEC's numerical illustration.",
  },
};

export const costGuideContent = {
  "loan-term-total-interest": {
    ko: {
      title: "대출기간 10년·20년·30년: 월 납입액과 총이자 비교",
      description:
        "같은 1억원·연 4% 원리금균등 대출에서 기간만 바꾸면 월 납입액과 총이자가 어떻게 달라지는지 비교합니다.",
      calculatorHref: "/ko/finance/loan",
      calculatorLabel: "대출 계산기에서 조건 바꾸기",
      sections: [
        [
          "월 납입액만으로 비용을 판단할 수 있나요?",
          "기간을 늘리면 원금을 더 많은 달에 나누어 갚으므로 월 납입액은 줄지만 이자를 내는 기간이 길어집니다. 표에서는 원금과 금리를 고정해 기간의 효과만 분리했습니다. 실제 상품에서는 기간에 따라 금리도 달라질 수 있습니다.",
        ],
        [
          "10년에서 30년으로 늘리는 대가",
          "이 가정에서는 월 납입액이 약 535,036원 줄어드는 대신 총이자는 약 50,375,341원 늘어납니다. 두 값은 반올림 전 계산값의 차이를 원 단위로 반올림한 것으로, 표의 표시값끼리 뺀 결과와 1원 차이가 날 수 있습니다. 감당할 월 예산과 전체 지출을 함께 비교하세요.",
        ],
        [
          "재현 방법과 계산 범위",
          "대출 계산기에 원금 100,000,000원, 연이율 4%, 원리금균등을 입력하고 120·240·360개월로 각각 계산합니다. 월이율은 연이율÷12이며 매월 말 상환합니다. 수수료, 보증료, 보험, 세금, 중도상환과 금리 변동은 제외했습니다. 표시액은 원 단위 반올림이며 은행의 납부일·절사 방식과 다를 수 있습니다.",
        ],
      ],
    },
    en: {
      title: "10-, 20- and 30-year loans: payment versus total interest",
      description:
        "Compare monthly payments and lifetime interest for the same hypothetical KRW 100 million loan at 4%, changing only its term.",
      calculatorHref: "/en/finance/loan",
      calculatorLabel: "Change the assumptions in Loan Calculator",
      sections: [
        [
          "Is the monthly payment enough to compare cost?",
          "A longer term spreads principal across more months but leaves interest accruing for longer. Holding principal and rate constant isolates the term effect. Actual offers can also charge different rates for different terms.",
        ],
        [
          "The 10-year versus 30-year tradeoff",
          "Under these assumptions, the monthly payment falls by approximately KRW 535,036 while total interest rises by KRW 50,375,341. Differences are rounded after subtracting unrounded results, so subtracting displayed cells can differ by one won. Compare affordability and lifetime spending together.",
        ],
        [
          "Reproduce the comparison",
          "Enter KRW 100,000,000, 4% annual interest, equal payments and 120, 240 or 360 months. The monthly rate is the annual rate divided by 12 and payments occur at month-end. Fees, insurance, guarantees, taxes, early repayment and rate changes are excluded. Amounts are rounded to whole won; lender schedules and rounding may differ.",
        ],
      ],
    },
  },
  "refinancing-break-even": {
    ko: {
      title: "대환대출 손익분기: 금리가 내려가도 비용을 회수해야 합니다",
      description:
        "잔액 1억원·잔여 10년·5%에서 4%로 바꾸는 가정에서 전환 비용별 회수기간과 전체 순절감액을 비교합니다.",
      calculatorHref: "/ko/finance/loan-refinancing-savings",
      calculatorLabel: "대환대출 절감 계산기 열기",
      sections: [
        [
          "회수기간은 어떻게 구하나요?",
          "동일한 잔여기간과 원금의 원리금균등 상환을 비교하면 월 절감액은 약 48,204원입니다. 전환 비용을 반올림 전 월 절감액으로 나눈 값이 단순 비용 회수기간입니다. 비용 100만원은 약 20.75개월이므로 매월 납부 기준으로는 21번째 납부에서 누적 납입액 절감이 비용을 넘어섭니다.",
        ],
        [
          "순절감액과 회수기간은 다른 질문입니다",
          "순절감액은 120개월을 모두 유지할 때의 이자 감소분에서 초기 비용을 뺀 값입니다. 비용 300만원도 전체 기간 순절감은 양수지만 현금 납입액 기준 회수에는 약 63회 납부가 필요합니다. 조기 매각·상환을 비교하려면 그 시점의 잔액 차이와 추가 비용까지 계산해야 하므로 이 단순 회수기간만으로 경제적 손익을 판단할 수 없습니다.",
        ],
        [
          "기간을 다시 늘리면 비교 조건이 바뀝니다",
          "잔여 10년 대출을 새 30년 대출로 바꾸면 월 납입액 감소에는 금리 인하와 기간 연장이 섞입니다. 이 계산기는 양쪽 기간을 동일하게 두며 대출기간 재설정, 세금 효과, 자금의 시간가치와 중도상환 시 잔액 차이를 별도로 계산하지 않습니다. 전환 비용에는 실제 견적의 비용을 한 번만 포함하세요.",
        ],
      ],
    },
    en: {
      title: "Refinancing break-even: recovering costs after a rate cut",
      description:
        "Compare upfront costs, payment-savings payback and full-term net savings on a hypothetical KRW 100m loan moving from 5% to 4% with ten years remaining.",
      calculatorHref: "/en/finance/loan-refinancing-savings",
      calculatorLabel: "Open Refinancing Savings Calculator",
      sections: [
        [
          "Calculate the simple payback",
          "With equal-payment loans sharing principal and remaining term, monthly payment savings are about KRW 48,204. Divide upfront costs by unrounded monthly savings. KRW 1m costs take about 20.75 months, so cumulative payment savings exceed the cost at the 21st scheduled payment.",
        ],
        [
          "Payback and full-term savings answer different questions",
          "Net savings subtract upfront costs from interest saved over all 120 months. KRW 3m costs still produce positive full-term savings but require approximately 63 payments to recover through payment savings. For an earlier sale or payoff, compare outstanding balances and extra charges as well; this simple cash-payment payback is not a complete economic break-even analysis.",
        ],
        [
          "Resetting the loan term changes the comparison",
          "Replacing ten remaining years with a new 30-year loan mixes the effects of rate reduction and term extension. This calculator keeps both terms equal. It does not separately model term resets, tax effects, the time value of money or payoff-date balance differences. Include each actual quoted switching cost once.",
        ],
      ],
    },
  },
  "investment-fees-compound": {
    ko: {
      title: "투자 수수료 0.5%와 1%: 20년 복리 차이",
      description:
        "초기 1,000만원·가정 수익률 5%에서 연 비용률 0%·0.5%·1%가 20년 후 금액에 미치는 영향을 비교합니다.",
      calculatorHref: "/ko/finance/investment-fee-impact",
      calculatorLabel: "투자 수수료 영향 계산기 열기",
      sections: [
        [
          "차액은 납부한 수수료 합계인가요?",
          "표의 차액은 비용이 없는 가정과 비용이 있는 가정의 최종 자산 차이입니다. 비용 자체뿐 아니라 그만큼 줄어든 자산에서 발생하지 못한 복리 효과도 포함하므로 실제 수수료 청구액의 합계라고 해석하면 안 됩니다.",
        ],
        [
          "같은 수익률에서 비용만 비교합니다",
          "초기 투자 10,000,000원, 월 납입 0원, 연 수익률 5%, 20년으로 두고 연 비용률만 바꿉니다. 월 순수익률은 (연 수익률−연 비용률)÷12로 단순화합니다. 5%는 예측이나 보장 수익률이 아니며, 비용이 낮다는 이유만으로 위험·운용전략이 다른 상품을 동등하게 볼 수 없습니다.",
        ],
        [
          "실제 상품과 대조할 항목",
          "매매수수료, 환전 비용, 성과보수, 세금과 일별 비용 차감 방식은 이 표에서 제외합니다. 월 납입을 추가하면 계산기는 월말 납입으로 처리합니다. 상품 설명서의 총비용과 납부 시점을 확인하고 같은 모델로 비교 가능한 항목만 입력하세요.",
        ],
      ],
    },
    en: {
      title: "0.5% versus 1% investment fees: a 20-year compounding comparison",
      description:
        "Compare hypothetical annual costs of zero, 0.5% and 1% on KRW 10m with an assumed 5% return over twenty years.",
      calculatorHref: "/en/finance/investment-fee-impact",
      calculatorLabel: "Open Investment Fee Impact Calculator",
      sections: [
        [
          "Is the difference the sum of fees paid?",
          "The difference compares ending wealth with and without annual costs. It includes both costs and the compounding that the deducted capital could otherwise have earned. It is not the sum of actual fee invoices.",
        ],
        [
          "Hold the assumed return constant",
          "Use KRW 10,000,000 initially, zero monthly contributions, a 5% annual return and twenty years, changing only annual fees. The simplified monthly net rate is (annual return minus annual fee) divided by 12. The 5% return is neither a forecast nor a guarantee; different investment risks and strategies do not become equivalent merely because their fees differ.",
        ],
        [
          "Check actual product charges",
          "The table excludes trading charges, foreign exchange costs, performance fees, taxes and daily fee accrual. If monthly contributions are added, the calculator treats them as end-of-month deposits. Check total charges and timing in the product disclosure, then compare only costs that fit the same model.",
        ],
      ],
    },
  },
} as const;

export const costGuideComparisons = {
  "loan-term-total-interest": {
    ko: {
      question: "월 납입액을 줄이면 총이자는 얼마나 늘어날까요?",
      assumption:
        "가상 원금 1억원, 고정 연이율 4%, 월말 원리금균등 상환. 비용 없음. 각 결과를 원 단위 반올림했습니다.",
      columns: ["기간", "월 납입액", "총이자"],
      rows: [
        ["10년 · 120개월", "1,012,451원", "21,494,166원"],
        ["20년 · 240개월", "605,980원", "45,435,279원"],
        ["30년 · 360개월", "477,415원", "71,869,506원"],
      ],
      takeaway:
        "기간을 늘리면 월 부담은 낮아지지만 이 가정의 총이자는 커집니다. 월 예산과 전체 비용을 함께 비교하세요.",
    },
    en: {
      question: "How much more interest comes with a lower payment?",
      assumption:
        "Hypothetical KRW 100m principal, fixed 4% annual rate, equal month-end payments, no fees. Each result is rounded to whole won.",
      columns: ["Term", "Monthly payment", "Total interest"],
      rows: [
        ["10 years · 120 months", "KRW 1,012,451", "KRW 21,494,166"],
        ["20 years · 240 months", "KRW 605,980", "KRW 45,435,279"],
        ["30 years · 360 months", "KRW 477,415", "KRW 71,869,506"],
      ],
      takeaway:
        "Longer terms lower the monthly burden but increase interest in these scenarios. Compare monthly affordability and total cost together.",
    },
  },
  "refinancing-break-even": {
    ko: {
      question: "같은 금리 인하라도 전환 비용이 다르면?",
      assumption:
        "가상 잔액 1억원, 잔여 120개월 동일, 연 5%→4%, 월말 원리금균등. 월 절감 약 48,204원. 초기 비용은 현금 납부하며 대출에 더하지 않습니다.",
      columns: ["초기 비용", "단순 회수기간 · 납부 횟수", "120개월 순절감"],
      rows: [
        ["0원", "즉시 · 0회", "5,784,452원"],
        ["1,000,000원", "20.75개월 · 21회", "4,784,452원"],
        ["3,000,000원", "62.24개월 · 63회", "2,784,452원"],
      ],
      takeaway:
        "회수기간은 초기 비용÷월 납입액 절감입니다. 조기 상환 시 잔액 차이, 세금, 시간가치를 포함한 완전한 손익분기 계산은 아닙니다.",
    },
    en: {
      question: "What changes when switching costs differ?",
      assumption:
        "Hypothetical KRW 100m balance, same 120 remaining months, 5% to 4%, equal month-end payments. Monthly savings about KRW 48,204. Upfront costs are paid in cash, not added to the loan.",
      columns: [
        "Upfront cost",
        "Simple payback · payments",
        "120-month net savings",
      ],
      rows: [
        ["KRW 0", "Immediate · 0", "KRW 5,784,452"],
        ["KRW 1,000,000", "20.75 months · 21", "KRW 4,784,452"],
        ["KRW 3,000,000", "62.24 months · 63", "KRW 2,784,452"],
      ],
      takeaway:
        "Simple payback is upfront cost divided by monthly payment savings. It excludes early-payoff balance differences, taxes and the time value of money.",
    },
  },
  "investment-fees-compound": {
    ko: {
      question: "작은 연 비용률 차이가 20년 뒤에는?",
      assumption:
        "가상 초기 1,000만원, 추가 납입 없음, 연 수익률 5%, 20년. (연 수익률−연 비용률)÷12의 월 복리 모델, 원 단위 반올림.",
      columns: ["연 비용률", "20년 후 자산", "비용 없는 경우와 차이"],
      rows: [
        ["0%", "27,126,403원", "0원"],
        ["0.5%", "24,554,664원", "2,571,739원"],
        ["1%", "22,225,821원", "4,900,582원"],
      ],
      takeaway:
        "차액에는 비용과 잃은 복리 효과가 함께 들어 있습니다. 5%는 가정이며 실제 상품 수익률·총비용·세금은 다를 수 있습니다.",
    },
    en: {
      question: "What can a small annual fee difference mean after 20 years?",
      assumption:
        "Hypothetical KRW 10m initial capital, no contributions, 5% annual return for 20 years. Monthly compounding at (annual return minus annual fee)/12; rounded to whole won.",
      columns: ["Annual fee", "Ending wealth", "Difference from no fees"],
      rows: [
        ["0%", "KRW 27,126,403", "KRW 0"],
        ["0.5%", "KRW 24,554,664", "KRW 2,571,739"],
        ["1%", "KRW 22,225,821", "KRW 4,900,582"],
      ],
      takeaway:
        "Differences include both costs and lost compounding. The 5% return is assumed; actual returns, total charges and taxes may differ.",
    },
  },
} as const;
