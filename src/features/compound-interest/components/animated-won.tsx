"use client";

import Decimal from "decimal.js";
import { useEffect, useState } from "react";

import type { DisplayCurrency } from "@/components/calculators/currency-selector";

import { formatCompoundCurrency } from "../format";
import type { CompoundLocale } from "../i18n";
import {
  COMPOUND_ANIMATION_DELAY,
  COMPOUND_ANIMATION_DURATION,
  easeInOut,
  usePrefersReducedMotion,
} from "./compound-animation";

export function AnimatedWon({
  value,
  locale = "ko",
  currency = "KRW",
  animationKey = 0,
}: {
  value: Decimal.Value | null;
  locale?: CompoundLocale;
  currency?: DisplayCurrency;
  animationKey?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const target = value === null ? "0" : new Decimal(value).toString();
  const [displayedValue, setDisplayedValue] = useState(() =>
    prefersReducedMotion ? target : "0",
  );

  useEffect(() => {
    if (value === null || prefersReducedMotion) return;

    let frameId = 0;
    let firstFrameTime: number | null = null;
    const targetValue = new Decimal(target);

    function animate(timestamp: number) {
      firstFrameTime ??= timestamp;
      const elapsed = timestamp - firstFrameTime;
      if (elapsed < COMPOUND_ANIMATION_DELAY) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(
        (elapsed - COMPOUND_ANIMATION_DELAY) / COMPOUND_ANIMATION_DURATION,
        1,
      );
      const nextValue = targetValue
        .mul(easeInOut(progress))
        .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
        .toString();
      setDisplayedValue(progress === 1 ? target : nextValue);
      if (progress < 1) frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [animationKey, prefersReducedMotion, target, value]);

  const finalValue = formatCompoundCurrency(target, locale, currency);
  return (
    <span
      aria-label={finalValue}
      data-animation-run={animationKey}
      data-testid="animated-won"
    >
      {formatCompoundCurrency(displayedValue, locale, currency)}
    </span>
  );
}
