package com.iks.astrology.service;

import com.iks.astrology.model.CityOption;
import com.iks.astrology.model.DefaultProfile;
import com.iks.astrology.model.TabOption;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class IksAstrologyService {

    public List<CityOption> getTamilNaduCities() {
        return List.of(
            new CityOption("சென்னை (Chennai)", "13.08,80.27"),
            new CityOption("மதுரை (Madurai)", "9.93,78.12"),
            new CityOption("கோயம்புத்தூர் (Coimbatore)", "11.02,76.96"),
            new CityOption("திருச்சி (Trichy)", "10.79,78.70"),
            new CityOption("சேலம் (Salem)", "11.66,78.15"),
            new CityOption("திருநெல்வேலி (Tirunelveli)", "8.71,77.76"),
            new CityOption("தஞ்சாவூர் (Thanjavur)", "10.79,79.14"),
            new CityOption("புதுச்சேரி (Puducherry)", "11.94,79.81")
        );
    }

    public List<TabOption> getNavigationTabs() {
        return List.of(
            new TabOption("navagrahaTab", "🛕 நவகிரக தலங்கள் & மந்திரம்", 13, "IK's Astrology — Navagraha Temples & Gayatri Mantra Report"),
            new TabOption("kattamTab", "🕉️ ஜாதகம், 12 பாவகம் & தசை", 3, "IK's Astrology — Complete Birth Chart, 12-Bhava, SAV & Dasa Report"),
            new TabOption("panchangamTab", "📅 பஞ்சாங்கம் & ஓரைகள்", 2, "IK's Astrology — Daily Tamil Panchangam & Planetary Hora Report"),
            new TabOption("poruthamTab", "💍 10 திருமணப் பொருத்தம்", 4, "IK's Astrology — 10 Thirumana Porutham Compatibility Report"),
            new TabOption("peyarchiTab", "🪐 பெயர்ச்சி பலன்கள்", 7, "IK's Astrology — Gochara Planetary Transit Report"),
            new TabOption("muhurthamTab", "🎊 சுப முகூர்த்தம்", 8, "IK's Astrology — Subha Muhurtham & 14-Day Auspicious Scanner Report"),
            new TabOption("numerologyTab", "👶 பெயர் & எண் கணிதம்", 9, "IK's Astrology — Nakshatra Baby Naming & Numerology Report"),
            new TabOption("rasiTab", "♈ 12 ராசி பலன்", 1, "IK's Astrology — 12-Rasi Daily Forecast Report"),
            new TabOption("exactPredictionsTab", "✦ Exact Predictions Pro", 23, "IK's Astrology — 23 Traditional Tamil Horoscope Reference Sheets")
        );
    }

    public DefaultProfile getDefaultProfile() {
        return new DefaultProfile("கார்த்திக் (Karthik)", "1998-05-15", "08:30", "13.08,80.27");
    }

    public Map<String, String> getMuhurthamEvents() {
        return Map.of(
            "wedding", "💍 திருமணம் & நிச்சயதார்த்தம் (Wedding / Betrothal)",
            "house", "🏠 கிரகப்பிரவேசம் & வாஸ்து பூஜை (Housewarming & Vaastu)",
            "gold", "🚗 வாகனம் / தங்கம் / சொத்து வாங்க (Buying Gold / Vehicle)",
            "business", "💼 புதிய தொழில் / கல்வி தொடக்கம் (New Business / Education)"
        );
    }
}
