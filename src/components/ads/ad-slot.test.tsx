import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AD_CONSENT_POLICY_VERSION } from "./ad-consent";
import { adPlacements } from "./ad-placements";
import { AdSlot } from "./ad-slot";

describe("AdSlot", () => {
  it.each(Object.entries(adPlacements))(
    "reserves deterministic space for %s",
    (placement, config) => {
      render(
        <AdSlot
          placement={placement as keyof typeof adPlacements}
          privacyRegion="other"
        >
          <span>ad payload</span>
        </AdSlot>,
      );

      const slot = screen.getByLabelText("Advertisement");
      expect(slot).toHaveAttribute("data-ad-placement", placement);
      expect(slot).toHaveAttribute("data-ad-reserved-space", "true");
      expect(slot).toHaveAttribute("data-ad-payload-allowed", "true");
      for (const className of config.minHeightClass.split(" ")) {
        expect(slot).toHaveClass(className);
      }
      expect(screen.getByText("ad payload")).toBeInTheDocument();
    },
  );

  it("blocks regulated payloads until certified CMP consent is granted", () => {
    const { rerender } = render(
      <AdSlot
        placement="content-break"
        privacyRegion="regulated"
        consent={{
          version: AD_CONSENT_POLICY_VERSION,
          decision: "granted",
          source: "site-control",
        }}
      >
        <span>regulated payload</span>
      </AdSlot>,
    );

    expect(screen.queryByText("regulated payload")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Advertisement")).toHaveAttribute(
      "data-ad-payload-allowed",
      "false",
    );

    rerender(
      <AdSlot
        placement="content-break"
        privacyRegion="regulated"
        consent={{
          version: AD_CONSENT_POLICY_VERSION,
          decision: "granted",
          source: "certified-cmp",
        }}
      >
        <span>regulated payload</span>
      </AdSlot>,
    );

    expect(screen.getByText("regulated payload")).toBeInTheDocument();
  });

  it("keeps placement names constrained to the approved architecture", () => {
    expect(Object.keys(adPlacements)).toEqual([
      "calculator-after-result",
      "content-break",
      "desktop-sidebar",
    ]);
  });
});
