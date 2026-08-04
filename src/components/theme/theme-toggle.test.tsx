import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider, THEME_STORAGE_KEY } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";

const matchMediaMock = vi.fn();

function setSystemTheme(dark: boolean) {
  matchMediaMock.mockReturnValue({
    matches: dark,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

function renderThemeToggle(locale: "ko" | "en" = "ko") {
  return render(
    <ThemeProvider>
      <ThemeToggle locale={locale} />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    delete document.documentElement.dataset.theme;
    document.documentElement.style.colorScheme = "";
    matchMediaMock.mockReset();
    setSystemTheme(false);
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    delete document.documentElement.dataset.theme;
    document.documentElement.style.colorScheme = "";
  });

  it("follows the system dark preference on first visit", async () => {
    setSystemTheme(true);
    renderThemeToggle();

    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(
      screen.getByRole("button", { name: "라이트 모드로 전환" }),
    ).toBeEnabled();
    expect(screen.getByTestId("theme-sun")).toBeInTheDocument();
  });

  it("follows the system light preference on first visit", async () => {
    renderThemeToggle();

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "light"),
    );
    expect(document.documentElement).not.toHaveClass("dark");
    expect(
      screen.getByRole("button", { name: "다크 모드로 전환" }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "다크 모드로 전환" }),
    ).toHaveClass("size-11");
    expect(screen.getByTestId("theme-moon")).toBeInTheDocument();
  });

  it("persists a manual override across remounts", async () => {
    const user = userEvent.setup();
    const firstRender = renderThemeToggle();
    await user.click(
      await screen.findByRole("button", { name: "다크 모드로 전환" }),
    );

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
    firstRender.unmount();

    setSystemTheme(false);
    renderThemeToggle();
    expect(
      await screen.findByRole("button", { name: "라이트 모드로 전환" }),
    ).toBeEnabled();
    expect(document.documentElement).toHaveClass("dark");
  });

  it("supports keyboard activation and updates label and icon", async () => {
    const user = userEvent.setup();
    renderThemeToggle();
    const toggle = await screen.findByRole("button", {
      name: "다크 모드로 전환",
    });

    await user.tab();
    expect(toggle).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", { name: "라이트 모드로 전환" }),
    ).toBeVisible();
    expect(screen.getByTestId("theme-sun")).toBeVisible();
    expect(document.documentElement).toHaveClass("dark");
  });

  it("uses English action labels without changing theme behavior", async () => {
    const user = userEvent.setup();
    renderThemeToggle("en");
    const toggle = await screen.findByRole("button", {
      name: "Switch to dark mode",
    });
    await user.click(toggle);
    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toBeVisible();
    expect(document.documentElement).toHaveClass("dark");
  });
});
