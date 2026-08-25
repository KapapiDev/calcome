import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it.each([
    ["default", ["h-11"]],
    ["xs", ["min-h-11", "min-w-11"]],
    ["sm", ["min-h-11", "min-w-11"]],
    ["lg", ["h-11"]],
    ["icon", ["size-11"]],
    ["icon-xs", ["size-11"]],
    ["icon-sm", ["size-11"]],
    ["icon-lg", ["size-11"]],
  ] as const)("keeps the %s size touch friendly", (size, expectedClasses) => {
    render(<Button size={size}>계산하기</Button>);

    expect(screen.getByRole("button", { name: "계산하기" })).toHaveClass(
      ...expectedClasses,
    );
  });
});
