"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { formatMoneyInput } from "@/lib/input/money";
import { calculateAnnualLeaveAllowance } from "../calculate";
import { annualLeaveContent, type AnnualLeaveLocale } from "../content";
import { validateAnnualLeaveAllowance } from "../validation";

const errorSummaryId = "annual-leave-error-summary";

export function AnnualLeaveCalculator({
  locale,
}: {
  locale: AnnualLeaveLocale;
}) {
  const copy = annualLeaveContent[locale];
  const [completedYears, setCompletedYears] = useState("0");
  const [attendanceAtLeast80, setAttendanceAtLeast80] = useState(true);
  const [fullAttendanceMonths, setFullAttendanceMonths] = useState("0");
  const [usedDays, setUsedDays] = useState("0");
  const [hourlyWage, setHourlyWage] = useState("");
  const [dailyHours, setDailyHours] = useState("8");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReturnType<
    typeof calculateAnnualLeaveAllowance
  > | null>(null);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateAnnualLeaveAllowance(
      {
        completedYears,
        attendanceAtLeast80,
        fullAttendanceMonths,
        usedDays,
        hourlyWage: hourlyWage.replaceAll(",", ""),
        dailyHours,
      },
      locale,
    );
    setErrors(checked.errors);
    if (!checked.data) {
      setResult(null);
      return;
    }
    setResult(calculateAnnualLeaveAllowance(checked.data));
  }
  function reset() {
    setCompletedYears("0");
    setAttendanceAtLeast80(true);
    setFullAttendanceMonths("0");
    setUsedDays("0");
    setHourlyWage("");
    setDailyHours("8");
    setErrors({});
    setResult(null);
  }
  const numberField =
    "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
  const describedBy = (field: string) =>
    errors[field] ? `${field}-error ${errorSummaryId}` : undefined;
  return (
    <section aria-labelledby="annual-leave-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="annual-leave-title" className="mt-1 text-xl font-semibold">
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              id={errorSummaryId}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <label className="mt-4 block text-sm font-medium">
            {copy.completedYears}
            <span className="relative mt-1.5 block">
              <input
                id="completedYears"
                aria-label={copy.completedYears}
                aria-invalid={Boolean(errors.completedYears)}
                aria-describedby={describedBy("completedYears")}
                inputMode="numeric"
                value={completedYears}
                onChange={(e) => setCompletedYears(e.target.value)}
                className={`${numberField} pr-14`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                {copy.years}
              </span>
            </span>
            {errors.completedYears ? (
              <span id="completedYears-error" className="mt-1 block text-sm text-destructive">
                {errors.completedYears}
              </span>
            ) : null}
          </label>
          <label className="mt-4 flex min-h-11 items-center gap-3 rounded-lg border px-3 text-sm">
            <input
              type="checkbox"
              checked={attendanceAtLeast80}
              onChange={(e) => setAttendanceAtLeast80(e.target.checked)}
            />
            {copy.attendance}
          </label>
          <label className="mt-4 block text-sm font-medium">
            {copy.fullMonths}
            <span className="relative mt-1.5 block">
              <input
                id="fullAttendanceMonths"
                aria-label={copy.fullMonths}
                aria-invalid={Boolean(errors.fullAttendanceMonths)}
                aria-describedby={describedBy("fullAttendanceMonths")}
                inputMode="numeric"
                value={fullAttendanceMonths}
                onChange={(e) => setFullAttendanceMonths(e.target.value)}
                className={`${numberField} pr-14`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                {copy.months}
              </span>
            </span>
            {errors.fullAttendanceMonths ? (
              <span id="fullAttendanceMonths-error" className="mt-1 block text-sm text-destructive">
                {errors.fullAttendanceMonths}
              </span>
            ) : null}
          </label>
          <label className="mt-4 block text-sm font-medium">
            {copy.usedDays}
            <span className="relative mt-1.5 block">
              <input
                id="usedDays"
                aria-label={copy.usedDays}
                aria-invalid={Boolean(errors.usedDays)}
                aria-describedby={describedBy("usedDays")}
                inputMode="numeric"
                value={usedDays}
                onChange={(e) => setUsedDays(e.target.value)}
                className={`${numberField} pr-14`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                {copy.days}
              </span>
            </span>
            {errors.usedDays ? (
              <span id="usedDays-error" className="mt-1 block text-sm text-destructive">
                {errors.usedDays}
              </span>
            ) : null}
          </label>
          <label className="mt-4 block text-sm font-medium">
            {copy.hourlyWage}
            <span className="relative mt-1.5 block">
              <input
                id="hourlyWage"
                aria-label={copy.hourlyWage}
                aria-invalid={Boolean(errors.hourlyWage)}
                aria-describedby={describedBy("hourlyWage")}
                inputMode="decimal"
                value={hourlyWage}
                placeholder="12,000"
                onChange={(e) =>
                  setHourlyWage(formatMoneyInput(e.target.value, hourlyWage))
                }
                className={`${numberField} pr-14`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                {copy.won}
              </span>
            </span>
            {errors.hourlyWage ? (
              <span id="hourlyWage-error" className="mt-1 block text-sm text-destructive">
                {errors.hourlyWage}
              </span>
            ) : null}
          </label>
          <label className="mt-4 block text-sm font-medium">
            {copy.dailyHours}
            <span className="relative mt-1.5 block">
              <input
                id="dailyHours"
                aria-label={copy.dailyHours}
                aria-invalid={Boolean(errors.dailyHours)}
                aria-describedby={describedBy("dailyHours")}
                inputMode="decimal"
                value={dailyHours}
                onChange={(e) => setDailyHours(e.target.value)}
                className={`${numberField} pr-14`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                h
              </span>
            </span>
            {errors.dailyHours ? (
              <span id="dailyHours-error" className="mt-1 block text-sm text-destructive">
                {errors.dailyHours}
              </span>
            ) : null}
          </label>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          aria-labelledby="annual-leave-result"
          className="rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="annual-leave-result" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.allowance,
                value: (
                  <AnimatedWon
                    value={result?.estimatedAllowance ?? null}
                    animationKey={result?.remainingDays ?? 0}
                  />
                ),
                featured: true,
              },
              {
                label: copy.remaining,
                value: result ? `${result.remainingDays} ${copy.days}` : "—",
              },
              {
                label: copy.dailyWage,
                value: (
                  <AnimatedWon
                    value={result?.dailyOrdinaryWage ?? null}
                    animationKey={result?.remainingDays ?? 0}
                  />
                ),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {result ? copy.note : copy.empty}
          </p>
        </section>
      </div>
    </section>
  );
}
