"use client";

import { isValidElement, type ReactNode, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";

const MAX_SCENARIOS = 3;
const MAX_SCENARIO_LABEL_LENGTH = 24;

const COPY = {
  ko: {
    title: "결과를 이렇게 읽어보세요",
    description:
      "표시된 값은 현재 입력값을 기준으로 계산한 결과입니다. 단위와 계산기별 가정·포함 범위는 입력 항목과 페이지 설명을 함께 확인하세요.",
    nextStepTitle: "결과를 다음 판단에 활용하기",
    nextStepDescription:
      "가장 중요한 결과를 목표값이나 다른 선택지와 비교한 뒤, 바꾸고 싶은 조건만 조정해 다시 계산해 보세요. 실제 결정 전에는 계산기별 안내와 적용 조건도 함께 확인하세요.",
    primary: "가장 중요한 결과",
    context: "함께 확인할 값",
    comparisonTitle: "직전 계산과 비교",
    comparisonDescription:
      "이번 결과와 바로 직전 계산 결과를 같은 항목끼리 비교할 수 있습니다. 안전하게 해석 가능한 숫자 값은 방향과 변화량도 표시하며, 이 비교는 현재 페이지 세션에서만 유지되고 입력값은 저장하지 않습니다.",
    previous: "직전",
    current: "현재",
    increased: "증가",
    decreased: "감소",
    unchanged: "변화 없음",
    delta: "변화량",
    scenarioAction: "현재 결과를 시나리오로 저장",
    scenarioTitle: "시나리오 나란히 비교",
    scenarioDescription:
      "최대 3개의 계산 결과만 현재 페이지 세션에 임시로 보관해 현재 결과와 나란히 비교합니다. 입력값, URL, 브라우저 저장소에는 기록하지 않습니다.",
    scenarioLabel: "시나리오",
    scenarioName: "시나리오 이름",
    scenarioSaved: "현재 결과를 시나리오로 저장했습니다.",
    scenarioDuplicate: "같은 결과가 이미 시나리오에 있습니다.",
    scenarioLimit: "시나리오는 최대 3개까지 저장할 수 있습니다.",
    scenarioUnavailable: "먼저 계산을 완료한 뒤 시나리오로 저장해 주세요.",
    scenarioStale:
      "입력값이 변경되었습니다. 최신 결과를 다시 계산한 뒤 시나리오로 저장해 주세요.",
    removeScenario: "시나리오 삭제",
    clearScenarios: "모든 시나리오 지우기",
    useAsBaseline: "기준으로 선택",
    baselineSelected: "비교 기준",
    baselineTitle: "선택한 기준 시나리오와 비교",
    baselineDescription:
      "선택한 시나리오를 기준으로 현재 결과의 같은 항목을 비교합니다. 기준과 이름은 이 페이지를 벗어나면 사라지며 입력값은 저장하지 않습니다.",
    printAction: "결과 인쇄·PDF 저장",
    printTitle: "CalCome 계산 결과 요약",
    printCalculator: "계산기",
    printGuidance: "해석 및 가정 확인",
    printPrivacy:
      "브라우저 인쇄 기능을 사용하며 입력값이나 결과를 업로드하거나 자동 저장하지 않습니다.",
    printUnavailable: "먼저 계산을 완료한 뒤 인쇄해 주세요.",
    printStale:
      "입력값이 변경되었습니다. 최신 결과를 다시 계산한 뒤 인쇄해 주세요.",
  },
  en: {
    title: "How to read these results",
    description:
      "These values are calculated from your current inputs. Check the input units and this calculator’s stated assumptions or included scope alongside the results.",
    nextStepTitle: "Use the result for your next decision",
    nextStepDescription:
      "Compare the primary result with your target or another option, then change only the conditions you want to test and recalculate. Before acting, also check the calculator-specific guidance and applicable conditions.",
    primary: "Primary result",
    context: "Supporting value",
    comparisonTitle: "Compare with the previous calculation",
    comparisonDescription:
      "Compare this result with the immediately previous calculation using the same result labels. Safely interpretable numeric values also show direction and delta. This comparison stays only in the current page session and does not store your inputs.",
    previous: "Previous",
    current: "Current",
    increased: "Increased",
    decreased: "Decreased",
    unchanged: "No change",
    delta: "Delta",
    scenarioAction: "Save current result as scenario",
    scenarioTitle: "Compare scenarios side by side",
    scenarioDescription:
      "Keep up to three calculated result snapshots only for this page session and compare them with the current result. Inputs, URLs, and browser storage are not used.",
    scenarioLabel: "Scenario",
    scenarioName: "Scenario name",
    scenarioSaved: "Current result saved as a scenario.",
    scenarioDuplicate: "This result is already saved as a scenario.",
    scenarioLimit: "You can keep up to three scenarios.",
    scenarioUnavailable: "Complete a calculation before saving a scenario.",
    scenarioStale: "Inputs changed. Recalculate before saving this scenario.",
    removeScenario: "Remove scenario",
    clearScenarios: "Clear all scenarios",
    useAsBaseline: "Use as baseline",
    baselineSelected: "Comparison baseline",
    baselineTitle: "Compare with the selected baseline scenario",
    baselineDescription:
      "Use the selected saved scenario as the baseline for the current result. The baseline and local label disappear when you leave this page, and inputs are not stored.",
    printAction: "Print / Save PDF",
    printTitle: "CalCome result summary",
    printCalculator: "Calculator",
    printGuidance: "Interpretation and assumptions",
    printPrivacy:
      "Uses your browser’s print feature without uploading or automatically saving your inputs or results.",
    printUnavailable: "Complete a calculation before printing.",
    printStale: "Inputs changed. Recalculate before printing this summary.",
  },
} as const;

type Metric = {
  label: string;
  value: ReactNode;
  featured?: boolean;
};

type ResultSnapshot = {
  key: string;
  pairs: { label: string; value: string }[];
};

type SavedScenario = ResultSnapshot & { id: number; label: string };

type SnapshotState = {
  current: ResultSnapshot | null;
  previous: ResultSnapshot | null;
};

type ComparableValue = {
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  grouped: boolean;
};

function inferLocale(metrics: readonly { label: string }[]): "ko" | "en" {
  return metrics.some(({ label }) => /[가-힣]/.test(label)) ? "ko" : "en";
}

function getNodeText(node: ReactNode): string | null {
  if (
    typeof node === "string" ||
    typeof node === "number" ||
    typeof node === "bigint"
  )
    return String(node).trim();

  if (Array.isArray(node)) {
    const text = node
      .map(getNodeText)
      .filter((value): value is string => Boolean(value))
      .join("")
      .trim();
    return text || null;
  }

  if (isValidElement<{ children?: ReactNode }>(node))
    return getNodeText(node.props.children);

  return null;
}

function createSnapshot(metrics: readonly Metric[]): ResultSnapshot | null {
  const pairs = metrics
    .map(({ label, value }) => ({ label, value: getNodeText(value) ?? "" }))
    .filter(({ label, value }) => label.trim() && value);

  if (
    pairs.length === 0 ||
    !pairs.some(({ value }) => value !== "-" && value !== "—")
  )
    return null;

  return {
    key: pairs
      .map(({ label, value }) => `${label}\u0000${value}`)
      .join("\u0001"),
    pairs,
  };
}

function parseComparableValue(text: string): ComparableValue | null {
  const match = text
    .trim()
    .match(
      /^([^\d+\-−–]*)([+\-−–]?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?)([^\d]*)$/,
    );
  if (!match) return null;

  const [, prefix, numericText, suffix] = match;
  const normalized = numericText.replace(/[−–]/g, "-").replace(/,/g, "");
  const value = Number(normalized);
  if (!Number.isFinite(value)) return null;

  return {
    value,
    prefix,
    suffix,
    decimals: normalized.split(".")[1]?.length ?? 0,
    grouped: numericText.includes(","),
  };
}

function formatDelta(
  delta: number,
  previous: ComparableValue,
  current: ComparableValue,
): string {
  const decimals = Math.max(previous.decimals, current.decimals);
  const fixed = Math.abs(delta).toFixed(decimals);
  const [integer, fraction] = fixed.split(".");
  const groupedInteger =
    previous.grouped || current.grouped
      ? integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : integer;
  const numeric = fraction ? `${groupedInteger}.${fraction}` : groupedInteger;
  return `${current.prefix}${numeric}${current.suffix}`;
}

function compareDisplayedValues(previousText: string, currentText: string) {
  const previous = parseComparableValue(previousText);
  const current = parseComparableValue(currentText);

  if (
    !previous ||
    !current ||
    previous.prefix !== current.prefix ||
    previous.suffix !== current.suffix
  )
    return null;

  const delta = current.value - previous.value;
  return {
    direction: delta > 0 ? "increased" : delta < 0 ? "decreased" : "unchanged",
    delta: formatDelta(delta, previous, current),
  } as const;
}

function getCalculatorIdentity() {
  const heading = document.querySelector("main h1, h1")?.textContent?.trim();
  if (heading) return heading;

  const title = document.title.split("|")[0]?.trim();
  return title || "CalCome";
}

export function CalculatorResultContext({
  metrics,
}: {
  metrics: readonly Metric[];
}) {
  const locale = inferLocale(metrics);
  const copy = COPY[locale];
  const featured = metrics.find((metric) => metric.featured) ?? metrics[0];
  const supporting = metrics.find((metric) => metric !== featured);
  const currentSnapshot = createSnapshot(metrics);
  const contextRef = useRef<HTMLElement>(null);
  const printIdentityRef = useRef<HTMLSpanElement>(null);
  const nextScenarioIdRef = useRef(1);
  const [printStatus, setPrintStatus] = useState("");
  const [scenarioStatus, setScenarioStatus] = useState("");
  const [printPrepared, setPrintPrepared] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [baselineScenarioId, setBaselineScenarioId] = useState<number | null>(
    null,
  );
  const [snapshotState, setSnapshotState] = useState<SnapshotState>(() => ({
    current: currentSnapshot,
    previous: null,
  }));

  if ((snapshotState.current?.key ?? null) !== (currentSnapshot?.key ?? null)) {
    setSnapshotState({
      current: currentSnapshot,
      previous:
        currentSnapshot && snapshotState.current ? snapshotState.current : null,
    });
    if (!currentSnapshot && savedScenarios.length > 0) {
      setSavedScenarios([]);
      setBaselineScenarioId(null);
    }
  }

  const previousSnapshot = snapshotState.previous;
  const baselineScenario =
    savedScenarios.find(({ id }) => id === baselineScenarioId) ?? null;

  function hasStaleResult() {
    return Boolean(
      contextRef.current?.parentElement?.querySelector(
        "[data-testid='stale-result-notice']",
      ),
    );
  }

  function saveScenario() {
    if (!currentSnapshot) {
      setScenarioStatus(copy.scenarioUnavailable);
      return;
    }
    if (hasStaleResult()) {
      setScenarioStatus(copy.scenarioStale);
      return;
    }
    if (savedScenarios.some(({ key }) => key === currentSnapshot.key)) {
      setScenarioStatus(copy.scenarioDuplicate);
      return;
    }
    if (savedScenarios.length >= MAX_SCENARIOS) {
      setScenarioStatus(copy.scenarioLimit);
      return;
    }

    const scenarioNumber = savedScenarios.length + 1;
    setSavedScenarios((scenarios) => [
      ...scenarios,
      {
        ...currentSnapshot,
        id: nextScenarioIdRef.current++,
        label: `${copy.scenarioLabel} ${scenarioNumber}`,
      },
    ]);
    setScenarioStatus(copy.scenarioSaved);
  }

  function updateScenarioLabel(id: number, label: string) {
    const boundedLabel = label.slice(0, MAX_SCENARIO_LABEL_LENGTH);
    setSavedScenarios((scenarios) =>
      scenarios.map((scenario) =>
        scenario.id === id ? { ...scenario, label: boundedLabel } : scenario,
      ),
    );
  }

  function selectBaseline(id: number) {
    if (!currentSnapshot) {
      setScenarioStatus(copy.scenarioUnavailable);
      return;
    }
    if (hasStaleResult()) {
      setScenarioStatus(copy.scenarioStale);
      return;
    }
    setBaselineScenarioId(id);
    setScenarioStatus("");
  }

  function removeScenario(id: number) {
    setSavedScenarios((scenarios) =>
      scenarios.filter((scenario) => scenario.id !== id),
    );
    if (baselineScenarioId === id) setBaselineScenarioId(null);
  }

  function clearScenarios() {
    setSavedScenarios([]);
    setBaselineScenarioId(null);
    setScenarioStatus("");
  }

  function printSummary() {
    if (!currentSnapshot) {
      setPrintStatus(copy.printUnavailable);
      return;
    }

    if (hasStaleResult()) {
      setPrintStatus(copy.printStale);
      return;
    }

    flushSync(() => {
      setPrintStatus("");
      setPrintPrepared(true);
    });
    if (printIdentityRef.current)
      printIdentityRef.current.textContent = getCalculatorIdentity();
    document.body.dataset.calcomeResultPrinting = "true";

    const cleanup = () => {
      delete document.body.dataset.calcomeResultPrinting;
      flushSync(() => {
        setPrintPrepared(false);
      });
    };
    window.addEventListener("afterprint", cleanup, { once: true });

    try {
      window.print();
    } catch {
      cleanup();
      setPrintStatus(copy.printUnavailable);
    }
  }

  function scenarioDisplayLabel(scenario: SavedScenario, index: number) {
    return scenario.label.trim() || `${copy.scenarioLabel} ${index + 1}`;
  }

  return (
    <>
      <style>{`
        @media print {
          body[data-calcome-result-printing="true"] * {
            visibility: hidden !important;
          }
          body[data-calcome-result-printing="true"] [data-calcome-print-summary],
          body[data-calcome-result-printing="true"] [data-calcome-print-summary] * {
            visibility: visible !important;
          }
          body[data-calcome-result-printing="true"] [data-calcome-print-summary] {
            display: block !important;
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 24px;
          }
        }
      `}</style>

      <section
        ref={contextRef}
        className="mt-3 rounded-lg border bg-muted/30 p-3 text-sm"
        data-testid="result-context"
        aria-labelledby="result-context-title"
      >
        <p id="result-context-title" className="font-medium">
          {copy.title}
        </p>
        <p className="mt-1 leading-5 text-muted-foreground">
          {copy.description}
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {featured ? (
            <p className="rounded-md bg-background px-3 py-2 font-medium">
              {copy.primary}: {featured.label}
            </p>
          ) : null}
          {supporting ? (
            <p className="rounded-md bg-background px-3 py-2 font-medium">
              {copy.context}: {supporting.label}
            </p>
          ) : null}
        </div>
        <div
          className="mt-3 rounded-md bg-background px-3 py-2"
          data-testid="result-next-step"
        >
          <p className="font-medium">{copy.nextStepTitle}</p>
          <p className="mt-1 leading-5 text-muted-foreground">
            {copy.nextStepDescription}
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-muted-foreground">
            {copy.scenarioDescription}
          </p>
          <Button
            type="button"
            variant="outline"
            className="min-h-11 shrink-0"
            onClick={saveScenario}
          >
            {copy.scenarioAction}
          </Button>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-muted-foreground">
            {copy.printPrivacy}
          </p>
          <Button
            type="button"
            variant="outline"
            className="min-h-11 shrink-0"
            onClick={printSummary}
          >
            {copy.printAction}
          </Button>
        </div>
        {scenarioStatus ? (
          <p
            role="status"
            aria-live="polite"
            className="mt-2 text-xs text-muted-foreground"
          >
            {scenarioStatus}
          </p>
        ) : null}
        {printStatus ? (
          <p
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {printStatus}
          </p>
        ) : null}
      </section>

      {printPrepared ? (
        <section
          className="hidden"
          data-calcome-print-summary
          data-testid="print-result-summary"
          aria-hidden="true"
        >
          <h1 className="text-2xl font-bold">{copy.printTitle}</h1>
          <p className="mt-2 text-sm">
            <strong>{copy.printCalculator}:</strong>{" "}
            <span ref={printIdentityRef}>CalCome</span>
          </p>
          <dl className="mt-6 grid gap-3">
            {currentSnapshot?.pairs.map(({ label, value }) => (
              <div key={label} className="border-b pb-2">
                <dt className="text-sm font-medium">{label}</dt>
                <dd className="mt-1 text-xl font-bold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 border-t pt-4">
            <h2 className="font-semibold">{copy.printGuidance}</h2>
            <p className="mt-2 text-sm leading-6">{copy.description}</p>
            <p className="mt-2 text-sm leading-6">
              <strong>{copy.nextStepTitle}:</strong> {copy.nextStepDescription}
            </p>
            <p className="mt-2 text-xs leading-5">{copy.printPrivacy}</p>
          </div>
        </section>
      ) : null}

      {savedScenarios.length > 0 && currentSnapshot ? (
        <section
          className="mt-3 rounded-lg border bg-muted/30 p-3 text-sm"
          data-testid="scenario-comparison"
          aria-labelledby="scenario-comparison-title"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p id="scenario-comparison-title" className="font-medium">
                {copy.scenarioTitle}
              </p>
              <p className="mt-1 leading-5 text-muted-foreground">
                {copy.scenarioDescription}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="min-h-11 shrink-0"
              onClick={clearScenarios}
            >
              {copy.clearScenarios}
            </Button>
          </div>
          <div className="mt-3 grid gap-3">
            {savedScenarios.map((scenario, index) => {
              const displayLabel = scenarioDisplayLabel(scenario, index);
              const isBaseline = scenario.id === baselineScenarioId;

              return (
                <div key={scenario.id} className="rounded-md bg-background p-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="min-w-0 flex-1">
                      <span className="sr-only">
                        {copy.scenarioName} {index + 1}
                      </span>
                      <input
                        type="text"
                        value={scenario.label}
                        maxLength={MAX_SCENARIO_LABEL_LENGTH}
                        aria-label={`${copy.scenarioName} ${index + 1}`}
                        className="min-h-11 w-full rounded-md border bg-background px-3 py-2 font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onChange={(event) =>
                          updateScenarioLabel(scenario.id, event.target.value)
                        }
                      />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant={isBaseline ? "secondary" : "outline"}
                        className="min-h-11"
                        aria-pressed={isBaseline}
                        onClick={() => selectBaseline(scenario.id)}
                      >
                        {isBaseline
                          ? copy.baselineSelected
                          : copy.useAsBaseline}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="min-h-11"
                        aria-label={`${copy.removeScenario} ${displayLabel}`}
                        onClick={() => removeScenario(scenario.id)}
                      >
                        {copy.removeScenario}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 grid gap-2">
                    {currentSnapshot.pairs.map((currentPair) => {
                      const savedPair = scenario.pairs.find(
                        ({ label }) => label === currentPair.label,
                      );
                      if (!savedPair) return null;
                      const comparison = compareDisplayedValues(
                        savedPair.value,
                        currentPair.value,
                      );

                      return (
                        <div
                          key={currentPair.label}
                          className="grid gap-2 rounded-md border px-3 py-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
                        >
                          <p className="font-medium">{currentPair.label}</p>
                          <p className="text-muted-foreground">
                            {displayLabel}: {savedPair.value}
                          </p>
                          <p className="text-muted-foreground">
                            {copy.current}: {currentPair.value}
                          </p>
                          {comparison ? (
                            <p className="text-muted-foreground sm:col-start-2 sm:col-span-2">
                              <span className="font-medium text-foreground">
                                {copy[comparison.direction]}
                              </span>{" "}
                              · {copy.delta}: {comparison.delta}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {baselineScenario && currentSnapshot ? (
        <section
          className="mt-3 rounded-lg border bg-muted/30 p-3 text-sm"
          data-testid="scenario-baseline-comparison"
          aria-labelledby="scenario-baseline-title"
        >
          <p id="scenario-baseline-title" className="font-medium">
            {copy.baselineTitle}:{" "}
            {baselineScenario.label.trim() || copy.scenarioLabel}
          </p>
          <p className="mt-1 leading-5 text-muted-foreground">
            {copy.baselineDescription}
          </p>
          <div className="mt-3 grid gap-2">
            {currentSnapshot.pairs.map((currentPair) => {
              const baselinePair = baselineScenario.pairs.find(
                ({ label }) => label === currentPair.label,
              );
              if (!baselinePair) return null;
              const comparison = compareDisplayedValues(
                baselinePair.value,
                currentPair.value,
              );

              return (
                <div
                  key={currentPair.label}
                  className="grid gap-2 rounded-md bg-background px-3 py-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-center"
                >
                  <p className="font-medium">{currentPair.label}</p>
                  <p className="text-muted-foreground">
                    {copy.baselineSelected}: {baselinePair.value}
                  </p>
                  <p className="text-muted-foreground">
                    {copy.current}: {currentPair.value}
                  </p>
                  {comparison ? (
                    <p className="text-muted-foreground sm:col-start-2 sm:col-span-2">
                      <span className="font-medium text-foreground">
                        {copy[comparison.direction]}
                      </span>{" "}
                      · {copy.delta}: {comparison.delta}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {previousSnapshot && currentSnapshot ? (
        <section
          className="mt-3 rounded-lg border bg-muted/30 p-3 text-sm"
          data-testid="result-comparison"
          aria-labelledby="result-comparison-title"
        >
          <p id="result-comparison-title" className="font-medium">
            {copy.comparisonTitle}
          </p>
          <p className="mt-1 leading-5 text-muted-foreground">
            {copy.comparisonDescription}
          </p>
          <div className="mt-3 grid gap-2">
            {currentSnapshot.pairs.map((currentPair) => {
              const previousPair = previousSnapshot.pairs.find(
                ({ label }) => label === currentPair.label,
              );
              if (!previousPair) return null;

              const comparison = compareDisplayedValues(
                previousPair.value,
                currentPair.value,
              );

              return (
                <div
                  key={currentPair.label}
                  className="grid gap-2 rounded-md bg-background px-3 py-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-center"
                >
                  <p className="font-medium">{currentPair.label}</p>
                  <p className="text-muted-foreground">
                    {copy.previous}:{" "}
                    <span className="font-medium text-foreground">
                      {previousPair.value}
                    </span>
                  </p>
                  <p className="text-muted-foreground">
                    {copy.current}:{" "}
                    <span className="font-medium text-foreground">
                      {currentPair.value}
                    </span>
                  </p>
                  {comparison ? (
                    <p className="text-muted-foreground sm:col-start-2 sm:col-span-2">
                      <span className="font-medium text-foreground">
                        {copy[comparison.direction]}
                      </span>{" "}
                      · {copy.delta}: {comparison.delta}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}
