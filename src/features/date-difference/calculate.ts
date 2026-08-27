export type DateDifferenceInput = {
  startDate: string;
  endDate: string;
};

export type DateDifferenceDirection = "forward" | "same" | "reverse";

export type DateDifferenceResult = {
  signedDays: number;
  absoluteDays: number;
  fullWeeks: number;
  extraDays: number;
  calendarYears: number;
  calendarMonths: number;
  calendarDays: number;
  direction: DateDifferenceDirection;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function parseIsoDate(name: string, value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new RangeError(`${name} must use YYYY-MM-DD`);

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new RangeError(`${name} must be a valid calendar date`);
  }

  return date;
}

function daysInUtcMonth(year: number, monthIndex: number) {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

function addYearsClamped(date: Date, years: number) {
  const year = date.getUTCFullYear() + years;
  const month = date.getUTCMonth();
  const day = Math.min(date.getUTCDate(), daysInUtcMonth(year, month));
  return new Date(Date.UTC(year, month, day));
}

function addMonthsClamped(date: Date, months: number) {
  const totalMonths = date.getUTCFullYear() * 12 + date.getUTCMonth() + months;
  const year = Math.floor(totalMonths / 12);
  const month = totalMonths % 12;
  const day = Math.min(date.getUTCDate(), daysInUtcMonth(year, month));
  return new Date(Date.UTC(year, month, day));
}

function calendarBreakdown(earlier: Date, later: Date) {
  let calendarYears = later.getUTCFullYear() - earlier.getUTCFullYear();
  let yearAnchor = addYearsClamped(earlier, calendarYears);
  if (yearAnchor.getTime() > later.getTime()) {
    calendarYears -= 1;
    yearAnchor = addYearsClamped(earlier, calendarYears);
  }

  let calendarMonths =
    (later.getUTCFullYear() - yearAnchor.getUTCFullYear()) * 12 +
    later.getUTCMonth() -
    yearAnchor.getUTCMonth();
  let monthAnchor = addMonthsClamped(yearAnchor, calendarMonths);
  if (monthAnchor.getTime() > later.getTime()) {
    calendarMonths -= 1;
    monthAnchor = addMonthsClamped(yearAnchor, calendarMonths);
  }

  const calendarDays = Math.round(
    (later.getTime() - monthAnchor.getTime()) / DAY_MS,
  );

  return { calendarYears, calendarMonths, calendarDays };
}

export function calculateDateDifference(
  input: DateDifferenceInput,
): DateDifferenceResult {
  const startDate = parseIsoDate("startDate", input.startDate);
  const endDate = parseIsoDate("endDate", input.endDate);
  const signedDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / DAY_MS,
  );
  const absoluteDays = Math.abs(signedDays);
  const [earlier, later] =
    startDate.getTime() <= endDate.getTime()
      ? [startDate, endDate]
      : [endDate, startDate];
  const breakdown = calendarBreakdown(earlier, later);

  return {
    signedDays,
    absoluteDays,
    fullWeeks: Math.floor(absoluteDays / 7),
    extraDays: absoluteDays % 7,
    ...breakdown,
    direction: signedDays > 0 ? "forward" : signedDays < 0 ? "reverse" : "same",
  };
}
