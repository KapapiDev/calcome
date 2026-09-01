import { beforeEach, describe, expect, it } from "vitest";

import {
  consumeDirectoryReturnContext,
  saveDirectoryReturnContext,
} from "./calculator-directory-context";

const STORAGE_KEY = "calcome:calculator-directory-return-context";

describe("calculator directory return context", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });
  });

  it("restores one same-locale directory position without storing calculator data", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 642.4,
    });

    saveDirectoryReturnContext("ko");

    expect(window.sessionStorage.getItem(STORAGE_KEY)).toBe(
      JSON.stringify({ locale: "ko", scrollY: 642 }),
    );
    expect(consumeDirectoryReturnContext("ko")).toBe(642);
    expect(window.sessionStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(consumeDirectoryReturnContext("ko")).toBeNull();
  });

  it("does not restore a Korean directory position into the English directory", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 321,
    });

    saveDirectoryReturnContext("ko");

    expect(consumeDirectoryReturnContext("en")).toBeNull();
    expect(window.sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("ignores malformed or unsafe stored context", () => {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ locale: "ko", scrollY: -1 }),
    );

    expect(consumeDirectoryReturnContext("ko")).toBeNull();
    expect(window.sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
