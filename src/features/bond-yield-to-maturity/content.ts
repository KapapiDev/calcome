export type BondYieldLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  faceValue: string;
  marketPrice: string;
  couponRate: string;
  years: string;
  frequency: string;
  annual: string;
  semiannual: string;
  quarterly: string;
  monthly: string;
  calculate: string;
  reset: string;
  result: string;
  ytm: string;
  currentYield: string;
  annualCoupon: string;
  totalCashFlow: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
  example: string;
  assumptions: string;
};

export const bondYieldContent: Record<BondYieldLocale, Copy> = {
  ko: {
    title: "채권 만기수익률(YTM) 계산기",
    description:
      "YTM(채권 만기수익률)과 현재수익률을 같은 조건으로 비교하세요. 액면가·시장가격·쿠폰금리·만기·지급주기를 입력해 할인·할증 매수의 수익률 차이를 계산합니다.",
    category: "투자 계산기",
    input: "채권 조건",
    faceValue: "액면가",
    marketPrice: "현재 시장가격",
    couponRate: "연 표면금리",
    years: "만기까지 남은 기간",
    frequency: "연간 이자 지급 횟수",
    annual: "연 1회",
    semiannual: "연 2회",
    quarterly: "연 4회",
    monthly: "연 12회",
    calculate: "만기수익률 계산하기",
    reset: "초기화",
    result: "수익률 결과",
    ytm: "만기수익률(YTM)",
    currentYield: "현재수익률",
    annualCoupon: "연간 쿠폰 이자",
    totalCashFlow: "만기까지 명목 현금흐름",
    error:
      "액면가와 시장가격은 0보다 커야 하며, 표면금리는 0~100%, 만기는 0~100년 범위여야 합니다.",
    note: "YTM은 모든 쿠폰과 만기 상환액을 현재 가격과 일치시키는 연환산 내부수익률입니다. 세금, 거래비용, 부도위험, 중도매매 가격은 반영하지 않습니다.",
    method:
      "각 이자 지급시점의 쿠폰과 만기 액면상환액을 하나의 할인율로 현재가치화했을 때 합계가 현재 시장가격과 같아지는 할인율을 수치적으로 찾습니다. 현재수익률은 연간 쿠폰 이자를 현재 시장가격으로 나눈 값입니다.",
    cautions:
      "실제 채권의 시장 관행에는 발생이자, 결제일, day-count convention, 콜옵션과 세금이 포함될 수 있습니다. 이 계산기는 단순한 고정금리 채권 비교용입니다.",
    example:
      "액면가 1,000, 시장가격 950, 연 쿠폰금리 5%, 만기 1년, 연 1회 지급을 가정하면 연 이자는 50입니다. 현재수익률은 50 ÷ 950 ≈ 5.26%, YTM은 (1,000 + 50) ÷ 950 − 1 ≈ 10.53%로 서로 다릅니다.",
    assumptions:
      "쿠폰 지급일 직후 매수하고 약속한 금액이 전액 지급되는 단순 고정금리 채권을 가정합니다. YTM은 선택한 지급주기에 따른 명목 연율입니다. 중간 쿠폰의 실제 재투자 금리나 중도 매도 가격에 따라 실현 수익률은 달라질 수 있습니다.",
    metaTitle: "YTM 계산기 | 채권 만기수익률·현재수익률 비교",
  },
  en: {
    title: "Bond Yield to Maturity Calculator",
    description:
      "Use this yield to maturity calculator to estimate bond YTM and current yield from face value, market price, coupon rate, time to maturity, and payment frequency.",
    category: "Investment calculator",
    input: "Bond terms",
    faceValue: "Face value",
    marketPrice: "Market price",
    couponRate: "Annual coupon rate",
    years: "Years to maturity",
    frequency: "Coupon payments per year",
    annual: "Annual",
    semiannual: "Semiannual",
    quarterly: "Quarterly",
    monthly: "Monthly",
    calculate: "Calculate YTM",
    reset: "Reset",
    result: "Yield results",
    ytm: "Yield to maturity (YTM)",
    currentYield: "Current yield",
    annualCoupon: "Annual coupon amount",
    totalCashFlow: "Nominal cash flow to maturity",
    error:
      "Face value and market price must be greater than zero, coupon rate must be 0–100%, and maturity must be within 0–100 years.",
    note: "YTM is the annualized internal rate that makes the present value of coupons and redemption equal the current price. Taxes, trading costs, default risk, and resale price are excluded.",
    method:
      "The calculator discounts every coupon payment and the face-value redemption using one yield, then numerically solves for the yield that matches the entered market price. Current yield is annual coupon income divided by market price.",
    cautions:
      "Real bond pricing may include accrued interest, settlement conventions, day-count rules, call features, and taxes. This calculator is intended for plain fixed-rate bond comparisons.",
    metaTitle:
      "Yield to Maturity Calculator (YTM) | Bond Yield & Current Yield",
    example:
      "Assume face value 1,000, market price 950, annual coupon 5%, one year to maturity, and one annual payment. Coupon income is 50. Current yield is 50 ÷ 950 ≈ 5.26%, while YTM is (1,000 + 50) ÷ 950 − 1 ≈ 10.53%.",
    assumptions:
      "Assume a plain fixed-rate bond bought immediately after a coupon date, with every promised payment made. YTM is a nominal annual rate for the selected payment frequency. Actual reinvestment rates and a sale before maturity can change realized returns.",
  },
};
