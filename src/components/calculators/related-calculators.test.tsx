import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";

import {
  getRelatedCalculators,
  RelatedCalculators,
} from "./related-calculators";

const { pathnameRef } = vi.hoisted(() => ({
  pathnameRef: { current: "/" },
}));

vi.mock("next/navigation", () => ({
  usePathname: () => pathnameRef.current,
}));

describe("RelatedCalculators", () => {
  it("derives deterministic compound-interest journeys from published sources", () => {
    expect(
      getRelatedCalculators("/ko/finance/compound-interest").map(
        (calculator) => calculator.id,
      ),
    ).toEqual(["savings", "deposit", "savings-goal", "cagr"]);
  });

  it("keeps every topic cluster bounded, unique, published, and free of self links", () => {
    const publishedIds = new Set(
      allPublishedCalculators.map((calculator) => calculator.id),
    );

    for (const calculator of allPublishedCalculators) {
      const related = getRelatedCalculators(calculator.href);
      const ids = related.map((entry) => entry.id);

      expect(ids.length).toBeLessThanOrEqual(4);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids).not.toContain(calculator.id);
      for (const id of ids) expect(publishedIds.has(id)).toBe(true);
    }
  });

  it("preserves English locale in every related target", () => {
    pathnameRef.current = "/en/finance/compound-interest";
    render(<RelatedCalculators locale="en" />);

    expect(
      screen.getByRole("heading", { name: "Related calculators" }),
    ).toBeInTheDocument();
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^\/en\//);
    }
    expect(
      screen.getByRole("link", { name: "Savings Calculator" }),
    ).toHaveAttribute("href", "/en/finance/savings");
  });

  it("does not render recommendations on non-calculator routes", () => {
    pathnameRef.current = "/ko/calculators";
    const { container } = render(<RelatedCalculators locale="ko" />);

    expect(container).toBeEmptyDOMElement();
  });
});
