export type AgeInput = {
  birthDate: string;
  asOfDate: string;
};

export type AgeResult = {
  fullYears: number;
  totalDays: number;
  fullWeeks: number;
  extraDays: number;
  daysUntilBirthday: number;
  nextBirthday: string;
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

function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function birthdayInYear(birthDate: Date, year: number) {
  const month = birthDate.getUTCMonth();
  const day = birthDate.getUTCDate();

  if (month === 1 && day === 29 && !isLeapYear(year)) {
    return new Date(Date.UTC(year, 1, 28));
  }

  return new Date(Date.UTC(year, month, day));
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function calculateAge(input: AgeInput): AgeResult {
  const birthDate = parseIsoDate("birthDate", input.birthDate);
  const asOfDate = parseIsoDate("asOfDate", input.asOfDate);

  if (birthDate.getTime() > asOfDate.getTime()) {
    throw new RangeError("birthDate must not be after asOfDate");
  }

  const totalDays = Math.floor(
    (asOfDate.getTime() - birthDate.getTime()) / DAY_MS,
  );

  let fullYears = asOfDate.getUTCFullYear() - birthDate.getUTCFullYear();
  const birthdayThisYear = birthdayInYear(
    birthDate,
    asOfDate.getUTCFullYear(),
  );

  if (asOfDate.getTime() < birthdayThisYear.getTime()) {
    fullYears -= 1;
  }

  let nextBirthday = birthdayThisYear;
  if (asOfDate.getTime() >= birthdayThisYear.getTime()) {
    nextBirthday = birthdayInYear(birthDate, asOfDate.getUTCFullYear() + 1);
  }

  const daysUntilBirthday = Math.floor(
    (nextBirthday.getTime() - asOfDate.getTime()) / DAY_MS,
  );

  return {
    fullYears,
    totalDays,
    fullWeeks: Math.floor(totalDays / 7),
    extraDays: totalDays % 7,
    daysUntilBirthday,
    nextBirthday: toIsoDate(nextBirthday),
  };
}
