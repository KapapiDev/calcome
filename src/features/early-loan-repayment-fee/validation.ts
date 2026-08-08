import Decimal from "decimal.js";
import type { EarlyRepaymentFeeInput } from "./calculate";

export type EarlyRepaymentFeeValues = Record<
  "repaymentAmount" | "feeRate" | "originalTermMonths" | "elapsedMonths",
  string
>;
export type EarlyRepaymentFeeErrors = Partial<
  Record<keyof EarlyRepaymentFeeValues, string>
>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateEarlyRepaymentFee(
  values: EarlyRepaymentFeeValues,
  locale: "ko" | "en",
): { data?: EarlyRepaymentFeeInput; errors: EarlyRepaymentFeeErrors } {
  const errors: EarlyRepaymentFeeErrors = {};
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  const repaymentAmount = MONEY.test(values.repaymentAmount.trim())
    ? new Decimal(values.repaymentAmount.replaceAll(",", ""))
    : null;
  const feeRate = NUMBER.test(values.feeRate.trim())
    ? new Decimal(values.feeRate)
    : null;
  const originalTermMonths = /^\d+$/.test(values.originalTermMonths.trim())
    ? Number(values.originalTermMonths)
    : null;
  const elapsedMonths = /^\d+$/.test(values.elapsedMonths.trim())
    ? Number(values.elapsedMonths)
    : null;

  if (
    !repaymentAmount ||
    repaymentAmount.lte(0) ||
    repaymentAmount.gt(10_000_000_000_000)
  )
    errors.repaymentAmount = message(
      "0원보다 크고 10조 원 이하인 상환금액을 입력해 주세요.",
      "Enter a repayment amount greater than zero and no more than 10 trillion in the selected display currency.",
    );
  if (!feeRate || feeRate.lt(0) || feeRate.gt(10))
    errors.feeRate = message(
      "0% 이상 10% 이하의 수수료율을 입력해 주세요.",
      "Enter a fee rate from 0% to 10%.",
    );
  if (!originalTermMonths || originalTermMonths < 1 || originalTermMonths > 600)
    errors.originalTermMonths = message(
      "1개월 이상 600개월 이하의 약정기간을 입력해 주세요.",
      "Enter an original term from 1 to 600 months.",
    );
  if (elapsedMonths === null || elapsedMonths < 0 || elapsedMonths > 600)
    errors.elapsedMonths = message(
      "0개월 이상 600개월 이하의 경과기간을 입력해 주세요.",
      "Enter elapsed time from 0 to 600 months.",
    );
  else if (originalTermMonths && elapsedMonths > originalTermMonths)
    errors.elapsedMonths = message(
      "경과기간은 약정기간보다 길 수 없습니다.",
      "Elapsed time cannot exceed the original term.",
    );

  return Object.keys(errors).length ||
    !repaymentAmount ||
    !feeRate ||
    !originalTermMonths ||
    elapsedMonths === null
    ? { errors }
    : {
        errors,
        data: { repaymentAmount, feeRate, originalTermMonths, elapsedMonths },
      };
}
