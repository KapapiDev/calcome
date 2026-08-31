"use client";

import { type ReactNode, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export const calculatorWorkspaceClass =
  "grid gap-6 md:grid-cols-[minmax(16rem,0.36fr)_minmax(0,0.64fr)] md:items-start";
export const dashboardCalculatorWorkspaceClass =
  "grid gap-4 lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-start";
export const calculatorSettingsClass =
  "rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:sticky lg:top-6";
export const compactCalculatorSettingsClass =
  "rounded-xl border bg-card p-4 shadow-sm lg:sticky lg:top-6";

export function CalculatorActions({
  submitLabel,
  onReset,
  compact = false,
}: {
  submitLabel: string;
  onReset: () => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`${compact ? "mt-3" : "mt-6"} grid grid-cols-[minmax(0,1fr)_auto] gap-2`}
    >
      <Button type="submit" size="lg" className="h-11 px-5">
        {submitLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 px-4"
        onClick={onReset}
      >
        초기화
      </Button>
    </div>
  );
}

type ResultActionCopy = {
  copy: string;
  copied: string;
  copyFailed: string;
  calculateFirst: string;
  recalculate: string;
  recalculateReady: string;
  anotherCalculator: string;
};

const RESULT_ACTION_COPY: Record<"ko" | "en", ResultActionCopy> = {
  ko: {
    copy: "결과 복사",
    copied: "결과를 복사했습니다.",
    copyFailed: "결과를 복사하지 못했습니다.",
    calculateFirst: "먼저 계산을 완료해 주세요.",
    recalculate: "다시 계산",
    recalculateReady: "입력 영역으로 이동했습니다.",
    anotherCalculator: "다른 계산기",
  },
  en: {
    copy: "Copy result",
    copied: "Result copied.",
    copyFailed: "Could not copy the result.",
    calculateFirst: "Complete a calculation first.",
    recalculate: "Recalculate",
    recalculateReady: "Moved to the calculator inputs.",
    anotherCalculator: "Another calculator",
  },
};

function getResultText(list: HTMLDListElement) {
  const rows = Array.from(list.children);
  const pairs = rows
    .map((row) => {
      const label = row.querySelector("dt")?.textContent?.trim() ?? "";
      const value = row.querySelector("dd")?.textContent?.trim() ?? "";
      return { label, value };
    })
    .filter(({ label, value }) => label && value);

  const hasCalculatedValue = pairs.some(
    ({ value }) => value !== "-" && value !== "—",
  );

  return {
    hasCalculatedValue,
    text: pairs.map(({ label, value }) => `${label}: ${value}`).join("\n"),
  };
}

function findNearestCalculatorForm(node: HTMLElement) {
  let current: HTMLElement | null = node.parentElement;

  while (current) {
    const form = current.querySelector<HTMLFormElement>("form");
    if (form) return form;
    current = current.parentElement;
  }

  return null;
}

function inferResultLocale(
  metrics: readonly { label: string }[],
): "ko" | "en" {
  return metrics.some(({ label }) => /[가-힣]/.test(label)) ? "ko" : "en";
}

export function PrimaryResults({
  metrics,
}: {
  metrics: readonly { label: string; value: ReactNode; featured?: boolean }[];
}) {
  const resultsRef = useRef<HTMLDListElement>(null);
  const [actionStatus, setActionStatus] = useState("");
  const locale = inferResultLocale(metrics);
  const copy = RESULT_ACTION_COPY[locale];

  async function copyResult() {
    const list = resultsRef.current;
    if (!list) return;

    const resultText = getResultText(list);
    if (!resultText.hasCalculatedValue) {
      setActionStatus(copy.calculateFirst);
      return;
    }

    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(resultText.text);
      setActionStatus(copy.copied);
    } catch {
      setActionStatus(copy.copyFailed);
    }
  }

  function recalculate() {
    const list = resultsRef.current;
    if (!list) return;

    const form = findNearestCalculatorForm(list);
    const firstControl = form?.querySelector<HTMLElement>(
      "input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button[type='submit']:not([disabled])",
    );

    form?.scrollIntoView({ block: "start", behavior: "smooth" });
    firstControl?.focus();
    setActionStatus(copy.recalculateReady);
  }

  const directoryHref = locale === "en" ? "/en/calculators" : "/calculators";

  return (
    <>
      <dl
        ref={resultsRef}
        className="mt-4 grid gap-2 sm:grid-cols-3"
        data-testid="primary-results"
      >
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`min-h-24 rounded-lg border p-4 ${metric.featured ? "border-primary/30 bg-primary/5" : "bg-background"}`}
          >
            <dt className="text-xs leading-5 text-muted-foreground">
              {metric.label}
            </dt>
            <dd className="mt-2 break-words text-xl font-bold tabular-nums">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className="mt-3 grid gap-2 sm:grid-cols-3"
        data-testid="result-actions"
      >
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          onClick={recalculate}
        >
          {copy.recalculate}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          onClick={copyResult}
        >
          {copy.copy}
        </Button>
        <a
          href={directoryHref}
          className="inline-flex min-h-11 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {copy.anotherCalculator}
        </a>
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {actionStatus}
      </p>
    </>
  );
}
