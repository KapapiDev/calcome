export type GuideLocale = "ko" | "en";

export const guideSlugs = [
  "cagr-vs-average-return",
  "annualize-growth-correctly",
  "ytm-vs-current-yield",
  "bond-price-and-yield",
  "currency-conversion-rate-check",
] as const;

export type GuideSlug = (typeof guideSlugs)[number];

type GuideCopy = {
  title: string;
  description: string;
  calculatorHref: string;
  calculatorLabel: string;
  sections: readonly (readonly [string, string])[];
};

export const guideContent: Record<GuideSlug, Record<GuideLocale, GuideCopy>> = {
  "cagr-vs-average-return": {
    ko: {
      title: "CAGR과 평균 수익률은 왜 다를까?",
      description: "복리 성장률인 CAGR과 연도별 수익률의 산술평균이 서로 다른 이유를 예시로 설명합니다.",
      calculatorHref: "/ko/finance/cagr",
      calculatorLabel: "CAGR 계산기 열기",
      sections: [
        ["핵심 차이", "CAGR은 시작값과 종료값을 하나의 일정한 복리 성장률로 연결합니다. 반면 산술평균은 각 기간 수익률을 더해 기간 수로 나눕니다. 변동성이 있으면 두 값은 달라질 수 있습니다."],
        ["간단한 예시", "100이 첫해에 50% 올라 150이 되고 다음 해 33.3% 내려 다시 100이 되면 전체 성장은 0%입니다. 두 해 수익률의 단순 평균은 양수지만 CAGR은 0%입니다."],
        ["언제 쓰나", "서로 다른 기간의 시작값과 종료값 성장을 비교할 때 CAGR이 유용합니다. 중간 입출금이 있었다면 두 시점만 보는 CAGR 대신 현금흐름을 반영하는 수익률 지표가 필요합니다."],
      ],
    },
    en: {
      title: "CAGR vs. Average Return: Why They Differ",
      description: "Understand why compound annual growth rate can differ from the arithmetic average of periodic returns.",
      calculatorHref: "/en/finance/cagr",
      calculatorLabel: "Open the CAGR Calculator",
      sections: [
        ["The core difference", "CAGR connects a beginning and ending value with one constant compounded annual rate. An arithmetic average simply adds periodic returns and divides by the number of periods."],
        ["A simple example", "If 100 rises 50% to 150 and then falls about 33.3% back to 100, total growth is zero. The arithmetic average of the two annual returns is positive, while CAGR is zero."],
        ["When CAGR is useful", "Use CAGR to compare beginning-to-ending growth across different horizons. If contributions or withdrawals occurred, use a cash-flow-aware return measure instead of relying on two endpoints."],
      ],
    },
  },
  "annualize-growth-correctly": {
    ko: {
      title: "짧은 기간 성장률을 연환산할 때 주의할 점",
      description: "월간·분기 성장률을 연간 수치로 바꿀 때 단순 곱셈이 왜 오해를 만들 수 있는지 설명합니다.",
      calculatorHref: "/ko/finance/cagr",
      calculatorLabel: "CAGR 계산기에서 기간 비교하기",
      sections: [
        ["연환산은 단순 곱셈이 아니다", "복리 기준 연환산은 기간 수익률이 반복된다고 가정해 거듭제곱으로 환산합니다. 한 달 수익률에 12를 곱하는 방식은 복리 효과를 반영하지 않습니다."],
        ["짧은 표본의 함정", "한두 달의 큰 움직임을 1년으로 연환산하면 매우 큰 숫자가 나올 수 있습니다. 이는 같은 속도가 1년 내내 지속된다는 뜻이 아니라 비교를 위한 수학적 환산입니다."],
        ["해석 방법", "연환산 수치와 함께 실제 관측 기간, 총 변화율, 시작값과 종료값을 같이 보세요. 짧은 기간일수록 지속 가능성에 대한 판단을 별도로 해야 합니다."],
      ],
    },
    en: {
      title: "How to Annualize Short-Term Growth Without Misreading It",
      description: "Learn why monthly or quarterly growth should not be annualized by simple multiplication.",
      calculatorHref: "/en/finance/cagr",
      calculatorLabel: "Compare periods with the CAGR Calculator",
      sections: [
        ["Annualization is not simple multiplication", "Compound annualization assumes the period return repeats and compounds. Multiplying a one-month return by 12 ignores that compounding effect."],
        ["The short-sample trap", "Annualizing an unusually strong month can produce a dramatic number. It is a mathematical comparison, not a claim that the same pace will continue for a full year."],
        ["How to interpret it", "Read the annualized figure together with the observed period, total change, beginning value, and ending value. The shorter the period, the more cautious the sustainability interpretation should be."],
      ],
    },
  },
  "ytm-vs-current-yield": {
    ko: {
      title: "채권 YTM과 현재수익률의 차이",
      description: "만기수익률(YTM)과 현재수익률이 무엇을 포함하고 무엇을 놓치는지 비교합니다.",
      calculatorHref: "/ko/finance/bond-yield-to-maturity",
      calculatorLabel: "채권 만기수익률 계산기 열기",
      sections: [
        ["현재수익률", "현재수익률은 연간 쿠폰 이자를 현재 시장가격으로 나눈 단순 비율입니다. 빠르게 이자 현금흐름을 비교하기 좋지만 만기 때의 액면 상환 차이는 포함하지 않습니다."],
        ["만기수익률", "YTM은 쿠폰과 만기 액면상환액을 모두 현재 가격과 일치시키는 할인율을 찾습니다. 따라서 액면가보다 싸거나 비싸게 산 효과까지 반영합니다."],
        ["같이 봐야 하는 이유", "두 지표의 차이가 크다면 현재 가격과 액면가의 차이가 중요한 단서일 수 있습니다. 실제 거래에는 발생이자, 세금, 거래비용, 콜옵션, 신용위험 같은 추가 조건도 확인해야 합니다."],
      ],
    },
    en: {
      title: "Yield to Maturity vs. Current Yield",
      description: "Compare what bond YTM and current yield include, and why the two measures can diverge.",
      calculatorHref: "/en/finance/bond-yield-to-maturity",
      calculatorLabel: "Open the Bond YTM Calculator",
      sections: [
        ["Current yield", "Current yield divides annual coupon income by the bond's current market price. It is useful for a quick income comparison but ignores the gain or loss between market price and face value at maturity."],
        ["Yield to maturity", "YTM finds the discount rate that makes all coupon payments plus the face-value repayment equal the current price. It therefore captures the effect of buying above or below face value."],
        ["Why compare both", "A wide gap can signal that the price-to-face-value difference matters. Real bonds may also involve accrued interest, taxes, transaction costs, call features, and credit risk."],
      ],
    },
  },
  "bond-price-and-yield": {
    ko: {
      title: "채권 가격이 오르면 수익률은 왜 내려갈까?",
      description: "고정된 쿠폰 현금흐름과 시장가격 사이의 관계로 채권 가격과 수익률의 반대 움직임을 설명합니다.",
      calculatorHref: "/ko/finance/bond-yield-to-maturity",
      calculatorLabel: "가격을 바꿔 YTM 비교하기",
      sections: [
        ["쿠폰은 그대로인데 가격은 변한다", "고정금리 채권은 약속된 쿠폰이 정해져 있습니다. 같은 쿠폰을 받는 채권의 시장가격이 올라가면 새 매수자가 지불하는 가격 대비 현금흐름의 매력은 낮아집니다."],
        ["할인채와 프리미엄채", "액면가보다 낮게 사면 만기 액면상환에서 추가 이익이 생길 수 있고, 액면가보다 높게 사면 반대 효과가 생깁니다. YTM은 이 가격 차이와 쿠폰을 함께 반영합니다."],
        ["비교할 때 고정할 것", "가격 효과를 비교하려면 액면가, 쿠폰금리, 만기, 지급주기를 같게 두고 시장가격만 바꿔 보세요. 그러면 가격과 YTM의 관계를 분리해 볼 수 있습니다."],
      ],
    },
    en: {
      title: "Why Bond Yields Fall When Bond Prices Rise",
      description: "See how fixed coupon cash flows create the inverse relationship between bond price and yield.",
      calculatorHref: "/en/finance/bond-yield-to-maturity",
      calculatorLabel: "Change price and compare YTM",
      sections: [
        ["The coupon stays fixed while price moves", "A fixed-rate bond promises a defined coupon. If the market price rises while those cash flows stay the same, a new buyer pays more for the same promised payments."],
        ["Discount and premium bonds", "Buying below face value can add a gain when face value is repaid at maturity; buying above face value creates the opposite effect. YTM combines that price difference with coupon cash flows."],
        ["Hold other inputs constant", "To isolate the price effect, keep face value, coupon rate, maturity, and payment frequency unchanged and vary only market price. The resulting YTM comparison makes the inverse relationship easier to see."],
      ],
    },
  },
  "currency-conversion-rate-check": {
    ko: {
      title: "환율 변환 전에 꼭 확인할 4가지",
      description: "기준통화·상대통화·환율 방향·수수료를 구분해 환율 계산 실수를 줄이는 방법입니다.",
      calculatorHref: "/ko/finance/currency-conversion",
      calculatorLabel: "환율 변환 계산기 열기",
      sections: [
        ["기준통화와 상대통화", "환율 1,350 KRW/USD와 0.00074 USD/KRW는 같은 관계를 반대 방향으로 표현합니다. 어떤 통화 1단위가 다른 통화 몇 단위인지 먼저 확인하세요."],
        ["곱할지 나눌지", "입력한 환율의 방향에 따라 변환은 곱셈 또는 나눗셈이 됩니다. 역환율을 함께 확인하면 방향을 뒤집는 실수를 발견하기 쉽습니다."],
        ["시장 환율과 실제 체결 환율", "검색에서 보는 기준 환율과 카드사·은행·환전소의 실제 적용 환율은 다를 수 있습니다. 스프레드와 수수료가 포함되면 최종 금액이 달라집니다."],
        ["시점 기록", "환율은 계속 변합니다. 비교나 기록 목적이라면 사용한 환율과 확인 시점을 함께 남겨야 나중에 결과를 재현할 수 있습니다."],
      ],
    },
    en: {
      title: "4 Checks to Make Before Converting Currency",
      description: "Avoid common exchange-rate mistakes by checking quote direction, inverse rates, fees, and timing.",
      calculatorHref: "/en/finance/currency-conversion",
      calculatorLabel: "Open the Currency Converter",
      sections: [
        ["Base and quote currency", "A quote such as 1,350 KRW per USD and its inverse express the same relationship in opposite directions. First identify how many units of the quote currency equal one unit of the base currency."],
        ["Multiply or divide", "Whether you multiply or divide depends on the direction of the rate you entered. Checking the inverse rate is a useful way to catch a reversed quote."],
        ["Reference rate vs. executable rate", "A reference market rate can differ from the rate offered by a bank, card issuer, broker, or exchange service. Spreads and fees can change the final amount."],
        ["Record the time", "Exchange rates move continuously. For comparisons you may need to reproduce later, record both the rate used and when it was observed."],
      ],
    },
  },
};

export function getGuide(locale: GuideLocale, slug: string) {
  if (!guideSlugs.includes(slug as GuideSlug)) return null;
  return guideContent[slug as GuideSlug][locale];
}
