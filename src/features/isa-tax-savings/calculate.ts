export type IsaTaxSavingsAccountType = "general" | "special";

export type IsaTaxSavingsInput = {
  accountType: IsaTaxSavingsAccountType;
  netProfit: number;
};

export type IsaTaxSavingsResult = {
  taxFreeLimit: number;
  taxableProfit: number;
  isaTax: number;
  ordinaryTax: number;
  taxSavings: number;
  effectiveIsaTaxRate: number;
};

const GENERAL_TAX_FREE_LIMIT = 2_000_000;
const SPECIAL_TAX_FREE_LIMIT = 4_000_000;
const ISA_SEPARATE_TAX_RATE = 0.099;
const ORDINARY_WITHHOLDING_RATE = 0.154;

export function calculateIsaTaxSavings(
  input: IsaTaxSavingsInput,
): IsaTaxSavingsResult {
  const { accountType, netProfit } = input;

  if (!Number.isFinite(netProfit) || netProfit < 0) {
    throw new RangeError("Invalid ISA tax savings input");
  }

  const taxFreeLimit =
    accountType === "special" ? SPECIAL_TAX_FREE_LIMIT : GENERAL_TAX_FREE_LIMIT;
  const taxableProfit = Math.max(0, netProfit - taxFreeLimit);
  const isaTax = taxableProfit * ISA_SEPARATE_TAX_RATE;
  const ordinaryTax = netProfit * ORDINARY_WITHHOLDING_RATE;
  const taxSavings = Math.max(0, ordinaryTax - isaTax);

  return {
    taxFreeLimit,
    taxableProfit,
    isaTax,
    ordinaryTax,
    taxSavings,
    effectiveIsaTaxRate: netProfit === 0 ? 0 : isaTax / netProfit,
  };
}
