import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { LtvCalculator } from "./ltv-calculator";

describe("LtvCalculator", () => {
  beforeEach(() => window.localStorage.clear());

  it("defaults English to USD and keeps LTV results across currency changes", async () => {
    const user = userEvent.setup();
    const { container } = render(<LtvCalculator locale="en" />);

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Property value"), "500000");
    await user.type(screen.getByLabelText("Loan amount"), "300000");
    await user.click(screen.getByRole("button", { name: "Calculate LTV" }));
    expect(screen.getByText("Owner equity in property")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("Owner equity in property")).toBeVisible();
  });
  it("clears a previous result and links validation errors after invalid resubmission", async () => {
    const user = userEvent.setup();
    render(<LtvCalculator locale="ko" />);

    const propertyValue = screen.getByLabelText("담보가치");
    const loanAmount = screen.getByLabelText("대출금액");
    const emptyState =
      "계산하면 예상 LTV와 목표 비율 기준 대출 여력이 표시됩니다.";

    await user.type(propertyValue, "500000000");
    await user.type(loanAmount, "300000000");
    await user.click(screen.getByRole("button", { name: "LTV 계산하기" }));

    expect(screen.queryByText(emptyState)).not.toBeInTheDocument();

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
    expect(screen.getByText(emptyState)).toBeInTheDocument();
  });
});
