export type AprApyLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  direction: string;
  aprToApy: string;
  apyToApr: string;
  rate: string;
  frequency: string;
  annual: string;
  semiannual: string;
  quarterly: string;
  monthly: string;
  daily: string;
  calculate: string;
  reset: string;
  result: string;
  converted: string;
  periodic: string;
  source: string;
  error: string;
  note: string;
  method: string;
  example: string;
  cautions: string;
  metaTitle: string;
};

export const aprApyContent: Record<AprApyLocale, Copy> = {
  ko: {
    title: "APR·APY 변환 계산기",
    description:
      "명목 연이율(APR)과 복리 효과를 포함한 연환산수익률(APY)을 이자 복리 주기에 맞춰 서로 변환합니다.",
    category: "저축·연금 계산기",
    input: "이율 조건",
    direction: "변환 방향",
    aprToApy: "APR → APY",
    apyToApr: "APY → APR",
    rate: "연 이율",
    frequency: "연간 복리 횟수",
    annual: "연 1회",
    semiannual: "반기 2회",
    quarterly: "분기 4회",
    monthly: "월 12회",
    daily: "일 365회",
    calculate: "변환하기",
    reset: "초기화",
    result: "변환 결과",
    converted: "변환된 연 이율",
    periodic: "1회 복리 주기 이율",
    source: "입력 연 이율",
    error: "연 이율은 0~1,000% 범위의 숫자여야 합니다.",
    note: "APR은 명목 연이율이고 APY는 같은 기간의 복리 효과를 포함한 유효 연이율입니다. 수수료, 세금, 실제 입출금 시점은 반영하지 않습니다.",
    method:
      "APR에서 APY는 (1 + APR/n)^n - 1로 계산합니다. APY에서 APR은 n × ((1 + APY)^(1/n) - 1)로 역산하며 n은 연간 복리 횟수입니다.",
    example:
      "예: APR 12%를 월복리(12회)로 적용하면 월 이율은 1%이고 APY는 약 12.6825%입니다.",
    cautions:
      "금융상품의 법정 표시 방식이나 수수료 포함 여부는 상품·국가별로 다를 수 있습니다. 이 계산기는 순수한 복리 수학 변환이며 실제 상품의 공시 수익률을 대신하지 않습니다.",
    metaTitle: "APR·APY 변환 계산기 | 명목이율·유효연이율 변환",
  },
  en: {
    title: "APR and APY Conversion Calculator",
    description:
      "Convert between nominal annual percentage rate (APR) and effective annual percentage yield (APY) for a selected compounding frequency.",
    category: "Savings calculator",
    input: "Rate assumptions",
    direction: "Conversion direction",
    aprToApy: "APR → APY",
    apyToApr: "APY → APR",
    rate: "Annual rate",
    frequency: "Compounds per year",
    annual: "Annual (1)",
    semiannual: "Semiannual (2)",
    quarterly: "Quarterly (4)",
    monthly: "Monthly (12)",
    daily: "Daily (365)",
    calculate: "Convert rate",
    reset: "Reset",
    result: "Conversion results",
    converted: "Converted annual rate",
    periodic: "Rate per compounding period",
    source: "Input annual rate",
    error: "Annual rate must be a number between 0% and 1,000%.",
    note: "APR is a nominal annual rate, while APY includes the effect of compounding over the year. Fees, taxes, and irregular cash-flow timing are excluded.",
    method:
      "APR to APY uses (1 + APR/n)^n - 1. APY to APR uses n × ((1 + APY)^(1/n) - 1), where n is the number of compounding periods per year.",
    example:
      "Example: a 12% APR compounded monthly has a 1% monthly periodic rate and an APY of about 12.6825%.",
    cautions:
      "Disclosure rules and fee treatment vary by product and jurisdiction. This calculator performs a mathematical compounding conversion and does not replace an institution's quoted product rate.",
    metaTitle: "APR to APY Calculator | Convert Nominal and Effective Rates",
  },
};
