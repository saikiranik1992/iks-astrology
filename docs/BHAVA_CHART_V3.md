# Sheet 04 / Bhava chart — KP cusp-derived visualization (v3)

## Defect
Earlier versions displayed only the KP house cusp table. The Bhava sheet deliberately did not draw a chart because KP house cusps are not guaranteed to follow the Tamil reference book’s Bhava Chalit method.

## Behavior now
- If the combined horoscope directly contains a provider-supplied Rasi-keyed Bhava chart, display that chart.
- Otherwise, when the optional KP endpoint supplies 12 ordered numeric house cusp longitudes, display a **South Indian 12-box chart above the unchanged cusp table**. Each sign cell includes its mapped house number (1–12) and planets assigned by the consecutive cusp boundaries. Lagna marks house 1.
- Read house cusp longitude either as an absolute longitude or sign plus degree-in-sign. Validate all 12 houses and the 360-degree wrap before making the chart.
- If only tabular data is available but no reliable numeric house cusp boundaries can be extracted, retain the table and a clear explanation rather than inventing placements.

## Source and accuracy
This chart is **locally calculated from provider KP cusp and planetary longitudes**. It is not represented as an independently verified replica of the printed Tamil book’s Bhava chart. The book can use a different boundary method, e.g. Sripati house middles, so chart comparisons require the user’s actual response JSON and reference data.

## Test
Browser regression verified a 23-sheet report with (1) 12 numeric longitudes, (2) 12 sign+degree-in-sign cusps, and (3) 12 invalid null cusps. The first two rendered a chart with 12 house tags and 12 table rows; the third showed the table and an explanatory warning. The test was performed with sample planetary data, **not** against a live paid API key.

## Windows run
In the extracted directory with `pom.xml`, set `EXACT_PREDICTIONS_API_KEY`, then run `mvn clean spring-boot:run`, visit http://localhost:8080, hard refresh with Ctrl+Shift+R, keep Request Bhava / KP house data checked, and Generate. In Response diagnostics look for `Renderer: bhava-chart-v3` and `Sheet 04 Bhava: CHART + KP TABLE (derived locally)`. If only a table appears, export Raw JSON, remove personal details and any secrets, and inspect the KP cusp schema.
