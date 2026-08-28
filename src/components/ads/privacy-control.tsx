"use client";

import { useEffect, useState } from "react";

import {
  AD_CONSENT_POLICY_VERSION,
  AD_CONSENT_STORAGE_KEY,
  defaultAdConsent,
  parseStoredAdConsent,
  requiresCertifiedCmp,
  serializeAdConsent,
  type AdConsentDecision,
  type AdConsentSnapshot,
  type AdPrivacyRegion,
} from "./ad-consent";

const copy = {
  ko: {
    button: "개인정보 선택",
    title: "개인정보 및 광고 선택",
    regulated:
      "이 지역의 광고 동의는 Google 인증 CMP를 통해 처리해야 합니다. CalCome의 자체 선택 기능은 인증 CMP 동의를 대신하지 않습니다.",
    other:
      "선택적 광고 사용을 허용하거나 거부할 수 있습니다. 거부해도 계산기 기능에는 영향이 없습니다.",
    allow: "선택적 광고 허용",
    deny: "선택적 광고 거부",
    reset: "선택 초기화",
    close: "닫기",
  },
  en: {
    button: "Privacy choices",
    title: "Privacy and advertising choices",
    regulated:
      "Advertising consent in this region must be handled through a Google-certified CMP. CalCome's local preference does not replace certified CMP consent.",
    other:
      "You can allow or reject optional advertising. Rejecting it does not affect calculator features.",
    allow: "Allow optional ads",
    deny: "Reject optional ads",
    reset: "Reset choice",
    close: "Close",
  },
} as const;

type PrivacyControlProps = {
  locale: "ko" | "en";
  region: AdPrivacyRegion;
};

export function PrivacyControl({ locale, region }: PrivacyControlProps) {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<AdConsentSnapshot>(defaultAdConsent);
  const text = copy[locale];
  const cmpRequired = requiresCertifiedCmp(region);

  useEffect(() => {
    setConsent(parseStoredAdConsent(window.localStorage.getItem(AD_CONSENT_STORAGE_KEY)));
  }, []);

  const save = (decision: AdConsentDecision) => {
    const next: AdConsentSnapshot = {
      version: AD_CONSENT_POLICY_VERSION,
      decision,
      source: "site-control",
    };
    window.localStorage.setItem(AD_CONSENT_STORAGE_KEY, serializeAdConsent(next));
    setConsent(next);
  };

  const reset = () => {
    window.localStorage.removeItem(AD_CONSENT_STORAGE_KEY);
    setConsent(defaultAdConsent);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col items-end gap-2">
      {open ? (
        <section
          aria-label={text.title}
          className="rounded-xl border bg-background p-4 text-sm text-foreground shadow-lg"
        >
          <div className="mb-2 flex items-start justify-between gap-4">
            <h2 className="font-semibold">{text.title}</h2>
            <button
              type="button"
              className="rounded px-2 py-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setOpen(false)}
            >
              {text.close}
            </button>
          </div>
          <p className="mb-3 text-muted-foreground">
            {cmpRequired ? text.regulated : text.other}
          </p>
          <div className="flex flex-wrap gap-2">
            {!cmpRequired ? (
              <button
                type="button"
                className="rounded-md border px-3 py-2 font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => save("granted")}
              >
                {text.allow}
              </button>
            ) : null}
            <button
              type="button"
              className="rounded-md border px-3 py-2 font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => save("denied")}
            >
              {text.deny}
            </button>
            {consent.decision !== "unknown" ? (
              <button
                type="button"
                className="rounded-md px-3 py-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={reset}
              >
                {text.reset}
              </button>
            ) : null}
          </div>
        </section>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        className="rounded-full border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setOpen((value) => !value)}
      >
        {text.button}
      </button>
    </div>
  );
}
