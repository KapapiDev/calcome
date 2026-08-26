export type DailyWorkerPayInput = {
  dailyGrossPay: number;
  workDays: number;
  nonTaxableDailyPay: number;
};

export type DailyWorkerPayResult = {
  taxableDailyPay: number;
  dailyEarnedIncome: number;
  dailyIncomeTaxBeforeSmallCollection: number;
  calculatedIncomeTaxBeforeSmallCollection: number;
  incomeTax: number;
  localIncomeTax: number;
  totalWithholding: number;
  totalGrossPay: number;
  totalNonTaxablePay: number;
  estimatedNetPay: number;
  smallCollectionExemptionApplied: boolean;
};

const DAILY_EARNED_INCOME_DEDUCTION = 150_000;
const SMALL_COLLECTION_THRESHOLD = 1_000;

const floorToTen = (value: number) => Math.floor(value / 10) * 10;

export function calculateDailyWorkerPay(
  input: DailyWorkerPayInput,
): DailyWorkerPayResult {
  const { dailyGrossPay, workDays, nonTaxableDailyPay } = input;

  if (
    !Number.isFinite(dailyGrossPay) ||
    !Number.isFinite(workDays) ||
    !Number.isFinite(nonTaxableDailyPay) ||
    !Number.isInteger(dailyGrossPay) ||
    !Number.isInteger(nonTaxableDailyPay) ||
    !Number.isInteger(workDays) ||
    dailyGrossPay < 0 ||
    nonTaxableDailyPay < 0 ||
    nonTaxableDailyPay > dailyGrossPay ||
    workDays <= 0 ||
    workDays > 366
  ) {
    throw new RangeError("Invalid daily worker pay input");
  }

  const taxableDailyPay = Math.max(0, dailyGrossPay - nonTaxableDailyPay);
  const dailyEarnedIncome = Math.max(
    0,
    taxableDailyPay - DAILY_EARNED_INCOME_DEDUCTION,
  );
  const dailyIncomeTaxBeforeSmallCollection = Math.floor(
    (dailyEarnedIncome * 27) / 1_000,
  );
  const calculatedIncomeTaxBeforeSmallCollection =
    dailyIncomeTaxBeforeSmallCollection * workDays;
  const smallCollectionExemptionApplied =
    calculatedIncomeTaxBeforeSmallCollection > 0 &&
    calculatedIncomeTaxBeforeSmallCollection < SMALL_COLLECTION_THRESHOLD;
  const incomeTax = smallCollectionExemptionApplied
    ? 0
    : calculatedIncomeTaxBeforeSmallCollection;
  const localIncomeTax = floorToTen(incomeTax * 0.1);
  const totalWithholding = incomeTax + localIncomeTax;
  const totalGrossPay = dailyGrossPay * workDays;
  const totalNonTaxablePay = nonTaxableDailyPay * workDays;

  return {
    taxableDailyPay,
    dailyEarnedIncome,
    dailyIncomeTaxBeforeSmallCollection,
    calculatedIncomeTaxBeforeSmallCollection,
    incomeTax,
    localIncomeTax,
    totalWithholding,
    totalGrossPay,
    totalNonTaxablePay,
    estimatedNetPay: totalGrossPay - totalWithholding,
    smallCollectionExemptionApplied,
  };
}
