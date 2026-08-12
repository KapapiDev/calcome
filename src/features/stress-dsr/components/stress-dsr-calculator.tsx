"use client";

import Decimal from "decimal.js";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { calculateStressDsr, type StressDsrResult } from "../calculate";
import { stressDsrContent, type StressDsrLocale } from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:text-sm";

type Values = {
  annualIncome: string;
  existingAnnualDebtService: string;
  newLoanPrincipal: string;
  annualInterestRate: string;
  stressRateAddOn: string;
  termYears: string;
};

const initialValues: Values = {
  annualIncome: "60000000",
  existingAnnualDebtService: "6000000",
  newLoanPrincipal: "100000000",
  annualInterestRate: "4.5",
  stressRateAddOn: "1.5",
  termYears: "20",
};

export function StressDsrCalculator({ locale }: { locale: StressDsrLocale }) {
  const copy = stressDsrContent[locale];
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState<StressDsrResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const parsed = {
        annualIncome: new Decimal(values.annualIncome.replaceAll(",", "")),
        existingAnnualDebtService: new Decimal(
          values.existingAnnualDebtService.replaceAll(",", ""),
        ),
        newLoanPrincipal: new Decimal(
          values.newLoanPrincipal.replaceAll(",", ""),
        ),
        annualInterestRate: new Decimal(values.annualInterestRate),
        stressRateAddOn: new Decimal(values.stressRateAddOn),
        termYears: new Decimal(values.termYears),
      };
      if (
        parsed.annualIncome.lte(0) ||
        parsed.existingAnnualDebtService.lt(0) ||
        parsed.newLoanPrincipal.lt(0) ||
        parsed.annualInterestRate.lt(0) ||
        parsed.stressRateAddOn.lt(0) ||
        parsed.termYears.lte(0)
      ) {
        throw new RangeError("invalid input");
      }
      setResult(calculateStressDsr(parsed));
      setError(null);
    } catch {
      setResult(null);
      setError(
        locale === "ko"
          ? "0 이상의 유효한 숫자를 입력해 주세요. 연소득과 상환 기간은 0보다 커야 합니다."
          : "Enter valid non-negative numbers. Annual income and repayment term must be greater than zero.",
      );
    }
  }

  const setValue = (key: keyof Values, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  function reset() {
    setValues(initialValues);
    setResult(null);
    setError(null);
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <form
        onSubmit={submit}
        noValidate
        className="rounded-xl border bg-card p-5 shadow-sm"
      >
        <h2 className="text-xl font-semibold">
          {locale === "ko" ? "소득과 대출 조건" : "Income and loan inputs"}
        </h2>
        {error ? (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Field
          label={copy.annualIncome}
          value={values.annualIncome}
          suffix="KRW"
          onChange={(value) => setValue("annualIncome", value)}
        />
        <Field
          label={copy.existingDebt}
          value={values.existingAnnualDebtService}
          suffix="KRW"
          onChange={(value) => setValue("existingAnnualDebtService", value)}
        />
        <Field
          label={copy.newLoan}
          value={values.newLoanPrincipal}
          suffix="KRW"
          onChange={(value) => setValue("newLoanPrincipal", value)}
        />
        <Field
          label={copy.interestRate}
          value={values.annualInterestRate}
          suffix="%"
          onChange={(value) => setValue("annualInterestRate", value)}
        />
        <Field
          label={copy.stressRate}
          value={values.stressRateAddOn}
          suffix="%p"
          onChange={(value) => setValue("stressRateAddOn", value)}
        />
        <Field
          label={copy.termYears}
          value={values.termYears}
          suffix={locale === "ko" ? "년" : "years"}
          onChange={(value) => setValue("termYears", value)}
        />
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <Button type="submit">{copy.calculate}</Button>
          <Button type="button" variant="outline" onClick={reset}>
            {copy.reset}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        <section className="rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-xl font-semibold">
            {locale === "ko" ? "비교 결과" : "Comparison results"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Metric
              label={copy.baseDsr}
              value={
                result ? `${result.base.dsrRate.toDecimalPlaces(1)}%` : "—"
              }
            />
            <Metric
              label={copy.stressedDsr}
              value={
                result ? `${result.stressed.dsrRate.toDecimalPlaces(1)}%` : "—"
              }
              featured
            />
            <Metric
              label={copy.increase}
              value={
                result ? `${result.dsrIncrease.toDecimalPlaces(1)}%p` : "—"
              }
            />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Metric
              label={copy.basePayment}
              value={
                result ? formatKrw(result.base.monthlyPayment, locale) : "—"
              }
            />
            <Metric
              label={copy.stressedPayment}
              value={
                result ? formatKrw(result.stressed.monthlyPayment, locale) : "—"
              }
            />
          </div>
        </section>
        <section className="rounded-xl border bg-card p-5 text-sm leading-7 text-muted-foreground shadow-sm">
          <p>{copy.note}</p>
          <p className="mt-3">{copy.caution}</p>
        </section>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  suffix,
  onChange,
}: {
  label: string;
  value: string;
  suffix: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-4 block text-sm font-medium">
      {label}
      <div className="relative">
        <input
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass} pr-16`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {suffix}
        </span>
      </div>
    </label>
  );
}

function Metric({
  label,
  value,
  featured = false,
}: {
  label: string;
  value: string;
  featured?: boolean;
}) {
  return (
    <div className={`rounded-lg border p-4 ${featured ? "bg-muted/60" : ""}`}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function formatKrw(value: Decimal, locale: StressDsrLocale) {
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value.toDecimalPlaces(0).toNumber());
}
