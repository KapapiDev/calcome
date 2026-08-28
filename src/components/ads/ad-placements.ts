export const adPlacements = {
  "calculator-after-result": {
    minHeightClass: "min-h-[100px] sm:min-h-[250px]",
    containerClass: "mx-auto w-full max-w-[970px]",
    purpose: "Between the completed calculator experience and supporting content.",
  },
  "content-break": {
    minHeightClass: "min-h-[100px] sm:min-h-[250px]",
    containerClass: "mx-auto w-full max-w-[970px]",
    purpose: "Between substantial, independently useful content sections.",
  },
  "desktop-sidebar": {
    minHeightClass: "min-h-[600px]",
    containerClass: "hidden w-full max-w-[300px] lg:block",
    purpose: "Desktop-only rail outside calculator controls and result panels.",
  },
} as const;

export type AdPlacement = keyof typeof adPlacements;

export function getAdPlacement(placement: AdPlacement) {
  return adPlacements[placement];
}
