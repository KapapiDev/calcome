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
  calculateCurrencyConversion,
  type CurrencyConversionResult,
} from "../calculate";
import type { CurrencyConversionLocale } from "../metadata";

const currencies = ["USD", "EUR", "GBP", "JPY", "KRW", "CAD", "AUD"] as const;

type CurrencyCode = (typeof currencies)[number];

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function CurrencyConversionCalculator({
  locale,
}: {
  locale: CurrencyConversionLocale;
}) {
  const ko = locale === "ko";
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("1.25");
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>("USD");
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencyCode>(
    ko ? "KRW" : "EUR",
  );
  const [error, setError] = useState("");
  const [result, setResult] = useState<CurrencyConversionResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const parsedAmount = Number(amount.replaceAll(",", ""));
    const parsedRate = Number(rate.replaceAll(",", ""));
    if (
      !Number.isFinite(parsedAmount) ||
      parsedAmount < 0 ||
      !Number.isFinite(parsedRate) ||
      parsedRate <= 0
    ) {
      setError(
        ko
          ? "금액은 0 이상, 환율은 0보다 큰 숫자로 입력하세요."
          : "Enter an amount of 0 or more and an exchange rate greater than 0.",
      );
      setResult(undefined);
      return;
    }
    if (baseCurrency === quoteCurrency) {
      setError(
        ko
          ? "서로 다른 두 통화를 선택하세요."
          : "Choose two different currencies.",
      );
      setResult(undefined);
      return;
    }
    setError("");
    requestResultScroll();
    setResult(
      calculateCurrencyConversion({ amount: parsedAmount, rate: parsedRate }),
    );
  }

  function reset() {
    cancelResultScroll();
    setAmount("100");
    setRate("1.25");
    setBaseCurrency("USD");
    setQuoteCurrency(ko ? "KRW" : "EUR");
    setError("");
    setResult(undefined);
  }

  const numberLocale = ko ? "ko-KR" : "en-US";
  const converted = result
    ? `${result.convertedAmount.toLocaleString(numberLocale, {
        maximumFractionDigits: 6,
      })} ${quoteCurrency}`
    : "—";
  const inverse = result
    ? `1 ${quoteCurrency} = ${result.inverseRate.toLocaleString(numberLocale, {
        maximumFractionDigits: 8,
      })} ${baseCurrency}`
    : "—";

  return (
    <section aria-labelledby="currency-conversion-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">
            {ko ? "사업·생활" : "Business & everyday"}
          </p>
          <h2
            id="currency-conversion-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {ko ? "변환 조건" : "Conversion inputs"}
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
            htmlFor="currency-amount"
          >
            {ko ? "변환할 금액" : "Amount to convert"}
          </label>
          <input
            id="currency-amount"
            inputMode="decimal"
            className={fieldClass}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

          <div className="mt-4 grid grid-cols-2 gap-3">
            <CurrencySelect
              id="base-currency"
              label={ko ? "기준 통화" : "Base currency"}
              value={baseCurrency}
              onChange={setBaseCurrency}
            />
            <CurrencySelect
              id="quote-currency"
              label={ko ? "변환 통화" : "Quote currency"}
              value={quoteCurrency}
              onChange={setQuoteCurrency}
            />
          </div>

          <label
            className="mt-4 block text-sm font-medium"
            htmlFor="currency-rate"
          >
            {ko
              ? `환율 (1 ${baseCurrency} = ? ${quoteCurrency})`
              : `Exchange rate (1 ${baseCurrency} = ? ${quoteCurrency})`}
          </label>
          <input
            id="currency-rate"
            inputMode="decimal"
            className={fieldClass}
            value={rate}
            onChange={(event) => setRate(event.target.value)}
          />
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {ko
              ? "이 계산기는 실시간 환율을 가져오지 않습니다. 은행·카드사·공식 환율 제공처에서 확인한 환율을 직접 입력하세요."
              : "This calculator does not fetch a live FX rate. Enter a rate verified with your bank, card provider, or another authoritative rate source."}
          </p>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{ko ? "변환하기" : "Convert"}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {ko ? "초기화" : "Reset"}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="currency-conversion-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="currency-conversion-result-title"
            className="text-xl font-semibold"
          >
            {ko ? "변환 결과" : "Conversion result"}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: ko ? "변환 금액" : "Converted amount",
                value: converted,
                featured: true,
              },
              { label: ko ? "역환율" : "Inverse rate", value: inverse },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {ko
              ? "실제 결제·송금 금액은 스프레드, 수수료, 적용 시점에 따라 달라질 수 있습니다."
              : "Actual payment or transfer amounts can differ because of spreads, fees, and the time the provider applies its rate."}
          </p>
        </section>
      </div>
    </section>
  );
}

function CurrencySelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={fieldClass}
        value={value}
        onChange={(event) => onChange(event.target.value as CurrencyCode)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
