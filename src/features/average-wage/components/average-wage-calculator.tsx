"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import { calculateAverageWage, type AverageWageResult } from "../calculate";
import { averageWageContent, type AverageWageLocale } from "../content";
import { validateAverageWage, type AverageWageErrors } from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const won = (
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: AverageWageLocale,
) =>
  `${value
    .toDecimalPlaces(0)
    .toNumber()
    .toLocaleString(
      locale === "ko" ? "ko-KR" : "en-US",
    )} ${locale === "ko" ? "원" : "KRW"}`;

export function AverageWageCalculator({
  locale,
}: {
  locale: AverageWageLocale;
}) {
  const copy = averageWageContent[locale];
  const [wageTotal, setWageTotal] = useState("");
  const [calendarDays, setCalendarDays] = useState("");
  const [ordinaryDailyWage, setOrdinaryDailyWage] = useState("");
  const [errors, setErrors] = useState<AverageWageErrors>({});
  const [result, setResult] = useState<AverageWageResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateAverageWage(
      { wageTotal, calendarDays, ordinaryDailyWage },
      locale,
    );
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateAverageWage(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setWageTotal("");
    setCalendarDays("");
    setOrdinaryDailyWage("");
    setErrors({});
    setResult(null);
  }
  return (
    <section aria-labelledby="average-wage-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="average-wage-title" className="mt-1 text-xl font-semibold">
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <label className="mt-4 block text-sm font-medium">
            {copy.wageTotal}
            <input
              aria-invalid={Boolean(errors.wageTotal)}
              aria-describedby={errors.wageTotal ? "wage-error" : undefined}
              inputMode="decimal"
              value={wageTotal}
              placeholder={copy.wagePlaceholder}
              onChange={(event) =>
                setWageTotal(formatMoneyInput(event.target.value, wageTotal))
              }
              className={fieldClass}
            />
          </label>
          {errors.wageTotal ? (
            <p id="wage-error" className="mt-1 text-sm text-destructive">
              {errors.wageTotal}
            </p>
          ) : null}
          <label className="mt-4 block text-sm font-medium">
            {copy.calendarDays}
            <input
              aria-invalid={Boolean(errors.calendarDays)}
              aria-describedby={errors.calendarDays ? "days-error" : undefined}
              inputMode="numeric"
              value={calendarDays}
              placeholder={copy.daysPlaceholder}
              onChange={(event) => setCalendarDays(event.target.value)}
              className={fieldClass}
            />
          </label>
          {errors.calendarDays ? (
            <p id="days-error" className="mt-1 text-sm text-destructive">
              {errors.calendarDays}
            </p>
          ) : null}
          <label
            htmlFor="ordinary-daily-wage"
            className="mt-4 block text-sm font-medium"
          >
            {copy.ordinaryDailyWage}
            <span
              aria-hidden="true"
              className="ml-1 text-xs font-normal text-muted-foreground"
            >
              {copy.optional}
            </span>
            <input
              id="ordinary-daily-wage"
              aria-invalid={Boolean(errors.ordinaryDailyWage)}
              aria-describedby={
                errors.ordinaryDailyWage ? "ordinary-wage-error" : undefined
              }
              inputMode="decimal"
              value={ordinaryDailyWage}
              placeholder={copy.ordinaryPlaceholder}
              onChange={(event) =>
                setOrdinaryDailyWage(
                  formatMoneyInput(event.target.value, ordinaryDailyWage),
                )
              }
              className={fieldClass}
            />
          </label>
          {errors.ordinaryDailyWage ? (
            <p
              id="ordinary-wage-error"
              className="mt-1 text-sm text-destructive"
            >
              {errors.ordinaryDailyWage}
            </p>
          ) : null}
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="average-result-title"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="average-result-title" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.calculatedDaily,
                  value: (
                    <AnimatedWon
                      value={result?.calculatedDailyWage ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.appliedDaily,
                  value: result?.appliedDailyWage ? (
                    <AnimatedWon
                      value={result.appliedDailyWage}
                      animationKey={animationKey}
                    />
                  ) : (
                    copy.notCompared
                  ),
                },
                {
                  label: copy.thirtyDay,
                  value: (
                    <AnimatedWon
                      value={result?.thirtyDayWage ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
              ]}
            />
            {result ? (
              <p className="mt-3 text-sm text-muted-foreground">
                {result.ordinaryWageCompared
                  ? copy.comparedNote
                  : copy.notComparedNote}
              </p>
            ) : null}
          </section>
          <details open className="rounded-xl border bg-card p-4 shadow-sm">
            <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.details}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">{copy.total}</dt>
                  <dd className="mt-1 font-semibold tabular-nums">
                    {won(result.wageTotal, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{copy.days}</dt>
                  <dd className="mt-1 font-semibold tabular-nums">
                    {result.calendarDays.toString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{copy.formula}</dt>
                  <dd className="mt-1 font-semibold tabular-nums">
                    {won(result.calculatedDailyWage, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">
                    {copy.ordinaryDailyWage}
                  </dt>
                  <dd className="mt-1 font-semibold tabular-nums">
                    {result.ordinaryDailyWage
                      ? won(result.ordinaryDailyWage, locale)
                      : copy.notProvided}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{copy.empty}</p>
            )}
          </details>
        </div>
      </div>
    </section>
  );
}
