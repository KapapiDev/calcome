import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { DtiCalculator } from "./dti-calculator";

describe("DtiCalculator", () => {
  beforeEach(() => window.localStorage.clear());

  it("defaults English to USD and keeps DTI results across currency changes", async () => {
    const user = userEvent.setup();
    const { container } = render(<DtiCalculator locale="en" />);

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Annual income"), "60000");
    await user.type(screen.getByLabelText("Mortgage amount"), "300000");
    await user.type(
      screen.getByLabelText("Mortgage annual interest rate"),
      "4.5",
    );
    await user.type(screen.getByLabelText("Repayment term"), "30");
    await user.type(
      screen.getByLabelText("Other monthly debt payments"),
      "500",
    );
    await user.click(screen.getByRole("button", { name: "Calculate DTI" }));
    expect(screen.getByText("Total annual debt payments")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("Total annual debt payments")).toBeVisible();
  });
  it("clears a previous result and links validation errors after invalid resubmission", async () => {
    const user = userEvent.setup();
    render(<DtiCalculator locale="ko" />);

    const annualIncome = screen.getByLabelText("연소득");
    const mortgagePrincipal = screen.getByLabelText("주택담보대출금");
    const interestRate = screen.getByLabelText("주택담보대출 연이율");
    const termYears = screen.getByLabelText("상환 기간");
    const otherMonthlyDebt = screen.getByLabelText("기타 월 부채 상환액");
    const emptyState = "계산하면 예상 DTI와 상환 부담이 표시됩니다.";

    await user.type(annualIncome, "60000000");
    await user.type(mortgagePrincipal, "300000000");
    await user.type(interestRate, "4.5");
    await user.type(termYears, "30");
    await user.type(otherMonthlyDebt, "500000");
    await user.click(screen.getByRole("button", { name: "DTI 계산하기" }));

    expect(screen.queryByText(emptyState)).not.toBeInTheDocument();

    await user.clear(annualIncome);
    await user.click(screen.getByRole("button", { name: "DTI 계산하기" }));

    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "dti-error-summary",
    );
    expect(annualIncome).toHaveAttribute("aria-invalid", "true");
    expect(annualIncome).toHaveAttribute(
      "aria-describedby",
      "annualIncome-error dti-error-summary",
    );
    expect(screen.getByText(emptyState)).toBeInTheDocument();
  });
});
