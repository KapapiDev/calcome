import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { DsrCalculator } from "./dsr-calculator";

describe("DsrCalculator", () => {
  beforeEach(() => window.localStorage.clear());

  it("defaults English to USD and keeps DSR results across currency changes", async () => {
    const user = userEvent.setup();
    const { container } = render(<DsrCalculator locale="en" />);

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Annual income"), "60000");
    await user.type(
      screen.getByLabelText("Existing annual debt service"),
      "6000",
    );
    await user.type(screen.getByLabelText("New loan amount"), "100000");
    await user.type(
      screen.getByLabelText("New loan annual interest rate"),
      "4.5",
    );
    await user.type(screen.getByLabelText("Repayment term"), "20");
    await user.click(screen.getByRole("button", { name: "Calculate DSR" }));
    expect(screen.getByText("New loan annual debt service")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("New loan annual debt service")).toBeVisible();
  });
  it("clears a previous result and links validation errors after invalid resubmission", async () => {
    const user = userEvent.setup();
    render(<DsrCalculator locale="ko" />);

    const annualIncome = screen.getByLabelText("연소득");
    const existingDebt = screen.getByLabelText("기존 연간 원리금 상환액");
    const newLoan = screen.getByLabelText("신규 대출금");
    const interestRate = screen.getByLabelText("신규 대출 연이율");
    const termYears = screen.getByLabelText("상환 기간");
    const emptyState = "계산하면 예상 DSR과 상환 부담이 표시됩니다.";

    await user.type(annualIncome, "60000000");
    await user.type(existingDebt, "6000000");
    await user.type(newLoan, "100000000");
    await user.type(interestRate, "4.5");
    await user.type(termYears, "20");
    await user.click(screen.getByRole("button", { name: "DSR 계산하기" }));

    expect(screen.queryByText(emptyState)).not.toBeInTheDocument();

    await user.clear(annualIncome);
    await user.click(screen.getByRole("button", { name: "DSR 계산하기" }));

    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "dsr-error-summary",
    );
    expect(annualIncome).toHaveAttribute("aria-invalid", "true");
    expect(annualIncome).toHaveAttribute(
      "aria-describedby",
      "annualIncome-error dsr-error-summary",
    );
    expect(screen.getByText(emptyState)).toBeInTheDocument();
  });
});
