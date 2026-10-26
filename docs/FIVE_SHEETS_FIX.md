# Verification: sheets 8, 9, 11, 12, 13

For each live report check: 08 and 09 contain a South Indian varga chart **and** a per-planet sign placement table; 11 Mahadasa, 12 Bhukti for the birth Mahadasa, 13 Bhukti for the subsequent Mahadasa. If the Dasa API response does not expose period arrays, these pages use locally calculated Vimshottari dates and explicitly flag the unverified year convention.

Browser tests (mock responses): missing periods PASS; unexpected JSON PASS; recognized period arrays PASS.

`Response diagnostics` includes the exact renderer version and the populated/unavailable state of all five pages. If there is still an empty page with renderer `five-pages-v2`, save the raw API JSON **without your secret** for analysis.
