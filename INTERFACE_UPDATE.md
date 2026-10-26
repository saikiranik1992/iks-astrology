# IK's Astrology — Numerology-style interface

The application remains Java 17 + Spring Boot 3.2.5 + Thymeleaf.

## Interface changes
- Forest-green header, pale green page background, white cards, and green buttons based on the supplied IK's Numerology project.
- Compact header actions and nine visible navigation choices, with responsive layouts for smaller screens.
- Consistent form spacing, focus indicators, and green dark-mode surfaces.
- New screen-only stylesheet: src/main/resources/static/css/numerology-theme.css. Existing print styling is retained; the new introduction is hidden in print.
- Corrected malformed quote escaping in nine existing calculation-PDF button handlers.

## Preserved
All Java source, pom.xml, application properties, the calculation JavaScript, input fields/defaults, element IDs, nine panels, and action bindings. No calculation formulas or endpoints were changed. No external fonts or UI dependencies were added.

## Run locally
Requires Java 17 and Maven:

```sh
mvn clean package
java -jar target/iks-astrology-2.0.0.jar
```

Use the port configured in src/main/resources/application.properties (default 8080).

## Verification
See PDF_FIX_VERIFICATION.md for the subsequent browser-based PDF repair and regression checks.
