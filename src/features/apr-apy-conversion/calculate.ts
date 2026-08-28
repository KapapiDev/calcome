export type AprApyMode = "apr-to-apy" | "apy-to-apr";

export type AprApyInput = {
  mode: AprApyMode;
  annualRatePercent: number;
  compoundsPerYear: 1 | 2 | 4 | 12 | 365;
};

export type AprApyResult = {
  sourceRatePercent: number;
  convertedRatePercent: number;
  periodicRatePercent: number;
  compoundsPerYear: number;
};

export function calculateAprApy(input: AprApyInput): AprApyResult {
  if (!Number.isFinite(input.annualRatePercent)) {
    throw new RangeError("annualRatePercent must be finite");
  }
  if (input.annualRatePercent < 0 || input.annualRatePercent > 1000) {
    throw new RangeError("annualRatePercent must be between 0 and 1000");
  }
  if (![1, 2, 4, 12, 365].includes(input.compoundsPerYear)) {
    throw new RangeError("compoundsPerYear is unsupported");
  }

  const n = input.compoundsPerYear;
  const source = input.annualRatePercent / 100;

  if (input.mode === "apr-to-apy") {
    const periodicRate = source / n;
    const apy = (1 + periodicRate) ** n - 1;
    return {
      sourceRatePercent: input.annualRatePercent,
      convertedRatePercent: apy * 100,
      periodicRatePercent: periodicRate * 100,
      compoundsPerYear: n,
    };
  }

  if (input.mode === "apy-to-apr") {
    const periodicRate = (1 + source) ** (1 / n) - 1;
    const apr = periodicRate * n;
    return {
      sourceRatePercent: input.annualRatePercent,
      convertedRatePercent: apr * 100,
      periodicRatePercent: periodicRate * 100,
      compoundsPerYear: n,
    };
  }

  throw new RangeError("mode is unsupported");
}
