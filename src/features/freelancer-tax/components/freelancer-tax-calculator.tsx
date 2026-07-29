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
import { calculateFreelancerTax } from "../calculate";
import { freelancerTaxContent, type FreelancerTaxLocale } from "../content";
import {
  validateFreelancerTax,
  type FreelancerTaxErrors,
  type FreelancerTaxValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: FreelancerTaxValues = {
  grossPayment: "",
  expenseAmount: "",
};
const errorSummaryId = "freelancer-tax-error-summary";

export function FreelancerTaxCalculator({
  locale,
}: {
  locale: FreelancerTaxLocale;
}) {
  const copy = freelancerTaxContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FreelancerTaxErrors>({});
  const [result, setResult] = useState<ReturnType<
    typeof calculateFreelancerTax
  > | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateFreelancerTax(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateFreelancerTax(checked.data));
    setAnimationKey((value) => value + 1);
  }
  return (
    <section aria-labelledby="freelancer-tax-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="freelancer-tax-input-title"
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
          {(["grossPayment", "expenseAmount"] as const).map((key) => (
            <label
              key={key}
              htmlFor={key}
              className="mt-4 block text-sm font-medium"
            >
              {copy[key]}
              <input
                id={key}
                name={key}
                inputMode="decimal"
                value={values[key]}
                placeholder={key === "grossPayment" ? "1,000,000" : "0"}
                aria-invalid={Boolean(errors[key])}
                aria-describedby={
                  errors[key] ? `${key}-error ${errorSummaryId}` : undefined
                }
                className={fieldClass}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [key]: formatMoneyInput(event.target.value, current[key]),
                  }))
                }
              />
              {errors[key] ? (
                <span
                  id={`${key}-error`}
                  className="mt-1 block text-xs text-destructive"
                >
                  {errors[key]}
                </span>
              ) : null}
            </label>
          ))}
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                cancelResultScroll();
                setValues(initialValues);
                setErrors({});
                setResult(null);
              }}
            >
              {copy.reset}
            </Button>
          </div>
        </form>
        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="freelancer-tax-result"
            className="scroll-mt-20 rounded-xl border bg-card p-5 sm:p-6"
          >
            <h2 id="freelancer-tax-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            {result ? (
              <>
                <PrimaryResults
                  metrics={[
                    {
                      label: copy.total,
                      value: (
                        <AnimatedWon
                          value={result.totalWithholding}
                          animationKey={animationKey}
                        />
                      ),
                      featured: true,
                    },
                    {
                      label: copy.net,
                      value: (
                        <AnimatedWon
                          value={result.netPayment}
                          animationKey={animationKey}
                        />
                      ),
                    },
                    {
                      label: copy.taxable,
                      value: (
                        <AnimatedWon
                          value={result.taxablePayment}
                          animationKey={animationKey}
                        />
                      ),
                    },
                  ]}
                />
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                  <Detail
                    label={copy.national}
                    value={won(result.nationalIncomeTax, locale)}
                  />
                  <Detail
                    label={copy.local}
                    value={won(result.localIncomeTax, locale)}
                  />
                  <Detail
                    label={copy.effective}
                    value={`${result.effectiveTaxRate.toDecimalPlaces(2).toString()}%`}
                  />
                </dl>
                <p className="mt-4 text-xs leading-6 text-muted-foreground">
                  {copy.note}
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">{copy.empty}</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function won(
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: FreelancerTaxLocale,
) {
  return `${value
    .toDecimalPlaces(0)
    .toNumber()
    .toLocaleString(
      locale === "ko" ? "ko-KR" : "en-US",
    )} ${locale === "ko" ? "원" : "KRW"}`;
}
