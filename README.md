# IK's Astrology — Exact Predictions Pro Edition

Spring Boot 3.2.5 / Java 17 / Thymeleaf. **Derived from the actual IKs_Astrology_PDF_Layout_Fixed_SpringBoot.zip** source (all nine existing tabs and engines retained). One new **✦ Exact Predictions Pro** tab is added; legacy chart/PDF logic is otherwise preserved.

## Start on Windows (PowerShell)

1. Install **JDK 17** (or JDK 21) and **Apache Maven 3.9+**, if not already installed.
2. Extract the ZIP and open a terminal at `iks-astrology-exact-predictions/` (the folder containing `pom.xml`).
3. **Do not paste the key into source code or browser developer tools.** In PowerShell set the API key *in this terminal session*:

   ```powershell
   $env:EXACT_PREDICTIONS_API_KEY = 'YOUR_PRO_KEY'
   mvn spring-boot:run
   ```

4. Open **http://localhost:8080/** and choose **Exact Predictions PRO**. Enter birth details and click **Generate 23-sheet report**.
5. Use **↓ Raw JSON** to preserve the original provider responses and **↓ Save as PDF** to download an A4 report. The existing toolbar **Download PDF** also routes to the new exporter while on that tab. Print-to-PDF is used as a fallback if the image/PDF renderer is unavailable.

**Windows CMD alternative**: `set EXACT_PREDICTIONS_API_KEY=YOUR_PRO_KEY` (for the current terminal). Then `mvn spring-boot:run`.

**No API key?** The existing nine tabs still work. The Exact tab shows an explicit Not Configured status; it does not fabricate API results.

## What the 23 reports mean

These are 23 **reference report sheets**, not a claim of 23 independently documented provider endpoints. Every sheet includes a provenance tag:

- **ExactPredictions source**: the provider returned this data and the renderer mapped it directly.
- **Derived locally · verify**: calculated from *live* provider planetary longitudes using standard Varga formulas or the existing Amma Ashtakavarga contributor rules. API parity with the specific traditional book is **not established**.
- **Not in confirmed API data**: the API call did not supply the necessary fields or exact convention. The app shows this rather than inventing values.

See `docs/23-reference-sheets.md` for the complete mapping.

## Cost / API calls

Every generation sends one `POST /v2/horoscope?language=en&include=basic,essentials` request. As of the six-sheet fix, two optional (checked by default) Dasa requests, `GET /v2/horoscope/dasa` and `GET /v2/horoscope/dasa/deep`, are sent with the user's name and birth details in URL-encoded query parameters. An optional (checked by default) `POST /v2/horoscope/kp` attempts to retrieve house cusps for the Bhava page. Checking Ashtavargam adds one `POST /v2/horoscope/astavargam`. **This means four potential provider requests by default, five with Ashtavargam.** Each successful catalogued calculation may use credits; uncheck optional features to reduce consumption. Requests are made only upon explicit user submission, not in a background timer. Optional endpoint errors preserve the base horoscope and show statuses; there are no automatic retries. The `/dasa/deep` Type-A query is a best-effort implementation based on the public collection because its exact parameter requirements remain unverified.

**Locally derived divisional charts:** D5 uses five 6° sectors: odd signs map to Aries/Aquarius/Sagittarius/Gemini/Libra and even signs to Taurus/Virgo/Pisces/Capricorn/Scorpio. D6 uses six 5° sectors counted from Aries for odd signs and Libra for even signs. These published variants are calculated from provider longitudes and explicitly flagged as local estimates until compared with your original printed reference.

**Bhava caution:** the KP endpoint may return house cusps. A KP house-cusp table is **not** proof of an equivalent traditional Bhava Chalit chart. Without explicit house placements and their system, the app shows cusp data plus a method warning rather than a fabricated chart.

## Security

`EXACT_PREDICTIONS_API_KEY` is read only by Spring Boot on the server via `application.properties`. Calls are restricted to the fixed official `api.exactpredictions.in` host. Browser calls send only birth details to the **local** `/api/exact/chart` endpoint; the backend adds the bearer token. The app does not persist charts in a database or log API responses. **Avoid deploying the application publicly without authentication**, because untrusted visitors could consume your credits through the server-side key.

### Optional: Docker / Render

Build: `docker build -t iks-astrology-exact .`  
Run: `docker run --rm -p 8080:8080 -e EXACT_PREDICTIONS_API_KEY=YOUR_KEY iks-astrology-exact`

For Render, choose **Docker** deployment, set `EXACT_PREDICTIONS_API_KEY` in the Render environment-variable dashboard (not in Git), and deploy. Add authentication before making that Render URL public.

## API verification still needed

No real paid-key response was available in the development environment. Use **Preview 23 sheets (no API credits)** first. This is a clearly labelled offline Postman fixture, NOT your horoscope. Then generate one live chart, or click **Import Postman response JSON** after exporting a real response. `src/main/resources/static/js/exact-predictions.js` parses nested V2 responses and shows a diagnostic panel. After your first run, export **Raw JSON** (strip the patient's name/date as desired) and compare against the book. Important gaps still include exact provider D5/D6, Bhava house system, Dasa/Antardasa context, Bhinna-to-shodhana shapes, and some of the special `ஆதியும் அந்தமும்` fields. These cannot be claimed exact without authenticated output and independent reference checks.

## Build checks

From the project root, run:

```
mvn test
mvn clean package
java -jar target/iks-astrology-2.0.0.jar
```

The ZIP includes JUnit smoke tests and the previous app's PDF layout notes. In the current authoring sandbox Maven and remote Maven repositories were unavailable; the final Maven compilation and real provider calls must be run in a normal developer environment.

## Provider `basic` envelope fix — 18 October 2026

The real paid-key provider returned **HTTP 200** with root fields `status, meta, basic`. The previous application only unwrapped `data`, `result`, `response`, `horoscope`, `chart`, and `payload`; it incorrectly treated this valid response as missing chart data. This update:

1. Maps nested `basic.data.planets` and `basic.data.rasi_chart` (also supports `basic.planets`, stand-alone `data`, and existing sample shapes).
2. Passes **only the returned `basic` chart context**, not the combined envelope and not an extra duplicate `data` wrapper, to `POST /v2/horoscope/astavargam`.
3. Exposes the resolved `chartContext` alongside the original provider envelope to the browser, without exposing the Bearer API key.
4. Shows safe `Basic` and root-field diagnostics if the provider changes its response structure in the future.
5. Bumps the main JS URL version to avoid a cached old renderer. All legacy IK's Astrology tabs and their controllers remain unchanged.

**Verification:** JavaScript syntax and 5 nested envelope scenarios were tested offline. End-to-end tests with an actual paid-key response are not possible in this environment; Maven and the paid key are unavailable here. Do not assume all 23 book outputs are supplied by the provider. Existing gaps remain explicitly marked as locally derived or unavailable.

### Most useful 3-step verification

- Check `http://localhost:8080/api/exact/status`: `configured` must be `true`. If false, set `EXACT_PREDICTIONS_API_KEY` and **restart** Maven/Java. Note `true` only means a key is present, not that it is authorized.
- Click **Preview 23 sheets (no API credits)**. This tests the browser renderer using fixture data and does not contact ExactPredictions.
- Generate your birth chart with **Also request Ashtavargam unchecked**. If the provider returns 401/403/402/400/422, the page now names the HTTP status. Once the base chart displays, check Ashtavargam on the next request.

If the provider returned success but no recognized planets, save a **real, successful response** from your Postman `v2HoroscopeCombined` request (not the Postman collection JSON) and import it into the new tab. **Never share your Bearer token or API key.** The provided collection contains API request examples and no actual response bodies, so the full set of traditional tables still requires validation against authenticated output.

For easy Windows setup without storing the key in a file, run `./Start-Windows.ps1` in PowerShell (you may need to allow local scripts according to your organization's policy); the prompt hides the key while typing.

## Six missing charts – 18 October 2026 patch

- **D5 / Panchamamsa**, **D6 / Shashtamsa** now render locally using the documented sector algorithms; their traditional-book parity is unverified.
- **Mahadasa**, **Dasa-Bhukti I**, **Dasa-Bhukti II** now request and parse provider Dasa/Deep-Dasa responses separately. If a provider schema is unfamiliar, the original provider JSON excerpt is displayed with a warning instead of invented period dates.
- **Bhava** optionally requests a KP response and renders house-cusp tabulation if present; it does not misidentify KP cusps as the reference Bhava chart.
- All optional endpoint statuses and safe errors appear in the Response diagnostics.
- Browser regression tested all 23 layouts using a simulated provider HTTP 200 response containing independent Dasa arrays and a 12-cusp KP response. This does not validate the user's actual authenticated API outputs.
- To verify with your key, generate a live report with both “Request Dasa and Deep Dasa” and “Request Bhava / KP house data” checked. Export Raw JSON if either endpoint shows an error; redact birth details if needed, and **never include the key**.


## Five empty sheets (08, 09, 11, 12, 13) — repaired in v2

The 18 October six-sheet release still showed these as unavailable for some live API response shapes. This release provides **an explicit sign-placement table as well as the South-Indian chart** on pages 08 and 09. The table uses longitudes returned by the *actual* live horoscope; it does not pretend D5/D6 API endpoints exist.

Sheets 11, 12, and 13 now fall back to *locally derived* Vimshottari Mahadasa and Bhukti schedules if the provider's Dasa/Deep response is absent or is not in an array format the current parser recognizes. The calculations use Moon longitude, a 120-year cycle and a 365.2425-day civil year. ExactPredictions or the traditional Tamil book can choose a different year convention, so the fallback is clearly labelled **NOT verified API result**. For full provider parity, export the actual live raw JSON and compare Dasa dates. The user's API key stays exclusively on the server and is not included in exports.

To verify the correct build is running, open the Exact Predictions PRO report's diagnostics. It must display `Renderer: five-pages-v2` and have `08=POPULATED · 09=POPULATED · 11=POPULATED · 12=POPULATED · 13=POPULATED`. A newly generated report is required; viewing an old downloaded PDF will not update it. Use `mvn clean spring-boot:run`, not `mvn spring-boot:run` from an old project folder.

Offline browser regression tests passed three cases: missing optional Dasa responses, unrecognized successful Dasa JSON, and recognizable period arrays. This **does not replace a real-key provider integration test**; Maven compilation was not available in the authoring sandbox.


## Bhava sheet #04 chart fix (v3)

Sheet 4 now renders a South Indian 12-box chart **above** the existing KP cusp table when 12 numeric house cusp longitudes and the required planetary positions are available. House numbers 1–12 are shown in the fixed Rasi grid. KP-derived placements are labelled as a local interpretation, not as ExactPredictions-provided Bhava Chalit positions or a verified match to the original Tamil book. When the cusp schema is incomplete, the table and a clear warning remain visible. See `docs/BHAVA_CHART_V3.md`. The five-page fixes, other horoscope tabs and the 23-sheet PDF logic are unchanged.
