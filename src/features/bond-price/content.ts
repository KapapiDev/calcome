export type BondPriceLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  faceValue: string;
  couponRate: string;
  marketYield: string;
  years: string;
  frequency: string;
  annual: string;
  semiannual: string;
  quarterly: string;
  monthly: string;
  calculate: string;
  reset: string;
  result: string;
  price: string;
  premiumDiscount: string;
  couponPv: string;
  redemptionPv: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const bondPriceContent: Record<BondPriceLocale, Copy> = {
  ko: {
    title: "채권 가격 계산기",
    description:
      "액면가, 표면금리, 시장 요구수익률, 만기와 이자 지급주기로 고정금리 채권의 이론 가격과 프리미엄·할인을 계산합니다.",
    category: "투자 계산기",
    input: "채권 조건",
    faceValue: "액면가",
    couponRate: "연 표면금리",
    marketYield: "연 시장 요구수익률(YTM)",
    years: "만기까지 남은 기간",
    frequency: "연간 이자 지급 횟수",
    annual: "연 1회",
    semiannual: "연 2회",
    quarterly: "연 4회",
    monthly: "연 12회",
    calculate: "채권 가격 계산하기",
    reset: "초기화",
    result: "가격 결과",
    price: "이론 채권 가격",
    premiumDiscount: "액면가 대비 프리미엄·할인",
    couponPv: "쿠폰 현재가치",
    redemptionPv: "만기상환액 현재가치",
    error:
      "액면가는 0보다 커야 하며, 표면금리와 시장수익률은 0~100%, 만기는 0~100년 범위여야 합니다.",
    note: "시장 요구수익률이 표면금리보다 높으면 일반적으로 할인채, 낮으면 프리미엄채가 됩니다. 표시 통화 선택은 환율 변환이 아니라 금액 표시 방식만 바꿉니다.",
    method:
      "각 쿠폰을 지급주기별 시장수익률로 할인하고 만기 액면상환액의 현재가치를 더해 가격을 계산합니다. 시장수익률이 0%이면 모든 미래 현금흐름의 단순 합계가 됩니다.",
    cautions:
      "쿠폰 지급일에 가격을 계산하는 단순 고정금리 채권 모델입니다. 발생이자, 결제일, day-count convention, 콜옵션, 신용위험, 세금과 거래비용은 반영하지 않습니다.",
    metaTitle: "채권 가격 계산기 | YTM·표면금리로 채권가치 계산",
  },
  en: {
    title: "Bond Price Calculator",
    description:
      "Estimate the theoretical price, premium, or discount of a fixed-rate bond from face value, coupon rate, market yield, maturity, and payment frequency.",
    category: "Investment calculator",
    input: "Bond terms",
    faceValue: "Face value",
    couponRate: "Annual coupon rate",
    marketYield: "Annual market yield (YTM)",
    years: "Years to maturity",
    frequency: "Coupon payments per year",
    annual: "Annual",
    semiannual: "Semiannual",
    quarterly: "Quarterly",
    monthly: "Monthly",
    calculate: "Calculate bond price",
    reset: "Reset",
    result: "Price results",
    price: "Theoretical bond price",
    premiumDiscount: "Premium or discount to face value",
    couponPv: "Present value of coupons",
    redemptionPv: "Present value of redemption",
    error:
      "Face value must be greater than zero, rates must be 0–100%, and maturity must be within 0–100 years.",
    note: "When market yield is above the coupon rate, a plain bond generally trades below par; when it is below the coupon rate, the bond generally trades above par. Currency selection changes display units only and does not perform FX conversion.",
    method:
      "Each coupon is discounted by the market yield per payment period, then the discounted face-value redemption is added. At a 0% market yield, price equals the simple sum of future cash flows.",
    cautions:
      "This is a plain fixed-rate bond model priced on a coupon date. Accrued interest, settlement timing, day-count conventions, calls, credit risk, taxes, and trading costs are excluded.",
    metaTitle: "Bond Price Calculator | Price a Bond from YTM and Coupon Rate",
  },
};
