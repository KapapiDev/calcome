import type { ReactNode } from "react";

import { getAdPlacement, type AdPlacement } from "./ad-placements";

type AdSlotProps = {
  placement: AdPlacement;
  children?: ReactNode;
  className?: string;
  label?: string;
};

export function AdSlot({
  placement,
  children,
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const config = getAdPlacement(placement);
  const classes = [
    "flex items-center justify-center overflow-hidden",
    config.minHeightClass,
    config.containerClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside
      aria-label={label}
      className={classes}
      data-ad-placement={placement}
      data-ad-reserved-space="true"
    >
      {children}
    </aside>
  );
}
