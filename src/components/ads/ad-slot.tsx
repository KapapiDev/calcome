import type { ReactNode } from "react";

import {
  canLoadAdPayload,
  defaultAdConsent,
  type AdConsentSnapshot,
  type AdPrivacyRegion,
} from "./ad-consent";
import { getAdPlacement, type AdPlacement } from "./ad-placements";

type AdSlotProps = {
  placement: AdPlacement;
  children?: ReactNode;
  className?: string;
  label?: string;
  privacyRegion?: AdPrivacyRegion;
  consent?: AdConsentSnapshot;
};

export function AdSlot({
  placement,
  children,
  className = "",
  label = "Advertisement",
  privacyRegion = "unknown",
  consent = defaultAdConsent,
}: AdSlotProps) {
  const config = getAdPlacement(placement);
  const payloadAllowed = canLoadAdPayload(privacyRegion, consent);
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
      data-ad-payload-allowed={payloadAllowed ? "true" : "false"}
      data-ad-reserved-space="true"
    >
      {payloadAllowed ? children : null}
    </aside>
  );
}
