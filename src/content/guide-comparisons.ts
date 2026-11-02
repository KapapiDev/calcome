import type { GuideLocale, GuideSlug } from "./guides";
import { costGuideComparisons } from "./cost-comparison-guides";

export const comparisonReviewedOn = "2026-11-02";
type ComparisonCopy = {
  question: string;
  assumption: string;
  columns: readonly [string, string, string];
  rows: readonly (readonly [string, string, string])[];
  takeaway: string;
};

export const guideComparisons: Record<
  GuideSlug,
  Record<GuideLocale, ComparisonCopy>
> = {
  ...costGuideComparisons,
  "net-salary-vs-withholding": {
    ko: {
      question: "같은 월급을 넣었는데 소득세가 왜 다른가요?",
      assumption:
        "월 과세급여 3,500,000원, 상여·비과세·자녀 없음, 본인만 있는 가상 비교입니다. 실수령액 계산기 가족 수는 0, 원천징수 계산기는 1입니다. 실수령액의 보험 항목은 모두 꺼서 세금 계산 방식만 비교하며, 표의 금액은 실수령액이 아닙니다.",
      columns: ["계산 방식", "소득세 · 지방소득세", "세금 합계"],
      rows: [
        ["실수령액 모델의 간편 추정", "201,208원 · 20,120원", "221,328원"],
        ["간이세액표 · 80%", "101,770원 · 10,170원", "111,940원"],
        ["간이세액표 · 100%", "127,220원 · 12,720원", "139,940원"],
        ["간이세액표 · 120%", "152,660원 · 15,260원", "167,920원"],
      ],
      takeaway:
        "간편 연환산 모델의 공제·세액공제 가정과 월 간이세액표의 가정은 다릅니다. 가족 수 입력과 세금 항목을 맞춰 비교하고, 실제 급여는 회사의 과세급여·보험료·선택 비율을 확인하세요. 이 비교는 보험료 납부 제외를 권하거나 최종 세금을 예측하지 않습니다.",
    },
    en: {
      question: "Why do the income-tax amounts differ for the same salary?",
      assumption:
        "Use hypothetical monthly taxable pay of KRW 3,500,000, no bonus, non-taxable pay or children, and the employee alone. Enter family counts zero in Net Salary and one in Withholding. Turn all Net Salary insurance items off solely to compare tax methods; these figures are not take-home pay.",
      columns: ["Method", "Income tax · local income tax", "Combined taxes"],
      rows: [
        [
          "Simplified Net Salary estimate",
          "KRW 201,208 · 20,120",
          "KRW 221,328",
        ],
        ["Monthly table · 80%", "KRW 101,770 · 10,170", "KRW 111,940"],
        ["Monthly table · 100%", "KRW 127,220 · 12,720", "KRW 139,940"],
        ["Monthly table · 120%", "KRW 152,660 · 15,260", "KRW 167,920"],
      ],
      takeaway:
        "The annualized estimate's deductions and credits differ from monthly-table assumptions. Match family inputs and tax components, then check actual taxable pay, insurance and your selected withholding percentage. This comparison does not recommend skipping insurance or predict final annual tax.",
    },
  },
  "cagr-vs-average-return": {
    ko: {
      question: "평균 수익률이 양수인데 원금은 그대로일 수 있나요?",
      assumption:
        "시작값 100, 각 기간 1년, 추가 입출금·세금·비용 없이 두 해의 수익률을 순서대로 적용한 설명용 비교입니다.",
      columns: ["두 해의 수익률", "종료값 · 2년 CAGR", "연 수익률의 산술평균"],
      rows: [
        ["+10%, +10%", "121 · 10%", "10%"],
        ["+50%, −33⅓%", "100 · 0%", "약 8.33%"],
        ["−50%, +100%", "100 · 0%", "25%"],
      ],
      takeaway:
        "산술평균은 자산의 복리 성장 경로를 대신하지 못합니다. 두 시점의 성장률을 비교할 때는 CAGR을, 중간 입출금이 있으면 그 현금흐름을 반영하는 지표를 확인하세요.",
    },
    en: {
      question:
        "Can the average return be positive while capital is unchanged?",
      assumption:
        "Start at 100 and apply two successive one-year returns with no additional cash flows, taxes or costs. These are illustrative scenarios.",
      columns: [
        "Two yearly returns",
        "Ending value · two-year CAGR",
        "Arithmetic average yearly return",
      ],
      rows: [
        ["+10%, +10%", "121 · 10%", "10%"],
        ["+50%, −33⅓%", "100 · 0%", "About 8.33%"],
        ["−50%, +100%", "100 · 0%", "25%"],
      ],
      takeaway:
        "An arithmetic average does not reproduce compound wealth growth. Use CAGR for comparable starting/ending values, and a cash-flow-aware measure when contributions or withdrawals occur.",
    },
  },
  "annualize-growth-correctly": {
    ko: {
      question: "같은 기간 수익률도 연환산하면 왜 달라지나요?",
      assumption:
        "시작값 100과 관측 종료값을 사용해 (종료값/시작값)^(1/연수)−1을 적용합니다. 기간은 각각 정확히 1/12년·1/2년·1년으로 둡니다.",
      columns: ["관측 기간 · 종료값", "기간 전체 성장률", "복리 연환산 성장률"],
      rows: [
        ["1개월 · 102", "2%", "약 26.82%"],
        ["6개월 · 125", "25%", "56.25%"],
        ["1년 · 125", "25%", "25%"],
      ],
      takeaway:
        "짧은 관측 기간의 성장률을 연 단위로 환산한 수학적 값입니다. 관측 성과가 앞으로 반복된다는 전망이나 약정 이율을 뜻하지 않으며, 달력의 실제 일수 기준과도 구분해야 합니다.",
    },
    en: {
      question: "Why does the observation period change the annualized return?",
      assumption:
        "Start at 100 and apply (ending/starting)^(1/years)−1. Treat the periods as exactly 1/12 year, 1/2 year and one year.",
      columns: [
        "Observed period · ending value",
        "Total period growth",
        "Compound annualized growth",
      ],
      rows: [
        ["One month · 102", "2%", "About 26.82%"],
        ["Six months · 125", "25%", "56.25%"],
        ["One year · 125", "25%", "25%"],
      ],
      takeaway:
        "These are mathematical annualizations of observed changes, not forecasts that short-period returns will repeat or contractual interest rates. Distinguish these fractions of a year from an actual-day calendar convention.",
    },
  },
  "ytm-vs-current-yield": {
    ko: {
      question: "현재수익률만 보면 놓치는 금액은 무엇인가요?",
      assumption:
        "액면가 1,000, 연 쿠폰 5%(50), 만기 1년, 연 1회 지급을 고정하고 가격만 바꿉니다. 만기 현금흐름은 1,050이며 세금·비용·부도는 제외합니다.",
      columns: ["매수가격", "현재수익률 = 50/가격", "YTM = 1,050/가격−1"],
      rows: [
        ["950", "약 5.26%", "약 10.53%"],
        ["1,000", "5%", "5%"],
        ["1,050", "약 4.76%", "0%"],
      ],
      takeaway:
        "1,050에 사면 쿠폰을 받아도 만기 원금 1,000을 돌려받는 가격 손실과 상쇄됩니다. 현재수익률만으로 만기 보유 수익률을 판단하면 이 차이를 놓칠 수 있습니다.",
    },
    en: {
      question: "What does current yield leave out?",
      assumption:
        "Fix face value at 1,000, annual coupon at 5% (50), maturity at one year and one payment per year. Final cash flow is 1,050; taxes, costs and default are excluded.",
      columns: [
        "Purchase price",
        "Current yield = 50/price",
        "YTM = 1,050/price−1",
      ],
      rows: [
        ["950", "About 5.26%", "About 10.53%"],
        ["1,000", "5%", "5%"],
        ["1,050", "About 4.76%", "0%"],
      ],
      takeaway:
        "At a purchase price of 1,050, the coupon offsets the loss when only 1,000 of principal is repaid. Current yield alone misses that purchase-price difference.",
    },
  },
  "bond-price-and-yield": {
    ko: {
      question: "시장 수익률만 바꾸면 채권 가격은 얼마나 달라지나요?",
      assumption:
        "액면가 1,000, 쿠폰 5%, 잔존 1년, 연 1회 지급으로 1년 뒤 받는 1,050을 할인합니다. 통화 단위는 모두 같으며 거래 비용·세금·부도는 제외합니다.",
      columns: ["시장 요구수익률", "현재가치 계산", "이론 가격"],
      rows: [
        ["0%", "1,050 ÷ 1", "1,050"],
        ["5%", "1,050 ÷ 1.05", "1,000"],
        ["10%", "1,050 ÷ 1.10", "약 954.55"],
      ],
      takeaway:
        "같은 현금흐름을 더 높은 요구수익률로 할인하면 가격이 내려갑니다. 쿠폰 지급일 사이 거래, 콜옵션, 변동금리 채권에는 별도 조건을 반영해야 합니다.",
    },
    en: {
      question:
        "How much does price change when only the market yield changes?",
      assumption:
        "Fix face value at 1,000, coupon at 5%, maturity at one year and one annual payment. Discount the final 1,050 in consistent currency units; exclude costs, taxes and default.",
      columns: [
        "Required market yield",
        "Present-value calculation",
        "Theoretical price",
      ],
      rows: [
        ["0%", "1,050 ÷ 1", "1,050"],
        ["5%", "1,050 ÷ 1.05", "1,000"],
        ["10%", "1,050 ÷ 1.10", "About 954.55"],
      ],
      takeaway:
        "Discounting the same cash flow at a higher required yield lowers its price. Trading between coupon dates, call options and floating rates require additional assumptions.",
    },
  },
  "currency-conversion-rate-check": {
    ko: {
      question: "좋아 보이는 환율이 실제 수취액도 더 높다는 뜻인가요?",
      assumption:
        "100 USD를 KRW로 바꾸는 가상 비교입니다. 수수료는 수취 KRW에서 차감한다고 가정하며, 현재 환율이나 특정 업체의 견적이 아닙니다.",
      columns: ["가정한 조건", "환산 총액", "수수료 차감 후 금액"],
      rows: [
        ["1 USD = 1,300 KRW · 수수료 0", "130,000 KRW", "130,000 KRW"],
        ["1 USD = 1,350 KRW · 수수료 0", "135,000 KRW", "135,000 KRW"],
        ["1 USD = 1,350 KRW · 수수료 6,000 KRW", "135,000 KRW", "129,000 KRW"],
      ],
      takeaway:
        "세 번째 조건은 환율이 높아도 첫 번째보다 실제 수취액이 적습니다. 환율 계산기는 환산 총액만 구하며, 표의 수수료 차감은 별도 산술 비교입니다. 업체의 최종 수취액·수수료·적용 시점을 함께 확인하세요.",
    },
    en: {
      question: "Does a better-looking exchange rate mean more money received?",
      assumption:
        "Compare a hypothetical conversion of USD 100 to KRW, with any fee deducted from received KRW. These are not current rates or provider quotes.",
      columns: [
        "Assumed quote and fee",
        "Gross conversion",
        "After the assumed fee",
      ],
      rows: [
        ["1 USD = 1,300 KRW · no fee", "130,000 KRW", "130,000 KRW"],
        ["1 USD = 1,350 KRW · no fee", "135,000 KRW", "135,000 KRW"],
        ["1 USD = 1,350 KRW · KRW 6,000 fee", "135,000 KRW", "129,000 KRW"],
      ],
      takeaway:
        "The third quote gives less received money than the first despite its higher exchange rate. The converter calculates the gross amount only; subtracting the fee here is a separate arithmetic comparison. Check the provider's final received amount, fees and quote time.",
    },
  },
};
