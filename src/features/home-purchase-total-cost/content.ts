export type HomePurchaseTotalCostLocale = "ko" | "en";

export const homePurchaseTotalCostContent = {
  ko: {
    title: "주택 매수 총비용 계산기",
    description:
      "매매가에 취득세, 중개보수, 등기·법무, 대출·감정, 이사·설치, 수리·가구 비용 등을 더해 실제 총매입원가와 필요한 자기자금을 계산합니다.",
    category: "부동산·주거",
    input: "매수 비용 입력",
    purchasePrice: "주택 매매가",
    loanAmount: "주택 구입 대출금",
    acquisitionTax: "취득세·지방세",
    brokerageFee: "중개보수",
    registrationLegalCost: "등기·법무 비용",
    loanAppraisalCost: "대출·감정·설정 비용",
    movingSetupCost: "이사·입주 설치 비용",
    renovationFurnitureCost: "수리·인테리어·가구 비용",
    otherCost: "기타 매수 관련 비용",
    calculate: "총비용 계산하기",
    reset: "초기화",
    result: "주택 매수 총비용",
    transactionCosts: "매매가 외 추가 비용",
    totalPurchaseCost: "총매입원가",
    estimatedCashRequired: "예상 필요 자기자금",
    additionalCostRate: "매매가 대비 추가비용 비율",
    financedShare: "매매가 대비 대출 비율",
    error:
      "매매가는 0보다 크게, 나머지 금액은 0 이상으로 입력하고 대출금은 매매가를 넘지 않게 입력해 주세요.",
    note: "이 계산기는 취득세율이나 중개보수 상한을 자동 판단하지 않습니다. 실제 계약 조건과 관할 규정에 맞게 별도 계산기·견적서·금융기관 안내에서 확인한 금액을 입력하세요.",
    method:
      "매매가 외 비용은 취득세, 중개보수, 등기·법무, 대출·감정·설정, 이사·입주, 수리·가구, 기타 비용을 모두 합산합니다. 총매입원가는 매매가와 이 추가 비용의 합이며, 예상 필요 자기자금은 총매입원가에서 입력한 주택 구입 대출금을 뺀 금액입니다.",
    tips: "계약금·잔금 일정과 실제 현금흐름은 금융기관 실행일, 기존 자산 매각 여부, 보증금 회수 시점 등에 따라 달라질 수 있습니다. 취득세와 중개보수는 먼저 관련 계산기로 확인한 뒤 이곳에 넣으면 전체 예산을 한 번에 볼 수 있습니다.",
    metaTitle: "주택 매수 총비용 계산기 | 취득세·중개보수·필요자금",
  },
  en: {
    title: "Home Purchase Total Cost Calculator",
    description:
      "Add purchase price, taxes, brokerage, legal and registration fees, financing costs, moving, renovation, furniture, and other costs to estimate total acquisition cost and cash required.",
    category: "Housing & Real Estate",
    input: "Purchase-cost inputs",
    purchasePrice: "Home purchase price",
    loanAmount: "Home purchase loan",
    acquisitionTax: "Acquisition / transfer taxes",
    brokerageFee: "Brokerage fee",
    registrationLegalCost: "Registration and legal costs",
    loanAppraisalCost: "Loan, appraisal and setup costs",
    movingSetupCost: "Moving and move-in setup costs",
    renovationFurnitureCost: "Renovation and furniture costs",
    otherCost: "Other purchase-related costs",
    calculate: "Calculate total cost",
    reset: "Reset",
    result: "Home purchase total cost",
    transactionCosts: "Costs beyond purchase price",
    totalPurchaseCost: "Total acquisition cost",
    estimatedCashRequired: "Estimated cash required",
    additionalCostRate: "Extra costs as % of price",
    financedShare: "Loan as % of purchase price",
    error:
      "Enter a purchase price above zero, non-negative costs, and a home-purchase loan no larger than the purchase price.",
    note: "This calculator does not determine statutory tax rates or brokerage caps. Enter amounts you have verified for your location and transaction using official guidance, dedicated calculators, quotes, or lender documents.",
    method:
      "Costs beyond the purchase price combine taxes, brokerage, registration/legal, loan/appraisal/setup, moving, renovation/furniture and other entered costs. Total acquisition cost adds those costs to the purchase price. Estimated cash required subtracts the entered purchase loan from that total.",
    tips: "Actual closing cash can vary with payment timing, lender disbursement, sale proceeds from another property, deposits, and local rules. Verify transaction-specific taxes and fees first, then use this calculator as the overall budget layer.",
    metaTitle:
      "Home Purchase Total Cost Calculator | Fees, Taxes & Cash Needed",
  },
} satisfies Record<HomePurchaseTotalCostLocale, Record<string, string>>;
