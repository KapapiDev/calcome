"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateParentalLeaveBenefit,
  type ParentalLeaveBenefitResult,
} from "../calculate";
import {
  parentalLeaveBenefitContent,
  type ParentalLeaveBenefitLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = { monthlyOrdinaryWage: "3,000,000", leaveMonths: "12" };

export function ParentalLeaveBenefitCalculator({
  locale,
}: {
  locale: ParentalLeaveBenefitLocale;
}) {
  const copy = parentalLeaveBenefitContent[locale];
  const [values, setValues] = useState(initialValues);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<ParentalLeaveBenefitResult>();
  const { resultRef, noteNumericInputFocus, requestResultScroll, cancelResultScroll } =
    useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const monthlyOrdinaryWage = Number(values.monthlyOrdinaryWage.replaceAll(",", ""));
    const leaveMonths = Number(values.leaveMonths);
    const invalid =
      !Number.isFinite(monthlyOrdinaryWage) ||
      monthlyOrdinaryWage <= 0 ||
      !Number.isInteger(leaveMonths) ||
      leaveMonths < 1 ||
      leaveMonths > 18;
    setHasError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(calculateParentalLeaveBenefit({ monthlyOrdinaryWage, leaveMonths }));
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setHasError(false);
    setResult(undefined);
  }

  const money = (value?: number) =>
    value === undefined
      ? "—"
      : new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
          style: "currency",
          currency: "KRW",
          maximumFractionDigits: 0,
        }).format(value);

  return (
    <section aria-labelledby="parental-leave-benefit-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form onSubmit={submit} onFocusCapture={noteNumericInputFocus} noValidate className={`${compactCalculatorSettingsClass} min-w-0`}>
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="parental-leave-benefit-input-title" className="mt-1 text-xl font-semibold">{copy.input}</h2>
          {hasError ? <p role="alert" className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{copy.error}</p> : null}
          <div className="mt-4">
            <label htmlFor="monthlyOrdinaryWage" className="block text-sm font-medium">{copy.monthlyOrdinaryWage}</label>
            <div className="relative">
              <input id="monthlyOrdinaryWage" inputMode="decimal" value={values.monthlyOrdinaryWage} onChange={(event) => setValues((current) => ({ ...current, monthlyOrdinaryWage: formatMoneyInput(event.target.value, current.monthlyOrdinaryWage) }))} aria-invalid={hasError} className={fieldClass} />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">KRW</span>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="leaveMonths" className="block text-sm font-medium">{copy.leaveMonths}</label>
            <input id="leaveMonths" type="number" min="1" max="18" step="1" value={values.leaveMonths} onChange={(event) => setValues((current) => ({ ...current, leaveMonths: event.target.value }))} aria-invalid={hasError} className={fieldClass} />
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>{copy.reset}</Button>
          </div>
        </form>
        <section ref={resultRef} aria-labelledby="parental-leave-benefit-result-title" className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm">
          <h2 id="parental-leave-benefit-result-title" className="text-xl font-semibold">{copy.result}</h2>
          <PrimaryResults metrics={[
            { label: copy.totalBenefit, value: money(result?.totalBenefit), featured: true },
            { label: copy.averageMonthly, value: money(result?.averageMonthlyBenefit) },
            { label: copy.firstThree, value: money(result?.firstThreeMonthly) },
            { label: copy.monthsFourToSix, value: money(result?.monthsFourToSixMonthly) },
            { label: copy.monthSevenPlus, value: money(result?.monthSevenPlusMonthly) },
          ]} />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
