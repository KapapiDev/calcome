"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import {
  CurrencySelector,
  formatDisplayCurrency,
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateDiscountSalePrice,
  type DiscountSalePriceResult,
} from "../calculate";
import {
  discountSalePriceContent,
  type DiscountSalePriceLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: DiscountSalePriceLocale) {
  return locale === "ko"
    ? {
        originalPrice: "120,000",
        discountRatePercent: "25",
        quantity: "3",
      }
    : {
        originalPrice: "120",
        discountRatePercent: "25",
        quantity: "3",
      };
}

export function DiscountSalePriceCalculator({
  locale,
}: {
  locale: DiscountSalePriceLocale;
}) {
  const copy = discountSalePriceContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<DiscountSalePriceResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  const parseMoney = (value: string) => Number(value.replaceAll(",", ""));
  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateDiscountSalePrice({
        originalPrice: parseMoney(values.originalPrice),
        discountRatePercent: Number(values.discountRatePercent),
        quantity: Number(values.quantity),
      });
      setHasError(false);
      requestResultScroll();
      setResult(next);
    } catch {
      setHasError(true);
      setResult(undefined);
    }
  }

  function reset() {
    cancelResultScroll();
    setValues(defaults);
    setHasError(false);
    setResult(undefined);
  }

  return (
    <section aria-labelledby="discount-sale-price-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="discount-sale-price-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {hasError ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          <div className="mt-4">
            <label htmlFor="originalPrice" className="block text-sm font-medium">
              {copy.originalPrice}
            </label>
            <div className="relative">
              <input
                id="originalPrice"
                inputMode="decimal"
                value={values.originalPrice}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    originalPrice: formatMoneyInput(
                      event.target.value,
                      current.originalPrice,
                    ),
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                {currency}
              </span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="discountRatePercent"
                className="block text-sm font-medium"
              >
                {copy.discountRatePercent}
              </label>
              <input
                id="discountRatePercent"
                inputMode="decimal"
                value={values.discountRatePercent}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    discountRatePercent: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium">
                {copy.quantity}
              </label>
              <input
                id="quantity"
                inputMode="numeric"
                value={values.quantity}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    quantity: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="discount-sale-price-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="discount-sale-price-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.salePricePerItem,
                value: money(result?.salePricePerItem),
                featured: true,
              },
              {
                label: copy.totalSalePrice,
                value: money(result?.totalSalePrice),
                featured: true,
              },
              {
                label: copy.savingsPerItem,
                value: money(result?.savingsPerItem),
              },
              {
                label: copy.totalSavings,
                value: money(result?.totalSavings),
              },
              {
                label: copy.totalOriginalPrice,
                value: money(result?.totalOriginalPrice),
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {copy.note}
          </p>
        </section>
      </div>
    </section>
  );
}
