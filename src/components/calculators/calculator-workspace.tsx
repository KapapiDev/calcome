"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export const calculatorWorkspaceClass =
  "grid gap-6 md:grid-cols-[minmax(16rem,0.36fr)_minmax(0,0.64fr)] md:items-start";
export const dashboardCalculatorWorkspaceClass =
  "grid gap-4 lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-start";
export const calculatorSettingsClass =
  "rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:sticky lg:top-6";
export const compactCalculatorSettingsClass =
  "rounded-xl border bg-card p-4 shadow-sm lg:sticky lg:top-6";

type CalculatorActionCopy = {
  reset: string;
  firstRun: string;
  example: string;
  exampleApplied: string;
  exampleUnavailable: string;
  validationTitle: string;
  validationPrefix: string;
  validationSuffix: string;
  validationFallback: string;
  fixProblem: string;
};

const CALCULATOR_ACTION_COPY: Record<"ko" | "en", CalculatorActionCopy> = {
  ko: {
    reset: "초기화",
    firstRun:
      "처음이라면 예시 값으로 입력 형식을 확인한 뒤 내 값으로 바꿔 계산해 보세요.",
    example: "예시 입력",
    exampleApplied: "빈 입력칸에 예시 값을 채웠습니다.",
    exampleUnavailable:
      "이 계산기에는 자동으로 채울 수 있는 예시 값이 없습니다.",
    validationTitle: "입력값을 확인해 주세요.",
    validationPrefix: "‘",
    validationSuffix:
      "’ 항목을 수정한 뒤 다시 계산해 주세요. 입력한 다른 값은 그대로 유지됩니다.",
    validationFallback:
      "첫 번째 잘못된 입력을 수정한 뒤 다시 계산해 주세요. 입력한 다른 값은 그대로 유지됩니다.",
    fixProblem: "문제 입력으로 이동",
  },
  en: {
    reset: "Reset",
    firstRun:
      "New here? Fill the example values to see the expected input format, then replace them with your own.",
    example: "Fill example",
    exampleApplied: "Example values filled into empty inputs.",
    exampleUnavailable:
      "This calculator has no example values that can be filled automatically.",
    validationTitle: "Check the highlighted input.",
    validationPrefix: "Fix “",
    validationSuffix:
      "” and calculate again. Your other entered values are preserved.",
    validationFallback:
      "Fix the first invalid input and calculate again. Your other entered values are preserved.",
    fixProblem: "Go to problem",
  },
};

function inferCalculatorActionLocale(label: string): "ko" | "en" {
  return /[가-힣]/.test(label) ? "ko" : "en";
}

function isSafeExamplePlaceholder(value: string) {
  return /^-?\d+(?:[,.]\d+)*$/.test(value.trim());
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;

  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function fillExampleValues(form: HTMLFormElement | null) {
  if (!form) return 0;

  const inputs = Array.from(
    form.querySelectorAll<HTMLInputElement>(
      "input:not([disabled]):not([type='checkbox']):not([type='radio']):not([type='date']):not([type='file'])",
    ),
  );

  const candidates = inputs.filter(
    (input) =>
      input.value.trim() === "" &&
      Boolean(input.placeholder) &&
      isSafeExamplePlaceholder(input.placeholder),
  );

  for (const input of candidates)
    setInputValue(input, input.placeholder.trim());
  candidates[0]?.focus();

  return candidates.length;
}

type ValidatableControl =
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type ValidationIssue = {
  control: ValidatableControl;
  label: string;
};

function isValidatableControl(element: Element): element is ValidatableControl {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  );
}

function getControlLabel(control: ValidatableControl) {
  const ariaLabel = control.getAttribute("aria-label")?.trim();
  if (ariaLabel) return ariaLabel;

  const associatedLabel = control.labels?.[0]?.textContent?.trim();
  if (associatedLabel) return associatedLabel;

  const labelledBy = control.getAttribute("aria-labelledby")?.trim();
  if (labelledBy) {
    const label = labelledBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
      .filter(Boolean)
      .join(" ");
    if (label) return label;
  }

  return control.getAttribute("name")?.trim() ?? "";
}

function findFirstInvalidControl(form: HTMLFormElement | null) {
  if (!form) return null;

  return (
    Array.from(form.querySelectorAll("input, select, textarea"))
      .filter(isValidatableControl)
      .find((control) => control.willValidate && !control.validity.valid) ??
    null
  );
}

function findNearestPrimaryResults(form: HTMLFormElement) {
  let current: HTMLElement | null = form.parentElement;

  while (current) {
    const results = current.querySelector<HTMLDListElement>(
      "[data-testid='primary-results']",
    );
    if (results) return results;
    current = current.parentElement;
  }

  return null;
}

function moveMobileCompletionToResults(form: HTMLFormElement) {
  if (!window.matchMedia?.("(max-width: 767px)").matches) return;

  window.setTimeout(() => {
    const results = findNearestPrimaryResults(form);
    if (!results || !getResultText(results).hasCalculatedValue) return;

    results.scrollIntoView({ block: "start", behavior: "smooth" });
    results.focus({ preventScroll: true });
  }, 0);
}

export function CalculatorActions({
  submitLabel,
  onReset,
  compact = false,
}: {
  submitLabel: string;
  onReset: () => void;
  compact?: boolean;
}) {
  const locale = inferCalculatorActionLocale(submitLabel);
  const copy = CALCULATOR_ACTION_COPY[locale];
  const [exampleStatus, setExampleStatus] = useState("");
  const [validationIssue, setValidationIssue] =
    useState<ValidationIssue | null>(null);

  function validateBeforeSubmit(form: HTMLFormElement | null) {
    const invalidControl = findFirstInvalidControl(form);
    if (!invalidControl) {
      setValidationIssue(null);
      return true;
    }

    const issue = {
      control: invalidControl,
      label: getControlLabel(invalidControl),
    };
    setValidationIssue(issue);
    invalidControl.focus();
    return false;
  }

  const validationMessage = validationIssue?.label
    ? `${copy.validationPrefix}${validationIssue.label}${copy.validationSuffix}`
    : copy.validationFallback;

  return (
    <div className={compact ? "mt-3" : "mt-6"}>
      <p className="mb-2 text-xs leading-5 text-muted-foreground">
        {copy.firstRun}
      </p>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <Button
          type="submit"
          size="lg"
          className="h-11 px-5"
          onClick={(event) => {
            const form = event.currentTarget.form;
            if (!validateBeforeSubmit(form)) {
              event.preventDefault();
              return;
            }
            if (form) moveMobileCompletionToResults(form);
          }}
        >
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11 px-4"
          onClick={(event) => {
            const filled = fillExampleValues(event.currentTarget.form);
            setExampleStatus(
              filled ? copy.exampleApplied : copy.exampleUnavailable,
            );
          }}
        >
          {copy.example}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11 px-4"
          onClick={() => {
            setValidationIssue(null);
            onReset();
          }}
        >
          {copy.reset}
        </Button>
      </div>
      {validationIssue ? (
        <div
          className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
          role="alert"
        >
          <p className="font-medium text-destructive">{copy.validationTitle}</p>
          <p className="mt-1 leading-5 text-muted-foreground">
            {validationMessage}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 min-h-11"
            onClick={() => validationIssue.control.focus()}
          >
            {copy.fixProblem}
          </Button>
        </div>
      ) : null}
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {exampleStatus}
      </p>
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
  staleTitle: string;
  staleDescription: string;
  staleCopyBlocked: string;
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
    staleTitle: "입력값이 변경되었습니다.",
    staleDescription:
      "표시된 결과는 이전 입력 기준입니다. 다시 계산하면 최신 값으로 갱신됩니다.",
    staleCopyBlocked:
      "입력값이 바뀌었습니다. 최신 결과를 계산한 뒤 복사해 주세요.",
  },
  en: {
    copy: "Copy result",
    copied: "Result copied.",
    copyFailed: "Could not copy the result.",
    calculateFirst: "Complete a calculation first.",
    recalculate: "Recalculate",
    recalculateReady: "Moved to the calculator inputs.",
    anotherCalculator: "Another calculator",
    staleTitle: "Inputs have changed.",
    staleDescription:
      "These results use your previous inputs. Recalculate to refresh them.",
    staleCopyBlocked: "Inputs changed. Recalculate before copying the result.",
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

function inferResultLocale(metrics: readonly { label: string }[]): "ko" | "en" {
  return metrics.some(({ label }) => /[가-힣]/.test(label)) ? "ko" : "en";
}

export function PrimaryResults({
  metrics,
}: {
  metrics: readonly { label: string; value: ReactNode; featured?: boolean }[];
}) {
  const resultsRef = useRef<HTMLDListElement>(null);
  const [actionStatus, setActionStatus] = useState("");
  const [isStale, setIsStale] = useState(false);
  const locale = inferResultLocale(metrics);
  const copy = RESULT_ACTION_COPY[locale];

  useEffect(() => {
    const list = resultsRef.current;
    if (!list) return;

    const form = findNearestCalculatorForm(list);
    if (!form) return;

    const markStale = (event: Event) => {
      if (
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLSelectElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      )
        return;

      if (getResultText(list).hasCalculatedValue) setIsStale(true);
    };

    form.addEventListener("input", markStale);
    form.addEventListener("change", markStale);

    const observer = new MutationObserver(() => setIsStale(false));
    observer.observe(list, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => {
      form.removeEventListener("input", markStale);
      form.removeEventListener("change", markStale);
      observer.disconnect();
    };
  }, []);

  async function copyResult() {
    const list = resultsRef.current;
    if (!list) return;

    if (isStale) {
      setActionStatus(copy.staleCopyBlocked);
      return;
    }

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
        className="mt-4 grid scroll-mt-4 gap-2 outline-none sm:grid-cols-3"
        data-testid="primary-results"
        tabIndex={-1}
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

      {isStale ? (
        <div
          className="mt-3 rounded-lg border bg-muted/50 p-3 text-sm"
          data-testid="stale-result-notice"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-medium">{copy.staleTitle}</p>
          <p className="mt-1 leading-5 text-muted-foreground">
            {copy.staleDescription}
          </p>
        </div>
      ) : null}

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
