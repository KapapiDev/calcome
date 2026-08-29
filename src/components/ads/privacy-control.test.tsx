import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { AD_CONSENT_STORAGE_KEY } from "./ad-consent";
import { PrivacyControl } from "./privacy-control";

describe("PrivacyControl", () => {
  beforeEach(() => {
    window.localStorage.removeItem(AD_CONSENT_STORAGE_KEY);
  });

  it("preserves 44px minimum touch targets for privacy actions", () => {
    render(<PrivacyControl locale="en" region="other" />);

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
    render(<PrivacyControl locale="ko" region="regulated" />);

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
