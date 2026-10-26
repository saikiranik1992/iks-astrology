# IK's Astrology – ExactPredictions reference check (18 October 2026)

## Permissions and secrecy

The user requested testing exclusively with ExactPredictions for DOB 1992-07-03, 13:49 IST, Kanchipuram. **No API key is stored in this project or report.** The new check runs in the user's browser on an already obtained horoscope response. There are no extra API requests for comparison and no background uploads.

## Source and tested scope

18 screenshots from the user-supplied ExactPredictions output ZIP. They include 11 displayed Rasi placements, Tamil birth-profile fields, several varga charts and Dasa tables. They DO NOT provide a complete exact-value reference for every cell on all 23 report pages. Do not equate layout presence with successful mathematical verification.

The attached screenshot with the birth profile shows 03-07-1992 13:49, துலாம் Lagna, கடகம் Moon Rasi, ஆயில்யம் pada 4. The Rasi chart screenshot gives:

| Body | Rasi | Sign degrees:minutes |
|--|--|--|
| Lagna | துலாம் | 11:30 |
| Sun | மிதுனம் | 17:53 |
| Moon | கடகம் | 27:25 |
| Mars | மேஷம் | 19:50 |
| Mercury | கடகம் | 13:47 |
| Jupiter | சிம்மம் | 16:20 |
| Venus | மிதுனம் | 23:17 |
| Saturn | மகரம் | 23:44 |
| Rahu | தனுசு | 06:17 |
| Ketu | மிதுனம் | 06:17 |
| Mandi | சிம்மம் | 01:14 |

The in-app verifier automatically checks these 11 planet/ascendant placements and Moon Nakshatra/pada only when the birth details are the reference DOB/time/place. It compares displayed degrees with a ±5 arcminute tolerance to avoid false differences from screenshot rounding. It separately lists all 23 page *availability* statuses (FILLED, PARTIAL, EMPTY). **Page presence is never reported as chart accuracy.**

## Other screenshot chart types

The screenshots also show D1, D2, D3, D4, D7, D9, D10, D12, D16, D20, D24, D27, D30, D40, D45 and D60 divisions. The current 23-sheet traditional report includes D1, D2, D3, D4, D5, D6, D7, D9 and other traditional modules. These lists are different: do not claim that the report's 23 sheets correspond one-for-one to the ExactPredictions screenshot set.

## How to run the verifier on the actual Pro data

1. Start your Spring Boot project with `EXACT_PREDICTIONS_API_KEY` set in an OS environment variable, never in source code or Git.
2. In Exact Predictions tab, enter `1992-07-03`, `13:49`, Kanchipuram, latitude `12.8342`, longitude `79.7036`, timezone `5.5`.
3. Keep Dasa, KP, Ashtavargam checked as appropriate; each provider request may use paid credits. Submit once.
4. The panel **படங்களுடன் ஒப்பீடு** appears below the diagnostics and compares Rasi positions and Moon's Nakshatra/pada to the screenshot baseline.
5. Download **ஒப்பீட்டு JSON (API சாவி இல்லாமல்)** for a concise reference-check report, without exposing the API key. Share that report rather than the key.

## Tested here

- Isolated browser-component test with a synthetic provider-shaped response: matched all 11 reference placements; one altered position was correctly flagged as a mismatch; 23 report sections were instantiated; zero JavaScript page errors. This is not live provider verification.
- `node --check` passed. ZIP file integrity can be checked with `unzip -t`.
- NOT run: real authenticated calls (outbound DNS unavailable), complete Maven build (Maven absent in runtime), all 23 numerical comparisons (screenshots insufficient).

## Key safety

The user pasted an API key into chat. Do not reproduce it in source, logs, download files, or test fixtures; consider rotating it in the provider portal after testing.
