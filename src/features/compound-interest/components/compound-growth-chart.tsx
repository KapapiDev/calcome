"use client";

import Decimal from "decimal.js";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DisplayCurrency } from "@/components/calculators/currency-selector";

import { formatCompoundCurrency } from "../format";
import { getCompoundDictionary, type CompoundLocale } from "../i18n";
import type { YearlyCompoundInterestRecord } from "../types";
import {
  COMPOUND_ANIMATION_DELAY,
  COMPOUND_ANIMATION_DURATION,
  COMPOUND_ANIMATION_EASING,
  usePrefersReducedMotion,
} from "./compound-animation";

export const GROWTH_LINE_ANIMATION_DURATION = COMPOUND_ANIMATION_DURATION;
export const GROWTH_LINE_ANIMATION_EASING = COMPOUND_ANIMATION_EASING;

export type CompoundGrowthPoint = {
  year: number;
  principal: number;
  assets: number;
  interest: number;
  principalValue: string;
  assetsValue: string;
  interestValue: string;
};

export function createGrowthChartData(
  records: readonly YearlyCompoundInterestRecord[],
): CompoundGrowthPoint[] {
  return records.map((record) => ({
    year: record.year,
    principal: Number(record.cumulativePrincipal),
    assets: Number(record.netBalance),
    principalValue: record.cumulativePrincipal,
    assetsValue: record.netBalance,
    interest: Number(
      new Decimal(record.netBalance).minus(record.cumulativePrincipal),
    ),
    interestValue: new Decimal(record.netBalance)
      .minus(record.cumulativePrincipal)
      .toString(),
  }));
}

export function getYearTicks(points: readonly CompoundGrowthPoint[]): number[] {
  if (points.length <= 7) return points.map((point) => point.year);
  const lastYear = points.at(-1)?.year ?? 1;
  const step = Math.ceil(lastYear / 6);
  return points
    .map((point) => point.year)
    .filter((year) => year === 1 || year === lastYear || year % step === 0);
}

export function CompoundGrowthTooltip({
  active,
  point,
  locale = "ko",
  currency = "KRW",
}: {
  active?: boolean;
  point?: CompoundGrowthPoint;
  locale?: CompoundLocale;
  currency?: DisplayCurrency;
}) {
  if (!active || !point) return null;
  const copy = getCompoundDictionary(locale).chart;
  return (
    <div className="rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg">
      <p className="font-semibold">
        {point.year}
        {locale === "ko" ? "년" : ""}
      </p>
      <dl className="mt-2 grid gap-1.5 tabular-nums">
        <div className="flex justify-between gap-5">
          <dt className="text-muted-foreground">{copy.tooltipPrincipal}</dt>
          <dd>
            {formatCompoundCurrency(point.principalValue, locale, currency)}
          </dd>
        </div>
        <div className="flex justify-between gap-5">
          <dt className="text-muted-foreground">{copy.tooltipAssets}</dt>
          <dd>{formatCompoundCurrency(point.assetsValue, locale, currency)}</dd>
        </div>
        <div className="flex justify-between gap-5">
          <dt className="text-muted-foreground">{copy.tooltipInterest}</dt>
          <dd>
            {formatCompoundCurrency(point.interestValue, locale, currency)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function CompoundGrowthChart({
  records,
  animationKey = 0,
  locale = "ko",
  currency = "KRW",
}: {
  records?: readonly YearlyCompoundInterestRecord[];
  animationKey?: number;
  locale?: CompoundLocale;
  currency?: DisplayCurrency;
}) {
  const copy = getCompoundDictionary(locale).chart;
  const growthSeries = [
    {
      dataKey: "principal",
      name: copy.seriesPrincipal,
      stroke: "var(--chart-2)",
      strokeWidth: 2,
    },
    {
      dataKey: "interest",
      name: copy.seriesInterest,
      stroke: "var(--chart-3)",
      strokeWidth: 2,
    },
    {
      dataKey: "assets",
      name: copy.seriesAssets,
      stroke: "var(--primary)",
      strokeWidth: 3,
    },
  ] as const;
  const data = createGrowthChartData(records ?? []);
  const ticks = getYearTicks(data);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <h2
        id="growth-chart-title"
        className="text-lg font-semibold tracking-tight"
      >
        {copy.title}
      </h2>
      <p id="growth-chart-description" className="sr-only">
        {copy.description}
      </p>
      <div
        className="mt-5 flex flex-wrap justify-center gap-6 text-xs"
        aria-label={copy.legend}
      >
        <span className="flex items-center gap-2" data-series="assets">
          <span
            className="size-2.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {copy.legendAssets}
        </span>
        <span className="flex items-center gap-2" data-series="principal">
          <span
            className="size-2.5 rounded-full bg-chart-2"
            aria-hidden="true"
          />
          {copy.legendPrincipal}
        </span>
        <span className="flex items-center gap-2" data-series="interest">
          <span
            className="size-2.5 rounded-full bg-chart-3"
            aria-hidden="true"
          />
          {copy.legendInterest}
        </span>
      </div>
      <div
        role="img"
        aria-labelledby="growth-chart-title growth-chart-description"
        className="mt-4 h-[300px] min-w-0"
        data-testid="compound-growth-chart"
        data-animation-active={
          Boolean(records?.length) && !prefersReducedMotion
        }
        data-animation-duration={GROWTH_LINE_ANIMATION_DURATION}
        data-animation-easing={GROWTH_LINE_ANIMATION_EASING}
        data-animation-run={animationKey}
      >
        {records?.length ? (
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
                dataKey="year"
                type="number"
                domain={[1, "dataMax"]}
                ticks={ticks}
                tickFormatter={(year) =>
                  `${year}${locale === "ko" ? "년" : ""}`
                }
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
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
                cursor={{
                  stroke: "var(--muted-foreground)",
                  strokeDasharray: "3 3",
                }}
                animationDuration={0}
                content={({ active, payload }) => (
                  <CompoundGrowthTooltip
                    active={active}
                    locale={locale}
                    currency={currency}
                    point={
                      payload?.[0]?.payload as CompoundGrowthPoint | undefined
                    }
                  />
                )}
              />
              {growthSeries.map((series) => (
                <Line
                  key={`${animationKey}-${series.dataKey}`}
                  dataKey={series.dataKey}
                  name={series.name}
                  type="monotone"
                  stroke={series.stroke}
                  strokeWidth={series.strokeWidth}
                  dot={false}
                  activeDot={{ r: 4 }}
                  isAnimationActive={!prefersReducedMotion}
                  animationBegin={COMPOUND_ANIMATION_DELAY}
                  animationDuration={GROWTH_LINE_ANIMATION_DURATION}
                  animationEasing={GROWTH_LINE_ANIMATION_EASING}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-muted/10 px-6 text-center text-sm leading-6 text-muted-foreground">
            <span className="mb-4 flex h-9 items-end gap-1" aria-hidden="true">
              <span className="h-3 w-1.5 border border-foreground/70" />
              <span className="h-6 w-1.5 border border-foreground/70" />
              <span className="h-9 w-1.5 border border-foreground/70" />
            </span>
            {copy.empty}
          </div>
        )}
      </div>
    </section>
  );
}
