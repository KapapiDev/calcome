import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it.each(["default", "lg"] as const)(
    "keeps the %s size touch friendly",
    (size) => {
      render(<Button size={size}>계산하기</Button>);

      expect(screen.getByRole("button", { name: "계산하기" })).toHaveClass(
        "h-11",
      );
    },
  );
});
