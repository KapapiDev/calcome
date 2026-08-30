import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { visibleCalculatorDirectory } from "@/config/calculator-directory";

import { DirectoryCategoryNavigation } from "./directory-category-navigation";

describe("DirectoryCategoryNavigation", () => {
  it("keeps every Korean category reachable through local fragment targets", () => {
    render(<DirectoryCategoryNavigation />);

    const nav = screen.getByRole("navigation", { name: "계산기 카테고리" });
    expect(nav.querySelector("ul")).toHaveClass(
      "overflow-x-auto",
      "overscroll-x-contain",
      "snap-mandatory",
    );

    for (const category of visibleCalculatorDirectory) {
      const link = screen.getByRole("link", { name: new RegExp(category.name) });
      expect(link).toHaveAttribute("href", `#${category.id}`);
      expect(link).toHaveAttribute("aria-controls", category.id);
      expect(link).toHaveClass("min-h-11");
    }
  });

  it("preserves the same anchors with localized English category labels", () => {
    render(<DirectoryCategoryNavigation locale="en" />);

    expect(
      screen.getByRole("link", { name: /Pay & Employment/ }),
    ).toHaveAttribute("href", "#employment");
    expect(screen.getByRole("link", { name: /Loans & Credit/ })).toHaveAttribute(
      "href",
      "#loan",
    );
    expect(screen.getByRole("link", { name: /Business & Everyday/ })).toHaveAttribute(
      "href",
      "#business-life",
    );
  });
});
