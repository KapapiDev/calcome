import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { FormEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import { CalculatorActions, PrimaryResults } from "./calculator-workspace";

describe("shared calculator keyboard submit and reset interactions", () => {
  it("applies shared validation to form submission, including keyboard-style submit", () => {
    const handleSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    render(
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount</label>
        <input id="amount" required />
        <CalculatorActions submitLabel="Calculate" onReset={() => undefined} />
      </form>,
    );

    const form = screen.getByRole("button", { name: "Calculate" }).closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(screen.getByLabelText("Amount")).toHaveFocus();
    expect(screen.getByRole("alert")).toHaveTextContent("Amount");
  });

  it("keeps valid form submit behavior available after shared keyboard validation", () => {
    const handleSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    });

    render(
      <form onSubmit={handleSubmit}>
        <input aria-label="Amount" required defaultValue="100" />
        <CalculatorActions submitLabel="Calculate" onReset={() => undefined} />
      </form>,
    );

    const form = screen.getByRole("button", { name: "Calculate" }).closest("form");
    fireEvent.submit(form!);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("clears stale-result state and returns focus to the first form control after reset", async () => {
    render(
      <div>
        <form>
          <input aria-label="Amount" defaultValue="100" />
          <CalculatorActions submitLabel="Calculate" onReset={() => undefined} />
        </form>
        <section>
          <PrimaryResults
            metrics={[
              { label: "Result", value: "$10" },
              { label: "Principal", value: "$100" },
              { label: "Return", value: "$10" },
            ]}
          />
        </section>
      </div>,
    );

    const amount = screen.getByRole("textbox", { name: "Amount" });
    fireEvent.change(amount, { target: { value: "200" } });
    expect(screen.getByTestId("stale-result-notice")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    await waitFor(() => expect(amount).toHaveFocus());
    expect(screen.queryByTestId("stale-result-notice")).not.toBeInTheDocument();
  });
});
