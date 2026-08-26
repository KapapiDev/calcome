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
  calculateDailyWorkerPay,
  type DailyWorkerPayResult,
} from "../calculate";
import type { DailyWorkerPayLocale } from "../metadata";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function DailyWorkerPayCalculator({
  locale,
}: {
  locale: DailyWorkerPayLocale;
}) {
  const ko = locale === "ko";
  const [dailyGrossPay, setDailyGrossPay] = useState("200,000");
  const [workDays, setWorkDays] = useState("5");
  const [nonTaxableDailyPay, setNonTaxableDailyPay] = useState("0");
  const [error, setError] = useState("");
  const [result, setResult] = useState<DailyWorkerPayResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  const money = (value: number) =>
    `${Math.round(value).toLocaleString(ko ? "ko-KR" : "en-US")} KRW`;

  function parseMoney(value: string) {
    return Number(value.replaceAll(",", "").trim());
  }

  function submit(event: FormEvent) {
    event.preventDefault();

    try {
      const next = calculateDailyWorkerPay({
        dailyGrossPay: parseMoney(dailyGrossPay),
        workDays: Number(workDays),
        nonTaxableDailyPay: parseMoney(nonTaxableDailyPay),
      });
      setError("");
      requestResultScroll();
      setResult(next);
    } catch {
      setError(
        ko
          ? "일당과 비과세 금액은 0원 이상의 정수로, 근무일수는 1~366일의 정수로 입력하세요. 일별 비과세 금액은 일당을 넘을 수 없습니다."
          : "Enter whole-KRW amounts of zero or more and 1–366 whole workdays. Daily non-taxable pay cannot exceed daily gross pay.",
      );
      setResult(undefined);
    }
  }

  function reset() {
    cancelResultScroll();
    setDailyGrossPay("200,000");
    setWorkDays("5");
    setNonTaxableDailyPay("0");
    setError("");
    setResult(undefined);
  }

  return (
    <section aria-labelledby="daily-worker-pay-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">
            {ko ? "급여·근로" : "Pay & Work"}
          </p>
          <h2
            id="daily-worker-pay-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {ko ? "일용직 급여 조건" : "Daily-worker pay details"}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
          <MoneyField
            id="daily-gross-pay"
            label={ko ? "일당 (KRW)" : "Daily gross pay (KRW)"}
            value={dailyGrossPay}
            setValue={setDailyGrossPay}
          />
          <NumberField
            id="work-days"
            label={
              ko ? "한 번에 지급하는 근무일수" : "Workdays in this payment"
            }
            value={workDays}
            setValue={setWorkDays}
          />
          <MoneyField
            id="non-taxable-daily-pay"
            label={
              ko ? "일별 비과세 금액 (KRW)" : "Daily non-taxable pay (KRW)"
            }
            value={nonTaxableDailyPay}
            setValue={setNonTaxableDailyPay}
          />
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {ko
              ? "같은 일당을 입력한 근무일수만큼 한 번에 지급한다고 가정합니다. 4대보험·고용보험 등 사회보험 공제는 포함하지 않습니다."
              : "The calculator assumes the same daily pay for all entered workdays and that those days are paid together. Social-insurance deductions are excluded."}
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
          aria-labelledby="daily-worker-pay-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="daily-worker-pay-result-title"
            className="text-xl font-semibold"
          >
            {ko ? "예상 지급 결과" : "Estimated payment"}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: ko ? "예상 실수령액" : "Estimated net pay",
                value: result ? money(result.estimatedNetPay) : "—",
                featured: true,
              },
              {
                label: ko ? "총 지급액" : "Total gross pay",
                value: result ? money(result.totalGrossPay) : "—",
              },
              {
                label: ko ? "소득세" : "Income tax",
                value: result ? money(result.incomeTax) : "—",
              },
              {
                label: ko ? "지방소득세" : "Local income tax",
                value: result ? money(result.localIncomeTax) : "—",
              },
            ]}
          />
          {result ? (
            <>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <Detail
                  label={ko ? "일별 과세급여" : "Taxable daily pay"}
                  value={money(result.taxableDailyPay)}
                />
                <Detail
                  label={
                    ko
                      ? "소액부징수 전 일별 소득세"
                      : "Daily income tax before small-collection rule"
                  }
                  value={money(result.dailyIncomeTaxBeforeSmallCollection)}
                />
                <Detail
                  label={ko ? "총 원천징수" : "Total withholding"}
                  value={money(result.totalWithholding)}
                />
                <Detail
                  label={
                    ko ? "총 비과세 입력액" : "Total entered non-taxable pay"
                  }
                  value={money(result.totalNonTaxablePay)}
                />
              </dl>
              {result.smallCollectionExemptionApplied ? (
                <p className="mt-4 rounded-lg border p-3 text-sm leading-6 text-muted-foreground">
                  {ko
                    ? "이번 지급 건의 계산상 소득세가 1,000원 미만이어서 소액부징수 규칙을 적용해 소득세와 지방소득세를 0원으로 표시했습니다."
                    : "The calculated income tax for this payment is under KRW 1,000, so the small-collection rule is applied and both income and local income tax are shown as KRW 0."}
                </p>
              ) : null}
            </>
          ) : null}
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
        onChange={(event) =>
          setValue(formatMoneyInput(event.target.value, value))
        }
      />
    </div>
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
