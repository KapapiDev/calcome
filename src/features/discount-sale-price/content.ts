export type DiscountSalePriceLocale = "ko" | "en";

export const discountSalePriceContent = {
  ko: {
    title: "할인율·할인가 계산기",
    description:
      "정가와 할인율, 수량을 입력해 개당 할인가와 절약액, 정가 합계, 총 할인액, 최종 결제금액을 계산합니다.",
    category: "사업·생활",
    input: "할인 계산 입력",
    originalPrice: "정가",
    discountRatePercent: "할인율 (%)",
    quantity: "수량",
    calculate: "할인가 계산하기",
    reset: "초기화",
    result: "할인 계산 결과",
    salePricePerItem: "개당 할인가",
    savingsPerItem: "개당 절약액",
    totalOriginalPrice: "정가 합계",
    totalSavings: "총 할인액",
    totalSalePrice: "최종 결제금액",
    error:
      "정가는 0보다 크게, 할인율은 0~100%, 수량은 1 이상의 정수로 입력해 주세요.",
    note: "쿠폰, 카드 할인, 세금, 배송비처럼 추가로 적용되는 조건은 포함하지 않습니다. 여러 할인이 순차 적용된다면 각 단계의 할인가를 새 정가로 입력해 다시 계산하세요.",
    method:
      "개당 절약액은 정가×할인율, 개당 할인가는 정가-절약액으로 계산합니다. 수량이 2개 이상이면 정가 합계와 총 할인액, 최종 결제금액도 같은 수량만큼 합산합니다.",
    tips: "상품 가격표의 할인율을 빠르게 검산하거나 여러 개를 살 때 총 절약액을 비교할 때 유용합니다. 서로 다른 할인율을 단순히 더하지 말고 실제 적용 순서를 확인하세요.",
    metaTitle: "할인율·할인가 계산기 | 세일 가격·총 할인액 계산",
  },
  en: {
    title: "Discount Rate & Sale Price Calculator",
    description:
      "Enter the original price, discount rate, and quantity to calculate the sale price per item, savings, original total, total discount, and final price.",
    category: "Business & Everyday",
    input: "Discount inputs",
    originalPrice: "Original price",
    discountRatePercent: "Discount rate (%)",
    quantity: "Quantity",
    calculate: "Calculate sale price",
    reset: "Reset",
    result: "Discount results",
    salePricePerItem: "Sale price per item",
    savingsPerItem: "Savings per item",
    totalOriginalPrice: "Original total",
    totalSavings: "Total savings",
    totalSalePrice: "Final total",
    error:
      "Enter an original price above zero, a discount rate from 0% to 100%, and a whole-number quantity of at least 1.",
    note: "Coupons, card discounts, taxes, shipping, and other extra conditions are not included. For stacked discounts, use the output sale price as the next original price in the actual order applied.",
    method:
      "Savings per item equal original price × discount rate. Sale price per item is original price minus savings. For multiple items, the original total, total savings, and final total are multiplied by quantity.",
    tips: "Use this to verify advertised discounts or compare the total savings from buying multiple items. Do not simply add sequential discount percentages unless the seller explicitly applies them that way.",
    metaTitle: "Discount Rate & Sale Price Calculator | Savings & Final Price",
  },
} satisfies Record<DiscountSalePriceLocale, Record<string, string>>;
