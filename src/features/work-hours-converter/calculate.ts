export type WorkHoursDirection = "weekly-to-monthly" | "monthly-to-weekly";

export type WorkHoursConverterInput = {
  direction: WorkHoursDirection;
  hours: number;
};

export type WorkHoursConverterResult = {
  weeklyHours: number;
  averageMonthlyHours: number;
  annualHours: number;
  averageWeeksPerMonth: number;
};

export const WEEKS_PER_YEAR = 365.2425 / 7;
export const AVERAGE_WEEKS_PER_MONTH = WEEKS_PER_YEAR / 12;

export function calculateWorkHoursConverter(
  input: WorkHoursConverterInput,
): WorkHoursConverterResult {
  const { direction, hours } = input;

  if (
    (direction !== "weekly-to-monthly" && direction !== "monthly-to-weekly") ||
    !Number.isFinite(hours) ||
    hours < 0 ||
    hours > 744
  ) {
    throw new RangeError("Invalid work-hours converter input");
  }

  const weeklyHours =
    direction === "weekly-to-monthly" ? hours : hours / AVERAGE_WEEKS_PER_MONTH;
  const averageMonthlyHours =
    direction === "weekly-to-monthly" ? hours * AVERAGE_WEEKS_PER_MONTH : hours;
  const annualHours = weeklyHours * WEEKS_PER_YEAR;

  return {
    weeklyHours,
    averageMonthlyHours,
    annualHours,
    averageWeeksPerMonth: AVERAGE_WEEKS_PER_MONTH,
  };
}
