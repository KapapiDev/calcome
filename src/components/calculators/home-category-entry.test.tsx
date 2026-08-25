import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { visibleCalculatorDirectory } from "@/config/calculator-directory";

import { HomeCategoryEntry } from "./home-category-entry";

describe("HomeCategoryEntry", () => {
  it("derives Korean category links and counts from the directory source", () => {
    render(<HomeCategoryEntry />);

    for (const category of visibleCalculatorDirectory) {
      const link = screen.getByRole("link", {
        name: new RegExp(category.name),
      });
      expect(link).toHaveAttribute("href", `/calculators#${category.id}`);
      expect(link).toHaveTextContent(String(category.calculators.length));
    }
  });

  it("preserves the English locale for category entry", () => {
    render(<HomeCategoryEntry locale="en" />);

    expect(
      screen.getByRole("link", { name: /Loans & Credit/ }),
    ).toHaveAttribute("href", "/en/calculators#loan");
    expect(screen.getByRole("link", { name: /Investing/ })).toHaveAttribute(
      "href",
      "/en/calculators#investment",
    );
  });
});
