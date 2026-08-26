export type CompensationOfferInput = {
  baseSalary: number;
  annualBonus: number;
  annualEquity: number;
  annualBenefits: number;
  signOnBonus: number;
};

export type TotalCompensationComparisonInput = {
  offerA: CompensationOfferInput;
  offerB: CompensationOfferInput;
  horizonYears: number;
};

export type CompensationOfferResult = CompensationOfferInput & {
  recurringAnnualCompensation: number;
  horizonTotalCompensation: number;
  averageAnnualCompensation: number;
};

export type TotalCompensationComparisonResult = {
  offerA: CompensationOfferResult;
  offerB: CompensationOfferResult;
  horizonYears: number;
  difference: number;
  absoluteDifference: number;
  higherOffer: "A" | "B" | "tie";
};

function validateOffer(offer: CompensationOfferInput) {
  return Object.values(offer).every(
    (value) => Number.isFinite(value) && value >= 0,
  );
}

function calculateOffer(
  offer: CompensationOfferInput,
  horizonYears: number,
): CompensationOfferResult {
  const recurringAnnualCompensation =
    offer.baseSalary +
    offer.annualBonus +
    offer.annualEquity +
    offer.annualBenefits;
  const horizonTotalCompensation =
    recurringAnnualCompensation * horizonYears + offer.signOnBonus;

  return {
    ...offer,
    recurringAnnualCompensation,
    horizonTotalCompensation,
    averageAnnualCompensation: horizonTotalCompensation / horizonYears,
  };
}

export function calculateTotalCompensationComparison(
  input: TotalCompensationComparisonInput,
): TotalCompensationComparisonResult {
  if (
    !validateOffer(input.offerA) ||
    !validateOffer(input.offerB) ||
    !Number.isFinite(input.horizonYears) ||
    input.horizonYears < 1 ||
    input.horizonYears > 10
  ) {
    throw new RangeError("Invalid total-compensation comparison input");
  }

  const offerA = calculateOffer(input.offerA, input.horizonYears);
  const offerB = calculateOffer(input.offerB, input.horizonYears);
  const difference =
    offerB.horizonTotalCompensation - offerA.horizonTotalCompensation;

  return {
    offerA,
    offerB,
    horizonYears: input.horizonYears,
    difference,
    absoluteDifference: Math.abs(difference),
    higherOffer: difference > 0 ? "B" : difference < 0 ? "A" : "tie",
  };
}
