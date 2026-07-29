import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { InheritanceTaxCalculator } from "./inheritance-tax-calculator";

const scrollIntoView = vi.fn();

describe("InheritanceTaxCalculator", () => {
  beforeEach(() => {
    scrollIntoView.mockReset();
    Element.prototype.scrollIntoView = scrollIntoView;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  it("clears stale inheritance tax results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<InheritanceTaxCalculator locale="ko" />);

    const grossEstate = screen.getByLabelText("총상속재산가액");
    await user.type(grossEstate, "2000000000");
    await user.type(screen.getByLabelText("피상속인 채무"), "200000000");
    await user.type(screen.getByLabelText("장례비용"), "20000000");
    await user.type(screen.getByLabelText("확인한 상속공제액"), "500000000");
    await user.type(screen.getByLabelText("확인한 상속세율"), "40");
    await user.type(screen.getByLabelText("확인한 누진공제액"), "160000000");
    await user.type(screen.getByLabelText("적용할 신고세액공제율"), "3");
    await user.click(
      screen.getByRole("button", { name: "예상 상속세 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("채무·장례비 차감 후 재산")).toBeVisible();
      expect(screen.getByText("신고세액공제 전 세액")).toBeVisible();
      expect(screen.getByText("신고세액공제액")).toBeVisible();
      expect(screen.getByText("순상속재산 대비 실효세율")).toBeVisible();
    });

    await user.clear(grossEstate);
    await user.click(
      screen.getByRole("button", { name: "예상 상속세 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "inheritance-tax-error-summary",
      );
      expect(grossEstate).toHaveAttribute("aria-invalid", "true");
      expect(grossEstate).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("grossEstate-error"),
      );
      expect(grossEstate).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("inheritance-tax-error-summary"),
      );
      expect(
        screen.queryByText("채무·장례비 차감 후 재산"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("신고세액공제 전 세액"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("신고세액공제액")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
