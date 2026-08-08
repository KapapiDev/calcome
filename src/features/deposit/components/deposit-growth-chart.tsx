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

import { formatDepositCurrency } from "../format";
import { getDepositDictionary, type DepositLocale } from "../i18n";
import type { DepositScheduleRow } from "../types";

export type DepositGrowthPoint = DepositScheduleRow & {
  principalNumber: number;
  interestNumber: number;
  balanceNumber: number;
};

export function createDepositGrowthData(
  schedule: readonly DepositScheduleRow[],
): DepositGrowthPoint[] {
  return schedule.map((row) => ({
    ...row,
    principalNumber: Number(row.principal),
    interestNumber: Number(row.accumulatedInterest),
    balanceNumber: Number(row.balance),
  }));
}

export function getDepositMonthTicks(points: readonly DepositGrowthPoint[]) {
  if (points.length <= 7) return points.map((point) => point.month);
  const last = points.at(-1)?.month ?? 1;
  const step = Math.ceil(last / 6);
  return points
    .map((point) => point.month)
    .filter((month) => month === 1 || month === last || month % step === 0);
}

function DepositTooltip({
  active,
  point,
  locale,
  currency,
}: {
  active?: boolean;
  point?: DepositGrowthPoint;
  locale: DepositLocale;
  currency: DisplayCurrency;
}) {
  if (!active || !point) return null;
  const copy = getDepositDictionary(locale);
  return (
    <div className="rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg">
      <p className="font-semibold">
        {point.month} {copy.calculator.monthSuffix}
      </p>
      <dl className="mt-2 grid gap-1.5 tabular-nums">
        {[
          [copy.chart.principal, point.principal],
          [copy.chart.interest, point.accumulatedInterest],
          [copy.chart.balance, point.balance],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between gap-5">
            <dt className="text-muted-foreground">{label}</dt>
            <dd>{formatDepositCurrency(value, locale, currency)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function DepositGrowthChart({
  schedule,
  animationKey = 0,
  locale = "ko",
  currency = "KRW",
}: {
  schedule?: readonly DepositScheduleRow[];
  animationKey?: number;
  locale?: DepositLocale;
  currency?: DisplayCurrency;
}) {
  const copy = getDepositDictionary(locale).chart;
  const data = createDepositGrowthData(schedule ?? []);
  const reducedMotion = usePrefersReducedMotion();
  const series = [
    ["principalNumber", "principal", copy.principal, "var(--chart-2)", 2],
    ["interestNumber", "interest", copy.interest, "var(--chart-3)", 2],
    ["balanceNumber", "balance", copy.balance, "var(--primary)", 3],
  ] as const;
  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <h2 id="deposit-chart-title" className="text-lg font-semibold">
        {copy.title}
      </h2>
      <p id="deposit-chart-description" className="sr-only">
        {copy.description}
      </p>
      <div
        className="mt-4 flex flex-wrap justify-center gap-5 text-xs"
        aria-label={copy.legend}
      >
        {series.map(([, key, name, color]) => (
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
        aria-labelledby="deposit-chart-title deposit-chart-description"
        className="mt-4 h-[300px] min-w-0"
        data-testid="deposit-growth-chart"
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
                ticks={getDepositMonthTicks(data)}
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
                  <DepositTooltip
                    active={active}
                    locale={locale}
                    currency={currency}
                    point={
                      payload?.[0]?.payload as DepositGrowthPoint | undefined
                    }
                  />
                )}
              />
              {series.map(([dataKey, , name, stroke, strokeWidth]) => (
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
