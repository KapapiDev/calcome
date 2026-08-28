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
  calculateCryptoAverageCost,
  type CryptoAverageCostResult,
} from "../calculate";
import {
  cryptoAverageCostContent,
  type CryptoAverageCostLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: CryptoAverageCostLocale) {
  return locale === "ko"
    ? { currentQuantity: "2", currentAveragePrice: "50,000,000", additionalQuantity: "1", additionalPrice: "35,000,000" }
    : { currentQuantity: "2", currentAveragePrice: "50,000", additionalQuantity: "1", additionalPrice: "35,000" };
}

export function CryptoAverageCostCalculator({ locale }: { locale: CryptoAverageCostLocale }) {
  const copy = cryptoAverageCostContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<CryptoAverageCostResult>();
  const { currency } = useDisplayCurrency(locale);
  const { resultRef, noteNumericInputFocus, requestResultScroll, cancelResultScroll } = useStableResultScroll(result ?? null);
  const parseMoney = (value: string) => Number(value.replaceAll(",", ""));
  const money = (value?: number) => value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const number = (value?: number) => value === undefined ? "—" : new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", { maximumFractionDigits: 8 }).format(value);
  const percent = (value?: number) => value === undefined ? "—" : `${value.toFixed(2)}%`;

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateCryptoAverageCost({
        currentQuantity: Number(values.currentQuantity),
        currentAveragePrice: parseMoney(values.currentAveragePrice),
        additionalQuantity: Number(values.additionalQuantity),
        additionalPrice: parseMoney(values.additionalPrice),
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

  const moneyField = (id: "currentAveragePrice" | "additionalPrice", label: string) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      <input id={id} inputMode="decimal" value={values[id]} onChange={(event) => setValues((current) => ({ ...current, [id]: formatMoneyInput(event.target.value, current[id]) }))} aria-invalid={hasError} className={fieldClass} />
    </div>
  );

  return (
    <section aria-labelledby="crypto-average-cost-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form onSubmit={submit} onFocusCapture={noteNumericInputFocus} noValidate className={`${compactCalculatorSettingsClass} min-w-0`}>
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="crypto-average-cost-input-title" className="mt-1 text-xl font-semibold">{copy.input}</h2>
          {hasError ? <p role="alert" className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{copy.error}</p> : null}
          <CurrencySelector locale={locale} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div><label htmlFor="currentQuantity" className="block text-sm font-medium">{copy.currentQuantity}</label><input id="currentQuantity" inputMode="decimal" value={values.currentQuantity} onChange={(event) => setValues((current) => ({ ...current, currentQuantity: event.target.value }))} aria-invalid={hasError} className={fieldClass} /></div>
            {moneyField("currentAveragePrice", copy.currentAveragePrice)}
            <div><label htmlFor="additionalQuantity" className="block text-sm font-medium">{copy.additionalQuantity}</label><input id="additionalQuantity" inputMode="decimal" value={values.additionalQuantity} onChange={(event) => setValues((current) => ({ ...current, additionalQuantity: event.target.value }))} aria-invalid={hasError} className={fieldClass} /></div>
            {moneyField("additionalPrice", copy.additionalPrice)}
          </div>
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2"><Button type="submit">{copy.calculate}</Button><Button type="button" variant="outline" onClick={reset}>{copy.reset}</Button></div>
        </form>
        <section ref={resultRef} aria-labelledby="crypto-average-cost-result-title" className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm">
          <h2 id="crypto-average-cost-result-title" className="text-xl font-semibold">{copy.result}</h2>
          <PrimaryResults metrics={[
            { label: copy.newAveragePrice, value: money(result?.newAveragePrice), featured: true },
            { label: copy.totalCost, value: money(result?.totalCost), featured: true },
            { label: copy.totalQuantity, value: number(result?.totalQuantity) },
            { label: copy.additionalCost, value: money(result?.additionalCost) },
            { label: copy.averagePriceChangePercent, value: percent(result?.averagePriceChangePercent) },
          ]} />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
