# PDF layout repair

## Changes
- Replaced fixed-height bitmap cuts in both PDF download paths with measured layout boundaries. Normal-size table rows, calculation boxes and charts stay together; continuation pages repeat table headers. Oversize individual rows are scaled rather than cut.
- Render bounded page regions directly instead of making one oversized canvas. Measure scroll content as well as the outer box.
- Bundle and embed the Noto Sans Tamil font (license included) so exports do not depend on installed Tamil fonts or a font CDN.
- Constrain export tables to the page width, wrap long cell text, and isolate PDF styling from screen size and dark mode.
- Remove duplicate nested blocks from the export collection.
- Improve native print styles: repeating table headers, row break protection, overflow visibility, disabled animations, and readable print sizing.

## Verification performed
- Chromium successfully downloaded all nine reports and all nine calculation-step PDFs.
- Rendered PDF contact sheets reviewed, with full-size inspection of Amma's Astro page 3.
- Amma's Astro report: 27 pages with the default sample; calculation steps: 6 pages. These counts may vary with content. No blank report pages detected.
- Mobile (390px) and dark-mode Amma report and calculation PDF exports completed; page 3 inspected.
- Checked 35 live report tables against the 980px export area: no horizontal boundary violations.
- Native print output generated and checked for blank pages.
- Compared the text output of all nine tabs with the pre-fix calculation engine for three profiles: default 15-May-1998 08:30 Chennai; 13-Oct-1995 22:49 Kanchipuram; 15-Dec-1999 18:28 Kanchipuram. All matched exactly.
- Nine tab navigation, name-input recalculation, theme toggle, and 390px layout exercised without JavaScript errors.
- Java source, application properties and Maven dependencies are unchanged.

These checks cover the supplied default reports and the listed profiles; they do not establish astrological accuracy or guarantee every possible custom input fits identically. Calculation formulas and business behavior were not changed.

Build limitation: the browser checks used the actual application template and static assets served locally. A full Spring Boot Maven build could not complete because dependency access was unavailable in the editing environment. No runnable JAR is included.
