export type DDayInput = {
  asOfDate: string;
  targetDate: string;
};

export type DDayStatus = "future" | "today" | "past";

export type DDayResult = {
  signedDays: number;
  absoluteDays: number;
  fullWeeks: number;
  extraDays: number;
  status: DDayStatus;
  targetDate: string;
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

export function calculateDDay(input: DDayInput): DDayResult {
  const asOfDate = parseIsoDate("asOfDate", input.asOfDate);
  const targetDate = parseIsoDate("targetDate", input.targetDate);
  const signedDays = Math.round(
    (targetDate.getTime() - asOfDate.getTime()) / DAY_MS,
  );
  const absoluteDays = Math.abs(signedDays);

  return {
    signedDays,
    absoluteDays,
    fullWeeks: Math.floor(absoluteDays / 7),
    extraDays: absoluteDays % 7,
    status: signedDays > 0 ? "future" : signedDays < 0 ? "past" : "today",
    targetDate: input.targetDate,
  };
}
