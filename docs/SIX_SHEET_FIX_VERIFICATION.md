# Six missing report sheets — integration verification

## Changes

| Sheet | Implementation | Accuracy statement |
|---|---|---|
| 04 Bhava | Additional optional `POST /v2/horoscope/kp`; displays returned 12 house cusps when available; accepts provider-supplied Bhava map | KP cusps are *not* necessarily the same as the printed Bhava chart; exact method remains unverified |
| 08 Panchamamsa D5 | Calculate five 6° segments using documented odd/even-sign mapping from provider longitudes | Local formula, not independently validated against the printed reference |
| 09 Shashtamsa D6 | Calculate six 5° segments; odd sign starts Aries, even starts Libra | Local formula, not independently validated against printed reference |
| 11 Mahadasa | Additional optional `GET /v2/horoscope/dasa` using name + birth query | Endpoint and Type-A query documented; final response fields must be checked |
| 12 Dasa-Bhukti I | Parse documented Dasa result for Bhukti/Antardasa intervals | Actual response schema not yet verified |
| 13 Dasa-Bhukti II | Additional optional `GET /v2/horoscope/dasa/deep` with same birth query | Deep endpoint exists in Postman, but required query/response schema not confirmed; error shown without hiding base report |

## Provider references

- <https://api.exactpredictions.in/v2/docs> documents `GET /v2/horoscope/dasa` with birth query parameters, and chart-context use for Type-B endpoints.
- Provided Postman collection contains `GET /v2/horoscope/dasa/deep` and `POST /v2/horoscope/kp`.
- <https://www.mohanastrology.com/about-astrology/astrology-software-divisional-chart> includes D5 and D6 division algorithms.

## Browser verification (mocked provider responses, no paid API call)

- Test environment: headless Chromium via Playwright, with mocked HTTP 200 for `/api/exact/chart`.
- Generated 23 sheets.
- Sheet 04: 12 KP cusp rows.
- Sheet 08: D5 South-Indian chart.
- Sheet 09: D6 South-Indian chart.
- Sheets 11–13: separate structured Dasa/Deep-Dasa period tables.
- No JavaScript errors.
- Original controller, old tab templates, and horoscope engine retained.

**Not performed here:** Full `mvn test`/`mvn package` (Maven dependencies unavailable); live ExactPredictions subscription/API call (no secret supplied). This is not an end-to-end provider-verification claim.

## Run on Windows

```powershell
$env:EXACT_PREDICTIONS_API_KEY = 'YOUR_KEY'
mvn clean spring-boot:run
```

Open <http://localhost:8080>, Exact Predictions tab, and keep **Request Dasa and Deep Dasa** and **Request Bhava / KP house data** checked. Inspect **Response diagnostics**; download **Raw JSON** (not the Postman collection) if a section remains empty. Never share the key.

Default live generation makes *up to four* provider calls, or five with Ashtavargam; some calls may consume credits. Uncheck optional requests to save credits.
