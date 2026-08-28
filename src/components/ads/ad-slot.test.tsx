import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { adPlacements } from "./ad-placements";
import { AdSlot } from "./ad-slot";

describe("AdSlot", () => {
  it.each(Object.entries(adPlacements))(
    "reserves deterministic space for %s",
    (placement, config) => {
      render(
        <AdSlot placement={placement as keyof typeof adPlacements}>
          <span>ad payload</span>
        </AdSlot>,
      );

      const slot = screen.getByLabelText("Advertisement");
      expect(slot).toHaveAttribute("data-ad-placement", placement);
      expect(slot).toHaveAttribute("data-ad-reserved-space", "true");
      for (const className of config.minHeightClass.split(" ")) {
        expect(slot).toHaveClass(className);
      }
      expect(screen.getByText("ad payload")).toBeInTheDocument();
    },
  );

  it("keeps placement names constrained to the approved architecture", () => {
    expect(Object.keys(adPlacements)).toEqual([
      "calculator-after-result",
      "content-break",
      "desktop-sidebar",
    ]);
  });
});
