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
  calculateEarnedIncomeWithholdingTax,
  type EarnedIncomeWithholdingTaxResult,
  type WithholdingRate,
} from "../calculate";
import type { EarnedIncomeWithholdingTaxLocale } from "../metadata";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function EarnedIncomeWithholdingTaxCalculator({
  locale,
}: {
  locale: EarnedIncomeWithholdingTaxLocale;
}) {
  const ko = locale === "ko";
  const [salary, setSalary] = useState("3500000");
  const [dependents, setDependents] = useState("4");
  const [children, setChildren] = useState("2");
  const [rate, setRate] = useState<WithholdingRate>(100);
  const [error, setError] = useState("");
  const [result, setResult] = useState<EarnedIncomeWithholdingTaxResult>();
  const { resultRef, noteNumericInputFocus, requestResultScroll, cancelResultScroll } =
    useStableResultScroll(result ?? null);

  const money = (value: number) =>
    `${Math.round(value).toLocaleString(ko ? "ko-KR" : "en-US")} KRW`;

  function submit(event: FormEvent) {
    event.preventDefault();
    const monthlyTaxableSalary = Number(salary.replaceAll(",", ""));
    const dependentCount = Number(dependents);
    const eligibleChildren = Number(children);

    if (
      ![monthlyTaxableSalary, dependentCount, eligibleChildren].every(Number.isFinite) ||
      monthlyTaxableSalary < 0 ||
      !Number.isInteger(dependentCount) ||
      dependentCount < 1 ||
      dependentCount > 30 ||
      !Number.isInteger(eligibleChildren) ||
      eligibleChildren < 0 ||
      eligibleChildren > dependentCount
    ) {
      setError(
        ko
          ? "월 과세급여는 0원 이상, 공제대상 가족 수는 본인을 포함한 1~30명의 정수로 입력하세요. 8~20세 자녀 수는 가족 수를 넘을 수 없습니다."
          : "Enter non-negative taxable salary, 1–30 qualifying dependents including yourself, and an eligible-child count no greater than the dependent count.",
      );
      setResult(undefined);
      return;
    }

    setError("");
    requestResultScroll();
    setResult(
      calculateEarnedIncomeWithholdingTax({
        monthlyTaxableSalary,
        dependents: dependentCount,
        eligibleChildren,
        withholdingRate: rate,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setSalary("3500000");
    setDependents("4");
    setChildren("2");
    setRate(100);
    setError("");
    setResult(undefined);
  }

  return (
    <section aria-labelledby="earned-withholding-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{ko ? "급여·세금" : "Payroll tax"}</p>
          <h2 id="earned-withholding-input-title" className="mt-1 text-xl font-semibold">
            {ko ? "원천징수 조건 입력" : "Enter withholding details"}
          </h2>
          {error ? <p role="alert" className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{error}</p> : null}
          <NumberField id="monthly-taxable-salary" label={ko ? "월 과세급여 (KRW)" : "Monthly taxable salary (KRW)"} value={salary} setValue={setSalary} />
          <NumberField id="dependents" label={ko ? "공제대상 가족 수 (본인 포함)" : "Qualifying dependents (including you)"} value={dependents} setValue={setDependents} />
          <NumberField id="eligible-children" label={ko ? "8~20세 자녀 수" : "Children aged 8–20"} value={children} setValue={setChildren} />
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="withholding-rate">
              {ko ? "간이세액표 선택 비율" : "Withholding election"}
            </label>
            <select id="withholding-rate" className={fieldClass} value={rate} onChange={(event) => setRate(Number(event.target.value) as WithholdingRate)}>
              <option value={80}>80%</option>
              <option value={100}>100%</option>
              <option value={120}>120%</option>
            </select>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {ko
              ? "과세급여는 비과세소득 등을 제외한 월 급여 기준입니다. 실제 급여명세서는 회사의 신고 정보와 적용 시점에 따라 달라질 수 있습니다."
              : "Taxable salary excludes non-taxable income. Actual payroll withholding can differ based on employer records and the applicable period."}
          </p>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{ko ? "계산하기" : "Calculate"}</Button>
            <Button type="button" variant="outline" onClick={reset}>{ko ? "초기화" : "Reset"}</Button>
          </div>
        </form>

        <section ref={resultRef} aria-labelledby="earned-withholding-result-title" className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm">
          <h2 id="earned-withholding-result-title" className="text-xl font-semibold">{ko ? "월 원천징수 예상액" : "Estimated monthly withholding"}</h2>
          <PrimaryResults
            metrics={[
              { label: ko ? "소득세+지방소득세" : "Income + local income tax", value: result ? money(result.totalWithholding) : "—", featured: true },
              { label: ko ? "근로소득세" : "Income tax", value: result ? money(result.incomeTax) : "—" },
              { label: ko ? "지방소득세" : "Local income tax", value: result ? money(result.localIncomeTax) : "—" },
              { label: ko ? "자녀 조정 전 간이세액" : "Table tax before child adjustment", value: result ? money(result.baseTableTax) : "—" },
            ]}
          />
          {result ? (
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <Detail label={ko ? "8~20세 자녀 조정액" : "Child adjustment"} value={money(result.childTaxAdjustment)} />
              <Detail label={ko ? "선택 비율 적용 전 세액" : "Tax before election"} value={money(result.adjustedTableTax)} />
            </dl>
          ) : null}
        </section>
      </div>
    </section>
  );
}

function NumberField({ id, label, value, setValue }: { id: string; label: string; value: string; setValue: (value: string) => void }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium" htmlFor={id}>{label}</label>
      <input id={id} inputMode="numeric" className={fieldClass} value={value} onChange={(event) => setValue(event.target.value)} />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border p-3"><dt className="text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold tabular-nums">{value}</dd></div>;
}
