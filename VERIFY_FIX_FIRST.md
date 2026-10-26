# Verify the ExactPredictions `basic`-response fix

The earlier error **provider HTTP 200, fields: status, meta, basic** was caused by the application's response parser, not proof of invalid credentials.

1. Stop the old Spring Boot process (Ctrl+C) and extract this ZIP into a **new** folder. Do not run the old folder.
2. In PowerShell set `$env:EXACT_PREDICTIONS_API_KEY = 'YOUR_KEY'`, then `mvn clean spring-boot:run` from the folder containing `pom.xml`.
3. Open `http://localhost:8080/` and press **Ctrl+Shift+R**. Choose **Exact Predictions PRO**.
4. Click **Generate 23-sheet report** with **Also request Ashtavargam** unchecked for the first run.
5. Under Response diagnostics expect `Mode: LIVE`, `HTTP: 200`, and `Mapped planets` greater than zero. The report should display book-style sheets with provider/local/missing source labels.
6. If it works, enable **Also request Ashtavargam** to try `/v2/horoscope/astavargam` with the correct `basic` object.

If the provider changes shape and the mapper still fails, copy only its safe diagnostics: `Root`, `Basic`, and `Basic.data` fields plus request ID. Do not send your API key. All 23 sheet layouts are present, but exact coverage and traditional chart-method matching remain to be validated using actual provider data.

No background or retry calls are performed; requests consume shared ExactPredictions API credits.
