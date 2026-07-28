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
  calculateAcquisitionTax,
  type AcquisitionTaxResult,
} from "../calculate";
import { acquisitionTaxContent, type AcquisitionTaxLocale } from "../content";
import {
  validateAcquisitionTax,
  type AcquisitionTaxErrors,
  type AcquisitionTaxValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: AcquisitionTaxValues = {
  acquisitionPrice: "",
  acquisitionTaxRate: "",
  localEducationTaxRate: "",
  ruralSpecialTaxRate: "",
  otherCosts: "",
};
const errorSummaryId = "real-estate-acquisition-tax-error-summary";

export function AcquisitionTaxCalculator({
  locale,
}: {
  locale: AcquisitionTaxLocale;
}) {
  const copy = acquisitionTaxContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<AcquisitionTaxErrors>({});
  const [result, setResult] = useState<AcquisitionTaxResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  const setMoney = (key: "acquisitionPrice" | "otherCosts", value: string) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  const setRate = (
    key: "acquisitionTaxRate" | "localEducationTaxRate" | "ruralSpecialTaxRate",
    value: string,
  ) => setValues((current) => ({ ...current, [key]: value }));

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateAcquisitionTax(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateAcquisitionTax(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }

  return (
    <section aria-labelledby="acquisition-tax-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="acquisition-tax-input-title"
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
            id="acquisitionPrice"
            label={copy.acquisitionPrice}
            value={values.acquisitionPrice}
            placeholder="500,000,000"
            error={errors.acquisitionPrice}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setMoney("acquisitionPrice", value)}
          />
          <Field
            id="acquisitionTaxRate"
            label={copy.acquisitionTaxRate}
            value={values.acquisitionTaxRate}
            placeholder="1"
            suffix="%"
            error={errors.acquisitionTaxRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setRate("acquisitionTaxRate", value)}
          />
          <Field
            id="localEducationTaxRate"
            label={copy.localEducationTaxRate}
            value={values.localEducationTaxRate}
            placeholder="0.1"
            suffix="%"
            error={errors.localEducationTaxRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setRate("localEducationTaxRate", value)}
          />
          <Field
            id="ruralSpecialTaxRate"
            label={copy.ruralSpecialTaxRate}
            value={values.ruralSpecialTaxRate}
            placeholder="0"
            suffix="%"
            error={errors.ruralSpecialTaxRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setRate("ruralSpecialTaxRate", value)}
          />
          <Field
            id="otherCosts"
            label={copy.otherCosts}
            value={values.otherCosts}
            placeholder="2,000,000"
            error={errors.otherCosts}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setMoney("otherCosts", value)}
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
            aria-labelledby="acquisition-tax-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="acquisition-tax-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.totalTax,
                  value: (
                    <AnimatedWon
                      value={result?.totalTax ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.totalCost,
                  value: (
                    <AnimatedWon
                      value={result?.totalAcquisitionCost ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.effectiveRate,
                  value: result
                    ? `${result.effectiveTaxRate.toDecimalPlaces(2).toString()}%`
                    : "—",
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
                  label={copy.acquisitionTax}
                  value={won(result.acquisitionTax, locale)}
                />
                <Detail
                  label={copy.localEducationTax}
                  value={won(result.localEducationTax, locale)}
                />
                <Detail
                  label={copy.ruralSpecialTax}
                  value={won(result.ruralSpecialTax, locale)}
                />
                <Detail
                  label={copy.enteredOtherCosts}
                  value={won(result.otherCosts, locale)}
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
  id,
  label,
  value,
  placeholder,
  suffix,
  error,
  errorSummaryId,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  suffix?: string;
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
          aria-describedby={error ? `${id}-error ${errorSummaryId}` : undefined}
          className={`${fieldClass} ${suffix ? "pr-14" : ""}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
function won(
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: AcquisitionTaxLocale,
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
