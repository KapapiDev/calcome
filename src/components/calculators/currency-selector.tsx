"use client";

import { useSyncExternalStore } from "react";

export const supportedCurrencies = [
  "USD",
  "GBP",
  "EUR",
  "CAD",
  "AUD",
  "KRW",
  "JPY",
] as const;
export type DisplayCurrency = (typeof supportedCurrencies)[number];
type CurrencyLocale = "ko" | "en";

const storageKey = "calcome.currency";
const changeEvent = "calcome-currency-change";

function defaultCurrency(locale: CurrencyLocale): DisplayCurrency {
  return locale === "ko" ? "KRW" : "USD";
}

function storedCurrency(locale: CurrencyLocale): DisplayCurrency {
  const value = window.localStorage.getItem(storageKey);
  return supportedCurrencies.includes(value as DisplayCurrency)
    ? (value as DisplayCurrency)
    : defaultCurrency(locale);
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(changeEvent, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(changeEvent, onStoreChange);
  };
}

export function useDisplayCurrency(locale: CurrencyLocale) {
  const currency = useSyncExternalStore(
    subscribe,
    () => storedCurrency(locale),
    () => defaultCurrency(locale),
  );
  return {
    currency,
    setCurrency(nextCurrency: DisplayCurrency) {
      window.localStorage.setItem(storageKey, nextCurrency);
      window.dispatchEvent(new Event(changeEvent));
    },
  };
}

export function CurrencySelector({ locale }: { locale: CurrencyLocale }) {
  const { currency, setCurrency } = useDisplayCurrency(locale);
  return (
    <div className="mt-4">
      <label htmlFor="currency" className="block text-sm font-medium">
        {locale === "ko" ? "표시 통화" : "Display currency"}
      </label>
      <select
        id="currency"
        value={currency}
        onChange={(event) => setCurrency(event.target.value as DisplayCurrency)}
        className="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:text-sm"
      >
        {supportedCurrencies.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {locale === "ko"
          ? "통화 선택은 기호와 표시 형식만 바꾸며 환율을 변환하지 않습니다."
          : "Currency selection changes symbols and formatting only; it does not convert exchange rates."}
      </p>
    </div>
  );
}

export function formatDisplayCurrency(
  value: number,
  locale: CurrencyLocale,
  currency: DisplayCurrency,
) {
  return value.toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });
}
