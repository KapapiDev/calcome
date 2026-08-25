import type { InflationPurchasingPowerInput } from "./calculate";
import type { InflationPurchasingPowerLocale } from "./content";

export type InflationPurchasingPowerValues = {
  currentAmount: string;
  annualInflationPercent: string;
  years: string;
};

export type InflationPurchasingPowerErrors = Partial<
  Record<keyof InflationPurchasingPowerValues, string>
>;

function numberFrom(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return Number.NaN;
  return Number(normalized);
}

export function validateInflationPurchasingPower(
  values: InflationPurchasingPowerValues,
  locale: InflationPurchasingPowerLocale,
): {
  data?: InflationPurchasingPowerInput;
  errors: InflationPurchasingPowerErrors;
} {
  const amount = numberFrom(values.currentAmount);
  const inflation = numberFrom(values.annualInflationPercent);
  const years = numberFrom(values.years);
  const ko = locale === "ko";
  const errors: InflationPurchasingPowerErrors = {};

  if (!Number.isFinite(amount) || amount < 0) {
    errors.currentAmount = ko
      ? "0 이상의 금액을 입력해 주세요."
      : "Enter an amount of zero or more.";
  }
  if (!Number.isFinite(inflation) || inflation <= -100 || inflation > 1_000) {
    errors.annualInflationPercent = ko
      ? "-100%보다 크고 1,000% 이하인 물가상승률을 입력해 주세요."
      : "Enter an inflation rate above -100% and no more than 1,000%.";
  }
  if (!Number.isFinite(years) || years <= 0 || years > 100) {
    errors.years = ko
      ? "0보다 크고 100 이하인 기간을 입력해 주세요."
      : "Enter a time horizon above 0 and no more than 100 years.";
  }

  if (Object.keys(errors).length) return { errors };

  return {
    data: {
      currentAmount: amount,
      annualInflationPercent: inflation,
      years,
    },
    errors,
  };
}
