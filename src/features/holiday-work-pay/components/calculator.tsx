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
  calculateHolidayWorkPay,
  type HolidayWorkResult,
  type WorkplaceSize,
} from "../calculate";
import { content, type Locale } from "../content";
import { validateHolidayWorkPay, type Errors } from "../validation";

const inputClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums";
const errorSummaryId = "holiday-work-pay-error-summary";

export function HolidayWorkPayCalculator({ locale }: { locale: Locale }) {
  const c = content[locale];
  const [hourlyWage, setHourlyWage] = useState("");
  const [holidayHours, setHolidayHours] = useState("");
  const [workplaceSize, setWorkplaceSize] =
    useState<WorkplaceSize>("fiveOrMore");
  const [contractualPremiumRate, setContractualPremiumRate] = useState("0");
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<HolidayWorkResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const validation = validateHolidayWorkPay(
      { hourlyWage, holidayHours, workplaceSize, contractualPremiumRate },
      locale,
    );
    setErrors(validation.errors);
    if (!validation.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateHolidayWorkPay(validation.data));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setHourlyWage("");
    setHolidayHours("");
    setWorkplaceSize("fiveOrMore");
    setContractualPremiumRate("0");
    setErrors({});
    setResult(null);
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <section aria-labelledby="holiday-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={compactCalculatorSettingsClass}
        >
          <h2 id="holiday-input-title" className="text-xl font-semibold">
            {c.input}
          </h2>
          {hasErrors ? (
            <p
              id={errorSummaryId}
              role="alert"
              className="mt-3 text-sm text-destructive"
            >
              {c.error}
            </p>
          ) : null}
          <Field
            id="holiday-work-pay-hourly-wage"
            label={c.wage}
            value={hourlyWage}
            error={errors.hourlyWage}
            summaryErrorId={hasErrors ? errorSummaryId : undefined}
            change={(value) =>
              setHourlyWage(formatMoneyInput(value, hourlyWage))
            }
          />
          <Field
            id="holiday-work-pay-hours"
            label={c.hours}
            value={holidayHours}
            error={errors.holidayHours}
            summaryErrorId={hasErrors ? errorSummaryId : undefined}
            change={setHolidayHours}
          />
          <fieldset className="mt-4">
            <legend className="text-sm font-medium">{c.workplaceSize}</legend>
            <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
              {(["fiveOrMore", "underFive"] as const).map((size) => (
                <label
                  key={size}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm"
                >
                  <input
                    type="radio"
                    name="workplace-size"
                    checked={workplaceSize === size}
                    onChange={() => {
                      setWorkplaceSize(size);
                      setContractualPremiumRate("0");
                    }}
                  />
                  {c[size]}
                </label>
              ))}
            </div>
            {errors.workplaceSize ? (
              <span className="mt-1 block text-sm text-destructive">
                {errors.workplaceSize}
              </span>
            ) : null}
          </fieldset>
          {workplaceSize === "underFive" ? (
            <Field
              id="holiday-work-pay-contractual-rate"
              label={c.contractualRate}
              value={contractualPremiumRate}
              error={errors.contractualPremiumRate}
              summaryErrorId={hasErrors ? errorSummaryId : undefined}
              change={setContractualPremiumRate}
            />
          ) : null}
          <div className="mt-4 flex gap-2">
            <Button type="submit">{c.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {c.reset}
            </Button>
          </div>
        </form>
        <section ref={resultRef} className="rounded-xl border bg-card p-4">
          <PrimaryResults
            metrics={[
              {
                label: c.total,
                value: (
                  <AnimatedWon
                    value={result?.totalPay ?? null}
                    animationKey={animationKey}
                  />
                ),
                featured: true,
              },
              {
                label: c.base,
                value: (
                  <AnimatedWon
                    value={result?.basePay ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
              {
                label: c.premium,
                value: (
                  <AnimatedWon
                    value={result?.premiumPay ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
          {result ? (
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <p>{c.monthlySalaryNotice}</p>
              <p>{c.overlapNotice}</p>
              {result.workplaceSize === "underFive" ? (
                <p>{c.underFiveNotice}</p>
              ) : null}
            </div>
          ) : null}
          <details open className="mt-4">
            <summary className="font-semibold">{c.details}</summary>
            {result ? (
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <Detail
                  label={c.workplaceSize}
                  value={c[result.workplaceSize]}
                />
                <Detail label={c.hours} value={`${result.holidayHours}h`} />
                <Detail
                  label={c.withinHours}
                  value={`${result.withinEightHours}h`}
                />
                <Detail
                  label={c.overHours}
                  value={`${result.overEightHours}h`}
                />
                <Detail
                  label={
                    result.workplaceSize === "fiveOrMore"
                      ? c.withinPremium
                      : c.contractualPremium
                  }
                  value={result.withinEightPremium.toString()}
                />
                <Detail
                  label={c.overPremium}
                  value={result.overEightPremium.toString()}
                />
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{c.empty}</p>
            )}
          </details>
        </section>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  summaryErrorId,
  change,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  summaryErrorId?: string;
  change: (value: string) => void;
}) {
  const fieldErrorId = `${id}-error`;
  const describedBy = [error ? fieldErrorId : undefined, summaryErrorId]
    .filter(Boolean)
    .join(" ");

  return (
    <label className="mt-4 block text-sm font-medium" htmlFor={id}>
      {label}
      <input
        id={id}
        className={inputClass}
        value={value}
        inputMode="decimal"
        onChange={(event) => change(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
      />
      {error ? (
        <span
          id={fieldErrorId}
          className="mt-1 block text-sm text-destructive"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
