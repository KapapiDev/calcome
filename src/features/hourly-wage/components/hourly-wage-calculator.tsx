"use client";

import { type FormEvent, useState } from "react";

import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { formatWon } from "@/features/compound-interest/format";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import { calculateHourlyWage } from "../calculate";
import { MINIMUM_HOURLY_WAGE_2026, WEEKS_PER_YEAR } from "../constants";
import { hourlyWageContent } from "../content";
import type { HourlyWageLocale, HourlyWageResult, PayUnit } from "../types";
import { validateHourlyWageInput } from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 sm:text-sm";
const validationAlertId = "hourly-wage-validation";

export function HourlyWageCalculator({ locale }: { locale: HourlyWageLocale }) {
  const copy = hourlyWageContent[locale];
  const [payAmount, setPayAmount] = useState("");
  const [payUnit, setPayUnit] = useState<PayUnit>("monthly");
  const [dailyHours, setDailyHours] = useState("");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [includePaidHoliday, setIncludePaidHoliday] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<HourlyWageResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const input = validateHourlyWageInput({
      payAmount,
      payUnit,
      dailyHours,
      weeklyHours,
      includePaidHoliday,
    });
    if (!input) {
      cancelResultScroll();
      setResult(null);
      setError(copy.validation);
      return;
    }
    setError("");
    requestResultScroll();
    setResult(calculateHourlyWage(input));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setPayAmount("");
    setPayUnit("monthly");
    setDailyHours("");
    setWeeklyHours("");
    setIncludePaidHoliday(true);
    setError("");
    setResult(null);
  }

  return (
    <section aria-labelledby="hourly-wage-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="hourly-wage-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.inputTitle}
          </h2>
          {error ? (
            <p
              id={validationAlertId}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
          <label className="mt-4 block text-sm font-medium">
            {copy.payAmount}
            <input
              inputMode="decimal"
              value={payAmount}
              placeholder={locale === "ko" ? "예: 2,500,000" : "e.g. 2,500,000"}
              onChange={(event) =>
                setPayAmount(formatMoneyInput(event.target.value, payAmount))
              }
              aria-invalid={Boolean(error)}
              aria-describedby={error ? validationAlertId : undefined}
              className={fieldClass}
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            {copy.payUnit}
            <select
              value={payUnit}
              onChange={(event) => setPayUnit(event.target.value as PayUnit)}
              className={fieldClass}
            >
              {(Object.keys(copy.units) as PayUnit[]).map((unit) => (
                <option key={unit} value={unit}>
                  {copy.units[unit]}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <label className="block text-sm font-medium">
              {copy.dailyHours}
              <input
                inputMode="decimal"
                value={dailyHours}
                placeholder={locale === "ko" ? "예: 8" : "e.g. 8"}
                onChange={(event) => setDailyHours(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? validationAlertId : undefined}
                className={fieldClass}
              />
            </label>
            <label className="block text-sm font-medium">
              {copy.weeklyHours}
              <input
                inputMode="decimal"
                value={weeklyHours}
                placeholder={locale === "ko" ? "예: 40" : "e.g. 40"}
                onChange={(event) => setWeeklyHours(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? validationAlertId : undefined}
                className={fieldClass}
              />
            </label>
          </div>
          <label className="mt-4 flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm">
            <input
              type="checkbox"
              checked={includePaidHoliday}
              onChange={(event) => setIncludePaidHoliday(event.target.checked)}
            />
            {copy.includePaidHoliday}
          </label>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="hourly-wage-result-title"
          className="min-w-0 scroll-mt-20 space-y-4"
        >
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <h2 id="hourly-wage-result-title" className="text-xl font-semibold">
              {copy.resultTitle}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.hourlyWage,
                  value: (
                    <AnimatedWon
                      value={result?.hourlyWage ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.monthlyPay,
                  value: (
                    <AnimatedWon
                      value={result?.monthlyPay ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.annualPay,
                  value: (
                    <AnimatedWon
                      value={result?.annualPay ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              {result
                ? result.meetsMinimumWage
                  ? copy.aboveMinimum
                  : copy.belowMinimum
                : copy.empty}
            </p>
          </div>

          <MinimumWageComparison locale={locale} result={result} />
          <ConversionTable locale={locale} result={result} />
        </section>
      </div>
    </section>
  );
}

function MinimumWageComparison({
  locale,
  result,
}: {
  locale: HourlyWageLocale;
  result: HourlyWageResult | null;
}) {
  const copy = hourlyWageContent[locale];
  const max = result
    ? Math.max(result.hourlyWage.toNumber(), Number(MINIMUM_HOURLY_WAGE_2026))
    : 1;
  const resultWidth = result
    ? `${(result.hourlyWage.toNumber() / max) * 100}%`
    : "0%";
  const minimumWidth = result
    ? `${(Number(MINIMUM_HOURLY_WAGE_2026) / max) * 100}%`
    : "0%";
  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{copy.minimumComparison}</h2>
      {result ? (
        <div
          role="img"
          aria-label={`${copy.hourlyWage} ${formatWon(result.hourlyWage)}, ${copy.minimumComparison} ${formatWon(MINIMUM_HOURLY_WAGE_2026)}`}
          className="mt-4 space-y-4"
        >
          <ComparisonBar
            label={copy.hourlyWage}
            value={formatWon(result.hourlyWage)}
            width={resultWidth}
            featured
          />
          <ComparisonBar
            label={
              locale === "ko" ? "2026 최저시급" : "2026 minimum hourly wage"
            }
            value={formatWon(MINIMUM_HOURLY_WAGE_2026)}
            width={minimumWidth}
          />
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">{copy.empty}</p>
      )}
    </section>
  );
}

function ComparisonBar({
  label,
  value,
  width,
  featured = false,
}: {
  label: string;
  value: string;
  width: string;
  featured?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between gap-3 text-sm">
        <span>{label}</span>
        <strong className="tabular-nums">{value}</strong>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${featured ? "bg-primary" : "bg-emerald-500"}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

function ConversionTable({
  locale,
  result,
}: {
  locale: HourlyWageLocale;
  result: HourlyWageResult | null;
}) {
  const copy = hourlyWageContent[locale];
  const rows = result
    ? ([
        [copy.units.hourly, result.hourlyWage, "1"],
        [
          copy.units.daily,
          result.dailyPay,
          result.dailyPay.div(result.hourlyWage).toDecimalPlaces(4).toString(),
        ],
        [
          copy.units.weekly,
          result.weeklyPay,
          result.weeklyPaidHours.toDecimalPlaces(4).toString(),
        ],
        [
          copy.units.monthly,
          result.monthlyPay,
          result.monthlyPaidHours.toDecimalPlaces(4).toString(),
        ],
        [
          copy.units.annual,
          result.annualPay,
          result.weeklyPaidHours
            .mul(WEEKS_PER_YEAR)
            .toDecimalPlaces(4)
            .toString(),
        ],
      ] as const)
    : [];
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border bg-card shadow-sm">
      <h2 className="p-4 text-lg font-semibold">{copy.detailsTitle}</h2>
      {result ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] text-sm">
            <caption className="sr-only">{copy.detailsTitle}</caption>
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="px-4 py-3">{copy.period}</th>
                <th className="px-4 py-3 text-right">{copy.amount}</th>
                <th className="px-4 py-3 text-right">{copy.hours}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([period, amount, hours]) => (
                <tr key={period} className="border-t">
                  <th className="px-4 py-3 text-left font-medium">{period}</th>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatWon(amount)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-4 pb-4 text-sm text-muted-foreground">{copy.empty}</p>
      )}
    </section>
  );
}
