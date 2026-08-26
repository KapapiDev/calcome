export type ParentalLeaveBenefitInput = {
  monthlyOrdinaryWage: number;
  leaveMonths: number;
};

export type ParentalLeaveBenefitResult = {
  monthlyOrdinaryWage: number;
  leaveMonths: number;
  firstThreeMonthly: number;
  monthsFourToSixMonthly: number;
  monthSevenPlusMonthly: number;
  totalBenefit: number;
  averageMonthlyBenefit: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function calculateParentalLeaveBenefit(
  input: ParentalLeaveBenefitInput,
): ParentalLeaveBenefitResult {
  if (
    !Number.isFinite(input.monthlyOrdinaryWage) ||
    input.monthlyOrdinaryWage <= 0 ||
    !Number.isInteger(input.leaveMonths) ||
    input.leaveMonths < 1 ||
    input.leaveMonths > 18
  ) {
    throw new RangeError("Invalid parental leave benefit input");
  }

  const firstThreeMonthly = clamp(input.monthlyOrdinaryWage, 700000, 2500000);
  const monthsFourToSixMonthly = clamp(
    input.monthlyOrdinaryWage,
    700000,
    2000000,
  );
  const monthSevenPlusMonthly = clamp(
    input.monthlyOrdinaryWage * 0.8,
    700000,
    1600000,
  );

  const firstThreeMonths = Math.min(input.leaveMonths, 3);
  const monthsFourToSix = Math.min(Math.max(input.leaveMonths - 3, 0), 3);
  const monthSevenPlus = Math.max(input.leaveMonths - 6, 0);
  const totalBenefit =
    firstThreeMonthly * firstThreeMonths +
    monthsFourToSixMonthly * monthsFourToSix +
    monthSevenPlusMonthly * monthSevenPlus;

  return {
    monthlyOrdinaryWage: input.monthlyOrdinaryWage,
    leaveMonths: input.leaveMonths,
    firstThreeMonthly,
    monthsFourToSixMonthly,
    monthSevenPlusMonthly,
    totalBenefit,
    averageMonthlyBenefit: totalBenefit / input.leaveMonths,
  };
}
