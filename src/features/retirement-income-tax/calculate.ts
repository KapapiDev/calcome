export type RetirementIncomeTaxInput = {
  retirementPay: number;
  nonTaxableRetirementPay: number;
  serviceYears: number;
};

export type RetirementIncomeTaxResult = {
  retirementIncome: number;
  serviceYearsDeduction: number;
  convertedSalary: number;
  convertedSalaryDeduction: number;
  taxBase: number;
  convertedIncomeTax: number;
  retirementIncomeTax: number;
  localIncomeTax: number;
  totalTax: number;
  afterTaxRetirementPay: number;
};

function serviceYearsDeduction(years: number) {
  if (years <= 5) return years * 1_000_000;
  if (years <= 10) return 5_000_000 + (years - 5) * 2_000_000;
  if (years <= 20) return 15_000_000 + (years - 10) * 2_500_000;
  return 40_000_000 + (years - 20) * 3_000_000;
}

function convertedSalaryDeduction(amount: number) {
  if (amount <= 8_000_000) return amount;
  if (amount <= 70_000_000)
    return 8_000_000 + (amount - 8_000_000) * 0.6;
  if (amount <= 100_000_000)
    return 45_200_000 + (amount - 70_000_000) * 0.55;
  if (amount <= 300_000_000)
    return 61_700_000 + (amount - 100_000_000) * 0.45;
  return 151_700_000 + (amount - 300_000_000) * 0.35;
}

function progressiveIncomeTax(taxBase: number) {
  if (taxBase <= 14_000_000) return taxBase * 0.06;
  if (taxBase <= 50_000_000)
    return 840_000 + (taxBase - 14_000_000) * 0.15;
  if (taxBase <= 88_000_000)
    return 6_240_000 + (taxBase - 50_000_000) * 0.24;
  if (taxBase <= 150_000_000)
    return 15_360_000 + (taxBase - 88_000_000) * 0.35;
  if (taxBase <= 300_000_000)
    return 37_060_000 + (taxBase - 150_000_000) * 0.38;
  if (taxBase <= 500_000_000)
    return 94_060_000 + (taxBase - 300_000_000) * 0.4;
  if (taxBase <= 1_000_000_000)
    return 174_060_000 + (taxBase - 500_000_000) * 0.42;
  return 384_060_000 + (taxBase - 1_000_000_000) * 0.45;
}

export function calculateRetirementIncomeTax(
  input: RetirementIncomeTaxInput,
): RetirementIncomeTaxResult {
  const retirementIncome = Math.max(
    0,
    input.retirementPay - input.nonTaxableRetirementPay,
  );
  const yearsDeduction = serviceYearsDeduction(input.serviceYears);
  const convertedSalary =
    (Math.max(0, retirementIncome - yearsDeduction) * 12) / input.serviceYears;
  const salaryDeduction = convertedSalaryDeduction(convertedSalary);
  const taxBase = Math.max(0, convertedSalary - salaryDeduction);
  const convertedIncomeTax = progressiveIncomeTax(taxBase);
  const retirementIncomeTax = Math.floor(
    (convertedIncomeTax * input.serviceYears) / 12,
  );
  const localIncomeTax = Math.floor(retirementIncomeTax * 0.1);
  const totalTax = retirementIncomeTax + localIncomeTax;

  return {
    retirementIncome,
    serviceYearsDeduction: yearsDeduction,
    convertedSalary,
    convertedSalaryDeduction: salaryDeduction,
    taxBase,
    convertedIncomeTax,
    retirementIncomeTax,
    localIncomeTax,
    totalTax,
    afterTaxRetirementPay: Math.max(0, input.retirementPay - totalTax),
  };
}
