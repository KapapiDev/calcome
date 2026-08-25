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
  calculateYearEndTaxRefund,
  type YearEndTaxRefundResult,
} from "../calculate";
import type { YearEndTaxRefundLocale } from "../metadata";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function YearEndTaxRefundCalculator({
  locale,
}: {
  locale: YearEndTaxRefundLocale;
}) {
  const ko = locale === "ko";
  const [determinedTax, setDeterminedTax] = useState("1200000");
  const [prepaidTax, setPrepaidTax] = useState("1500000");
  const [specialPaymentTax, setSpecialPaymentTax] = useState("0");
  const [error, setError] = useState("");
  const [result, setResult] = useState<YearEndTaxRefundResult>();
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
    const determined = parseMoney(determinedTax);
    const prepaid = parseMoney(prepaidTax);
    const special = parseMoney(specialPaymentTax);

    if (
      ![determined, prepaid, special].every(Number.isFinite) ||
      determined < 0 ||
      prepaid < 0 ||
      special < 0
    ) {
      setError(
        ko
          ? "세액은 0 이상의 숫자로 입력하세요."
          : "Enter tax amounts as numbers of 0 or more.",
      );
      setResult(undefined);
      return;
    }

    setError("");
    requestResultScroll();
    setResult(
      calculateYearEndTaxRefund({
        determinedIncomeTax: determined,
        prepaidIncomeTax: prepaid,
        specialPaymentTax: special,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setDeterminedTax("1200000");
    setPrepaidTax("1500000");
    setSpecialPaymentTax("0");
    setError("");
    setResult(undefined);
  }

  return (
    <section aria-labelledby="year-end-tax-refund-input-title">
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
            id="year-end-tax-refund-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {ko
              ? "원천징수영수증 세액 입력"
              : "Enter withholding-certificate tax amounts"}
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
            id="determined-tax"
            label={
              ko ? "결정세액 (소득세, KRW)" : "Determined income tax (KRW)"
            }
            value={determinedTax}
            setValue={setDeterminedTax}
          />
          <MoneyField
            id="prepaid-tax"
            label={ko ? "기납부세액 (KRW)" : "Prepaid income tax (KRW)"}
            value={prepaidTax}
            setValue={setPrepaidTax}
          />
          <MoneyField
            id="special-payment-tax"
            label={ko ? "납부특례세액 (KRW)" : "Special-payment tax (KRW)"}
            value={specialPaymentTax}
            setValue={setSpecialPaymentTax}
          />
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {ko
              ? "국세청 계산 구조의 소득세 기준입니다. 지방소득세 등은 별도로 확인하세요."
              : "This follows the National Tax Service income-tax settlement structure. Local income tax and other amounts are separate."}
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
          aria-labelledby="year-end-tax-refund-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="year-end-tax-refund-result-title"
            className="text-xl font-semibold"
          >
            {ko ? "연말정산 결과" : "Settlement result"}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: ko ? "예상 환급액" : "Estimated refund",
                value: result ? money(result.refundAmount) : "—",
                featured: true,
              },
              {
                label: ko ? "추가 납부액" : "Additional payment",
                value: result ? money(result.additionalPayment) : "—",
              },
              {
                label: ko ? "차감납부·환급세액" : "Settlement tax",
                value: result ? money(result.settlementTax) : "—",
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {ko
              ? "결과가 음수이면 그 절대값만큼 환급, 양수이면 추가 납부가 예상됩니다. 실제 지급·징수 시점과 금액은 원천징수의무자의 최종 정산을 확인하세요."
              : "A negative settlement means a refund of the absolute amount; a positive settlement means additional tax due. Confirm the final amount and timing with your withholding agent."}
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
