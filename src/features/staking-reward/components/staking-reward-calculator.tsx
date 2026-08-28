"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import {
  calculateStakingReward,
  type StakingRewardResult,
} from "../calculate";
import { stakingRewardContent, type StakingRewardLocale } from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: StakingRewardLocale) {
  return locale === "ko"
    ? {
        stakedAmount: "100",
        annualRewardRatePercent: "8",
        stakingDays: "365",
        compoundsPerYear: "12",
      }
    : {
        stakedAmount: "100",
        annualRewardRatePercent: "6",
        stakingDays: "365",
        compoundsPerYear: "12",
      };
}

export function StakingRewardCalculator({
  locale,
}: {
  locale: StakingRewardLocale;
}) {
  const copy = stakingRewardContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<StakingRewardResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);
  const number = (value?: number) =>
    value === undefined
      ? "—"
      : new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 8,
        }).format(value);
  const percent = (value?: number) =>
    value === undefined ? "—" : `${value.toFixed(2)}%`;

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateStakingReward({
        stakedAmount: Number(values.stakedAmount),
        annualRewardRatePercent: Number(values.annualRewardRatePercent),
        stakingDays: Number(values.stakingDays),
        compoundsPerYear: Number(values.compoundsPerYear),
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

  const numericField = (
    id: "stakedAmount" | "annualRewardRatePercent" | "stakingDays",
    label: string,
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={values[id]}
        onChange={(event) =>
          setValues((current) => ({ ...current, [id]: event.target.value }))
        }
        aria-invalid={hasError}
        className={fieldClass}
      />
    </div>
  );

  return (
    <section aria-labelledby="staking-reward-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="staking-reward-input-title" className="mt-1 text-xl font-semibold">
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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {numericField("stakedAmount", copy.stakedAmount)}
            {numericField("annualRewardRatePercent", copy.annualRewardRatePercent)}
            {numericField("stakingDays", copy.stakingDays)}
            <div>
              <label htmlFor="compoundsPerYear" className="block text-sm font-medium">
                {copy.compoundsPerYear}
              </label>
              <select
                id="compoundsPerYear"
                value={values.compoundsPerYear}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    compoundsPerYear: event.target.value,
                  }))
                }
                className={fieldClass}
              >
                <option value="0">{copy.simple}</option>
                <option value="1">{copy.annual}</option>
                <option value="12">{copy.monthly}</option>
                <option value="52">{copy.weekly}</option>
                <option value="365">{copy.daily}</option>
              </select>
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
          aria-labelledby="staking-reward-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="staking-reward-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.rewardsEarned,
                value: number(result?.rewardsEarned),
                featured: true,
              },
              {
                label: copy.finalBalance,
                value: number(result?.finalBalance),
                featured: true,
              },
              {
                label: copy.periodYieldPercent,
                value: percent(result?.periodYieldPercent),
              },
              {
                label: copy.dailyAverageReward,
                value: number(result?.dailyAverageReward),
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
