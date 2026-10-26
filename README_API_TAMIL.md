# IK's Astrology — API-first Tamil edition

This edition preserves the original IK's Astrology screens and PDF modules and updates **only the Exact Predictions** tab. All 23 reference-sheet *layouts* are present; **the external API has not been proven to supply all 23 independent calculations**. A layout cannot substitute for missing API data.

## Live execution (Windows PowerShell)

1. Extract this ZIP to a **new** folder. Stop the earlier Spring Boot process (`Ctrl+C`).
2. Install Java 17+ and Maven 3.9+ if not already installed.
3. Open PowerShell where `pom.xml` is located.
4. Set your private key (do not paste it in screenshots, tickets or the chat):

   ```powershell
   $env:EXACT_PREDICTIONS_API_KEY = "your_private_key_here"
   mvn clean spring-boot:run
   ```

5. Visit `http://localhost:8080` and hard-refresh using `Ctrl+Shift+R`.
6. Under **Exact Predictions**, keep the Dasa, KP and Ashtavargam options checked; click the button to create the report.
7. Use **மூல JSON** (Raw JSON) to inspect the *actual API response* if a sheet says it is unavailable. Remove personal details before sharing if appropriate. No API key is included in this report.

Check `http://localhost:8080/api/exact/status`. Version must be `2026-10-18-api-first-tamil` and `configured: true`.

## What changed

- `POST /v2/horoscope?language=ta` requests the **complete** horoscope, as advised by official V2 documentation. If it does not expose the required planetary context, one documented `include=basic,essentials` call is made automatically. Full response is kept when available.
- `GET /v2/horoscope/dasa?language=ta` and `/dasa/deep?language=ta` use the supplied manual birth query; `POST /v2/horoscope/kp?language=ta` requests house cusps; `POST /v2/horoscope/astavargam?language=ta` receives the provider's Type-B chart context (not the whole combined envelope).
- The **entire Exact Predictions input screen, labels, source badges, and report messages** are localized into Tamil. Many common zodiac, Nakshatra, planets and Dasa labels are translated. Names unique to provider modules may still require a provider-specific mapping once a real `language=ta` response is available.
- The 23 reports **do not run the previous local substitute calculations by default**. D2/D3/D4/D5/D6/D7/D9 display values if the API response supplies a recognizable chart. Rasi uses provider planet positions. The KP-cusp plot shows supplied cusp longitudes by sign, not invented planetary house assignments.
- The seven planetary Ashtavarga tables, Sarvashtavarga and Shodhana grids render **when those arrays are actually supplied** by the API. Any not returned are marked `API-யில் இந்தத் தகவல் கிடைக்கவில்லை` rather than filled in with locally derived values.
- Local Vimshottari period fallback is disabled by default. Dasa pages use response arrays from the corresponding provider endpoints.
- The first 25 traditional fields search additional nested API fields from the full horoscope before showing missing values.
- Original project (Amma's Astro, other tabs, PDFs) is retained.

## Important limitations

The public V2 collection does not list direct D5/D6 or the traditional old-book Bhava chart as named endpoints. The API **might** include further varga fields in its complete horoscope response, but **cannot be claimed** to offer those independent computations without examining a real response. Nor can exact correspondence with your old-book Parambarai/Vakya-style calculations be guaranteed from a Lahiri/KP computation. The same applies to specialized `ஆதியும் அந்தமும்` items and seven planet-by-planet Shodhana intermediate tables.

**API data vs rendering:** drawing a twelve-square chart from signs or KP cusps does not change astronomical coordinates. Summing provider-supplied Ashtavarga Rasi totals is arithmetic presentation, but never marked as a separate provider calculation. The source badge describes what comes from the API.

The app intentionally does **not** automatically call unsupported undocumented endpoints, invent positions, or retry repeatedly; requests can consume shared Pro credits. Keys are injected server-side using `EXACT_PREDICTIONS_API_KEY`.

## Tests in this delivery

- JavaScript syntax: passed with Node 22.
- API-only rendering smoke test: **23 sheets**, no locally-derived source badges, valid sample planetary chart.
- Synthetic provider test: API-provided D5 placements, Dasa arrays, KP cusps, seven Ashtavarga arrays and **337-Paral** aggregate: passed.
- ZIP integrity and original-file preservation: checked.
- **Not tested:** real paid API (no key was shared), Maven build (Maven unavailable in this environment), and precision versus printed book.

**If sheets are missing:** generate your actual horoscope once, download the Raw JSON export, and share a redacted copy. This is required to know the provider's actual response schemas for the unavailable sections.


## Reference screenshot verification (18 October 2026)
After live generation, the panel **படங்களுடன் ஒப்பீடு** checks visible sign and degree values for 11 celestial/ascendant positions and Ayilyam pada 4 for 03-07-1992 13:49 Kanchipuram. It flags mismatches and marks which of the 23 rendered pages have API content versus placeholders. Download a key-free **ஒப்பீட்டு JSON** report. See `docs/REFERENCE_VERIFICATION_1992.md`. This checker makes no additional API calls and is not proof that all 23 calculations match the provider.
