export type YearEndTaxRefundInput = {
  determinedIncomeTax: number;
  prepaidIncomeTax: number;
  specialPaymentTax: number;
};

export type YearEndTaxRefundResult = {
  settlementTax: number;
  refundAmount: number;
  additionalPayment: number;
  prepaidAfterSpecialPayment: number;
};

export function calculateYearEndTaxRefund(
  input: YearEndTaxRefundInput,
): YearEndTaxRefundResult {
  const prepaidAfterSpecialPayment =
    input.prepaidIncomeTax + input.specialPaymentTax;
  const settlementTax = input.determinedIncomeTax - prepaidAfterSpecialPayment;

  return {
    settlementTax,
    refundAmount: Math.max(0, -settlementTax),
    additionalPayment: Math.max(0, settlementTax),
    prepaidAfterSpecialPayment,
  };
}
