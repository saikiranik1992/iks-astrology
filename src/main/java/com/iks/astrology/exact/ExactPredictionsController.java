package com.iks.astrology.exact;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.LinkedHashMap;
import java.util.Map;

/** Provider-proxy: keep API key on the server. Never expose it to browser JavaScript. */
@RestController
@RequestMapping("/api/exact")
public class ExactPredictionsController {
    private static final String HOST = "https://api.exactpredictions.in";
    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(12)).followRedirects(HttpClient.Redirect.NEVER).build();
    private final ObjectMapper json;
    private final String apiKey;

    public ExactPredictionsController(ObjectMapper json,
          @Value("${exactpredictions.api-key:}") String apiKey) {
        this.json = json;
        this.apiKey = apiKey == null ? "" : apiKey.trim();
    }

    @GetMapping("/status")
    public Map<String, Object> status() {
        return Map.of("configured", !apiKey.isBlank(), "provider", "Exact Predictions V2",
             "mode", "live-only", "exposesKey", false,
             "baseEndpoint", "/v2/horoscope?language=ta",
             "integrationVersion", "2026-10-18-reference-verifier-v5",
             "ashtavargamEndpoint", "/v2/horoscope/astavargam?language=ta",
             "dasaEndpoint", "/v2/horoscope/dasa", "bhavaCandidateEndpoint", "/v2/horoscope/kp");
    }

    @PostMapping(value = "/chart", consumes = MediaType.APPLICATION_JSON_VALUE,
                 produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> chart(@RequestBody ChartRequest req) {
        if (apiKey.isBlank()) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of("error", "API_KEY_NOT_CONFIGURED",
                      "message", "Set EXACT_PREDICTIONS_API_KEY and restart the application."));
        }
        String validationError = validate(req);
        if (validationError != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "INVALID_INPUT", "message", validationError));
        }
        try {
            LocalDate date = LocalDate.parse(req.date());
            LocalTime time = LocalTime.parse(req.time());
            ObjectNode body = json.createObjectNode();
            body.put("name", req.name().trim());
            body.put("year", date.getYear()); body.put("month", date.getMonthValue());
            body.put("day", date.getDayOfMonth()); body.put("hour", time.getHour());
            body.put("minute", time.getMinute()); body.put("lat", req.lat());
            body.put("lon", req.lon()); body.put("tz", req.timezone());
            body.put("dst", 0); body.put("place", req.place().trim());

            // The public V2 documentation explicitly says to omit `include` for
            // the complete horoscope. This is the best available provider source
            // for divisional and traditional fields. No local astronomical calculation.
            ProviderResponse horoscope = post("/v2/horoscope?language=ta", body);
            int baseRequests = 1;
            JsonNode chartData = horoscope.ok() ? chartPayload(horoscope.body(), 0) : null;
            JsonNode contextEnvelope = horoscope.ok() ? horoscope.body() : null;
            String baseEndpoint = "/v2/horoscope?language=ta";
            // Some provider versions return modules in the full response without
            // the reusable planetary `basic` context. Retry once with the
            // documented basic envelope, retaining the full response for UI.
            if (chartData == null) {
                ProviderResponse basic = post("/v2/horoscope?language=ta&include=basic,essentials", body);
                baseRequests++;
                if (basic.ok()) {
                    JsonNode candidate = chartPayload(basic.body(), 0);
                    if (candidate != null) {
                        chartData = candidate;
                        contextEnvelope = basic.body();
                        baseEndpoint = "/v2/horoscope?language=ta&include=basic,essentials";
                        if (!horoscope.ok()) horoscope = basic;
                    }
                }
            }
            if (chartData == null) {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of(
                    "error", "PROVIDER_CHART_DATA_NOT_FOUND",
                    "providerStatus", horoscope.status(),
                    "endpoint", baseEndpoint,
                    "receivedRootFields", publicFields(horoscope.body()),
                    "receivedBasicFields", publicFields(horoscope.body() == null ? null : horoscope.body().path("basic")),
                    "receivedBasicDataFields", publicFields(horoscope.body() == null ? null : horoscope.body().path("basic").path("data")),
                    "requestId", horoscope.body() == null ? "" : horoscope.body().path("meta").path("request_id").asText(""),
                    "message", "தமிழ் ஜாதக API பதிலில் கிரக நிலைகள் கிடைக்கவில்லை. JSON பதிலைச் சரிபார்க்கவும்."));
            }
            Map<String,Object> result = new LinkedHashMap<>();
            result.put("provider", "Exact Predictions V2");
            result.put("horoscope", horoscope.body());
            result.put("contextEndpoint", baseEndpoint);
            // Explicitly expose the normalized data for frontend use, while retaining
            // the complete original response for troubleshooting and independent verification.
            result.put("chartContext", chartData);
            result.put("astavargam", null);
            result.put("astavargamStatus", "NOT_REQUESTED");
            result.put("ashtavargamError", "");
            result.put("notice", "API தரவுகள் மட்டுமே இயல்பாகக் காட்டப்படும். சேவை அளிக்காத கணக்கீடுகள் காலியாகக் குறிக்கப்படும்.");
            result.put("requestsMade", baseRequests);
            result.put("dasa", null);
            result.put("dasaDeep", null);
            result.put("kpHouses", null);
            result.put("dasaStatus", "NOT_REQUESTED");
            result.put("dasaDeepStatus", "NOT_REQUESTED");
            result.put("kpStatus", "NOT_REQUESTED");
            result.put("dasaError", "");
            result.put("dasaDeepError", "");
            result.put("kpError", "");
            int requestsMade = baseRequests;
            // Public API docs (not the bare Postman example) explicitly require
            // Type-A birth query parameters on GET /v2/horoscope/dasa.
            if (req.includeDasa()) {
                String query = dasaQuery(req, date, time);
                requestsMade++;
                try {
                    ProviderResponse dasa = get("/v2/horoscope/dasa?" + query);
                    result.put("dasaStatus", dasa.ok() ? "RETURNED" : "PROVIDER_ERROR");
                    if (dasa.ok()) result.put("dasa", dasa.body());
                    else result.put("dasaError", "HTTP " + dasa.status() + " · " + dasa.safeError());
                } catch (Exception ex) {
                    result.put("dasaStatus", "PROVIDER_ERROR");
                    result.put("dasaError", "Dasa service request could not complete.");
                }
                // The collection lists /dasa/deep but gives no body or required
                // query schema. Send the same documented Type-A input once, report
                // errors clearly and do not retry or fabricate period details.
                requestsMade++;
                try {
                    ProviderResponse deep = get("/v2/horoscope/dasa/deep?" + query);
                    result.put("dasaDeepStatus", deep.ok() ? "RETURNED" : "PROVIDER_ERROR");
                    if (deep.ok()) result.put("dasaDeep", deep.body());
                    else result.put("dasaDeepError", "HTTP " + deep.status() + " · " + deep.safeError());
                } catch (Exception ex) {
                    result.put("dasaDeepStatus", "PROVIDER_ERROR");
                    result.put("dasaDeepError", "Deep Dasa endpoint request could not complete.");
                }
            }
            if (req.includeBhava()) {
                requestsMade++;
                try {
                    // KP report may provide house cusps, but is not guaranteed to
                    // match the traditional Bhava Chalit convention. Only render
                    // fields actually returned; do not synthesize house cusps.
                    ProviderResponse kp = post("/v2/horoscope/kp?language=ta", body);
                    result.put("kpStatus", kp.ok() ? "RETURNED" : "PROVIDER_ERROR");
                    if (kp.ok()) result.put("kpHouses", kp.body());
                    else result.put("kpError", "HTTP " + kp.status() + " · " + kp.safeError());
                } catch (Exception ex) {
                    result.put("kpStatus", "PROVIDER_ERROR");
                    result.put("kpError", "KP house request could not complete.");
                }
            }

            if (req.includeAstavargam()) {
                // ExactPredictions docs: pass the returned `basic` object as the
                // standalone Type-B chart context, NOT the combined envelope.
                // Postman example: {"data":{"input":...,"planets":...}}.
                JsonNode avBody = ashtavargamRequestBody(contextEnvelope, chartData);
                try {
                    ProviderResponse av = post("/v2/horoscope/astavargam?language=ta", avBody);
                    result.put("requestsMade", ++requestsMade);
                    result.put("astavargamStatus", av.ok() ? "RETURNED" : "PROVIDER_ERROR");
                    if (av.ok()) result.put("astavargam", av.body());
                    else result.put("ashtavargamError", "HTTP " + av.status() + " · " + av.safeError());
                } catch (Exception optionalEndpointError) {
                    // The horoscope is valid even when this optional paid request fails.
                    // Always preserve the first successful response and show the error.
                    result.put("requestsMade", ++requestsMade);
                    result.put("astavargamStatus", "PROVIDER_ERROR");
                    result.put("ashtavargamError", "Optional Ashtavargam request could not complete. Main horoscope remains available.");
                }
            }
            result.put("requestsMade", requestsMade);
            result.put("diagnostics", Map.of(
                "horoscopeHttpStatus", horoscope.status(),
                "recognizedPlanets", chartData.path("planets").isArray() ? chartData.path("planets").size() : 0,
                "chartFields", publicFields(chartData),
                "providerRootFields", publicFields(horoscope.body()),
                "basicFields", publicFields(horoscope.body().path("basic")),
                "requestId", horoscope.body().path("meta").path("request_id").asText(""),
                "ashtavargamStatus", result.get("astavargamStatus"),
                "postmanEndpointMatched", true,
                "language", "ta", "fullHoroscopeRequested", true));
            result.put("input", Map.of("name", req.name().trim(), "date", req.date(),
                "time", req.time(), "place", req.place().trim(), "lat", req.lat(),
                "lon", req.lon(), "timezone", req.timezone()));
            return ResponseEntity.ok(result);
        } catch (Exception ex) {
            // Provider responses and auth headers MUST NOT appear in logs or browser errors.
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(Map.of("error", "CONNECTION_ERROR",
                   "message", "ExactPredictions API request failed. Check internet access and try again."));
        }
    }

    /** The V2 combined endpoint uses `basic`, while stand-alone chart contexts use `data`.
     *  Never invent planet coordinates: a response with neither positions nor chart is invalid.
     */
    static JsonNode chartPayload(JsonNode node, int depth) {
        if (node == null || !node.isObject() || depth > 10) return null;
        if ((node.path("planets").isArray() && node.path("planets").size() > 0)
              || (node.path("rasi_chart").isObject() && node.path("rasi_chart").size() > 0)) return node;
        for (String wrapper : new String[]{"basic", "data", "result", "response", "horoscope", "chart", "payload"}) {
            JsonNode nested = chartPayload(node.get(wrapper), depth + 1);
            if (nested != null) return nested;
        }
        return null;
    }

    /** Provide the provider's Type-B chart-context shape without duplicating the data wrapper. */
    static JsonNode ashtavargamRequestBody(JsonNode combined, JsonNode chartData) {
        JsonNode basic = combined == null ? null : combined.path("basic");
        // The Postman collection explicitly expects {"data": {"planets":...}}.
        if (basic != null && basic.isObject() && basic.path("data").isObject()) {
            return basic.deepCopy();
        }
        // Full responses may expose a standalone Type-B data wrapper.
        if (combined != null && combined.path("data").isObject()
                && combined.path("data").path("planets").isArray()) {
            ObjectNode standalone = new ObjectMapper().createObjectNode();
            standalone.set("data", combined.path("data").deepCopy());
            if (combined.path("localized").isObject())
                standalone.set("localized", combined.path("localized").deepCopy());
            return standalone;
        }
        ObjectNode out = new ObjectMapper().createObjectNode();
        out.set("data", chartData.deepCopy());
        // If basic includes presentation information, preserve it for the Type-B endpoint.
        if (basic != null && basic.isObject() && basic.path("localized").isObject()) {
            out.set("localized", basic.path("localized").deepCopy());
        }
        return out;
    }

    private static String publicFields(JsonNode node) {
        if (node == null || !node.isObject()) return "not-an-object";
        java.util.ArrayList<String> keys = new java.util.ArrayList<>();
        node.fieldNames().forEachRemaining(name -> {
            if (keys.size() < 24 && !name.toLowerCase().matches(".*(key|token|secret|password|auth).*$")) keys.add(name);
        });
        return String.join(", ", keys);
    }

    /** URL-encode user-provided fields. Never put the API key in this URL. */
    static String dasaQuery(ChartRequest req, LocalDate date, LocalTime time) {
        Map<String,String> params = new LinkedHashMap<>();
        params.put("language", "ta");
        params.put("name", req.name().trim());
        params.put("year", Integer.toString(date.getYear()));
        params.put("month", Integer.toString(date.getMonthValue()));
        params.put("day", Integer.toString(date.getDayOfMonth()));
        params.put("hour", Integer.toString(time.getHour()));
        params.put("minute", Integer.toString(time.getMinute()));
        params.put("lat", Double.toString(req.lat()));
        params.put("lon", Double.toString(req.lon()));
        params.put("tz", Double.toString(req.timezone()));
        params.put("dst", "0");
        params.put("place", req.place().trim());
        StringBuilder out = new StringBuilder();
        params.forEach((k,v) -> {
            if (!out.isEmpty()) out.append('&');
            out.append(URLEncoder.encode(k, StandardCharsets.UTF_8));
            out.append('=');
            out.append(URLEncoder.encode(v, StandardCharsets.UTF_8));
        });
        return out.toString();
    }

    private ProviderResponse get(String route) throws Exception {
        HttpRequest req = HttpRequest.newBuilder(URI.create(HOST + route))
            .timeout(Duration.ofSeconds(50))
            .header("Authorization", "Bearer " + apiKey)
            .header("Accept", "application/json")
            .GET().build();
        HttpResponse<String> reply = http.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        return providerResponse(reply);
    }

    private ProviderResponse post(String route, JsonNode requestJson) throws Exception {
        HttpRequest req = HttpRequest.newBuilder(URI.create(HOST + route))
          .timeout(Duration.ofSeconds(50))
          .header("Authorization", "Bearer " + apiKey)
          .header("Accept", "application/json")
          .header("Content-Type", "application/json")
          .POST(HttpRequest.BodyPublishers.ofString(json.writeValueAsString(requestJson), StandardCharsets.UTF_8))
          .build();
        HttpResponse<String> reply = http.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        return providerResponse(reply);
    }

    private ProviderResponse providerResponse(HttpResponse<String> reply) {
        JsonNode parsed = null;
        if (reply.body() != null && !reply.body().isBlank()) {
            try { parsed = json.readTree(reply.body()); } catch (Exception ignored) { }
        }
        // Never show untrusted provider response HTML or secret-bearing error text.
        String safeError = switch (reply.statusCode()) {
          case 400, 422 -> "Provider rejected the chart context or request format";
          case 401, 403 -> "API key not authorized for this endpoint";
          case 402 -> "Insufficient API credits or subscription level";
          case 429 -> "API rate limit reached";
          default -> "Provider returned HTTP " + reply.statusCode();
        };
        return new ProviderResponse(reply.statusCode(), parsed, safeError);
    }

    private String validate(ChartRequest r) {
        if (r == null) return "Birth details are required.";
        if (r.name() == null || r.name().isBlank() || r.name().length() > 100) return "Enter a name (max 100 characters).";
        if (r.place() == null || r.place().isBlank() || r.place().length() > 120) return "Enter a birthplace.";
        try {
            LocalDate d = LocalDate.parse(r.date());
            LocalTime.parse(r.time());
            if (d.getYear() < 1800 || d.getYear() > 2100) return "Use a date between 1800 and 2100.";
        } catch (DateTimeParseException | NullPointerException ex) { return "Enter a valid date and time."; }
        if (!Double.isFinite(r.lat()) || r.lat() < -90 || r.lat() > 90 ||
            !Double.isFinite(r.lon()) || r.lon() < -180 || r.lon() > 180)
            return "Enter valid latitude and longitude.";
        if (!Double.isFinite(r.timezone()) || r.timezone() < -12 || r.timezone() > 14)
            return "Enter a valid UTC offset.";
        return null;
    }

    public record ChartRequest(String name, String date, String time, String place,
                       double lat, double lon, double timezone, boolean includeAstavargam,
                       boolean includeDasa, boolean includeBhava) {
        // Preserves callers and the original regression tests.
        public ChartRequest(String name, String date, String time, String place,
                     double lat, double lon, double timezone, boolean includeAstavargam) {
            this(name,date,time,place,lat,lon,timezone,includeAstavargam,false,false);
        }
    }
    private record ProviderResponse(int status, JsonNode body, String safeError) {
        boolean ok() { return status >= 200 && status < 300 && body != null && !"error".equalsIgnoreCase(body.path("status").asText("")); }
    }
}
