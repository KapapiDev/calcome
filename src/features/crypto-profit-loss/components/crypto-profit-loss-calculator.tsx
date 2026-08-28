"use client";

import { type FormEvent, useMemo, useState } from "react";
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
  calculateCryptoProfitLoss,
  type CryptoProfitLossResult,
} from "../calculate";
import {
  cryptoProfitLossContent,
  type CryptoProfitLossLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: CryptoProfitLossLocale) {
  return locale === "ko"
    ? {
        quantity: "2",
        averageEntryPrice: "50,000,000",
        currentPrice: "60,000,000",
        buyFeePercent: "0.05",
        sellFeePercent: "0.05",
      }
    : {
        quantity: "2",
        averageEntryPrice: "50,000",
        currentPrice: "60,000",
        buyFeePercent: "0.1",
        sellFeePercent: "0.2",
      };
}

export function CryptoProfitLossCalculator({
  locale,
}: {
  locale: CryptoProfitLossLocale;
}) {
  const copy = cryptoProfitLossContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<CryptoProfitLossResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);
  const parseMoney = (value: string) => Number(value.replaceAll(",", ""));
  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const percent = (value?: number) =>
    value === undefined ? "—" : `${value.toFixed(2)}%`;

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateCryptoProfitLoss({
        quantity: Number(values.quantity),
        averageEntryPrice: parseMoney(values.averageEntryPrice),
        currentPrice: parseMoney(values.currentPrice),
        buyFeePercent: Number(values.buyFeePercent),
        sellFeePercent: Number(values.sellFeePercent),
      });
      setHasError(false);
      requestResultScroll();
      setResult(next);
    } catch {
      setHasError(true);
      setResult(undefined);
    }
  }

  function reset() {
    cancelResultScroll();
    setValues(defaults);
    setHasError(false);
    setResult(undefined);
  }

  const moneyField = (
    id: "averageEntryPrice" | "currentPrice",
    label: string,
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={values[id]}
        onChange={(event) =>
          setValues((current) => ({
            ...current,
            [id]: formatMoneyInput(event.target.value, current[id]),
          }))
        }
        aria-invalid={hasError}
        className={fieldClass}
      />
    </div>
  );

  return (
    <section aria-labelledby="crypto-profit-loss-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="crypto-profit-loss-input-title"
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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium">
                {copy.quantity}
              </label>
              <input
                id="quantity"
                inputMode="decimal"
                value={values.quantity}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    quantity: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
            </div>
            {moneyField("averageEntryPrice", copy.averageEntryPrice)}
            {moneyField("currentPrice", copy.currentPrice)}
            <div>
              <label
                htmlFor="buyFeePercent"
                className="block text-sm font-medium"
              >
                {copy.buyFeePercent}
              </label>
              <input
                id="buyFeePercent"
                inputMode="decimal"
                value={values.buyFeePercent}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    buyFeePercent: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
            </div>
            <div>
              <label
                htmlFor="sellFeePercent"
                className="block text-sm font-medium"
              >
                {copy.sellFeePercent}
              </label>
              <input
                id="sellFeePercent"
                inputMode="decimal"
                value={values.sellFeePercent}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    sellFeePercent: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="crypto-profit-loss-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="crypto-profit-loss-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.profitLoss,
                value: money(result?.profitLoss),
                featured: true,
              },
              {
                label: copy.returnPercent,
                value: percent(result?.returnPercent),
                featured: true,
              },
              {
                label: copy.netCurrentValue,
                value: money(result?.netCurrentValue),
              },
              {
                label: copy.totalCostBasis,
                value: money(result?.totalCostBasis),
              },
              {
                label: copy.breakEvenPrice,
                value: money(result?.breakEvenPrice),
              },
              {
                label: copy.estimatedSellFee,
                value: money(result?.estimatedSellFee),
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
