import Decimal from "decimal.js";

export type MortgageLoanLimitInput = {
  homePrice: Decimal;
  annualIncome: Decimal;
  existingAnnualDebtService: Decimal;
  annualInterestRate: Decimal;
  termYears: Decimal;
  ltvLimitRate: Decimal;
  dsrLimitRate: Decimal;
};

export type MortgageLoanLimitResult = {
  ltvLimit: Decimal;
  dsrLimit: Decimal;
  loanLimit: Decimal;
  monthlyPaymentCapacity: Decimal;
  estimatedMonthlyPayment: Decimal;
  limitingFactor: "ltv" | "dsr" | "both";
};

function requireNonNegative(name: string, value: Decimal) {
  if (!value.isFinite() || value.lt(0)) {
    throw new RangeError(`${name} must be a finite value of zero or greater`);
  }
}

function requireRate(name: string, value: Decimal) {
  requireNonNegative(name, value);
  if (value.gt(100)) {
    throw new RangeError(`${name} must not exceed 100`);
  }
}

function principalFromMonthlyPayment(
  monthlyPayment: Decimal,
  monthlyRate: Decimal,
  months: Decimal,
) {
  if (monthlyPayment.lte(0)) return new Decimal(0);
  if (monthlyRate.eq(0)) return monthlyPayment.mul(months);

  const growth = new Decimal(1).plus(monthlyRate).pow(months);
  return monthlyPayment
    .mul(new Decimal(1).minus(new Decimal(1).div(growth)))
    .div(monthlyRate);
}

function monthlyPaymentForPrincipal(
  principal: Decimal,
  monthlyRate: Decimal,
  months: Decimal,
) {
  if (principal.lte(0)) return new Decimal(0);
  if (monthlyRate.eq(0)) return principal.div(months);

  const growth = new Decimal(1).plus(monthlyRate).pow(months);
  return principal.mul(monthlyRate).mul(growth).div(growth.minus(1));
}

export function calculateMortgageLoanLimit(
  input: MortgageLoanLimitInput,
): MortgageLoanLimitResult {
  requireNonNegative("homePrice", input.homePrice);
  requireNonNegative("annualIncome", input.annualIncome);
  requireNonNegative("existingAnnualDebtService", input.existingAnnualDebtService);
  requireNonNegative("annualInterestRate", input.annualInterestRate);
  requireRate("ltvLimitRate", input.ltvLimitRate);
  requireRate("dsrLimitRate", input.dsrLimitRate);

  if (!input.termYears.isFinite() || input.termYears.lte(0)) {
    throw new RangeError("termYears must be a finite value greater than zero");
  }

  const months = input.termYears.mul(12);
  const monthlyRate = input.annualInterestRate.div(100).div(12);
  const ltvLimit = input.homePrice.mul(input.ltvLimitRate).div(100);
  const annualDebtServiceCapacity = Decimal.max(
    0,
    input.annualIncome
      .mul(input.dsrLimitRate)
      .div(100)
      .minus(input.existingAnnualDebtService),
  );
  const monthlyPaymentCapacity = annualDebtServiceCapacity.div(12);
  const dsrLimit = principalFromMonthlyPayment(
    monthlyPaymentCapacity,
    monthlyRate,
    months,
  );
  const loanLimit = Decimal.min(ltvLimit, dsrLimit);
  const estimatedMonthlyPayment = monthlyPaymentForPrincipal(
    loanLimit,
    monthlyRate,
    months,
  );

  let limitingFactor: MortgageLoanLimitResult["limitingFactor"] = "both";
  if (ltvLimit.lt(dsrLimit)) limitingFactor = "ltv";
  if (dsrLimit.lt(ltvLimit)) limitingFactor = "dsr";

  return {
    ltvLimit,
    dsrLimit,
    loanLimit,
    monthlyPaymentCapacity,
    estimatedMonthlyPayment,
    limitingFactor,
  };
}
