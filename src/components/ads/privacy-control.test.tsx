import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AD_CONSENT_STORAGE_KEY } from "./ad-consent";
import { PrivacyControl } from "./privacy-control";

const { pathnameRef } = vi.hoisted(() => ({
  pathnameRef: { current: "/" },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => pathnameRef.current,
}));

const REGION_SESSION_KEY = "calcome.ad-privacy-region.v1";

describe("PrivacyControl", () => {
  beforeEach(() => {
    window.localStorage.removeItem(AD_CONSENT_STORAGE_KEY);
    window.sessionStorage.clear();
    pathnameRef.current = "/";
    // Region normally arrives from /api/privacy-region; the session cache
    // short-circuits that so these tests stay offline.
    vi.stubGlobal("fetch", vi.fn());
  });

  it("preserves 44px minimum touch targets for privacy actions", () => {
    pathnameRef.current = "/en/finance/compound-interest";
    window.sessionStorage.setItem(REGION_SESSION_KEY, "other");
    render(<PrivacyControl />);

    const launcher = screen.getByRole("button", { name: "Privacy choices" });
    expect(launcher).toHaveClass("min-h-11");

    fireEvent.click(launcher);

    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toHaveClass("min-h-11", "min-w-11");
    expect(
      screen.getByRole("button", { name: "Allow optional ads" }),
    ).toHaveClass("min-h-11");
    expect(
      screen.getByRole("button", { name: "Reject optional ads" }),
    ).toHaveClass("min-h-11");

    fireEvent.click(
      screen.getByRole("button", { name: "Reject optional ads" }),
    );
    expect(screen.getByRole("button", { name: "Reset choice" })).toHaveClass(
      "min-h-11",
    );
  });

  it("keeps the regulated-region control touch-safe without exposing local allow", () => {
    pathnameRef.current = "/ko/finance/compound-interest";
    window.sessionStorage.setItem(REGION_SESSION_KEY, "regulated");
    render(<PrivacyControl />);

    fireEvent.click(screen.getByRole("button", { name: "개인정보 선택" }));

    expect(
      screen.queryByRole("button", { name: "선택적 광고 허용" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "선택적 광고 거부" }),
    ).toHaveClass("min-h-11");
    expect(screen.getByRole("button", { name: "닫기" })).toHaveClass(
      "min-h-11",
      "min-w-11",
    );
  });
});
