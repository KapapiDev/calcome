"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import {
  calculatePensionSavingsTaxCredit,
  type PensionSavingsTaxCreditIncomeType,
  type PensionSavingsTaxCreditResult,
} from "../calculate";
import type { PensionSavingsTaxCreditLocale } from "../metadata";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function PensionSavingsTaxCreditCalculator({
  locale,
}: {
  locale: PensionSavingsTaxCreditLocale;
}) {
  const ko = locale === "ko";
  const [incomeType, setIncomeType] =
    useState<PensionSavingsTaxCreditIncomeType>("salary");
  const [incomeAmount, setIncomeAmount] = useState("55000000");
  const [pensionSavings, setPensionSavings] = useState("6000000");
  const [retirementPension, setRetirementPension] = useState("3000000");
  const [error, setError] = useState("");
  const [result, setResult] = useState<PensionSavingsTaxCreditResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function parseMoney(value: string) {
    return Number(value.replaceAll(",", ""));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const income = parseMoney(incomeAmount);
    const savings = parseMoney(pensionSavings);
    const retirement = parseMoney(retirementPension);
    if (
      !Number.isFinite(income) ||
      !Number.isFinite(savings) ||
      !Number.isFinite(retirement) ||
      income < 0 ||
      savings < 0 ||
      retirement < 0
    ) {
      setError(
        ko
          ? "소득과 납입액은 0 이상의 숫자로 입력하세요."
          : "Enter income and contribution amounts as numbers of 0 or more.",
      );
      setResult(undefined);
      return;
    }
    setError("");
    requestResultScroll();
    setResult(
      calculatePensionSavingsTaxCredit({
        incomeType,
        incomeAmount: income,
        pensionSavingsContribution: savings,
        retirementPensionContribution: retirement,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setIncomeType("salary");
    setIncomeAmount("55000000");
    setPensionSavings("6000000");
    setRetirementPension("3000000");
    setError("");
    setResult(undefined);
  }

  const money = (value: number) =>
    `${Math.round(value).toLocaleString(ko ? "ko-KR" : "en-US")} KRW`;

  return (
    <section aria-labelledby="pension-savings-tax-credit-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">
            {ko ? "저축·연금" : "Savings & pension"}
          </p>
          <h2
            id="pension-savings-tax-credit-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {ko ? "공제 조건" : "Credit inputs"}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}

          <label className="mt-4 block text-sm font-medium" htmlFor="income-type">
            {ko ? "소득 기준" : "Income basis"}
          </label>
          <select
            id="income-type"
            className={fieldClass}
            value={incomeType}
            onChange={(event) =>
              setIncomeType(event.target.value as PensionSavingsTaxCreditIncomeType)
            }
          >
            <option value="salary">
              {ko ? "근로소득만 있음 (총급여)" : "Salary income only (gross pay)"}
            </option>
            <option value="other">
              {ko ? "그 외 종합소득 (종합소득금액)" : "Other comprehensive income"}
            </option>
          </select>

          <MoneyField
            id="income-amount"
            label={ko ? "소득 금액 (KRW)" : "Income amount (KRW)"}
            value={incomeAmount}
            setValue={setIncomeAmount}
          />
          <MoneyField
            id="pension-savings"
            label={ko ? "연금저축 납입액 (KRW)" : "Pension savings contribution (KRW)"}
            value={pensionSavings}
            setValue={setPensionSavings}
          />
          <MoneyField
            id="retirement-pension"
            label={ko ? "퇴직연금·IRP 납입액 (KRW)" : "Retirement pension / IRP contribution (KRW)"}
            value={retirementPension}
            setValue={setRetirementPension}
          />

          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {ko
              ? "2026-08-25 확인 기준: 연금저축은 연 600만원, 연금저축과 퇴직연금계좌 합계는 연 900만원까지 공제대상입니다."
              : "Verified Aug 25, 2026: pension savings are eligible up to KRW 6 million, with a KRW 9 million combined pension-account limit."}
          </p>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{ko ? "계산하기" : "Calculate"}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {ko ? "초기화" : "Reset"}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="pension-savings-tax-credit-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="pension-savings-tax-credit-result-title"
            className="text-xl font-semibold"
          >
            {ko ? "예상 세액공제" : "Estimated tax credit"}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: ko ? "소득세 세액공제액" : "Income-tax credit",
                value: result ? money(result.incomeTaxCredit) : "—",
                featured: true,
              },
              {
                label: ko ? "공제율" : "Credit rate",
                value: result ? `${result.rate * 100}%` : "—",
              },
              {
                label: ko ? "공제대상 납입액" : "Eligible contributions",
                value: result ? money(result.eligibleContribution) : "—",
              },
              {
                label: ko ? "한도 초과 납입액" : "Contribution above limit",
                value: result ? money(result.unusedContribution) : "—",
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {ko
              ? "실제 환급액은 산출세액, 다른 공제·감면, 납입 적격 여부와 신고 내용에 따라 달라질 수 있습니다. 이 계산은 소득세법상 연금계좌 세액공제 자체를 추정합니다."
              : "Your actual refund can differ because of calculated tax, other credits, contribution eligibility, and filing details. This estimates the pension-account credit under South Korean income-tax law."}
          </p>
        </section>
      </div>
    </section>
  );
}

function MoneyField({
  id,
  label,
  value,
  setValue,
}: {
  id: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        inputMode="numeric"
        className={fieldClass}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}
