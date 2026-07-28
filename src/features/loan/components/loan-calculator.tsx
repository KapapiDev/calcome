"use client";

import Decimal from "decimal.js";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateLoan } from "../calculate";
import { DEFAULT_LOAN_VALUES } from "../constants";
import { formatLoanWon } from "../format";
import { getLoanDictionary, type LoanLocale } from "../i18n";
import type {
  LoanField,
  LoanFormValues,
  LoanResult,
  LoanValidationErrors,
  RepaymentType,
} from "../types";
import { validateLoanForm } from "../validation";

const INITIAL_VALUES: LoanFormValues = {
  ...DEFAULT_LOAN_VALUES,
  loanAmount: "",
  annualInterestRate: "",
  loanPeriod: "",
};
const controlClass =
  "mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const ERROR_SUMMARY_ID = "loan-error-summary";

function NumberField({
  field,
  label,
  value,
  unit,
  help,
  error,
  placeholder,
  money,
  onChange,
  onBlur,
}: {
  field: LoanField;
  label: string;
  value: string;
  unit: string;
  help: string;
  error?: string;
  placeholder: string;
  money?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label htmlFor={field} className="text-sm font-medium">
        {label} <span className="text-destructive">*</span>
      </label>
      <div className="relative">
        <input
          id={field}
          name={field}
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            if (money)
              event.target.value = formatMoneyInput(event.target.value, value);
            onChange(event);
          }}
          onBlur={onBlur}
          inputMode="decimal"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={`${field}-help${error ? ` ${field}-error ${ERROR_SUMMARY_ID}` : ""}`}
          className={`${controlClass} pr-14`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {unit}
        </span>
      </div>
      <p id={`${field}-help`} className="sr-only">
        {help}
      </p>
      {error ? (
        <p id={`${field}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type Comparison = { equalPayment: LoanResult; equalPrincipal: LoanResult };

export function LoanCalculator({ locale = "ko" }: { locale?: LoanLocale }) {
  const copy = getLoanDictionary(locale).calculator;
  const [values, setValues] = useState<LoanFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LoanValidationErrors>({});
  const [result, setResult] = useState<LoanResult | null>(null);
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [appliedType, setAppliedType] = useState<RepaymentType>(
    DEFAULT_LOAN_VALUES.repaymentType,
  );
  const [appliedMonths, setAppliedMonths] = useState(0);
  const [appliedAmount, setAppliedAmount] = useState("0");
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function updateValue(field: LoanField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }
  function validateField(field: LoanField) {
    const validation = validateLoanForm(values, locale);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateLoanForm(values, locale);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      cancelResultScroll();
      setResult(null);
      setComparison(null);
      setAppliedType(DEFAULT_LOAN_VALUES.repaymentType);
      setAppliedMonths(0);
      setAppliedAmount("0");
      setDetailsOpen(true);
      setAdditionalOpen(false);
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateLoan(validation.data);
    const equalPayment = calculateLoan({
      ...validation.data,
      repaymentType: "equal-payment",
    });
    const equalPrincipal = calculateLoan({
      ...validation.data,
      repaymentType: "equal-principal",
    });
    requestResultScroll();
    setResult(next);
    setComparison({ equalPayment, equalPrincipal });
    setAppliedType(validation.data.repaymentType);
    setAppliedMonths(validation.data.months);
    setAppliedAmount(validation.data.loanAmount);
    setAnimationKey((current) => current + 1);
    setDetailsOpen(true);
    setAdditionalOpen(true);
    setAnnouncement(copy.complete(formatLoanWon(next.monthlyPayment)));
  }
  function reset() {
    cancelResultScroll();
    setValues(INITIAL_VALUES);
    setErrors({});
    setResult(null);
    setComparison(null);
    setAppliedType(DEFAULT_LOAN_VALUES.repaymentType);
    setAppliedMonths(0);
    setAppliedAmount("0");
    setDetailsOpen(true);
    setAdditionalOpen(false);
    setAnnouncement(copy.resetAnnouncement);
  }
  const monthlyLabel =
    appliedType === "equal-principal"
      ? copy.firstPayment
      : appliedType === "bullet"
        ? copy.bulletPayment
        : copy.monthlyPayment;
  const summary =
    appliedType === "equal-payment"
      ? copy.summaries.equalPayment(appliedMonths)
      : appliedType === "equal-principal"
        ? copy.summaries.equalPrincipal
        : copy.summaries.bullet(appliedMonths);
  const cheaper =
    comparison &&
    new Decimal(comparison.equalPrincipal.totalInterest).lt(
      comparison.equalPayment.totalInterest,
    )
      ? "equal-principal"
      : "equal-payment";

  return (
    <section aria-labelledby="loan-calculator-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">
            {copy.inputEyebrow}
          </p>
          <h2 id="loan-calculator-title" className="mt-1 text-xl font-semibold">
            {copy.inputTitle}
          </h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {copy.inputDescription}
          </p>
          {Object.keys(errors).length ? (
            <div
              id={ERROR_SUMMARY_ID}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
            >
              {copy.errorSummary}
            </div>
          ) : null}
          <div className="mt-4 grid gap-3">
            <NumberField
              field="loanAmount"
              label={copy.amount}
              value={values.loanAmount}
              unit={copy.won}
              help={copy.amountHelp}
              error={errors.loanAmount}
              placeholder={copy.amountPlaceholder}
              money
              onChange={(e) => updateValue("loanAmount", e.target.value)}
              onBlur={() => validateField("loanAmount")}
            />
            <NumberField
              field="annualInterestRate"
              label={copy.rate}
              value={values.annualInterestRate}
              unit="%"
              help={copy.rateHelp}
              error={errors.annualInterestRate}
              placeholder={copy.ratePlaceholder}
              onChange={(e) =>
                updateValue("annualInterestRate", e.target.value)
              }
              onBlur={() => validateField("annualInterestRate")}
            />
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                field="loanPeriod"
                label={copy.period}
                value={values.loanPeriod}
                unit={values.periodUnit === "years" ? copy.years : copy.months}
                help={copy.periodHelp}
                error={errors.loanPeriod}
                placeholder={copy.periodPlaceholder}
                onChange={(e) => updateValue("loanPeriod", e.target.value)}
                onBlur={() => validateField("loanPeriod")}
              />
              <div>
                <label htmlFor="periodUnit" className="text-sm font-medium">
                  {copy.periodUnit} <span className="text-destructive">*</span>
                </label>
                <select
                  id="periodUnit"
                  value={values.periodUnit}
                  onChange={(e) => updateValue("periodUnit", e.target.value)}
                  className={controlClass}
                >
                  <option value="years">{copy.years}</option>
                  <option value="months">{copy.months}</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="repaymentType" className="text-sm font-medium">
                {copy.repaymentType} <span className="text-destructive">*</span>
              </label>
              <select
                id="repaymentType"
                value={values.repaymentType}
                onChange={(e) => updateValue("repaymentType", e.target.value)}
                className={controlClass}
              >
                <option value="equal-payment">{copy.equalPayment}</option>
                <option value="equal-principal">{copy.equalPrincipal}</option>
                <option value="bullet">{copy.bullet}</option>
              </select>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Button type="submit" className="h-10">
              {copy.calculate}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10"
              onClick={reset}
            >
              {copy.reset}
            </Button>
          </div>
        </form>
        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="loan-result-title"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-primary">
              {copy.resultsEyebrow}
            </p>
            <h2 id="loan-result-title" className="mt-1 text-xl font-semibold">
              {copy.resultsTitle}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: monthlyLabel,
                  value: result ? (
                    <AnimatedWon
                      value={result.monthlyPayment}
                      animationKey={animationKey}
                    />
                  ) : (
                    "-"
                  ),
                  featured: true,
                },
                {
                  label: copy.totalRepayment,
                  value: result ? (
                    <AnimatedWon
                      value={result.totalRepayment}
                      animationKey={animationKey}
                    />
                  ) : (
                    "-"
                  ),
                },
                {
                  label: copy.totalInterest,
                  value: result ? (
                    <AnimatedWon
                      value={result.totalInterest}
                      animationKey={animationKey}
                    />
                  ) : (
                    "-"
                  ),
                },
              ]}
            />
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              {copy.notice}
            </p>
          </section>
          <section
            className="rounded-xl border bg-card p-4 shadow-sm"
            aria-labelledby="loan-comparison-title"
          >
            <h2 id="loan-comparison-title" className="text-lg font-semibold">
              {copy.comparisonTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {copy.comparisonDescription}
            </p>
            {comparison ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["equal-payment", copy.equalPayment, comparison.equalPayment],
                  [
                    "equal-principal",
                    copy.equalPrincipal,
                    comparison.equalPrincipal,
                  ],
                ].map(([key, label, item]) => {
                  const data = item as LoanResult;
                  return (
                    <article
                      key={key as string}
                      className={`rounded-lg border p-4 ${cheaper === key ? "border-primary/40 bg-primary/5" : "bg-background"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold">{label as string}</h3>
                        {cheaper === key ? (
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                            {copy.cheaper}
                          </span>
                        ) : null}
                      </div>
                      <dl className="mt-3 grid gap-2 text-sm">
                        {[
                          [copy.first, data.monthlyPayment],
                          [copy.last, data.lastMonthlyPayment],
                          [copy.totalRepayment, data.totalRepayment],
                          [copy.totalInterest, data.totalInterest],
                        ].map(([metric, value]) => (
                          <div
                            key={metric}
                            className="flex justify-between gap-4"
                          >
                            <dt className="text-muted-foreground">{metric}</dt>
                            <dd className="font-medium tabular-nums">
                              {formatLoanWon(value)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
                {copy.emptyDetails}
              </p>
            )}
          </section>
          <details
            open={detailsOpen}
            onToggle={(event) => {
              if (result) setDetailsOpen(event.currentTarget.open);
            }}
            className="rounded-xl border bg-card"
          >
            <summary
              onClick={(event) => {
                if (!result) event.preventDefault();
              }}
              className="min-h-12 cursor-pointer list-none px-4 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copy.details}
            </summary>
            <div className="border-t p-4">
              {result ? (
                <div className="max-h-[36rem] overflow-auto rounded-lg border">
                  <table className="w-full min-w-[800px] text-right text-sm tabular-nums">
                    <caption className="sr-only">{copy.tableCaption}</caption>
                    <thead className="sticky top-0 bg-muted">
                      <tr>
                        {copy.tableHeadings.map((heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="border-b px-3 py-2 font-medium"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.month} className="border-b last:border-0">
                          <th scope="row" className="px-3 py-2">
                            {row.month}
                          </th>
                          <td className="px-3 py-2">
                            {copy.paymentIndex(row.month)}
                          </td>
                          <td className="px-3 py-2">
                            {formatLoanWon(row.principal)}
                          </td>
                          <td className="px-3 py-2">
                            {formatLoanWon(row.interest)}
                          </td>
                          <td className="px-3 py-2">
                            {formatLoanWon(row.payment)}
                          </td>
                          <td className="px-3 py-2">
                            {formatLoanWon(row.remainingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {copy.emptyDetails}
                </p>
              )}
            </div>
          </details>
          <details
            open={additionalOpen}
            onToggle={(event) => setAdditionalOpen(event.currentTarget.open)}
            className="rounded-xl border bg-card"
          >
            <summary className="min-h-12 cursor-pointer list-none px-4 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.additional}
            </summary>
            <div className="border-t p-4">
              {result ? (
                <dl className="grid gap-3 sm:grid-cols-2">
                  {[
                    [copy.additionalLabels[0], formatLoanWon(appliedAmount)],
                    [
                      copy.additionalLabels[1],
                      formatLoanWon(result.totalInterest),
                    ],
                    [
                      copy.additionalLabels[2],
                      `${appliedMonths} ${copy.months}`,
                    ],
                    [copy.additionalLabels[3], summary],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-lg border bg-background p-3"
                    >
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {copy.emptyDetails}
                </p>
              )}
            </div>
          </details>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {announcement}
          </p>
        </div>
      </div>
    </section>
  );
}
