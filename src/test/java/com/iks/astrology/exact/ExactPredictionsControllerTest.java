package com.iks.astrology.exact;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import static org.junit.jupiter.api.Assertions.*;

class ExactPredictionsControllerTest {
    @Test
    void dasaQueryContainsBirthContextAndEncodesPlace() {
        var input = new ExactPredictionsController.ChartRequest(
            "Test User", "1992-07-03", "13:49", "Kanchipuram Tamil Nadu",
            12.8342, 79.7036, 5.5, false, true, true);
        var query = ExactPredictionsController.dasaQuery(input,
            java.time.LocalDate.of(1992,7,3), java.time.LocalTime.of(13,49));
        assertTrue(query.contains("year=1992"));
        assertTrue(query.contains("minute=49"));
        assertTrue(query.contains("name=Test+User"));
        assertTrue(query.contains("place=Kanchipuram+Tamil+Nadu"));
        assertTrue(query.contains("tz=5.5"));
        assertTrue(query.contains("language=ta"));
        assertFalse(query.contains("Bearer"));
    }

    @Test
    void missingKeyDoesNotTriggerPaidApiCall() {
        var controller = new ExactPredictionsController(new ObjectMapper(), "");
        var response = controller.chart(new ExactPredictionsController.ChartRequest(
                "Sample", "1992-07-03", "13:49", "Kanchipuram", 12.8342, 79.7036, 5.5, true));
        assertEquals(HttpStatus.SERVICE_UNAVAILABLE, response.getStatusCode());
        assertEquals(false, controller.status().get("configured"));
        assertTrue(controller.status().get("baseEndpoint").toString().contains("language=ta"));
        assertFalse(controller.status().toString().contains("Bearer"));
    }

    @Test
    void recognizesPlanetDataInPostmanWrapper() throws Exception {
        var objectMapper = new ObjectMapper();
        var node = objectMapper.readTree("{\"data\":{\"input\":{},\"planets\":[{\"point_id\":\"PLANET_SUN\",\"longitude\":12.4}]}}");
        var selected = ExactPredictionsController.chartPayload(node, 0);
        assertNotNull(selected);
        assertEquals("PLANET_SUN", selected.path("planets").get(0).path("point_id").asText());
    }

    @Test
    void recognizesRealProviderCombinedBasicEnvelope() throws Exception {
        var mapper = new ObjectMapper();
        var node = mapper.readTree("""
            {"status":"success","meta":{"request_id":"redacted"},
             "basic":{"status":"success","data":{"input":{"name":"Sample"},
               "planets":[{"point_id":"PLANET_MOON","longitude":130.25}]}}}
            """);
        var context = ExactPredictionsController.chartPayload(node, 0);
        assertNotNull(context);
        assertEquals("PLANET_MOON", context.path("planets").get(0).path("point_id").asText());
        var avBody = ExactPredictionsController.ashtavargamRequestBody(node, context);
        assertTrue(avBody.path("data").path("planets").isArray());
        assertFalse(avBody.path("data").has("data"), "Do not double-wrap the Type-B chart context");
        assertFalse(avBody.has("basic"), "Do not submit the combined response envelope");
        assertFalse(avBody.has("meta"), "Do not submit the combined response metadata");
    }

    @Test
    void wrapsBareBasicDataForAshtavargamWithoutLosingPlanets() throws Exception {
        var mapper = new ObjectMapper();
        var node = mapper.readTree("""
            {"status":"success","meta":{},"basic":{"input":{"name":"Sample"},
             "planets":[{"point_id":"PLANET_SUN","longitude":44.0}]}}
            """);
        var context = ExactPredictionsController.chartPayload(node, 0);
        assertNotNull(context);
        var avBody = ExactPredictionsController.ashtavargamRequestBody(node, context);
        assertEquals(44.0, avBody.path("data").path("planets").get(0).path("longitude").asDouble());
    }

    @Test
    void typeBRequestFromFullHoroscopeDropsUnnecessaryMetadata() throws Exception {
        var mapper = new ObjectMapper();
        var response = mapper.readTree("""
            {"status":"success","meta":{"request_id":"private"},
             "data":{"planets":[{"point_id":"PLANET_SUN","longitude":21.5}],
                     "input":{"birth_date":"1992-07-03"}},
             "large_report":{"unused":true}}
            """);
        var context = ExactPredictionsController.chartPayload(response,0);
        var typeB = ExactPredictionsController.ashtavargamRequestBody(response,context);
        assertTrue(typeB.path("data").path("planets").isArray());
        assertFalse(typeB.has("meta"));
        assertFalse(typeB.has("large_report"));
        assertFalse(typeB.has("basic"));
    }

    @Test
    void refusesUnmappedProviderResponseInsteadOfRenderingFakeCharts() throws Exception {
        var node = new ObjectMapper().readTree("{\"data\":{\"message\":\"OK\"}}");
        assertNull(ExactPredictionsController.chartPayload(node, 0));
    }

    @Test
    void invalidDateRejectedWithoutCallingProvider() {
        var controller = new ExactPredictionsController(new ObjectMapper(), "fake-key-for-unit-test");
        var response = controller.chart(new ExactPredictionsController.ChartRequest(
                "Sample", "1992-99-99", "13:49", "Kanchipuram", 12.8342, 79.7036, 5.5, true));
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
