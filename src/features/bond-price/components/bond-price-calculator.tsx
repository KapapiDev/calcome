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
import { calculateBondPrice, type BondPriceResult } from "../calculate";
import { bondPriceContent, type BondPriceLocale } from "../content";

const fieldClass =
  "h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  faceValue: "1,000",
  couponRate: "5",
  marketYield: "6",
  years: "5",
  frequency: "2",
};

export function BondPriceCalculator({ locale }: { locale: BondPriceLocale }) {
  const copy = bondPriceContent[locale];
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<BondPriceResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function parse(value: string) {
    const number = Number(value.replaceAll(",", "").trim());
    return Number.isFinite(number) ? number : null;
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const faceValue = parse(values.faceValue);
    const couponRate = parse(values.couponRate);
    const marketYield = parse(values.marketYield);
    const years = parse(values.years);
    const frequency = Number(values.frequency) as 1 | 2 | 4 | 12;
    const invalid =
      faceValue === null ||
      faceValue <= 0 ||
      couponRate === null ||
      couponRate < 0 ||
      couponRate > 100 ||
      marketYield === null ||
      marketYield < 0 ||
      marketYield > 100 ||
      years === null ||
      years <= 0 ||
      years > 100 ||
      ![1, 2, 4, 12].includes(frequency) ||
      Math.abs(years * frequency - Math.round(years * frequency)) > 1e-9;

    setError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculateBondPrice({
        faceValue,
        annualCouponRatePercent: couponRate,
        annualMarketYieldPercent: marketYield,
        yearsToMaturity: years,
        paymentsPerYear: frequency,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setError(false);
    setResult(undefined);
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);

  return (
    <section aria-labelledby="bond-price-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="bond-price-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium">
              {copy.faceValue}
              <input
                inputMode="decimal"
                value={values.faceValue}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    faceValue: formatMoneyInput(
                      event.target.value,
                      current.faceValue,
                    ),
                  }))
                }
                className={`${fieldClass} mt-1.5`}
              />
            </label>
            <label className="text-sm font-medium">
              {copy.couponRate}
              <div className="relative mt-1.5">
                <input
                  inputMode="decimal"
                  value={values.couponRate}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      couponRate: event.target.value,
                    }))
                  }
                  className={`${fieldClass} pr-10`}
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </label>
            <label className="text-sm font-medium">
              {copy.marketYield}
              <div className="relative mt-1.5">
                <input
                  inputMode="decimal"
                  value={values.marketYield}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      marketYield: event.target.value,
                    }))
                  }
                  className={`${fieldClass} pr-10`}
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </label>
            <label className="text-sm font-medium">
              {copy.years}
              <input
                inputMode="decimal"
                value={values.years}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    years: event.target.value,
                  }))
                }
                className={`${fieldClass} mt-1.5`}
              />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              {copy.frequency}
              <select
                value={values.frequency}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    frequency: event.target.value,
                  }))
                }
                className={`${fieldClass} mt-1.5`}
              >
                <option value="1">{copy.annual}</option>
                <option value="2">{copy.semiannual}</option>
                <option value="4">{copy.quarterly}</option>
                <option value="12">{copy.monthly}</option>
              </select>
            </label>
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
          aria-labelledby="bond-price-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="bond-price-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.price,
                value: money(result?.bondPrice),
                featured: true,
              },
              {
                label: copy.premiumDiscount,
                value: result
                  ? `${money(result.premiumDiscountAmount)} (${result.premiumDiscountPercent.toFixed(2)}%)`
                  : "—",
              },
              {
                label: copy.couponPv,
                value: money(result?.presentValueCoupons),
              },
              {
                label: copy.redemptionPv,
                value: money(result?.presentValueRedemption),
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {copy.note}
          </p>
        </section>
      </div>
    </section>
  );
}
