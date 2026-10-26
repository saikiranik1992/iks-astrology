# 23 photographed-reference report sheets

| # | Tamil title | Data path | Reliability |
|---|---|---|---|
| 01 | நட்சத்திர கிரக பாத சாரம் | Horoscope `planets` / Nakshatra / Pada | Provider values |
| 02 | இராசி / Rasi D1 | Horoscope `planets` longitude or rasi_chart | Direct mapping of provider values |
| 03 | நவாம்சம் D9 | Rasi longitudes -> Parashari navamsa | Locally computed; cross-check |
| 04 | பாவக சக்கரம் | Optional `bhava_chart` / `bhava` | Not available unless API returns house data |
| 05 | ஹோரை D2 | Longitudes -> classical Sun/Moon Hora | Locally computed; cross-check |
| 06 | திரேக்காணம் D3 | Longitudes -> 10-degree subdivisions | Locally computed; cross-check |
| 07 | சதுர்த்தாம்சம் D4 | Longitudes -> 7.5-degree subdivisions | Locally computed; cross-check |
| 08 | பஞ்சமாம்சம் D5 | Locally calculated from returned longitude using documented sector rule | Book-method parity unverified |
| 09 | சஷ்டாம்சம் D6 | Locally calculated from returned longitude using documented sector rule | Book-method parity unverified |
| 10 | சப்தமாம்சம் D7 | Longitudes -> 7 parts | Locally computed; cross-check |
| 11 | மகாதசை | Dasa API, then local Vimshottari fallback | Derived dates clearly labelled if API rows are absent |
| 12 | தசா–புத்தி I | Dasa/Deep API, then local Vimshottari Bhukti periods | Provider/book year-length not confirmed |
| 13 | தசா–புத்தி II | Dasa/Deep API, then local Vimshottari Bhukti periods | Provider/book year-length not confirmed |
| 14 | சூரியன் அஷ்ட வர்க்கம் | `astavargam` matrix or local rules | Provider if validated; otherwise local |
| 15 | சந்திரன் அஷ்ட வர்க்கம் | Same | Same |
| 16 | செவ்வாய் அஷ்ட வர்க்கம் | Same | Same |
| 17 | புதன் அஷ்ட வர்க்கம் | Same | Same |
| 18 | குரு அஷ்ட வர்க்கம் | Same | Same |
| 19 | சுக்கிரன் அஷ்ட வர்க்கம் | Same | Same |
| 20 | சனி அஷ்ட வர்க்கம் | Same | Same |
| 21 | சர்வாங்க அஷ்ட வர்க்கம் · 337 பரல் | Sum across seven valid BAV sets | Local aggregate unless all from API |
| 22 | ஆதியும் அந்தமும் 1–14 | `essentials`, `solar`, personal inputs | Partial; special fields missing |
| 23 | ஆதியும் அந்தமும் 15–25 | As above | Partial; special fields missing |

The images sent in the conversation include multiple photos of the same book pages. To provide 23 independently navigable report sheets, the renderer splits their content by calculation family, without claiming the photographed page order is a strict 1:1 correspondence.

**Source:** the user's 55-request `Exact Predictions V2 Public` Postman collection is included in `/postman/`. It documents request formats, **not successful response schemas**. Error messages are made visible; no fake provider JSON or horoscope values are packaged.


### Six-sheet patch note
Sheet 4 now displays returned house placements or a KP cusp table with methodology warnings; it does not invent Bhava placements. Sheets 8 and 9 are local D5/D6 maps based on documented 6° and 5° sign-parity rules, respectively. Sheets 11–13 request Dasa/Deep-Dasa with Type-A birth query parameters and map period arrays when recognizable. Authentic book parity remains unverified until live JSON comparison.
