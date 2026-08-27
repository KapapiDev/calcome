"use client";

import { type FormEvent, useState } from "react";
import { PrimaryResults, compactCalculatorSettingsClass, dashboardCalculatorWorkspaceClass } from "@/components/calculators/calculator-workspace";
import { CurrencySelector, formatDisplayCurrency, useDisplayCurrency } from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import { calculateJeonseVsRent, type JeonseVsRentResult } from "../calculate";
import { jeonseVsRentContent, type JeonseVsRentLocale } from "../content";

const fieldClass = "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  jeonseDeposit: "300,000,000",
  jeonseLoanAmount: "200,000,000",
  jeonseLoanAnnualRatePercent: "4",
  monthlyRentDeposit: "30,000,000",
  monthlyRent: "1,200,000",
  opportunityAnnualRatePercent: "3",
  comparisonMonths: "24",
};

export function JeonseVsRentCalculator({ locale }: { locale: JeonseVsRentLocale }) {
  const copy = jeonseVsRentContent[locale];
  const [values, setValues] = useState(initialValues);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<JeonseVsRentResult>();
  const { currency } = useDisplayCurrency(locale);
  const { resultRef, noteNumericInputFocus, requestResultScroll, cancelResultScroll } = useStableResultScroll(result ?? null);
  const parseMoney = (value: string) => Number(value.replaceAll(",", ""));
  const money = (value?: number) => value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);

  function submit(event: FormEvent) {
    event.preventDefault();
    const input = {
      jeonseDeposit: parseMoney(values.jeonseDeposit),
      jeonseLoanAmount: parseMoney(values.jeonseLoanAmount),
      jeonseLoanAnnualRatePercent: Number(values.jeonseLoanAnnualRatePercent),
      monthlyRentDeposit: parseMoney(values.monthlyRentDeposit),
      monthlyRent: parseMoney(values.monthlyRent),
      opportunityAnnualRatePercent: Number(values.opportunityAnnualRatePercent),
      comparisonMonths: Number(values.comparisonMonths),
    };
    try {
      const next = calculateJeonseVsRent(input);
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
    setValues(initialValues);
    setHasError(false);
    setResult(undefined);
  }

  const setMoney = (key: "jeonseDeposit" | "jeonseLoanAmount" | "monthlyRentDeposit" | "monthlyRent", value: string) =>
    setValues((current) => ({ ...current, [key]: formatMoneyInput(value, current[key]) }));

  const cheaper = result
    ? result.cheaperOption === "jeonse" ? copy.jeonse : result.cheaperOption === "rent" ? copy.rent : copy.equal
    : "—";

  const moneyFields = [
    ["jeonseDeposit", copy.jeonseDeposit],
    ["jeonseLoanAmount", copy.jeonseLoanAmount],
    ["monthlyRentDeposit", copy.monthlyRentDeposit],
    ["monthlyRent", copy.monthlyRent],
  ] as const;

  return (
    <section aria-labelledby="jeonse-vs-rent-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form onSubmit={submit} onFocusCapture={noteNumericInputFocus} noValidate className={`${compactCalculatorSettingsClass} min-w-0`}>
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="jeonse-vs-rent-input-title" className="mt-1 text-xl font-semibold">{copy.input}</h2>
          {hasError ? <p role="alert" className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{copy.error}</p> : null}
          <CurrencySelector locale={locale} />
          {moneyFields.map(([key, label]) => (
            <div key={key} className="mt-4">
              <label htmlFor={key} className="block text-sm font-medium">{label}</label>
              <div className="relative">
                <input id={key} inputMode="decimal" value={values[key]} onChange={(event) => setMoney(key, event.target.value)} aria-invalid={hasError} className={fieldClass} />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">{currency}</span>
              </div>
            </div>
          ))}
          {([
            ["jeonseLoanAnnualRatePercent", copy.jeonseLoanRate, "%"],
            ["opportunityAnnualRatePercent", copy.opportunityRate, "%"],
            ["comparisonMonths", copy.comparisonMonths, locale === "ko" ? "개월" : "mo"],
          ] as const).map(([key, label, suffix]) => (
            <div key={key} className="mt-4">
              <label htmlFor={key} className="block text-sm font-medium">{label}</label>
              <div className="relative">
                <input id={key} inputMode="decimal" value={values[key]} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} aria-invalid={hasError} className={fieldClass} />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">{suffix}</span>
              </div>
            </div>
          ))}
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>{copy.reset}</Button>
          </div>
        </form>
        <section ref={resultRef} aria-labelledby="jeonse-vs-rent-result-title" className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm">
          <h2 id="jeonse-vs-rent-result-title" className="text-xl font-semibold">{copy.result}</h2>
          <PrimaryResults metrics={[
            { label: copy.jeonseCost, value: money(result?.jeonseEconomicCost), featured: true },
            { label: copy.rentCost, value: money(result?.rentEconomicCost), featured: true },
            { label: copy.difference, value: money(result?.costDifference) },
            { label: copy.cheaperOption, value: cheaper },
            { label: copy.breakEvenRent, value: money(result?.breakEvenMonthlyRent) },
            { label: copy.jeonseInterest, value: money(result?.jeonseLoanInterest) },
            { label: copy.jeonseOpportunity, value: money(result?.jeonseOpportunityCost) },
            { label: copy.rentPayments, value: money(result?.rentPayments) },
            { label: copy.rentDepositOpportunity, value: money(result?.rentDepositOpportunityCost) },
          ]} />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
