"use client";

import { isValidElement, type ReactNode, useState } from "react";

const COPY = {
  ko: {
    title: "결과를 이렇게 읽어보세요",
    description:
      "표시된 값은 현재 입력값을 기준으로 계산한 결과입니다. 단위와 계산기별 가정·포함 범위는 입력 항목과 페이지 설명을 함께 확인하세요.",
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
  },
  en: {
    title: "How to read these results",
    description:
      "These values are calculated from your current inputs. Check the input units and this calculator’s stated assumptions or included scope alongside the results.",
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

export function CalculatorResultContext({
  metrics,
}: {
  metrics: readonly Metric[];
}) {
  const copy = COPY[inferLocale(metrics)];
  const featured = metrics.find((metric) => metric.featured) ?? metrics[0];
  const supporting = metrics.find((metric) => metric !== featured);
  const currentSnapshot = createSnapshot(metrics);
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
  }

  const previousSnapshot = snapshotState.previous;

  return (
    <>
      <section
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
      </section>

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
