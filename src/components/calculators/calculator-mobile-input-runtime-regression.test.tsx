import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AgeCalculator } from "@/features/age/components/age-calculator";
import { BusinessCashRunwayCalculator } from "@/features/business-cash-runway/components/business-cash-runway-calculator";
import { CagrCalculator } from "@/features/cagr/components/cagr-calculator";

function expectMobileControl(input: HTMLInputElement, heightClass: string) {
  expect(input).toHaveClass(heightClass, "w-full", "text-base");
}

describe("calculator mobile input runtime regression", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
    window.localStorage.clear();
  });

  for (const locale of ["ko", "en"] as const) {
    it(`keeps ${locale} numeric and formatted-money inputs on decimal mobile keyboards`, () => {
      const cagr = render(<CagrCalculator locale={locale} />);
      const numeric = cagr.container.querySelector<HTMLInputElement>(
        "#investmentPeriod",
      );
      const formattedMoney = cagr.container.querySelector<HTMLInputElement>(
        "#initialValue",
      );

      expect(numeric).not.toBeNull();
      expect(formattedMoney).not.toBeNull();
      expect(numeric).toHaveAttribute("inputmode", "decimal");
      expect(formattedMoney).toHaveAttribute("inputmode", "decimal");
      expectMobileControl(numeric!, "h-10");
      expectMobileControl(formattedMoney!, "h-10");

      fireEvent.change(formattedMoney!, { target: { value: "1234567" } });
      expect(formattedMoney).toHaveValue("1,234,567");

      cagr.unmount();

      const runway = render(<BusinessCashRunwayCalculator locale={locale} />);
      const startingCash =
        runway.container.querySelector<HTMLInputElement>("#startingCash");

      expect(startingCash).not.toBeNull();
      expect(startingCash).toHaveAttribute("inputmode", "decimal");
      expectMobileControl(startingCash!, "h-11");

      fireEvent.change(startingCash!, { target: { value: "987654" } });
      expect(startingCash).toHaveValue("987,654");
    });

    it(`keeps ${locale} native date inputs usable without text-keyboard overrides`, () => {
      const { container } = render(<AgeCalculator locale={locale} />);
      const birthDate = container.querySelector<HTMLInputElement>("#birthDate");
      const asOfDate = container.querySelector<HTMLInputElement>("#asOfDate");

      for (const input of [birthDate, asOfDate]) {
        expect(input).not.toBeNull();
        expect(input).toHaveAttribute("type", "date");
        expect(input).not.toHaveAttribute("inputmode");
        expectMobileControl(input!, "h-11");
      }
    });
  }
});
