export type PartTimeMonthlyPayInput = {
  hourlyWage: number;
  hoursPerDay: number;
  daysPerWeek: number;
};

export type PartTimeMonthlyPayResult = {
  weeklyHours: number;
  weeklyPay: number;
  averageMonthlyHours: number;
  monthlyPay: number;
  annualPay: number;
};

const WEEKS_PER_YEAR = 365.2425 / 7;
const MONTHS_PER_YEAR = 12;

export function calculatePartTimeMonthlyPay(
  input: PartTimeMonthlyPayInput,
): PartTimeMonthlyPayResult {
  const { hourlyWage, hoursPerDay, daysPerWeek } = input;

  if (
    !Number.isFinite(hourlyWage) ||
    !Number.isFinite(hoursPerDay) ||
    !Number.isFinite(daysPerWeek) ||
    hourlyWage < 0 ||
    hoursPerDay <= 0 ||
    hoursPerDay > 24 ||
    daysPerWeek <= 0 ||
    daysPerWeek > 7
  ) {
    throw new RangeError("Invalid part-time monthly pay input");
  }

  const weeklyHours = hoursPerDay * daysPerWeek;
  const weeklyPay = hourlyWage * weeklyHours;
  const annualPay = weeklyPay * WEEKS_PER_YEAR;
  const averageMonthlyHours = (weeklyHours * WEEKS_PER_YEAR) / MONTHS_PER_YEAR;
  const monthlyPay = annualPay / MONTHS_PER_YEAR;

  return {
    weeklyHours,
    weeklyPay,
    averageMonthlyHours,
    monthlyPay,
    annualPay,
  };
}
