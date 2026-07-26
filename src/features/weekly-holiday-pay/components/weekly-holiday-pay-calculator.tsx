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
import {
  calculateWeeklyHolidayPay,
  type WeeklyHolidayPayResult,
} from "../calculate";
import {
  weeklyHolidayPayContent,
  type WeeklyHolidayPayLocale,
} from "../content";
import { validateWeeklyHolidayPayInput } from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorId = "weekly-pay-error";

export function WeeklyHolidayPayCalculator({
  locale,
}: {
  locale: WeeklyHolidayPayLocale;
}) {
  const copy = weeklyHolidayPayContent[locale];
  const [wage, setWage] = useState("");
  const [hours, setHours] = useState("");
  const [attendance, setAttendance] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WeeklyHolidayPayResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(event: FormEvent) {
    event.preventDefault();
    const validated = validateWeeklyHolidayPayInput({
      hourlyWage: wage,
      weeklyHours: hours,
    });
    if (!validated) {
      cancelResultScroll();
      setResult(null);
      setError(
        locale === "ko"
          ? "시급과 1~40시간의 주 소정근로시간을 입력하세요."
          : "Enter a positive wage and 1–40 scheduled weekly hours.",
      );
      return;
    }
    setError("");
    requestResultScroll();
    setResult(
      calculateWeeklyHolidayPay({
        ...validated,
        completedScheduledDays: attendance,
      }),
    );
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setWage("");
    setHours("");
    setAttendance(true);
    setError("");
    setResult(null);
  }
  return (
    <section aria-labelledby="weekly-pay-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="weekly-pay-title" className="mt-1 text-xl font-semibold">
            {copy.input}
          </h2>
          {error ? (
            <p
              id={errorId}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
          <label className="mt-4 block text-sm font-medium">
            {copy.hourlyWage}
            <input
              inputMode="numeric"
              value={wage}
              placeholder={locale === "ko" ? "예: 12,000" : "e.g. 12,000"}
              onChange={(e) => setWage(formatMoneyInput(e.target.value, wage))}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={fieldClass}
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            {copy.weeklyHours}
            <input
              inputMode="decimal"
              value={hours}
              placeholder={locale === "ko" ? "예: 40" : "e.g. 40"}
              onChange={(e) => setHours(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={fieldClass}
            />
          </label>
          <label className="mt-4 flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm">
            <input
              type="checkbox"
              checked={attendance}
              onChange={(e) => setAttendance(e.target.checked)}
            />
            {copy.attendance}
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
          aria-labelledby="weekly-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="weekly-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.holidayPay,
                value: (
                  <AnimatedWon
                    value={result?.weeklyHolidayPay ?? null}
                    animationKey={animationKey}
                  />
                ),
                featured: true,
              },
              {
                label: copy.totalPay,
                value: (
                  <AnimatedWon
                    value={result?.weeklyTotalPay ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
              {
                label: copy.monthlyPay,
                value: (
                  <AnimatedWon
                    value={result?.estimatedMonthlyHolidayPay ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {result
              ? result.eligible
                ? copy.eligible
                : copy.ineligible
              : copy.description}
          </p>
        </section>
      </div>
    </section>
  );
}
