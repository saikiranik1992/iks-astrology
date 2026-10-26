package com.iks.astrology.controller;

import com.iks.astrology.service.IksAstrologyService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class IksAstrologyController {

    private final IksAstrologyService astrologyService;

    @Value("${app.title:✨ IK’s Astrology}")
    private String appTitle;

    @Value("${app.subtitle:நவகிரக தலங்கள் & காயத்ரி மந்திரம் • 12 பாவக பலன் • அஷ்டகவர்க்கம் (337) • தசா புத்தி • பஞ்சாங்கம் & ஓரைகள் • 10 பொருத்தம்}")
    private String appSubtitle;

    @Value("${app.stepBadge:IK’s Astrology • Spring Boot + Thymeleaf Modern Suite}")
    private String stepBadge;

    public IksAstrologyController(IksAstrologyService astrologyService) {
        this.astrologyService = astrologyService;
    }

    /**
     * Renders the IK's Astrology Thymeleaf template (index.html).
     * Supports ?tab=<tabId> to open any tab directly and ?pdf=true to trigger automatic PDF export for that tab.
     */
    @GetMapping({"/", "/horoscope", "/pdf-export"})
    public String showHoroscopeSuite(
            @RequestParam(name = "tab", defaultValue = "ammaAstroTab") String activeTab,
            @RequestParam(name = "pdf", defaultValue = "false") boolean autoPdf,
            Model model) {

        model.addAttribute("appTitle", appTitle);
        model.addAttribute("appSubtitle", appSubtitle);
        model.addAttribute("stepBadge", stepBadge);
        model.addAttribute("activeTab", activeTab);
        model.addAttribute("autoPdf", autoPdf);
        model.addAttribute("tabs", astrologyService.getNavigationTabs());
        model.addAttribute("cities", astrologyService.getTamilNaduCities());
        model.addAttribute("defaultProfile", astrologyService.getDefaultProfile());
        model.addAttribute("muhurthamEvents", astrologyService.getMuhurthamEvents());

        return "index";
    }

    @GetMapping("/api/status")
    @ResponseBody
    public Map<String, Object> getStatus() {
        return Map.of(
            "status", "UP",
            "application", "IK’s Astrology",
            "stepsCompleted", 13,
            "perTabPdfExport", true,
            "tabsAvailable", astrologyService.getNavigationTabs().size()
        );
    }
}
