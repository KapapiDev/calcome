"use client";

import Decimal from "decimal.js";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  calculateJeonseLoanLimit,
  type JeonseLoanLimitResult,
} from "../calculate";
import {
  jeonseLoanLimitContent,
  type JeonseLoanLimitLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:text-sm";

type Values = {
  deposit: string;
  requestedAmount: string;
  existingGuaranteeBalance: string;
  recognizedAnnualIncome: string;
  annualDebtService: string;
  repaymentPreferenceAmount: string;
  oneHomeHousehold: boolean;
  capitalOrRegulatedArea: boolean;
};

const initialValues: Values = {
  deposit: "300000000",
  requestedAmount: "200000000",
  existingGuaranteeBalance: "0",
  recognizedAnnualIncome: "240000000",
  annualDebtService: "20000000",
  repaymentPreferenceAmount: "0",
  oneHomeHousehold: false,
  capitalOrRegulatedArea: false,
};

export function JeonseLoanLimitCalculator({
  locale,
}: {
  locale: JeonseLoanLimitLocale;
}) {
  const copy = jeonseLoanLimitContent[locale];
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState<JeonseLoanLimitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const parse = (value: string) => new Decimal(value.replaceAll(",", ""));
      setResult(
        calculateJeonseLoanLimit({
          deposit: parse(values.deposit),
          requestedAmount: parse(values.requestedAmount),
          existingGuaranteeBalance: parse(values.existingGuaranteeBalance),
          recognizedAnnualIncome: parse(values.recognizedAnnualIncome),
          annualDebtService: parse(values.annualDebtService),
          repaymentPreferenceAmount: parse(values.repaymentPreferenceAmount),
          oneHomeHousehold: values.oneHomeHousehold,
          capitalOrRegulatedArea: values.capitalOrRegulatedArea,
        }),
      );
      setError(null);
    } catch {
      setResult(null);
      setError(
        locale === "ko"
          ? "모든 금액에 0 이상의 유효한 숫자를 입력해 주세요."
          : "Enter a valid non-negative number for every amount.",
      );
    }
  }

  const setValue = (key: keyof Values, value: string | boolean) =>
    setValues((current) => ({ ...current, [key]: value }));

  function reset() {
    setValues(initialValues);
    setResult(null);
    setError(null);
  }

  const factor = result
    ? result.limitingFactor === "subject"
      ? locale === "ko"
        ? "보증과목별 한도"
        : "Subject-level limit"
      : result.limitingFactor === "funding"
        ? locale === "ko"
          ? "소요자금별 한도"
          : "Funding-needs limit"
        : result.limitingFactor === "repayment"
          ? locale === "ko"
            ? "상환능력별 한도"
            : "Repayment-capacity limit"
          : locale === "ko"
            ? "복수 기준 동일"
            : "Multiple limits are equal"
    : "—";

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <form
        onSubmit={submit}
        noValidate
        className="rounded-xl border bg-card p-5 shadow-sm"
      >
        <h2 className="text-xl font-semibold">
          {locale === "ko" ? "보증 한도 입력" : "Guarantee inputs"}
        </h2>
        {error ? (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Field
          label={copy.deposit}
          value={values.deposit}
          onChange={(value) => setValue("deposit", value)}
        />
        <Field
          label={copy.requestedAmount}
          value={values.requestedAmount}
          onChange={(value) => setValue("requestedAmount", value)}
        />
        <Field
          label={copy.existingBalance}
          value={values.existingGuaranteeBalance}
          onChange={(value) => setValue("existingGuaranteeBalance", value)}
        />
        <Field
          label={copy.recognizedIncome}
          value={values.recognizedAnnualIncome}
          onChange={(value) => setValue("recognizedAnnualIncome", value)}
        />
        <Field
          label={copy.annualDebtService}
          value={values.annualDebtService}
          onChange={(value) => setValue("annualDebtService", value)}
        />
        <Field
          label={copy.preferenceAmount}
          value={values.repaymentPreferenceAmount}
          onChange={(value) => setValue("repaymentPreferenceAmount", value)}
        />
        <CheckField
          label={copy.oneHome}
          checked={values.oneHomeHousehold}
          onChange={(checked) => setValue("oneHomeHousehold", checked)}
        />
        <CheckField
          label={copy.capitalOrRegulated}
          checked={values.capitalOrRegulatedArea}
          onChange={(checked) => setValue("capitalOrRegulatedArea", checked)}
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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Metric
              label={copy.finalLimit}
              value={result ? formatKrw(result.areaAdjustedLimit, locale) : "—"}
              featured
            />
            <Metric label={copy.factor} value={factor} />
            <Metric
              label={copy.subjectLimit}
              value={result ? formatKrw(result.subjectLimit, locale) : "—"}
            />
            <Metric
              label={copy.fundingLimit}
              value={result ? formatKrw(result.fundingLimit, locale) : "—"}
            />
            <Metric
              label={copy.repaymentLimit}
              value={result ? formatKrw(result.repaymentLimit, locale) : "—"}
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
  onChange,
}: {
  label: string;
  value: string;
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
          KRW
        </span>
      </div>
    </label>
  );
}

function CheckField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 text-sm font-medium">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5"
      />
      <span>{label}</span>
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

function formatKrw(value: Decimal, locale: JeonseLoanLimitLocale) {
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value.toDecimalPlaces(0).toNumber());
}
