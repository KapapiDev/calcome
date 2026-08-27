export type PercentageInput = {
  percent: number;
  baseValue: number;
  partValue: number;
  wholeValue: number;
  oldValue: number;
  newValue: number;
};

export type PercentageResult = {
  percentOfValue: number;
  partAsPercent: number;
  percentChange: number;
};

function requireFinite(name: string, value: number) {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be finite`);
  }
}

export function calculatePercentage(input: PercentageInput): PercentageResult {
  requireFinite("percent", input.percent);
  requireFinite("baseValue", input.baseValue);
  requireFinite("partValue", input.partValue);
  requireFinite("wholeValue", input.wholeValue);
  requireFinite("oldValue", input.oldValue);
  requireFinite("newValue", input.newValue);

  if (input.wholeValue === 0) {
    throw new RangeError("wholeValue must not be zero");
  }
  if (input.oldValue === 0) {
    throw new RangeError("oldValue must not be zero");
  }

  return {
    percentOfValue: (input.percent / 100) * input.baseValue,
    partAsPercent: (input.partValue / input.wholeValue) * 100,
    percentChange:
      ((input.newValue - input.oldValue) / Math.abs(input.oldValue)) * 100,
  };
}
