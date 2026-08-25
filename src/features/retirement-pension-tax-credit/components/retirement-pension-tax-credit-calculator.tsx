"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import type { PensionSavingsTaxCreditIncomeType } from "@/features/pension-savings-tax-credit/calculate";
import {
  calculateRetirementPensionTaxCredit,
  type RetirementPensionTaxCreditResult,
} from "../calculate";
import type { RetirementPensionTaxCreditLocale } from "../metadata";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function RetirementPensionTaxCreditCalculator({
  locale,
}: {
  locale: RetirementPensionTaxCreditLocale;
}) {
  const ko = locale === "ko";
  const [incomeType, setIncomeType] =
    useState<PensionSavingsTaxCreditIncomeType>("salary");
  const [incomeAmount, setIncomeAmount] = useState("55000000");
  const [pensionSavings, setPensionSavings] = useState("6000000");
  const [retirementPension, setRetirementPension] = useState("1000000");
  const [error, setError] = useState("");
  const [result, setResult] = useState<RetirementPensionTaxCreditResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  const parseMoney = (value: string) => Number(value.replaceAll(",", ""));
  const money = (value: number) =>
    `${Math.round(value).toLocaleString(ko ? "ko-KR" : "en-US")} KRW`;

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
      calculateRetirementPensionTaxCredit({
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
    setRetirementPension("1000000");
    setError("");
    setResult(undefined);
  }

  return (
    <section aria-labelledby="retirement-pension-tax-credit-input-title">
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
            id="retirement-pension-tax-credit-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {ko ? "퇴직연금·IRP 공제 여력" : "Retirement-pension credit room"}
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
              setIncomeType(
                event.target.value as PensionSavingsTaxCreditIncomeType,
              )
            }
          >
            <option value="salary">
              {ko
                ? "근로소득만 있음 (총급여)"
                : "Salary income only (gross pay)"}
            </option>
            <option value="other">
              {ko
                ? "그 외 종합소득 (종합소득금액)"
                : "Other comprehensive income"}
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
            label={
              ko
                ? "올해 연금저축 납입액 (KRW)"
                : "Pension savings paid this year (KRW)"
            }
            value={pensionSavings}
            setValue={setPensionSavings}
          />
          <MoneyField
            id="retirement-pension"
            label={
              ko
                ? "올해 퇴직연금·IRP 납입액 (KRW)"
                : "Retirement pension / IRP paid this year (KRW)"
            }
            value={retirementPension}
            setValue={setRetirementPension}
          />

          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {ko
              ? "2026-08-26 확인 기준: 연금저축은 연 600만원, 연금저축과 퇴직연금계좌 합계는 연 900만원까지 세액공제 대상입니다."
              : "Verified Aug 26, 2026: pension savings are eligible up to KRW 6 million, with a KRW 9 million combined pension-account limit."}
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
          aria-labelledby="retirement-pension-tax-credit-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="retirement-pension-tax-credit-result-title"
            className="text-xl font-semibold"
          >
            {ko ? "추가 납입 효과" : "Additional contribution effect"}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: ko
                  ? "한도까지 추가 납입 가능액"
                  : "Additional contribution to max",
                value: result ? money(result.additionalContributionToMax) : "—",
                featured: true,
              },
              {
                label: ko
                  ? "추가 세액공제 가능액"
                  : "Additional income-tax credit",
                value: result
                  ? money(result.additionalIncomeTaxCreditToMax)
                  : "—",
              },
              {
                label: ko ? "현재 예상 세액공제" : "Current estimated credit",
                value: result ? money(result.currentIncomeTaxCredit) : "—",
              },
              {
                label: ko ? "한도 충족 시 최대 공제" : "Maximum credit at limit",
                value: result ? money(result.maximumIncomeTaxCredit) : "—",
              },
              {
                label: ko ? "적용 공제율" : "Credit rate",
                value: result ? `${result.rate * 100}%` : "—",
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {ko
              ? "이 계산기는 연금저축을 이미 얼마 납입했는지 반영해 퇴직연금·IRP 쪽에서 세액공제 한도를 얼마나 더 채울 수 있는지 보여줍니다. 실제 환급액은 산출세액과 다른 공제·감면에 따라 달라질 수 있습니다."
              : "This view focuses on how much retirement-pension or IRP tax-credit room remains after your pension-savings contribution. Your actual refund can differ because of calculated tax and other credits or reductions."}
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
