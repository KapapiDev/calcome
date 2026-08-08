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
  calculateOvertimePay,
  type OvertimePayResult,
  type WorkplaceSize,
} from "../calculate";
import { overtimePayContent, type OvertimePayLocale } from "../content";
import { validateOvertimePay, type OvertimePayErrors } from "../validation";
const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
export function OvertimePayCalculator({
  locale,
}: {
  locale: OvertimePayLocale;
}) {
  const copy = overtimePayContent[locale];
  const [wage, setWage] = useState(""),
    [hours, setHours] = useState(""),
    [rate, setRate] = useState("50");
  const [workplaceSize, setWorkplaceSize] =
    useState<WorkplaceSize>("fiveOrMore");
  const [errors, setErrors] = useState<OvertimePayErrors>({});
  const [result, setResult] = useState<OvertimePayResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(e: FormEvent) {
    e.preventDefault();
    const checked = validateOvertimePay(
      {
        hourlyWage: wage,
        overtimeHours: hours,
        premiumRate: rate,
        workplaceSize,
      },
      locale,
    );
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateOvertimePay(checked.data));
    setAnimationKey((v) => v + 1);
  }
  function reset() {
    cancelResultScroll();
    setWage("");
    setHours("");
    setRate("50");
    setWorkplaceSize("fiveOrMore");
    setErrors({});
    setResult(null);
  }
  return (
    <section aria-labelledby="overtime-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="overtime-title" className="mt-1 text-xl font-semibold">
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              id="overtime-form-error"
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <Field
            label={copy.hourlyWage}
            value={wage}
            placeholder={copy.wagePlaceholder}
            error={errors.hourlyWage}
            onChange={(v) => setWage(formatMoneyInput(v, wage))}
          />
          <Field
            label={copy.hours}
            value={hours}
            placeholder={copy.hoursPlaceholder}
            error={errors.overtimeHours}
            onChange={setHours}
          />
          <fieldset className="mt-4">
            <legend className="text-sm font-medium">
              {copy.workplaceSize}
            </legend>
            <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
              {(["fiveOrMore", "underFive"] as const).map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 rounded-lg border p-3 text-sm"
                >
                  <input
                    type="radio"
                    name="workplaceSize"
                    checked={workplaceSize === option}
                    onChange={() => {
                      setWorkplaceSize(option);
                      setRate(option === "fiveOrMore" ? "50" : "0");
                    }}
                  />
                  {copy[option]}
                </label>
              ))}
            </div>
          </fieldset>
          <Field
            label={copy.premium}
            value={rate}
            placeholder={copy.premiumPlaceholder}
            error={errors.premiumRate}
            onChange={setRate}
          />
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
            aria-labelledby="overtime-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="overtime-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.total,
                  value: (
                    <AnimatedWon
                      value={result?.totalPay ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.base,
                  value: (
                    <AnimatedWon
                      value={result?.basePay ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.extra,
                  value: (
                    <AnimatedWon
                      value={result?.premiumPay ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
            {result?.workplaceSize === "underFive" ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {copy.underFiveNotice}
              </p>
            ) : null}
          </section>
          <details open className="rounded-xl border bg-card p-4 shadow-sm">
            <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.details}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <Detail
                  label={copy.workplaceSize}
                  value={copy[result.workplaceSize]}
                />
                <Detail
                  label={copy.effective}
                  value={`${result.effectiveHourlyPay.toDecimalPlaces(0).toNumber().toLocaleString()} ${locale === "ko" ? "원" : "KRW"}`}
                />
                <Detail
                  label={copy.appliedHours}
                  value={result.overtimeHours.toString()}
                />
                <Detail
                  label={copy.appliedRate}
                  value={`${result.premiumRate.toString()}%`}
                />
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
function Field({
  label,
  value,
  placeholder,
  error,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = label.replaceAll(" ", "-");
  const errorId = `${id}-error`;
  return (
    <div className="mt-4">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${errorId} overtime-form-error` : undefined}
        className={fieldClass}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
