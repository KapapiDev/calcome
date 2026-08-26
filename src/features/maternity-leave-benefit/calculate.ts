export type MaternityLeaveBenefitInput = {
  monthlyOrdinaryWage: number;
  multipleBirth: boolean;
  prioritySupportedEmployer: boolean;
};

export type MaternityLeaveBenefitResult = {
  leaveDays: number;
  employerPaidDays: number;
  governmentPaidDays: number;
  governmentBenefit: number;
  employerPayment: number;
  estimatedTotalIncome: number;
  governmentMonthlyCap: number;
};

const GOVERNMENT_MONTHLY_CAP = 2100000;

function prorateMonthly(amount: number, days: number) {
  return (amount * days) / 30;
}

export function calculateMaternityLeaveBenefit(
  input: MaternityLeaveBenefitInput,
): MaternityLeaveBenefitResult {
  if (
    !Number.isFinite(input.monthlyOrdinaryWage) ||
    input.monthlyOrdinaryWage <= 0
  ) {
    throw new RangeError("Invalid maternity leave benefit input");
  }

  const leaveDays = input.multipleBirth ? 120 : 90;
  const employerPaidDays = input.multipleBirth ? 75 : 60;
  const finalInsuranceDays = leaveDays - employerPaidDays;
  const cappedMonthlyBenefit = Math.min(
    input.monthlyOrdinaryWage,
    GOVERNMENT_MONTHLY_CAP,
  );

  if (input.prioritySupportedEmployer) {
    const governmentBenefit = prorateMonthly(cappedMonthlyBenefit, leaveDays);
    const employerTopUpMonthly = Math.max(
      input.monthlyOrdinaryWage - cappedMonthlyBenefit,
      0,
    );
    const employerPayment = prorateMonthly(
      employerTopUpMonthly,
      employerPaidDays,
    );

    return {
      leaveDays,
      employerPaidDays,
      governmentPaidDays: leaveDays,
      governmentBenefit,
      employerPayment,
      estimatedTotalIncome: governmentBenefit + employerPayment,
      governmentMonthlyCap: GOVERNMENT_MONTHLY_CAP,
    };
  }

  const employerPayment = prorateMonthly(
    input.monthlyOrdinaryWage,
    employerPaidDays,
  );
  const governmentBenefit = prorateMonthly(
    cappedMonthlyBenefit,
    finalInsuranceDays,
  );

  return {
    leaveDays,
    employerPaidDays,
    governmentPaidDays: finalInsuranceDays,
    governmentBenefit,
    employerPayment,
    estimatedTotalIncome: governmentBenefit + employerPayment,
    governmentMonthlyCap: GOVERNMENT_MONTHLY_CAP,
  };
}
