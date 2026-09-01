"use client";

import Decimal from "decimal.js";
import { type FormEvent, useState } from "react";
import { PrimaryResults } from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import {
  calculateMortgageLoanLimit,
  type MortgageLoanLimitResult,
} from "../calculate";
import {
  mortgageLoanLimitContent,
  type MortgageLoanLimitLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:text-sm";

type Values = {
  homePrice: string;
  annualIncome: string;
  existingAnnualDebtService: string;
  annualInterestRate: string;
  termYears: string;
  ltvLimitRate: string;
  dsrLimitRate: string;
};

const initialValues: Values = {
  homePrice: "600000000",
  annualIncome: "80000000",
  existingAnnualDebtService: "0",
  annualInterestRate: "4",
  termYears: "30",
  ltvLimitRate: "70",
  dsrLimitRate: "40",
};

export function MortgageLoanLimitCalculator({
  locale,
}: {
  locale: MortgageLoanLimitLocale;
}) {
  const copy = mortgageLoanLimitContent[locale];
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState<MortgageLoanLimitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const parsed = {
        homePrice: new Decimal(values.homePrice.replaceAll(",", "")),
        annualIncome: new Decimal(values.annualIncome.replaceAll(",", "")),
        existingAnnualDebtService: new Decimal(
          values.existingAnnualDebtService.replaceAll(",", ""),
        ),
        annualInterestRate: new Decimal(values.annualInterestRate),
        termYears: new Decimal(values.termYears),
        ltvLimitRate: new Decimal(values.ltvLimitRate),
        dsrLimitRate: new Decimal(values.dsrLimitRate),
      };
      setResult(calculateMortgageLoanLimit(parsed));
      setError(null);
    } catch {
      setResult(null);
      setError(
        locale === "ko"
          ? "유효한 숫자를 입력해 주세요. 금액과 금리는 0 이상, 상환 기간은 0보다 커야 하며 LTV·DSR은 100% 이하여야 합니다."
          : "Enter valid numbers. Amounts and rates must be non-negative, the repayment term must be greater than zero, and LTV/DSR limits cannot exceed 100%.",
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

  const factor = result
    ? result.limitingFactor === "ltv"
      ? "LTV"
      : result.limitingFactor === "dsr"
        ? "DSR"
        : locale === "ko"
          ? "LTV와 DSR 동일"
          : "LTV and DSR equally"
    : "—";

  const metrics = [
    {
      label: copy.loanLimit,
      value: result ? formatKrw(result.loanLimit, locale) : "—",
      featured: true,
    },
    { label: copy.limitingFactor, value: factor },
    {
      label: copy.ltvLimit,
      value: result ? formatKrw(result.ltvLimit, locale) : "—",
    },
    {
      label: copy.dsrLimit,
      value: result ? formatKrw(result.dsrLimit, locale) : "—",
    },
    {
      label: copy.monthlyPayment,
      value: result ? formatKrw(result.estimatedMonthlyPayment, locale) : "—",
    },
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <form
        onSubmit={submit}
        noValidate
        className="rounded-xl border bg-card p-5 shadow-sm"
      >
        <h2 className="text-xl font-semibold">
          {locale === "ko" ? "주택과 대출 조건" : "Home and loan inputs"}
        </h2>
        {error ? (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Field
          label={copy.homePrice}
          value={values.homePrice}
          suffix="KRW"
          onChange={(value) => setValue("homePrice", value)}
        />
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
          label={copy.interestRate}
          value={values.annualInterestRate}
          suffix="%"
          onChange={(value) => setValue("annualInterestRate", value)}
        />
        <Field
          label={copy.termYears}
          value={values.termYears}
          suffix={locale === "ko" ? "년" : "years"}
          onChange={(value) => setValue("termYears", value)}
        />
        <Field
          label={copy.ltvRate}
          value={values.ltvLimitRate}
          suffix="%"
          onChange={(value) => setValue("ltvLimitRate", value)}
        />
        <Field
          label={copy.dsrRate}
          value={values.dsrLimitRate}
          suffix="%"
          onChange={(value) => setValue("dsrLimitRate", value)}
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
            {locale === "ko" ? "예상 한도" : "Estimated limit"}
          </h2>
          <PrimaryResults metrics={metrics} />
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

function formatKrw(value: Decimal, locale: MortgageLoanLimitLocale) {
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value.toDecimalPlaces(0).toNumber());
}
