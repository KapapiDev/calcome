export type BusinessCashRunwayInput = {
  startingCash: number;
  monthlyInflow: number;
  monthlyOutflow: number;
};

export type BusinessCashRunwayResult = {
  monthlyNetBurn: number;
  runwayMonths: number | null;
  increasedInflowRunwayMonths: number | null;
  reducedOutflowRunwayMonths: number | null;
  lowRunway: boolean;
};

function runwayMonths(startingCash: number, monthlyNetBurn: number) {
  return monthlyNetBurn <= 0 ? null : startingCash / monthlyNetBurn;
}

export function calculateBusinessCashRunway(
  input: BusinessCashRunwayInput,
): BusinessCashRunwayResult {
  const values = [
    input.startingCash,
    input.monthlyInflow,
    input.monthlyOutflow,
  ];
  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError("all inputs must be finite");
  }
  if (input.startingCash < 0 || input.monthlyInflow < 0) {
    throw new RangeError("cash and inflow must be nonnegative");
  }
  if (input.monthlyOutflow <= 0) {
    throw new RangeError("monthly outflow must be greater than zero");
  }

  const monthlyNetBurn = input.monthlyOutflow - input.monthlyInflow;
  const runway = runwayMonths(input.startingCash, monthlyNetBurn);
  const increasedInflowRunwayMonths = runwayMonths(
    input.startingCash,
    input.monthlyOutflow - input.monthlyInflow * 1.1,
  );
  const reducedOutflowRunwayMonths = runwayMonths(
    input.startingCash,
    input.monthlyOutflow * 0.9 - input.monthlyInflow,
  );

  return {
    monthlyNetBurn,
    runwayMonths: runway,
    increasedInflowRunwayMonths,
    reducedOutflowRunwayMonths,
    lowRunway: runway !== null && runway < 3,
  };
}

export function estimateRunwayEndDate(
  runway: number | null,
  startDate: Date,
): Date | null {
  if (runway === null) return null;
  if (
    !Number.isFinite(runway) ||
    runway < 0 ||
    Number.isNaN(startDate.getTime())
  ) {
    throw new RangeError("runway and start date must be valid");
  }

  const averageDaysPerMonth = 365.2425 / 12;
  return new Date(
    startDate.getTime() + runway * averageDaysPerMonth * 24 * 60 * 60 * 1000,
  );
}
