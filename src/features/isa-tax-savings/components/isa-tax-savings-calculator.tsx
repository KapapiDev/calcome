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
  calculateIsaTaxSavings,
  type IsaTaxSavingsAccountType,
  type IsaTaxSavingsResult,
} from "../calculate";
import type { IsaTaxSavingsLocale } from "../metadata";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function IsaTaxSavingsCalculator({
  locale,
}: {
  locale: IsaTaxSavingsLocale;
}) {
  const ko = locale === "ko";
  const [accountType, setAccountType] =
    useState<IsaTaxSavingsAccountType>("general");
  const [netProfit, setNetProfit] = useState("10000000");
  const [error, setError] = useState("");
  const [result, setResult] = useState<IsaTaxSavingsResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const profit = Number(netProfit.replaceAll(",", ""));
    if (!Number.isFinite(profit) || profit < 0) {
      setError(
        ko
          ? "ISA 손익통산 후 순이익을 0 이상의 숫자로 입력하세요."
          : "Enter ISA net profit after loss offsetting as a number of 0 or more.",
      );
      setResult(undefined);
      return;
    }

    setError("");
    requestResultScroll();
    setResult(calculateIsaTaxSavings({ accountType, netProfit: profit }));
  }

  function reset() {
    cancelResultScroll();
    setAccountType("general");
    setNetProfit("10000000");
    setError("");
    setResult(undefined);
  }

  const money = (value: number) =>
    `${Math.round(value).toLocaleString(ko ? "ko-KR" : "en-US")} KRW`;

  return (
    <section aria-labelledby="isa-tax-savings-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">
            {ko ? "투자" : "Investment"}
          </p>
          <h2
            id="isa-tax-savings-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {ko ? "ISA 조건" : "ISA inputs"}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}

          <label
            className="mt-4 block text-sm font-medium"
            htmlFor="account-type"
          >
            {ko ? "가입 유형" : "Account eligibility"}
          </label>
          <select
            id="account-type"
            className={fieldClass}
            value={accountType}
            onChange={(event) =>
              setAccountType(event.target.value as IsaTaxSavingsAccountType)
            }
          >
            <option value="general">
              {ko ? "일반형 (비과세 200만원)" : "General (KRW 2M tax-free)"}
            </option>
            <option value="special">
              {ko
                ? "서민형·농어민형 (비과세 400만원)"
                : "Eligible low-income / farmer type (KRW 4M tax-free)"}
            </option>
          </select>

          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="net-profit">
              {ko
                ? "손익통산 후 순이익 (KRW)"
                : "Net profit after loss offsetting (KRW)"}
            </label>
            <input
              id="net-profit"
              inputMode="numeric"
              className={fieldClass}
              value={netProfit}
              onChange={(event) => setNetProfit(event.target.value)}
            />
          </div>

          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {ko
              ? "2026-08-26 확인 기준입니다. ISA는 계좌 내 손익을 통산한 순이익에 비과세 한도를 적용하고, 초과분은 지방소득세 포함 9.9%로 계산합니다."
              : "Verified Aug 26, 2026. ISA applies its tax-free allowance to net profit after account-level loss offsetting; profit above the allowance is calculated at 9.9% including local income tax."}
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
          aria-labelledby="isa-tax-savings-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="isa-tax-savings-result-title"
            className="text-xl font-semibold"
          >
            {ko ? "예상 절세 결과" : "Estimated tax savings"}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: ko ? "예상 절세액" : "Estimated tax savings",
                value: result ? money(result.taxSavings) : "—",
                featured: true,
              },
              {
                label: ko ? "ISA 예상 세금" : "Estimated ISA tax",
                value: result ? money(result.isaTax) : "—",
              },
              {
                label: ko ? "비과세 적용액" : "Tax-free profit",
                value: result
                  ? money(
                      Math.min(
                        Number(netProfit.replaceAll(",", "")) || 0,
                        result.taxFreeLimit,
                      ),
                    )
                  : "—",
              },
              {
                label: ko ? "일반 과세 비교액" : "Ordinary-tax comparison",
                value: result ? money(result.ordinaryTax) : "—",
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {ko
              ? "일반 과세 비교액은 동일한 순이익에 통상적인 이자·배당 원천징수 15.4%가 적용된다고 가정한 단순 비교입니다. 실제 세금은 상품별 과세 여부, 금융소득종합과세, 계좌 요건과 중도해지 사유 등에 따라 달라질 수 있습니다."
              : "The ordinary-tax comparison assumes the same profit is subject to the usual 15.4% interest/dividend withholding. Actual tax can differ by asset tax treatment, comprehensive financial-income taxation, ISA eligibility, and withdrawal or termination circumstances."}
          </p>
        </section>
      </div>
    </section>
  );
}
