"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import {
  CurrencySelector,
  formatDisplayCurrency,
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateTotalCompensationComparison,
  type TotalCompensationComparisonResult,
} from "../calculate";
import {
  totalCompensationComparisonContent,
  type TotalCompensationComparisonLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

type OfferKey =
  | "baseSalary"
  | "annualBonus"
  | "annualEquity"
  | "annualBenefits"
  | "signOnBonus";

type Values = Record<"offerA" | "offerB", Record<OfferKey, string>> & {
  horizonYears: string;
};

const initialValues: Values = {
  offerA: {
    baseSalary: "100,000",
    annualBonus: "10,000",
    annualEquity: "15,000",
    annualBenefits: "5,000",
    signOnBonus: "20,000",
  },
  offerB: {
    baseSalary: "110,000",
    annualBonus: "5,000",
    annualEquity: "10,000",
    annualBenefits: "4,000",
    signOnBonus: "5,000",
  },
  horizonYears: "3",
};

function parseAmount(value: string) {
  const parsed = Number(value.replaceAll(",", "").trim());
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function TotalCompensationComparisonCalculator({
  locale,
}: {
  locale: TotalCompensationComparisonLocale;
}) {
  const copy = totalCompensationComparisonContent[locale];
  const [values, setValues] = useState<Values>(initialValues);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<TotalCompensationComparisonResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const horizonYears = Number(values.horizonYears);
    const toOffer = (offer: Values["offerA"]) => ({
      baseSalary: parseAmount(offer.baseSalary),
      annualBonus: parseAmount(offer.annualBonus),
      annualEquity: parseAmount(offer.annualEquity),
      annualBenefits: parseAmount(offer.annualBenefits),
      signOnBonus: parseAmount(offer.signOnBonus),
    });
    const offerA = toOffer(values.offerA);
    const offerB = toOffer(values.offerB);
    const invalid =
      Object.values(offerA).some((value) => value === null) ||
      Object.values(offerB).some((value) => value === null) ||
      !Number.isFinite(horizonYears) ||
      horizonYears < 1 ||
      horizonYears > 10;

    setHasError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculateTotalCompensationComparison({
        offerA: offerA as Record<OfferKey, number>,
        offerB: offerB as Record<OfferKey, number>,
        horizonYears,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setHasError(false);
    setResult(undefined);
  }

  function updateOffer(
    offer: "offerA" | "offerB",
    key: OfferKey,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [offer]: {
        ...current[offer],
        [key]: formatMoneyInput(value, current[offer][key]),
      },
    }));
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const winner = result
    ? result.higherOffer === "tie"
      ? copy.tie
      : result.higherOffer === "A"
        ? copy.offerA
        : copy.offerB
    : "—";

  return (
    <section aria-labelledby="total-compensation-comparison-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="total-compensation-comparison-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {hasError ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          <OfferFields
            title={copy.offerA}
            offer="offerA"
            values={values.offerA}
            currency={currency}
            copy={copy}
            onChange={updateOffer}
          />
          <OfferFields
            title={copy.offerB}
            offer="offerB"
            values={values.offerB}
            currency={currency}
            copy={copy}
            onChange={updateOffer}
          />
          <div className="mt-4">
            <label htmlFor="horizonYears" className="block text-sm font-medium">
              {copy.horizonYears}
            </label>
            <div className="relative">
              <input
                id="horizonYears"
                inputMode="decimal"
                value={values.horizonYears}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    horizonYears: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                {locale === "ko" ? "년" : "years"}
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="total-compensation-comparison-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="total-compensation-comparison-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.higherOffer,
                value: winner,
                featured: true,
              },
              {
                label: `${copy.offerA} · ${copy.horizonTotal}`,
                value: money(result?.offerA.horizonTotalCompensation),
              },
              {
                label: `${copy.offerB} · ${copy.horizonTotal}`,
                value: money(result?.offerB.horizonTotalCompensation),
              },
              {
                label: copy.difference,
                value: money(result?.absoluteDifference),
              },
              {
                label: `${copy.offerA} · ${copy.averageAnnual}`,
                value: money(result?.offerA.averageAnnualCompensation),
              },
              {
                label: `${copy.offerB} · ${copy.averageAnnual}`,
                value: money(result?.offerB.averageAnnualCompensation),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}

type OfferFieldsProps = {
  title: string;
  offer: "offerA" | "offerB";
  values: Record<OfferKey, string>;
  currency: string;
  copy: Record<string, string>;
  onChange: (offer: "offerA" | "offerB", key: OfferKey, value: string) => void;
};

function OfferFields({
  title,
  offer,
  values,
  currency,
  copy,
  onChange,
}: OfferFieldsProps) {
  const fields: Array<[OfferKey, string]> = [
    ["baseSalary", copy.baseSalary],
    ["annualBonus", copy.annualBonus],
    ["annualEquity", copy.annualEquity],
    ["annualBenefits", copy.annualBenefits],
    ["signOnBonus", copy.signOnBonus],
  ];

  return (
    <fieldset className="mt-5 rounded-lg border p-3">
      <legend className="px-1 text-sm font-semibold">{title}</legend>
      {fields.map(([key, label]) => {
        const id = `${offer}-${key}`;
        return (
          <div key={key} className="mt-3 first:mt-1">
            <label htmlFor={id} className="block text-sm font-medium">
              {label}
            </label>
            <div className="relative">
              <input
                id={id}
                inputMode="decimal"
                value={values[key]}
                onChange={(event) => onChange(offer, key, event.target.value)}
                className={fieldClass}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                {currency}
              </span>
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}
