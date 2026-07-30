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
  calculateRentConversionRate,
  type RentConversionRateResult,
} from "../calculate";
import {
  rentConversionRateContent,
  type RentConversionRateLocale,
} from "../content";
import {
  validateRentConversionRate,
  type RentConversionRateErrors,
  type RentConversionRateValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: RentConversionRateValues = {
  jeonseDeposit: "",
  monthlyDeposit: "",
  monthlyRent: "",
};
const errorSummaryId = "rent-conversion-rate-error-summary";

export function RentConversionRateCalculator({
  locale,
}: {
  locale: RentConversionRateLocale;
}) {
  const copy = rentConversionRateContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<RentConversionRateErrors>({});
  const [result, setResult] = useState<RentConversionRateResult>();
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateRentConversionRate(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(calculateRentConversionRate(checked.data));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(undefined);
  }

  return (
    <section aria-labelledby="rent-conversion-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="rent-conversion-input-title"
            className="mt-1 text-xl font-semibold"
          >
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
          <Field
            id="jeonseDeposit"
            label={copy.jeonseDeposit}
            value={values.jeonseDeposit}
            placeholder="300,000,000"
            error={errors.jeonseDeposit}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                jeonseDeposit: formatMoneyInput(value, current.jeonseDeposit),
              }))
            }
          />
          <Field
            id="monthlyDeposit"
            label={copy.monthlyDeposit}
            value={values.monthlyDeposit}
            placeholder="100,000,000"
            error={errors.monthlyDeposit}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                monthlyDeposit: formatMoneyInput(value, current.monthlyDeposit),
              }))
            }
          />
          <Field
            id="monthlyRent"
            label={copy.monthlyRent}
            value={values.monthlyRent}
            placeholder="1,000,000"
            error={errors.monthlyRent}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                monthlyRent: formatMoneyInput(value, current.monthlyRent),
              }))
            }
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
            aria-labelledby="rent-conversion-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="rent-conversion-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.conversionRate,
                  value: <Rate value={result?.conversionRate} />,
                  featured: true,
                },
                {
                  label: copy.annualRent,
                  value: (
                    <AnimatedWon
                      value={result?.annualRent ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.convertedDeposit,
                  value: (
                    <AnimatedWon
                      value={result?.convertedDeposit ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
          </section>
          <details open className="rounded-xl border bg-card p-4 shadow-sm">
            <summary className="min-h-10 cursor-pointer content-center font-semibold">
              {copy.details}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Detail
                  label={copy.conversionRate}
                  value={`${result.conversionRate.toDecimalPlaces(3).toString()}%`}
                />
                <Detail
                  label={copy.monthlyConversionRate}
                  value={`${result.monthlyConversionRate.toDecimalPlaces(4).toString()}%`}
                />
                <Detail
                  label={copy.annualRent}
                  value={won(result.annualRent, locale)}
                />
                <Detail
                  label={copy.convertedDeposit}
                  value={won(result.convertedDeposit, locale)}
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

function Rate({
  value,
}: {
  value?: { toDecimalPlaces: (places: number) => { toString: () => string } };
}) {
  return (
    <span className="tabular-nums">
      {value ? `${value.toDecimalPlaces(3).toString()}%` : "—"}
    </span>
  );
}

function Field({
  id,
  label,
  value,
  placeholder,
  error,
  errorSummaryId,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  errorSummaryId: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error ${errorSummaryId}` : undefined
          }
          className={`${fieldClass} pr-12`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {localeWon(label)}
        </span>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function localeWon(label: string) {
  return /[가-힣]/.test(label) ? "원" : "KRW";
}

function won(
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: RentConversionRateLocale,
) {
  return `${value
    .toDecimalPlaces(0)
    .toNumber()
    .toLocaleString(
      locale === "ko" ? "ko-KR" : "en-US",
    )} ${locale === "ko" ? "원" : "KRW"}`;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
