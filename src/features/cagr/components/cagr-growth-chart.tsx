"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  COMPOUND_ANIMATION_DELAY,
  COMPOUND_ANIMATION_DURATION,
  COMPOUND_ANIMATION_EASING,
  usePrefersReducedMotion,
} from "@/features/compound-interest/components/compound-animation";
import type { DisplayCurrency } from "@/components/calculators/currency-selector";

import { formatCagrCurrency, formatCagrPercent } from "../format";
import { getCagrDictionary, type CagrLocale } from "../i18n";
import type { CagrGrowthRecord, CagrPeriodUnit } from "../types";

type ChartPoint = CagrGrowthRecord & { numericValue: number };

function chartData(records: readonly CagrGrowthRecord[]) {
  const step = Math.max(1, Math.ceil(records.length / 101));
  return records
    .filter(
      (record, index) =>
        index === 0 || index === records.length - 1 || index % step === 0,
    )
    .map((record) => ({ ...record, numericValue: Number(record.value) }));
}

function GrowthTooltip({
  active,
  point,
  locale,
  unit,
  currency,
}: {
  active?: boolean;
  point?: ChartPoint;
  locale: CagrLocale;
  unit: CagrPeriodUnit;
  currency: DisplayCurrency;
}) {
  if (!active || !point) return null;
  const copy = getCagrDictionary(locale);
  const suffix =
    unit === "years" ? copy.calculator.years : copy.calculator.months;
  return (
    <div className="rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg">
      <p className="font-semibold">
        {point.index} {suffix}
      </p>
      <p className="mt-2 tabular-nums">
        {formatCagrCurrency(point.value, locale, currency)}
      </p>
      <p className="mt-1 text-muted-foreground">
        {formatCagrPercent(point.growthPercent)}
      </p>
    </div>
  );
}

export function CagrGrowthChart({
  records,
  periodUnit,
  animationKey,
  locale,
  currency = "KRW",
}: {
  records?: readonly CagrGrowthRecord[];
  periodUnit: CagrPeriodUnit;
  animationKey: number;
  locale: CagrLocale;
  currency?: DisplayCurrency;
}) {
  const copy = getCagrDictionary(locale).chart;
  const data = chartData(records ?? []);
  const reducedMotion = usePrefersReducedMotion();
  const suffix =
    periodUnit === "years"
      ? getCagrDictionary(locale).calculator.years
      : getCagrDictionary(locale).calculator.months;
  const lastIndex = data.at(-1)?.index ?? 1;
  const tickStep = Math.max(1, Math.ceil(lastIndex / 6));
  const ticks = data
    .map((point) => point.index)
    .filter(
      (index) => index === 0 || index === lastIndex || index % tickStep === 0,
    );

  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <h2 id="cagr-chart-title" className="text-lg font-semibold">
        {copy.title}
      </h2>
      <p
        id="cagr-chart-description"
        className="mt-1 text-sm text-muted-foreground"
      >
        {copy.description}
      </p>
      <div
        className="mt-4 flex justify-center text-xs"
        aria-label={copy.legend}
      >
        <span className="flex items-center gap-2" data-series="estimated-value">
          <span
            className="size-2.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {copy.series}
        </span>
      </div>
      <div
        role="img"
        aria-labelledby="cagr-chart-title cagr-chart-description"
        className="mt-4 h-[300px] min-w-0"
        data-testid="cagr-growth-chart"
        data-animation-active={Boolean(data.length) && !reducedMotion}
        data-animation-duration={COMPOUND_ANIMATION_DURATION}
        data-animation-run={animationKey}
      >
        {data.length ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 4, left: 4 }}
              accessibilityLayer
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="3 5"
              />
              <XAxis
                dataKey="index"
                type="number"
                domain={[0, "dataMax"]}
                ticks={ticks}
                tickFormatter={(value) => `${value}${suffix}`}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                width={58}
                tickCount={5}
                tickFormatter={(value) =>
                  new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
                    style: "currency",
                    currency,
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(Number(value))
                }
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                animationDuration={0}
                content={({ active, payload }) => (
                  <GrowthTooltip
                    active={active}
                    point={payload?.[0]?.payload as ChartPoint | undefined}
                    locale={locale}
                    unit={periodUnit}
                    currency={currency}
                  />
                )}
              />
              <Line
                key={animationKey}
                dataKey="numericValue"
                name={copy.series}
                type="monotone"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={!reducedMotion}
                animationBegin={COMPOUND_ANIMATION_DELAY}
                animationDuration={COMPOUND_ANIMATION_DURATION}
                animationEasing={COMPOUND_ANIMATION_EASING}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border bg-muted/10 px-6 text-center text-sm text-muted-foreground">
            {copy.empty}
          </div>
        )}
      </div>
    </section>
  );
}
