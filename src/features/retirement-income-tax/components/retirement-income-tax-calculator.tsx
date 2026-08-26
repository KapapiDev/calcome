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
  calculateRetirementIncomeTax,
  type RetirementIncomeTaxResult,
} from "../calculate";
import type { RetirementIncomeTaxLocale } from "../metadata";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function RetirementIncomeTaxCalculator({
  locale,
}: {
  locale: RetirementIncomeTaxLocale;
}) {
  const ko = locale === "ko";
  const [retirementPay, setRetirementPay] = useState("100000000");
  const [nonTaxablePay, setNonTaxablePay] = useState("0");
  const [serviceYears, setServiceYears] = useState("20");
  const [error, setError] = useState("");
  const [result, setResult] = useState<RetirementIncomeTaxResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  const parseNumber = (value: string) => Number(value.replaceAll(",", ""));
  const money = (value: number) =>
    `${Math.round(value).toLocaleString(ko ? "ko-KR" : "en-US")} KRW`;

  function submit(event: FormEvent) {
    event.preventDefault();
    const pay = parseNumber(retirementPay);
    const nonTaxable = parseNumber(nonTaxablePay);
    const years = parseNumber(serviceYears);

    if (
      ![pay, nonTaxable, years].every(Number.isFinite) ||
      pay < 0 ||
      nonTaxable < 0 ||
      nonTaxable > pay ||
      !Number.isInteger(years) ||
      years < 1 ||
      years > 80
    ) {
      setError(
        ko
          ? "퇴직급여와 비과세 금액은 올바른 0 이상 금액으로, 근속연수는 1~80년의 정수로 입력하세요. 비과세 금액은 퇴직급여를 넘을 수 없습니다."
          : "Enter valid non-negative retirement amounts and a whole number of service years from 1 to 80. Non-taxable pay cannot exceed total retirement pay.",
      );
      setResult(undefined);
      return;
    }

    setError("");
    requestResultScroll();
    setResult(
      calculateRetirementIncomeTax({
        retirementPay: pay,
        nonTaxableRetirementPay: nonTaxable,
        serviceYears: years,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setRetirementPay("100000000");
    setNonTaxablePay("0");
    setServiceYears("20");
    setError("");
    setResult(undefined);
  }

  return (
    <section aria-labelledby="retirement-income-tax-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">
            {ko ? "세금" : "Tax"}
          </p>
          <h2
            id="retirement-income-tax-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {ko ? "퇴직급여 정보 입력" : "Enter retirement-pay details"}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
          <NumberField
            id="retirement-pay"
            label={ko ? "퇴직급여 총액 (KRW)" : "Total retirement pay (KRW)"}
            value={retirementPay}
            setValue={setRetirementPay}
          />
          <NumberField
            id="non-taxable-pay"
            label={
              ko
                ? "비과세 퇴직급여 (KRW)"
                : "Non-taxable retirement pay (KRW)"
            }
            value={nonTaxablePay}
            setValue={setNonTaxablePay}
          />
          <NumberField
            id="service-years"
            label={ko ? "정산 근속연수 (년)" : "Settlement service years"}
            value={serviceYears}
            setValue={setServiceYears}
          />
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {ko
              ? "단순 추정용입니다. 실제 원천징수에서는 근속월수의 연수 환산, 중간정산, 과세이연 등이 반영될 수 있습니다."
              : "This is an estimate. Actual withholding can reflect statutory conversion of service months, mid-service settlements, and tax deferral."}
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
          aria-labelledby="retirement-income-tax-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="retirement-income-tax-result-title"
            className="text-xl font-semibold"
          >
            {ko ? "예상 세액" : "Estimated tax"}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: ko ? "예상 총 세금" : "Estimated total tax",
                value: result ? money(result.totalTax) : "—",
                featured: true,
              },
              {
                label: ko ? "퇴직소득세" : "Retirement income tax",
                value: result ? money(result.retirementIncomeTax) : "—",
              },
              {
                label: ko ? "지방소득세" : "Local income tax",
                value: result ? money(result.localIncomeTax) : "—",
              },
              {
                label: ko ? "세후 퇴직급여" : "After-tax retirement pay",
                value: result ? money(result.afterTaxRetirementPay) : "—",
              },
            ]}
          />
          {result ? (
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <Detail
                label={ko ? "근속연수공제" : "Service-year deduction"}
                value={money(result.serviceYearsDeduction)}
              />
              <Detail
                label={ko ? "환산급여" : "Converted salary"}
                value={money(result.convertedSalary)}
              />
              <Detail
                label={ko ? "환산급여공제" : "Converted-salary deduction"}
                value={money(result.convertedSalaryDeduction)}
              />
              <Detail
                label={ko ? "퇴직소득 과세표준" : "Retirement tax base"}
                value={money(result.taxBase)}
              />
            </dl>
          ) : null}
        </section>
      </div>
    </section>
  );
}

function NumberField({
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
