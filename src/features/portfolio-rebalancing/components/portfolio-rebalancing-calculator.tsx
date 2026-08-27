"use client";

import { type FormEvent, useState } from "react";
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
  calculatePortfolioRebalancing,
  type PortfolioRebalancingResult,
} from "../calculate";
import {
  portfolioRebalancingContent,
  type PortfolioRebalancingLocale,
} from "../content";

const fieldClass =
  "h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: PortfolioRebalancingLocale) {
  const multiplier = locale === "ko" ? 1_000 : 1;
  return [
    { currentValue: `${6_000 * multiplier}`, targetWeightPercent: "50" },
    { currentValue: `${3_000 * multiplier}`, targetWeightPercent: "30" },
    { currentValue: `${1_000 * multiplier}`, targetWeightPercent: "20" },
    { currentValue: "0", targetWeightPercent: "0" },
  ];
}

export function PortfolioRebalancingCalculator({
  locale,
}: {
  locale: PortfolioRebalancingLocale;
}) {
  const copy = portfolioRebalancingContent[locale];
  const defaults = initialValues(locale);
  const [values, setValues] = useState(defaults);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<PortfolioRebalancingResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function number(value: string) {
    const parsed = Number(value.replaceAll(",", "").trim());
    return Number.isFinite(parsed) ? parsed : null;
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const assets = values.map((value) => ({
      currentValue: number(value.currentValue),
      targetWeightPercent: number(value.targetWeightPercent),
    }));
    const invalid =
      assets.some(
        (asset) =>
          asset.currentValue === null ||
          asset.currentValue < 0 ||
          asset.targetWeightPercent === null ||
          asset.targetWeightPercent < 0 ||
          asset.targetWeightPercent > 100,
      ) ||
      Math.abs(
        assets.reduce(
          (sum, asset) => sum + (asset.targetWeightPercent ?? 0),
          0,
        ) - 100,
      ) > 1e-8 ||
      assets.reduce((sum, asset) => sum + (asset.currentValue ?? 0), 0) <= 0;

    setError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculatePortfolioRebalancing({
        assets: assets.map((asset) => ({
          currentValue: asset.currentValue ?? 0,
          targetWeightPercent: asset.targetWeightPercent ?? 0,
        })),
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setValues(defaults);
    setError(false);
    setResult(undefined);
  }

  function updateValue(index: number, key: keyof (typeof values)[number], value: string) {
    setValues((current) =>
      current.map((asset, assetIndex) =>
        assetIndex === index
          ? {
              ...asset,
              [key]:
                key === "currentValue"
                  ? formatMoneyInput(value, asset.currentValue)
                  : value,
            }
          : asset,
      ),
    );
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);

  return (
    <section aria-labelledby="portfolio-rebalancing-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="portfolio-rebalancing-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          <div className="mt-4 space-y-3">
            {values.map((asset, index) => (
              <fieldset key={copy.assetNames[index]} className="rounded-lg border p-3">
                <legend className="px-1 text-sm font-medium">
                  {copy.assetNames[index]}
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-medium">
                    {copy.currentValue}
                    <input
                      inputMode="decimal"
                      value={asset.currentValue}
                      onChange={(event) =>
                        updateValue(index, "currentValue", event.target.value)
                      }
                      className={`${fieldClass} mt-1.5`}
                    />
                  </label>
                  <label className="text-sm font-medium">
                    {copy.targetWeight}
                    <div className="relative mt-1.5">
                      <input
                        inputMode="decimal"
                        value={asset.targetWeightPercent}
                        onChange={(event) =>
                          updateValue(
                            index,
                            "targetWeightPercent",
                            event.target.value,
                          )
                        }
                        className={`${fieldClass} pr-10`}
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </label>
                </div>
              </fieldset>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="portfolio-rebalancing-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="portfolio-rebalancing-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.totalValue,
                value: money(result?.totalPortfolioValue),
                featured: true,
              },
              { label: copy.totalBuy, value: money(result?.totalBuyAmount) },
              { label: copy.totalSell, value: money(result?.totalSellAmount) },
              {
                label: copy.turnover,
                value: result ? `${result.turnoverPercent.toFixed(2)}%` : "—",
              },
            ]}
          />
          <h3 className="mt-5 text-base font-semibold">{copy.allocation}</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-2 pr-3">{locale === "ko" ? "자산" : "Asset"}</th>
                  <th className="py-2 pr-3">{copy.currentWeight}</th>
                  <th className="py-2 pr-3">{copy.targetWeight}</th>
                  <th className="py-2 pr-3">{copy.targetValue}</th>
                  <th className="py-2">{copy.trade}</th>
                </tr>
              </thead>
              <tbody>
                {result?.assets.map((asset, index) => {
                  const action =
                    Math.abs(asset.tradeAmount) < 1e-8
                      ? copy.hold
                      : asset.tradeAmount > 0
                        ? copy.buy
                        : copy.sell;
                  return (
                    <tr key={copy.assetNames[index]} className="border-b last:border-0">
                      <th className="py-2 pr-3 text-left font-medium">
                        {copy.assetNames[index]}
                      </th>
                      <td className="py-2 pr-3 tabular-nums">
                        {asset.currentWeightPercent.toFixed(2)}%
                      </td>
                      <td className="py-2 pr-3 tabular-nums">
                        {asset.targetWeightPercent.toFixed(2)}%
                      </td>
                      <td className="py-2 pr-3 tabular-nums">
                        {money(asset.targetValue)}
                      </td>
                      <td className="py-2 tabular-nums">
                        {action} {money(Math.abs(asset.tradeAmount))}
                      </td>
                    </tr>
                  );
                }) ?? null}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
