import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CalculatorSearch } from "@/components/calculators/calculator-search";
import { getEnglishCalculatorName } from "@/config/calculator-directory-calculator-copy";
import { directorySearchCalculators } from "@/config/calculator-directory";
import { getEnglishCalculatorSearchAliases } from "@/config/calculator-search-keyword-copy";

function sourceCalculator(id: string) {
  const calculator = directorySearchCalculators.find((item) => item.id === id);
  if (!calculator) throw new Error(`Missing calculator fixture: ${id}`);
  return calculator;
}

function englishCalculator(id: string) {
  const calculator = sourceCalculator(id);
  return {
    ...calculator,
    name: getEnglishCalculatorName(id),
    keywords: getEnglishCalculatorSearchAliases(id),
    href: calculator.href.replace(/^\/ko\//, "/en/") as typeof calculator.href,
  };
}

describe("English calculator search alias ranking", () => {
  it("keeps an exact calculator-name match ahead of an explicit alias match", async () => {
    const user = userEvent.setup();
    const aliasMatch = englishCalculator("loan");
    const explicitAlias = getEnglishCalculatorSearchAliases("loan")[0];
    const exactNameMatch = {
      ...englishCalculator("mortgage-payment"),
      name: explicitAlias,
    };

    render(
      <CalculatorSearch
        calculators={[aliasMatch, exactNameMatch]}
        locale="en"
      />,
    );
    await user.type(
      screen.getByRole("searchbox", { name: "Search calculators" }),
      explicitAlias,
    );

    const links = within(
      screen.getByRole("list", { name: "Calculator search results" }),
    ).getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", exactNameMatch.href);
    expect(links[1]).toHaveAttribute("href", aliasMatch.href);
  });

  it("ranks an exact explicit alias ahead of a broader alias match", async () => {
    const user = userEvent.setup();
    const broaderAlias = englishCalculator("mortgage-loan-limit");
    const exactAlias = englishCalculator("loan-affordability");

    expect(exactAlias.keywords).toContain("borrowing capacity");
    expect(broaderAlias.keywords).toContain("mortgage borrowing capacity");

    render(
      <CalculatorSearch calculators={[broaderAlias, exactAlias]} locale="en" />,
    );
    await user.type(
      screen.getByRole("searchbox", { name: "Search calculators" }),
      "borrowing capacity",
    );

    const links = within(
      screen.getByRole("list", { name: "Calculator search results" }),
    ).getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", exactAlias.href);
    expect(links[1]).toHaveAttribute("href", broaderAlias.href);
  });

  it("preserves source order when explicit alias scores tie", async () => {
    const user = userEvent.setup();
    const sharedAlias = getEnglishCalculatorSearchAliases("loan")[0];
    const first = {
      ...englishCalculator("mortgage-payment"),
      keywords: [sharedAlias],
    };
    const second = {
      ...englishCalculator("loan"),
      keywords: [sharedAlias],
    };

    render(<CalculatorSearch calculators={[first, second]} locale="en" />);
    await user.type(
      screen.getByRole("searchbox", { name: "Search calculators" }),
      sharedAlias,
    );

    const links = within(
      screen.getByRole("list", { name: "Calculator search results" }),
    ).getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", first.href);
    expect(links[1]).toHaveAttribute("href", second.href);
  });

  it("leaves Korean source search records, canonical routes, and inventory intact", () => {
    expect(directorySearchCalculators).toHaveLength(100);

    const koreanLoan = sourceCalculator("loan");
    const englishLoan = englishCalculator("loan");
    expect(koreanLoan.href).toBe("/ko/finance/loan");
    expect(englishLoan.href).toBe("/en/finance/loan");
    expect(englishLoan.id).toBe(koreanLoan.id);
    expect(englishLoan.keywords).toEqual(
      getEnglishCalculatorSearchAliases("loan"),
    );
  });
});
