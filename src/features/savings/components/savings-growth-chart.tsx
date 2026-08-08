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

import {
  COMPOUND_ANIMATION_DELAY,
  COMPOUND_ANIMATION_DURATION,
  COMPOUND_ANIMATION_EASING,
  usePrefersReducedMotion,
} from "@/features/compound-interest/components/compound-animation";
import type { DisplayCurrency } from "@/components/calculators/currency-selector";

import { formatSavingsCurrency } from "../format";
import { getSavingsDictionary, type SavingsLocale } from "../i18n";
import type { SavingsScheduleRow } from "../types";

export type SavingsGrowthPoint = {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  principalValue: string;
  interestValue: string;
  balanceValue: string;
};

export function createSavingsGrowthData(
  schedule: readonly SavingsScheduleRow[],
): SavingsGrowthPoint[] {
  return schedule.map((row) => {
    const interest = new Decimal(row.grossBalance).minus(
      row.cumulativePrincipal,
    );
    return {
      month: row.month,
      principal: Number(row.cumulativePrincipal),
      interest: Number(interest),
      balance: Number(row.grossBalance),
      principalValue: row.cumulativePrincipal,
      interestValue: interest.toString(),
      balanceValue: row.grossBalance,
    };
  });
}

export function getMonthTicks(points: readonly SavingsGrowthPoint[]) {
  if (points.length <= 7) return points.map((point) => point.month);
  const last = points.at(-1)?.month ?? 1;
  const step = Math.ceil(last / 6);
  return points
    .map((point) => point.month)
    .filter((month) => month === 1 || month === last || month % step === 0);
}

function SavingsTooltip({
  active,
  point,
  locale,
  currency,
}: {
  active?: boolean;
  point?: SavingsGrowthPoint;
  locale: SavingsLocale;
  currency: DisplayCurrency;
}) {
  if (!active || !point) return null;
  const copy = getSavingsDictionary(locale);
  return (
    <div className="rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg">
      <p className="font-semibold">
        {point.month} {copy.calculator.monthSuffix}
      </p>
      <dl className="mt-2 grid gap-1.5 tabular-nums">
        {[
          [copy.chart.principal, point.principalValue],
          [copy.chart.interest, point.interestValue],
          [copy.chart.balance, point.balanceValue],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-5">
            <dt className="text-muted-foreground">{label}</dt>
            <dd>{formatSavingsCurrency(value, locale, currency)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function SavingsGrowthChart({
  schedule,
  animationKey = 0,
  locale = "ko",
  currency = "KRW",
}: {
  schedule?: readonly SavingsScheduleRow[];
  animationKey?: number;
  locale?: SavingsLocale;
  currency?: DisplayCurrency;
}) {
  const copy = getSavingsDictionary(locale).chart;
  const data = createSavingsGrowthData(schedule ?? []);
  const reducedMotion = usePrefersReducedMotion();
  const series = [
    ["principal", copy.principal, "var(--chart-2)", 2],
    ["interest", copy.interest, "var(--chart-3)", 2],
    ["balance", copy.balance, "var(--primary)", 3],
  ] as const;
  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <h2 id="savings-chart-title" className="text-lg font-semibold">
        {copy.title}
      </h2>
      <p id="savings-chart-description" className="sr-only">
        {copy.description}
      </p>
      <div
        className="mt-4 flex flex-wrap justify-center gap-5 text-xs"
        aria-label={copy.legend}
      >
        {series.map(([key, name, color]) => (
          <span key={key} className="flex items-center gap-2" data-series={key}>
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            {name}
          </span>
        ))}
      </div>
      <div
        role="img"
        aria-labelledby="savings-chart-title savings-chart-description"
        className="mt-4 h-[300px] min-w-0"
        data-testid="savings-growth-chart"
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
                dataKey="month"
                type="number"
                domain={[1, "dataMax"]}
                ticks={getMonthTicks(data)}
                tickFormatter={(month) =>
                  `${month}${locale === "ko" ? "개월" : "m"}`
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
                animationDuration={0}
                content={({ active, payload }) => (
                  <SavingsTooltip
                    active={active}
                    locale={locale}
                    currency={currency}
                    point={
                      payload?.[0]?.payload as SavingsGrowthPoint | undefined
                    }
                  />
                )}
              />
              {series.map(([dataKey, name, stroke, strokeWidth]) => (
                <Line
                  key={`${animationKey}-${dataKey}`}
                  dataKey={dataKey}
                  name={name}
                  type="monotone"
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  dot={false}
                  activeDot={{ r: 4 }}
                  isAnimationActive={!reducedMotion}
                  animationBegin={COMPOUND_ANIMATION_DELAY}
                  animationDuration={COMPOUND_ANIMATION_DURATION}
                  animationEasing={COMPOUND_ANIMATION_EASING}
                />
              ))}
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
