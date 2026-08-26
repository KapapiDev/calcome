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
  calculateMaternityLeaveBenefit,
  type MaternityLeaveBenefitResult,
} from "../calculate";
import {
  maternityLeaveBenefitContent,
  type MaternityLeaveBenefitLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  monthlyOrdinaryWage: "3,000,000",
  multipleBirth: "false",
  prioritySupportedEmployer: "true",
};

export function MaternityLeaveBenefitCalculator({
  locale,
}: {
  locale: MaternityLeaveBenefitLocale;
}) {
  const copy = maternityLeaveBenefitContent[locale];
  const [values, setValues] = useState(initialValues);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<MaternityLeaveBenefitResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const monthlyOrdinaryWage = Number(
      values.monthlyOrdinaryWage.replaceAll(",", ""),
    );
    const invalid =
      !Number.isFinite(monthlyOrdinaryWage) || monthlyOrdinaryWage <= 0;
    setHasError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(
      calculateMaternityLeaveBenefit({
        monthlyOrdinaryWage,
        multipleBirth: values.multipleBirth === "true",
        prioritySupportedEmployer:
          values.prioritySupportedEmployer === "true",
      }),
    );
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
    <section aria-labelledby="maternity-leave-benefit-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="maternity-leave-benefit-input-title"
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
          <div className="mt-4">
            <label
              htmlFor="monthlyOrdinaryWage"
              className="block text-sm font-medium"
            >
              {copy.monthlyOrdinaryWage}
            </label>
            <div className="relative">
              <input
                id="monthlyOrdinaryWage"
                inputMode="decimal"
                value={values.monthlyOrdinaryWage}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    monthlyOrdinaryWage: formatMoneyInput(
                      event.target.value,
                      current.monthlyOrdinaryWage,
                    ),
                  }))
                }
                aria-invalid={hasError}
                className={`${fieldClass} pr-16`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                KRW
              </span>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="birthType" className="block text-sm font-medium">
              {copy.birthType}
            </label>
            <select
              id="birthType"
              value={values.multipleBirth}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  multipleBirth: event.target.value,
                }))
              }
              className={fieldClass}
            >
              <option value="false">{copy.singleton}</option>
              <option value="true">{copy.multiple}</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="employerType" className="block text-sm font-medium">
              {copy.employerType}
            </label>
            <select
              id="employerType"
              value={values.prioritySupportedEmployer}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  prioritySupportedEmployer: event.target.value,
                }))
              }
              className={fieldClass}
            >
              <option value="true">{copy.prioritySupported}</option>
              <option value="false">{copy.largeEmployer}</option>
            </select>
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
          aria-labelledby="maternity-leave-benefit-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="maternity-leave-benefit-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.estimatedTotalIncome,
                value: money(result?.estimatedTotalIncome),
                featured: true,
              },
              {
                label: copy.governmentBenefit,
                value: money(result?.governmentBenefit),
              },
              {
                label: copy.employerPayment,
                value: money(result?.employerPayment),
              },
              {
                label: copy.leaveDays,
                value:
                  result === undefined
                    ? "—"
                    : `${new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US").format(result.leaveDays)}${locale === "ko" ? "일" : " days"}`,
              },
              {
                label: copy.governmentPaidDays,
                value:
                  result === undefined
                    ? "—"
                    : `${new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US").format(result.governmentPaidDays)}${locale === "ko" ? "일" : " days"}`,
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
