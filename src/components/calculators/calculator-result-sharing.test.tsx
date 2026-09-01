import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CalculatorResultContext } from "./calculator-result-context";

describe("CalculatorResultContext result sharing", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("prefers native sharing with a concise result-only English summary", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });

    render(
      <main>
        <h1>Compound Interest Calculator</h1>
        <CalculatorResultContext
          metrics={[
            { label: "Final balance", value: "$1,250", featured: true },
            { label: "Interest earned", value: "$250" },
          ]}
        />
      </main>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Copy / Share result" }),
    );

    await waitFor(() => expect(share).toHaveBeenCalledTimes(1));
    expect(share).toHaveBeenCalledWith({
      title: "Compound Interest Calculator · CalCome",
      text: [
        "CalCome · Compound Interest Calculator",
        "Final balance: $1,250",
        "Interest earned: $250",
      ].join("\n"),
    });
    expect(share.mock.calls[0]?.[0]).not.toHaveProperty("url");
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Result summary shared.",
    );
    expect(
      screen.getByText(/Inputs and URLs are not included or stored/),
    ).toBeVisible();
  });

  it("falls back to clipboard when native sharing is unavailable", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <main>
        <h1>복리 계산기</h1>
        <CalculatorResultContext
          metrics={[
            { label: "최종 금액", value: "1,250,000원", featured: true },
            { label: "이자", value: "250,000원" },
          ]}
        />
      </main>,
    );

    fireEvent.click(screen.getByRole("button", { name: "결과 복사·공유" }));

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText).toHaveBeenCalledWith(
      [
        "CalCome · 복리 계산기",
        "최종 금액: 1,250,000원",
        "이자: 250,000원",
      ].join("\n"),
    );
    expect(await screen.findByRole("status")).toHaveTextContent(
      "결과 요약을 클립보드에 복사했습니다.",
    );
  });

  it("falls back to clipboard when native sharing fails for a non-cancel reason", async () => {
    const share = vi.fn().mockRejectedValue(new Error("share unavailable"));
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <CalculatorResultContext
        metrics={[{ label: "Result", value: "$100", featured: true }]}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Copy / Share result" }),
    );

    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("status")).toHaveTextContent(
      "Result summary copied to the clipboard.",
    );
  });

  it("blocks stale results before native share or clipboard access", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: share,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <div>
        <CalculatorResultContext
          metrics={[{ label: "Result", value: "$100", featured: true }]}
        />
        <div data-testid="stale-result-notice">Inputs changed.</div>
      </div>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Copy / Share result" }),
    );

    expect(share).not.toHaveBeenCalled();
    expect(writeText).not.toHaveBeenCalled();
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Inputs changed. Recalculate before sharing this result.",
    );
  });
});
