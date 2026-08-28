# ADS-005 AdSense Integration and ads.txt

Verified against current Google AdSense Help guidance on 2026-08-29.

## Production configuration

1. Register `https://www.calcome.com` in the intended AdSense account and copy the account publisher ID. The expected format is `pub-` plus 16 digits.
2. Set `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` only to that publisher ID in the Vercel Production environment. Do not add it to Preview or Development.
3. Production then loads Google's async AdSense bootstrap using `ca-<publisher-id>`. Preview and Development never load that script, even if a publisher ID leaks into those environments.
4. Production `/ads.txt` emits the Google DIRECT seller record. Missing or malformed configuration returns 404 with `X-CalCome-AdSense-Status` and no seller record.
5. The root `<body>` exposes `data-ad-runtime-status` as a lightweight deployment diagnostic without exposing account secrets beyond the publisher ID that AdSense itself publishes in page code and ads.txt.
6. ADS-004 consent guards remain authoritative for ad payloads. The bootstrap integration must not be treated as a substitute for a Google-certified CMP where one is required.

## Production verification checklist

- Confirm the Vercel Production environment contains the intended publisher ID and Preview does not.
- Open `https://www.calcome.com/ads.txt` and verify the record exactly matches the AdSense account's publisher ID.
- View production HTML and verify the AdSense script uses the same `ca-pub-...` client ID.
- Confirm a Preview deployment has `data-ad-runtime-status="non-production"`, no AdSense network bootstrap, and `/ads.txt` returns 404.
- In AdSense Sites, compare the site's approval/readiness and ads.txt status with the production observations above.
- Verify regulated-region traffic remains behind the certified-CMP boundary documented by ADS-004 before enabling personalized advertising.

## Official sources

- Google AdSense Help, “Ads.txt guide”, verified 2026-08-29.
- Google AdSense Help, “Reminder: The new AdSense code is available”, verified 2026-08-29.
