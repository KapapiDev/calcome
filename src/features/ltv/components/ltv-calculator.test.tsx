import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LtvCalculator } from "./ltv-calculator";

describe("LtvCalculator", () => {
  it("clears a previous result and links validation errors after invalid resubmission", async () => {
    const user = userEvent.setup();
    render(<LtvCalculator locale="ko" />);

    const propertyValue = screen.getByLabelText("담보가치");
    const loanAmount = screen.getByLabelText("대출금액");

    await user.type(propertyValue, "500000000");
    await user.type(loanAmount, "300000000");
    await user.click(screen.getByRole("button", { name: "LTV 계산하기" }));

    expect(await screen.findByText("60%")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "계산하면 예상 LTV와 목표 비율 기준 대출 여력이 표시됩니다.",
      ),
    ).not.toBeInTheDocument();

    await user.clear(propertyValue);
    await user.click(screen.getByRole("button", { name: "LTV 계산하기" }));

    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "ltv-error-summary",
    );
    expect(propertyValue).toHaveAttribute("aria-invalid", "true");
    expect(propertyValue).toHaveAttribute(
      "aria-describedby",
      "propertyValue-error ltv-error-summary",
    );
    expect(screen.queryByText("60%")).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "계산하면 예상 LTV와 목표 비율 기준 대출 여력이 표시됩니다.",
      ),
    ).toBeInTheDocument();
  });
});
