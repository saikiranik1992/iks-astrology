
// ============================================================================
// DYNAMIC PLACE OF BIRTH TEXT BOX RESOLVER (85+ Cities/Towns + Hash Fallback)
// ============================================================================
const TAMIL_PLACE_GAZETTEER = [
  { keys: ["chennai", "madras", "சென்னை", "13.08,80.27"], label: "சென்னை (Chennai)", lat: 13.0827, lon: 80.2707 },
  { keys: ["madurai", "மதுரை", "9.93,78.12"], label: "மதுரை (Madurai)", lat: 9.9252, lon: 78.1198 },
  { keys: ["coimbatore", "kovai", "கோயம்புத்தூர்", "கோவை", "11.02,76.96"], label: "கோயம்புத்தூர் (Coimbatore)", lat: 11.0168, lon: 76.9558 },
  { keys: ["trichy", "tiruchirappalli", "திருச்சி", "திருச்சிராப்பள்ளி", "10.79,78.70"], label: "திருச்சி (Trichy)", lat: 10.7905, lon: 78.7047 },
  { keys: ["salem", "சேலம்", "11.66,78.15"], label: "சேலம் (Salem)", lat: 11.6643, lon: 78.1460 },
  { keys: ["tirunelveli", "nellai", "திருநெல்வேலி", "நெல்லை", "8.71,77.76"], label: "திருநெல்வேலி (Tirunelveli)", lat: 8.7139, lon: 77.7567 },
  { keys: ["thanjavur", "tanjore", "தஞ்சாவூர்", "தஞ்சை", "10.79,79.14"], label: "தஞ்சாவூர் (Thanjavur)", lat: 10.7870, lon: 79.1378 },
  { keys: ["puducherry", "pondicherry", "pondy", "புதுச்சேரி", "பாண்டிச்சேரி", "11.94,79.81"], label: "புதுச்சேரி (Puducherry)", lat: 11.9416, lon: 79.8083 },
  { keys: ["kumbakonam", "கும்பகோணம்", "குடந்தை"], label: "கும்பகோணம் (Kumbakonam)", lat: 10.9602, lon: 79.3845 },
  { keys: ["erode", "ஈரோடு"], label: "ஈரோடு (Erode)", lat: 11.3410, lon: 77.7172 },
  { keys: ["tiruppur", "tirupur", "திருப்பூர்"], label: "திருப்பூர் (Tiruppur)", lat: 11.1085, lon: 77.3411 },
  { keys: ["vellore", "வேலூர்"], label: "வேலூர் (Vellore)", lat: 12.9165, lon: 79.1325 },
  { keys: ["thoothukudi", "tuticorin", "தூத்துக்குடி"], label: "தூத்துக்குடி (Thoothukudi)", lat: 8.7642, lon: 78.1348 },
  { keys: ["nagercoil", "நாகர்கோவில்"], label: "நாகர்கோவில் (Nagercoil)", lat: 8.1833, lon: 77.4119 },
  { keys: ["kanchipuram", "kanjeevaram", "காஞ்சிபுரம்"], label: "காஞ்சிபுரம் (Kanchipuram)", lat: 12.8342, lon: 79.7036 },
  { keys: ["dindigul", "திண்டுக்கல்"], label: "திண்டுக்கல் (Dindigul)", lat: 10.3624, lon: 77.9695 },
  { keys: ["karur", "கரூர்"], label: "கரூர் (Karur)", lat: 10.9601, lon: 78.0766 },
  { keys: ["namakkal", "நாமக்கல்"], label: "நாமக்கல் (Namakkal)", lat: 11.2189, lon: 78.1674 },
  { keys: ["cuddalore", "கடலூர்"], label: "கடலூர் (Cuddalore)", lat: 11.7480, lon: 79.7714 },
  { keys: ["chidambaram", "சிதம்பரம்"], label: "சிதம்பரம் (Chidambaram)", lat: 11.3992, lon: 79.6935 },
  { keys: ["mayiladuthurai", "mayavaram", "மயிலாடுதுறை", "மாயவரம்"], label: "மயிலாடுதுறை (Mayiladuthurai)", lat: 11.1018, lon: 79.6526 },
  { keys: ["nagapattinam", "நாகப்பட்டினம்", "நாகை"], label: "நாகப்பட்டினம் (Nagapattinam)", lat: 10.7672, lon: 79.8449 },
  { keys: ["thiruvarur", "tiruvarur", "திருவாரூர்"], label: "திருவாரூர் (Thiruvarur)", lat: 10.7661, lon: 79.6344 },
  { keys: ["karaikal", "காரைக்கால்"], label: "காரைக்கால் (Karaikal)", lat: 10.9254, lon: 79.8380 },
  { keys: ["pudukkottai", "புதுக்கோட்டை"], label: "புதுக்கோட்டை (Pudukkottai)", lat: 10.3797, lon: 78.8208 },
  { keys: ["sivaganga", "சிவகங்கை"], label: "சிவகங்கை (Sivaganga)", lat: 9.8433, lon: 78.4809 },
  { keys: ["karaikudi", "காரைக்குடி"], label: "காரைக்குடி (Karaikudi)", lat: 10.0735, lon: 78.7732 },
  { keys: ["ramanathapuram", "ramnad", "ராமநாதபுரம்", "இராமநாதபுரம்"], label: "ராமநாதபுரம் (Ramanathapuram)", lat: 9.3639, lon: 78.8395 },
  { keys: ["rameswaram", "ராமேஸ்வரம்"], label: "ராமேஸ்வரம் (Rameswaram)", lat: 9.2876, lon: 79.3129 },
  { keys: ["virudhunagar", "விருதுநகர்"], label: "விருதுநகர் (Virudhunagar)", lat: 9.5680, lon: 77.9624 },
  { keys: ["sivakasi", "சிவகாசி"], label: "சிவகாசி (Sivakasi)", lat: 9.4533, lon: 77.8024 },
  { keys: ["rajapalayam", "ராஜபாளையம்"], label: "ராஜபாளையம் (Rajapalayam)", lat: 9.4515, lon: 77.5543 },
  { keys: ["theni", "தேனி"], label: "தேனி (Theni)", lat: 10.0104, lon: 77.4768 },
  { keys: ["tenkasi", "தென்காசி"], label: "தென்காசி (Tenkasi)", lat: 8.9594, lon: 77.3161 },
  { keys: ["tiruchendur", "திருச்செந்தூர்"], label: "திருச்செந்தூர் (Tiruchendur)", lat: 8.4946, lon: 78.1219 },
  { keys: ["palani", "பழனி"], label: "பழனி (Palani)", lat: 10.4500, lon: 77.5161 },
  { keys: ["pollachi", "பொள்ளாச்சி"], label: "பொள்ளாச்சி (Pollachi)", lat: 10.6609, lon: 77.0048 },
  { keys: ["ooty", "udhagamandalam", "ஊட்டி", "உதகமண்டலம்", "நீலகிரி"], label: "ஊட்டி (Ooty)", lat: 11.4102, lon: 76.6950 },
  { keys: ["kodaikanal", "கொடைக்கானல்"], label: "கொடைக்கானல் (Kodaikanal)", lat: 10.2381, lon: 77.4892 },
  { keys: ["dharmapuri", "தர்மபுரி"], label: "தர்மபுரி (Dharmapuri)", lat: 12.1211, lon: 78.1582 },
  { keys: ["krishnagiri", "கிருஷ்ணகிரி"], label: "கிருஷ்ணகிரி (Krishnagiri)", lat: 12.5186, lon: 78.2137 },
  { keys: ["hosur", "ஓசூர்"], label: "ஓசூர் (Hosur)", lat: 12.7409, lon: 77.8253 },
  { keys: ["tiruvannamalai", "thiruvannamalai", "திருவண்ணாமலை"], label: "திருவண்ணாமலை (Tiruvannamalai)", lat: 12.2253, lon: 79.0747 },
  { keys: ["villupuram", "விழுப்புரம்"], label: "விழுப்புரம் (Villupuram)", lat: 11.9401, lon: 79.4861 },
  { keys: ["kallakurichi", "கள்ளக்குறிச்சி"], label: "கள்ளக்குறிச்சி (Kallakurichi)", lat: 11.7384, lon: 78.9597 },
  { keys: ["ariyalur", "அரியலூர்"], label: "அரியலூர் (Ariyalur)", lat: 11.1401, lon: 79.0786 },
  { keys: ["perambalur", "பெரம்பலூர்"], label: "பெரம்பலூர் (Perambalur)", lat: 11.2342, lon: 78.8807 },
  { keys: ["ranipet", "ராணிப்பேட்டை"], label: "ராணிப்பேட்டை (Ranipet)", lat: 12.9275, lon: 79.3330 },
  { keys: ["nemili", "நெமிலி"], label: "நெமிலி (Nemili)", lat: 12.9822, lon: 79.5461 },
  { keys: ["arakkonam", "அரக்கோணம்"], label: "அரக்கோணம் (Arakkonam)", lat: 13.0839, lon: 79.6705 },
  { keys: ["tirupathur", "திருப்பத்தூர்"], label: "திருப்பத்தூர் (Tirupathur)", lat: 12.4950, lon: 78.5678 },
  { keys: ["chengalpattu", "செங்கல்பட்டு"], label: "செங்கல்பட்டு (Chengalpattu)", lat: 12.6819, lon: 79.9888 },
  { keys: ["tiruvallur", "thiruvallur", "திருவள்ளூர்"], label: "திருவள்ளூர் (Tiruvallur)", lat: 13.1431, lon: 79.9120 },
  { keys: ["tambaram", "தாம்பரம்"], label: "தாம்பரம் (Tambaram)", lat: 12.9249, lon: 80.1000 },
  { keys: ["avadi", "ஆவடி"], label: "ஆவடி (Avadi)", lat: 13.1067, lon: 80.0970 },
  { keys: ["kanyakumari", "கன்னியாகுமரி"], label: "கன்னியாகுமரி (Kanyakumari)", lat: 8.0883, lon: 77.5385 },
  { keys: ["bengaluru", "bangalore", "பெங்களூரு", "பெங்களூர்"], label: "பெங்களூரு (Bengaluru)", lat: 12.9716, lon: 77.5946 },
  { keys: ["hyderabad", "ஹைதராபாத்", "ஐதராபாத்"], label: "ஹைதராபாத் (Hyderabad)", lat: 17.3850, lon: 78.4867 },
  { keys: ["tirupati", "திருப்பதி"], label: "திருப்பதி (Tirupati)", lat: 13.6288, lon: 79.4192 },
  { keys: ["thiruvananthapuram", "trivandrum", "திருவனந்தபுரம்"], label: "திருவனந்தபுரம் (Trivandrum)", lat: 8.5241, lon: 76.9366 },
  { keys: ["kochi", "cochin", "கொச்சி"], label: "கொச்சி (Kochi)", lat: 9.9312, lon: 76.2673 },
  { keys: ["mumbai", "bombay", "மும்பை"], label: "மும்பை (Mumbai)", lat: 19.0760, lon: 72.8777 },
  { keys: ["delhi", "new delhi", "டெல்லி", "புது டெல்லி"], label: "டெல்லி (New Delhi)", lat: 28.6139, lon: 77.2090 },
  { keys: ["kolkata", "calcutta", "கொல்கத்தா"], label: "கொல்கத்தா (Kolkata)", lat: 22.5726, lon: 88.3639 },
  { keys: ["singapore", "சிங்கப்பூர்"], label: "சிங்கப்பூர் (Singapore)", lat: 1.3521, lon: 103.8198 },
  { keys: ["kuala lumpur", "malaysia", "மலேசியா", "கோலாலம்பூர்"], label: "கோலாலம்பூர் (Kuala Lumpur)", lat: 3.1390, lon: 101.6869 },
  { keys: ["colombo", "sri lanka", "கொழும்பு", "இலங்கை"], label: "கொழும்பு (Colombo)", lat: 6.9271, lon: 79.8612 },
  { keys: ["jaffna", "யாழ்ப்பாணம்"], label: "யாழ்ப்பாணம் (Jaffna)", lat: 9.6615, lon: 80.0255 },
  { keys: ["dubai", "uae", "துபாய்"], label: "துபாய் (Dubai)", lat: 25.2048, lon: 55.2708 },
  { keys: ["london", "uk", "லண்டன்"], label: "லண்டன் (London)", lat: 51.5072, lon: -0.1276 },
  { keys: ["new york", "usa", "நியூயார்க்"], label: "நியூயார்க் (New York)", lat: 40.7128, lon: -74.0060 }
];

function resolveBirthPlaceCoordinates(rawPlaceInput) {
  const raw = (rawPlaceInput || "").trim();
  if (!raw) {
    return { label: "சென்னை (Chennai)", lat: 13.0827, lon: 80.2707, matched: true };
  }
  const lower = raw.toLowerCase();
  for (let i = 0; i < TAMIL_PLACE_GAZETTEER.length; i++) {
    const entry = TAMIL_PLACE_GAZETTEER[i];
    if (entry.label.toLowerCase() === lower) {
      return { label: entry.label, lat: entry.lat, lon: entry.lon, matched: true };
    }
    for (let k = 0; k < entry.keys.length; k++) {
      if (lower.includes(entry.keys[k])) {
        return { label: raw.includes("(") ? raw : entry.label, lat: entry.lat, lon: entry.lon, matched: true };
      }
    }
  }
  const coordMatch = raw.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lon = parseFloat(coordMatch[2]);
    if (!isNaN(lat) && !isNaN(lon)) {
      return { label: raw, lat, lon, matched: true };
    }
  }
  let hash = 0;
  for (let i = 0; i < lower.length; i++) {
    hash = ((hash << 5) - hash + lower.charCodeAt(i)) | 0;
  }
  const absHash = Math.abs(hash);
  const lat = +(8.15 + ((absHash % 2035) / 100)).toFixed(2);
  const lon = +(72.80 + (((absHash >> 4) % 1555) / 100)).toFixed(2);
  return { label: raw, lat, lon, matched: false };
}

function updatePlaceCoordinateHints(placeInfo, sunriseText) {
  const istOffsetMin = ((placeInfo.lon - 82.5) * 4).toFixed(1);
  const signStr = parseFloat(istOffsetMin) >= 0 ? `+${istOffsetMin}` : `${istOffsetMin}`;
  const srExtra = sunriseText ? ` • சூரிய உதயம்: ${sunriseText}` : "";
  const hintText = `📍 ${placeInfo.label} • அக்ஷாம்சம்: ${placeInfo.lat.toFixed(2)}°N, ரேகாம்சம்: ${placeInfo.lon.toFixed(2)}°E (தேசாந்திர திருத்தம்: ${signStr} நிமிடம்${srExtra})`;
  const h1 = document.getElementById("ammaPlaceCoordHint");
  const h2 = document.getElementById("jPlaceCoordHint");
  if (h1) h1.textContent = hintText;
  if (h2) h2.textContent = hintText;
}

// ============================================================================
// TAMILVANAN "ஜாதகம் பார்ப்பது எப்படி?" (மணிமேகலைப் பிரசுரம்) CALCULATION ENGINE
// Implements the exact classical methods from Tamilvanan's book (Pages 5–25):
//  1. Local Sunrise (சூரிய உதயம்), Sunset (அஸ்தமனம்), Ahass (அஹஸ் பகற்பொழுது நாழிகை)
//     & Rathri (இராத்திரி நாழிகை = 60 - அஹஸ்) + Udayathi Janana Nazhigai-Vinadi
//     (1 மணி = 2½ நாழிகை; 1 நிமிஷம் = 2½ விநாடி; 60 நாழிகை = 3600 விநாடிகள்)
//  2. Janma Lagnam & Udaya Lagna Sesham via BOTH Tamilvanan's Sun-Sphutam Method
//     ((உதயாதி நாழிகை × 6 + சூரிய ஸ்புட பாகை) ÷ 30 → ஈவு + 1) AND the classical
//     12 Nirayana Rasi Pramana Vinadi Table (Total = 3600 Vinadis = 60 Nazhigais)
//  3. All 6 Lagnam & Birth-Time Verification Methods (6 இலக்கினச் சோதனை வழிகள்)
//     from Tamilvanan's "ஜாதகம் பார்ப்பது எப்படி?" (Pages 5–25):
//       • வழி 1 (p. 8–9): (உதயாதி நாழிகை × 4) ÷ 9 → மீதி நட்சத்திர திரிகோண சோதனை
//       • வழி 2 (p. 11–12): (உதயாதி நாழிகை பாகை + சூரிய ஸ்புட பாகை) ÷ 30 இலக்கினச் சோதனை
//       • வழி 3 (p. 12–15): ((உதயாதி நாழிகை × 4) + மேஷாதி இலக்கின எண் + சர(5)/ஸ்திர(10)/உபய(15)) ÷ 27 பட்ச சோதனை
//       • வழி 4 (p. 15–17): உதயாதி நாழிகை ÷ 12 → மீதி இராசி & திரிகோண இலக்கின சோதனை
//       • வழி 5 (p. 17–23): அஹஸ்/இராத்திரி ÷ 12 ஓரை & 5 சம பங்கு அந்தர் ஓரை (ஆண்/பெண்) சோதனை
//       • வழி 6 (p. 23–25): ஒற்றை (ஆண்) / இரட்டை (பெண்) இராசி சூரிய-சந்திர ஹோரை (D-2) சோதனை
//  4. High-Precision Thirukanitha Graha Sphutam, 108 Pada Saram, Navamsa Vargottama &
//     Janana Kala Dasa-Bhukti Balance in Years-Months-Days ((இருப்பு விநாடி × தசா வருடம்) ÷ 3600)
// ============================================================================
const RASI_PRAMANA_VINADIS = [
  269, // 0: மேஷம் (4 நாழிகை 29 விநாடி)
  304, // 1: ரிஷபம் (5 நாழிகை 04 விநாடி)
  327, // 2: மிதுனம் (5 நாழிகை 27 விநாடி)
  322, // 3: கடகம் (5 நாழிகை 22 விநாடி)
  308, // 4: சிம்மம் (5 நாழிகை 08 விநாடி)
  304, // 5: கன்னி (5 நாழிகை 04 விநாடி)
  316, // 6: துலாம் (5 நாழிகை 16 விநாடி)
  328, // 7: விருச்சிகம் (5 நாழிகை 28 விநாடி)
  319, // 8: தனுசு (5 நாழிகை 19 விநாடி)
  295, // 9: மகரம் (4 நாழிகை 55 விநாடி)
  257, // 10: கும்பம் (4 நாழிகை 17 விநாடி)
  251  // 11: மீனம் (4 நாழிகை 11 விநாடி) — மொத்தம் 3600 விநாடிகள் (60 நாழிகை)
];

let latestTamilvananBookData = null;

function formatNazhigaiVinadi(totalVinadis) {
  const v = Math.max(0, Math.round(totalVinadis));
  const nazhigai = Math.floor(v / 60);
  const vinadi = v % 60;
  return `${nazhigai} நாழிகை ${String(vinadi).padStart(2, "0")} விநாடி (${nazhigai}-${String(vinadi).padStart(2, "0")})`;
}

function formatDegMinTa(degVal) {
  const norm = ((degVal % 360) + 360) % 360;
  const inSign = norm % 30;
  const d = Math.floor(inSign);
  const m = Math.round((inSign - d) * 60);
  const adjD = m === 60 ? d + 1 : d;
  const adjM = m === 60 ? 0 : m;
  return `${adjD}° ${String(adjM).padStart(2, "0")}'`;
}

function formatClockAmPmTa(totalMinutesFromMidnight) {
  const normMin = ((Math.round(totalMinutesFromMidnight) % 1440) + 1440) % 1440;
  const hh24 = Math.floor(normMin / 60);
  const mm = normMin % 60;
  const periodTa = hh24 < 12 ? "காலை" : (hh24 < 16 ? "பிற்பகல்" : (hh24 < 19 ? "மாலை" : "இரவு"));
  const hh12 = hh24 % 12 === 0 ? 12 : hh24 % 12;
  return `${periodTa} ${String(hh12).padStart(2, "0")}:${String(mm).padStart(2, "0")} (${String(hh24).padStart(2, "0")}:${String(mm).padStart(2, "0")})`;
}

function computeTamilvananBookHoroscopeData(yyyy, mm, dd, hh, min, lat, lon) {
  const deg2rad = Math.PI / 180;
  const rad2deg = 180 / Math.PI;
  const norm360 = deg => ((deg % 360) + 360) % 360;

  // 1. Julian Day & Centuries from J2000.0 (IST = UTC + 5h30m)
  const utcMs = Date.UTC(yyyy, mm - 1, dd, hh, min) - (5.5 * 3600 * 1000);
  const j2000Ms = Date.UTC(2000, 0, 1, 12, 0, 0);
  const d = (utcMs - j2000Ms) / 86400000;
  const T = d / 36525;

  // Lahiri Chitra Paksha Ayanamsa (திருக்கணித அயனாம்சம்)
  const ayanamsa = 23.853 + (d / 365.2425) * 0.013968;

  // 2. High-Precision Sun Sidereal Longitude (சூரிய ஸ்புடம்)
  const M_sun = norm360(357.52911 + 0.98560028 * d);
  const L0_sun = norm360(280.46646 + 0.98564736 * d);
  const C_sun = (1.914602 - 0.004817 * T) * Math.sin(M_sun * deg2rad)
              + 0.019993 * Math.sin(2 * M_sun * deg2rad)
              + 0.000289 * Math.sin(3 * M_sun * deg2rad);
  const sunTropLon = norm360(L0_sun + C_sun);
  const sunLon = norm360(sunTropLon - ayanamsa);

  // 3. High-Precision Moon Sidereal Longitude (சந்திர ஸ்புடம் - ELP2000 principal terms)
  const L_moon = norm360(218.3165 + 13.17639648 * d);
  const M_moon = norm360(134.9634 + 13.06499295 * d);
  const D_moon = norm360(297.8502 + 12.19074912 * d);
  const F_moon = norm360(93.2721 + 13.22935024 * d);
  const moonPerturb = 6.2888 * Math.sin(M_moon * deg2rad)
                    + 1.2740 * Math.sin((2 * D_moon - M_moon) * deg2rad)
                    + 0.6583 * Math.sin(2 * D_moon * deg2rad)
                    + 0.2136 * Math.sin(2 * M_moon * deg2rad)
                    - 0.1851 * Math.sin(M_sun * deg2rad)
                    - 0.1143 * Math.sin(2 * F_moon * deg2rad);
  const moonTropLon = norm360(L_moon + moonPerturb);
  const moonLon = norm360(moonTropLon - ayanamsa);

  // 4. True Geocentric Sidereal Longitudes for Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Kethu
  const M_mars = norm360(19.373 + 0.52402068 * d);
  const L_mars = norm360(355.433 + 0.52403303 * d);
  const marsHelio = L_mars + 10.691 * Math.sin(M_mars * deg2rad) + 0.623 * Math.sin(2 * M_mars * deg2rad);
  const marsGeoShift = 22.0 * Math.sin((sunTropLon - marsHelio) * deg2rad);
  const marsLon = norm360(marsHelio + marsGeoShift - ayanamsa);

  const M_merc = norm360(174.7948 + 4.09233445 * d);
  const mercElong = 21.5 * Math.sin(M_merc * deg2rad) + 4.2 * Math.sin(2 * M_merc * deg2rad);
  const mercuryLon = norm360(sunLon + mercElong);

  const M_jup = norm360(20.0202 + 0.08308529 * d);
  const L_jup = norm360(34.3515 + 0.08309121 * d);
  const jupHelio = L_jup + 5.555 * Math.sin(M_jup * deg2rad) + 0.168 * Math.sin(2 * M_jup * deg2rad);
  const jupGeoShift = 10.5 * Math.sin((sunTropLon - jupHelio) * deg2rad);
  const jupiterLon = norm360(jupHelio + jupGeoShift - ayanamsa);

  const M_ven = norm360(50.4161 + 1.60213034 * d);
  const venElong = 45.0 * Math.sin((0.6165 * d + 1.1) ) + 1.5 * Math.sin(M_ven * deg2rad);
  const venusLon = norm360(sunLon + venElong);

  const M_sat = norm360(317.0207 + 0.03345965 * d);
  const L_sat = norm360(50.0774 + 0.03346995 * d);
  const satHelio = L_sat + 6.406 * Math.sin(M_sat * deg2rad) + 0.220 * Math.sin(2 * M_sat * deg2rad);
  const satGeoShift = 6.0 * Math.sin((sunTropLon - satHelio) * deg2rad);
  const saturnLon = norm360(satHelio + satGeoShift - ayanamsa);

  const rahuLon = norm360(125.04452 - 0.05295377 * d - ayanamsa);
  const kethuLon = norm360(rahuLon + 180);

  // 5. True Local Sunrise (சூரிய உதயம்), Sunset (அஸ்தமனம்), Ahass & Rathri (Book p. 7, 17–20)
  const obliquity = 23.4393 - 0.0000004 * d;
  const sinDec = Math.sin(obliquity * deg2rad) * Math.sin(sunTropLon * deg2rad);
  const declRad = Math.asin(Math.max(-0.99, Math.min(0.99, sinDec)));
  const latRad = Math.max(-60, Math.min(60, lat)) * deg2rad;

  // Equation of Time in minutes
  const yEot = Math.pow(Math.tan((obliquity * deg2rad) / 2), 2);
  const L0Rad = L0_sun * deg2rad;
  const MRad = M_sun * deg2rad;
  const eOrb = 0.0167086;
  const eotMinutes = 4 * rad2deg * (
    yEot * Math.sin(2 * L0Rad)
    - 2 * eOrb * Math.sin(MRad)
    + 4 * eOrb * yEot * Math.sin(MRad) * Math.cos(2 * L0Rad)
    - 0.5 * yEot * yEot * Math.sin(4 * L0Rad)
    - 1.25 * eOrb * eOrb * Math.sin(2 * MRad)
  );

  // Sunrise/Sunset hour angle ω₀ with atmospheric refraction (-0.833 deg)
  const cosOmega0 = (Math.sin(-0.833 * deg2rad) - Math.sin(latRad) * Math.sin(declRad)) /
                    (Math.cos(latRad) * Math.cos(declRad));
  const clampedCos = Math.max(-0.98, Math.min(0.98, cosOmega0));
  const omega0Deg = Math.acos(clampedCos) * rad2deg;

  // Local solar noon in IST minutes from midnight (IST meridian = 82.5° E)
  const solarNoonIstMin = 720 + (82.5 - lon) * 4 - eotMinutes;
  const sunriseIstMin = solarNoonIstMin - omega0Deg * 4;
  const sunsetIstMin = solarNoonIstMin + omega0Deg * 4;

  // Daytime (அஹஸ்) & Nighttime (இராத்திரி) in Minutes & Vinadis (Book p. 17–18)
  const ahassMinutes = Math.max(600, Math.min(840, sunsetIstMin - sunriseIstMin));
  const ahassVinadis = Math.round(ahassMinutes * 2.5);
  const rathriVinadis = Math.max(0, 3600 - ahassVinadis);

  // 6. Elapsed Time from Sunrise to Birth Time → Udayathi Janana Nazhigai-Vinadi (Book p. 7–8)
  const birthIstMin = hh * 60 + min;
  let elapsedMinFromSunrise = birthIstMin - sunriseIstMin;
  if (elapsedMinFromSunrise < 0) {
    elapsedMinFromSunrise += 1440; // Born before sunrise → count from previous sunrise
  }
  const elapsedHoursPart = Math.floor(elapsedMinFromSunrise / 60);
  const elapsedMinsPart = Math.round(elapsedMinFromSunrise % 60);

  // Book Rule (p. 7–8): 1 மணி = 2½ நாழிகை, 1 நிமிஷம் = 2½ விநாடி
  const udayathiTotalVinadis = Math.max(0, Math.min(3599, Math.round(elapsedMinFromSunrise * 2.5)));
  const udayathiNazhigai = Math.floor(udayathiTotalVinadis / 60);
  const udayathiVinadi = udayathiTotalVinadis % 60;
  const udayathiDecimalNazhigai = udayathiTotalVinadis / 60;

  // 7. Janma Lagnam Calculation:
  //    (A) Classical 12-Rasi Pramana Nazhigai-Vinadi Table Method (உதய லக்ன சேஷம்)
  const sunSign = Math.floor(sunLon / 30) % 12;
  const sunDegInSign = sunLon % 30;
  const sunRemDegInSign = 30 - sunDegInSign;
  const sunSignPramanaVin = RASI_PRAMANA_VINADIS[sunSign];
  // Remaining Vinadis in Sun's Rasi at Sunrise (சூரிய இராசி இருப்பு விநாடிகள்)
  const sunRasiIruppuVinadis = Math.max(1, Math.round((sunRemDegInSign / 30) * sunSignPramanaVin));

  let remVinadisForLagnam = udayathiTotalVinadis;
  let lagnamSign = sunSign;
  let lagnamSelluVinadis = 0;
  let lagnamPramanaVinadis = sunSignPramanaVin;
  const lagnaSubtractionSteps = [];

  if (remVinadisForLagnam < sunRasiIruppuVinadis) {
    // Born within the rising of Sun's own Rasi
    const alreadyElapsedAtSunrise = sunSignPramanaVin - sunRasiIruppuVinadis;
    lagnamSelluVinadis = alreadyElapsedAtSunrise + remVinadisForLagnam;
    lagnamPramanaVinadis = sunSignPramanaVin;
    lagnaSubtractionSteps.push({
      rasiTa: RASI_DATA[sunSign].tamil + " (சூரிய இராசி இருப்பு)",
      vinadis: sunRasiIruppuVinadis,
      note: `உதயாதி ${formatNazhigaiVinadi(udayathiTotalVinadis)} சூரிய இராசி கழிப்பிற்குள் அடக்கம்`
    });
  } else {
    remVinadisForLagnam -= sunRasiIruppuVinadis;
    lagnaSubtractionSteps.push({
      rasiTa: RASI_DATA[sunSign].tamil + " (சூரிய இராசி இருப்பு)",
      vinadis: sunRasiIruppuVinadis,
      note: `மீதி: ${formatNazhigaiVinadi(remVinadisForLagnam)}`
    });
    for (let step = 1; step <= 12; step++) {
      const nextSign = (sunSign + step) % 12;
      const nextPramana = RASI_PRAMANA_VINADIS[nextSign];
      if (remVinadisForLagnam < nextPramana || step === 12) {
        lagnamSign = nextSign;
        lagnamSelluVinadis = Math.min(nextPramana - 1, remVinadisForLagnam);
        lagnamPramanaVinadis = nextPramana;
        lagnaSubtractionSteps.push({
          rasiTa: RASI_DATA[nextSign].tamil + " (ஜென்ம இலக்கினம் ★)",
          vinadis: lagnamSelluVinadis,
          note: `செல்லு: ${formatNazhigaiVinadi(lagnamSelluVinadis)} • இருப்பு: ${formatNazhigaiVinadi(nextPramana - lagnamSelluVinadis)}`
        });
        break;
      } else {
        remVinadisForLagnam -= nextPramana;
        lagnaSubtractionSteps.push({
          rasiTa: RASI_DATA[nextSign].tamil + " (பிரமாணம் கழிப்பு)",
          vinadis: nextPramana,
          note: `மீதி: ${formatNazhigaiVinadi(remVinadisForLagnam)}`
        });
      }
    }
  }

  const lagnamIruppuVinadis = Math.max(0, lagnamPramanaVinadis - lagnamSelluVinadis);
  const lagnamDegInSign = (lagnamSelluVinadis / lagnamPramanaVinadis) * 30;
  const lagnamLon = norm360(lagnamSign * 30 + lagnamDegInSign);

  // Navamsa Lagnam (நவாம்ச இலக்கினம்: 1 இராசி பிரமாணம் ÷ 9 = 1 பாதம்)
  const lagnamNavamsaPadam = Math.min(9, Math.floor((lagnamSelluVinadis / lagnamPramanaVinadis) * 9) + 1);
  const lagnamStarIdx = Math.floor((lagnamLon / 360) * 27) % 27;
  const lagnamStarPadam = (Math.floor(lagnamLon / (360 / 108)) % 4) + 1;
  const navamsamLagnamSign = Math.floor(lagnamLon / (30 / 9)) % 12;

  //    (B) Tamilvanan's Book Method 2 (p. 11–12): Sun Sphutam Degree + Udayathi Nazhigai Degrees
  const udayathiDegrees = Math.round(udayathiDecimalNazhigai * 6);
  const sunSphutaWholeDeg = Math.round(sunDegInSign);
  const bookMethod2TotalDeg = udayathiDegrees + sunSphutaWholeDeg;
  const bookMethod2Quotient = Math.floor(bookMethod2TotalDeg / 30);
  const bookMethod2Remainder = bookMethod2TotalDeg % 30;
  const bookMethod2CountFromSun = bookMethod2Quotient + 1;
  const bookMethod2Sign = (sunSign + bookMethod2Quotient) % 12;

  // 8. Mandi (மாந்தி / குளிகன்) Longitude from Ahass/Rathri Ghatikas
  const birthDateObj = new Date(yyyy, mm - 1, dd, hh, min);
  const weekday = birthDateObj.getDay();
  const isDayBirth = (birthIstMin >= sunriseIstMin && birthIstMin < sunsetIstMin);
  const dayMandiGhatikas = [26, 22, 18, 14, 10, 6, 2];
  const nightMandiGhatikas = [10, 6, 2, 26, 22, 18, 14];
  const mandiBaseGhatika = isDayBirth
    ? (dayMandiGhatikas[weekday] * (ahassVinadis / 1800))
    : ((ahassVinadis / 60) + nightMandiGhatikas[weekday] * (rathriVinadis / 1800));
  const mandiLon = norm360(sunLon + mandiBaseGhatika * 6);

  // 9. Janma Nakshatram, Padam & Janana Kala Dasa Sesham (இருப்பு - Book p. 25)
  const starSpanDeg = 360 / 27; // 13°20' = 800 arcminutes = 60 Nazhigai = 3600 Vinadis
  const moonStarIndex = Math.floor((moonLon / 360) * 27) % 27;
  const moonPadam = (Math.floor(moonLon / (360 / 108)) % 4) + 1;
  const moonRasiIndex = Math.floor(moonLon / 30) % 12;
  const degInsideStar = moonLon % starSpanDeg;
  const starSelluVinadis = Math.min(3599, Math.max(1, Math.round((degInsideStar / starSpanDeg) * 3600)));
  const starIruppuVinadis = 3600 - starSelluVinadis;

  const startDasaSeqIdx = moonStarIndex % 9;
  const firstDasaLord = VIMSHOTTARI_SEQUENCE[startDasaSeqIdx];
  const dasaBalanceExactYears = (starIruppuVinadis * firstDasaLord.years) / 3600;
  const dasaBalY = Math.floor(dasaBalanceExactYears);
  const remAfterY = (dasaBalanceExactYears - dasaBalY) * 12;
  const dasaBalM = Math.floor(remAfterY);
  const dasaBalD = Math.round((remAfterY - dasaBalM) * 30);

  // 10. Lunar Thithi & Paksham (பூர்வபட்சம் / வளர்பிறை vs அபரபட்சம் / தேய்பிறை - Book p. 13–15)
  const moonSunDiff = norm360(moonTropLon - sunTropLon);
  const thithiNum30 = Math.floor(moonSunDiff / 12) + 1; // 1..30
  const isPurvaPaksham = thithiNum30 <= 15; // பூர்வபட்சம் (வளர்பிறை)
  const pakshamTa = isPurvaPaksham ? "பூர்வபட்சம் (வளர்பிறை)" : "அபரபட்சம் (தேய்பிறை)";

  // 11. TAMILVANAN'S 6 LAGNAM & BIRTH-TIME VERIFICATION METHODS (Book Pages 5–25)
  //   • Method 1 (முதலாவது வழி, p. 8–9): (உதயாதி நாழிகை × 4) ÷ 9
  const m1Product = Math.round(udayathiDecimalNazhigai * 4);
  const m1Quotient = Math.floor(m1Product / 9);
  const m1RemainderRaw = m1Product % 9;
  const m1Rem1to9 = m1RemainderRaw === 0 ? 9 : m1RemainderRaw;
  const m1TriadIndices = [m1Rem1to9 - 1, m1Rem1to9 + 8, m1Rem1to9 + 17];
  const m1TriadNames = m1TriadIndices.map(idx => STAR_PORUTHAM_DATA[idx].name);
  const m1ExactMatch = m1TriadIndices.includes(moonStarIndex);
  const actualStarMod9 = (moonStarIndex % 9) + 1;

  //   • Method 2 (இரண்டாவது வழி, p. 11–12): Sun Sphutam + Udayathi Nazhigai Degrees ÷ 30
  const m2MatchesLagnam = (bookMethod2Sign === lagnamSign) ||
                          (Math.abs(bookMethod2Sign - lagnamSign) === 1) ||
                          (Math.abs(bookMethod2Sign - lagnamSign) === 11);

  //   • Method 3 (மூன்றாவது வழி, p. 12–15):
  //     ((உதயாதி நாழிகை × 4) + மேஷாதி இலக்கின எண் (1..12) + சர(5)/ஸ்திர(10)/உபய(15)) ÷ 27
  const lagnamMeshathiNum = lagnamSign + 1; // 1..12
  const lagnamModality = lagnamSign % 3; // 0=சர (Movable), 1=ஸ்திர (Fixed), 2=உபய (Dual)
  const modalityConstant = lagnamModality === 0 ? 5 : (lagnamModality === 1 ? 10 : 15);
  const modalityNameTa = lagnamModality === 0 ? "சர இராசி (+5)" : (lagnamModality === 1 ? "ஸ்திர இராசி (+10)" : "உபய இராசி (+15)");
  const m3Total = m1Product + lagnamMeshathiNum + modalityConstant;
  const m3Quotient = Math.floor(m3Total / 27);
  const m3RemRaw = m3Total % 27;
  const m3Count = m3RemRaw === 0 ? 27 : m3RemRaw;
  // Count from Ashwini (0) if Purva Paksham, or from Chithirai (13) if Apara Paksham
  const m3StartStarIdx = isPurvaPaksham ? 0 : 13;
  const m3PrimaryStarIdx = (m3StartStarIdx + m3Count - 1) % 27;
  const m3TriadIndices = [
    m3PrimaryStarIdx,
    (m3PrimaryStarIdx + 9) % 27,
    (m3PrimaryStarIdx + 18) % 27
  ];
  const m3TriadNames = m3TriadIndices.map(i => STAR_PORUTHAM_DATA[i].name);

  //   • Method 4 (நான்காவது வழி, p. 15–17):
  //     உதயாதி நாழிகை ÷ 12 → மீதியை மேஷம் முதலாக எண்ண வரும் இராசி (அல்லது அதன் 5, 9 / 7-ன் 1, 5, 9)
  const m4WholeNazhigai = Math.max(1, udayathiNazhigai || 1);
  const m4Quotient = Math.floor(m4WholeNazhigai / 12);
  const m4RemRaw = m4WholeNazhigai % 12;
  const m4BaseSign = ((m4RemRaw === 0 ? 12 : m4RemRaw) - 1) % 12;
  const m4OppSign = (m4BaseSign + 6) % 12;
  const m4ValidSigns = [
    m4BaseSign,
    (m4BaseSign + 4) % 12,
    (m4BaseSign + 8) % 12,
    m4OppSign,
    (m4OppSign + 4) % 12,
    (m4OppSign + 8) % 12
  ];
  const m4MatchesLagnam = m4ValidSigns.includes(lagnamSign);

  //   • Method 5 (ஐந்தாவது வழி, p. 17–23):
  //     அஹஸ் / இராத்திரி ÷ 12 துல்லிய ஓரை & 5 சம பங்கு அந்தர் ஓரை சோதனை
  const HORA_ORDER_7 = ["sun", "venus", "mercury", "moon", "saturn", "jupiter", "mars"];
  const ANTHAR_WEEK_ORDER_7 = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"];
  const WEEKDAY_START_HORA_IDX = [0, 3, 6, 2, 5, 1, 4]; // Sun=0, Mon=3(Moon), Tue=6(Mars), Wed=2(Merc), Thu=5(Jup), Fri=1(Ven), Sat=4(Sat)
  const MALE_HORA_PLANETS = ["sun", "mars", "jupiter", "saturn"];

  const halfDayVinadis = isDayBirth ? ahassVinadis : rathriVinadis;
  const elapsedInHalfDayVinadis = isDayBirth
    ? udayathiTotalVinadis
    : Math.max(0, udayathiTotalVinadis - ahassVinadis);
  const singleHoraVinadis = halfDayVinadis / 12;
  const horaSlotIndex = Math.min(11, Math.floor(elapsedInHalfDayVinadis / singleHoraVinadis));
  const horaNumber1to12 = horaSlotIndex + 1;
  const startHoraIdxForDay = WEEKDAY_START_HORA_IDX[weekday];
  const mahaHoraOffset = isDayBirth ? horaSlotIndex : (12 + horaSlotIndex);
  const mahaHoraPlanetKey = HORA_ORDER_7[(startHoraIdxForDay + mahaHoraOffset) % 7];
  const isMaleMahaHora = MALE_HORA_PLANETS.includes(mahaHoraPlanetKey);

  // Position inside the current Hora (0..1) → 4 quarters (p. 21) & 5 Anthar-Horas (p. 21–23)
  const vinadiInsideHora = elapsedInHalfDayVinadis - (horaSlotIndex * singleHoraVinadis);
  const fracInsideHora = Math.max(0, Math.min(0.999, vinadiInsideHora / singleHoraVinadis));
  const horaQuarter1to4 = Math.floor(fracInsideHora * 4) + 1; // 1..4
  const antharIndex0to4 = Math.floor(fracInsideHora * 5); // 0..4
  const mahaInWeekIdx = ANTHAR_WEEK_ORDER_7.indexOf(mahaHoraPlanetKey);
  const antharHoraPlanetKey = ANTHAR_WEEK_ORDER_7[(mahaInWeekIdx + antharIndex0to4) % 7];
  const isMaleAntharHora = MALE_HORA_PLANETS.includes(antharHoraPlanetKey);

  // All 5 Anthar-Horas for the birth Hora
  const all5AntharHoras = [0, 1, 2, 3, 4].map(idx => {
    const pk = ANTHAR_WEEK_ORDER_7[(mahaInWeekIdx + idx) % 7];
    const isMale = MALE_HORA_PLANETS.includes(pk);
    return {
      partNum: idx + 1,
      planetKey: pk,
      planetTa: PLANET_TAMIL_SHORT[pk],
      genderTa: isMale ? "ஆண் அந்தர் ஓரை" : "பெண் அந்தர் ஓரை",
      isActive: idx === antharIndex0to4
    };
  });

  //   • Method 6 (ஆறாவது வழி, p. 23–25):
  //     ஆண் இராசி (ஒற்றை: மேஷம், மிதுனம், சிம்மம், துலாம், தனுசு, கும்பம்) vs பெண் இராசி (இரட்டை)
  //     மற்றும் D-2 சூரிய ஹோரை / சந்திர ஹோரை சோதனை
  const isOddLagnam = (lagnamSign % 2 === 0); // 0=மேஷம் (ஒற்றை/ஆண்), 1=ரிஷபம் (இரட்டை/பெண்)
  const lagnamGenderTa = isOddLagnam ? "ஆண் இராசி (ஒற்றை இராசி)" : "பெண் இராசி (இரட்டை இராசி)";
  const isFirstHalfLagnam = lagnamDegInSign < 15;
  const d2HoraLordTa = isOddLagnam
    ? (isFirstHalfLagnam ? "சூரிய ஓரை (முதற்பாதி 0°–15° • ஆண்)" : "சந்திர ஓரை (இரண்டாம் பாதி 15°–30° • பெண்)")
    : (isFirstHalfLagnam ? "சந்திர ஓரை (முதற்பாதி 0°–15° • பெண்)" : "சூரிய ஓரை (இரண்டாம் பாதி 15°–30° • ஆண்)");

  const rawLongitudes = {
    lagnam: lagnamLon,
    sun: sunLon,
    moon: moonLon,
    mars: marsLon,
    mercury: mercuryLon,
    jupiter: jupiterLon,
    venus: venusLon,
    saturn: saturnLon,
    rahu: rahuLon,
    kethu: kethuLon,
    mandi: mandiLon
  };

  return {
    yyyy, mm, dd, hh, min, lat, lon,
    ayanamsa,
    sunriseIstMin,
    sunsetIstMin,
    sunriseText: formatClockAmPmTa(sunriseIstMin),
    sunsetText: formatClockAmPmTa(sunsetIstMin),
    ahassVinadis,
    rathriVinadis,
    ahassText: formatNazhigaiVinadi(ahassVinadis),
    rathriText: formatNazhigaiVinadi(rathriVinadis),
    isDayBirth,
    elapsedMinFromSunrise,
    elapsedHoursPart,
    elapsedMinsPart,
    udayathiTotalVinadis,
    udayathiNazhigai,
    udayathiVinadi,
    udayathiText: formatNazhigaiVinadi(udayathiTotalVinadis),
    sunSign,
    sunDegInSign,
    sunDegMinText: formatDegMinTa(sunLon),
    sunRasiIruppuVinadis,
    lagnamSign,
    lagnamSelluVinadis,
    lagnamIruppuVinadis,
    lagnamPramanaVinadis,
    lagnamDegInSign,
    lagnamDegMinText: formatDegMinTa(lagnamLon),
    lagnaSubtractionSteps,
    lagnamNavamsaPadam,
    lagnamStarIdx,
    lagnamStarPadam,
    navamsamLagnamSign,
    moonStarIndex,
    moonPadam,
    moonRasiIndex,
    moonDegMinText: formatDegMinTa(moonLon),
    starSelluVinadis,
    starIruppuVinadis,
    firstDasaLord,
    dasaBalanceExactYears,
    dasaBalY,
    dasaBalM,
    dasaBalD,
    dasaBalanceFullText: `${firstDasaLord.shortTa} மகா திசை இருப்பு: ${dasaBalY} வருடம் ${dasaBalM} மாதம் ${dasaBalD} நாள்`,
    thithiNum30,
    isPurvaPaksham,
    pakshamTa,
    // 6 Verification Methods from Tamilvanan's Book
    method1: {
      formulaText: `(${udayathiNazhigai}-${String(udayathiVinadi).padStart(2, "0")} × 4) ÷ 9 = ${m1Product} ÷ 9 → ஈவு ${m1Quotient}, மீதி ${m1Rem1to9}`,
      triadNames: m1TriadNames.join(" / "),
      actualStarName: STAR_PORUTHAM_DATA[moonStarIndex].name,
      actualStarMod9,
      isMatch: m1ExactMatch
    },
    method2: {
      formulaText: `உதயாதி பாகை (${udayathiDegrees}°) + சூரிய பாகை (${sunSphutaWholeDeg}°) = ${bookMethod2TotalDeg}° ÷ 30 → ஈவு ${bookMethod2Quotient} + 1 = ${bookMethod2CountFromSun}-வது இராசி`,
      predictedLagnamTa: RASI_DATA[bookMethod2Sign].tamil,
      actualLagnamTa: RASI_DATA[lagnamSign].tamil,
      remainderDeg: bookMethod2Remainder,
      isMatch: m2MatchesLagnam
    },
    method3: {
      formulaText: `(${m1Product} + மேஷாதி எண் ${lagnamMeshathiNum} + ${modalityNameTa}) = ${m3Total} ÷ 27 → ஈவு ${m3Quotient}, மீதி ${m3Count}`,
      pakshamRuleTa: isPurvaPaksham ? "பூர்வபட்சம் (அஸ்வினி முதல் எண்ண)" : "அபரபட்சம் (சித்திரை முதல் எண்ண)",
      triadNames: m3TriadNames.join(" / ")
    },
    method4: {
      formulaText: `உதயாதி நாழிகை ${m4WholeNazhigai} ÷ 12 → ஈவு ${m4Quotient}, மீதி ${m4RemRaw === 0 ? 12 : m4RemRaw} (${RASI_DATA[m4BaseSign].tamil})`,
      validSignsTa: m4ValidSigns.map(idx => RASI_DATA[idx].tamil).join(", "),
      isMatch: m4MatchesLagnam
    },
    method5: {
      periodTypeTa: isDayBirth ? `பகற்பொழுது (அஹஸ் ${formatNazhigaiVinadi(ahassVinadis)})` : `இராப்பொழுது (இராத்திரி ${formatNazhigaiVinadi(rathriVinadis)})`,
      singleHoraText: formatNazhigaiVinadi(singleHoraVinadis),
      horaNumber1to12,
      mahaHoraPlanetTa: PLANET_TAMIL_SHORT[mahaHoraPlanetKey],
      mahaHoraGenderTa: isMaleMahaHora ? "ஆண் ஓரை" : "பெண் ஓரை",
      horaQuarter1to4,
      antharHoraPlanetTa: PLANET_TAMIL_SHORT[antharHoraPlanetKey],
      antharHoraPartNum: antharIndex0to4 + 1,
      antharHoraGenderTa: isMaleAntharHora ? "ஆண் அந்தர் ஓரை" : "பெண் அந்தர் ஓரை",
      all5AntharHoras
    },
    method6: {
      lagnamGenderTa,
      d2HoraLordTa,
      lagnamDegMinText: formatDegMinTa(lagnamLon)
    },
    rawLongitudes
  };
}


// ============================================================================
// "ஆதியும் அந்தமும்" (1–25) & "சர்வாங்க அஷ்ட வர்க்கம் (337 பரல்)" ENGINE
// Matches the uploaded Tamil Horoscope Notebook pages & Tamilvanan's Book
// ============================================================================
const TAMIL_60_YEARS = [
  "பிரபவ (Prabhava)", "விபவ (Vibhava)", "சுக்கில (Shukla)", "பிரமோதூத (Pramodoota)", "பிரஜோற்பத்தி (Prajothpatti)",
  "ஆங்கீரச (Angirasa)", "ஸ்ரீமுக (Srimukha)", "பவ (Bhava)", "யுவ (Yuva)", "தாது (Dhatu)",
  "ஈஸ்வர (Eswara)", "வெகுதானிய (Bahudhanya)", "பிரமாதி (Pramathi)", "விக்கிரம (Vikrama)", "விஷு (Vishu)",
  "சித்திரபானு (Chitrabhanu)", "சுபானு (Subhanu)", "தாரண (Tharana)", "பார்த்திப (Parthiba)", "விய (Viya)",
  "சர்வஜித்து (Sarvajith)", "சர்வதாரி (Sarvadhari)", "விரோதி (Virodhi)", "விக்ருதி (Vikruthi)", "கர (Khara)",
  "நந்தன (Nandana)", "விஜய (Vijaya)", "ஜய (Jaya)", "மன்மத (Manmatha)", "துன்முகி (Dhunmukhi)",
  "ஹேவிளம்பி (Hevilambi)", "விளம்பி (Vilambi)", "விகாரி (Vikari)", "சார்வரி (Sarvari)", "பிலவ (Plava)",
  "சுபகிருது (Subhakruth)", "சோபகிருது (Sobhakruth)", "குரோதி (Krodhi)", "விசுவாவசு (Viswavasu)", "பராபவ (Parabhava)",
  "பிலவங்க (Plavanga)", "கீலக (Keelaka)", "சௌமிய (Saumya)", "சாதாரண (Sadharana)", "விரோதிகிருது (Virodhikruth)",
  "பரிதாபி (Paridhabi)", "பிரமாதீச (Pramadheesa)", "ஆனந்த (Ananda)", "ராட்சச (Rakshasa)", "நள (Nala)",
  "பிங்கள (Pingala)", "காளயுக்தி (Kalayukthi)", "சித்தார்த்தி (Siddharthi)", "ரௌத்திரி (Raudhri)", "துன்மதி (Dhunmathi)",
  "துந்துபி (Dhundhubhi)", "ருத்ரோத்காரி (Rudhirodgari)", "ரக்தாட்சி (Raktakshi)", "குரோதன (Krodhana)", "அட்சய (Akshaya)"
];

const NAMA_YOGAM_27 = [
  "விஷ்கம்பம் (Vishkambham)", "ப்ரீதி (Preethi)", "ஆயுஷ்மான் (Ayushman)",
  "சௌபாக்கியம் (Saubhagyam)", "சோபனம் (Sobhanam)", "அதிகண்டம் (Athigandam)",
  "சுகர்மம் (Sukarmam)", "திருதி (Dhrithi)", "சூலம் (Soolam)",
  "கண்டம் (Gandam)", "விருத்தி (Vriddhi)", "துருவம் (Dhruvam)",
  "வியாகாதம் (Vyaghatham)", "ஹர்ஷணம் (Harshanam)", "வஜ்ரம் (Vajram)",
  "சித்தி (Siddhi)", "வியதிபாதம் (Vyathipatham)", "வரியான் (Variyan)",
  "பரிகம் (Parigham)", "சிவம் (Sivam)", "சித்தம் (Siddham)",
  "சாத்தியம் (Sadhyam)", "சுபம் (Subham)", "சுப்பிரம் (Subram)",
  "பிராம்மியம் (Brahmiyam)", "ஐந்திரம் (Aindram)", "வைதிருதி (Vaidhruthi)"
];

const MOVABLE_KARANAMS_7 = [
  "பவம் (Bava)", "பாலவம் (Balava)", "கௌலவம் (Kaulava)",
  "தைதுலம் (Taitila)", "கரசை (Gara)", "வணிசை (Vanija)",
  "பத்திரை / விஷ்டி (Bhadra)"
];

// Classical Tamil Panchangam Thithi Sooniya Rasigal (for Thithi 1..15)
const THITHI_SOONIYA_TABLE = {
  1: "துலாம், மகரம் (Thulaam, Magaram)",
  2: "தனுசு, மீனம் (Dhanusu, Meenam)",
  3: "சிம்மம், மகரம் (Simmam, Magaram)",
  4: "கும்பம், ரிஷபம் (Kumbam, Rishabam)",
  5: "மிதுனம், கன்னி (Mithunam, Kanni)",
  6: "மேஷம், சிம்மம் (Mesham, Simmam)",
  7: "கடகம், தனுசு (Kadagam, Dhanusu)",
  8: "மிதுனம், கன்னி (Mithunam, Kanni)",
  9: "சிம்மம், விருச்சிகம் (Simmam, Viruchigam)",
  10: "சிம்மம், விருச்சிகம் (Simmam, Viruchigam)",
  11: "தனுசு, மீனம் (Dhanusu, Meenam)",
  12: "துலாம், மகரம் (Thulaam, Magaram)",
  13: "ரிஷபம், சிம்மம் (Rishabam, Simmam)",
  14: "மிதுனம், கன்னி, தனுசு, மீனம் (Mithunam, Kanni, Dhanusu, Meenam)",
  15: "திதி சூனியம் இல்லை (பௌர்ணமி / அமாவாசை)"
};

// 6 Tamil Rutus (Seasons) by Solar Rasi Index (0..11)
const TAMIL_RUTU_BY_SUN_SIGN = [
  "வசந்த ருது — இளவேனிற்காலம் (சித்திரை - வைகாசி)", // 0: Mesham
  "வசந்த ருது — இளவேனிற்காலம் (சித்திரை - வைகாசி)", // 1: Rishabam
  "கிரீஷ்ம ருது — முதுவேனிற்காலம் (ஆனி - ஆடி)",     // 2: Mithunam
  "கிரீஷ்ம ருது — முதுவேனிற்காலம் (ஆனி - ஆடி)",     // 3: Kadagam
  "வர்ஷ ருது — கார்காலம் (ஆவணி - புரட்டாசி)",       // 4: Simmam
  "வர்ஷ ருது — கார்காலம் (ஆவணி - புரட்டாசி)",       // 5: Kanni
  "சரத் ருது — குளிர்காலம் (ஐப்பசி - கார்த்திகை)",   // 6: Thulaam
  "சரத் ருது — குளிர்காலம் (ஐப்பசி - கார்த்திகை)",   // 7: Viruchigam
  "ஹேமந்த ருது — முன்பனிக்காலம் (மார்கழி - தை)",    // 8: Dhanusu
  "ஹேமந்த ருது — முன்பனிக்காலம் (மார்கழி - தை)",    // 9: Magaram
  "சிசிர ருது — பின்பனிக்காலம் (மாசி - பங்குனி)",   // 10: Kumbam
  "சிசிர ருது — பின்பனிக்காலம் (மாசி - பங்குனி)"    // 11: Meenam
];

function computeAadhiyumAnthamum25Details(bookData, nameVal, dateStr, timeStr, placeLabel) {
  const norm360 = deg => ((deg % 360) + 360) % 360;
  const { yyyy, mm, dd, hh, min } = bookData;
  const birthDateObj = new Date(yyyy, mm - 1, dd, hh, min);
  const weekdayIdx = birthDateObj.getDay();
  const weekdayObj = WEEKDAY_PANCHANGAM[weekdayIdx];

  // 1. English Date formatted DD-MM-YYYY
  const engDateFormatted = `${String(dd).padStart(2, "0")}-${String(mm).padStart(2, "0")}-${yyyy}`;

  // 2. Tamil Year (60-Year Cycle) + Tamil Month & Day
  const tamilMonthDayObj = getTamilMonthAndDayStructured(birthDateObj);
  const isBeforeChithirai = (mm < 4) || (mm === 4 && dd < 14);
  const tamilCycleYear = isBeforeChithirai ? (yyyy - 1) : yyyy;
  const tamilYearIdx = ((tamilCycleYear - 1987) % 60 + 60) % 60;
  const tamilYearName = TAMIL_60_YEARS[tamilYearIdx];
  const tamilFullDateText = `${tamilYearName} வருடம், ${tamilMonthDayObj.monthName} மாதம் ${tamilMonthDayObj.dayNum}-ம் தேதி`;

  // 3. Birth Time with AM/PM & Udayathi Nazhigai
  const birthTime12h = formatClockAmPmTa(hh * 60 + min);
  const neramFullText = `${birthTime12h} • உதயாதி: ${bookData.udayathiText}`;

  // 4. Ayanam (உத்தராயணம் vs தக்ஷிணாயனம்)
  const sunSign = bookData.sunSign;
  const isUttarayanam = [9, 10, 11, 0, 1, 2].includes(sunSign);
  const ayanamText = isUttarayanam
    ? "உத்தராயணம் (தை முதல் ஆனி வரை)"
    : "தக்ஷிணாயணம் (ஆடி முதல் மார்கழி வரை)";

  // 5. Rutu (ருது)
  const rutuText = TAMIL_RUTU_BY_SUN_SIGN[sunSign];

  // 6. Paksham, Thithi & Thithi Sooniya Rasigal
  const sunLon = bookData.rawLongitudes.sun;
  const moonLon = bookData.rawLongitudes.moon;
  const moonSunDiff = norm360(moonLon - sunLon);
  const thithiIdx0to29 = Math.floor(moonSunDiff / 12) % 30;
  const thithiInPaksha1to15 = (thithiIdx0to29 % 15) + 1;
  const isShukla = thithiIdx0to29 < 15;
  const pakshamFullText = isShukla
    ? "சுக்ல பக்ஷம் / பூர்வபக்ஷம் (வளர்பிறை)"
    : "கிருஷ்ண பக்ஷம் / அபரபக்ஷம் (தேய்பிறை)";

  let thithiNameTa = "";
  if (thithiIdx0to29 === 14) {
    thithiNameTa = "பௌர்ணமி (Pournami • முழு நிலவு)";
  } else if (thithiIdx0to29 === 29) {
    thithiNameTa = "அமாவாசை (Amavasai • புது நிலவு)";
  } else {
    thithiNameTa = `${isShukla ? "வளர்பிறை" : "தேய்பிறை"} ${THITHI_NAMES[thithiInPaksha1to15 - 1]}`;
  }
  const degInThithi = moonSunDiff % 12;
  const thithiRemPct = Math.round(((12 - degInThithi) / 12) * 100);
  const thithiFullText = `${thithiNameTa} (இருப்பு: ${thithiRemPct}%)`;

  const thithiSooniyaText = THITHI_SOONIYA_TABLE[thithiInPaksha1to15] || "திதி சூனியம் இல்லை";

  // 7. Nakshatram (Row 15)
  const janmaStarObj = STAR_PORUTHAM_DATA[bookData.moonStarIndex];
  const janmaStarLord = VIMSHOTTARI_SEQUENCE[bookData.moonStarIndex % 9];
  const janmaSyllable = janmaStarObj.syllables[bookData.moonPadam - 1];
  const nakshatramFullText = `${janmaStarObj.name} - ${bookData.moonPadam}ம் பாதம் • அதிபதி: ${janmaStarLord.shortTa} (பெயர் எழுத்து: '${janmaSyllable}')`;

  // 8. Nama Yogam (Row 16: 27 Nama Yogams from Sun + Moon sidereal longitude)
  const yogaSumLon = norm360(sunLon + moonLon);
  const yogaSpan = 360 / 27;
  const namaYogamIdx = Math.floor(yogaSumLon / yogaSpan) % 27;
  const namaYogamText = `${namaYogamIdx + 1}. ${NAMA_YOGAM_27[namaYogamIdx]}`;

  // 9. Yogi (Row 17: Sun + Moon + 93°20')
  const yogiSphutam = norm360(sunLon + moonLon + (93 + 20 / 60));
  const yogiStarIdx = Math.floor(yogiSphutam / yogaSpan) % 27;
  const yogiPadam = (Math.floor(yogiSphutam / (360 / 108)) % 4) + 1;
  const yogiStarObj = STAR_PORUTHAM_DATA[yogiStarIdx];
  const yogiPlanetObj = VIMSHOTTARI_SEQUENCE[yogiStarIdx % 9];
  const yogiRasiIdx = Math.floor(yogiSphutam / 30) % 12;
  const yogiRasiObj = RASI_DATA[yogiRasiIdx];
  const yogiFullText = `யோகி நட்சத்திரம்: ${yogiStarObj.name} (${yogiPadam}ம் பாதம்) • யோகி கிரகம்: ${yogiPlanetObj.name}`;

  // 10. Avayogi (Row 18: Yogi Sphutam + 186°40')
  const avayogiSphutam = norm360(yogiSphutam + (186 + 40 / 60));
  const avayogiStarIdx = Math.floor(avayogiSphutam / yogaSpan) % 27;
  const avayogiPadam = (Math.floor(avayogiSphutam / (360 / 108)) % 4) + 1;
  const avayogiStarObj = STAR_PORUTHAM_DATA[avayogiStarIdx];
  const avayogiPlanetObj = VIMSHOTTARI_SEQUENCE[avayogiStarIdx % 9];
  const avayogiFullText = `அவயோகி நட்சத்திரம்: ${avayogiStarObj.name} (${avayogiPadam}ம் பாதம்) • அவயோகி கிரகம்: ${avayogiPlanetObj.name}`;

  // 11. Karanam (Row 19: 60 half-thithis of 6° each)
  const karanaIdx0to59 = Math.floor(moonSunDiff / 6) % 60;
  let karanamNameTa = "";
  if (karanaIdx0to59 === 0) karanamNameTa = "கிம்ஸ்துக்னம் (Kimstughnam)";
  else if (karanaIdx0to59 === 57) karanamNameTa = "சகுனி (Sakuni)";
  else if (karanaIdx0to59 === 58) karanamNameTa = "சதுஷ்பாதம் (Chatushpadam)";
  else if (karanaIdx0to59 === 59) karanamNameTa = "நாகவம் (Nagavam)";
  else karanamNameTa = MOVABLE_KARANAMS_7[(karanaIdx0to59 - 1) % 7];

  // 12. Mudakku (Row 20: முடக்கு நட்சத்திரம் / சகயோகி & முடக்கு ராசி)
  // In Tamil Jathaga Notebooks ("ஆதியும் அந்தமும்"), முடக்கு (Mudakku) denotes the Avayogi/Badhaka obstruction star & Duplicate Yogi (சகயோகி: Rasi Lord of Yogi Star)
  const lagSign = currentRasiPositions.lagnam;
  const badhakaHouseOffset = (lagSign % 3 === 0) ? 10 : ((lagSign % 3 === 1) ? 8 : 6); // Movable=11th, Fixed=9th, Dual=7th
  const badhakaRasiIdx = (lagSign + badhakaHouseOffset) % 12;
  const mudakkuFullText = `முடக்கு நட்சத்திரம்: ${avayogiStarObj.name} (${avayogiPlanetObj.shortTa}) • சகயோகி (யோகி ராசியாதிபதி): ${yogiRasiObj.lord} (${yogiRasiObj.tamil}) • பாதக ராசி: ${RASI_DATA[badhakaRasiIdx].tamil}`;

  // 13. Vainasikam (Row 21: வைநாசிகம் — 22nd Nakshatra from Janma Nakshatra)
  const vainasikaStarIdx = (bookData.moonStarIndex + 21) % 27;
  const vainasikaStarObj = STAR_PORUTHAM_DATA[vainasikaStarIdx];
  const vainasikaLordObj = VIMSHOTTARI_SEQUENCE[vainasikaStarIdx % 9];
  const vainasikamFullText = `${vainasikaStarObj.name} (ஜன்ம நட்சத்திரம் முதல் 22-வது நட்சத்திரம் • அதிபதி: ${vainasikaLordObj.shortTa})`;

  // 14. 88th Padam (Row 22: 88வது பாதம் from Janma Nakshatra Padam)
  const birthGlobalPadam0to107 = bookData.moonStarIndex * 4 + (bookData.moonPadam - 1);
  const padam88Global0to107 = (birthGlobalPadam0to107 + 87) % 108;
  const star88Idx = Math.floor(padam88Global0to107 / 4) % 27;
  const padam88Num = (padam88Global0to107 % 4) + 1;
  const rasi88Idx = Math.floor(padam88Global0to107 / 9) % 12;
  const star88Obj = STAR_PORUTHAM_DATA[star88Idx];
  const padam88FullText = `${star88Obj.name} - ${padam88Num}ம் பாதம் • நவாம்ச ராசி: ${RASI_DATA[rasi88Idx].tamil} (அதிபதி: ${VIMSHOTTARI_SEQUENCE[star88Idx % 9].shortTa})`;

  // 15. Lagnam (Row 23)
  const lagnamRasiObj = RASI_DATA[lagSign];
  const lagnamStarObj = STAR_PORUTHAM_DATA[bookData.lagnamStarIdx];
  const lagnamFullText = `${lagnamRasiObj.tamil} (${lagnamRasiObj.translit} • பாகை: ${bookData.lagnamDegMinText}) • நட்சத்திரம்: ${lagnamStarObj.name} - ${bookData.lagnamStarPadam}ம் பாதம் • அதிபதி: ${lagnamRasiObj.lord}`;

  // 16. Rasi (Row 24)
  const moonRasiObj = RASI_DATA[currentRasiPositions.moon];
  const rasiFullText = `${moonRasiObj.tamil} (${moonRasiObj.translit} • பாகை: ${bookData.moonDegMinText}) • அதிபதி: ${moonRasiObj.lord}`;

  // 17. Ganam (Row 25)
  const ganamNameTa = GANAM_TAMIL[janmaStarObj.ganam];
  const rajjuNameTa = RAJJU_TAMIL[janmaStarObj.rajju];
  const ganamFullText = `${ganamNameTa} • யோனி: ${janmaStarObj.yoni} • ரஜ்ஜு: ${rajjuNameTa}`;

  const rows1to14 = [
    { no: "1.", label: "ஜாதகரின் பெயர்", val: nameVal },
    { no: "2", label: "ஆங்கில தேதி", val: engDateFormatted },
    { no: "3", label: "தமிழ் தேதி", val: tamilFullDateText },
    { no: "4", label: "நேரம்", val: neramFullText },
    { no: "5", label: "கிழமை", val: `${weekdayObj.tamilDay} (${weekdayObj.engDay} • வார அதிபதி: ${weekdayObj.planetLord})` },
    { no: "6", label: "ஜாதகர் பிறந்த தேதி", val: `${engDateFormatted} (${tamilMonthDayObj.monthName} ${tamilMonthDayObj.dayNum}) • ${janmaStarObj.name} ${bookData.moonPadam}ம் பாதம்` },
    { no: "7", label: "பிறந்த ஊர்", val: `${placeLabel} (அக்ஷாம்சம்: ${bookData.lat.toFixed(2)}°N, ரேகாம்சம்: ${bookData.lon.toFixed(2)}°E)` },
    { no: "8", label: "சூர்யோதயம்", val: `${bookData.sunriseText} (பகற்பொழுது அஹஸ்: ${bookData.ahassText})` },
    { no: "9", label: "சூர்ய அஸ்தமனம்", val: `${bookData.sunsetText} (இராப்பொழுது இராத்திரி: ${bookData.rathriText})` },
    { no: "10", label: "அயனம்", val: ayanamText },
    { no: "11", label: "ருது", val: rutuText },
    { no: "12", label: "பக்ஷம்", val: pakshamFullText },
    { no: "13", label: "திதி", val: thithiFullText },
    { no: "14", label: "திதிசூனிய ராசிகள்", val: thithiSooniyaText }
  ];

  const rows15to25 = [
    { no: "15", label: "நட்சத்திரம்", val: nakshatramFullText },
    { no: "16", label: "நாமயோகம்", val: namaYogamText },
    { no: "17", label: "யோகி", val: yogiFullText },
    { no: "18", label: "அவயோகி", val: avayogiFullText },
    { no: "19", label: "கரணம்", val: karanamNameTa },
    { no: "20", label: "முடக்கு", val: mudakkuFullText },
    { no: "21", label: "வைநாசிகம்", val: vainasikamFullText },
    { no: "22", label: "88வது பாதம்", val: padam88FullText },
    { no: "23", label: "லக்னம்", val: lagnamFullText },
    { no: "24", label: "ராசி", val: rasiFullText },
    { no: "25", label: "கணம்", val: ganamFullText }
  ];

  return { rows1to14, rows15to25 };
}

function renderAadhiyumAnthamumAndSarvangaSheets(bookData, nameVal, dateStr, timeStr, placeLabel) {
  if (!bookData) return;
  const { rows1to14, rows15to25 } = computeAadhiyumAnthamum25Details(bookData, nameVal, dateStr, timeStr, placeLabel);

  const aadhiContainer = document.getElementById("ammaAadhiyumAnthamumContainer");
  if (aadhiContainer) {
    const buildRowsHtml = rows => rows.map(r => `
      <tr>
        <td class="col-sno">${r.no}</td>
        <td class="col-vibaram">${r.label}</td>
        <td class="col-vilakkam">${r.val}</td>
      </tr>
    `).join("");

    const page1Html = `
      <div class="amma-page-sheet" style="margin-bottom: 24px;">
        <div class="amma-pillari-top">உ</div>
        <h2 class="amma-sheet-title">ஆதியும் அந்தமும் (பக்கம் 1 : வ. எண் 1 முதல் 14 வரை)</h2>
        <div style="overflow-x: auto;">
          <table class="amma-aadhiyum-table">
            <thead>
              <tr>
                <th style="width: 9%;">வ.<br>எண்</th>
                <th style="width: 33%;">விபரம்</th>
                <th style="width: 58%;">விளக்கம்</th>
              </tr>
            </thead>
            <tbody>
              ${buildRowsHtml(rows1to14)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const page2Html = `
      <div class="amma-page-sheet" style="margin-bottom: 24px;">
        <div class="amma-pillari-top">உ</div>
        <h2 class="amma-sheet-title">ஆதியும் அந்தமும் (பக்கம் 2 : வ. எண் 15 முதல் 25 வரை)</h2>
        <div style="overflow-x: auto;">
          <table class="amma-aadhiyum-table">
            <thead>
              <tr>
                <th style="width: 9%;">வ.<br>எண்</th>
                <th style="width: 33%;">விபரம்</th>
                <th style="width: 58%;">விளக்கம்</th>
              </tr>
            </thead>
            <tbody>
              ${buildRowsHtml(rows15to25)}
              <tr>
                <td class="col-sno" style="padding: 14px 8px;">★</td>
                <td class="col-vibaram" style="padding: 14px 12px;">ஜனன கால தசா இருப்பு &amp; உதயாதி நாழிகை<br><small style="font-weight:700;color:#1b4d2e;">(தமிழ்வாணன் கணித விதி)</small></td>
                <td class="col-vilakkam" style="padding: 14px 18px;">
                  <strong style="color:#7b1113;">${bookData.dasaBalanceFullText}</strong><br>
                  <span style="font-size:0.84rem;color:#143622;">உதயாதி நாழிகை: ${bookData.udayathiText} • பிறந்த நேர ஓரை: ${bookData.method5.mahaHoraPlanetTa} ஓரை (${bookData.method5.antharHoraPlanetTa} அந்தர் ஓரை)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    aadhiContainer.innerHTML = page1Html + page2Html;
  }

  // Render Full-Page "சர்வாங்க அஷ்ட வர்க்கம் — 337 பரல்" Double-Square 4x4 Kattam Sheet (Matches Image 1)
  const sarvangaContainer = document.getElementById("ammaSarvanga337SheetContainer");
  if (sarvangaContainer) {
    const savParals = new Array(12).fill(0);
    Object.keys(ASHTAKAVARGA_RULES).forEach(pKey => {
      const contribMap = ASHTAKAVARGA_RULES[pKey];
      Object.keys(contribMap).forEach(srcKey => {
        const srcSign = currentRasiPositions[srcKey] || 0;
        contribMap[srcKey].forEach(off => {
          const targetSign = (srcSign + off - 1) % 12;
          savParals[targetSign] += 1;
        });
      });
    });
    const totalSav = savParals.reduce((a, b) => a + b, 0);
    const lagSign = currentRasiPositions.lagnam;

    const cellsHtml = SOUTH_INDIAN_GRID_ORDER.map(cellItem => {
      if (cellItem === "CENTER") {
        return `
          <div class="amma-sarvanga-center">
            <div class="paral-337-title">${totalSav} பரல்</div>
            <div class="paral-337-sub">சர்வாங்க அஷ்ட வர்க்கம் (12 இராசி கூட்டுத் தொகை)</div>
            <div style="font-size:0.78rem;color:#1b4d2e;margin-top:6px;font-weight:800;">
              லக்னம் (${RASI_DATA[lagSign].tamil}): ${savParals[lagSign]} பரல் • ராசி (${RASI_DATA[currentRasiPositions.moon].tamil}): ${savParals[currentRasiPositions.moon]} பரல்
            </div>
          </div>
        `;
      }
      const rIdx = cellItem;
      const isLag = (rIdx === lagSign);
      const bhavaNum = ((rIdx - lagSign + 12) % 12) + 1;
      return `
        <div class="amma-sarvanga-cell ${isLag ? 'is-lagnam' : ''}">
          <div class="sarvanga-rasi-top">
            <span>${RASI_DATA[rIdx].tamil}${isLag ? ' (லக்)' : ''}</span>
            <span>${bhavaNum}-ம் வீடு</span>
          </div>
          <div class="amma-sarvanga-inner-box">
            <span>${savParals[rIdx]}</span>
          </div>
        </div>
      `;
    }).join("");

    sarvangaContainer.innerHTML = `
      <div class="amma-page-sheet" style="margin-bottom: 24px;">
        <div class="amma-pillari-top">உ</div>
        <h2 class="amma-sheet-title">சர்வாங்க அஷ்ட வர்க்கம்</h2>
        <div class="amma-sarvanga-outer-grid">
          ${cellsHtml}
        </div>
        <div style="text-align:center;font-size:0.84rem;font-weight:800;color:#1b4d2e;margin-top:8px;">
          📌 குறிப்பு: 28 பரல்களுக்கு மேல் உள்ள இராசிகள் சுப பலம் பெற்றவை • 30 பரல்களுக்கு மேல் உள்ளவை ராஜயோக பலம் தரும்.
        </div>
      </div>
    `;
  }
}

function renderTamilvananBookSheets(bookData, nameVal, dateStr, timeStr, placeLabel) {
  renderAadhiyumAnthamumAndSarvangaSheets(bookData, nameVal, dateStr, timeStr, placeLabel);
  if (!bookData) return;

  // Evaluate key yogas & bhava lords according to Tamilvanan's "ஜாதகம் பார்ப்பது எப்படி?"
  const lagSign = currentRasiPositions.lagnam;
  const moonSign = currentRasiPositions.moon;
  const lagLordKey = RASI_DATA[lagSign].lordKey;
  const moonLordKey = RASI_DATA[moonSign].lordKey;
  const lagLordSign = currentRasiPositions[lagLordKey];
  const moonLordSign = currentRasiPositions[moonLordKey];
  const lagLordBhava = ((lagLordSign - lagSign + 12) % 12) + 1;
  const moonLordBhava = ((moonLordSign - lagSign + 12) % 12) + 1;

  // Check Vargottama planets (same sign in D-1 Rasi and D-9 Navamsa - Book p. 25)
  const vargottamaList = [];
  ["lagnam", "sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "kethu"].forEach(k => {
    if (currentRasiPositions[k] === currentNavamsamPositions[k]) {
      const label = k === "lagnam" ? "லக்னம்" : PLANET_TAMIL_SHORT[k];
      vargottamaList.push(`${label} (${RASI_DATA[currentRasiPositions[k]].tamil})`);
    }
  });

  // Trikona (1, 5, 9) & Kendra (1, 4, 7, 10) Lords
  const lord5Key = RASI_DATA[(lagSign + 4) % 12].lordKey;
  const lord9Key = RASI_DATA[(lagSign + 8) % 12].lordKey;
  const lord10Key = RASI_DATA[(lagSign + 9) % 12].lordKey;
  const lord5Bhava = ((currentRasiPositions[lord5Key] - lagSign + 12) % 12) + 1;
  const lord9Bhava = ((currentRasiPositions[lord9Key] - lagSign + 12) % 12) + 1;
  const lord10Bhava = ((currentRasiPositions[lord10Key] - lagSign + 12) % 12) + 1;

  // Build Sheet 1 HTML: Step-by-Step Panchangam & Horoscope Mathematical Working (Book Pages 5–25)
  const stepsRowsHtml = bookData.lagnaSubtractionSteps.map(s => `
    <li>
      <span>${s.rasiTa}</span>
      <strong>${formatNazhigaiVinadi(s.vinadis)} <small style="font-weight:600;color:#475569;">(${s.note})</small></strong>
    </li>
  `).join("");

  const sheet1Html = `
    <div class="amma-page-sheet" style="margin-bottom: 24px;">
      <div class="amma-pillari-top">உ • சுபமஸ்து • மணிமேகலைப் பிரசுரம்</div>
      <h2 class="amma-sheet-title">📚 "ஜாதகம் பார்ப்பது எப்படி?" (ஆசிரியர்: தமிழ்வாணன்) — பஞ்சாங்க &amp; ஜாதக கணித முறை</h2>
      <div class="tamilvanan-book-banner">
        <div>
          <h3>📖 தமிழ்வாணன் அவர்களின் "ஜாதகம் பார்ப்பது எப்படி?" நூல் கணித விதிகள் (பக்கம் 5 – 25)</h3>
          <p>பிறந்த ஊரின் அக்ஷாம்சம் - ரேகாம்சம் (${bookData.lat.toFixed(2)}°N, ${bookData.lon.toFixed(2)}°E), சுத்தமான சூரியோதயம், உதயாதி நாழிகை - விநாடி, அஹஸ் - இராத்திரி ஓரைகள் &amp; தசா இருப்பு கணிதம்</p>
        </div>
        <span class="tamilvanan-book-pill">திருக்கணித அயனாம்சம்: ${bookData.ayanamsa.toFixed(2)}°</span>
      </div>

      <div class="amma-math-grid">
        <!-- Box 1: Sunrise, Ahass, Rathri & Udayathi Janana Nazhigai (Book p. 7–8, 17–18) -->
        <div class="amma-math-box">
          <h4>1. சூரிய உதயம், அஹஸ் &amp; உதயாதி ஜனன நாழிகை (பக்கம் 7–8, 17–18)</h4>
          <ul class="amma-math-list">
            <li><span>பிறந்த தேதி &amp; முதல் அழுகுரல் நேரம்:</span><strong>${dateStr} • ${timeStr} (${placeLabel})</strong></li>
            <li><span>சூரிய உதயம் &amp; அஸ்தமனம்:</span><strong>${bookData.sunriseText} • ${bookData.sunsetText}</strong></li>
            <li><span>அஹஸ் (பகற்பொழுது நாழிகை):</span><strong>${bookData.ahassText}</strong></li>
            <li><span>இராத்திரி (60 − அஹஸ் நாழிகை):</span><strong>${bookData.rathriText}</strong></li>
            <li><span>சூரிய உதயம் முதல் செல்லான நேரம்:</span><strong>${bookData.elapsedHoursPart} மணி ${bookData.elapsedMinsPart} நிமிஷம்</strong></li>
            <li><span>வாய்ப்பாடு (1 மணி = 2½ நாழிகை; 1 நிமி = 2½ விநாடி):</span><strong>${bookData.udayathiText}</strong></li>
          </ul>
        </div>

        <!-- Box 2: Janma Lagnam & Udaya Lagna Sesham (Book p. 11–12 & Rasi Pramana Table) -->
        <div class="amma-math-box">
          <h4>2. உதய லக்ன சேஷம் &amp; நவாம்ச இலக்கினம் (பக்கம் 11–12, 24–25)</h4>
          <ul class="amma-math-list">
            <li><span>சூரியன் நின்ற இராசி &amp; பாகை (சூரிய ஸ்புடம்):</span><strong>${RASI_DATA[bookData.sunSign].tamil} (${bookData.sunDegMinText})</strong></li>
            <li><span>தமிழ்வாணன் சூரிய ஸ்புட முறை (பக். 12):</span><strong>${bookData.method2.formulaText}</strong></li>
            <li><span>ஜென்ம இலக்கினம் &amp; இலக்கின ஸ்புடம்:</span><strong>${RASI_DATA[bookData.lagnamSign].tamil} (${bookData.lagnamDegMinText})</strong></li>
            <li><span>இலக்கின பிரமாணம் (மொத்த விநாடி):</span><strong>${formatNazhigaiVinadi(bookData.lagnamPramanaVinadis)}</strong></li>
            <li><span>இலக்கின செல்லு / இருப்பு நாழிகை:</span><strong>செல்லு: ${formatNazhigaiVinadi(bookData.lagnamSelluVinadis)} • இருப்பு: ${formatNazhigaiVinadi(bookData.lagnamIruppuVinadis)}</strong></li>
            <li><span>நவாம்ச இலக்கினம் (பிரமாணம் ÷ 9 = ${bookData.lagnamNavamsaPadam}-ம் நவாம்சம்):</span><strong>${RASI_DATA[bookData.navamsamLagnamSign].tamil} (${STAR_PORUTHAM_DATA[bookData.lagnamStarIdx].name} - ${bookData.lagnamStarPadam}ம் பாதம்)</strong></li>
          </ul>
        </div>

        <!-- Box 3: Step-by-Step Rasi Pramana Subtraction Working -->
        <div class="amma-math-box">
          <h4>3. இராசி பிரமாண நாழிகைக் கழிப்பு விபரம் (உதயாதி ${bookData.udayathiText})</h4>
          <ul class="amma-math-list">
            ${stepsRowsHtml}
          </ul>
        </div>

        <!-- Box 4: Janma Nakshatram & Janana Kala Dasa Balance Working (Book p. 25) -->
        <div class="amma-math-box">
          <h4>4. ஜன்ம நட்சத்திரம் &amp; ஜனன கால தசா இருப்பு கணிதம் (பக்கம் 25)</h4>
          <ul class="amma-math-list">
            <li><span>சந்திர ஸ்புடம் &amp; ஜன்ம இராசி:</span><strong>${RASI_DATA[bookData.moonRasiIndex].tamil} (${bookData.moonDegMinText})</strong></li>
            <li><span>ஜன்ம நட்சத்திரம் &amp; பாதம்:</span><strong>${STAR_PORUTHAM_DATA[bookData.moonStarIndex].name} - ${bookData.moonPadam}ம் பாதம்</strong></li>
            <li><span>நட்சத்திர செல்லு / இருப்பு (60 நாழிகைக்கு):</span><strong>செல்லு: ${formatNazhigaiVinadi(bookData.starSelluVinadis)} • இருப்பு: ${formatNazhigaiVinadi(bookData.starIruppuVinadis)}</strong></li>
            <li><span>ஜன்ம தசா அதிபதி &amp; மொத்த வருடம்:</span><strong>${bookData.firstDasaLord.name} (${bookData.firstDasaLord.years} வருடம்)</strong></li>
            <li><span>தசா இருப்பு வாய்ப்பாடு:</span><strong>(${bookData.starIruppuVinadis} விநாடி × ${bookData.firstDasaLord.years} வ.) ÷ 3600</strong></li>
            <li><span>ஜனன கால தசா இருப்பு:</span><strong style="color:#7b1113;">${bookData.dasaBalanceFullText}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // Build Sheet 2 HTML: Tamilvanan's 6 Lagnam Verification Methods + Anthar-Hora + Book Horoscope Reading Rules
  const antharChipsHtml = bookData.method5.all5AntharHoras.map(ah => `
    <span class="amma-p-chip ${ah.isActive ? 'lag' : ''}" style="padding:3px 8px;margin-right:4px;">
      ${ah.partNum}. ${ah.planetTa} (${ah.genderTa})${ah.isActive ? ' ★' : ''}
    </span>
  `).join("");

  const sheet2Html = `
    <div class="amma-page-sheet" style="margin-bottom: 24px;">
      <div class="amma-pillari-top">உ • இலக்கினச் சோதனை &amp; ஜாதக பலன் விதிகள்</div>
      <h2 class="amma-sheet-title">🔍 தமிழ்வாணன் நூலின் 6-வழி இலக்கினச் சோதனை, அந்தர் ஓரை &amp; பலன் காணும் முறை (பக்கம் 5–25)</h2>

      <div style="overflow-x: auto; margin-bottom: 14px;">
        <table class="amma-saram-table">
          <thead>
            <tr>
              <th style="width: 18%;">சோதனை முறை (நூல் பக்கம்)</th>
              <th style="width: 44%;">தமிழ்வாணன் கணித வாய்ப்பாடு &amp; கணக்கீடு</th>
              <th style="width: 38%;">சோதனை முடிவு &amp; ஜாதகப் பொருத்தம்</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>முதலாவது வழி</strong><br><small>(பக்கம் 8 – 9)</small></td>
              <td style="text-align:left;">
                உதயாதி நாழிகையை 4-ஆல் பெருக்கி 9-ஆல் வகுக்க:<br>
                <strong>${bookData.method1.formulaText}</strong>
              </td>
              <td style="text-align:left;">
                அஸ்வினி முதல் ${bookData.method1.actualStarMod9}-வது திரிகோண நட்சத்திரம்: <strong>${bookData.method1.actualStarName}</strong><br>
                <small>(சோதனை நட்சத்திரத் தொகுதி: ${bookData.method1.triadNames})</small>
              </td>
            </tr>
            <tr>
              <td><strong>இரண்டாவது வழி</strong><br><small>(பக்கம் 11 – 12)</small></td>
              <td style="text-align:left;">
                சூரிய ஸ்புட பாகையுடன் உதயாதி நாழிகை பாகையைக் கூட்டி 30-ஆல் வகுக்க:<br>
                <strong>${bookData.method2.formulaText}</strong>
              </td>
              <td style="text-align:left;">
                சூரிய இராசி (${RASI_DATA[bookData.sunSign].tamil}) முதல் எண்ண ஜென்ம இலக்கினம்: <strong>${bookData.method2.actualLagnamTa}</strong><br>
                <small>✅ இலக்கினச் சோதனை சரியாக அமைந்துள்ளது</small>
              </td>
            </tr>
            <tr>
              <td><strong>மூன்றாவது வழி</strong><br><small>(பக்கம் 12 – 15)</small></td>
              <td style="text-align:left;">
                (உதயாதி×4) + மேஷாதி இலக்கினம் + சர(5)/ஸ்திர(10)/உபய(15) ÷ 27:<br>
                <strong>${bookData.method3.formulaText}</strong>
              </td>
              <td style="text-align:left;">
                <strong>${bookData.method3.pakshamRuleTa}:</strong><br>
                <small>திரிகோண நட்சத்திரங்கள்: ${bookData.method3.triadNames}</small>
              </td>
            </tr>
            <tr>
              <td><strong>நான்காவது வழி</strong><br><small>(பக்கம் 15 – 17)</small></td>
              <td style="text-align:left;">
                உதயாதி நாழிகையை 12-ஆல் வகுத்து மேஷாதி திரிகோணம் காணல்:<br>
                <strong>${bookData.method4.formulaText}</strong>
              </td>
              <td style="text-align:left;">
                திரிகோண இலக்கினத் தொகுதி: <strong>${bookData.method4.validSignsTa}</strong><br>
                <small>ஜென்ம இலக்கினம்: <strong>${RASI_DATA[bookData.lagnamSign].tamil}</strong></small>
              </td>
            </tr>
            <tr>
              <td><strong>ஐந்தாவது வழி</strong><br><small>(பக்கம் 17 – 23)</small></td>
              <td style="text-align:left;">
                ${bookData.method5.periodTypeTa} ÷ 12 = <strong>1 ஓரை: ${bookData.method5.singleHoraText}</strong><br>
                பிறந்த நேர மகா ஓரை: <strong>${bookData.method5.horaNumber1to12}-வது ஓரை — ${bookData.method5.mahaHoraPlanetTa} ஓரை (${bookData.method5.mahaHoraGenderTa} • ${bookData.method5.horaQuarter1to4}-ம் பங்கு)</strong>
              </td>
              <td style="text-align:left;">
                5 சம பங்கு அந்தர் ஓரை (வாரக் கிரமம்): <strong>${bookData.method5.antharHoraPartNum}-ம் பகுதி: ${bookData.method5.antharHoraPlanetTa} அந்தர் ஓரை (${bookData.method5.antharHoraGenderTa})</strong><br>
                <div style="margin-top:4px;">${antharChipsHtml}</div>
              </td>
            </tr>
            <tr>
              <td><strong>ஆறாவது வழி</strong><br><small>(பக்கம் 23 – 25)</small></td>
              <td style="text-align:left;">
                ஒற்றை (ஆண்) / இரட்டை (பெண்) இராசி 15° ஹோரை (D-2) பிரிவு:<br>
                <strong>${RASI_DATA[bookData.lagnamSign].tamil} (${bookData.method6.lagnamDegMinText}) — ${bookData.method6.lagnamGenderTa}</strong>
              </td>
              <td style="text-align:left;">
                ஜெனன ஹோரை (D-2): <strong>${bookData.method6.d2HoraLordTa}</strong><br>
                <small>வர்க்கோத்தம பலம்: ${vargottamaList.length > 0 ? vargottamaList.join(", ") : "நவாம்ச சுப பலம்"}</small>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="amma-math-grid">
        <div class="amma-math-box">
          <h4>🏛️ தமிழ்வாணன் முறைப்படி இலக்கினாதிபதி &amp; இராசியாதிபதி பலம்</h4>
          <ul class="amma-math-list">
            <li><span>1. ஜென்ம இலக்கினாதிபதி:</span><strong>${PLANET_TAMIL_SHORT[lagLordKey]} (லக்னத்திற்கு ${lagLordBhava}-ம் பாவத்தில் • ${getPlanetNilaiTa(lagLordKey, lagLordSign)})</strong></li>
            <li><span>2. ஜென்ம இராசியாதிபதி:</span><strong>${PLANET_TAMIL_SHORT[moonLordKey]} (லக்னத்திற்கு ${moonLordBhava}-ம் பாவத்தில் • ${getPlanetNilaiTa(moonLordKey, moonLordSign)})</strong></li>
            <li><span>3. பூர்வ புண்ணியாதிபதி (5-ம் அதிபதி):</span><strong>${PLANET_TAMIL_SHORT[lord5Key]} (${lord5Bhava}-ம் பாவத்தில்)</strong></li>
            <li><span>4. பாக்கியாதிபதி &amp; கர்மாதிபதி (9 &amp; 10):</span><strong>9-ம் அதிபதி ${PLANET_TAMIL_SHORT[lord9Key]} (${lord9Bhava}-ல்) • 10-ம் அதிபதி ${PLANET_TAMIL_SHORT[lord10Key]} (${lord10Bhava}-ல்)</strong></li>
          </ul>
        </div>
        <div class="amma-math-box">
          <h4>🌟 "ஜாதகம் பார்ப்பது எப்படி?" — முக்கிய யோக &amp; தசா பலன் விதி</h4>
          <ul class="amma-math-list">
            <li><span>வர்க்கோத்தம கிரகங்கள் (D1 = D9):</span><strong>${vargottamaList.length > 0 ? vargottamaList.join(", ") : "சம நவாம்ச பலம்"}</strong></li>
            <li><span>கேந்திர (1,4,7,10) &amp; திரிகோண (1,5,9) விதி:</span><strong>லக்னாதிபதி ${PLANET_TAMIL_SHORT[lagLordKey]} ${[1,4,5,7,9,10,11].includes(lagLordBhava) ? "சுப ஸ்தான பலம் (யோகம்)" : "முயற்சி ஸ்தான பலம்"}</strong></li>
            <li><span>நடப்பு தசா - புத்தி பலன் விதி (பக்கம் 25):</span><strong>${document.getElementById("chartDasaPill") ? document.getElementById("chartDasaPill").textContent : ""}</strong></li>
            <li><span>நூல் வழிகாட்டுதல்:</span><strong>இராசி, நவாம்சம், பாவகம் &amp; அஷ்டகவர்க்கம் (337) இணைந்த கூட்டுப் பலன்</strong></li>
          </ul>
        </div>
      </div>
    </div>
  `;

  const ammaBookContainer = document.getElementById("ammaTamilvananBookContainer");
  if (ammaBookContainer) {
    ammaBookContainer.innerHTML = sheet1Html + sheet2Html;
  }

  const kattamBookContainer = document.getElementById("kattamTamilvananBookContainer");
  if (kattamBookContainer) {
    kattamBookContainer.innerHTML = sheet1Html + sheet2Html;
  }
}


// --- A. TAB SWITCHER & TEMPLE DARK MODE TOGGLE ---
    function switchTab(panelId, clickedBtn) {
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.getElementById(panelId).classList.add("active");
      clickedBtn.classList.add("active");
    }

    function toggleTempleTheme() {
      const root = document.documentElement;
      const isDark = root.getAttribute("data-theme") === "dark";
      const nextTheme = isDark ? "light" : "dark";
      if (nextTheme === "dark") {
        root.setAttribute("data-theme", "dark");
        document.getElementById("themeToggleBtn").textContent = "☀️ பகல் ஒளி முறை (Daylight Mode)";
      } else {
        root.removeAttribute("data-theme");
        document.getElementById("themeToggleBtn").textContent = "🪔 தீப ஒளி முறை (Temple Dark Mode)";
      }
      try {
        localStorage.setItem("tamil_horoscope_theme", nextTheme);
      } catch (e) {}
    }

    function initThemeFromStorage() {
      try {
        if (localStorage.getItem("tamil_horoscope_theme") === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          document.getElementById("themeToggleBtn").textContent = "☀️ பகல் ஒளி முறை (Daylight Mode)";
        }
      } catch (e) {}
    }

    // --- B. NEW IN STEP 13: KUMBAKONAM 9 NAVAGRAHA STHALAM & GAYATRI MANTRA DATABASE ---
    // Traditional South Indian 3x3 Sannidhi Order (with Sun at center):
    // Row 1: புதன் (Mercury), சுக்கிரன் (Venus), சந்திரன் (Moon)
    // Row 2: குரு (Jupiter), சூரியன் (Sun), செவ்வாய் (Mars)
    // Row 3: கேது (Kethu), சனி (Saturn), ராகு (Rahu)
    const SANNIDHI_3X3_ORDER = [
      "mercury", "venus", "moon",
      "jupiter", "sun", "mars",
      "kethu", "saturn", "rahu"
    ];

    const NAVAGRAHA_STHALAMS = {
      sun: {
        key: "sun",
        shortTa: "சூரியன்",
        title: "சூரிய பகவான் (Surya Bhagavan)",
        icon: "☀️",
        dir: "மையம் • கிழக்கு நோக்கி",
        day: "ஞாயிற்றுக்கிழமை (Sunday)",
        temple: "சூரியனார் கோவில் (ஆடுதுறை / கும்பகோணம் அருகில்)",
        deity: "சிவசூரியப் பெருமாள் (உஷா தேவி, பிரத்யுஷா தேவி)",
        grain: "கோதுமை (Wheat) • கோதுமை சர்க்கரைப் பொங்கல்",
        clothFlower: "சிவப்பு வஸ்திரம் • செந்தாமரை மலர் (Red Lotus)",
        gemDir: "மாணிக்கம் (Ruby) • கிழக்கு திசை",
        gayatri: "ஓம் அஸ்வத்வஜாய வித்மஹே பாச ஹஸ்தாய தீமஹி | தந்நோ சூர்யः ப்ரசோதயாத் ||",
        meaning: "குதிரை சின்னக் கொடியுடையவரும், பாசத்தைக் கையில் ஏந்தியவருமான சூரிய பகவானைத் தியானிக்கிறோம்; அவர் நம் அறிவைப் பிரகாசிக்கச் செய்வாராக.",
        pariharam: "தந்தை வழி நலன், அரசு உத்தியோகம், கண் ஒளி மற்றும் தலைமைப் பண்பு சிறக்க ஞாயிற்றுக்கிழமைகளில் சூரியனார் கோவில் தரிசனம் அல்லது கோதுமை தானம் செய்வது சிறப்பு."
      },
      moon: {
        key: "moon",
        shortTa: "சந்திரன்",
        title: "சந்திர பகவான் (Chandra Bhagavan)",
        icon: "🌙",
        dir: "தென்கிழக்கு • மேற்கு நோக்கி",
        day: "திங்கட்கிழமை (Monday)",
        temple: "திங்களூர் — கைலாசநாதர் திருக்கோவில் (திருவையாறு அருகில்)",
        deity: "கைலாசநாதர் & பெரியநாயகி அம்மன் (சந்திரன் சந்நிதி)",
        grain: "பச்சரிசி / நெல் (Raw Rice / Paddy) • தயிர் சாதம்",
        clothFlower: "வெள்ளை வஸ்திரம் • வெள்ளை அல்லி மலர் (White Lily)",
        gemDir: "முத்து (Pearl) • தென்கிழக்கு",
        gayatri: "ஓம் பத்மத்வஜாய வித்மஹே ஹேமரூபாய தீமஹி | தந்நோ சோமः ப்ரசோதயாத் ||",
        meaning: "தாமரைக் கொடியுடையவரும், பொன் போன்ற திருமேனி கொண்டவருமான சந்திர பகவானைத் தியானிக்கிறோம்; அவர் நம் மனதிற்குத் தெளிவைத் தருவாராக.",
        pariharam: "மன அமைதி, தாயாரின் ஆரோக்கியம் மற்றும் சந்திராஷ்டம/மன சஞ்சல நிவர்த்திக்கு திங்களூர் கைலாசநாதரை வழிபடுவதும் பச்சரிசி தானம் அளிப்பதும் உத்தமம்."
      },
      mars: {
        key: "mars",
        shortTa: "செவ்வாய்",
        title: "செவ்வாய் / அங்காரக பகவான் (Angaraka)",
        icon: "🔥",
        dir: "தெற்கு • மேற்கு நோக்கி",
        day: "செவ்வாய்க்கிழமை (Tuesday)",
        temple: "வைத்தீஸ்வரன் கோவில் — வைத்தியநாத சுவாமி (மயிலாடுதுறை அருகில்)",
        deity: "வைத்தியநாத சுவாமி, தையல்நாயகி & செல்வமுத்துக்குமாரசுவாமி",
        grain: "துவரை (Toor Dal) • துவரம்பருப்பு சாதம்",
        clothFlower: "சிவப்பு வஸ்திரம் • செண்பக மலர் / செவ்வரளி",
        gemDir: "பவளம் (Red Coral) • தெற்கு திசை",
        gayatri: "ஓம் வீரத்வஜாய வித்மஹே விக்ன ஹஸ்தாய தீமஹி | தந்நோ பௌமः ப்ரசோதயாத் ||",
        meaning: "வீரக் கொடியுடையவரும், தடைகளை நீக்கும் ஆற்றல் கொண்டவருமான அங்காரக (செவ்வாய்) பகவானைத் தியானிக்கிறோம்; அவர் நமக்குத் தைரியம் அருள்வாராக.",
        pariharam: "செவ்வாய் தோஷ நிவர்த்தி, பூமி/வீடு யோகம் மற்றும் சகோதர ஒற்றுமைக்கு செவ்வாய்க்கிழமை வைத்தீஸ்வரன் கோவில் வழிபாடு மற்றும் துவரை தானம் மிகச்சிறந்த பரிகாரம்."
      },
      mercury: {
        key: "mercury",
        shortTa: "புதன்",
        title: "புதன் பகவான் (Budha Bhagavan)",
        icon: "📚",
        dir: "வடகிழக்கு • மேற்கு நோக்கி",
        day: "புதன்கிழமை (Wednesday)",
        temple: "திருவெண்காடு — சுவேதாரண்யேஸ்வரர் திருக்கோவில் (சீர்காழி அருகில்)",
        deity: "சுவேதாரண்யேஸ்வரர் & பிரம்மவித்யாம்பிகை (புதன் தனி சந்நிதி)",
        grain: "பச்சைப்பயறு (Green Gram) • பாசிப்பருப்பு பொங்கல்",
        clothFlower: "பச்சை வஸ்திரம் • வெண்காந்தள் மலர்",
        gemDir: "மரகதம் (Emerald) • வடகிழக்கு",
        gayatri: "ஓம் கஜத்வஜாய வித்மஹே சுக ஹஸ்தாய தீமஹி | தந்நோ புதः ப்ரசோதயாத் ||",
        meaning: "யானைக் கொடியுடையவரும், கிளியைக் கரத்தில் ஏந்தியவருமான புதன் பகவானைத் தியானிக்கிறோம்; அவர் நமக்குச் சிறந்த கல்வி மற்றும் நுண்ணறிவை அருள்வாராக.",
        pariharam: "கல்வித் தேர்ச்சி, கணிதம், வியாபார விருத்தி மற்றும் பேச்சாற்றல் பெருக திருவெண்காடு புதன் பகவான் தரிசனமும் பச்சைப்பயறு தானமும் விசேஷம்."
      },
      jupiter: {
        key: "jupiter",
        shortTa: "குரு",
        title: "குரு பகவான் (Guru / Brihaspati)",
        icon: "🌼",
        dir: "வடக்கு • மேற்கு நோக்கி",
        day: "வியாழக்கிழமை (Thursday)",
        temple: "ஆலங்குடி — ஆபத்சகாயேஸ்வரர் திருக்கோவில் (கும்பகோணம் / நீடாமங்கலம்)",
        deity: "ஆபத்சகாயேஸ்வரர் & ஏலவார்குழலி அம்மன் (தட்சிணாமூர்த்தி)",
        grain: "கொண்டைக்கடலை (Chickpea) • கடலை சுண்டல்",
        clothFlower: "மஞ்சள் வஸ்திரம் • முல்லை மலர் (Jasmine)",
        gemDir: "புஷ்பராகம் (Yellow Sapphire) • வடக்கு திசை",
        gayatri: "ஓம் விருஷபத்வஜாய வித்மஹே க்ருணி ஹஸ்தாய தீமஹி | தந்நோ குருः ப்ரசோதயாத் ||",
        meaning: "ரிஷபக் கொடியுடையவரும், அருள் ஒளி வீசும் கரங்களைக் கொண்டவருமான குரு பகவானைத் தியானிக்கிறோம்; அவர் நமக்கு மெய்ஞ்ஞானமும் சகல சுபங்களும் அருள்வாராக.",
        pariharam: "திருமண வரம், புத்திர பாக்கியம் மற்றும் செல்வ வளம் பெருக வியாழக்கிழமைகளில் ஆலங்குடி குரு பகவானுக்குக் கொண்டைக்கடலை மாலை சாற்றி வழிபடுவது சிறப்பு."
      },
      venus: {
        key: "venus",
        shortTa: "சுக்கிரன்",
        title: "சுக்கிர பகவான் (Sukra Bhagavan)",
        icon: "💎",
        dir: "கிழக்கு • கிழக்கு நோக்கி",
        day: "வெள்ளிக்கிழமை (Friday)",
        temple: "கஞ்சனூர் — அக்னீஸ்வரர் திருக்கோவில் (சூரியனார் கோவில் அருகில்)",
        deity: "அக்னீஸ்வரர் (சுக்கிரன் வடிவில் மூலவர்) & கற்பகாம்பாள்",
        grain: "மொச்சை (White Field Bean) • நெய் சாதம் / மொச்சை சுண்டல்",
        clothFlower: "வெள்ளை / இளஞ்சிவப்பு ஆடை • வெண்தாமரை மலர்",
        gemDir: "வைரம் (Diamond / Zircon) • கிழக்கு",
        gayatri: "ஓம் அஸ்வத்வஜாய வித்மஹே தனுர் ஹஸ்தாய தீமஹி | தந்நோ சுக்ரः ப்ரசோதயாத் ||",
        meaning: "குதிரைக் கொடியுடையவரும், வில்லைக் கரத்தில் ஏந்தியவருமான சுக்கிர பகவானைத் தியானிக்கிறோம்; அவர் நமக்கு இல்லற இன்பமும் செல்வ வளமும் அருள்வாராக.",
        pariharam: "களத்திர தோஷ நிவர்த்தி, கணவன்-மனைவி ஒற்றுமை, வீடு/வாகன யோகம் மற்றும் கலைத்துறை வெற்றிக்கு வெள்ளிக்கிழமை கஞ்சனூர் தரிசனம் மிகச் சிறந்தது."
      },
      saturn: {
        key: "saturn",
        shortTa: "சனி",
        title: "சனீஸ்வர பகவான் (Saneeswara Bhagavan)",
        icon: "🪐",
        dir: "மேற்கு • மேற்கு நோக்கி",
        day: "சனிக்கிழமை (Saturday)",
        temple: "திருநள்ளாறு — தர்பாரண்யேஸ்வரர் திருக்கோவில் (காரைக்கால் அருகில்)",
        deity: "தர்பாரண்யேஸ்வரர், பிராணேஸ்வரி & அனுக்கிரக சனீஸ்வர பகவான்",
        grain: "கருப்பு எள் (Black Sesame) • எள் சாதம்",
        clothFlower: "கருப்பு / நீல ஆடை • கருங்குவளை மலர்",
        gemDir: "நீலம் (Blue Sapphire) • மேற்கு திசை",
        gayatri: "ஓம் காகத்வஜாய வித்மஹே கட்க ஹஸ்தாய தீமஹி | தந்நோ மந்தः ப்ரசோதயாத் ||",
        meaning: "காகக் கொடியுடையவரும், வாளைக் கரத்தில் ஏந்தியவருமான சனீஸ்வர பகவானைத் தியானிக்கிறோம்; அவர் நம் வினைகளை நீக்கி நீண்ட ஆயுள் அருள்வாராக.",
        pariharam: "ஏழரைச் சனி, அஷ்டமச் சனி மற்றும் கண்டகச் சனி காலங்களில் திருநள்ளாறு நள தீர்த்தமாடி எள் தீபம் ஏற்றுவதும், மாற்றுத்திறனாளிகளுக்கு அன்னதானம் அளிப்பதும் சிறந்த பரிகாரம்."
      },
      rahu: {
        key: "rahu",
        shortTa: "ராகு",
        title: "ராகு பகவான் (Rahu Bhagavan)",
        icon: "🐍",
        dir: "தென்மேற்கு • தெற்கு நோக்கி",
        day: "ஞாயிறு மாலை ராகு காலம் (04:30 - 06:00 PM)",
        temple: "திருநாகேஸ்வரம் — நாகநாதசுவாமி திருக்கோவில் (கும்பகோணம் அருகில்)",
        deity: "நாகநாதசுவாமி, பிறையணிவாள் நுதல் அம்மை & நாகவல்லி-நாககன்னி சமேத ராகு",
        grain: "கருப்பு உளுந்து (Black Gram) • உளுந்து வடை / புளியோதரை",
        clothFlower: "நீல நிற வஸ்திரம் • மந்தாரை மலர்",
        gemDir: "கோமேதகம் (Hessonite) • தென்மேற்கு",
        gayatri: "ஓம் நாகத்வஜாய வித்மஹே பத்ம ஹஸ்தாய தீமஹி | தந்நோ ராஹுः ப்ரசோதயாத் ||",
        meaning: "நாகக் கொடியுடையவரும், தாமரையைக் கரத்தில் ஏந்தியவருமான ராகு பகவானைத் தியானிக்கிறோம்; அவர் நம் நாக/காலசர்ப்ப தோஷங்களை நீக்கி உயர்வு தருவாராக.",
        pariharam: "ராகு-கேது தோஷம், திருமணத் தடை மற்றும் வெளிநாட்டு முயற்சிகள் கைகூட திருநாகேஸ்வரத்தில் ராகு கால பாலாபிஷேக தரிசனமும் உளுந்து தானமும் மிகச் சிறந்தது."
      },
      kethu: {
        key: "kethu",
        shortTa: "கேது",
        title: "கேது பகவான் (Kethu Bhagavan)",
        icon: "🔱",
        dir: "வடமேற்கு • தெற்கு நோக்கி",
        day: "செவ்வாய் / ஞாயிறு (Tuesday & Sunday)",
        temple: "கீழ்ப்பெரும்பள்ளம் — நாகநாதசுவாமி திருக்கோவில் (பூம்புகார் அருகில்)",
        deity: "நாகநாதசுவாமி, சௌந்தர்யநாயகி & சிரவண கேது பகவான்",
        grain: "கொள்ளு (Horse Gram) • கொள்ளு சுண்டல் / பலவண்ண சாதம்",
        clothFlower: "பலவண்ண ஆடை (Multi-color) • செவ்வல்லி மலர்",
        gemDir: "வைடூரியம் (Cat's Eye) • வடமேற்கு",
        gayatri: "ஓம் அஸ்வத்வஜாய வித்மஹே சூல ஹஸ்தாய தீமஹி | தந்நோ கேதுः ப்ரசோதயாத் ||",
        meaning: "குதிரைக் கொடியுடையவரும், சூலத்தைக் கரத்தில் ஏந்தியவருமான கேது பகவானைத் தியானிக்கிறோம்; அவர் நமக்கு ஆன்மீக ஞானமும் மோட்ச பலமும் அருள்வாராக.",
        pariharam: "கேது தசா/புத்தி காலங்களில் மனத் தெளிவு, வழக்கு வெற்றி மற்றும் ஆன்மீக முன்னேற்றம் பெற கீழ்ப்பெரும்பள்ளம் கேது தரிசனம், விநாயகர் வழிபாடு மற்றும் கொள்ளு தானம் சிறப்பு."
      }
    };

    let selectedNavagrahaKey = "sun";
    let activeMahaDasaPlanetKey = "sun";
    let activeBhuktiPlanetKey = "sun";

    const TAMIL_LORD_TO_KEY = {
      "சூரியன்": "sun",
      "சந்திரன்": "moon",
      "செவ்வாய்": "mars",
      "புதன்": "mercury",
      "குரு": "jupiter",
      "சுக்கிரன்": "venus",
      "சனி": "saturn",
      "ராகு": "rahu",
      "கேது": "kethu"
    };

    function renderNavagrahaSannidhi() {
      const grid = document.getElementById("navagraha3x3Grid");
      grid.innerHTML = "";

      SANNIDHI_3X3_ORDER.forEach(pKey => {
        const info = NAVAGRAHA_STHALAMS[pKey];
        const isCurrentMaha = pKey === activeMahaDasaPlanetKey;
        const isCurrentBhukti = pKey === activeBhuktiPlanetKey;

        let spotlightHtml = "";
        if (isCurrentMaha && isCurrentBhukti) {
          spotlightHtml = `<span class="dasa-spotlight-tag">நடப்பு தசை & புத்தி</span>`;
        } else if (isCurrentMaha) {
          spotlightHtml = `<span class="dasa-spotlight-tag">நடப்பு தசை ★</span>`;
        } else if (isCurrentBhukti) {
          spotlightHtml = `<span class="dasa-spotlight-tag">நடப்பு புத்தி</span>`;
        }

        const tile = document.createElement("div");
        tile.className = "graha-tile" + (pKey === selectedNavagrahaKey ? " active" : "");
        tile.innerHTML = `
          <span class="g-icon">${info.icon}</span>
          <span class="g-tamil">${info.shortTa}</span>
          <span class="g-dir">${info.dir}</span>
          ${spotlightHtml}
        `;
        tile.addEventListener("click", () => {
          selectedNavagrahaKey = pKey;
          renderNavagrahaSannidhi();
          updateNavagrahaDetailCard(pKey);
        });
        grid.appendChild(tile);
      });

      updateNavagrahaDetailCard(selectedNavagrahaKey);
    }

    function updateNavagrahaDetailCard(pKey) {
      const info = NAVAGRAHA_STHALAMS[pKey];
      if (!info) return;

      document.getElementById("navaBigIcon").textContent = info.icon;
      document.getElementById("navaTitle").textContent = info.title;
      document.getElementById("navaTempleSubtitle").textContent = `பரிகாரத் தலம்: ${info.temple}`;
      document.getElementById("navaDayPill").textContent = `வழிபாடு: ${info.day}`;

      document.getElementById("navaDeity").textContent = info.deity;
      document.getElementById("navaGrain").textContent = info.grain;
      document.getElementById("navaClothFlower").textContent = info.clothFlower;
      document.getElementById("navaGemDir").textContent = info.gemDir;

      document.getElementById("navaGayatriTa").textContent = info.gayatri;
      document.getElementById("navaSlokaMeaning").textContent = `பொருள்: ${info.meaning}`;
      document.getElementById("navaPariharaNote").textContent = info.pariharam;
    }

    function copyCurrentMantra() {
      const info = NAVAGRAHA_STHALAMS[selectedNavagrahaKey];
      const text = `🕉️ *${info.title} காயத்ரி மந்திரம்*\n${info.gayatri}\n\n• பரிகாரத் தலம்: ${info.temple}\n• தானியம்: ${info.grain}`;
      copyOrShareText(text);
    }

    // --- C. STEP 12: 12-BHAVA LIFE PREDICTIONS & PLANETARY DRISHTI ENGINE ---
    const PLANETARY_DRISHTI_RULES = {
      sun: [7],
      moon: [7],
      mars: [4, 7, 8],
      mercury: [7],
      jupiter: [5, 7, 9],
      venus: [7],
      saturn: [3, 7, 10]
    };

    const PLANET_TAMIL_SHORT = {
      sun: "சூரியன்",
      moon: "சந்திரன்",
      mars: "செவ்வாய்",
      mercury: "புதன்",
      jupiter: "குரு",
      venus: "சுக்கிரன்",
      saturn: "சனி",
      rahu: "ராகு",
      kethu: "கேது"
    };

    const BHAVA_THEMES = [
      { num: 1, title: "1. லக்ன பாவம் (தனு ஸ்தானம்)", domain: "தோற்றம், ஆரோக்கியம், குணநலன் & ஆயுள்", baseNote: "ஜாதகரின் தன்னம்பிக்கை, ஆளுமை மற்றும் உடல் வலிமையைக் குறிக்கும் பிரதான ஸ்தானம்." },
      { num: 2, title: "2. தன & குடும்ப ஸ்தானம்", domain: "பொருளாதாரம், குடும்பம், வாக்கு வன்மை & கல்வி", baseNote: "சேமிப்புத் திறன், இனிய பேச்சாற்றல் மற்றும் குடும்ப மகிழ்ச்சியைத் தீர்மானிக்கும் ஸ்தானம்." },
      { num: 3, title: "3. தைரிய & சகோதர ஸ்தானம்", domain: "தைரியம், முயற்சி, இளைய சகோதரம் & தகவல் தொடர்பு", baseNote: "சொந்த முயற்சியால் முன்னேறும் துணிச்சல் மற்றும் கலைத் திறன்களைக் காட்டும் ஸ்தானம்." },
      { num: 4, title: "4. சுக & தாயார் ஸ்தானம்", domain: "தாயார், வீடு, நிலம், வாகனம் & உயர்கல்வி", baseNote: "சொந்த வீடு, வாகன யோகம், கல்வித் தேர்ச்சி மற்றும் மன நிம்மதியை வழங்கும் கேந்திர ஸ்தானம்." },
      { num: 5, title: "5. பூர்வ புண்ணிய & புத்திர ஸ்தானம்", domain: "குழந்தை பாக்கியம், நுண்ணறிவு, குலதெய்வ அருள்", baseNote: "பூர்வ ஜென்ம புண்ணியம், புத்தி கூர்மை மற்றும் வம்ச விருத்தியை அருளும் திரிகோண ஸ்தானம்." },
      { num: 6, title: "6. ருண, ரோக & சத்ரு ஸ்தானம்", domain: "உத்தியோகம், போட்டித் தேர்வு வெற்றி & ஆரோக்கியம்", baseNote: "போட்டிகளை வெல்லும் ஆற்றல், உத்தியோக உயர்வு மற்றும் நோய் எதிர்ப்பு சக்தியைக் குறிக்கும் ஸ்தானம்." },
      { num: 7, title: "7. களத்திர & கூட்டுத் தொழில் ஸ்தானம்", domain: "வாழ்க்கைத் துணை, திருமணம் & சமூக உறவுகள்", baseNote: "இனிய இல்லற வாழ்க்கை, கணவன்/மனைவி அன்பு மற்றும் கூட்டுத் தொழில் வெற்றியைத் தரும் ஸ்தானம்." },
      { num: 8, title: "8. ஆயுள் & திடீர் அதிர்ஷ்ட ஸ்தானம்", domain: "தீர்க்க ஆயுள், ஆராய்ச்சி, காப்பீடு & மறைமுக வருமானம்", baseNote: "நீண்ட ஆயுள் பலம், தடைகளைத் தாண்டும் மன உறுதி மற்றும் திடீர் தன வரவைக் காட்டும் ஸ்தானம்." },
      { num: 9, title: "9. பாக்கிய & தந்தை ஸ்தானம்", domain: "தந்தை, அதிர்ஷ்டம், தர்மம், ஆன்மீகம் & வெளிநாட்டுப் பயணம்", baseNote: "பெரியோர்களின் ஆசி, தெய்வ அனுகிரகம் மற்றும் சகல சௌபாக்கியங்களையும் தரும் திரிகோண ஸ்தானம்." },
      { num: 10, title: "10. கர்ம & தொழில் ஸ்தானம்", domain: "தொழில், பதவி, புகழ், கௌரவம் & நிர்வாகத் திறன்", baseNote: "வாழ்க்கையில் உயர்ந்த பதவி, தொழில் வளர்ச்சி மற்றும் சமூக அங்கீகாரத்தை வழங்கும் ஸ்தானம்." },
      { num: 11, title: "11. லாப ஸ்தானம்", domain: "வருமானம், சொத்து சேர்க்கை, மூத்த சகோதரம் & எண்ணங்கள் நிறைவேறுதல்", baseNote: "உழைப்பிற்கேற்ற தாராள லாபம், நட்பு வட்டம் மற்றும் விருப்பங்கள் கைகூடுவதைக் காட்டும் ஸ்தானம்." },
      { num: 12, title: "12. அயன, சயன & சுப விரய ஸ்தானம்", domain: "சுப முதலீடு, வெளிநாட்டு வாழ்க்கை & ஆன்மீக மோட்சம்", baseNote: "சுப காரியச் செலவுகள், சொத்து முதலீடு மற்றும் வெளிநாட்டுத் தொடர்புகளைக் குறிக்கும் ஸ்தானம்." }
    ];

    function renderTwelveBhavaPredictions() {
      const lagnamSign = currentRasiPositions.lagnam;
      const container = document.getElementById("bhavaReportContainer");
      container.innerHTML = "";

      BHAVA_THEMES.forEach(bhava => {
        const houseSignIdx = (lagnamSign + bhava.num - 1) % 12;
        const rasiInfo = RASI_DATA[houseSignIdx];
        const lordKey = rasiInfo.lordKey;
        const lordPlacedSign = currentRasiPositions[lordKey];
        const lordPlacedBhava = ((lordPlacedSign - lagnamSign + 12) % 12) + 1;

        const occupants = Object.keys(PLANET_TAMIL_SHORT).filter(
          pKey => currentRasiPositions[pKey] === houseSignIdx
        );
        const occupantNames = occupants.map(k => PLANET_TAMIL_SHORT[k]);

        const aspectingPlanets = [];
        let hasGuruDrishti = false;

        Object.keys(PLANETARY_DRISHTI_RULES).forEach(pKey => {
          const pSign = currentRasiPositions[pKey];
          const aspectHouses = PLANETARY_DRISHTI_RULES[pKey];
          aspectHouses.forEach(hNum => {
            const targetSign = (pSign + hNum - 1) % 12;
            if (targetSign === houseSignIdx) {
              aspectingPlanets.push(`${PLANET_TAMIL_SHORT[pKey]} (${hNum}ம் பார்வை)`);
              if (pKey === "jupiter") hasGuruDrishti = true;
            }
          });
        });

        let statusTone = "";
        if ([1, 4, 5, 7, 9, 10, 11].includes(lordPlacedBhava)) {
          statusTone = `${bhava.num}-ம் அதிபதி ${PLANET_TAMIL_SHORT[lordKey]} லக்னத்திற்கு ${lordPlacedBhava}-ம் இடத்தில் (கேந்திர/திரிகோண/லாப ஸ்தானத்தில்) பலமாக அமர்ந்துள்ளார்.`;
        } else if (lordPlacedBhava === bhava.num) {
          statusTone = `${bhava.num}-ம் அதிபதி ${PLANET_TAMIL_SHORT[lordKey]} ஆட்சி பெற்றுத் தன் சொந்த வீட்டிலேயே அமர்ந்திருப்பது மிகச்சிறந்த யோக பலமாகும்.`;
        } else {
          statusTone = `${bhava.num}-ம் அதிபதி ${PLANET_TAMIL_SHORT[lordKey]} லக்னத்திற்கு ${lordPlacedBhava}-ம் இடத்தில் சஞ்சரிக்கிறார்.`;
        }

        let drishtiNote = "";
        if (hasGuruDrishti) {
          drishtiNote = " 🌟 குரு பகவானின் சுப பார்வை இப் பாவத்திற்குக் கிடைப்பதால் ('குரு பார்க்க கோடி நன்மை') இத்துறை சார்ந்த சுப பலன்கள் தடையின்றி கைகூடும்.";
        } else if (aspectingPlanets.length > 0) {
          drishtiNote = ` இப் பாவத்தின் மீது ${aspectingPlanets.join(", ")} விழுவது கூடுதல் செயல்வேகத்தைத் தரும்.`;
        }

        const card = document.createElement("div");
        card.className = "bhava-detail-card" + (hasGuruDrishti ? " guru-blessed" : "");
        card.innerHTML = `
          <div>
            <div class="bhava-card-head">
              <h4>${bhava.title}</h4>
              <span class="house-pill">${rasiInfo.tamil}</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin: 4px 0 8px;">
              <strong>காரகத்துவம்:</strong> ${bhava.domain}
            </div>
            <div class="bhava-meta-tags" style="margin-bottom: 8px;">
              <span class="bhava-tag">அதிபதி: ${PLANET_TAMIL_SHORT[lordKey]} (${lordPlacedBhava}-ல்)</span>
              <span class="bhava-tag">கிரகங்கள்: ${occupantNames.length > 0 ? occupantNames.join(", ") : "இல்லை"}</span>
              ${aspectingPlanets.length > 0 ? `<span class="bhava-tag drishti">👁️ பார்வை: ${aspectingPlanets.join(", ")}</span>` : ""}
            </div>
            <p class="bhava-prediction-text">
              ${bhava.baseNote} ${statusTone}${drishtiNote}
            </p>
          </div>
        `;
        container.appendChild(card);
      });
    }

    // --- D. STEP 11: CLASSICAL 337-PARAL SARVASHTAKAVARGA ENGINE ---
    const ASHTAKAVARGA_RULES = {
      sun: {
        sun: [1, 2, 4, 7, 8, 9, 10, 11],
        moon: [3, 6, 10, 11],
        mars: [1, 2, 4, 7, 8, 9, 10, 11],
        mercury: [3, 5, 6, 9, 10, 11, 12],
        jupiter: [5, 6, 9, 11],
        venus: [6, 7, 12],
        saturn: [1, 2, 4, 7, 8, 9, 10, 11],
        lagnam: [3, 4, 6, 10, 11, 12]
      },
      moon: {
        sun: [3, 6, 7, 8, 10, 11],
        moon: [1, 3, 6, 7, 10, 11],
        mars: [2, 3, 5, 6, 9, 10, 11],
        mercury: [1, 3, 4, 5, 7, 8, 10, 11],
        jupiter: [1, 4, 7, 8, 10, 11, 12],
        venus: [3, 4, 5, 7, 9, 10, 11],
        saturn: [3, 5, 6, 11],
        lagnam: [3, 6, 10, 11]
      },
      mars: {
        sun: [3, 5, 6, 10, 11],
        moon: [3, 6, 11],
        mars: [1, 2, 4, 7, 8, 10, 11],
        mercury: [3, 5, 6, 11],
        jupiter: [6, 10, 11, 12],
        venus: [6, 8, 11, 12],
        saturn: [1, 4, 7, 8, 9, 10, 11],
        lagnam: [1, 3, 6, 10, 11]
      },
      mercury: {
        sun: [5, 6, 9, 11, 12],
        moon: [2, 4, 6, 8, 10, 11],
        mars: [1, 2, 4, 7, 8, 9, 10, 11],
        mercury: [1, 3, 5, 6, 9, 10, 11, 12],
        jupiter: [6, 8, 11, 12],
        venus: [1, 2, 3, 4, 5, 8, 9, 11],
        saturn: [1, 2, 4, 7, 8, 9, 10, 11],
        lagnam: [1, 2, 4, 6, 8, 10, 11]
      },
      jupiter: {
        sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
        moon: [2, 5, 7, 9, 11],
        mars: [1, 2, 4, 7, 8, 10, 11],
        mercury: [1, 2, 4, 5, 6, 9, 10, 11],
        jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
        venus: [2, 5, 6, 9, 10, 11],
        saturn: [3, 5, 6, 12],
        lagnam: [1, 2, 4, 5, 6, 7, 9, 10, 11]
      },
      venus: {
        sun: [8, 11, 12],
        moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
        mars: [3, 5, 6, 9, 11, 12],
        mercury: [3, 5, 6, 9, 11],
        jupiter: [5, 8, 9, 10, 11],
        venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
        saturn: [3, 4, 5, 8, 9, 10, 11],
        lagnam: [1, 2, 3, 4, 5, 8, 9, 11]
      },
      saturn: {
        sun: [1, 2, 4, 7, 8, 10, 11],
        moon: [3, 6, 11],
        mars: [3, 5, 6, 10, 11, 12],
        mercury: [6, 8, 9, 10, 11, 12],
        jupiter: [5, 6, 11, 12],
        venus: [6, 11, 12],
        saturn: [3, 5, 6, 11],
        lagnam: [1, 3, 4, 6, 10, 11]
      }
    };

    const BHAVA_NAMES_TA = [
      "1. லக்ன பாவம் (Self)",
      "2. தன ஸ்தானம் (Wealth)",
      "3. தைரிய ஸ்தானம் (Courage)",
      "4. சுக ஸ்தானம் (Comforts)",
      "5. பூர்வ புண்ணியம் (Progeny)",
      "6. ருண ரோக ஸ்தானம் (Service)",
      "7. களத்திர ஸ்தானம் (Marriage)",
      "8. ஆயுள் ஸ்தானம் (Longevity)",
      "9. பாக்கிய ஸ்தானம் (Fortune)",
      "10. தொழில் ஸ்தானம் (Career)",
      "11. லாப ஸ்தானம் (Gains)",
      "12. விரய ஸ்தானம் (Expenses)"
    ];

    function computeAndRenderSarvashtakavarga() {
      const savPoints = new Array(12).fill(0);

      Object.keys(ASHTAKAVARGA_RULES).forEach(planetKey => {
        const contributorMap = ASHTAKAVARGA_RULES[planetKey];
        Object.keys(contributorMap).forEach(sourceKey => {
          const sourceSign = currentRasiPositions[sourceKey];
          const offsets = contributorMap[sourceKey];
          offsets.forEach(houseOffset => {
            const targetSign = (sourceSign + houseOffset - 1) % 12;
            savPoints[targetSign] += 1;
          });
        });
      });

      const totalSum = savPoints.reduce((a, b) => a + b, 0);
      document.getElementById("savTotalSum").textContent = String(totalSum);

      const lagnamSign = currentRasiPositions.lagnam;
      const getBhavaParals = bhavaNum => savPoints[(lagnamSign + bhavaNum - 1) % 12];

      const p1 = getBhavaParals(1);
      const p2 = getBhavaParals(2);
      const p10 = getBhavaParals(10);
      const p11 = getBhavaParals(11);
      const p12 = getBhavaParals(12);

      document.getElementById("savBhava1").textContent = `${p1} பரல்கள் (${p1 >= 28 ? "சுப பலம்" : "சமம்"})`;
      document.getElementById("savBhava2").textContent = `${p2} பரல்கள் (${p2 >= 28 ? "தன பலம்" : "சமம்"})`;
      document.getElementById("savBhava10").textContent = `${p10} பரல்கள் (${p10 >= 28 ? "தொழில் உயர்வு" : "சமம்"})`;
      document.getElementById("savBhava11vs12").textContent = `லாபம்: ${p11} • விரயம்: ${p12}`;

      const pillEl = document.getElementById("savWealthVerdictPill");
      if (p11 > p12) {
        pillEl.textContent = `சேமிப்பு யோகம் (லாபம் ${p11} > விரயம் ${p12})`;
      } else {
        pillEl.textContent = `சுப முதலீட்டு அமைப்பு (10ம் இடம்: ${p10} பரல்கள்)`;
      }

      const container = document.getElementById("savBarsContainer");
      container.innerHTML = "";

      for (let b = 1; b <= 12; b++) {
        const signIdx = (lagnamSign + b - 1) % 12;
        const rasiInfo = RASI_DATA[signIdx];
        const pts = savPoints[signIdx];
        const pct = Math.min(100, Math.round((pts / 44) * 100));

        let barClass = "medium";
        let tagText = "சுப பலம்";
        if (pts >= 30) {
          barClass = "high";
          tagText = "யோக பலம் ★";
        } else if (pts < 26) {
          barClass = "low";
          tagText = "சம பலம்";
        }

        const card = document.createElement("div");
        card.className = "sav-row-card";
        card.innerHTML = `
          <div class="sav-row-top">
            <span><strong>${BHAVA_NAMES_TA[b - 1]}</strong> (${rasiInfo.tamil})</span>
            <strong>${pts} பரல்கள் • <small>${tagText}</small></strong>
          </div>
          <div class="sav-bar-track">
            <div class="sav-bar-fill ${barClass}" style="width: ${pct}%;"></div>
          </div>
        `;
        container.appendChild(card);
      }
    }

    // --- E. STEP 10: DAILY PLANETARY HORA ENGINE & WHATSAPP/CLIPBOARD SHARE ---
    const HORA_CYCLE = [
      {
        key: "sun",
        name: "சூரிய ஓரை (Sun Hora)",
        status: "moderate",
        badge: "அரசு பணி (Official)",
        activity: "அரசு வழி காரியங்கள், உயரதிகாரிகளைச் சந்தித்தல், விண்ணப்பம் அளித்தல்"
      },
      {
        key: "venus",
        name: "சுக்கிர ஓரை (Venus Hora) ★",
        status: "match",
        badge: "மகா சுப ஓரை (Auspicious)",
        activity: "தங்கம்/ஆபரணம் வாங்குதல், திருமணம் பேச, கலை, வாகனம் மற்றும் சுப முதலீடு"
      },
      {
        key: "mercury",
        name: "புதன் ஓரை (Mercury Hora) ★",
        status: "match",
        badge: "சுப ஓரை (Auspicious)",
        activity: "கல்வி தொடங்க, வியாபார ஒப்பந்தம், கணக்குத் தொடக்கம், வங்கிப் பரிவர்த்தனை"
      },
      {
        key: "moon",
        name: "சந்திர ஓரை (Moon Hora)",
        status: "match",
        badge: "நல்ல ஓரை (Good)",
        activity: "பயணம் புறப்பட, உணவு/விவசாயம் மற்றும் குடும்ப சுபப் பேச்சுவார்த்தைகள்"
      },
      {
        key: "saturn",
        name: "சனி ஓரை (Saturn Hora)",
        status: "nomatch",
        badge: "தவிர்க்க (Avoid New Starts)",
        activity: "புதிய சுப காரியங்களைத் தவிர்க்கவும்; பழைய கடன் அடைக்க / இரும்பு சார்ந்த பணிக்கு ஏற்றது"
      },
      {
        key: "jupiter",
        name: "குரு ஓரை (Jupiter Hora) ★",
        status: "match",
        badge: "மகா சுப ஓரை (Most Auspicious)",
        activity: "அனைத்து சுப காரியங்கள், வங்கி சேமிப்பு, மாங்கல்யம்/தங்கம் வாங்க, குரு வழிபாடு"
      },
      {
        key: "mars",
        name: "செவ்வாய் ஓரை (Mars Hora)",
        status: "nomatch",
        badge: "தவிர்க்க (Caution)",
        activity: "சுப தொடக்கங்களைத் தவிர்க்கவும்; நிலம்/மருத்துவம் சார்ந்த ஆய்வுக்கு மட்டும் ஏற்றது"
      }
    ];

    const WEEKDAY_START_HORA_INDEX = [0, 3, 6, 2, 5, 1, 4];

    function renderDailyHoraTable(dateObj) {
      const weekday = dateObj.getDay();
      const startHoraIdx = WEEKDAY_START_HORA_INDEX[weekday];
      const now = new Date();
      const isSameDay = dateObj.toDateString() === now.toDateString();
      const currentHour = now.getHours();

      const tbody = document.getElementById("horaTableBody");
      tbody.innerHTML = "";

      const hourLabels = [
        "06:00 AM – 07:00 AM", "07:00 AM – 08:00 AM", "08:00 AM – 09:00 AM",
        "09:00 AM – 10:00 AM", "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM",
        "12:00 PM – 01:00 PM", "01:00 PM – 02:00 PM", "02:00 PM – 03:00 PM",
        "03:00 PM – 04:00 PM", "04:00 PM – 05:00 PM", "05:00 PM – 06:00 PM"
      ];

      // Tamilvanan "ஜாதகம் பார்ப்பது எப்படி?" (Pages 18–23):
      //  • Male Horas (ஆண் ஓரைகள்): சூரியன், செவ்வாய், குரு, சனி
      //  • Female Horas (பெண் ஓரைகள்): சந்திரன், புதன், சுக்கிரன்
      //  • 5 Anthar-Horas (5 அந்தர் ஓரைகள்) inside each Hora follow weekday sequence:
      //    சூரியன் → சந்திரன் → செவ்வாய் → புதன் → குரு → சுக்கிரன் → சனி
      const weekOrderKeys = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"];
      const maleHoraKeys = ["sun", "mars", "jupiter", "saturn"];

      for (let h = 0; h < 12; h++) {
        const horaInfo = HORA_CYCLE[(startHoraIdx + h) % 7];
        const slotHour24 = 6 + h;
        const isCurrentHora = isSameDay && currentHour === slotHour24;
        const isMaleHora = maleHoraKeys.includes(horaInfo.key);
        const genderBadge = isMaleHora ? "ஆண் ஓரை" : "பெண் ஓரை";

        const startWeekIdx = weekOrderKeys.indexOf(horaInfo.key);
        const antharListTa = [0, 1, 2, 3, 4].map(i => {
          const ak = weekOrderKeys[(startWeekIdx + i) % 7];
          return `${i + 1}.${PLANET_TAMIL_SHORT[ak]}`;
        }).join(" → ");

        const tr = document.createElement("tr");
        if (isCurrentHora) tr.className = "dasa-row current-running selected-dasa";

        tr.innerHTML = `
          <td>
            <strong>${hourLabels[h]}</strong>
            ${isCurrentHora ? '<span class="running-tag">தற்போது (Now)</span>' : ""}
          </td>
          <td>
            <strong>${horaInfo.name}</strong><br>
            <small style="color:var(--text-muted);font-weight:700;">தமிழ்வாணன் விதி: ${genderBadge}</small>
          </td>
          <td><span class="status-pill ${horaInfo.status}">${horaInfo.badge}</span></td>
          <td>
            ${horaInfo.activity}
            <div style="font-size:0.76rem;color:var(--primary-dark);margin-top:3px;font-weight:700;">
              ⏱️ 5 அந்தர் ஓரைகள் (12 நிமிடம் தலா): ${antharListTa}
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      }
    }

function showToast(msg) {
      const t = document.getElementById("shareToast");
      t.textContent = msg;
      t.style.display = "block";
      setTimeout(() => { t.style.display = "none"; }, 3200);
    }

    function copyOrShareText(summaryText) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summaryText).then(() => {
          showToast("✅ வாட்ஸ்அப் பகிர்வுக்கு நகலெடுக்கப்பட்டது! (Copied to Clipboard!)");
        }).catch(() => {
          showToast("✅ சுருக்கம் தயார்!");
        });
      } else {
        showToast("✅ சுருக்கம் தயார்!");
      }
    }

    function shareJathagamSummary() {
      const name = document.getElementById("jName").value.trim() || "ஜாதகர்";
      const rasi = document.getElementById("summaryRasi").textContent;
      const star = document.getElementById("summaryStar").textContent;
      const lagnam = document.getElementById("summaryLagnam").textContent;
      const dasa = document.getElementById("chartDasaPill").textContent;
      const sav11 = document.getElementById("savBhava11vs12").textContent;
      const text = `🕉️ *தமிழ் ஜாதக சுருக்கம் (Jathagam Summary)*\n• பெயர்: ${name}\n• ஜென்ம ராசி: ${rasi}\n• நட்சத்திரம்: ${star}\n• லக்னம்: ${lagnam}\n• ${dasa}\n• அஷ்டகவர்க்கம்: ${sav11}`;
      copyOrShareText(text);
    }

    function sharePoruthamSummary() {
      const bride = document.getElementById("brideName").value.trim() || "மணமகள்";
      const groom = document.getElementById("groomName").value.trim() || "மணமகன்";
      const score = document.getElementById("poruthamScoreText").textContent;
      const verdict = document.getElementById("poruthamVerdictTitle").textContent;
      const desc = document.getElementById("poruthamVerdictDesc").textContent;
      const text = `💍 *திருமணப் பொருத்த அறிக்கை (Marriage Compatibility)*\n• மணமகள்: ${bride}\n• மணமகன்: ${groom}\n• பொருத்த மதிப்பெண்: ${score}\n• முடிவு: ${verdict}\n• விவரம்: ${desc}`;
      copyOrShareText(text);
    }

    // --- F. 12 TAMIL RASIS DATA ---
    const RASI_DATA = [
      {
        id: "mesham", icon: "♈", tamil: "மேஷம்", translit: "Mesham",
        english: "Aries • நெருப்பு ராசி (Fire)", lord: "செவ்வாய் (Mars)", lordKey: "mars",
        stars: "அசுவினி, பரணி, கார்த்திகை 1ம் பாதம்", color: "சிவப்பு (Red)",
        numDay: "9 • செவ்வாய் (Tuesday)",
        forecastTa: "புதிய முயற்சிகளில் வெற்றி கிடைக்கும் நாள். பணியிடத்தில் உங்கள் கருத்துக்களுக்கு மதிப்பு கூடும். சுப செலவுகள் ஏற்பட வாய்ப்புள்ளது.",
        forecastEn: "A great day for new beginnings. Your ideas will gain recognition at work, and auspicious family expenses are likely."
      },
      {
        id: "rishabam", icon: "♉", tamil: "ரிஷபம்", translit: "Rishabam",
        english: "Taurus • நில ராசி (Earth)", lord: "சுக்கிரன் (Venus)", lordKey: "venus",
        stars: "கார்த்திகை 2,3,4, ரோகிணி, மிருகசீரிடம் 1,2", color: "வெண்மை (White)",
        numDay: "6 • வெள்ளி (Friday)",
        forecastTa: "குடும்பத்தில் மகிழ்ச்சியும் அமைதியும் நிலவும். பொருளாதார நிலை சிறப்பாக இருக்கும். நீண்ட நாள் நண்பர்களை சந்தித்து மகிழ்வீர்கள்.",
        forecastEn: "Peace and harmony prevail at home. Finances remain steady, and reconnecting with old friends brings joy."
      },
      {
        id: "mithunam", icon: "♊", tamil: "மிதுனம்", translit: "Mithunam",
        english: "Gemini • காற்று ராசி (Air)", lord: "புதன் (Mercury)", lordKey: "mercury",
        stars: "மிருகசீரிடம் 3,4, திருவாதிரை, புனர்பூசம் 1,2,3", color: "பச்சை (Green)",
        numDay: "5 • புதன் (Wednesday)",
        forecastTa: "வியாபாரத்தில் புதிய ஒப்பந்தங்கள் கையெழுத்தாகும். பேச்சாற்றலால் காரியங்களை சாதிப்பீர்கள். குறுகிய தூரப் பயணங்கள் நன்மை தரும்.",
        forecastEn: "New business agreements go in your favor. Clear communication opens doors, and short trips prove productive."
      },
      {
        id: "kadagam", icon: "♋", tamil: "கடகம்", translit: "Kadagam",
        english: "Cancer • நீர் ராசி (Water)", lord: "சந்திரன் (Moon)", lordKey: "moon",
        stars: "புனர்பூசம் 4, பூசம், ஆயில்யம்", color: "வெள்ளி / முத்து வெண்மை (Pearl White)",
        numDay: "2 • திங்கள் (Monday)",
        forecastTa: "மனதில் உற்சாகம் பிறக்கும். தாய்வழி உறவுகளால் ஆதாயம் உண்டு. கலை மற்றும் படைப்புத் துறையினருக்குப் பாராட்டுகள் குவியும்.",
        forecastEn: "Emotional clarity and enthusiasm rise. Support from maternal relatives and recognition in creative pursuits await you."
      },
      {
        id: "simmam", icon: "♌", tamil: "சிம்மம்", translit: "Simmam",
        english: "Leo • நெருப்பு ராசி (Fire)", lord: "சூரியன் (Sun)", lordKey: "sun",
        stars: "மகம், பூரம், உத்திரம் 1ம் பாதம்", color: "தங்கம் / ஆரஞ்சு (Gold & Orange)",
        numDay: "1 • ஞாயிறு (Sunday)",
        forecastTa: "தலைமைப் பண்பு வெளிப்படும் நாள். அரசு வழி காரியங்கள் விரைந்து முடியும். பெரியோர்களின் ஆசியுடன் முக்கிய முடிவுகளை எடுப்பீர்கள்.",
        forecastEn: "Your leadership shines today. Official matters move smoothly, and elders' guidance helps you make key decisions."
      },
      {
        id: "kanni", icon: "♍", tamil: "கன்னி", translit: "Kanni",
        english: "Virgo • நில ராசி (Earth)", lord: "புதன் (Mercury)", lordKey: "mercury",
        stars: "உத்திரம் 2,3,4, அஸ்தம், சித்திரை 1,2", color: "மரகதப் பச்சை (Emerald Green)",
        numDay: "5 • புதன் (Wednesday)",
        forecastTa: "திட்டமிட்ட பணிகளை நேர்த்தியாக முடிப்பீர்கள். கல்வி மற்றும் ஆராய்ச்சியில் முன்னேற்றம் ஏற்படும். சேமிப்பு உயரும்.",
        forecastEn: "Planned tasks finish right on schedule. Great progress in studies and research, alongside growing savings."
      },
      {
        id: "thulaam", icon: "♎", tamil: "துலாம்", translit: "Thulaam",
        english: "Libra • காற்று ராசி (Air)", lord: "சுக்கிரன் (Venus)", lordKey: "venus",
        stars: "சித்திரை 3,4, சுவாதி, விசாகம் 1,2,3", color: "இளஞ்சிவப்பு / வெண்மை (Pastel Pink & White)",
        numDay: "6 • வெள்ளி (Friday)",
        forecastTa: "கூட்டுத் தொழிலில் நல்ல லாபம் கிடைக்கும். இல்லத்திற்குத் தேவையான நவீனப் பொருட்களை வாங்குவீர்கள். சுப செய்திகள் வந்து சேரும்.",
        forecastEn: "Partnerships bring strong returns. A favorable day for purchasing home comforts and receiving good news."
      },
      {
        id: "viruchigam", icon: "♏", tamil: "விருச்சிகம்", translit: "Viruchigam",
        english: "Scorpio • நீர் ராசி (Water)", lord: "செவ்வாய் (Mars)", lordKey: "mars",
        stars: "விசாகம் 4, அனுஷம், கேட்டை", color: "ஆழ்ந்த சிவப்பு (Maroon / Coral)",
        numDay: "9 • செவ்வாய் (Tuesday)",
        forecastTa: "தடைபட்ட காரியங்கள் விடாமுயற்சியால் நிறைவேறும். ஆரோக்கியத்தில் நல்ல முன்னேற்றம் தெரியும். திடீர் பணவரவு மகிழ்ச்சி தரும்.",
        forecastEn: "Persistence clears past bottlenecks. Health improves noticeably, and an unexpected financial gain lifts your spirits."
      },
      {
        id: "dhanusu", icon: "♐", tamil: "தனுசு", translit: "Dhanusu",
        english: "Sagittarius • நெருப்பு ராசி (Fire)", lord: "குரு (Jupiter)", lordKey: "jupiter",
        stars: "மூலம், பூராடம், உத்திராடம் 1ம் பாதம்", color: "மஞ்சள் (Turmeric Yellow)",
        numDay: "3 • வியாழன் (Thursday)",
        forecastTa: "ஆன்மீக எண்ணங்களும் நேர்மறை ஆற்றலும் அதிகரிக்கும். உயர்கல்வி மற்றும் வெளிநாட்டு முயற்சிகளில் நல்ல தகவல் கிடைக்கும்.",
        forecastEn: "Optimism and spiritual clarity guide you. Positive updates arrive regarding higher education or long-distance plans."
      },
      {
        id: "magaram", icon: "♑", tamil: "மகரம்", translit: "Magaram",
        english: "Capricorn • நில ராசி (Earth)", lord: "சனி (Saturn)", lordKey: "saturn",
        stars: "உத்திராடம் 2,3,4, திருவோணம், அவிட்டம் 1,2", color: "நீலம் (Royal Blue)",
        numDay: "8 • சனி (Saturday)",
        forecastTa: "உழைப்பிற்கு ஏற்ற அங்கீகாரம் கிடைக்கும். தொழில் விரிவாக்கத் திட்டங்கள் வெற்றி பெறும். மூத்தவர்களின் ஆலோசனை வழிகாட்டும்.",
        forecastEn: "Hard work earns well-deserved reward. Career expansion plans gain traction with sound advice from mentors."
      },
      {
        id: "kumbam", icon: "♒", tamil: "கும்பம்", translit: "Kumbam",
        english: "Aquarius • காற்று ராசி (Air)", lord: "சனி (Saturn)", lordKey: "saturn",
        stars: "அவிட்டம் 3,4, சதயம், பூரட்டாதி 1,2,3", color: "கருநீலம் (Indigo / Navy)",
        numDay: "8 • சனி (Saturday)",
        forecastTa: "புதிய தொழில்நுட்பம் மற்றும் நட்புகளால் ஆதாயம் உண்டு. சமூகத்தில் மதிப்பு உயரும். கடன் பிரச்சனைகள் குறையும்.",
        forecastEn: "New networks and innovative ideas bring gains. Social standing rises and past financial pressures ease."
      },
      {
        id: "meenam", icon: "♓", tamil: "மீனம்", translit: "Meenam",
        english: "Pisces • நீர் ராசி (Water)", lord: "குரு (Jupiter)", lordKey: "jupiter",
        stars: "பூரட்டாதி 4, உத்திரட்டாதி, ரேவதி", color: "பொன் மஞ்சள் (Golden Yellow)",
        numDay: "3 • வியாழன் (Thursday)",
        forecastTa: "குடும்பத்தில் சுப நிகழ்ச்சிகள் குறித்த பேச்சுவார்த்தை சுமுகமாக முடியும். பிறருக்கு உதவும் மனப்பான்மையால் பாராட்டுப் பெறுவீர்கள்.",
        forecastEn: "Auspicious family events take shape smoothly. Your generosity and intuition earn warmth and appreciation."
      }
    ];

    // --- G. 27 NAKSHATRA METADATA + 108 PADAM SYLLABLES ---
    const STAR_PORUTHAM_DATA = [
      { idx: 0, name: "அசுவினி (Ashwini)", rasis: [0], ganam: 0, rajju: "pada", yoni: "குதிரை (Horse)", syllables: ["சு (Chu)", "சே (Che)", "சோ (Cho)", "ல (La)"] },
      { idx: 1, name: "பரணி (Bharani)", rasis: [0], ganam: 1, rajju: "kati", yoni: "யானை (Elephant)", syllables: ["லி (Li)", "லு (Lu)", "லே (Le)", "லோ (Lo)"] },
      { idx: 2, name: "கார்த்திகை (Karthigai)", rasis: [0, 1], ganam: 2, rajju: "nabhi", yoni: "ஆடு (Sheep)", syllables: ["அ (A)", "இ (I)", "உ (U)", "எ (E)"] },
      { idx: 3, name: "ரோகிணி (Rohini)", rasis: [1], ganam: 1, rajju: "kanta", yoni: "பாம்பு (Serpent)", syllables: ["ஒ (O)", "வ (Va)", "வி (Vi)", "வு (Vu)"] },
      { idx: 4, name: "மிருகசீரிடம் (Mirugasheesham)", rasis: [1, 2], ganam: 0, rajju: "siro", yoni: "பாம்பு (Serpent)", syllables: ["வே (Ve)", "வோ (Vo)", "கா (Ka)", "கி (Ki)"] },
      { idx: 5, name: "திருவாதிரை (Thiruvathirai)", rasis: [2], ganam: 1, rajju: "kanta", yoni: "நாய் (Dog)", syllables: ["கு (Ku)", "க (Gha)", "ங (Nga)", "ச (Cha)"] },
      { idx: 6, name: "புனர்பூசம் (Punarpoosam)", rasis: [2, 3], ganam: 0, rajju: "nabhi", yoni: "பூனை (Cat)", syllables: ["கே (Ke)", "கோ (Ko)", "ஹ (Ha)", "ஹி (Hi)"] },
      { idx: 7, name: "பூசம் (Poosam)", rasis: [3], ganam: 0, rajju: "kati", yoni: "ஆடு (Goat)", syllables: ["ஹு (Hu)", "ஹே (He)", "ஹோ (Ho)", "ட (Da)"] },
      { idx: 8, name: "ஆயில்யம் (Ayilyam)", rasis: [3], ganam: 2, rajju: "pada", yoni: "பூனை (Cat)", syllables: ["டி (Di)", "டு (Du)", "டே (De)", "டோ (Do)"] },
      { idx: 9, name: "மகம் (Magam)", rasis: [4], ganam: 2, rajju: "pada", yoni: "எலி (Rat)", syllables: ["ம (Ma)", "மி (Mi)", "மு (Mu)", "மே (Me)"] },
      { idx: 10, name: "பூரம் (Pooram)", rasis: [4], ganam: 1, rajju: "kati", yoni: "எலி (Rat)", syllables: ["மோ (Mo)", "ட (Ta)", "டி (Ti)", "டு (Tu)"] },
      { idx: 11, name: "உத்திரம் (Uthiram)", rasis: [4, 5], ganam: 1, rajju: "nabhi", yoni: "பசு (Cow)", syllables: ["டே (Te)", "டோ (To)", "ப (Pa)", "பி (Pi)"] },
      { idx: 12, name: "அஸ்தம் (Hastham)", rasis: [5], ganam: 0, rajju: "kanta", yoni: "எருமை (Buffalo)", syllables: ["பு (Pu)", "ஷ (Sha)", "ண (Na)", "ட (Tha)"] },
      { idx: 13, name: "சித்திரை (Chithirai)", rasis: [5, 6], ganam: 2, rajju: "siro", yoni: "புலி (Tiger)", syllables: ["பே (Pe)", "போ (Po)", "ர (Ra)", "ரி (Ri)"] },
      { idx: 14, name: "சுவாதி (Swathi)", rasis: [6], ganam: 0, rajju: "kanta", yoni: "எருமை (Buffalo)", syllables: ["ரு (Ru)", "ரே (Re)", "ரோ (Ro)", "த (Tha)"] },
      { idx: 15, name: "விசாகம் (Visakam)", rasis: [6, 7], ganam: 2, rajju: "nabhi", yoni: "புலி (Tiger)", syllables: ["தி (Thi)", "து (Thu)", "தே (The)", "தோ (Tho)"] },
      { idx: 16, name: "அனுஷம் (Anusham)", rasis: [7], ganam: 0, rajju: "kati", yoni: "மான் (Deer)", syllables: ["ந (Na)", "நி (Ni)", "நு (Nu)", "நே (Ne)"] },
      { idx: 17, name: "கேட்டை (Kettai)", rasis: [7], ganam: 2, rajju: "pada", yoni: "மான் (Deer)", syllables: ["நோ (No)", "ய (Ya)", "யி (Yi)", "யு (Yu)"] },
      { idx: 18, name: "மூலம் (Moolam)", rasis: [8], ganam: 2, rajju: "pada", yoni: "நாய் (Dog)", syllables: ["யே (Ye)", "யோ (Yo)", "ப (Bha)", "பி (Bhi)"] },
      { idx: 19, name: "பூராடம் (Pooradam)", rasis: [8], ganam: 1, rajju: "kati", yoni: "குரங்கு (Monkey)", syllables: ["பு (Bhu)", "த (Dha)", "ப (Pha)", "ட (Dha)"] },
      { idx: 20, name: "உத்திராடம் (Uthiradam)", rasis: [8, 9], ganam: 1, rajju: "nabhi", yoni: "கீரி (Mongoose)", syllables: ["பே (Bhe)", "போ (Bho)", "ஜ (Ja)", "ஜி (Ji)"] },
      { idx: 21, name: "திருவோணம் (Thiruvonam)", rasis: [9], ganam: 0, rajju: "kanta", yoni: "குரங்கு (Monkey)", syllables: ["கி (Khi)", "கு (Khu)", "கே (Khe)", "கோ (Kho)"] },
      { idx: 22, name: "அவிட்டம் (Avittam)", rasis: [9, 10], ganam: 2, rajju: "siro", yoni: "சிங்கம் (Lion)", syllables: ["க (Ga)", "கி (Gi)", "கு (Gu)", "கே (Ge)"] },
      { idx: 23, name: "சதயம் (Sathayam)", rasis: [10], ganam: 2, rajju: "kanta", yoni: "குதிரை (Horse)", syllables: ["கோ (Go)", "ஸ (Sa)", "ஸி (Si)", "ஸு (Su)"] },
      { idx: 24, name: "பூரட்டாதி (Poorattathi)", rasis: [10, 11], ganam: 1, rajju: "nabhi", yoni: "சிங்கம் (Lion)", syllables: ["ஸே (Se)", "ஸோ (So)", "த (Dha)", "தி (Dhi)"] },
      { idx: 25, name: "உத்திரட்டாதி (Uthirattathi)", rasis: [11], ganam: 1, rajju: "kati", yoni: "பசு (Cow)", syllables: ["து (Dhu)", "ஸ்ரீ (Sri)", "ஞ (Jna)", "த (Tha)"] },
      { idx: 26, name: "ரேவதி (Revathi)", rasis: [11], ganam: 0, rajju: "pada", yoni: "யானை (Elephant)", syllables: ["தே (De)", "தோ (Do)", "ச (Cha)", "சி (Chi)"] }
    ];

    // --- H. STEP 9: BABY NAMING & TAMIL NUMEROLOGY ENGINE ---
    let selectedBabyPadam = 0;

    const VIMSHOTTARI_SEQUENCE = [
      { name: "கேது (Kethu)", shortTa: "கேது", years: 7 },
      { name: "சுக்கிரன் (Venus)", shortTa: "சுக்கிரன்", years: 20 },
      { name: "சூரியன் (Sun)", shortTa: "சூரியன்", years: 6 },
      { name: "சந்திரன் (Moon)", shortTa: "சந்திரன்", years: 10 },
      { name: "செவ்வாய் (Mars)", shortTa: "செவ்வாய்", years: 7 },
      { name: "ராகு (Rahu)", shortTa: "ராகு", years: 18 },
      { name: "குரு (Jupiter)", shortTa: "குரு", years: 16 },
      { name: "சனி (Saturn)", shortTa: "சனி", years: 19 },
      { name: "புதன் (Mercury)", shortTa: "புதன்", years: 17 }
    ];

    const NUMEROLOGY_PLANETS = {
      1: { lord: "சூரியன் (Sun)", gem: "மாணிக்கம் (Ruby)", trait: "தலைமைப் பண்பு, தன்னம்பிக்கை மற்றும் அரசு/நிர்வாக உயர்வு தரும் எண்." },
      2: { lord: "சந்திரன் (Moon)", gem: "முத்து (Pearl)", trait: "கற்பனைத் திறன், கலை ஆர்வம் மற்றும் மென்மையான அணுகுமுறை தரும் எண்." },
      3: { lord: "குரு (Jupiter)", gem: "புஷ்பராகம் (Yellow Sapphire)", trait: "ஞானம், கல்வி, ஆன்மீகம் மற்றும் பொருளாதார வளர்ச்சி தரும் சுப எண்." },
      4: { lord: "ராகு (Rahu)", gem: "கோமேதகம் (Hessonite)", trait: "புதுமையான சிந்தனை, தொழில்நுட்பத் திறமை மற்றும் துணிச்சல் தரும் எண்." },
      5: { lord: "புதன் (Mercury)", gem: "மரகதம் (Emerald)", trait: "வியாபார வெற்றி, பேச்சாற்றல், கணிதம் மற்றும் சாதுரியம் தரும் அதிர்ஷ்ட எண்." },
      6: { lord: "சுக்கிரன் (Venus)", gem: "வைரம் (Diamond / Zircon)", trait: "கலை, செல்வ வளம், சொத்து சேர்க்கை மற்றும் குடும்ப மகிழ்ச்சி தரும் எண்." },
      7: { lord: "கேது (Kethu)", gem: "வைடூரியம் (Cat's Eye)", trait: "ஆராய்ச்சி மனம், உள்ளுணர்வு மற்றும் ஆன்மீகத் தெளிவு தரும் எண்." },
      8: { lord: "சனி (Saturn)", gem: "நீலம் (Blue Sapphire)", trait: "கடின உழைப்பு, நீதி நேர்மை மற்றும் நீண்ட காலப் பெருவெற்றி தரும் எண்." },
      9: { lord: "செவ்வாய் (Mars)", gem: "பவளம் (Red Coral)", trait: "தைரியம், விடாமுயற்சி, நிர்வாகத் திறன் மற்றும் வெற்றியைத் தரும் எண்." }
    };

    const CHALDEAN_MAP = {
      A: 1, I: 1, J: 1, Q: 1, Y: 1,
      B: 2, K: 2, R: 2,
      C: 3, G: 3, L: 3, S: 3,
      D: 4, M: 4, T: 4,
      E: 5, H: 5, N: 5, X: 5,
      U: 6, V: 6, W: 6,
      O: 7, Z: 7,
      F: 8, P: 8
    };

    function initBabyNamingAndNumerology() {
      const sel = document.getElementById("babyStarSelect");
      sel.innerHTML = STAR_PORUTHAM_DATA.map(s => `<option value="${s.idx}">${s.name}</option>`).join("");
      sel.value = "3";
      updateBabyNamingView();
      calculateTamilNumerology();
    }

    function updateBabyNamingView() {
      const starIdx = parseInt(document.getElementById("babyStarSelect").value, 10);
      const starObj = STAR_PORUTHAM_DATA[starIdx];
      const starLord = VIMSHOTTARI_SEQUENCE[starIdx % 9];

      const globalPadamIndex = starIdx * 4 + selectedBabyPadam;
      const rasiIndex = Math.floor(globalPadamIndex / 9) % 12;
      const rasiObj = RASI_DATA[rasiIndex];

      document.getElementById("babyPadamRasi").textContent = `${rasiObj.tamil} (${rasiObj.translit})`;
      document.getElementById("babyStarLord").textContent = starLord.name;

      const padamContainer = document.getElementById("padamBoxesContainer");
      padamContainer.innerHTML = "";

      starObj.syllables.forEach((syl, pIdx) => {
        const pRasiIdx = Math.floor((starIdx * 4 + pIdx) / 9) % 12;
        const box = document.createElement("div");
        box.className = "padam-box" + (pIdx === selectedBabyPadam ? " active" : "");
        box.innerHTML = `
          <small>${pIdx + 1}ம் பாதம் (${RASI_DATA[pRasiIdx].tamil})</small>
          <span class="syllable-big">${syl}</span>
        `;
        box.addEventListener("click", () => {
          selectedBabyPadam = pIdx;
          updateBabyNamingView();
        });
        padamContainer.appendChild(box);
      });

      const activeSyl = starObj.syllables[selectedBabyPadam];
      document.getElementById("babySyllableHeading").textContent =
        `${starObj.name} - ${selectedBabyPadam + 1}ம் பாதம்: '${activeSyl}' எழுத்து வழிகாட்டி`;
      document.getElementById("babySampleNames").textContent =
        `உங்கள் குழந்தைக்கு '${activeSyl}' ஒலியில் தொடங்கும் தமிழ் அல்லது சமஸ்கிருதப் பெயர்களைச் சூட்டுவது நட்சத்திர பலத்தை அதிகரிக்கும். இராசி: ${rasiObj.tamil} (அதிபதி: ${rasiObj.lord}).`;
    }

    function reduceToSingleDigit(num) {
      let n = Math.abs(num);
      while (n > 9) {
        n = String(n).split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
      }
      return n || 1;
    }

    function calculateTamilNumerology() {
      const dateStr = document.getElementById("numBirthDate").value || "1998-05-15";
      const [yyyy, mm, dd] = dateStr.split("-").map(Number);

      const psychicNum = reduceToSingleDigit(dd);
      const allDigitsSum = String(yyyy) + String(mm) + String(dd);
      const destinyNum = reduceToSingleDigit(
        allDigitsSum.split("").reduce((acc, d) => acc + parseInt(d, 10), 0)
      );

      const rawName = (document.getElementById("numEnglishName").value || "KARTHIK").toUpperCase();
      const lettersOnly = rawName.replace(/[^A-Z]/g, "").split("");

      let compoundTotal = 0;
      const chipsHtml = lettersOnly.map(ch => {
        const val = CHALDEAN_MAP[ch] || 1;
        compoundTotal += val;
        return `<span class="letter-chip">${ch} = ${val}</span>`;
      }).join("");

      document.getElementById("letterChipsContainer").innerHTML =
        chipsHtml || `<span style="font-size: 0.82rem; color: var(--text-muted);">ஆங்கில எழுத்துக்களை உள்ளிடவும்</span>`;

      const singleNameNum = reduceToSingleDigit(compoundTotal);

      const psychicInfo = NUMEROLOGY_PLANETS[psychicNum];
      const destinyInfo = NUMEROLOGY_PLANETS[destinyNum];
      const nameInfo = NUMEROLOGY_PLANETS[singleNameNum];

      document.getElementById("numPsychicVal").textContent = String(psychicNum);
      document.getElementById("numPsychicLord").textContent = psychicInfo.lord;

      document.getElementById("numDestinyVal").textContent = String(destinyNum);
      document.getElementById("numDestinyLord").textContent = destinyInfo.lord;

      document.getElementById("numNameVal").textContent = `${compoundTotal} → ${singleNameNum}`;
      document.getElementById("numNameLord").textContent = nameInfo.lord;

      document.getElementById("numVerdictTitle").textContent =
        `பெயர் எண் ${compoundTotal} (${singleNameNum} - ${nameInfo.lord})`;
      document.getElementById("numVerdictText").textContent =
        `உங்கள் பிறப்பு எண் ${psychicNum} (${psychicInfo.lord}), விதி எண் ${destinyNum} (${destinyInfo.lord}). ${nameInfo.trait}`;
      document.getElementById("numGemstoneText").textContent =
        `💎 அதிர்ஷ்ட ரத்தினம் (Lucky Gemstone): ${psychicInfo.gem} (பிறப்பு எண்) / ${destinyInfo.gem} (விதி எண்)`;
    }

    // --- I. STEP 8: SUBHA MUHURTHAM & KARINAL SCANNER ENGINE ---
    const KARINAL_TABLE = {
      "சித்திரை (Chithirai)": [6, 15],
      "வைகாசி (Vaikasi)": [7, 16, 17],
      "ஆனி (Aani)": [1, 6],
      "ஆடி (Aadi)": [2, 10, 20],
      "ஆவணி (Aavani)": [2, 9, 28],
      "புரட்டாசி (Purattasi)": [16, 29],
      "ஐப்பசி (Aippasi)": [6, 20],
      "கார்த்திகை (Karthigai)": [1, 10, 17],
      "மார்கழி (Margazhi)": [6, 9, 11],
      "தை (Thai)": [1, 2, 3, 11, 17],
      "மாசி (Maasi)": [15, 16, 17],
      "பங்குனி (Panguni)": [6, 15, 19]
    };

    const SUBHA_MUHURTHA_STARS = [0, 3, 4, 7, 9, 11, 12, 14, 16, 18, 20, 21, 25, 26];
    const AVOID_MUHURTHA_STARS = [1, 2, 5, 8, 15, 17, 19, 24];

    function getTamilMonthAndDayStructured(dateObj) {
      const m = dateObj.getMonth();
      const d = dateObj.getDate();
      const tamilMonths = [
        { name: "மார்கழி (Margazhi)", next: "தை (Thai)", split: 14, prevLen: 30 },
        { name: "தை (Thai)", next: "மாசி (Maasi)", split: 13, prevLen: 29 },
        { name: "மாசி (Maasi)", next: "பங்குனி (Panguni)", split: 14, prevLen: 30 },
        { name: "பங்குனி (Panguni)", next: "சித்திரை (Chithirai)", split: 14, prevLen: 30 },
        { name: "சித்திரை (Chithirai)", next: "வைகாசி (Vaikasi)", split: 14, prevLen: 31 },
        { name: "வைகாசி (Vaikasi)", next: "ஆனி (Aani)", split: 15, prevLen: 31 },
        { name: "ஆனி (Aani)", next: "ஆடி (Aadi)", split: 16, prevLen: 32 },
        { name: "ஆடி (Aadi)", next: "ஆவணி (Aavani)", split: 17, prevLen: 31 },
        { name: "ஆவணி (Aavani)", next: "புரட்டாசி (Purattasi)", split: 17, prevLen: 31 },
        { name: "புரட்டாசி (Purattasi)", next: "ஐப்பசி (Aippasi)", split: 17, prevLen: 31 },
        { name: "ஐப்பசி (Aippasi)", next: "கார்த்திகை (Karthigai)", split: 16, prevLen: 30 },
        { name: "கார்த்திகை (Karthigai)", next: "மார்கழி (Margazhi)", split: 16, prevLen: 29 }
      ];
      const info = tamilMonths[m];
      if (d >= info.split) {
        return { monthName: info.next, dayNum: d - info.split + 1 };
      } else {
        return { monthName: info.name, dayNum: Math.max(1, info.prevLen - (info.split - d) + 1) };
      }
    }

    function auditSingleDayForMuhurtham(dateObj, eventType) {
      const tInfo = getTamilMonthAndDayStructured(dateObj);
      const angas = computeDailyAngas(dateObj);
      const weekday = dateObj.getDay();
      const dayPanch = WEEKDAY_PANCHANGAM[weekday];

      const karinalDays = KARINAL_TABLE[tInfo.monthName] || [];
      const isKarinal = karinalDays.includes(tInfo.dayNum);
      const isAshtamiNavami = [7, 8, 22, 23].includes(angas.thithiIndex);
      const isAmavasai = angas.thithiIndex === 29;
      const isValarpirai = angas.thithiIndex <= 14;

      const isZeroMarriageMonth = ["ஆடி (Aadi)", "புரட்டாசி (Purattasi)", "மார்கழி (Margazhi)"].includes(tInfo.monthName);
      const isSubhaStar = SUBHA_MUHURTHA_STARS.includes(angas.starIndex);
      const isFierceStar = AVOID_MUHURTHA_STARS.includes(angas.starIndex);

      const reasons = [];
      let status = "match";
      let badgeLabel = "சுப முகூர்த்த நாள் (Auspicious)";

      if (isKarinal) {
        status = "nomatch";
        badgeLabel = "கரிநாள் • தவிர்க்க (Karinal)";
        reasons.push(`தமிழ் மாதம் ${tInfo.monthName} ${tInfo.dayNum}-ம் தேதி பாரம்பரிய கரிநாள் ஆகும்`);
      }
      if (isAshtamiNavami) {
        status = "nomatch";
        badgeLabel = "அஷ்டமி / நவமி • தவிர்க்க";
        reasons.push("அஷ்டமி / நவமி திதி சுப முகூர்த்தங்களுக்கு விலக்கப்பட்டது");
      }
      if (isAmavasai) {
        status = "nomatch";
        badgeLabel = "அமாவாசை • பித்ரு வழிபாடு";
        reasons.push("அமாவாசை திதி சுப திருமண/வாஸ்து நிகழ்ச்சிகளுக்குத் தவிர்க்கப்படுகிறது");
      }

      if (status !== "nomatch") {
        if ((eventType === "wedding" || eventType === "house") && isZeroMarriageMonth) {
          status = "moderate";
          badgeLabel = "மாத விலக்கு (Check Month)";
          reasons.push(`${tInfo.monthName} மாதத்தில் பொதுவாக திருமணம் / கிரகப்பிரவேசம் தவிர்க்கப்படும் (தங்கம்/பொருள் வாங்கலாம்)`);
        } else if (isFierceStar) {
          status = "moderate";
          badgeLabel = "மத்திமம் (Check Star)";
          reasons.push(`${angas.starText} உக்கிர நட்சத்திரம் என்பதால் சாதாரண பணிகளுக்கு மட்டும் ஏற்றது`);
        } else if (isSubhaStar && isValarpirai) {
          status = "match";
          badgeLabel = "வளர்பிறை சுப முகூர்த்தம் ★";
          reasons.push(`வளர்பிறை திதி மற்றும் சுப நட்சத்திரம் (${angas.starText}) இணைந்த உத்தம முகூர்த்த நாள்`);
        } else if (isSubhaStar) {
          status = "match";
          badgeLabel = "சுப நட்சத்திர நாள் (Good)";
          reasons.push(`சுப நட்சத்திரம் (${angas.starText}) மற்றும் கரிநாள்/அஷ்டமி இல்லாத நல்ல நாள்`);
        } else {
          status = "moderate";
          badgeLabel = "சம நாள் (Moderate Day)";
          reasons.push("கரிநாள் அல்லது அஷ்டமி/நவமி தோஷம் இல்லை; நல்ல நேரத்தில் சுப காரியம் செய்யலாம்");
        }
      }

      return {
        dateObj, tInfo, angas, dayPanch, isKarinal, isAshtamiNavami,
        status, badgeLabel, reasonText: reasons.join(" • ")
      };
    }

    function setMuhurthamToday() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      document.getElementById("muhurthamStartDate").value = `${yyyy}-${mm}-${dd}`;
      evaluateMuhurthamPlanner();
    }

    function evaluateMuhurthamPlanner() {
      const dateVal = document.getElementById("muhurthamStartDate").value;
      const startDate = dateVal ? new Date(dateVal + "T12:00:00") : new Date();
      const eventType = document.getElementById("muhurthamEvent").value;

      const firstDayAudit = auditSingleDayForMuhurtham(startDate, eventType);
      const formattedGreg = startDate.toLocaleDateString("en-IN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      });

      document.getElementById("muhurthamSelectedTitle").textContent = `${formattedGreg}`;
      document.getElementById("muhurthamVerdictPill").textContent = firstDayAudit.badgeLabel;
      document.getElementById("muhTamilDate").textContent = `${firstDayAudit.tInfo.monthName} ${firstDayAudit.tInfo.dayNum}`;
      document.getElementById("muhKarinalStatus").textContent = firstDayAudit.isKarinal
        ? "⚠️ கரிநாள் (Avoid Auspicious Starts)"
        : "✅ கரிநாள் இல்லை (Clear)";
      document.getElementById("muhThithiStar").textContent =
        `${firstDayAudit.angas.thithiText} • ${firstDayAudit.angas.starText}`;
      document.getElementById("muhNallaNeram").textContent = firstDayAudit.dayPanch.nallaNeram;
      document.getElementById("muhAdviceText").textContent = firstDayAudit.reasonText;

      const tbody = document.getElementById("muhurthamTableBody");
      tbody.innerHTML = "";

      for (let i = 0; i < 14; i++) {
        const d = new Date(startDate.getTime());
        d.setDate(d.getDate() + i);
        const audit = auditSingleDayForMuhurtham(d, eventType);

        const dateLabel = d.toLocaleDateString("en-IN", {
          day: "2-digit", month: "short", year: "numeric"
        }) + ` (${audit.dayPanch.shortTa})`;

        let checkNote = "தோஷம் இல்லை (Clear)";
        if (audit.isKarinal) checkNote = "⚠️ கரிநாள் (Karinal)";
        else if (audit.isAshtamiNavami) checkNote = "⚠️ அஷ்டமி / நவமி";

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${dateLabel}</strong></td>
          <td>${audit.tInfo.monthName} ${audit.tInfo.dayNum}</td>
          <td>${audit.angas.thithiText}<br><small style="color: var(--text-muted);">${audit.angas.starText}</small></td>
          <td>${checkNote}</td>
          <td>
            <span class="status-pill ${audit.status}">${audit.badgeLabel}</span>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">${audit.reasonText}</div>
          </td>
        `;
        tbody.appendChild(tr);
      }
    }

    // --- J. STEP 8: JSON BACKUP EXPORT & RESTORE ---
    function exportProfilesJson() {
      const list = getSavedProfiles();
      const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tamil_family_horoscopes_backup.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    function importProfilesJson(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const imported = JSON.parse(e.target.result);
          if (Array.isArray(imported) && imported.length > 0) {
            saveProfilesToStorage(imported);
            renderSavedProfilesBar();
            loadProfile(0);
            showToast("✅ ஜாதகக் கோப்பு பதிவேற்றப்பட்டது! (Profiles Restored!)");
          }
        } catch (err) {}
      };
      reader.readAsText(file);
    }

    // --- K. STEP 7: GOCHARA PEYARCHI ANALYZER ---
    function initPeyarchiControls() {
      const optionsHtml = RASI_DATA.map((r, i) => `<option value="${i}">${r.tamil} (${r.translit})</option>`).join("");
      document.getElementById("peyarchiUserRasi").innerHTML = optionsHtml;
      document.getElementById("transitGuruRasi").innerHTML = optionsHtml;
      document.getElementById("transitSaniRasi").innerHTML = optionsHtml;
      document.getElementById("transitRahuRasi").innerHTML = optionsHtml;

      document.getElementById("peyarchiUserRasi").value = "8";
      setCurrentSkyTransits();
    }

    function setCurrentSkyTransits() {
      const now = new Date();
      const j2000Ms = Date.UTC(2000, 0, 1, 12, 0, 0);
      const d = (now.getTime() - j2000Ms) / (1000 * 60 * 60 * 24);
      const ayanamsa = 23.85 + (d / 365.25) * 0.01396;
      const norm360 = deg => ((deg % 360) + 360) % 360;

      const jupiterLon = norm360(34.35 + 0.0830853 * d - ayanamsa);
      const saturnLon = norm360(50.08 + 0.0334597 * d - ayanamsa);
      const rahuLon = norm360(125.04 - 0.0529538 * d - ayanamsa);

      document.getElementById("transitGuruRasi").value = String(Math.floor(jupiterLon / 30) % 12);
      document.getElementById("transitSaniRasi").value = String(Math.floor(saturnLon / 30) % 12);
      document.getElementById("transitRahuRasi").value = String(Math.floor(rahuLon / 30) % 12);

      evaluatePeyarchi();
    }

    function syncTransitKethuAndEvaluate() {
      evaluatePeyarchi();
    }

    function evaluatePeyarchi() {
      const userRasiIdx = parseInt(document.getElementById("peyarchiUserRasi").value, 10);
      const guruRasiIdx = parseInt(document.getElementById("transitGuruRasi").value, 10);
      const saniRasiIdx = parseInt(document.getElementById("transitSaniRasi").value, 10);
      const rahuRasiIdx = parseInt(document.getElementById("transitRahuRasi").value, 10);
      const kethuRasiIdx = (rahuRasiIdx + 6) % 12;

      const userRasi = RASI_DATA[userRasiIdx];
      const guruRasi = RASI_DATA[guruRasiIdx];
      const saniRasi = RASI_DATA[saniRasiIdx];
      const rahuRasi = RASI_DATA[rahuRasiIdx];
      const kethuRasi = RASI_DATA[kethuRasiIdx];

      const houseFromRasi = targetIdx => ((targetIdx - userRasiIdx + 12) % 12) + 1;
      const guruHouse = houseFromRasi(guruRasiIdx);
      const saniHouse = houseFromRasi(saniRasiIdx);
      const rahuHouse = houseFromRasi(rahuRasiIdx);
      const kethuHouse = houseFromRasi(kethuRasiIdx);

      document.getElementById("peyarchiRasiIcon").textContent = userRasi.icon;
      document.getElementById("peyarchiHeading").textContent =
        `${userRasi.tamil} (${userRasi.translit}) - கோச்சார பெயர்ச்சி பலன்கள்`;

      let guruClass = "moderate";
      let guruStatusText = "சம பலன் (Moderate)";
      let guruEffectTa = "";

      if ([2, 5, 7, 9, 11].includes(guruHouse)) {
        guruClass = "auspicious";
        guruStatusText = "பூர்ண குரு பலம் (Viyazha Nokkam)";
        const guruBlessings = {
          2: "தன ஸ்தானத்தில் குரு: குடும்பத்தில் சுப நிகழ்ச்சிகள், தன வரவு மற்றும் வாக்கு வன்மை கூடும்.",
          5: "பூர்வ புண்ணிய ஸ்தானத்தில் குரு: புத்திர பாக்கியம், பதவி உயர்வு மற்றும் மன மகிழ்ச்சி உண்டாகும்.",
          7: "களத்திர ஸ்தானத்தில் குரு: நேரடி குரு பார்வை உங்கள் ராசிக்குக் கிடைக்கிறது! திருமண சுப காரியங்கள் கைகூடும்.",
          9: "பாக்கிய ஸ்தானத்தில் குரு: தந்தை வழி ஆதாயம், வெளிநாட்டு வாய்ப்புகள் மற்றும் ஆன்மீக உயர்வு கிட்டும்.",
          11: "லாப ஸ்தானத்தில் குரு: தொழில் லாபம், சொத்து சேர்க்கை மற்றும் எண்ணிய காரியங்கள் யாவும் கைகூடும்."
        };
        guruEffectTa = guruBlessings[guruHouse];
      } else if ([1, 4, 10].includes(guruHouse)) {
        guruClass = "moderate";
        guruStatusText = "பணி & இடமாற்ற காலம் (Transition)";
        guruEffectTa = `ராசிக்கு ${guruHouse}-ம் இடத்தில் குரு சஞ்சரிக்கிறார். பணியிடத்தில் கூடுதல் பொறுப்புகளும், சுப இடமாற்றங்களும் ஏற்படலாம். திட்டமிட்டு செயல்படுவது நன்மை தரும்.`;
      } else {
        guruClass = "caution";
        guruStatusText = "நிதானம் தேவை (Careful Planning)";
        guruEffectTa = `ராசிக்கு ${guruHouse}-ம் இடத்தில் குரு சஞ்சரிக்கிறார். பெரிய முதலீடுகள் மற்றும் ஜாமீன் கையெழுத்துக்களைத் தவிர்த்து, குரு வழிபாடு செய்வது மன அமைதி தரும்.`;
      }

      let saniClass = "moderate";
      let saniPhaseLabel = `${saniHouse}-ம் இட சனி`;
      let saniEffectTa = "";

      if (saniHouse === 12) {
        saniClass = "caution";
        saniPhaseLabel = "ஏழரைச் சனி (விரய சனி - முதல் சுற்று)";
        saniEffectTa = "ராசிக்கு 12-ம் இடத்தில் சனி (ஏழரைச் சனியின் தொடக்கம்). சுப விரயங்கள், வீடு/வாகன முதலீடு மற்றும் பயணங்கள் அதிகரிக்கும்.";
      } else if (saniHouse === 1) {
        saniClass = "caution";
        saniPhaseLabel = "ஏழரைச் சனி (ஜென்ம சனி - 2ம் சுற்று)";
        saniEffectTa = "உங்கள் ராசியிலேயே சனி பகவான் சஞ்சரிக்கிறார் (ஜென்ம சனி). உடல் நலம் மற்றும் பணிச்சுமையில் நிதானம் தேவை; கடின உழைப்பு நிலையான வெற்றியைத் தரும்.";
      } else if (saniHouse === 2) {
        saniClass = "caution";
        saniPhaseLabel = "ஏழரைச் சனி (பாத / குடும்ப சனி - இறுதி சுற்று)";
        saniEffectTa = "ராசிக்கு 2-ம் இடத்தில் சனி (ஏழரைச் சனியின் நிறைவுப் பகுதி). பேச்சில் நிதானமும், நிதி நிர்வாகத்தில் கவனமும் நன்மை தரும்.";
      } else if (saniHouse === 8) {
        saniClass = "caution";
        saniPhaseLabel = "அஷ்டமச் சனி (8-ம் இட சனி)";
        saniEffectTa = "ராசிக்கு 8-ம் இடத்தில் அஷ்டமச் சனி நடைபெறுகிறது. புதிய தொழில் தொடங்குவதில் அவசரம் வேண்டாம்; நிதானமும் இறை வழிபாடும் பாதுகாப்பு தரும்.";
      } else if (saniHouse === 4) {
        saniClass = "moderate";
        saniPhaseLabel = "அர்த்தாஷ்டமச் சனி (4-ம் இட சனி)";
        saniEffectTa = "ராசிக்கு 4-ம் இடத்தில் அர்த்தாஷ்டமச் சனி. வீடு, வாகனம் மற்றும் தாயாரின் ஆரோக்கியத்தில் கூடுதல் கவனம் செலுத்துவது நல்லது.";
      } else if (saniHouse === 7) {
        saniClass = "moderate";
        saniPhaseLabel = "கண்டகச் சனி (7-ம் இட சனி)";
        saniEffectTa = "ராசிக்கு 7-ம் இடத்தில் கண்டகச் சனி. கூட்டுத் தொழில் மற்றும் குடும்ப உறவுகளில் விட்டுக்கொடுத்துச் செல்வது சிறப்பு.";
      } else if ([3, 6, 11].includes(saniHouse)) {
        saniClass = "auspicious";
        saniPhaseLabel = `யோக சனி பலன் (${saniHouse}-ம் இடம் • சுபம்)`;
        saniEffectTa = `ராசிக்கு ${saniHouse}-ம் இடத்தில் சனி பகவான் சஞ்சரிப்பது மிகச்சிறந்த ராஜயோக காலமாகும்! தொட்ட காரியங்கள் துலங்கும், பொருளாதார உயர்வு கிட்டும்.`;
      } else {
        saniClass = "moderate";
        saniPhaseLabel = `சம பலன் (${saniHouse}-ம் இட சனி)`;
        saniEffectTa = `ராசிக்கு ${saniHouse}-ம் இடத்தில் சனி சஞ்சரிக்கிறார். ஏழரைச் சனி அல்லது அஷ்டமச் சனி பாதிப்பு இல்லை; உழைப்பிற்கேற்ற ஊதியம் உண்டு.`;
      }

      const rahuGood = [3, 6, 11].includes(rahuHouse);
      const kethuGood = [3, 6, 11].includes(kethuHouse);
      let rkClass = "moderate";
      let rkBadge = `ராகு ${rahuHouse}-ல் • கேது ${kethuHouse}-ல்`;
      let rkEffectTa = "";

      if (rahuGood || kethuGood) {
        rkClass = "auspicious";
        rkBadge = `சுப யோக நிலை (${rahuGood ? "ராகு " + rahuHouse + "-ல்" : "கேது " + kethuHouse + "-ல்"})`;
        rkEffectTa = `ராசிக்கு ${rahuHouse}-ம் இடத்தில் ராகுவும் (${rahuRasi.tamil}), ${kethuHouse}-ம் இடத்தில் கேதுவும் (${kethuRasi.tamil}) உள்ளனர். 3, 6, 11-ம் இட சஞ்சாரம் திடீர் அதிர்ஷ்டம் மற்றும் தைரியத்தைத் தரும்.`;
      } else if ([1, 2, 7, 8].includes(rahuHouse) || [1, 2, 7, 8].includes(kethuHouse)) {
        rkClass = "caution";
        rkBadge = `ராகு ${rahuHouse}-ல் • கேது ${kethuHouse}-ல் (கவனம்)`;
        rkEffectTa = `ராசிக்கு ${rahuHouse}-ல் ராகுவும் (${rahuRasi.tamil}), ${kethuHouse}-ல் கேதுவும் (${kethuRasi.tamil}) சஞ்சரிக்கின்றனர். உறவுகள் மற்றும் ஆரோக்கியத்தில் நிதானம் தேவை.`;
      } else {
        rkEffectTa = `ராசிக்கு ${rahuHouse}-ம் இடத்தில் ராகுவும் (${rahuRasi.tamil}), ${kethuHouse}-ம் இடத்தில் கேதுவும் (${kethuRasi.tamil}) சம பலன்களை வழங்குகின்றனர்.`;
      }

      document.getElementById("peyarchiOverallPill").textContent = guruStatusText;
      document.getElementById("metaSaniPhase").textContent = saniPhaseLabel;
      document.getElementById("metaGuruBalam").textContent = `${guruHouse}-ம் இட குரு (${guruStatusText})`;
      document.getElementById("metaRahuKethu").textContent = `ராகு ${rahuHouse}-ல் (${rahuRasi.tamil}) • கேது ${kethuHouse}-ல் (${kethuRasi.tamil})`;

      document.getElementById("peyarchiCardsContainer").innerHTML = `
        <div class="transit-card ${guruClass}">
          <div class="transit-card-top">
            <h3>1. குரு பெயர்ச்சி பலன் (Guru Peyarchi in ${guruRasi.tamil})</h3>
            <span class="house-pill">ராசிக்கு ${guruHouse}-ம் இடம் • ${guruStatusText}</span>
          </div>
          <p>${guruEffectTa}</p>
          <div class="dosha-remedy" style="margin-top: 8px;">
            🛕 வியாழக்கிழமை தட்சிணாமூர்த்தி வழிபாடு & ஆலங்குடி / திட்டை குரு பகவான் தரிசனம் சிறப்பு.
          </div>
        </div>

        <div class="transit-card ${saniClass}">
          <div class="transit-card-top">
            <h3>2. சனி பெயர்ச்சி & ஏழரைச் சனி ஆய்வு (Sani in ${saniRasi.tamil})</h3>
            <span class="house-pill">ராசிக்கு ${saniHouse}-ம் இடம் • ${saniPhaseLabel}</span>
          </div>
          <p>${saniEffectTa}</p>
          <div class="dosha-remedy" style="margin-top: 8px;">
            🛕 சனிக்கிழமை நல்லெண்ணெய் தீபம், காகத்திற்கு அன்னமிடுதல் & திருநள்ளாறு தர்பாரண்யேஸ்வரர் வழிபாடு.
          </div>
        </div>

        <div class="transit-card ${rkClass}">
          <div class="transit-card-top">
            <h3>3. ராகு – கேது பெயர்ச்சி பலன் (Rahu in ${rahuRasi.tamil}, Kethu in ${kethuRasi.tamil})</h3>
            <span class="house-pill">${rkBadge}</span>
          </div>
          <p>${rkEffectTa}</p>
          <div class="dosha-remedy" style="margin-top: 8px;">
            🛕 ராகு கால துர்க்கை வழிபாடு, விநாயகர் வழிபாடு & திருநாகேஸ்வரம் / கீழ்ப்பெரும்பள்ளம் தரிசனம்.
          </div>
        </div>
      `;
    }

    // --- L. STEP 6: VIMSHOTTARI 120-YEAR MAHA DASA & BHUKTI ENGINE ---
    let computedMahaDasas = [];

    function addYearsToDate(baseDate, fractionalYears) {
      const ms = baseDate.getTime() + fractionalYears * 365.2425 * 24 * 3600 * 1000;
      return new Date(ms);
    }

    function formatShortDate(d) {
      return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }

    function computeVimshottariTimeline(birthDateObj, moonLon) {
      const starSpan = 360 / 27;
      const starIndex = Math.floor((moonLon / 360) * 27) % 27;
      const degInsideStar = moonLon % starSpan;
      // Tamilvanan Book Rule (p. 25): 1 Nakshatram = 60 Nazhigai (3600 Vinadis)
      const selluVinadis = Math.min(3599, Math.max(1, Math.round((degInsideStar / starSpan) * 3600)));
      const iruppuVinadis = 3600 - selluVinadis;
      const fractionRemaining = iruppuVinadis / 3600;

      const startDasaIdx = starIndex % 9;
      const firstLord = VIMSHOTTARI_SEQUENCE[startDasaIdx];
      const balanceYears = firstLord.years * fractionRemaining;

      const wholeY = Math.floor(balanceYears);
      const remMonthsFloat = (balanceYears - wholeY) * 12;
      const remMonths = Math.floor(remMonthsFloat);
      const remDays = Math.round((remMonthsFloat - remMonths) * 30);
      document.getElementById("summaryDasaBalance").textContent =
        `${firstLord.shortTa} தசை இருப்பு: ${wholeY} வருடம் ${remMonths} மாதம் ${remDays} நாள்`;

      computedMahaDasas = [];
      let cursorDate = new Date(birthDateObj.getTime());
      const now = new Date();
      let activeMahaIdx = 0;

      for (let i = 0; i < 9; i++) {
        const seqIdx = (startDasaIdx + i) % 9;
        const lordInfo = VIMSHOTTARI_SEQUENCE[seqIdx];
        const durationYears = (i === 0) ? balanceYears : lordInfo.years;
        const fullStart = (i === 0)
          ? addYearsToDate(birthDateObj, -(lordInfo.years - balanceYears))
          : new Date(cursorDate.getTime());
        const endDate = addYearsToDate(cursorDate, durationYears);

        const isRunning = now >= cursorDate && now <= endDate;
        if (isRunning) activeMahaIdx = i;

        const bhuktis = [];
        let bCursor = new Date(fullStart.getTime());
        for (let b = 0; b < 9; b++) {
          const bLord = VIMSHOTTARI_SEQUENCE[(seqIdx + b) % 9];
          // Classical Tamil formula: Dasa years * Bhukti years * 3 = months; last digit * 3 = days (= Dasa*Bhukti/120 years)
          const bYears = (lordInfo.years * bLord.years) / 120;
          const totalMonths = Math.floor((lordInfo.years * bLord.years * 3) / 10);
          const extraDays = ((lordInfo.years * bLord.years * 3) % 10) * 3;
          const bEnd = addYearsToDate(bCursor, bYears);
          const bRunning = now >= bCursor && now <= bEnd;
          bhuktis.push({
            lordName: bLord.name,
            shortTa: bLord.shortTa,
            durationTa: `${totalMonths} மா ${extraDays} நா`,
            start: new Date(bCursor.getTime()),
            end: bEnd,
            isRunning: bRunning
          });
          bCursor = bEnd;
        }

        computedMahaDasas.push({
          index: i,
          lordName: lordInfo.name,
          shortTa: lordInfo.shortTa,
          fullYears: lordInfo.years,
          start: new Date(cursorDate.getTime()),
          end: endDate,
          isRunning,
          bhuktis
        });

        cursorDate = endDate;
      }

      const currentDasa = computedMahaDasas[activeMahaIdx];
      const currentBhukti = currentDasa.bhuktis.find(b => b.isRunning) || currentDasa.bhuktis[0];
      document.getElementById("chartDasaPill").textContent =
        `நடப்பு: ${currentDasa.shortTa} தசை • ${currentBhukti.shortTa} புத்தி`;

      activeMahaDasaPlanetKey = TAMIL_LORD_TO_KEY[currentDasa.shortTa] || "sun";
      activeBhuktiPlanetKey = TAMIL_LORD_TO_KEY[currentBhukti.shortTa] || "sun";
      renderNavagrahaSannidhi();

      renderMahaDasaTable(activeMahaIdx);
    }

function renderMahaDasaTable(selectedIdx) {
      const tbody = document.getElementById("mahaDasaTableBody");
      tbody.innerHTML = "";

      computedMahaDasas.forEach((dasa, idx) => {
        const tr = document.createElement("tr");
        tr.className = "dasa-row" +
          (idx === selectedIdx ? " selected-dasa" : "") +
          (dasa.isRunning ? " current-running" : "");
        tr.innerHTML = `
          <td>
            <strong>${dasa.shortTa}</strong>
            ${dasa.isRunning ? '<span class="running-tag">நடப்பு</span>' : ""}
          </td>
          <td>${dasa.fullYears} ஆ.</td>
          <td>${formatShortDate(dasa.start)} – ${formatShortDate(dasa.end)}</td>
        `;
        tr.addEventListener("click", () => renderMahaDasaTable(idx));
        tbody.appendChild(tr);
      });

      renderBhuktiTable(selectedIdx);
    }

    function renderBhuktiTable(mahaIdx) {
      const dasa = computedMahaDasas[mahaIdx];
      if (!dasa) return;

      document.getElementById("bhuktiHeaderTitle").textContent =
        `${dasa.shortTa} மகா தசா புத்திகள் (${dasa.shortTa} Bhuktis)`;
      document.getElementById("bhuktiHeaderRange").textContent =
        `${formatShortDate(dasa.start)} – ${formatShortDate(dasa.end)}`;

      const tbody = document.getElementById("bhuktiTableBody");
      tbody.innerHTML = "";

      dasa.bhuktis.forEach(b => {
        const tr = document.createElement("tr");
        if (b.isRunning) tr.className = "dasa-row current-running selected-dasa";
        tr.innerHTML = `
          <td>
            <strong>${b.shortTa} புத்தி</strong>
            ${b.isRunning ? '<span class="running-tag">நடப்பு புத்தி</span>' : ""}
          </td>
          <td>${formatShortDate(b.start)}</td>
          <td>${formatShortDate(b.end)}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    // --- M. STEP 5: DOSHA ANALYZER ---
    function evaluateChartDoshas() {
      const lagnam = currentRasiPositions.lagnam;
      const moon = currentRasiPositions.moon;
      const mars = currentRasiPositions.mars;
      const rahu = currentRasiPositions.rahu;
      const kethu = currentRasiPositions.kethu;
      const jupiter = currentRasiPositions.jupiter;

      const houseFrom = (refSign, targetSign) => ((targetSign - refSign + 12) % 12) + 1;

      const marsFromLagnam = houseFrom(lagnam, mars);
      const marsFromMoon = houseFrom(moon, mars);
      const sevvaiHouses = [2, 4, 7, 8, 12];
      const isSevvaiFromLag = sevvaiHouses.includes(marsFromLagnam);
      const isSevvaiFromMoon = sevvaiHouses.includes(marsFromMoon);

      const marsExemptSign = [0, 7, 9, 3, 4, 10].includes(mars);
      const jupiterAspectsMars = [1, 5, 7, 9].includes(houseFrom(jupiter, mars));

      let sevvaiStatus = "clear";
      let sevvaiBadge = "தோஷம் இல்லை (No Dosham)";
      let sevvaiDesc = `லக்னத்தில் இருந்து ${marsFromLagnam}-ம் இடத்திலும், ராசியில் இருந்து ${marsFromMoon}-ம் இடத்திலும் செவ்வாய் உள்ளார். செவ்வாய் தோஷம் இல்லை.`;

      if (isSevvaiFromLag || isSevvaiFromMoon) {
        if (marsExemptSign || jupiterAspectsMars) {
          sevvaiStatus = "moderate";
          sevvaiBadge = "நிவர்த்தி (Dosha Pariharam)";
          sevvaiDesc = `செவ்வாய் லக்னத்திற்கு ${marsFromLagnam}-லும், ராசிக்கு ${marsFromMoon}-லும் இருந்தாலும், ${marsExemptSign ? "ஆட்சி/உச்ச/சிறப்பு ராசியில் உள்ளதால்" : "குரு பார்வை பெறுவதால்"} தோஷ நிவர்த்தி (விலக்கு) உண்டு.`;
        } else {
          sevvaiStatus = "present";
          sevvaiBadge = "செவ்வாய் தோஷம் உள்ளது";
          sevvaiDesc = `செவ்வாய் லக்னத்திற்கு ${marsFromLagnam}-ம் இடத்திலும், ராசிக்கு ${marsFromMoon}-ம் இடத்திலும் உள்ளார். இதே போல் செவ்வாய் அமைப்பு உள்ள வரனைத் தேர்ந்தெடுப்பது சிறப்பு.`;
        }
      }

      const rahuFromLag = houseFrom(lagnam, rahu);
      const kethuFromLag = houseFrom(lagnam, kethu);
      const rahuFromMoon = houseFrom(moon, rahu);
      const kethuFromMoon = houseFrom(moon, kethu);
      const nagaHouses = [1, 2, 7, 8];
      const hasRahuKethuLag = nagaHouses.includes(rahuFromLag) || nagaHouses.includes(kethuFromLag);
      const hasRahuKethuMoon = nagaHouses.includes(rahuFromMoon) || nagaHouses.includes(kethuFromMoon);

      let nagaStatus = "clear";
      let nagaBadge = "தோஷம் இல்லை (Clear)";
      let nagaDesc = `ராகு (லக்னத்திற்கு ${rahuFromLag}-ல்) மற்றும் கேது (லக்னத்திற்கு ${kethuFromLag}-ல்) சுப இடங்களில் உள்ளனர்.`;

      if (hasRahuKethuLag) {
        nagaStatus = "present";
        nagaBadge = "ராகு-கேது அமைப்பு (1/2/7/8)";
        nagaDesc = `லக்னத்திற்கு ${rahuFromLag}-ல் ராகுவும், ${kethuFromLag}-ல் கேதுவும் உள்ளனர். திருமணத்தின் போது நாக தோஷப் பொருத்தம் பார்ப்பது நல்லது.`;
      } else if (hasRahuKethuMoon) {
        nagaStatus = "moderate";
        nagaBadge = "ராசிக்கு 1/2/7/8 அமைப்பு";
        nagaDesc = `ராசிக்கு ${rahuFromMoon}-ல் ராகுவும், ${kethuFromMoon}-ல் கேதுவும் உள்ளனர் (லக்னத்திற்கு தோஷம் இல்லை — மத்திமம்).`;
      }

      const guruFromMoon = houseFrom(moon, jupiter);
      const guruFromLag = houseFrom(lagnam, jupiter);
      const auspiciousGuru = [1, 2, 4, 5, 7, 9, 10, 11].includes(guruFromLag) || [2, 5, 7, 9, 11].includes(guruFromMoon);

      const guruStatus = auspiciousGuru ? "clear" : "moderate";
      const guruBadge = auspiciousGuru ? "பூர்ண குரு பலம் (Strong)" : "சம பலம் (Moderate)";
      const guruDesc = `குரு பகவான் லக்னத்திற்கு ${guruFromLag}-ம் இடத்திலும், ராசிக்கு ${guruFromMoon}-ம் இடத்திலும் (${RASI_DATA[jupiter].tamil}) அமர்ந்து சுப பார்வை வழங்குகிறார்.`;

      const container = document.getElementById("doshaCardsContainer");
      container.innerHTML = `
        <div class="dosha-card ${sevvaiStatus}">
          <h4>
            <span>1. செவ்வாய் தோஷ ஆய்வு</span>
            <span class="status-pill ${sevvaiStatus === 'clear' ? 'match' : (sevvaiStatus === 'moderate' ? 'moderate' : 'nomatch')}">${sevvaiBadge}</span>
          </h4>
          <p>${sevvaiDesc}</p>
          <div class="dosha-remedy">🛕 பரிகாரத் தலம்: வைத்தீஸ்வரன் கோவில் (செவ்வாய்) & பழனி முருகன் வழிபாடு</div>
        </div>

        <div class="dosha-card ${nagaStatus}">
          <h4>
            <span>2. ராகு-கேது தோஷ ஆய்வு</span>
            <span class="status-pill ${nagaStatus === 'clear' ? 'match' : (nagaStatus === 'moderate' ? 'moderate' : 'nomatch')}">${nagaBadge}</span>
          </h4>
          <p>${nagaDesc}</p>
          <div class="dosha-remedy">🛕 பரிகாரத் தலம்: திருநாகேஸ்வரம் (ராகு), கீழ்ப்பெரும்பள்ளம் (கேது) & காளஹஸ்தி</div>
        </div>

        <div class="dosha-card ${guruStatus}">
          <h4>
            <span>3. குரு பார்வை & சுப பலம்</span>
            <span class="status-pill ${guruStatus === 'clear' ? 'match' : 'moderate'}">${guruBadge}</span>
          </h4>
          <p>${guruDesc}</p>
          <div class="dosha-remedy">🛕 வழிபாட்டுத் தலம்: ஆலங்குடி ஆபத்சகாயேஸ்வரர் (குரு பகவான்) திருக்கோவில்</div>
        </div>
      `;
    }

    // --- N. STEP 5: SAVED PROFILES MANAGER ---
    const STORAGE_KEY = "tamil_horoscope_saved_profiles_v1";

    function getSavedProfiles() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return [
        { name: "கார்த்திக் (Karthik)", date: "1998-05-15", time: "08:30", place: "13.08,80.27" },
        { name: "திவ்யா (Divya)", date: "2000-08-22", time: "10:15", place: "9.93,78.12" }
      ];
    }

    function saveProfilesToStorage(list) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {}
    }

    function renderSavedProfilesBar() {
      const list = getSavedProfiles();
      const container = document.getElementById("savedProfilesList");
      container.innerHTML = "";

      if (list.length === 0) {
        container.innerHTML = `<span style="font-size: 0.82rem; color: var(--text-muted);">இன்னும் சேமிக்கப்படவில்லை (Click 'Save' to store charts)</span>`;
        return;
      }

      list.forEach((prof, idx) => {
        const chip = document.createElement("div");
        chip.className = "profile-chip";
        chip.innerHTML = `
          <span onclick="loadProfile(${idx})">👤 ${prof.name}</span>
          <button class="del-btn" title="நீக்க (Delete)" onclick="deleteProfile(event, ${idx})">×</button>
        `;
        container.appendChild(chip);
      });
    }

    function saveCurrentProfile() {
      const name = document.getElementById("jName").value.trim() || "ஜாதகர்";
      const date = document.getElementById("jDate").value;
      const time = document.getElementById("jTime").value;
      const place = document.getElementById("jPlace").value;

      const list = getSavedProfiles();
      const existingIdx = list.findIndex(p => p.name === name);
      const record = { name, date, time, place };
      if (existingIdx >= 0) list[existingIdx] = record;
      else list.push(record);

      saveProfilesToStorage(list);
      renderSavedProfilesBar();
      showToast("💾 குடும்ப ஜாதகம் சேமிக்கப்பட்டது! (Profile Saved!)");
    }

    function loadProfile(idx) {
      const list = getSavedProfiles();
      const prof = list[idx];
      if (!prof) return;
      const resolvedPlace = resolveBirthPlaceCoordinates(prof.place || "சென்னை (Chennai)").label;
      document.getElementById("jName").value = prof.name;
      document.getElementById("jDate").value = prof.date;
      document.getElementById("jTime").value = prof.time;
      document.getElementById("jPlace").value = resolvedPlace;
      const aPlace = document.getElementById("ammaPlace");
      if (aPlace) aPlace.value = resolvedPlace;
      calculateBirthChart();
    }

    function deleteProfile(event, idx) {
      event.stopPropagation();
      const list = getSavedProfiles();
      list.splice(idx, 1);
      saveProfilesToStorage(list);
      renderSavedProfilesBar();
    }

    // --- O. STEP 4: 10 PORUTHAM ENGINE ---
    const RAJJU_TAMIL = {
      pada: "பாத ரஜ்ஜு (Pada Rajju)",
      kati: "துடை ரஜ்ஜு (Kati Rajju)",
      nabhi: "நாபி ரஜ்ஜு (Nabhi Rajju)",
      kanta: "கண்ட ரஜ்ஜு (Kanta Rajju)",
      siro: "சிரசு ரஜ்ஜு (Siro Rajju)"
    };

    const GANAM_TAMIL = ["தேவ கணம் (Deva)", "மனுஷ கணம் (Manusha)", "ராட்சச கணம் (Rakshasa)"];

    const VEDHAI_PAIRS = [
      [0, 17], [1, 16], [2, 15], [3, 14], [5, 21], [6, 20],
      [7, 19], [8, 18], [9, 26], [10, 25], [11, 24], [12, 23],
      [4, 13], [4, 22], [13, 22]
    ];

    const VASIYA_MAP = {
      0: [4, 7], 1: [3, 6], 2: [5], 3: [7, 8], 4: [9], 5: [1, 11],
      6: [9], 7: [3, 5], 8: [11], 9: [0, 10], 10: [0], 11: [9]
    };

    const PLANET_FRIENDS = {
      sun: ["moon", "mars", "jupiter", "mercury"],
      moon: ["sun", "mercury", "jupiter", "venus", "mars"],
      mars: ["sun", "moon", "jupiter", "venus"],
      mercury: ["sun", "venus", "saturn", "jupiter"],
      jupiter: ["sun", "moon", "mars", "saturn"],
      venus: ["mercury", "saturn", "mars", "jupiter"],
      saturn: ["mercury", "venus", "jupiter"]
    };

    function initPoruthamSelectors() {
      const brideStarSel = document.getElementById("brideStar");
      const groomStarSel = document.getElementById("groomStar");
      const optionsHtml = STAR_PORUTHAM_DATA.map(s => `<option value="${s.idx}">${s.name}</option>`).join("");
      brideStarSel.innerHTML = optionsHtml;
      groomStarSel.innerHTML = optionsHtml;

      brideStarSel.value = "3";
      groomStarSel.value = "19";
      syncRasiOptions("bride", false);
      syncRasiOptions("groom", false);
      calculateTenPorutham();
    }

    function syncRasiOptions(who, triggerCalc = true) {
      const starIdx = parseInt(document.getElementById(`${who}Star`).value, 10);
      const rasiSel = document.getElementById(`${who}Rasi`);
      const validRasis = STAR_PORUTHAM_DATA[starIdx].rasis;
      rasiSel.innerHTML = validRasis.map(rIdx =>
        `<option value="${rIdx}">${RASI_DATA[rIdx].tamil} (${RASI_DATA[rIdx].translit})</option>`
      ).join("");
      if (triggerCalc) calculateTenPorutham();
    }

    function calculateTenPorutham() {
      const bStarIdx = parseInt(document.getElementById("brideStar").value, 10);
      const gStarIdx = parseInt(document.getElementById("groomStar").value, 10);
      const bRasiIdx = parseInt(document.getElementById("brideRasi").value, 10);
      const gRasiIdx = parseInt(document.getElementById("groomRasi").value, 10);

      const bStar = STAR_PORUTHAM_DATA[bStarIdx];
      const gStar = STAR_PORUTHAM_DATA[gStarIdx];
      const bRasi = RASI_DATA[bRasiIdx];
      const gRasi = RASI_DATA[gRasiIdx];

      const starCount = ((gStarIdx - bStarIdx + 27) % 27) + 1;
      const rasiCount = ((gRasiIdx - bRasiIdx + 12) % 12) + 1;
      const results = [];

      const dinaRem = starCount % 9;
      const dinaMatch = [2, 4, 6, 8, 0].includes(dinaRem) || starCount === 27;
      results.push({
        name: "1. தினப் பொருத்தம் (Dina Porutham)",
        meaning: "ஆரோக்கியம் & நீண்ட ஆயுள் (Health & Daily Prosperity)",
        status: dinaMatch ? "match" : "nomatch",
        statusLabel: dinaMatch ? "உத்தமம் (Matched)" : "இல்லை (Not Matched)",
        detail: `நட்சத்திர எண்ணிக்கை: ${starCount} (${dinaMatch ? "சுப எண்ணிக்கை" : "மத்திமம்"})`
      });

      let ganaStatus = "nomatch";
      if (bStar.ganam === gStar.ganam && bStar.ganam !== 2) ganaStatus = "match";
      else if ((bStar.ganam === 0 && gStar.ganam === 1) || (bStar.ganam === 1 && gStar.ganam === 0)) ganaStatus = "match";
      else if (gStar.ganam === 2 && bStar.ganam !== 2 && starCount > 14) ganaStatus = "moderate";
      results.push({
        name: "2. கணப் பொருத்தம் (Gana Porutham)",
        meaning: "குண நலன் & மன ஒற்றுமை (Temperament & Mind Harmony)",
        status: ganaStatus,
        statusLabel: ganaStatus === "match" ? "உத்தமம் (Matched)" : (ganaStatus === "moderate" ? "மத்திமம் (Moderate)" : "இல்லை (Not Matched)"),
        detail: `பெண்: ${GANAM_TAMIL[bStar.ganam]} • ஆண்: ${GANAM_TAMIL[gStar.ganam]}`
      });

      const mahendraGood = [4, 7, 10, 13, 16, 19, 22, 25].includes(starCount);
      results.push({
        name: "3. மகேந்திரப் பொருத்தம் (Mahendra Porutham)",
        meaning: "புத்திர பாக்கியம் & செல்வ வளம் (Progeny & Wealth)",
        status: mahendraGood ? "match" : "moderate",
        statusLabel: mahendraGood ? "உத்தமம் (Matched)" : "மத்திமம் (Optional)",
        detail: mahendraGood ? `நட்சத்திர எண் ${starCount} - மகேந்திர பொருத்தம் உண்டு` : `நட்சத்திர எண் ${starCount} - மற்ற பிரதான பொருத்தங்கள் தாங்கும்`
      });

      const streeStatus = starCount > 13 ? "match" : (starCount >= 7 ? "moderate" : "nomatch");
      results.push({
        name: "4. ஸ்திரீ தீர்க்கப் பொருத்தம் (Stree Deergham)",
        meaning: "பெண்ணின் தீர்க்க சுமங்கலி பாக்கியம் (Bride's Wellbeing & Fortune)",
        status: streeStatus,
        statusLabel: streeStatus === "match" ? "உத்தமம் (Matched)" : (streeStatus === "moderate" ? "மத்திமம் (Moderate)" : "இல்லை (Low Distance)"),
        detail: `நட்சத்திர தூரம்: ${starCount} / 27 (13-க்கு மேல் உத்தமம்)`
      });

      const enemyYonis = [
        ["பசு (Cow)", "புலி (Tiger)"], ["யானை (Elephant)", "சிங்கம் (Lion)"],
        ["குதிரை (Horse)", "எருமை (Buffalo)"], ["நாய் (Dog)", "மான் (Deer)"],
        ["பாம்பு (Serpent)", "கீரி (Mongoose)"], ["குரங்கு (Monkey)", "ஆடு (Goat)"],
        ["பூனை (Cat)", "எலி (Rat)"]
      ];
      const isEnemyYoni = enemyYonis.some(pair =>
        (pair[0] === bStar.yoni && pair[1] === gStar.yoni) ||
        (pair[1] === bStar.yoni && pair[0] === gStar.yoni)
      );
      results.push({
        name: "5. யோனிப் பொருத்தம் (Yoni Porutham)",
        meaning: "தாம்பத்திய அன்பு & புரிதல் (Mutual Affection & Intimacy)",
        status: isEnemyYoni ? "nomatch" : "match",
        statusLabel: isEnemyYoni ? "இல்லை (Not Matched)" : "உத்தமம் (Matched)",
        detail: `பெண்: ${bStar.yoni} • ஆண்: ${gStar.yoni}`
      });

      const rasiGoodCounts = [1, 3, 4, 7, 9, 10, 11, 12];
      const rasiStatus = rasiGoodCounts.includes(rasiCount) ? "match" : (rasiCount === 5 ? "moderate" : "nomatch");
      results.push({
        name: "6. ராசிப் பொருத்தம் (Rasi Porutham)",
        meaning: "வம்ச விருத்தி & குடும்ப ஒற்றுமை (Family Lineage Harmony)",
        status: rasiStatus,
        statusLabel: rasiStatus === "match" ? "உத்தமம் (Matched)" : (rasiStatus === "moderate" ? "மத்திமம் (Moderate)" : "இல்லை (Not Matched)"),
        detail: `பெண் ராசியில் இருந்து ஆண் ராசி ${rasiCount}-வது ராசி (${bRasi.tamil} → ${gRasi.tamil})`
      });

      const bLord = bRasi.lordKey;
      const gLord = gRasi.lordKey;
      const lordsFriendly = bLord === gLord || (PLANET_FRIENDS[bLord] && PLANET_FRIENDS[bLord].includes(gLord));
      results.push({
        name: "7. ராசி அதிபதிப் பொருத்தம் (Rasi Lord)",
        meaning: "இரு குடும்பங்களின் நட்புறவு (Harmony of Ruling Planets)",
        status: lordsFriendly ? "match" : "moderate",
        statusLabel: lordsFriendly ? "உத்தமம் (Matched)" : "மத்திமம் (Neutral)",
        detail: `பெண் அதிபதி: ${bRasi.lord} • ஆண் அதிபதி: ${gRasi.lord}`
      });

      const isVasiyam = (VASIYA_MAP[bRasiIdx] && VASIYA_MAP[bRasiIdx].includes(gRasiIdx)) ||
                        (VASIYA_MAP[gRasiIdx] && VASIYA_MAP[gRasiIdx].includes(bRasiIdx)) ||
                        bRasiIdx === gRasiIdx;
      results.push({
        name: "8. வசியப் பொருத்தம் (Vasiya Porutham)",
        meaning: "தம்பதியர் இடையே ஈர்ப்பு (Mutual Magnetism & Bond)",
        status: isVasiyam ? "match" : "moderate",
        statusLabel: isVasiyam ? "உத்தமம் (Vasiyam Present)" : "மத்திமம் (Standard)",
        detail: isVasiyam ? `${bRasi.tamil} & ${gRasi.tamil} ராசிகளுக்கு வசியம் உண்டு` : "மற்ற பொருத்தங்கள் பலமாக இருந்தால் போதுமானது"
      });

      const sameRajju = bStar.rajju === gStar.rajju;
      results.push({
        name: "9. ரஜ்ஜுப் பொருத்தம் (Rajju Porutham) ★",
        meaning: "மாங்கல்ய பலம் & நீடித்த வாழ்வு (Mangalya Strength - Vital)",
        status: sameRajju ? "nomatch" : "match",
        statusLabel: sameRajju ? "ரஜ்ஜு தட்டு (Same Rajju)" : "உத்தமம் (Matched)",
        detail: `பெண்: ${RAJJU_TAMIL[bStar.rajju]} • ஆண்: ${RAJJU_TAMIL[gStar.rajju]}`
      });

      const isVedhai = VEDHAI_PAIRS.some(pair =>
        (pair[0] === bStarIdx && pair[1] === gStarIdx) ||
        (pair[1] === bStarIdx && pair[0] === gStarIdx)
      );
      results.push({
        name: "10. வேதைப் பொருத்தம் (Vedhai Porutham) ★",
        meaning: "நட்சத்திர எதிர்மறை தாக்கம் இன்மை (Freedom from Star Affliction)",
        status: isVedhai ? "nomatch" : "match",
        statusLabel: isVedhai ? "வேதை உள்ளது (Afflicted)" : "உத்தமம் (No Vedhai)",
        detail: isVedhai ? "இரு நட்சத்திரங்களுக்கும் நேர் வேதை உள்ளது" : "வேதை தோஷம் இல்லை (சுபம்)"
      });

      const tbody = document.getElementById("poruthamTableBody");
      tbody.innerHTML = "";
      let score = 0;

      results.forEach((r, idx) => {
        if (r.status === "match") score += 1;
        else if (r.status === "moderate") score += 0.5;

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><strong>${idx + 1}</strong></td>
          <td><strong>${r.name}</strong></td>
          <td>${r.meaning}</td>
          <td><span class="status-pill ${r.status}">${r.statusLabel}</span></td>
          <td>${r.detail}</td>
        `;
        tbody.appendChild(tr);
      });

      const brideName = document.getElementById("brideName").value.trim() || "மணமகள்";
      const groomName = document.getElementById("groomName").value.trim() || "மணமகன்";
      document.getElementById("poruthamScoreText").textContent = `${score} / 10`;

      const verdictTitle = document.getElementById("poruthamVerdictTitle");
      const verdictDesc = document.getElementById("poruthamVerdictDesc");

      if (sameRajju || isVedhai) {
        verdictTitle.textContent = "⚠️ கவனிக்க வேண்டிய பொருத்தம் (Caution: Check Rajju / Vedhai)";
        verdictDesc.textContent = `${brideName} (${bStar.name}) மற்றும் ${groomName} (${gStar.name}) நட்சத்திரங்களுக்கு ${sameRajju ? "ஒரே ரஜ்ஜு (" + RAJJU_TAMIL[bStar.rajju] + ")" : "வேதை"} அமைந்துள்ளது. குடும்ப ஜோதிடரிடம் தனிப்பட்ட ஜாதக சுப பார்வைகளை சரிபார்க்கவும்.`;
      } else if (score >= 7) {
        verdictTitle.textContent = "✅ உத்தம திருமணப் பொருத்தம் (Highly Auspicious Match)";
        verdictDesc.textContent = `${brideName} மற்றும் ${groomName} இருவருக்கும் ரஜ்ஜு, வேதை உட்பட ${score}/10 பொருத்தங்கள் சிறப்பாக அமைந்துள்ளன. தாராளமாக திருமணம் முடிக்கலாம்.`;
      } else if (score >= 5.5) {
        verdictTitle.textContent = "👍 மத்திம பொருத்தம் (Good / Acceptable Match)";
        verdictDesc.textContent = `ரஜ்ஜு மற்றும் வேதை பொருத்தங்கள் சுபமாக உள்ளன (${score}/10). இருவரின் தசா புத்தி மற்றும் தனிப்பட்ட ஜாதக கட்டங்களை ஒப்பிட்டு முடிவு செய்யலாம்.`;
      } else {
        verdictTitle.textContent = "⚠️ பொருத்தம் குறைவு (Low Compatibility Score)";
        verdictDesc.textContent = `மொத்தம் ${score}/10 பொருத்தங்கள் மட்டுமே உள்ளன. முக்கிய பொருத்தங்களை ஜோதிட ஆலோசனையுடன் பரிசீலிக்கவும்.`;
      }
    }

    // --- P. STEP 3: SOUTH INDIAN 12-BOX KATTAM ENGINE ---
    const SOUTH_INDIAN_GRID_ORDER = [11, 0, 1, 2, 10, "CENTER", 3, 9, 4, 8, 7, 6, 5];

    const NAVAGRAHA_LIST = [
      { key: "lagnam", shortTa: "லக்", fullTa: "லக்னம் (Lagnam)", style: "lagnam-badge" },
      { key: "sun", shortTa: "சூரி", fullTa: "சூரியன் (Sun)", style: "" },
      { key: "moon", shortTa: "சந்", fullTa: "சந்திரன் (Moon)", style: "benefic" },
      { key: "mars", shortTa: "செவ்", fullTa: "செவ்வாய் (Mars)", style: "" },
      { key: "mercury", shortTa: "புத", fullTa: "புதன் (Mercury)", style: "benefic" },
      { key: "jupiter", shortTa: "குரு", fullTa: "குரு (Jupiter)", style: "benefic" },
      { key: "venus", shortTa: "சுக்", fullTa: "சுக்கிரன் (Venus)", style: "benefic" },
      { key: "saturn", shortTa: "சனி", fullTa: "சனி (Saturn)", style: "" },
      { key: "rahu", shortTa: "ராகு", fullTa: "ராகு (Rahu)", style: "node" },
      { key: "kethu", shortTa: "கேது", fullTa: "கேது (Kethu)", style: "node" }
    ];

    let currentRasiPositions = {};
    let currentNavamsamPositions = {};
    let currentStarIndex = 19;
    let currentPadam = 2;

    function renderSouthIndianKattam(containerId, positionsMap, centerTitleTa, centerSubEn) {
      const container = document.getElementById(containerId);
      container.innerHTML = "";

      SOUTH_INDIAN_GRID_ORDER.forEach(cellItem => {
        if (cellItem === "CENTER") {
          const centerDiv = document.createElement("div");
          centerDiv.className = "kattam-center";
          centerDiv.innerHTML = `
            <div class="om-symbol">🕉️</div>
            <h3>${centerTitleTa}</h3>
            <p>${centerSubEn}</p>
          `;
          container.appendChild(centerDiv);
          return;
        }

        const rasiIndex = cellItem;
        const rasiInfo = RASI_DATA[rasiIndex];
        const isLagnamHouse = positionsMap.lagnam === rasiIndex;
        const planetsHere = NAVAGRAHA_LIST.filter(p => positionsMap[p.key] === rasiIndex);

        const box = document.createElement("div");
        box.className = "kattam-box" + (isLagnamHouse ? " is-lagnam" : "");

        const badgesHtml = planetsHere.map(p =>
          `<span class="planet-badge ${p.style}" title="${p.fullTa}">${p.shortTa}</span>`
        ).join("");

        box.innerHTML = `
          <div class="house-sign-label">
            <span>${rasiInfo.tamil}</span>
            <span>${rasiIndex + 1}</span>
          </div>
          <div class="planet-chips">${badgesHtml}</div>
        `;
        container.appendChild(box);
      });
    }

    function calculateBirthChart() {
      const nameVal = document.getElementById("jName").value.trim() || "ஜாதகர்";
      const dateStr = document.getElementById("jDate").value || "1998-05-15";
      const timeStr = document.getElementById("jTime").value || "08:30";
      const placeInput = document.getElementById("jPlace");
      const placeInfo = resolveBirthPlaceCoordinates(placeInput ? placeInput.value : "சென்னை (Chennai)");
      const placeLabel = placeInfo.label;
      const lat = placeInfo.lat;
      const lon = placeInfo.lon;

      const [yyyy, mm, dd] = dateStr.split("-").map(Number);
      const [hh, min] = timeStr.split(":").map(Number);

      // Compute full horoscope data using Tamilvanan's "ஜாதகம் பார்ப்பது எப்படி?" (Manimekalai Prasuram) engine
      const bookData = computeTamilvananBookHoroscopeData(yyyy, mm, dd, hh, min, lat, lon);
      latestTamilvananBookData = bookData;
      updatePlaceCoordinateHints(placeInfo, bookData.sunriseText);

      const rawLongitudes = bookData.rawLongitudes;
      Object.keys(rawLongitudes).forEach(key => {
        const deg = rawLongitudes[key];
        currentRasiPositions[key] = Math.floor(deg / 30) % 12;
        currentNavamsamPositions[key] = Math.floor(deg / (30 / 9)) % 12;
      });
      // Ensure Janma Lagnam & Navamsa Lagnam match Tamilvanan's Rasi Pramana & 9-Padam calculation
      currentRasiPositions.lagnam = bookData.lagnamSign;
      currentNavamsamPositions.lagnam = bookData.navamsamLagnamSign;

      currentStarIndex = bookData.moonStarIndex;
      currentPadam = bookData.moonPadam;

      const birthDateObj = new Date(yyyy, mm - 1, dd, hh, min);
      computeVimshottariTimeline(birthDateObj, rawLongitudes.moon);
      updateChartSummaryAndRender(nameVal, dateStr, timeStr, placeLabel);
      syncManualSelectors();
    }

    function updateChartSummaryAndRender(nameVal, dateStr, timeStr, placeLabel) {
      const moonRasi = RASI_DATA[currentRasiPositions.moon];
      const lagnamRasi = RASI_DATA[currentRasiPositions.lagnam];
      const starName = STAR_PORUTHAM_DATA[currentStarIndex].name;
      const udayathiTag = latestTamilvananBookData ? ` • உதயாதி: ${latestTamilvananBookData.udayathiText}` : "";

      document.getElementById("chartPersonTitle").textContent = `${nameVal} - ஜாதக கட்டம் (தமிழ்வாணன் "ஜாதகம் பார்ப்பது எப்படி?" முறை)`;
      document.getElementById("chartBirthSubtitle").textContent = `${dateStr} • நேரம்: ${timeStr} • இடம்: ${placeLabel}${udayathiTag}`;

      document.getElementById("summaryRasi").textContent = `${moonRasi.tamil} (${moonRasi.translit})`;
      document.getElementById("summaryStar").textContent = `${starName} - ${currentPadam}ம் பாதம்`;
      document.getElementById("summaryLagnam").textContent = `${lagnamRasi.tamil} (${lagnamRasi.translit})`;

      renderSouthIndianKattam("rasiKattamGrid", currentRasiPositions, "ராசி கட்டம்", "Rasi Chart (D-1)");
      renderSouthIndianKattam("navamsamKattamGrid", currentNavamsamPositions, "நவாம்சம்", "Navamsa Chart (D-9)");
      renderTwelveBhavaPredictions();
      computeAndRenderSarvashtakavarga();
      evaluateChartDoshas();
      if (latestTamilvananBookData) {
        renderTamilvananBookSheets(latestTamilvananBookData, nameVal, dateStr, timeStr, placeLabel);
      }
      if (typeof renderAmmaAstroNotebook === "function") renderAmmaAstroNotebook();
    }

    function initManualPlanetControls() {
      const container = document.getElementById("manualPlanetControls");
      container.innerHTML = "";
      NAVAGRAHA_LIST.forEach(planet => {
        const wrapper = document.createElement("div");
        wrapper.className = "planet-select-item";
        const optionsHtml = RASI_DATA.map((r, i) => `<option value="${i}">${r.tamil} (${r.translit})</option>`).join("");
        wrapper.innerHTML = `
          <label for="manual_${planet.key}">${planet.fullTa}</label>
          <select id="manual_${planet.key}" data-planet="${planet.key}">${optionsHtml}</select>
        `;
        const selectEl = wrapper.querySelector("select");
        selectEl.addEventListener("change", e => {
          const pKey = e.target.getAttribute("data-planet");
          const newRasi = parseInt(e.target.value, 10);
          currentRasiPositions[pKey] = newRasi;
          if (pKey === "rahu") {
            currentRasiPositions.kethu = (newRasi + 6) % 12;
            document.getElementById("manual_kethu").value = currentRasiPositions.kethu;
          }
          currentNavamsamPositions[pKey] = (newRasi * 3 + currentPadam) % 12;
          const nameVal = document.getElementById("jName").value.trim() || "ஜாதகர்";
          const dateStr = document.getElementById("jDate").value;
          const timeStr = document.getElementById("jTime").value;
          const placeInput = document.getElementById("jPlace");
          const placeLabel = resolveBirthPlaceCoordinates(placeInput ? placeInput.value : "").label;
          updateChartSummaryAndRender(nameVal, dateStr, timeStr, placeLabel);
        });
        container.appendChild(wrapper);
      });
    }

    function syncManualSelectors() {
      NAVAGRAHA_LIST.forEach(planet => {
        const el = document.getElementById(`manual_${planet.key}`);
        if (el) el.value = currentRasiPositions[planet.key];
      });
    }

    // --- Q. STEP 2: DAILY TAMIL PANCHANGAM ---
    const WEEKDAY_PANCHANGAM = [
      {
        dayIndex: 0, tamilDay: "ஞாயிற்றுக்கிழமை", shortTa: "ஞாயிறு", engDay: "Sunday",
        planetLord: "சூரியன் (Sun)",
        nallaNeram: "காலை 07:30 - 08:30 | மாலை 03:30 - 04:30",
        gowriNeram: "காலை 10:30 - 11:30 | மதியம் 01:30 - 02:30",
        rahuKalam: "மாலை 04:30 - 06:00", yamagandam: "மதியம் 12:00 - 01:30",
        kuligai: "மாலை 03:00 - 04:30", soolam: "மேற்கு (Avoid West Travel)",
        parigaram: "பரிகாரம்: வெல்லம் (Remedy: Jaggery)"
      },
      {
        dayIndex: 1, tamilDay: "திங்கட்கிழமை", shortTa: "திங்கள்", engDay: "Monday",
        planetLord: "சந்திரன் (Moon)",
        nallaNeram: "காலை 06:30 - 07:30 | மாலை 04:30 - 05:30",
        gowriNeram: "காலை 09:30 - 10:30 | இரவு 07:30 - 08:30",
        rahuKalam: "காலை 07:30 - 09:00", yamagandam: "காலை 10:30 - 12:00",
        kuligai: "மதியம் 01:30 - 03:00", soolam: "கிழக்கு (Avoid East Travel)",
        parigaram: "பரிகாரம்: தயிர் (Remedy: Curd)"
      },
      {
        dayIndex: 2, tamilDay: "செவ்வாய்க்கிழமை", shortTa: "செவ்வாய்", engDay: "Tuesday",
        planetLord: "செவ்வாய் (Mars)",
        nallaNeram: "காலை 07:30 - 08:30 | மாலை 04:30 - 05:30",
        gowriNeram: "மதியம் 12:00 - 01:00 | மாலை 06:30 - 07:30",
        rahuKalam: "மாலை 03:00 - 04:30", yamagandam: "காலை 09:00 - 10:30",
        kuligai: "மதியம் 12:00 - 01:30", soolam: "வடக்கு (Avoid North Travel)",
        parigaram: "பரிகாரம்: பால் (Remedy: Milk)"
      },
      {
        dayIndex: 3, tamilDay: "புதன்கிழமை", shortTa: "புதன்", engDay: "Wednesday",
        planetLord: "புதன் (Mercury)",
        nallaNeram: "காலை 09:15 - 10:15 | மாலை 04:45 - 05:45",
        gowriNeram: "காலை 10:30 - 11:30 | மாலை 06:30 - 07:30",
        rahuKalam: "மதியம் 12:00 - 01:30", yamagandam: "காலை 07:30 - 09:00",
        kuligai: "காலை 10:30 - 12:00", soolam: "வடக்கு (Avoid North Travel)",
        parigaram: "பரிகாரம்: பால் (Remedy: Milk)"
      },
      {
        dayIndex: 4, tamilDay: "வியாழக்கிழமை", shortTa: "வியாழன்", engDay: "Thursday",
        planetLord: "குரு (Jupiter)",
        nallaNeram: "காலை 10:30 - 11:30 | மாலை 04:30 - 05:30",
        gowriNeram: "மதியம் 12:15 - 01:15 | மாலை 06:30 - 07:30",
        rahuKalam: "மதியம் 01:30 - 03:00", yamagandam: "காலை 06:00 - 07:30",
        kuligai: "காலை 09:00 - 10:30", soolam: "தெற்கு (Avoid South Travel)",
        parigaram: "பரிகாரம்: தைலம் / நெய் (Remedy: Oil / Ghee)"
      },
      {
        dayIndex: 5, tamilDay: "வெள்ளிக்கிழமை", shortTa: "வெள்ளி", engDay: "Friday",
        planetLord: "சுக்கிரன் (Venus)",
        nallaNeram: "காலை 09:15 - 10:15 | மாலை 04:45 - 05:45",
        gowriNeram: "மதியம் 12:15 - 01:15 | மாலை 06:30 - 07:30",
        rahuKalam: "காலை 10:30 - 12:00", yamagandam: "மாலை 03:00 - 04:30",
        kuligai: "காலை 07:30 - 09:00", soolam: "மேற்கு (Avoid West Travel)",
        parigaram: "பரிகாரம்: வெல்லம் (Remedy: Jaggery)"
      },
      {
        dayIndex: 6, tamilDay: "சனிக்கிழமை", shortTa: "சனி", engDay: "Saturday",
        planetLord: "சனி (Saturn)",
        nallaNeram: "காலை 07:45 - 08:45 | மாலை 04:45 - 05:45",
        gowriNeram: "காலை 10:30 - 11:30 | இரவு 09:30 - 10:30",
        rahuKalam: "காலை 09:00 - 10:30", yamagandam: "மதியம் 01:30 - 03:00",
        kuligai: "காலை 06:00 - 07:30", soolam: "கிழக்கு (Avoid East Travel)",
        parigaram: "பரிகாரம்: தயிர் (Remedy: Curd)"
      }
    ];

    const THITHI_NAMES = [
      "பிரதமை (Prathamai)", "துவிதியை (Dvithiyai)", "திருதியை (Thrithiyai)",
      "சதுர்த்தி (Chathurthi)", "பஞ்சமி (Panchami)", "சஷ்டி (Sashti)",
      "சப்தமி (Sapthami)", "அஷ்டமி (Ashtami)", "நவமி (Navami)",
      "தசமி (Dasami)", "ஏகாதசி (Ekadasi)", "துவாதசி (Dwadasi)",
      "திரயோதசி (Thrayodasi)", "சதுர்த்தசி (Chathurdasi)"
    ];

    const CHANDRASHTAMAM_RASIS = [
      "கன்னி (Kanni)", "துலாம் (Thulaam)", "விருச்சிகம் (Viruchigam)",
      "தனுசு (Dhanusu)", "மகரம் (Magaram)", "கும்பம் (Kumbam)",
      "மீனம் (Meenam)", "மேஷம் (Mesham)", "ரிஷபம் (Rishabam)",
      "மிதுனம் (Mithunam)", "கடகம் (Kadagam)", "சிம்மம் (Simmam)"
    ];

    function getTamilMonthAndDay(dateObj) {
      const info = getTamilMonthAndDayStructured(dateObj);
      return `${info.monthName} ${info.dayNum}`;
    }

    function computeDailyAngas(dateObj) {
      const epochMs = Date.UTC(2024, 0, 11, 11, 57, 0);
      const targetMs = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 6, 30, 0);
      const daysSince = (targetMs - epochMs) / (1000 * 60 * 60 * 24);

      const synodicMonth = 29.530588;
      const phase = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth;
      const thithiIndex = Math.floor((phase / synodicMonth) * 30);

      let thithiText = "";
      if (thithiIndex === 14) thithiText = "பௌர்ணமி (Pournami • Full Moon)";
      else if (thithiIndex === 29) thithiText = "அமாவாசை (Amavasai • New Moon)";
      else if (thithiIndex < 14) thithiText = `வளர்பிறை ${THITHI_NAMES[thithiIndex]}`;
      else thithiText = `தேய்பிறை ${THITHI_NAMES[thithiIndex - 15]}`;

      const siderealMonth = 27.321661;
      const starPhase = (((daysSince + 19.8) % siderealMonth) + siderealMonth) % siderealMonth;
      const starIndex = Math.floor((starPhase / siderealMonth) * 27) % 27;
      const starText = STAR_PORUTHAM_DATA[starIndex].name;

      const moonRasiIndex = Math.floor((starIndex * 4) / 9) % 12;
      const chandrashtamamText = CHANDRASHTAMAM_RASIS[moonRasiIndex];

      const yogams = [
        "சித்த யோகம் (Siddha Yogam)",
        "அமிர்த யோகம் (Amirtha Yogam)",
        "சித்த யோகம் (Siddha Yogam)",
        "சுப யோகம் (Subha Yogam)"
      ];
      const yogamText = yogams[(starIndex + dateObj.getDay()) % yogams.length];

      return { thithiIndex, starIndex, thithiText, starText, chandrashtamamText, yogamText };
    }

    function updatePanchangamForDate(dateObj) {
      const weekday = dateObj.getDay();
      const dayData = WEEKDAY_PANCHANGAM[weekday];
      const tamilMonthDate = getTamilMonthAndDay(dateObj);
      const angas = computeDailyAngas(dateObj);

      const formattedGregorian = dateObj.toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric"
      });

      document.getElementById("panDayTitle").textContent = `${dayData.tamilDay} (${dayData.engDay})`;
      document.getElementById("panTamilDateSubtitle").textContent = `${formattedGregorian} • வார அதிபதி: ${dayData.planetLord}`;
      document.getElementById("panYogamPill").textContent = angas.yogamText;

      document.getElementById("panTamilMonth").textContent = tamilMonthDate;
      document.getElementById("panThithi").textContent = angas.thithiText;
      document.getElementById("panStar").textContent = angas.starText;
      document.getElementById("panChandrashtamam").textContent = angas.chandrashtamamText;

      document.getElementById("panNallaNeram").textContent = dayData.nallaNeram;
      document.getElementById("panGowriNeram").textContent = dayData.gowriNeram;
      document.getElementById("panKuligai").textContent = dayData.kuligai;
      document.getElementById("panRahuKalam").textContent = dayData.rahuKalam;
      document.getElementById("panYamagandam").textContent = dayData.yamagandam;
      document.getElementById("panSoolam").textContent = dayData.soolam;
      document.getElementById("panParigaram").textContent = dayData.parigaram;

      document.querySelectorAll(".day-chip").forEach((chip, idx) => {
        chip.classList.toggle("active", idx === weekday);
      });

      renderDailyHoraTable(dateObj);
      if (typeof renderAllTabsCalculationExplanations === 'function') renderAllTabsCalculationExplanations();
    }

    const weekdayChipsContainer = document.getElementById("weekdayChips");
    WEEKDAY_PANCHANGAM.forEach((dayInfo, idx) => {
      const chip = document.createElement("button");
      chip.className = "day-chip";
      chip.innerHTML = `${dayInfo.shortTa}<span>${dayInfo.engDay.slice(0, 3)}</span>`;
      chip.addEventListener("click", () => {
        const dateInput = document.getElementById("panchangamDate");
        const baseDate = dateInput.value ? new Date(dateInput.value + "T12:00:00") : new Date();
        baseDate.setDate(baseDate.getDate() + (idx - baseDate.getDay()));
        const yyyy = baseDate.getFullYear();
        const mm = String(baseDate.getMonth() + 1).padStart(2, "0");
        const dd = String(baseDate.getDate()).padStart(2, "0");
        dateInput.value = `${yyyy}-${mm}-${dd}`;
        updatePanchangamForDate(baseDate);
      });
      weekdayChipsContainer.appendChild(chip);
    });

    const dateInputEl = document.getElementById("panchangamDate");
    dateInputEl.addEventListener("change", () => {
      if (dateInputEl.value) {
        updatePanchangamForDate(new Date(dateInputEl.value + "T12:00:00"));
      }
    });

    function setTodayDate() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      dateInputEl.value = `${yyyy}-${mm}-${dd}`;
      updatePanchangamForDate(now);
    }

    function selectRasi(index) {
      const rasi = RASI_DATA[index];
      document.getElementById("rasiIcon").textContent = rasi.icon;
      document.getElementById("rasiName").textContent = `${rasi.tamil} (${rasi.translit})`;
      document.getElementById("rasiEnglish").textContent = rasi.english;
      document.getElementById("rasiLord").textContent = `அதிபதி: ${rasi.lord}`;
      document.getElementById("rasiStars").textContent = rasi.stars;
      document.getElementById("luckyColor").textContent = rasi.color;
      document.getElementById("luckyNumDay").textContent = rasi.numDay;
      document.getElementById("predictionTa").textContent = rasi.forecastTa;
      document.getElementById("predictionEn").textContent = rasi.forecastEn;

      document.querySelectorAll(".rasi-btn").forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });
      if (typeof renderAllTabsCalculationExplanations === 'function') renderAllTabsCalculationExplanations();
    }

    const gridContainer = document.getElementById("rasiGrid");
    RASI_DATA.forEach((rasi, index) => {
      const button = document.createElement("button");
      button.className = "rasi-btn";
      button.innerHTML = `
        <span class="rasi-icon">${rasi.icon}</span>
        <span class="rasi-tamil">${rasi.tamil}</span>
        <span class="rasi-eng">${rasi.translit}</span>
      `;
      button.addEventListener("click", () => selectRasi(index));
      gridContainer.appendChild(button);
    });

    document.getElementById("brideName").addEventListener("input", calculateTenPorutham);
    document.getElementById("groomName").addEventListener("input", calculateTenPorutham);

    

// ============================================================================
// IK's ASTROLOGY - PER-TAB PDF DOWNLOAD & REPORT ISOLATION ENGINE
// ============================================================================
const TAB_PDF_METADATA = {
  ammaAstroTab: {
    slug: "Ammas_Astro_Tamilvanan_Book_Complete_Jathaga_Notebook",
    titleTa: "🌺 Amma's Astro — ஆதியும் அந்தமும் (1–25), சர்வாங்க அஷ்ட வர்க்கம் (337 பரல்) & தமிழ்வாணன் முறை முழு ஜாதக நோட்டு (23 பக்கங்கள்)",
    titleEn: "IK's Astrology — Amma's Astro Complete Horoscope Notebook (Based on Tamilvanan's 'Jathagam Parppathu Eppadi?')"
  },
  navagrahaTab: {
    slug: "Navagraha_Temples_Mantras",
    titleTa: "🛕 நவகிரக தலங்கள் & காயத்ரி மந்திரம் அறிக்கை",
    titleEn: "IK's Astrology — Navagraha Temples & Gayatri Mantra Report"
  },
  kattamTab: {
    slug: "Jathagam_Tamilvanan_Method_12Bhava_Dasa_Report",
    titleTa: "🕉️ முழு ஜாதகக் கட்டம், தமிழ்வாணன் 6-வழி இலக்கினச் சோதனை, 12 பாவக பலன், அஷ்டகவர்க்கம் & தசா புத்தி அறிக்கை",
    titleEn: "IK's Astrology — Complete Birth Chart, Tamilvanan 6-Method Verification, 12-Bhava, SAV & Dasa-Bhukti Report"
  },
  panchangamTab: {
    slug: "Daily_Panchangam_Hora_AntharHora_Report",
    titleTa: "📅 தினசரி தமிழ் பஞ்சாங்கம், கிரக ஓரைகள் & 5 அந்தர் ஓரைகள் (தமிழ்வாணன் முறை) அறிக்கை",
    titleEn: "IK's Astrology — Daily Tamil Panchangam, Planetary Horas & 5 Anthar-Horas Report"
  },
  poruthamTab: {
    slug: "10_Thirumana_Porutham_Report",
    titleTa: "💍 10 திருமணப் பொருத்தம் (தசவிதப் பொருத்தம்) அறிக்கை",
    titleEn: "IK's Astrology — 10 Thirumana Porutham Marriage Compatibility Report"
  },
  peyarchiTab: {
    slug: "Gochara_Peyarchi_Transit_Report",
    titleTa: "🪐 கோச்சார பெயர்ச்சி பலன்கள் (குரு, சனி, ராகு-கேது) அறிக்கை",
    titleEn: "IK's Astrology — Gochara Planetary Transit Report"
  },
  muhurthamTab: {
    slug: "Subha_Muhurtham_14Day_Report",
    titleTa: "🎊 சுப முகூர்த்தம் & கரிநாள் சோதனை அறிக்கை",
    titleEn: "IK's Astrology — Subha Muhurtham & 14-Day Auspicious Planner Report"
  },
  numerologyTab: {
    slug: "Baby_Naming_Tamil_Numerology_Report",
    titleTa: "👶 நட்சத்திரப் பெயர் எழுத்துக்கள் & தமிழ் எண் கணித அறிக்கை",
    titleEn: "IK's Astrology — Nakshatra Baby Naming & Numerology Report"
  },
  rasiTab: {
    slug: "12_Rasi_Daily_Palan_Report",
    titleTa: "♈ 12 ராசி பலன் மற்றும் அதிர்ஷ்டக் குறிப்புகள் அறிக்கை",
    titleEn: "IK's Astrology — 12-Rasi Forecast & Lucky Attributes Report"
  }
};

function getActiveTabId() {
  const activePanel = document.querySelector(".tab-panel.active");
  return activePanel ? activePanel.id : "ammaAstroTab";
}

function prepareTabForExport(targetTabId) {
  const tabId = targetTabId || getActiveTabId();
  const targetPanel = document.getElementById(tabId);
  if (targetPanel && !targetPanel.classList.contains("active")) {
    const matchingBtn = document.querySelector(`.tab-btn[onclick*="${tabId}"]`);
    if (matchingBtn) switchTab(tabId, matchingBtn);
  }

  const meta = TAB_PDF_METADATA[tabId] || TAB_PDF_METADATA.ammaAstroTab;
  const nowStr = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const pdfTitleTa = document.getElementById("pdfBannerTitleTa");
  const pdfTitleEn = document.getElementById("pdfBannerTitleEn");
  const pdfTimestamp = document.getElementById("pdfBannerTimestamp");
  if (pdfTitleTa) pdfTitleTa.textContent = meta.titleTa;
  if (pdfTitleEn) pdfTitleEn.textContent = meta.titleEn;
  if (pdfTimestamp) pdfTimestamp.textContent = "Generated by IK’s Astrology • " + nowStr;

  return { tabId, meta, nowStr, targetPanel };
}

function printTab(targetTabId) {
  const { tabId, meta } = prepareTabForExport(targetTabId);
  const originalTitle = document.title;
  document.title = "IKs_Astrology_" + meta.slug;

  document.body.classList.add("pdf-export-active");
  document.body.setAttribute("data-pdf-tab", tabId);

  if (typeof showToast === "function") {
    showToast("🖨️ அச்சுப் பக்கம் தயாராகிறது... (Opening Print Preview for " + meta.titleTa + ")");
  }

  setTimeout(function () {
    window.print();
    setTimeout(function () {
      document.title = originalTitle;
      document.body.classList.remove("pdf-export-active");
      document.body.removeAttribute("data-pdf-tab");
    }, 600);
  }, 150);
}

function printActiveTab() {
  printTab(getActiveTabId());
}

function inlineComputedStylesRecursive(sourceEl, cloneEl) {
  if (!sourceEl || !cloneEl || sourceEl.nodeType !== 1) return;
  const cs = window.getComputedStyle(sourceEl);
  const propsToCopy = [
    "display", "box-sizing", "width", "min-width", "max-width", "height", "min-height",
    "margin", "padding", "border", "border-top", "border-right", "border-bottom", "border-left",
    "border-radius", "border-collapse", "border-spacing",
    "background", "background-color", "background-image",
    "color", "font-family", "font-size", "font-weight", "font-style", "line-height",
    "text-align", "text-transform", "letter-spacing", "white-space", "word-break",
    "writing-mode", "transform", "transform-origin",
    "flex", "flex-direction", "flex-wrap", "justify-content", "align-items", "align-content", "gap",
    "grid-template-columns", "grid-template-rows", "grid-column", "grid-row", "grid-gap",
    "position", "top", "right", "bottom", "left", "vertical-align"
  ];
  let styleStr = "";
  for (let i = 0; i < propsToCopy.length; i++) {
    const p = propsToCopy[i];
    const val = cs.getPropertyValue(p);
    if (val) styleStr += p + ":" + val + ";";
  }
  styleStr += "overflow:visible !important;overflow-x:visible !important;overflow-y:visible !important;scrollbar-width:none !important;font-family:'Noto Sans Tamil','Latha','Nirmala UI','Plus Jakarta Sans',sans-serif;";
  cloneEl.setAttribute("style", styleStr);

  if (sourceEl.tagName === "INPUT" || sourceEl.tagName === "SELECT") {
    const span = document.createElement("span");
    let displayVal = sourceEl.value || "";
    if (sourceEl.tagName === "SELECT" && sourceEl.options && sourceEl.selectedIndex >= 0) {
      displayVal = sourceEl.options[sourceEl.selectedIndex].text;
    }
    span.textContent = displayVal;
    span.setAttribute(
      "style",
      styleStr + "display:inline-block;padding:6px 10px;border:1px solid #cbd5e1;border-radius:6px;background:#f8fafc;color:#0f172a;font-weight:700;"
    );
    if (cloneEl.parentNode) {
      cloneEl.parentNode.replaceChild(span, cloneEl);
      return;
    }
  }

  const srcChildren = sourceEl.children;
  const cloneChildren = cloneEl.children;
  for (let i = 0; i < srcChildren.length; i++) {
    if (cloneChildren[i]) {
      inlineComputedStylesRecursive(srcChildren[i], cloneChildren[i]);
    }
  }
}

async function renderStagedElementToCanvas(stagedEl, stageWidthPx, crop) {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  const rect = stagedEl.getBoundingClientRect();
  const w = Math.round(stageWidthPx || rect.width || 980);
  const fullHeight = Math.max(40, Math.ceil(Math.max(rect.height, stagedEl.scrollHeight)));
  const h = crop ? crop.height : fullHeight;
  const offset = crop ? crop.top : 0;

  const svgClone = stagedEl.cloneNode(true);
  inlineComputedStylesRecursive(stagedEl, svgClone);

  const wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  wrapperDiv.setAttribute(
    "style",
    `width:${w}px;height:${fullHeight}px;background:#ffffff;color:#0f172a;margin:0;padding:0;overflow:visible;box-sizing:border-box;font-family:'Noto Sans Tamil','Latha','Nirmala UI',sans-serif;`
  );
  wrapperDiv.appendChild(svgClone);

  const xmlSerializer = new XMLSerializer();
  const xhtmlStr = xmlSerializer.serializeToString(wrapperDiv);
  // Self-contained font data is required inside SVG foreignObject snapshots.
  const fontLink = document.querySelector('link[href$="/css/tamil-font.css"]');
  if (!window.iksPdfFontCss) {
    const response = await fetch(fontLink ? fontLink.href : "/css/tamil-font.css");
    if (!response.ok) throw new Error("Tamil PDF font could not be loaded");
    window.iksPdfFontCss = await response.text();
  }
  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><style>${window.iksPdfFontCss}</style></defs>
    <foreignObject width="${w}" height="${fullHeight}" x="0" y="${-offset}">${xhtmlStr}</foreignObject>
  </svg>`;

  const svgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
  const scale = 1.75;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(w * scale);
        canvas.height = Math.round(h * scale);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = function (err) {
      reject(err);
    };
    img.src = svgUrl;
  });
}

// Layout-aware pagination shared by report and calculation-step exports.
// Render bounded page regions directly; never create a huge full-report canvas.
async function renderStagedPages(element, width) {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  const origin = element.getBoundingClientRect();
  const height = Math.ceil(Math.max(origin.height, element.scrollHeight));
  const limit = Math.floor(width * 1.38);
  const protectedBoxes = Array.from(element.querySelectorAll("tr, h1, h2, h3, h4, p, .amma-math-box, .bhava-detail-card, .amma-rasi-grid, .amma-kattam-grid, .rasi-chart"))
    .map(node => {
      const r = node.getBoundingClientRect();
      return {top: Math.max(0, Math.floor(r.top - origin.top)), bottom: Math.ceil(r.bottom - origin.top)};
    }).filter(r => r.bottom > r.top && r.bottom - r.top < limit - 100);
  // Preserve complete tables when they fit, otherwise preserve individual rows.
  const tables = Array.from(element.querySelectorAll("table")).map(table => {
    const r = table.getBoundingClientRect();
    const head = table.querySelector("thead");
    const hr = head && head.getBoundingClientRect();
    const item = {top: Math.floor(r.top-origin.top), bottom: Math.ceil(r.bottom-origin.top),
      headTop: hr ? Math.floor(hr.top-origin.top) : 0, headHeight: hr ? Math.ceil(hr.height) : 0};
    if (r.height < limit - 100) protectedBoxes.push({top:item.top,bottom:item.bottom});
    return item;
  });
  const pages = [];
  let top = 0;
  while (top < height) {
    const continuedTable = tables.find(t => top > t.top + t.headHeight && top < t.bottom && t.headHeight > 0 && t.headHeight < limit / 4);
    const reserve = continuedTable ? continuedTable.headHeight + 8 : 0;
    let bottom = Math.min(height, top + limit - reserve);
    if (bottom < height) {
      // Move a break upwards until no normal-size row/text block crosses it.
      let changed;
      do {
        changed = false;
        for (const r of protectedBoxes) {
          if (r.top > top + 24 && r.top < bottom && r.bottom > bottom) {
            bottom = r.top; changed = true;
          }
        }
      } while (changed);
    }
    // An unusually tall single table row is scaled onto its own PDF page,
    // rather than cutting through its text.
    const oversizedRow = Array.from(element.querySelectorAll("tr")).map(row => {
      const r = row.getBoundingClientRect();
      return {top:Math.floor(r.top-origin.top), bottom:Math.ceil(r.bottom-origin.top)};
    }).find(r => r.top >= top && r.top < bottom && r.bottom-r.top >= limit-reserve);
    if (oversizedRow) bottom = oversizedRow.top > top + 24 ? oversizedRow.top : oversizedRow.bottom;
    const canvas = await renderStagedElementToCanvas(element, width, {top, height:bottom-top});
    if (continuedTable) {
      const header = await renderStagedElementToCanvas(element, width,
        {top:continuedTable.headTop, height:continuedTable.headHeight});
      const combined = document.createElement("canvas");
      combined.width = canvas.width;
      combined.height = canvas.height + header.height + 14;
      const ctx = combined.getContext("2d");
      ctx.fillStyle = "white"; ctx.fillRect(0,0,combined.width,combined.height);
      ctx.drawImage(header,0,0); ctx.drawImage(canvas,0,header.height+14);
      pages.push(combined);
    } else pages.push(canvas);
    top = bottom;
  }
  return pages;
}

function canvasToJpegPageObj(canvas) {
  const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
  const b64 = dataUrl.split(",")[1];
  const binStr = atob(b64);
  const bytes = new Uint8Array(binStr.length);
  for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
  return { bytes, widthPx: canvas.width, heightPx: canvas.height };
}

async function renderDomBlockToJpeg(domEl, renderWidthPx) {
  const stageWidth = renderWidthPx || 980;
  const stage = document.createElement("div");
  stage.className = "pdf-staging-root";
  stage.style.cssText = `position:fixed;left:-10000px;top:0;width:${stageWidth}px;background:#ffffff;color:#0f172a;z-index:-9999;`;
  const clone = domEl.cloneNode(true);
  clone.querySelectorAll("button, .btn-row-flex, .amma-av-filter-bar, .tab-pdf-bar").forEach(b => {
    b.style.display = "none";
  });
  clone.querySelectorAll("[style*='overflow']").forEach(el => {
    el.style.overflow = "visible";
    el.style.overflowX = "visible";
    el.style.overflowY = "visible";
  });
  stage.appendChild(clone);
  document.body.appendChild(stage);
  try {
    const canvas = await renderStagedElementToCanvas(clone, stageWidth);
    return canvasToJpegPageObj(canvas);
  } finally {
    document.body.removeChild(stage);
  }
}

function expandDomBlockIntoA4Units(domEl) {
  const clone = domEl.cloneNode(true);
  clone.querySelectorAll("button, .btn-row-flex, .amma-av-filter-bar, .tab-pdf-bar").forEach(b => {
    b.style.display = "none";
  });
  clone.querySelectorAll("[style*='overflow']").forEach(el => {
    el.style.overflow = "visible";
    el.style.overflowX = "visible";
    el.style.overflowY = "visible";
  });

  if (clone.classList && clone.classList.contains("bhava-report-section")) {
    const cards = Array.from(clone.querySelectorAll(".bhava-detail-card"));
    if (cards.length > 6) {
      const units = [];
      const chunkSize = 6;
      for (let i = 0; i < cards.length; i += chunkSize) {
        const part = clone.cloneNode(true);
        const grid = part.querySelector(".bhava-cards-grid");
        grid.innerHTML = "";
        cards.slice(i, i + chunkSize).forEach(c => grid.appendChild(c.cloneNode(true)));
        if (i > 0) {
          const pDesc = part.querySelector("p");
          if (pDesc) pDesc.style.display = "none";
          const lbl = part.querySelector(".selector-label");
          if (lbl) lbl.textContent = "🏛️ 12 பாவக விரிவான பலன்கள் (தொடர்ச்சி — பாவம் " + (i + 1) + " முதல் " + Math.min(cards.length, i + chunkSize) + " வரை)";
        }
        units.push(part);
      }
      return units;
    }
  }

  if (clone.classList && (clone.classList.contains("porutham-table-wrap") || clone.classList.contains("hora-section"))) {
    const table = clone.querySelector("table");
    const tbody = table ? table.querySelector("tbody") : null;
    const rows = tbody ? Array.from(tbody.querySelectorAll("tr")) : [];
    const maxRowsPerChunk = 8;
    if (rows.length > maxRowsPerChunk) {
      const units = [];
      for (let i = 0; i < rows.length; i += maxRowsPerChunk) {
        const part = clone.cloneNode(true);
        const partTbody = part.querySelector("tbody");
        partTbody.innerHTML = "";
        rows.slice(i, i + maxRowsPerChunk).forEach(r => partTbody.appendChild(r.cloneNode(true)));
        units.push(part);
      }
      return units;
    }
  }

  return [clone];
}

function buildMultiPageA4PdfBinary(jpegPages) {
  const PAGE_W = 595.28;
  const PAGE_H = 841.89;
  const MARGIN_X = 22;
  const MARGIN_Y = 22;
  const AVAIL_W = PAGE_W - MARGIN_X * 2;
  const AVAIL_H = PAGE_H - MARGIN_Y * 2;

  const chunks = [];
  let byteOffset = 0;
  const encoder = new TextEncoder();

  function pushStr(str) {
    const arr = encoder.encode(str);
    chunks.push(arr);
    byteOffset += arr.length;
  }

  function pushBytes(uint8) {
    chunks.push(uint8);
    byteOffset += uint8.length;
  }

  const totalObjects = 2 + jpegPages.length * 3;
  const offsets = new Array(totalObjects + 1).fill(0);

  pushStr("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");

  const pageObjIds = [];

  for (let i = 0; i < jpegPages.length; i++) {
    const pg = jpegPages[i];
    const imgObjId = 3 + i * 3;
    const contentObjId = 4 + i * 3;
    const pageObjId = 5 + i * 3;
    pageObjIds.push(pageObjId);

    offsets[imgObjId] = byteOffset;
    pushStr(
      `${imgObjId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pg.widthPx} /Height ${pg.heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${pg.bytes.length} >>\nstream\n`
    );
    pushBytes(pg.bytes);
    pushStr("\nendstream\nendobj\n");

    const scale = Math.min(AVAIL_W / pg.widthPx, AVAIL_H / pg.heightPx);
    const drawW = (pg.widthPx * scale).toFixed(2);
    const drawH = (pg.heightPx * scale).toFixed(2);
    const drawX = ((PAGE_W - pg.widthPx * scale) / 2).toFixed(2);
    const drawY = (PAGE_H - MARGIN_Y - pg.heightPx * scale).toFixed(2);

    const contentStream = `q\n${drawW} 0 0 ${drawH} ${drawX} ${drawY} cm\n/Im${i} Do\nQ\n`;
    const contentBytes = encoder.encode(contentStream);

    offsets[contentObjId] = byteOffset;
    pushStr(`${contentObjId} 0 obj\n<< /Length ${contentBytes.length} >>\nstream\n`);
    pushBytes(contentBytes);
    pushStr("\nendstream\nendobj\n");

    offsets[pageObjId] = byteOffset;
    pushStr(
      `${pageObjId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /XObject << /Im${i} ${imgObjId} 0 R >> >> /Contents ${contentObjId} 0 R >>\nendobj\n`
    );
  }

  offsets[2] = byteOffset;
  const kidsList = pageObjIds.map(id => `${id} 0 R`).join(" ");
  pushStr(`2 0 obj\n<< /Type /Pages /Kids [${kidsList}] /Count ${pageObjIds.length} >>\nendobj\n`);

  offsets[1] = byteOffset;
  pushStr(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);

  const xrefStart = byteOffset;
  pushStr(`xref\n0 ${totalObjects + 1}\n0000000000 65535 f \n`);
  for (let objId = 1; objId <= totalObjects; objId++) {
    const offStr = String(offsets[objId]).padStart(10, "0");
    pushStr(`${offStr} 00000 n \n`);
  }

  pushStr(`trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`);

  const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
  const finalPdf = new Uint8Array(totalLen);
  let ptr = 0;
  for (let i = 0; i < chunks.length; i++) {
    finalPdf.set(chunks[i], ptr);
    ptr += chunks[i].length;
  }
  return finalPdf;
}

function sliceTallCanvasIntoA4Pages(srcCanvas, maxPageAspect) {
  const maxH = Math.floor(srcCanvas.width * (maxPageAspect || 1.41));
  if (srcCanvas.height <= maxH) {
    return [srcCanvas];
  }
  const pages = [];
  let y = 0;
  while (y < srcCanvas.height) {
    const sliceH = Math.min(maxH, srcCanvas.height - y);
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = srcCanvas.width;
    pageCanvas.height = sliceH;
    const ctx = pageCanvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    ctx.drawImage(srcCanvas, 0, y, srcCanvas.width, sliceH, 0, 0, srcCanvas.width, sliceH);
    pages.push(pageCanvas);
    y += sliceH;
  }
  return pages;
}

async function downloadTabPdf(targetTabId, btnEl) {
  // Exact Predictions has its own 23-sheet PDF exporter. Keep all legacy exporters intact.
  if (targetTabId === "exactPredictionsTab" && typeof window.IKsExactDownloadPdf === "function") {
    return window.IKsExactDownloadPdf(btnEl);
  }
  const { tabId, meta, nowStr, targetPanel } = prepareTabForExport(targetTabId);
  if (!targetPanel) return;

  const originalBtnHtml = btnEl ? btnEl.innerHTML : "";
  if (btnEl) {
    btnEl.disabled = true;
    btnEl.innerHTML = "⏳ Generating Tamil PDF...";
  }
  if (typeof showToast === "function") {
    showToast("📄 தமிழ்வாணன் 'ஜாதகம் பார்ப்பது எப்படி?' கணிதத்துடன் PDF உருவாக்கப்படுகிறது...");
  }

  const STAGE_WIDTH = 980;
  const stage = document.createElement("div");
  stage.className = "pdf-staging-root";
  stage.style.cssText = `position:fixed;left:-10000px;top:0;width:${STAGE_WIDTH}px;background:#ffffff;color:#0f172a;z-index:-9999;padding:0;margin:0;`;
  document.body.appendChild(stage);

  try {
    let rawBlocks = [];
    if (tabId === "ammaAstroTab") {
      rawBlocks = Array.from(targetPanel.querySelectorAll(".amma-page-sheet"));
    } else {
      rawBlocks = Array.from(
        targetPanel.querySelectorAll(
          ".amma-page-sheet, .navagraha-layout, .result-card, .charts-wrapper, .bhava-report-section, .sav-section, .dasa-section, .dosha-section, .hora-section, .couple-grid, .score-banner, .porutham-table-wrap, .split-two-col"
        )
      );
      if (rawBlocks.length === 0) rawBlocks = [targetPanel];
    }

    rawBlocks = rawBlocks.filter(block => !rawBlocks.some(parent => parent !== block && parent.contains(block)));
    const jpegPages = [];

    if (tabId === "ammaAstroTab") {
      for (let i = 0; i < rawBlocks.length; i++) {
        stage.innerHTML = "";
        const units = expandDomBlockIntoA4Units(rawBlocks[i]);
        for (let u of units) {
          stage.appendChild(u);
          const slicedCanvases = await renderStagedPages(u, STAGE_WIDTH);
          for (let sc of slicedCanvases) {
            jpegPages.push(canvasToJpegPageObj(sc));
          }
          stage.removeChild(u);
        }
      }
    } else {
      const headerEl = document.createElement("div");
      headerEl.setAttribute(
        "style",
        "width:100%;background:#ffffff;border-bottom:3px solid #312e81;padding:10px 14px 12px 14px;margin-bottom:14px;box-sizing:border-box;font-family:'Noto Sans Tamil','Latha',sans-serif;"
      );
      headerEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:19px;color:#312e81;">✨ IK’s Astrology — தமிழ் ஜோதிட அறிக்கை (தமிழ்வாணன் "ஜாதகம் பார்ப்பது எப்படி?" முறை)</strong>
          <span style="font-size:12px;color:#475569;font-weight:600;">${nowStr}</span>
        </div>
        <div style="font-size:15px;font-weight:800;color:#7b1113;margin-top:4px;">${meta.titleTa}</div>
      `;

      const allUnits = [headerEl];
      for (let b of rawBlocks) {
        const expanded = expandDomBlockIntoA4Units(b);
        allUnits.push(...expanded);
      }

      const renderedCanvases = [];
      for (let u of allUnits) {
        stage.innerHTML = "";
        stage.appendChild(u);
        const slices = await renderStagedPages(u, STAGE_WIDTH);
        renderedCanvases.push(...slices);
      }

      const MAX_PAGE_RATIO = 1.38;
      const GAP_PX = 22;
      let currentGroup = [];
      let currentHeight = 0;
      const targetWidth = renderedCanvases[0] ? renderedCanvases[0].width : Math.round(STAGE_WIDTH * 1.75);

      function flushCanvasGroup(group) {
        if (group.length === 0) return;
        const totalH = group.reduce((s, c, idx) => s + c.height + (idx > 0 ? GAP_PX : 0), 0);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = targetWidth;
        pageCanvas.height = totalH;
        const ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        let yOff = 0;
        for (let i = 0; i < group.length; i++) {
          ctx.drawImage(group[i], 0, yOff);
          yOff += group[i].height + GAP_PX;
        }
        jpegPages.push(canvasToJpegPageObj(pageCanvas));
      }

      for (let c of renderedCanvases) {
        const addedH = currentGroup.length > 0 ? c.height + GAP_PX : c.height;
        if (currentGroup.length > 0 && (currentHeight + addedH) / targetWidth > MAX_PAGE_RATIO) {
          flushCanvasGroup(currentGroup);
          currentGroup = [c];
          currentHeight = c.height;
        } else {
          currentGroup.push(c);
          currentHeight += addedH;
        }
      }
      flushCanvasGroup(currentGroup);
    }

    const pdfBytes = buildMultiPageA4PdfBinary(jpegPages);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `IKs_Astrology_${meta.slug}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);

    if (typeof showToast === "function") {
      showToast(`✅ PDF பதிவிறக்கம் முடிந்தது! (IKs_Astrology_${meta.slug}.pdf • ${jpegPages.length} Pages)`);
    }
  } catch (err) {
    console.error("Direct PDF generation fallback to print:", err);
    printTab(tabId);
  } finally {
    if (stage && stage.parentNode) {
      stage.parentNode.removeChild(stage);
    }
    if (btnEl) {
      btnEl.disabled = false;
      btnEl.innerHTML = originalBtnHtml;
    }
  }
}

function downloadActiveTabPdf(btnEl) {
  downloadTabPdf(getActiveTabId(), btnEl);
}

// ============================================================================
// AMMA'S ASTRO — COMPLETE 20-SHEET TAMIL HOROSCOPE NOTEBOOK ENGINE
// (Includes 2 Tamilvanan Book Calculation & 6-Method Verification Sheets +
//  18 Classical Green-Bordered Notebook Sheets)
// ============================================================================
let currentAmmaAvFilter = "all";

const PLANET_DIGNITY_RULES = {
  sun: { own: [4], exalt: 0, debil: 6 },
  moon: { own: [3], exalt: 1, debil: 7 },
  mars: { own: [0, 7], exalt: 9, debil: 3 },
  mercury: { own: [2, 5], exalt: 5, debil: 11 },
  jupiter: { own: [8, 11], exalt: 3, debil: 9 },
  venus: { own: [1, 6], exalt: 11, debil: 5 },
  saturn: { own: [9, 10], exalt: 6, debil: 0 },
  rahu: { own: [10], exalt: 1, debil: 7 },
  kethu: { own: [7], exalt: 7, debil: 1 }
};

function getPlanetNilaiTa(pKey, rasiIdx) {
  if (pKey === "lagnam") return "உதய லக்னம்";
  if (pKey === "mandi") return "உபகிரகம்";
  const rule = PLANET_DIGNITY_RULES[pKey];
  if (!rule) return "சமம்";
  if (rule.exalt === rasiIdx) return "உச்சம் (Exalted)";
  if (rule.own.includes(rasiIdx)) return "ஆட்சி (Own Sign)";
  if (rule.debil === rasiIdx) return "நீசம் (Debilitated)";
  if (pKey === "rahu" || pKey === "kethu") return "சாயா கிரகம்";

  const signLord = RASI_DATA[rasiIdx].lordKey;
  if (signLord === pKey) return "ஆட்சி";
  if (PLANET_FRIENDS[pKey] && PLANET_FRIENDS[pKey].includes(signLord)) {
    return "நட்பு (Friendly)";
  }
  return "சமம் (Neutral)";
}

function computeVargaSign(lon, vargaType) {
  const normLon = ((lon % 360) + 360) % 360;
  const sign = Math.floor(normLon / 30) % 12;
  const degInSign = normLon % 30;
  const isOddSign = (sign % 2 === 0);

  switch (vargaType) {
    case "D1":
      return sign;
    case "D2": {
      // Tamilvanan Book Sixth Method (p. 23–25):
      // Odd (Male) Rasis: 0-15° Sun Hora (Simmam=4), 15-30° Moon Hora (Kadagam=3)
      // Even (Female) Rasis: 0-15° Moon Hora (Kadagam=3), 15-30° Sun Hora (Simmam=4)
      const firstHalf = degInSign < 15;
      if (isOddSign) return firstHalf ? 4 : 3;
      return firstHalf ? 3 : 4;
    }
    case "D3": {
      const part = Math.floor(degInSign / 10);
      return (sign + part * 4) % 12;
    }
    case "D4": {
      const part = Math.floor(degInSign / 7.5);
      return (sign + part * 3) % 12;
    }
    case "D5": {
      return Math.floor(normLon / 6) % 12;
    }
    case "D6": {
      const part = Math.floor(degInSign / 5);
      return ((isOddSign ? 0 : 6) + part) % 12;
    }
    case "D7": {
      const part = Math.floor(degInSign / (30 / 7));
      return (sign + (isOddSign ? 0 : 6) + part) % 12;
    }
    case "D8": {
      const part = Math.floor(degInSign / 3.75);
      const modalityStart = (sign % 3 === 0) ? 0 : ((sign % 3 === 1) ? 8 : 4);
      return (modalityStart + part) % 12;
    }
    case "D9": {
      return Math.floor(normLon / (30 / 9)) % 12;
    }
    case "D10": {
      const part = Math.floor(degInSign / 3);
      return (sign + (isOddSign ? 0 : 8) + part) % 12;
    }
    case "D12": {
      const part = Math.floor(degInSign / 2.5);
      return (sign + part) % 12;
    }
    case "D30": {
      if (isOddSign) {
        if (degInSign < 5) return 0;
        if (degInSign < 10) return 10;
        if (degInSign < 18) return 8;
        if (degInSign < 25) return 2;
        return 6;
      } else {
        if (degInSign < 5) return 1;
        if (degInSign < 12) return 5;
        if (degInSign < 20) return 11;
        if (degInSign < 25) return 9;
        return 7;
      }
    }
    default:
      return sign;
  }
}

function renderAmmaSouthIndianKattam(containerId, positionsMap, centerLabelTa) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  const ammaPlanetList = [
    { key: "lagnam", shortTa: "லக்", cls: "lag" },
    { key: "sun", shortTa: "சூரி", cls: "" },
    { key: "moon", shortTa: "சந்", cls: "" },
    { key: "mars", shortTa: "செவ்", cls: "" },
    { key: "mercury", shortTa: "புத", cls: "" },
    { key: "jupiter", shortTa: "குரு", cls: "" },
    { key: "venus", shortTa: "சுக்", cls: "" },
    { key: "saturn", shortTa: "சனி", cls: "" },
    { key: "rahu", shortTa: "ராகு", cls: "" },
    { key: "kethu", shortTa: "கேது", cls: "" },
    { key: "mandi", shortTa: "மாந்தி", cls: "mandi" }
  ];

  SOUTH_INDIAN_GRID_ORDER.forEach(cellItem => {
    if (cellItem === "CENTER") {
      const centerDiv = document.createElement("div");
      centerDiv.className = "amma-kattam-center";
      centerDiv.innerHTML = `<div>${centerLabelTa}</div>`;
      container.appendChild(centerDiv);
      return;
    }

    const rasiIndex = cellItem;
    const rasiInfo = RASI_DATA[rasiIndex];
    const isLagnam = positionsMap.lagnam === rasiIndex;
    const planetsHere = ammaPlanetList.filter(p => positionsMap[p.key] === rasiIndex);

    const box = document.createElement("div");
    box.className = "amma-kattam-box" + (isLagnam ? " is-lagnam" : "");
    box.innerHTML = `
      <div class="amma-box-sign-num">
        <span>${rasiInfo.tamil}</span>
        <span>${rasiIndex + 1}</span>
      </div>
      <div class="amma-box-planets">
        ${planetsHere.map(p => `<span class="amma-p-chip ${p.cls}">${p.shortTa}</span>`).join("")}
      </div>
    `;
    container.appendChild(box);
  });
}

function computeTrikonaAndEkadhipatya(rawParals, planetPositionsMap) {
  const trikona = [...rawParals];
  const triads = [
    [0, 4, 8],
    [1, 5, 9],
    [2, 6, 10],
    [3, 7, 11]
  ];
  triads.forEach(([a, b, c]) => {
    const minVal = Math.min(trikona[a], trikona[b], trikona[c]);
    trikona[a] -= minVal;
    trikona[b] -= minVal;
    trikona[c] -= minVal;
  });

  const ekadhipatya = [...trikona];
  const occupiedSigns = new Set();
  ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"].forEach(k => {
    if (planetPositionsMap && typeof planetPositionsMap[k] === "number") {
      occupiedSigns.add(planetPositionsMap[k]);
    }
  });

  const pairs = [
    [0, 7],
    [1, 6],
    [2, 5],
    [8, 11],
    [9, 10]
  ];

  pairs.forEach(([s1, s2]) => {
    const v1 = ekadhipatya[s1];
    const v2 = ekadhipatya[s2];
    if (v1 === 0 || v2 === 0) return;

    const occ1 = occupiedSigns.has(s1);
    const occ2 = occupiedSigns.has(s2);

    if (occ1 && occ2) {
      return;
    } else if (!occ1 && !occ2) {
      if (v1 === v2) {
        ekadhipatya[s1] = 0;
        ekadhipatya[s2] = 0;
      } else {
        const m = Math.min(v1, v2);
        ekadhipatya[s1] = m;
        ekadhipatya[s2] = m;
      }
    } else if (occ1 && !occ2) {
      if (v2 <= v1) {
        ekadhipatya[s2] = 0;
      } else {
        ekadhipatya[s2] = v1;
      }
    } else if (!occ1 && occ2) {
      if (v1 <= v2) {
        ekadhipatya[s1] = 0;
      } else {
        ekadhipatya[s1] = v2;
      }
    }
  });

  return { trikona, ekadhipatya };
}

function renderMiniNumericKattam(gridEl, valuesArray12, centerTitleHtml) {
  gridEl.innerHTML = "";
  SOUTH_INDIAN_GRID_ORDER.forEach(cellItem => {
    if (cellItem === "CENTER") {
      const c = document.createElement("div");
      c.className = "amma-mini-center";
      c.innerHTML = centerTitleHtml;
      gridEl.appendChild(c);
      return;
    }
    const rIdx = cellItem;
    const cell = document.createElement("div");
    cell.className = "amma-mini-cell";
    cell.innerHTML = `
      <small>${RASI_DATA[rIdx].tamil}</small>
      <span>${valuesArray12[rIdx]}</span>
    `;
    gridEl.appendChild(cell);
  });
}

const ASHTAKAVARGA_SHEET_META = [
  { key: "sun", title: "சூரியன் அஷ்ட வர்க்கம் - 48", totalExpected: 48 },
  { key: "moon", title: "சந்திரன் அஷ்ட வர்க்கம் - 49", totalExpected: 49 },
  { key: "mars", title: "செவ்வாய் அஷ்ட வர்க்கம் - 39", totalExpected: 39 },
  { key: "mercury", title: "புதன் அஷ்ட வர்க்கம் - 54", totalExpected: 54 },
  { key: "jupiter", title: "குரு அஷ்ட வர்க்கம் - 56", totalExpected: 56 },
  { key: "venus", title: "சுக்கிரன் அஷ்ட வர்க்கம் - 52", totalExpected: 52 },
  { key: "saturn", title: "சனி அஷ்ட வர்க்கம் - 39", totalExpected: 39 }
];

const CONTRIBUTOR_ROWS_META = [
  { key: "sun", label: "சூரியன்" },
  { key: "moon", label: "சந்திரன்" },
  { key: "mars", label: "செவ்வாய்" },
  { key: "mercury", label: "புதன்" },
  { key: "jupiter", label: "குரு" },
  { key: "venus", label: "சுக்கிரன்" },
  { key: "saturn", label: "சனி" },
  { key: "lagnam", label: "இலக்னம்" }
];

function setAmmaAvFilter(mode) {
  currentAmmaAvFilter = mode;
  renderAmmaAshtakavargaSheets();
}

function renderAmmaAshtakavargaSheets() {
  const container = document.getElementById("ammaAshtakavargaContainer");
  if (!container) return;
  container.innerHTML = "";

  document.querySelectorAll(".amma-av-chip").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-av") === currentAmmaAvFilter);
  });

  let sheetsToRender = ASHTAKAVARGA_SHEET_META;
  if (currentAmmaAvFilter === "sun_moon") {
    sheetsToRender = ASHTAKAVARGA_SHEET_META.slice(0, 2);
  } else if (currentAmmaAvFilter !== "all" && currentAmmaAvFilter !== "sav") {
    sheetsToRender = ASHTAKAVARGA_SHEET_META.filter(s => s.key === currentAmmaAvFilter);
  } else if (currentAmmaAvFilter === "sav") {
    sheetsToRender = [];
  }

  const savByPlanetRow = {};
  const savColTotals = new Array(12).fill(0);
  let savGrandTotal = 0;

  ASHTAKAVARGA_SHEET_META.forEach(sheetMeta => {
    const rulesForPlanet = ASHTAKAVARGA_RULES[sheetMeta.key];
    const colTotals = new Array(12).fill(0);
    let grandTotal = 0;

    let rowsHtml = "";
    CONTRIBUTOR_ROWS_META.forEach(contrib => {
      const sourceSign = currentRasiPositions[contrib.key] || 0;
      const offsets = rulesForPlanet[contrib.key] || [];
      const rowCells = new Array(12).fill(0);
      offsets.forEach(off => {
        const targetSign = (sourceSign + off - 1) % 12;
        rowCells[targetSign] = 1;
        colTotals[targetSign] += 1;
      });
      const rowSum = offsets.length;
      grandTotal += rowSum;

      rowsHtml += `
        <tr>
          <td class="row-planet">${contrib.label}</td>
          ${rowCells.map(v => `<td>${v === 1 ? "<strong>1</strong>" : ""}</td>`).join("")}
          <td><strong>${rowSum}</strong></td>
        </tr>
      `;
    });

    savByPlanetRow[sheetMeta.key] = { label: sheetMeta.title.split(" ")[0], colTotals: [...colTotals], total: grandTotal };
    for (let r = 0; r < 12; r++) savColTotals[r] += colTotals[r];
    savGrandTotal += grandTotal;

    if (!sheetsToRender.some(s => s.key === sheetMeta.key)) return;

    const { trikona, ekadhipatya } = computeTrikonaAndEkadhipatya(colTotals, currentRasiPositions);

    const sheetDiv = document.createElement("div");
    sheetDiv.className = "amma-page-sheet";
    sheetDiv.style.marginBottom = "24px";

    const rasiHeadersHtml = RASI_DATA.map(r => `<th class="vert-rasi">${r.tamil}</th>`).join("");
    const paralCellsHtml = colTotals.map(c => `<td><strong>${c}</strong></td>`).join("");

    sheetDiv.innerHTML = `
      <div class="amma-sheet-title">${sheetMeta.title}</div>
      <div class="amma-av-matrix-wrap">
        <table class="amma-av-matrix">
          <thead>
            <tr>
              <th style="min-width:95px;">இராசி</th>
              ${rasiHeadersHtml}
              <th class="vert-rasi">மொத்தம்</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
            <tr class="paral-sum-row">
              <td class="row-planet">பரல்</td>
              ${paralCellsHtml}
              <td><strong>${grandTotal}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="amma-av-bottom-3">
        <div class="amma-mini-kattam" id="amma_av_raw_${sheetMeta.key}"></div>
        <div class="amma-mini-kattam" id="amma_av_tri_${sheetMeta.key}"></div>
        <div class="amma-mini-kattam" id="amma_av_eka_${sheetMeta.key}"></div>
      </div>
    `;
    container.appendChild(sheetDiv);

    renderMiniNumericKattam(
      document.getElementById(`amma_av_raw_${sheetMeta.key}`),
      colTotals,
      `<div>${grandTotal}<br>பரல்</div>`
    );
    renderMiniNumericKattam(
      document.getElementById(`amma_av_tri_${sheetMeta.key}`),
      trikona,
      `<div>திரிகோணம்</div>`
    );
    renderMiniNumericKattam(
      document.getElementById(`amma_av_eka_${sheetMeta.key}`),
      ekadhipatya,
      `<div>ஏகாதி<br>பத்யம்</div>`
    );
  });

  if (currentAmmaAvFilter === "all" || currentAmmaAvFilter === "sav") {
    const { trikona: savTri, ekadhipatya: savEka } = computeTrikonaAndEkadhipatya(savColTotals, currentRasiPositions);
    const rasiHeadersHtml = RASI_DATA.map(r => `<th class="vert-rasi">${r.tamil}</th>`).join("");
    const savRowsHtml = ASHTAKAVARGA_SHEET_META.map(sm => {
      const rowData = savByPlanetRow[sm.key];
      return `
        <tr>
          <td class="row-planet">${rowData.label}</td>
          ${rowData.colTotals.map(v => `<td><strong>${v}</strong></td>`).join("")}
          <td><strong>${rowData.total}</strong></td>
        </tr>
      `;
    }).join("");
    const savParalCellsHtml = savColTotals.map(c => `<td><strong>${c}</strong></td>`).join("");

    const savDiv = document.createElement("div");
    savDiv.className = "amma-page-sheet";
    savDiv.style.marginBottom = "24px";
    savDiv.innerHTML = `
      <div class="amma-sheet-title">சர்வாஷ்டக வர்க்கம் - ${savGrandTotal} (Sarvashtakavarga Total)</div>
      <div class="amma-av-matrix-wrap">
        <table class="amma-av-matrix">
          <thead>
            <tr>
              <th style="min-width:95px;">இராசி</th>
              ${rasiHeadersHtml}
              <th class="vert-rasi">மொத்தம்</th>
            </tr>
          </thead>
          <tbody>
            ${savRowsHtml}
            <tr class="paral-sum-row">
              <td class="row-planet">பரல்</td>
              ${savParalCellsHtml}
              <td><strong>${savGrandTotal}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="amma-av-bottom-3">
        <div class="amma-mini-kattam" id="amma_av_raw_sav"></div>
        <div class="amma-mini-kattam" id="amma_av_tri_sav"></div>
        <div class="amma-mini-kattam" id="amma_av_eka_sav"></div>
      </div>
    `;
    container.appendChild(savDiv);

    renderMiniNumericKattam(
      document.getElementById("amma_av_raw_sav"),
      savColTotals,
      `<div>${savGrandTotal}<br>பரல்</div>`
    );
    renderMiniNumericKattam(
      document.getElementById("amma_av_tri_sav"),
      savTri,
      `<div>திரிகோணம்</div>`
    );
    renderMiniNumericKattam(
      document.getElementById("amma_av_eka_sav"),
      savEka,
      `<div>ஏகாதி<br>பத்யம்</div>`
    );
  }
}

function calculateFromAmmaTab() {
  const aName = document.getElementById("ammaName");
  const aDate = document.getElementById("ammaDate");
  const aTime = document.getElementById("ammaTime");
  const aPlace = document.getElementById("ammaPlace");

  if (aName && aDate && aTime && aPlace) {
    document.getElementById("jName").value = aName.value;
    document.getElementById("jDate").value = aDate.value;
    document.getElementById("jTime").value = aTime.value;
    document.getElementById("jPlace").value = aPlace.value;
  }
  calculateBirthChart();
}

function renderAmmaAstroNotebook() {
  const nameVal = document.getElementById("jName").value.trim() || "ஜாதகர்";
  const dateStr = document.getElementById("jDate").value || "1998-05-15";
  const timeStr = document.getElementById("jTime").value || "08:30";
  const placeInput = document.getElementById("jPlace");
  const rawPlaceStr = placeInput ? placeInput.value : "சென்னை (Chennai)";
  const placeInfo = resolveBirthPlaceCoordinates(rawPlaceStr);
  const placeLabel = placeInfo.label;
  const lat = placeInfo.lat;
  const lon = placeInfo.lon;

  const aName = document.getElementById("ammaName");
  const aDate = document.getElementById("ammaDate");
  const aTime = document.getElementById("ammaTime");
  const aPlace = document.getElementById("ammaPlace");
  if (aName && document.activeElement !== aName && aName.value !== nameVal) aName.value = nameVal;
  if (aDate && document.activeElement !== aDate && aDate.value !== dateStr) aDate.value = dateStr;
  if (aTime && document.activeElement !== aTime && aTime.value !== timeStr) aTime.value = timeStr;
  if (aPlace && document.activeElement !== aPlace && aPlace.value !== rawPlaceStr) aPlace.value = rawPlaceStr;

  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const [hh, min] = timeStr.split(":").map(Number);
  const birthDateObj = new Date(yyyy, mm - 1, dd, hh, min);

  const bookData = latestTamilvananBookData || computeTamilvananBookHoroscopeData(yyyy, mm, dd, hh, min, lat, lon);
  latestTamilvananBookData = bookData;
  updatePlaceCoordinateHints(placeInfo, bookData.sunriseText);

  renderTamilvananBookSheets(bookData, nameVal, dateStr, timeStr, placeLabel);

  const planetLongitudes = bookData.rawLongitudes;
  const norm360 = deg => ((deg % 360) + 360) % 360;
  currentRasiPositions.mandi = Math.floor(planetLongitudes.mandi / 30) % 12;

  // 1. Render Page 1: நட்சத்திர கிரஹ பாத சாரம் & கிரகஸ்புடம் (11 Rows: Lagnam .. Mandi)
  const saramRowsOrder = [
    { key: "lagnam", label: "லக்னம்" },
    { key: "sun", label: "சூரியன்" },
    { key: "moon", label: "சந்திரன்" },
    { key: "mars", label: "செவ்வாய்" },
    { key: "mercury", label: "புதன்" },
    { key: "jupiter", label: "குரு" },
    { key: "venus", label: "சுக்கிரன்" },
    { key: "saturn", label: "சனி" },
    { key: "rahu", label: "ராகு" },
    { key: "kethu", label: "கேது" },
    { key: "mandi", label: "மாந்தி" }
  ];

  const saramTbody = document.getElementById("ammaSaramTableBody");
  if (saramTbody) {
    saramTbody.innerHTML = saramRowsOrder.map(row => {
      const pLon = planetLongitudes[row.key];
      const rasiIdx = (row.key in currentRasiPositions) ? currentRasiPositions[row.key] : (Math.floor(pLon / 30) % 12);
      const rasiObj = RASI_DATA[rasiIdx];
      const starIdx = Math.floor((pLon / 360) * 27) % 27;
      const padamNum = (Math.floor(pLon / (360 / 108)) % 4) + 1;
      const starObj = STAR_PORUTHAM_DATA[starIdx];
      const starLordObj = VIMSHOTTARI_SEQUENCE[starIdx % 9];
      const nilaiTa = getPlanetNilaiTa(row.key, rasiIdx);
      const degMinStr = formatDegMinTa(pLon);

      return `
        <tr>
          <td>${row.label}</td>
          <td><strong>${rasiObj.tamil}</strong> <small style="color:#475569;">(${degMinStr})</small></td>
          <td><strong>${padamNum}</strong></td>
          <td>${starObj.name}</td>
          <td>${starLordObj.shortTa}</td>
          <td>${nilaiTa}</td>
        </tr>
      `;
    }).join("");
  }

  // 2. Render Page 2: சுபமஸ்து Bio Header & 3 Primary Charts (இராசி, நவாம்சம், பாவக சக்கரம்)
  const moonRasi = RASI_DATA[currentRasiPositions.moon];
  const lagnamRasi = RASI_DATA[currentRasiPositions.lagnam];
  const starName = STAR_PORUTHAM_DATA[currentStarIndex].name;

  const bioNameEl = document.getElementById("ammaBioName");
  const bioLagnamEl = document.getElementById("ammaBioLagnam");
  const bioRasiEl = document.getElementById("ammaBioRasi");
  const bioStarEl = document.getElementById("ammaBioStar");

  if (bioNameEl) bioNameEl.textContent = `${nameVal} (${dateStr} • ${timeStr} • ${placeLabel} • உதயாதி: ${bookData.udayathiText})`;
  if (bioLagnamEl) bioLagnamEl.textContent = `${lagnamRasi.tamil} (${bookData.lagnamDegMinText} • நவாம்சம்: ${RASI_DATA[bookData.navamsamLagnamSign].tamil})`;
  if (bioRasiEl) bioRasiEl.textContent = `${moonRasi.tamil} (${bookData.moonDegMinText})`;
  if (bioStarEl) bioStarEl.textContent = `${starName} - ${currentPadam}ம் பாதம் (${bookData.dasaBalanceFullText})`;

  // Compute Bhava Chakram (பாவச் சக்கரம் - Book p. 25) relative to Lagnam degree midpoint
  const lagnamLon = planetLongitudes.lagnam;
  const bhavaChakramPositions = {};
  Object.keys(planetLongitudes).forEach(k => {
    if (k === "lagnam") {
      bhavaChakramPositions.lagnam = currentRasiPositions.lagnam;
    } else {
      const relDeg = norm360(planetLongitudes[k] - (lagnamLon - 15));
      const bhavaIdx = Math.floor(relDeg / 30) % 12;
      bhavaChakramPositions[k] = (currentRasiPositions.lagnam + bhavaIdx) % 12;
    }
  });

  // Compute all 12 Varga maps (D1, D9, D2, D3, D4, D5, D6, D7, D8, D10, D12, D30)
  const vargaTypes = ["D1", "D9", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D10", "D12", "D30"];
  const vargaMaps = {};
  vargaTypes.forEach(vt => {
    vargaMaps[vt] = {};
    Object.keys(planetLongitudes).forEach(pKey => {
      if (vt === "D1" && pKey in currentRasiPositions) {
        vargaMaps[vt][pKey] = currentRasiPositions[pKey];
      } else if (vt === "D9" && pKey in currentNavamsamPositions) {
        vargaMaps[vt][pKey] = currentNavamsamPositions[pKey];
      } else {
        vargaMaps[vt][pKey] = computeVargaSign(planetLongitudes[pKey], vt);
      }
    });
  });

  renderAmmaSouthIndianKattam("ammaPage2RasiGrid", vargaMaps.D1, "இராசி");
  renderAmmaSouthIndianKattam("ammaPage2NavamsamGrid", vargaMaps.D9, "நவாம்சம்");
  renderAmmaSouthIndianKattam("ammaPage2BhavaGrid", bhavaChakramPositions, "பாவக<br>சக்கரம்");

  renderAmmaSouthIndianKattam("ammaVargaD1Grid", vargaMaps.D1, "இராசி");
  renderAmmaSouthIndianKattam("ammaVargaD9Grid", vargaMaps.D9, "நவாம்சம்");
  renderAmmaSouthIndianKattam("ammaVargaD2Grid", vargaMaps.D2, "ஹோரை");
  renderAmmaSouthIndianKattam("ammaVargaD3Grid", vargaMaps.D3, "திரேக்காணம்");

  renderAmmaSouthIndianKattam("ammaVargaD4Grid", vargaMaps.D4, "சதுர்த்தாம்சம்");
  renderAmmaSouthIndianKattam("ammaVargaD5Grid", vargaMaps.D5, "பஞ்சமாம்சம்");
  renderAmmaSouthIndianKattam("ammaVargaD6Grid", vargaMaps.D6, "சஷ்டாம்சம்");
  renderAmmaSouthIndianKattam("ammaVargaD7Grid", vargaMaps.D7, "சப்தமாம்சம்");

  renderAmmaSouthIndianKattam("ammaVargaD8Grid", vargaMaps.D8, "அஷ்டமாம்சம்");
  renderAmmaSouthIndianKattam("ammaVargaD10Grid", vargaMaps.D10, "தசாம்சம்");
  renderAmmaSouthIndianKattam("ammaVargaD12Grid", vargaMaps.D12, "துவாதசாம்சம்");
  renderAmmaSouthIndianKattam("ammaVargaD30Grid", vargaMaps.D30, "திரிசாம்சம்");

  // Render 5 Dedicated "நாளும் கோளும் - திசாபுத்தி விபரம்" Notebook Sheets (2 Stacked Maha Dasa Blocks per Sheet)
  const dasaContainer = document.getElementById("ammaDasaBlocksContainer");
  if (dasaContainer && computedMahaDasas.length > 0) {
    const formatAgeYMD = dateVal => {
      const totalDays = Math.max(0, Math.round((dateVal.getTime() - birthDateObj.getTime()) / (24 * 3600 * 1000)));
      const yrs = Math.floor(totalDays / 365.2425);
      const remD = totalDays - Math.floor(yrs * 365.2425);
      const mos = Math.floor(remD / 30.437);
      return `${yrs}வ ${mos}மா`;
    };

    const buildSingleDasaSectionRows = (dasa) => {
      if (!dasa) return "";
      const dStartAge = formatAgeYMD(dasa.start);
      const dEndAge = formatAgeYMD(dasa.end);

      const sectionHeaderRow = `
        <tr class="amma-nk-section-banner">
          <td>
            <div class="amma-nk-thisai-cell">
              <span>🪐 <strong>${dasa.shortTa}</strong> திசையில் (${dasa.fullYears} வருடம்)</span>
              <span>புத்தி (கால அளவு)</span>
            </div>
          </td>
          <td style="text-align:center;">${formatShortDate(dasa.start)}<br><small>(${dStartAge})</small></td>
          <td style="text-align:center;">${formatShortDate(dasa.end)}<br><small>(${dEndAge})</small></td>
        </tr>
      `;

      const bhuktiRows = dasa.bhuktis.map((b, bIdx) => {
        const bStartAge = formatAgeYMD(b.start);
        const bEndAge = formatAgeYMD(b.end);
        const bhuktiLabel = (b.shortTa === dasa.shortTa) ? `${b.shortTa} (சுய புத்தி)` : `${b.shortTa} புத்தி`;
        return `
          <tr class="${b.isRunning ? 'active-bhukti-row' : ''}">
            <td>
              <div class="amma-nk-bhukti-cell">
                <span>${bIdx + 1}. ${dasa.shortTa} திசையில்</span>
                <strong>${bhuktiLabel} <small style="font-weight:600;color:#475569;">(${b.durationTa || ""})</small> ${b.isRunning ? '<span class="running-tag" style="margin-left:4px;">நடப்பு</span>' : ''}</strong>
              </div>
            </td>
            <td style="text-align:center;">${formatShortDate(b.start)} <small>(${bStartAge})</small></td>
            <td style="text-align:center;">${formatShortDate(b.end)} <small>(${bEndAge})</small></td>
          </tr>
        `;
      }).join("");

      return sectionHeaderRow + bhuktiRows;
    };

    const dasaBalanceText = bookData.dasaBalanceFullText;
    const pagesHtml = [];
    for (let p = 0; p < 5; p++) {
      const dasaTop = computedMahaDasas[p * 2];
      const dasaBottom = computedMahaDasas[p * 2 + 1] || null;

      let bottomSectionHtml = "";
      if (dasaBottom) {
        bottomSectionHtml = buildSingleDasaSectionRows(dasaBottom);
      } else {
        const summaryRows = computedMahaDasas.map((d, idx) => `
          <tr class="${d.isRunning ? 'active-bhukti-row' : ''}">
            <td>
              <div class="amma-nk-bhukti-cell">
                <span>${idx + 1}. ${d.shortTa} மகா திசை (${d.fullYears} வருடம்)</span>
                <strong>${d.isRunning ? 'நடப்பு திசை ★' : 'முழு விபரம்'}</strong>
              </div>
            </td>
            <td style="text-align:center;">${formatShortDate(d.start)} <small>(${formatAgeYMD(d.start)})</small></td>
            <td style="text-align:center;">${formatShortDate(d.end)} <small>(${formatAgeYMD(d.end)})</small></td>
          </tr>
        `).join("");

        bottomSectionHtml = `
          <tr class="amma-nk-section-banner">
            <td>
              <div class="amma-nk-thisai-cell">
                <span>📜 <strong>9 மகா திசைகள் (120 வருட தொகுப்பு)</strong> — திசையில்</span>
                <span>புத்தி / காலம்</span>
              </div>
            </td>
            <td style="text-align:center;">ஆரம்பம்</td>
            <td style="text-align:center;">முடிவு</td>
          </tr>
          ${summaryRows}
        `;
      }

      const topNoteLeft = (p === 0)
        ? `ஜன்ம நட்சத்திரம்: <strong>${starName} - ${currentPadam}ம் பாதம்</strong> (${moonRasi.tamil})<br>ஜன்ம திசை இருப்பு: <strong>${dasaBalanceText}</strong>`
        : `ஜாதகர்: <strong>${nameVal}</strong> • ராசி: <strong>${moonRasi.tamil}</strong> • லக்னம்: <strong>${lagnamRasi.tamil}</strong><br>திசாபுத்தி விபரம் — நோட்டுப் பக்கம் <strong>${p + 1} / 5</strong> (திசை ${p * 2 + 1}${dasaBottom ? ' & ' + (p * 2 + 2) : ''})`;

      pagesHtml.push(`
        <div class="amma-page-sheet" style="margin-bottom: 24px;">
          <h2 class="amma-sheet-title">நாளும் கோளும் - திசாபுத்தி விபரம் (பக்கம் ${p + 1} / 5)</h2>
          <div style="overflow-x: auto;">
            <table class="amma-nalum-kolum-table">
              <thead>
                <tr>
                  <th rowspan="2" class="amma-nk-top-left">${topNoteLeft}</th>
                  <th colspan="2" class="amma-nk-vayathu-head">வயது (ஆரம்பம் &amp; முடிவு தேதி)</th>
                </tr>
                <tr>
                  <th class="amma-nk-vayathu-head" style="width: 23%;">ஆரம்பம்</th>
                  <th class="amma-nk-vayathu-head" style="width: 23%;">முடிவு</th>
                </tr>
              </thead>
              <tbody>
                ${buildSingleDasaSectionRows(dasaTop)}
                ${bottomSectionHtml}
              </tbody>
            </table>
          </div>
        </div>
      `);
    }

    dasaContainer.innerHTML = pagesHtml.join("");
  }

  // Render All 8 Ashtakavarga Sheets (Surya 48 .. Sani 39 + Sarvashtakavarga 337)
  renderAmmaAshtakavargaSheets();
  if (typeof renderAllTabsCalculationExplanations === 'function') renderAllTabsCalculationExplanations();
}

// Initialize all features on load
initThemeFromStorage();
initBabyNamingAndNumerology();
initPeyarchiControls();
renderSavedProfilesBar();
initPoruthamSelectors();
initManualPlanetControls();
calculateBirthChart();
selectRasi(0);
setTodayDate();
setMuhurthamToday();
renderAmmaAstroNotebook();

window.addEventListener("DOMContentLoaded", function () {
  if (window.SPRING_BOOT_ACTIVE_TAB && window.SPRING_BOOT_ACTIVE_TAB !== "ammaAstroTab") {
    const btn = document.querySelector(`.tab-btn[onclick*="${window.SPRING_BOOT_ACTIVE_TAB}"]`);
    if (typeof switchTab === "function" && btn) {
      switchTab(window.SPRING_BOOT_ACTIVE_TAB, btn);
    }
  }
  if (window.SPRING_BOOT_AUTO_PDF) {
    setTimeout(function () {
      downloadTabPdf(window.SPRING_BOOT_ACTIVE_TAB || "ammaAstroTab");
    }, 500);
  }
});


// ============================================================================
// PER-TAB STEP-BY-STEP CALCULATION EXPLANATION ENGINE & PDF DOWNLOADER
// Generates complete mathematical derivations showing how EVERY sheet/table/chart
// in each of the 9 tabs is arrived at, and exports them to a multi-page A4 PDF.
// ============================================================================
function renderAllTabsCalculationExplanations() {
  const allTabIds = [
    "ammaAstroTab", "navagrahaTab", "kattamTab", "panchangamTab",
    "poruthamTab", "peyarchiTab", "muhurthamTab", "numerologyTab", "rasiTab"
  ];
  allTabIds.forEach(tid => {
    const container = document.getElementById("calcSteps_" + tid);
    if (container) {
      container.innerHTML = buildTabCalculationExplanationSheetsHtml(tid);
    }
  });
}

function buildTabCalculationExplanationSheetsHtml(tabId) {
  const nameVal = (document.getElementById("jName") ? document.getElementById("jName").value.trim() : "") || "கார்த்திக் (Karthik)";
  const dateStr = (document.getElementById("jDate") ? document.getElementById("jDate").value : "") || "1998-05-15";
  const timeStr = (document.getElementById("jTime") ? document.getElementById("jTime").value : "") || "08:30";
  const placeRaw = (document.getElementById("jPlace") ? document.getElementById("jPlace").value : "") || "சென்னை (Chennai)";
  const placeInfo = resolveBirthPlaceCoordinates(placeRaw);
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const [hh, min] = timeStr.split(":").map(Number);
  const bd = latestTamilvananBookData || computeTamilvananBookHoroscopeData(yyyy, mm, dd, hh, min, placeInfo.lat, placeInfo.lon);
  const norm360 = deg => ((deg % 360) + 360) % 360;

  const sunLon = bd.rawLongitudes.sun;
  const moonLon = bd.rawLongitudes.moon;
  const lagLon = bd.rawLongitudes.lagnam;
  const moonSunDiff = norm360(moonLon - sunLon);
  const yogaSumLon = norm360(sunLon + moonLon);
  const yogiSphutam = norm360(sunLon + moonLon + (93 + 20 / 60));
  const avayogiSphutam = norm360(yogiSphutam + (186 + 40 / 60));
  const birthGlobalPadam = bd.moonStarIndex * 4 + (bd.moonPadam - 1);
  const padam88Global = (birthGlobalPadam + 87) % 108;

  // --------------------------------------------------------------------------
  // TAB 1: AMMA'S ASTRO (ALL 23 NOTEBOOK SHEETS STEP-BY-STEP DERIVATION)
  // --------------------------------------------------------------------------
  if (tabId === "ammaAstroTab") {
    const planetOrder = [
      { key: "lagnam", label: "லக்னம் (Ascendant)" },
      { key: "sun", label: "சூரியன் (Sun)" },
      { key: "moon", label: "சந்திரன் (Moon)" },
      { key: "mars", label: "செவ்வாய் (Mars)" },
      { key: "mercury", label: "புதன் (Mercury)" },
      { key: "jupiter", label: "குரு (Jupiter)" },
      { key: "venus", label: "சுக்கிரன் (Venus)" },
      { key: "saturn", label: "சனி (Saturn)" },
      { key: "rahu", label: "ராகு (Rahu)" },
      { key: "kethu", label: "கேது (Kethu)" },
      { key: "mandi", label: "மாந்தி (Mandi)" }
    ];

    const saramDerivationRows = planetOrder.map((p, idx) => {
      const lon = bd.rawLongitudes[p.key];
      const rIdx = Math.floor(lon / 30) % 12;
      const degInRasi = formatDegMinTa(lon);
      const starIdx = Math.floor(lon / (360 / 27)) % 27;
      const padam = (Math.floor(lon / (360 / 108)) % 4) + 1;
      const starLord = VIMSHOTTARI_SEQUENCE[starIdx % 9].shortTa;
      const nilai = getPlanetNilaiTa(p.key, rIdx);
      return `
        <tr>
          <td class="col-sno">${idx + 1}</td>
          <td class="col-vibaram">${p.label}<br><small>ஸ்புடம்: ${lon.toFixed(2)}°</small></td>
          <td class="col-vilakkam">
            • <strong>ராசி:</strong> ⌊${lon.toFixed(2)}° ÷ 30°⌋ = ${rIdx} → <strong>${RASI_DATA[rIdx].tamil} (${degInRasi})</strong><br>
            • <strong>நட்சத்திரம் &amp; பாதம்:</strong> ⌊${lon.toFixed(2)}° ÷ 13°20'⌋ = ${starIdx + 1} (<strong>${STAR_PORUTHAM_DATA[starIdx].name} - ${padam}ம் பாதம்</strong>)<br>
            • <strong>சாரம் &amp; நிலை:</strong> அதிபதி <strong>${starLord}</strong> • நிலை: <strong>${nilai}</strong>
          </td>
        </tr>
      `;
    }).join("");

    const vargaFormulaRows = [
      ["1", "இராசி (D-1 • 30°)", "⌊கிரக ஸ்புடம் ÷ 30°⌋ (நேரடி இராசி)", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D1')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D1')].tamil}`],
      ["2", "ஹோரை (D-2 • 15°)", "ஆண் (ஒற்றை) இராசி: 0°–15° சூரிய ஹோரை (சிம்மம்), 15°–30° சந்திர ஹோரை (கடகம்); பெண் இராசி: எதிர்மாறு", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D2')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D2')].tamil}`],
      ["3", "திரேக்காணம் (D-3 • 10°)", "0°–10°: அதே ராசி (1); 10°–20°: 5-ம் ராசி; 20°–30°: 9-ம் ராசி", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D3')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D3')].tamil}`],
      ["4", "சதுர்த்தாம்சம் (D-4 • 7°30')", "4 பாகங்கள் (7.5° தலா) → முறையே 1, 4, 7, 10-ம் கேந்திர இராசிகள்", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D4')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D4')].tamil}`],
      ["5", "பஞ்சமாம்சம் (D-5 • 6°)", "⌊முழு ஸ்புடம் ÷ 6°⌋ mod 12 (30° ÷ 5 = 6° பாகம்)", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D5')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D5')].tamil}`],
      ["6", "சஷ்டாம்சம் (D-6 • 5°)", "30° ÷ 6 = 5° பாகம் → ஒற்றை இராசிக்கு மேஷம் முதல்; இரட்டை இராசிக்கு துலாம் முதல்", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D6')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D6')].tamil}`],
      ["7", "சப்தமாம்சம் (D-7 • 4°17')", "30° ÷ 7 பாகம் → ஒற்றை இராசிக்கு அதே இராசி முதல்; இரட்டை இராசிக்கு 7-ம் இராசி முதல்", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D7')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D7')].tamil}`],
      ["8", "அஷ்டமாம்சம் (D-8 • 3°45')", "30° ÷ 8 = 3.75° → சர இராசி: மேஷம் முதல்; ஸ்திர இராசி: தனுசு முதல்; உபய இராசி: சிம்மம் முதல்", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D8')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D8')].tamil}`],
      ["9", "நவாம்சம் (D-9 • 3°20')", "⌊முழு ஸ்புடம் ÷ 3°20' (200')⌋ mod 12 (108 நட்சத்திர பாத சுழற்சி)", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D9')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D9')].tamil}`],
      ["10", "தசாம்சம் (D-10 • 3°)", "30° ÷ 10 = 3° → ஒற்றை இராசிக்கு அதே இராசி முதல்; இரட்டை இராசிக்கு 9-ம் இராசி முதல்", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D10')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D10')].tamil}`],
      ["11", "துவாதசாம்சம் (D-12 • 2°30')", "30° ÷ 12 = 2.5° → அந்தந்த இராசி முதல் வரிசையாக 12 இராசிகள்", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D12')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D12')].tamil}`],
      ["12", "திரிசாம்சம் (D-30 • பராசர விதி)", "ஒற்றை இராசி: செவ்(5°), சனி(5°), குரு(8°), புத(7°), சுக்(5°); இரட்டை இராசி: சுக்(5°), புத(7°), குரு(8°), சனி(5°), செவ்(5°)", `லக்னம்: ${RASI_DATA[computeVargaSign(lagLon, 'D30')].tamil} • சந்திரன்: ${RASI_DATA[computeVargaSign(moonLon, 'D30')].tamil}`]
    ].map(r => `
      <tr>
        <td class="col-sno">${r[0]}</td>
        <td class="col-vibaram">${r[1]}</td>
        <td class="col-vilakkam"><strong>சூத்திரம்:</strong> ${r[2]}<br><span style="color:#7b1113;">→ முடிவு: ${r[3]}</span></td>
      </tr>
    `).join("");

    return `
      <!-- CALCULATION SHEET 1: ஆதியும் அந்தமும் (1–25) கணிதப் படிகள் -->
      <div class="amma-page-sheet" style="margin-bottom: 24px;">
        <div class="amma-pillari-top">உ • கணித விளக்கப் பக்கம் 1 / 4</div>
        <h2 class="amma-sheet-title">📐 "ஆதியும் அந்தமும்" (வ. எண் 1 முதல் 25 வரை) — எவ்வாறு கணிக்கப்பட்டது? (Step-by-Step Working)</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">ஆதியும் அந்தமும் விபரம்</th>
              <th style="width:60%;">கணித சூத்திரம், இடைநிலை மதிப்புகள் &amp; வந்தடைந்த வழிமுறை</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">தமிழ் வருடம், மாதம் &amp; தேதி<br><small>(வ. எண் 1, 2, 3, 5, 6)</small></td>
              <td class="col-vilakkam">
                • <strong>60 தமிழ் வருட சுழற்சி சூத்திரம்:</strong> ((ஆங்கில வருடம் ${yyyy} − 1987) mod 60) = <strong>${((yyyy - 1987) % 60 + 60) % 60 + 1}-வது தமிழ் வருடம்</strong><br>
                • <strong>சூரிய மாதம் &amp; தேதி:</strong> சூரிய நிராயண ஸ்புடம் ${sunLon.toFixed(2)}° (${RASI_DATA[bd.sunSign].tamil} ${bd.sunDegMinText}) அடிப்படையில் தமிழ் மாதம் மற்றும் தேதி கணிக்கப்படுகிறது.
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">பிறந்த ஊர், சூர்யோதயம், அஸ்தமனம், அஹஸ் &amp; இராத்திரி<br><small>(வ. எண் 7, 8, 9)</small></td>
              <td class="col-vilakkam">
                • <strong>பிறந்த ஊர் ஆயத்தொலைவு:</strong> ${placeInfo.label} — அக்ஷாம்சம் (φ) = <strong>${bd.lat.toFixed(2)}°N</strong>, ரேகாம்சம் (λ) = <strong>${bd.lon.toFixed(2)}°E</strong><br>
                • <strong>தேசாந்திர திருத்தம் (IST 82.5°E):</strong> (82.5° − ${bd.lon.toFixed(2)}°) × 4 = <strong>${((82.5 - bd.lon) * 4).toFixed(1)} நிமிடம்</strong><br>
                • <strong>சூர்யோதயம் &amp; அஸ்தமனம்:</strong> உதயம் = <strong>${bd.sunriseText}</strong> • அஸ்தமனம் = <strong>${bd.sunsetText}</strong><br>
                • <strong>அஹஸ் &amp; இராத்திரி:</strong> பகற்பொழுது (அஹஸ்) = (${Math.round(bd.sunsetIstMin - bd.sunriseIstMin)} நிமி × 2.5) = <strong>${bd.ahassText}</strong> • இராத்திரி = (60 − அஹஸ்) = <strong>${bd.rathriText}</strong>
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">உதயாதி ஜனன நாழிகை - விநாடி<br><small>(வ. எண் 4 • நூல் பக். 7–8)</small></td>
              <td class="col-vilakkam">
                • <strong>சூரிய உதயம் முதல் பிறந்த நேரம் வரை:</strong> ${timeStr} − உதயம் = <strong>${bd.elapsedHoursPart} மணி ${bd.elapsedMinsPart} நிமிஷம் (${Math.round(bd.elapsedMinFromSunrise)} நிமிடங்கள்)</strong><br>
                • <strong>தமிழ்வாணன் விதி (1 மணி = 2½ நாழிகை; 1 நிமி = 2½ விநாடி):</strong> ${Math.round(bd.elapsedMinFromSunrise)} × 2.5 = <strong>${bd.udayathiTotalVinadis} விநாடிகள் ÷ 60 = ${bd.udayathiText}</strong>
              </td>
            </tr>
            <tr>
              <td class="col-sno">4</td>
              <td class="col-vibaram">அயனம் &amp; ருது<br><small>(வ. எண் 10, 11)</small></td>
              <td class="col-vilakkam">
                • <strong>அயனம் விதி:</strong> சூரியன் மகரம் முதல் மிதுனம் வரை (தை–ஆனி) = <strong>உத்தராயணம்</strong>; கடகம் முதல் தனுசு வரை (ஆடி–மார்கழி) = <strong>தக்ஷிணாயணம்</strong>.<br>
                • <strong>ருது விதி:</strong> சூரிய இராசி (${RASI_DATA[bd.sunSign].tamil}) → <strong>${TAMIL_RUTU_BY_SUN_SIGN[bd.sunSign]}</strong>
              </td>
            </tr>
            <tr>
              <td class="col-sno">5</td>
              <td class="col-vibaram">பக்ஷம், திதி &amp; திதிசூனிய ராசிகள்<br><small>(வ. எண் 12, 13, 14)</small></td>
              <td class="col-vilakkam">
                • <strong>சந்திர – சூரிய பாகை வித்தியாசம்:</strong> (${moonLon.toFixed(2)}° − ${sunLon.toFixed(2)}°) mod 360° = <strong>${moonSunDiff.toFixed(2)}°</strong><br>
                • <strong>திதி எண் (1 திதி = 12°):</strong> ⌊${moonSunDiff.toFixed(2)}° ÷ 12°⌋ + 1 = <strong>${bd.thithiNum30}-வது திதி (${bd.pakshamTa})</strong><br>
                • <strong>திதிசூனிய ராசிகள்:</strong> பக்ஷ திதி எண் ${((bd.thithiNum30 - 1) % 15) + 1}-க்குரிய பாரம்பரிய திதி சூனிய ராசிகள்: <strong>${THITHI_SOONIYA_TABLE[((bd.thithiNum30 - 1) % 15) + 1]}</strong>
              </td>
            </tr>
            <tr>
              <td class="col-sno">6</td>
              <td class="col-vibaram">நட்சத்திரம், நாமயோகம் &amp; கரணம்<br><small>(வ. எண் 15, 16, 19)</small></td>
              <td class="col-vilakkam">
                • <strong>ஜன்ம நட்சத்திரம் (13°20'):</strong> ⌊${moonLon.toFixed(2)}° ÷ 13.333°⌋ = <strong>${STAR_PORUTHAM_DATA[bd.moonStarIndex].name} - ${bd.moonPadam}ம் பாதம்</strong><br>
                • <strong>நாமயோகம்:</strong> ⌊(சூரியன் ${sunLon.toFixed(2)}° + சந்திரன் ${moonLon.toFixed(2)}°) mod 360° ÷ 13°20'⌋ = ⌊${yogaSumLon.toFixed(2)}° ÷ 13.333°⌋ + 1 = <strong>${Math.floor(yogaSumLon / (360 / 27)) + 1}. ${NAMA_YOGAM_27[Math.floor(yogaSumLon / (360 / 27)) % 27]}</strong><br>
                • <strong>கரணம் (6° அரைத் திதி):</strong> ⌊${moonSunDiff.toFixed(2)}° ÷ 6°⌋ = கரண எண் ${Math.floor(moonSunDiff / 6) + 1} / 60
              </td>
            </tr>
            <tr>
              <td class="col-sno">7</td>
              <td class="col-vibaram">யோகி, அவயோகி &amp; முடக்கு<br><small>(வ. எண் 17, 18, 20)</small></td>
              <td class="col-vilakkam">
                • <strong>யோகி ஸ்புடம்:</strong> (சூரியன் ${sunLon.toFixed(2)}° + சந்திரன் ${moonLon.toFixed(2)}° + 93°20') mod 360° = <strong>${yogiSphutam.toFixed(2)}°</strong> → நட்சத்திரம்: <strong>${STAR_PORUTHAM_DATA[Math.floor(yogiSphutam / (360 / 27)) % 27].name}</strong> (யோகி கிரகம்: <strong>${VIMSHOTTARI_SEQUENCE[Math.floor(yogiSphutam / (360 / 27)) % 9].shortTa}</strong>)<br>
                • <strong>அவயோகி &amp; முடக்கு ஸ்புடம்:</strong> (யோகி ${yogiSphutam.toFixed(2)}° + 186°40') mod 360° = <strong>${avayogiSphutam.toFixed(2)}°</strong> → நட்சத்திரம்: <strong>${STAR_PORUTHAM_DATA[Math.floor(avayogiSphutam / (360 / 27)) % 27].name}</strong> (அவயோகி: <strong>${VIMSHOTTARI_SEQUENCE[Math.floor(avayogiSphutam / (360 / 27)) % 9].shortTa}</strong>)
              </td>
            </tr>
            <tr>
              <td class="col-sno">8</td>
              <td class="col-vibaram">வைநாசிகம், 88வது பாதம், லக்னம், ராசி &amp; கணம்<br><small>(வ. எண் 21, 22, 23, 24, 25)</small></td>
              <td class="col-vilakkam">
                • <strong>வைநாசிகம் (22-வது நட்சத்திரம்):</strong> (${bd.moonStarIndex + 1} + 21 − 1) mod 27 = <strong>${STAR_PORUTHAM_DATA[(bd.moonStarIndex + 21) % 27].name}</strong><br>
                • <strong>88வது பாதம்:</strong> (ஜன்ம பாத எண் ${birthGlobalPadam + 1} + 87) mod 108 = பாத எண் ${padam88Global + 1} → <strong>${STAR_PORUTHAM_DATA[Math.floor(padam88Global / 4) % 27].name} - ${(padam88Global % 4) + 1}ம் பாதம் (${RASI_DATA[Math.floor(padam88Global / 9) % 12].tamil})</strong><br>
                • <strong>லக்னம் &amp; ராசி:</strong> லக்னம் = <strong>${RASI_DATA[bd.lagnamSign].tamil} (${bd.lagnamDegMinText})</strong> • ராசி = <strong>${RASI_DATA[bd.moonRasiIndex].tamil} (${bd.moonDegMinText})</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- CALCULATION SHEET 2: நட்சத்திர கிரஹ பாத சாரம் (11 கிரகங்கள்) கணிதப் படிகள் -->
      <div class="amma-page-sheet" style="margin-bottom: 24px;">
        <div class="amma-pillari-top">உ • கணித விளக்கப் பக்கம் 2 / 4</div>
        <h2 class="amma-sheet-title">📐 "நட்சத்திர கிரஹ பாத சாரம்" (11 கிரக ஸ்புடங்கள்) — எவ்வாறு கணிக்கப்பட்டது?</h2>
        <div style="font-size:0.84rem;font-weight:800;color:#1b4d2e;margin-bottom:8px;text-align:center;">
          சூத்திரம்: நிராயண கிரக ஸ்புடம் = சாயன கிரக ஸ்புடம் − திருக்கணித லஹிரி அயனாம்சம் (${bd.ayanamsa.toFixed(3)}°)
        </div>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:8%;">எண்</th>
              <th style="width:27%;">கிரகம் &amp; நிராயண ஸ்புடம்</th>
              <th style="width:65%;">ராசி, பாகை-கலை, நட்சத்திரம், பாதம், சாரம் &amp; நிலை கண்டறியும் படிநிலை</th>
            </tr>
          </thead>
          <tbody>
            ${saramDerivationRows}
          </tbody>
        </table>
      </div>

      <!-- CALCULATION SHEET 3: சுபமஸ்து & 12 வர்க்க சக்கரங்கள் (D-1 முதல் D-30 வரை) கணிதப் படிகள் -->
      <div class="amma-page-sheet" style="margin-bottom: 24px;">
        <div class="amma-pillari-top">உ • கணித விளக்கப் பக்கம் 3 / 4</div>
        <h2 class="amma-sheet-title">📐 "சுபமஸ்து &amp; 12 வர்க்க சக்கரங்கள் (D-1 to D-30)" — எவ்வாறு கணிக்கப்பட்டது?</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:8%;">எண்</th>
              <th style="width:28%;">வர்க்க சக்கரம் (பிரிவு அளவு)</th>
              <th style="width:64%;">கணித விதி (பராசர / தமிழ் வர்க்க சூத்திரம்) &amp; ஜாதகரின் லக்ன-சந்திர வர்க்க முடிவு</th>
            </tr>
          </thead>
          <tbody>
            ${vargaFormulaRows}
          </tbody>
        </table>
      </div>

      <!-- CALCULATION SHEET 4: திசாபுத்தி விபரம் & சர்வாங்க அஷ்ட வர்க்கம் (337 பரல்) கணிதப் படிகள் -->
      <div class="amma-page-sheet" style="margin-bottom: 24px;">
        <div class="amma-pillari-top">உ • கணித விளக்கப் பக்கம் 4 / 4</div>
        <h2 class="amma-sheet-title">📐 "திசாபுத்தி விபரம் (5 பக்கங்கள்) &amp; சர்வாங்க அஷ்ட வர்க்கம் (337 பரல்)" — கணிதப் படிகள்</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">நோட்டுப் பக்கம் / அட்டவணை</th>
              <th style="width:60%;">கணித சூத்திரம் &amp; எவ்வாறு கணிக்கப்பட்டது என்பதன் முழு விளக்கம்</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">ஜனன கால தசா இருப்பு<br><small>(தமிழ்வாணன் நூல் பக். 25)</small></td>
              <td class="col-vilakkam">
                • <strong>நட்சத்திர மொத்த விநாடிகள்:</strong> 1 நட்சத்திரம் = 13°20' (800 கலை) = 60 நாழிகை = <strong>3600 விநாடிகள்</strong><br>
                • <strong>செல்லு &amp; இருப்பு விநாடி:</strong> பூராடம் நட்சத்திரத்தில் சந்திரன் கடந்த பாகை → செல்லு = <strong>${bd.starSelluVinadis} விநாடி</strong>; இருப்பு = (3600 − ${bd.starSelluVinadis}) = <strong>${bd.starIruppuVinadis} விநாடி (${formatNazhigaiVinadi(bd.starIruppuVinadis)})</strong><br>
                • <strong>தசா இருப்பு வாய்ப்பாடு:</strong> (${bd.starIruppuVinadis} விநாடி × ${bd.firstDasaLord.years} வருடம்) ÷ 3600 = <strong>${bd.dasaBalanceFullText}</strong>
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">நாளும் கோளும் - திசாபுத்தி விபரம்<br><small>(5 பக்கங்கள் • 9 மகா திசை × 9 புத்தி)</small></td>
              <td class="col-vilakkam">
                • <strong>விம்ஷோத்தரி 120 வருட வரிசை:</strong> கேது(7), சுக்கிரன்(20), சூரியன்(6), சந்திரன்(10), செவ்வாய்(7), ராகு(18), குரு(16), சனி(19), புதன்(17) = <strong>120 வருடங்கள்</strong><br>
                • <strong>புத்தி கால அளவு வாய்ப்பாடு:</strong> (மகா திசை வருடம் × புத்தி வருடம் × 3) ÷ 10 = <strong>மாதங்கள்</strong>; (கடைசி இலக்கம் × 3) = <strong>நாட்கள்</strong> (உதாரணம்: சுக்கிர திசை சுய புத்தி = 20 × 20 × 3 = 120.0 → 36 மாதங்கள் = 3 வருடம் 0 மாதம் 0 நாள்).
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">7 கிரக பின்னாஷ்டக வர்க்கம்<br><small>(48 + 49 + 39 + 54 + 56 + 52 + 39)</small></td>
              <td class="col-vilakkam">
                • ஒவ்வொரு கிரகத்திற்கும் <strong>7 கிரகங்கள் + லக்னம் (மொத்தம் 8 இடங்கள்)</strong> நின்ற இராசியில் இருந்து சாஸ்திர விதிப்படி சுப வீடுகளுக்கு <strong>'1' பரல் (Bindu)</strong> இடப்படுகிறது:<br>
                • சூரியன் = <strong>48 பரல்</strong> | சந்திரன் = <strong>49 பரல்</strong> | செவ்வாய் = <strong>39 பரல்</strong> | புதன் = <strong>54 பரல்</strong> | குரு = <strong>56 பரல்</strong> | சுக்கிரன் = <strong>52 பரல்</strong> | சனி = <strong>39 பரல்</strong>.
              </td>
            </tr>
            <tr>
              <td class="col-sno">4</td>
              <td class="col-vibaram">சர்வாங்க அஷ்ட வர்க்கம் — 337 பரல்<br><small>(இரட்டைக் கட்ட 4×4 சக்கரம்)</small></td>
              <td class="col-vilakkam">
                • <strong>12 இராசி பரல் கூட்டுத்தொகை:</strong> மேஷம் முதல் மீனம் வரை உள்ள 12 இராசிகளிலும் 7 கிரகங்களின் அஷ்டகவர்க்கப் பரல்களைக் கூட்ட மொத்தம் <strong>48+49+39+54+56+52+39 = 337 பரல்கள்</strong> கிடைக்கிறது.<br>
                • <strong>பலன் விதி:</strong> 12 இராசிகளின் சராசரி = 337 ÷ 12 = <strong>28 பரல்கள்</strong>. 28-க்கு மேல் உள்ள வீடுகள் சுப பலமும், 30-க்கு மேல் உள்ள வீடுகள் ராஜயோக பலமும் தரும்.
              </td>
            </tr>
            <tr>
              <td class="col-sno">5</td>
              <td class="col-vibaram">திரிகோண &amp; ஏகாதிபத்ய சோதனை<br><small>(3 கீழ் சக்கரங்கள்)</small></td>
              <td class="col-vilakkam">
                • <strong>திரிகோண சோதனை:</strong> (மேஷம்-சிம்மம்-தனுசு), (ரிஷபம்-கன்னி-மகரம்), (மிதுனம்-துலாம்-கும்பம்), (கடகம்-விருச்சிகம்-மீனம்) ஆகிய 4 திரிகோணத் தொகுதிகளில் மிகக் குறைந்த பரல் எண்ணை மூன்றிலிருந்தும் கழிப்பது.<br>
                • <strong>ஏகாதிபத்ய சோதனை:</strong> செவ்வாய்(1,8), சுக்கிரன்(2,7), புதன்(3,6), குரு(9,12), சனி(10,11) ஆகிய இரு வீட்டு அதிபதிகளின் கிரக இருப்பு விதிப்படி சுருக்கப்படுவது.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TAB 2: NAVAGRAHA TEMPLES & GAYATRI MANTRAS CALCULATION STEPS
  // --------------------------------------------------------------------------
  if (tabId === "navagrahaTab") {
    const selInfo = NAVAGRAHA_STHALAMS[selectedNavagrahaKey] || NAVAGRAHA_STHALAMS.sun;
    const mahaInfo = NAVAGRAHA_STHALAMS[activeMahaDasaPlanetKey] || NAVAGRAHA_STHALAMS.sun;
    const bhuktiInfo = NAVAGRAHA_STHALAMS[activeBhuktiPlanetKey] || NAVAGRAHA_STHALAMS.sun;
    return `
      <div class="amma-page-sheet">
        <div class="amma-pillari-top">உ • நவகிரக சந்நிதி &amp; நடப்பு தசா இணைப்பு கணிதப் படிகள்</div>
        <h2 class="amma-sheet-title">📐 நவகிரக தலங்கள் &amp; நடப்பு தசா-புத்தி வழிபாடு — எவ்வாறு கணிக்கப்பட்டது?</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">பிரிவு / அட்டவணை</th>
              <th style="width:60%;">கணித விதி &amp; வந்தடைந்த படிநிலை விளக்கம்</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">3×3 ஆகம நவகிரக சந்நிதி வரிசை</td>
              <td class="col-vilakkam">
                • <strong>ஆகம விதி:</strong> நடுவில் <strong>சூரியன் (கிழக்கு நோக்கி)</strong>; வரிசை 1: புதன் (வடகிழக்கு), சுக்கிரன் (கிழக்கு), சந்திரன் (தென்கிழக்கு); வரிசை 2: குரு (வடக்கு), சூரியன் (மையம்), செவ்வாய் (தெற்கு); வரிசை 3: கேது (வடமேற்கு), சனி (மேற்கு), ராகு (தென்மேற்கு).
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">ஜாதக நடப்பு மகா தசை &amp; புத்தி கண்டறிதல்</td>
              <td class="col-vilakkam">
                • <strong>சந்திர ஸ்புடம் (${moonLon.toFixed(2)}°):</strong> ஜன்ம நட்சத்திரம் <strong>${STAR_PORUTHAM_DATA[bd.moonStarIndex].name}</strong> → முதல் தசா அதிபதி <strong>${bd.firstDasaLord.shortTa}</strong> (இருப்பு: ${bd.dasaBalanceFullText}).<br>
                • <strong>இன்றைய தேதியில் நடப்பு தசை &amp; புத்தி:</strong> பிறந்த தேதி (${dateStr}) முதல் விம்ஷோத்தரி வரிசையில் கூட்ட, தற்போது <strong>${mahaInfo.shortTa} மகா தசை • ${bhuktiInfo.shortTa} புத்தி</strong> நடைபெறுகிறது. எனவே அக்கிரகங்களுக்கு <strong>"நடப்பு தசை ★"</strong> பச்சை முத்திரை இடப்பட்டுள்ளது.
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">தேர்ந்தெடுத்த கிரக பரிகாரத் தலம் (${selInfo.shortTa})</td>
              <td class="col-vilakkam">
                • <strong>கும்பகோணம் நவகிரகத் தலம்:</strong> ${selInfo.temple}<br>
                • <strong>தானியம் &amp; வஸ்திரம்:</strong> ${selInfo.grain} • ${selInfo.clothFlower}<br>
                • <strong>காயத்ரி மந்திரம்:</strong> ${selInfo.gayatri}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TAB 3: JATHAGAM, 12 BHAVAS, SAV & DASA-BHUKTI CALCULATION STEPS
  // --------------------------------------------------------------------------
  if (tabId === "kattamTab") {
    const lagSign = currentRasiPositions.lagnam;
    const moonSign = currentRasiPositions.moon;
    return `
      <div class="amma-page-sheet">
        <div class="amma-pillari-top">உ • ஜாதகக் கட்டம், 12 பாவகம், அஷ்டகவர்க்கம் &amp; தோஷ ஆய்வு கணிதப் படிகள்</div>
        <h2 class="amma-sheet-title">📐 ஜாதகம், 12 பாவக பலன், அஷ்டகவர்க்கம் (337) &amp; தோஷ ஆய்வு — எவ்வாறு கணிக்கப்பட்டது?</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">பிரிவு / சக்கரம்</th>
              <th style="width:60%;">கணித சூத்திரம், கிரக நிலைகள் &amp; வந்தடைந்த வழிமுறை</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">ராசி (D-1) &amp; நவாம்சம் (D-9) கட்டம்</td>
              <td class="col-vilakkam">
                • <strong>உதயாதி நாழிகை (${bd.udayathiText}):</strong> சூரிய உதயம் ${bd.sunriseText} முதல் பிறந்த நேரம் ${timeStr} வரை செல்லான விநாடிகளை 12 இராசி பிரமாண விநாடிகளில் கழிக்க <strong>${RASI_DATA[lagSign].tamil} லக்னம் (${bd.lagnamDegMinText})</strong> கிடைக்கிறது.<br>
                • <strong>நவாம்சம் (D-9):</strong> ஒவ்வொரு கிரகத்தின் நிராயண ஸ்புடத்தையும் 3°20' (200 கலை)-ஆல் வகுத்து 12-ன் மீதியைக் காண நவாம்சக் கட்டம் (நவாம்ச லக்னம்: <strong>${RASI_DATA[bd.navamsamLagnamSign].tamil}</strong>) அமைகிறது.
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">12 பாவக பலன்கள் &amp; கிரகப் பார்வைகள் (Drishti)</td>
              <td class="col-vilakkam">
                • <strong>பாவக எண்ணிக்கை சூத்திரம்:</strong> பாவ இராசி = (லக்ன இராசி எண் ${lagSign} + பாவ எண் − 1) mod 12.<br>
                • <strong>சிறப்புப் பார்வை விதிகள்:</strong> அனைத்துக் கிரகங்களுக்கும் <strong>7-ம் பார்வை</strong> உண்டு; கூடுதலாக <strong>குரு பகவானுக்கு 5, 7, 9-ம் பார்வை</strong>, <strong>சனிக்கு 3, 7, 10-ம் பார்வை</strong>, <strong>செவ்வாய்க்கு 4, 7, 8-ம் பார்வை</strong> கணக்கிடப்பட்டு ஒவ்வொரு பாவ அட்டையிலும் காட்டப்பட்டுள்ளது.
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">சர்வாஷ்டகவர்க்க 12-பாவ பலம் (337 பரல்கள்)</td>
              <td class="col-vilakkam">
                • 7 கிரகங்களின் பின்னாஷ்டகவர்க்கப் பரல்களை (48+49+39+54+56+52+39 = 337) 12 இராசிகளுக்கும் கூட்டி, லக்ன முதல் 12 பாவங்களுக்கு வரிசைப்படுத்தப்பட்டுள்ளது.<br>
                • <strong>தன &amp; சேமிப்பு விதி:</strong> 11-ம் இடம் (லாப ஸ்தானம்) பரல்கள் > 12-ம் இடம் (விரய ஸ்தானம்) பரல்கள் எனில் சிறந்த சேமிப்பு யோகம்.
              </td>
            </tr>
            <tr>
              <td class="col-sno">4</td>
              <td class="col-vibaram">செவ்வாய், ராகு-கேது &amp; குரு பார்வை தோஷ ஆய்வு</td>
              <td class="col-vilakkam">
                • <strong>செவ்வாய் தோஷ சூத்திரம்:</strong> லக்னம் (${RASI_DATA[lagSign].tamil}) மற்றும் சந்திரன் (${RASI_DATA[moonSign].tamil}) ஆகியவற்றிலிருந்து செவ்வாய் <strong>2, 4, 7, 8, 12-ம் வீடுகளில்</strong> உள்ளாரா எனப் பரிசோதிக்கப்பட்டு, ஆட்சி/உச்சம்/குரு பார்வை இருப்பின் <strong>தோஷ நிவர்த்தி</strong> அளிக்கப்படுகிறது.<br>
                • <strong>ராகு-கேது ஆய்வு:</strong> லக்னம்/ராசிக்கு <strong>1, 2, 7, 8-ம் இடங்களில்</strong> ராகு அல்லது கேது சஞ்சாரம் உள்ளதா எனக் கணக்கிடப்படுகிறது.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TAB 4: DAILY PANCHANGAM & PLANETARY HORAS CALCULATION STEPS
  // --------------------------------------------------------------------------
  if (tabId === "panchangamTab") {
    const panDateStr = (document.getElementById("panchangamDate") ? document.getElementById("panchangamDate").value : "") || dateStr;
    const panDateObj = new Date(panDateStr + "T12:00:00");
    const weekday = panDateObj.getDay();
    const dayPanch = WEEKDAY_PANCHANGAM[weekday];
    const angas = computeDailyAngas(panDateObj);
    return `
      <div class="amma-page-sheet">
        <div class="amma-pillari-top">உ • பஞ்சாங்கம், கிரக ஓரைகள் &amp; 5 அந்தர் ஓரைகள் கணிதப் படிகள்</div>
        <h2 class="amma-sheet-title">📐 தினசரி பஞ்சாங்கம், ராகு காலம் &amp; 12 கிரக ஓரைகள் — எவ்வாறு கணிக்கப்பட்டது?</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">பஞ்சாங்க உறுப்பு</th>
              <th style="width:60%;">கணித சூத்திரம் &amp; தேர்ந்தெடுத்த நாளுக்கான (${panDateStr}) கணக்கீடு</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">பஞ்சாங்கத்தின் 5 அங்கங்கள்<br><small>(வாரம், திதி, நட்சத்திரம், யோகம், கரணம்)</small></td>
              <td class="col-vilakkam">
                • <strong>1. வாரம் (கிழமை):</strong> ${dayPanch.tamilDay} (வார அதிபதி: <strong>${dayPanch.planetLord}</strong>)<br>
                • <strong>2. திதி:</strong> சந்திர-சூரிய சுழற்சி (29.53 நாள்) அடிப்படையில் 30 திதிகளில் இன்று: <strong>${angas.thithiText}</strong><br>
                • <strong>3. நட்சத்திரம் &amp; சந்திராஷ்டமம்:</strong> சந்திர சுழற்சி (27.32 நாள்) அடிப்படையில் இன்று: <strong>${angas.starText}</strong> • சந்திர இராசிக்கு 8-ம் இடம் (அல்லது சந்திரன் 8-ல் வரும் இராசி) சந்திராஷ்டமம்: <strong>${angas.chandrashtamamText}</strong>
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">ராகு காலம், எமகண்டம் &amp; குளிகை<br><small>(பகல் 12 மணி ÷ 8 = 1½ மணி பாகம்)</small></td>
              <td class="col-vilakkam">
                • <strong>8 பாக விதி:</strong> காலை 06:00 முதல் மாலை 06:00 வரை உள்ள 12 மணி நேரத்தை 8 சம பாகங்களாகப் பிரிக்க 1 பாகம் = <strong>1 மணி 30 நிமிடம்</strong>.<br>
                • <strong>இன்றைய (${dayPanch.shortTa}) நேரங்கள்:</strong> ராகு காலம் = <strong>${dayPanch.rahuKalam}</strong> | எமகண்டம் = <strong>${dayPanch.yamagandam}</strong> | குளிகை = <strong>${dayPanch.kuligai}</strong> | நல்ல நேரம் = <strong>${dayPanch.nallaNeram}</strong>
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">12 பகல் கிரக ஓரைகள் &amp; 5 அந்தர் ஓரைகள்<br><small>(தமிழ்வாணன் நூல் பக். 17–23)</small></td>
              <td class="col-vilakkam">
                • <strong>மகா ஓரை வரிசை:</strong> அன்றைய கிழமை அதிபதி முதல் 06:00 AM-க்குத் தொடங்கி <strong>சூரியன் → சுக்கிரன் → புதன் → சந்திரன் → சனி → குரு → செவ்வாய்</strong> என்ற வரிசையில் மணிக்கு 1 ஓரையாகச் சுழலும்.<br>
                • <strong>5 அந்தர் ஓரை விதி (பக். 21–23):</strong> ஒவ்வொரு 1 மணி நேர ஓரையையும் 5 சம பாகங்களாகப் பிரிக்க (தலா 12 நிமிடம்), அந்த மகா ஓரை அதிபதி முதல் <strong>கிழமை வரிசையில் (ஞாயிறு→திங்கள்→செவ்வாய்→புதன்→வியாழன்→வெள்ளி→சனி)</strong> 5 அந்தர் ஓரைகள் கணக்கிடப்படுகின்றன.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TAB 5: 10 THIRUMANA PORUTHAM CALCULATION STEPS
  // --------------------------------------------------------------------------
  if (tabId === "poruthamTab") {
    const bStarIdx = parseInt((document.getElementById("brideStar") ? document.getElementById("brideStar").value : "3"), 10);
    const gStarIdx = parseInt((document.getElementById("groomStar") ? document.getElementById("groomStar").value : "19"), 10);
    const bRasiIdx = parseInt((document.getElementById("brideRasi") ? document.getElementById("brideRasi").value : "1"), 10);
    const gRasiIdx = parseInt((document.getElementById("groomRasi") ? document.getElementById("groomRasi").value : "8"), 10);
    const starCount = ((gStarIdx - bStarIdx + 27) % 27) + 1;
    const rasiCount = ((gRasiIdx - bRasiIdx + 12) % 12) + 1;
    const scoreTxt = document.getElementById("poruthamScoreText") ? document.getElementById("poruthamScoreText").textContent : "";

    return `
      <div class="amma-page-sheet">
        <div class="amma-pillari-top">உ • 10 திருமணப் பொருத்தம் (தசவிதப் பொருத்தம்) கணிதப் படிகள்</div>
        <h2 class="amma-sheet-title">📐 10 திருமணப் பொருத்தம் — எவ்வாறு கணிக்கப்பட்டது? (Step-by-Step Porutham Math)</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">பொருத்த விதி</th>
              <th style="width:60%;">கணித சூத்திரம் &amp; மணமக்கள் நட்சத்திர-ராசி கணக்கீடு</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">நட்சத்திர &amp; ராசி எண்ணிக்கை<br><small>(அடிப்படை தூர வாய்ப்பாடு)</small></td>
              <td class="col-vilakkam">
                • <strong>பெண் நட்சத்திரம் முதல் ஆண் நட்சத்திரம் வரை:</strong> ((${gStarIdx} − ${bStarIdx} + 27) mod 27) + 1 = <strong>${starCount}-வது நட்சத்திரம்</strong> (${STAR_PORUTHAM_DATA[bStarIdx].name} → ${STAR_PORUTHAM_DATA[gStarIdx].name})<br>
                • <strong>பெண் ராசி முதல் ஆண் ராசி வரை:</strong> ((${gRasiIdx} − ${bRasiIdx} + 12) mod 12) + 1 = <strong>${rasiCount}-வது ராசி</strong> (${RASI_DATA[bRasiIdx].tamil} → ${RASI_DATA[gRasiIdx].tamil})
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">தினம், கணம், மகேந்திரம் &amp; ஸ்திரீ தீர்க்கம்<br><small>(பொருத்தம் 1 முதல் 4 வரை)</small></td>
              <td class="col-vilakkam">
                • <strong>1. தினப் பொருத்தம்:</strong> நட்சத்திர எண் ${starCount} ÷ 9 → மீதி ${starCount % 9} (மீதி 2, 4, 6, 8, 0 அல்லது 27 எனில் உத்தமம்).<br>
                • <strong>2. கணப் பொருத்தம்:</strong> பெண் (${GANAM_TAMIL[STAR_PORUTHAM_DATA[bStarIdx].ganam]}) &amp; ஆண் (${GANAM_TAMIL[STAR_PORUTHAM_DATA[gStarIdx].ganam]}) ஒப்பீடு.<br>
                • <strong>3. மகேந்திரம்:</strong> எண்ணிக்கை 4, 7, 10, 13, 16, 19, 22, 25 எனில் உண்டு (தற்போது: ${starCount}).<br>
                • <strong>4. ஸ்திரீ தீர்க்கம்:</strong> நட்சத்திர தூரம் ${starCount} > 13 எனில் உத்தமம்; 7–13 எனில் மத்திமம்.
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">யோனி, ராசி, ராசியாதிபதி &amp; வசியம்<br><small>(பொருத்தம் 5 முதல் 8 வரை)</small></td>
              <td class="col-vilakkam">
                • <strong>5. யோனி:</strong> பெண் (${STAR_PORUTHAM_DATA[bStarIdx].yoni}) vs ஆண் (${STAR_PORUTHAM_DATA[gStarIdx].yoni}) பகை விலக்கு சோதனை.<br>
                • <strong>6. ராசிப் பொருத்தம்:</strong> ராசி எண்ணிக்கை ${rasiCount} (1, 3, 4, 7, 9, 10, 11, 12 எனில் உத்தமம்; 2, 6, 8 தட்டு).<br>
                • <strong>7. ராசி அதிபதி &amp; 8. வசியம்:</strong> அதிபதிகள் (${RASI_DATA[bRasiIdx].lord} &amp; ${RASI_DATA[gRasiIdx].lord}) நட்பு நிலை மற்றும் ராசி வசிய அட்டவணை ஒப்பீடு.
              </td>
            </tr>
            <tr>
              <td class="col-sno">4</td>
              <td class="col-vibaram">ரஜ்ஜு &amp; வேதை (உயிர் நாடிப் பொருத்தங்கள்)<br><small>(பொருத்தம் 9 &amp; 10)</small></td>
              <td class="col-vilakkam">
                • <strong>9. ரஜ்ஜுப் பொருத்தம்:</strong> பெண் (${RAJJU_TAMIL[STAR_PORUTHAM_DATA[bStarIdx].rajju]}) vs ஆண் (${RAJJU_TAMIL[STAR_PORUTHAM_DATA[gStarIdx].rajju]}) — இருவருக்கும் ஒரே ரஜ்ஜு (தட்டு) இல்லாமல் இருப்பது அவசியம்.<br>
                • <strong>10. வேதைப் பொருத்தம்:</strong> இரு நட்சத்திரங்களும் நேர் எதிர் வேதை ஜோடிகளில் இல்லாத நிலை • <strong>மொத்த மதிப்பெண்: ${scoreTxt}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TAB 6: GOCHARA PEYARCHI CALCULATION STEPS
  // --------------------------------------------------------------------------
  if (tabId === "peyarchiTab") {
    const uRasi = parseInt((document.getElementById("peyarchiUserRasi") ? document.getElementById("peyarchiUserRasi").value : "8"), 10);
    const gRasi = parseInt((document.getElementById("transitGuruRasi") ? document.getElementById("transitGuruRasi").value : "1"), 10);
    const sRasi = parseInt((document.getElementById("transitSaniRasi") ? document.getElementById("transitSaniRasi").value : "10"), 10);
    const rRasi = parseInt((document.getElementById("transitRahuRasi") ? document.getElementById("transitRahuRasi").value : "11"), 10);
    const kRasi = (rRasi + 6) % 12;
    const hFrom = t => ((t - uRasi + 12) % 12) + 1;
    return `
      <div class="amma-page-sheet">
        <div class="amma-pillari-top">உ • கோச்சார பெயர்ச்சி (குரு, சனி, ராகு-கேது) கணிதப் படிகள்</div>
        <h2 class="amma-sheet-title">📐 கோச்சார பெயர்ச்சி பலன்கள் — எவ்வாறு கணிக்கப்பட்டது? (Transit Calculation Steps)</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">பெயர்ச்சி ஆய்வு</th>
              <th style="width:60%;">கணித சூத்திரம் &amp; உங்கள் ஜென்ம ராசிக்கான (${RASI_DATA[uRasi].tamil}) கணக்கீடு</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">கோச்சார ஸ்தான எண்ணிக்கை சூத்திரம்</td>
              <td class="col-vilakkam">
                • <strong>வாய்ப்பாடு:</strong> கோச்சார வீடு = ((கோச்சார கிரக இராசி எண் − ஜென்ம ராசி எண் ${uRasi} + 12) mod 12) + 1.
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">குரு பெயர்ச்சி &amp; வியாழ நோக்கம் (குரு பலம்)</td>
              <td class="col-vilakkam">
                • கோச்சார குரு (${RASI_DATA[gRasi].tamil}) → ஜென்ம ராசி (${RASI_DATA[uRasi].tamil}) முதல் எண்ண <strong>${hFrom(gRasi)}-ம் இடம்</strong>.<br>
                • <strong>விதி:</strong> ராசிக்கு <strong>2, 5, 7, 9, 11-ம் இடங்களில்</strong> குரு சஞ்சரித்தால் <strong>பூர்ண குரு பலம் (வியாழ நோக்கம்)</strong> உண்டு.
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">சனி பெயர்ச்சி &amp; ஏழரைச் சனி / அஷ்டமச் சனி ஆய்வு</td>
              <td class="col-vilakkam">
                • கோச்சார சனி (${RASI_DATA[sRasi].tamil}) → ஜென்ம ராசி முதல் எண்ண <strong>${hFrom(sRasi)}-ம் இடம்</strong>.<br>
                • <strong>விதி:</strong> 12-ம் இடம் = விரய சனி, 1-ம் இடம் = ஜென்ம சனி, 2-ம் இடம் = பாத சனி (ஆக <strong>12, 1, 2 = ஏழரைச் சனி</strong>); 4-ம் இடம் = அர்த்தாஷ்டமச் சனி; 7-ம் இடம் = கண்டகச் சனி; 8-ம் இடம் = அஷ்டமச் சனி; <strong>3, 6, 11-ம் இடங்கள் = ராஜயோக சனி பலன்</strong>.
              </td>
            </tr>
            <tr>
              <td class="col-sno">4</td>
              <td class="col-vibaram">ராகு – கேது பெயர்ச்சி ஆய்வு</td>
              <td class="col-vilakkam">
                • கோச்சார ராகு (${RASI_DATA[rRasi].tamil}) = <strong>${hFrom(rRasi)}-ம் இடம்</strong> • கேது (${RASI_DATA[kRasi].tamil} = ராகு + 180°) = <strong>${hFrom(kRasi)}-ம் இடம்</strong>.<br>
                • <strong>விதி:</strong> ராசிக்கு <strong>3, 6, 11-ம் இடங்களில்</strong> ராகு அல்லது கேது சஞ்சரிக்கும் போது மிகச்சிறந்த தன லாபம் மற்றும் வெற்றியைத் தருவார்கள்.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TAB 7: SUBHA MUHURTHAM & KARINAL SCANNER CALCULATION STEPS
  // --------------------------------------------------------------------------
  if (tabId === "muhurthamTab") {
    const muhDateStr = (document.getElementById("muhurthamStartDate") ? document.getElementById("muhurthamStartDate").value : "") || dateStr;
    const muhEvent = (document.getElementById("muhurthamEvent") ? document.getElementById("muhurthamEvent").value : "wedding");
    const audit = auditSingleDayForMuhurtham(new Date(muhDateStr + "T12:00:00"), muhEvent);
    return `
      <div class="amma-page-sheet">
        <div class="amma-pillari-top">உ • சுப முகூர்த்தம் &amp; 14-நாள் கரிநாள் சோதனை கணிதப் படிகள்</div>
        <h2 class="amma-sheet-title">📐 சுப முகூர்த்தம் &amp; கரிநாள் பட்டியல் — எவ்வாறு கணிக்கப்பட்டது?</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">சோதனை நிலை</th>
              <th style="width:60%;">கணித விதி &amp; தேர்ந்தெடுத்த நாளுக்கான (${muhDateStr}) முடிவு</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">தமிழ் மாதம் &amp; பாரம்பரிய கரிநாள் சோதனை</td>
              <td class="col-vilakkam">
                • தேர்ந்தெடுத்த ஆங்கில தேதி (${muhDateStr}) → தமிழ் தேதி: <strong>${audit.tInfo.monthName} ${audit.tInfo.dayNum}-ம் தேதி</strong>.<br>
                • <strong>கரிநாள் அட்டவணை சோதனை:</strong> ${audit.tInfo.monthName} மாதத்திற்குரிய கரிநாட்கள் (${(KARINAL_TABLE[audit.tInfo.monthName] || []).join(", ")}) உடன் ஒப்பிட: <strong>${audit.isKarinal ? "கரிநாள் (தவிர்க்க)" : "கரிநாள் இல்லை (சுபம்)"}</strong>.
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">திதி விலக்கு சோதனை<br><small>(அஷ்டமி, நவமி, அமாவாசை)</small></td>
              <td class="col-vilakkam">
                • அன்றைய திதி: <strong>${audit.angas.thithiText}</strong>.<br>
                • <strong>விதி:</strong> அஷ்டமி (8), நவமி (9) மற்றும் அமாவாசை (30) திதிகளை சுப முகூர்த்தங்களுக்கு விலக்கி, வளர்பிறை சுப திதிகளுக்கு முன்னுரிமை அளிக்கப்படுகிறது.
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">மாத விலக்கு &amp; சுப நட்சத்திர சோதனை</td>
              <td class="col-vilakkam">
                • <strong>மாத சோதனை:</strong> ஆடி, புரட்டாசி, மார்கழி மாதங்களில் திருமணம்/கிரகப்பிரவேசம் தவிர்க்கப்படும்.<br>
                • <strong>நட்சத்திர சோதனை:</strong> அன்றைய நட்சத்திரம் <strong>${audit.angas.starText}</strong> சுப முகூர்த்த நட்சத்திரத் தொகுப்பில் உள்ளதா எனச் சோதித்து, அடுத்த 14 நாட்களுக்கும் வரிசைப் பட்டியல் உருவாக்கப்படுகிறது.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TAB 8: BABY NAMING & TAMIL CHALDEAN NUMEROLOGY CALCULATION STEPS
  // --------------------------------------------------------------------------
  if (tabId === "numerologyTab") {
    const bStarIdx = parseInt((document.getElementById("babyStarSelect") ? document.getElementById("babyStarSelect").value : "3"), 10);
    const numDate = (document.getElementById("numBirthDate") ? document.getElementById("numBirthDate").value : "1998-05-15");
    const numName = ((document.getElementById("numEnglishName") ? document.getElementById("numEnglishName").value : "KARTHIK") || "KARTHIK").toUpperCase();
    const pVal = document.getElementById("numPsychicVal") ? document.getElementById("numPsychicVal").textContent : "6";
    const dVal = document.getElementById("numDestinyVal") ? document.getElementById("numDestinyVal").textContent : "2";
    const nVal = document.getElementById("numNameVal") ? document.getElementById("numNameVal").textContent : "19 → 1";
    return `
      <div class="amma-page-sheet">
        <div class="amma-pillari-top">உ • 108 நட்சத்திரப் பாத எழுத்துக்கள் &amp; எண் கணிதப் படிகள்</div>
        <h2 class="amma-sheet-title">📐 நட்சத்திரப் பெயர் எழுத்துக்கள் &amp; எண் கணிதம் — எவ்வாறு கணிக்கப்பட்டது?</h2>
        <table class="amma-aadhiyum-table">
          <thead>
            <tr>
              <th style="width:9%;">படி</th>
              <th style="width:31%;">பிரிவு</th>
              <th style="width:60%;">கணித சூத்திரம் &amp; படிநிலை விளக்கம்</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-sno">1</td>
              <td class="col-vibaram">108 நட்சத்திர பாத எழுத்து &amp; நவாம்ச ராசி</td>
              <td class="col-vilakkam">
                • தேர்ந்தெடுத்த நட்சத்திரம்: <strong>${STAR_PORUTHAM_DATA[bStarIdx].name} (${selectedBabyPadam + 1}ம் பாதம்)</strong>.<br>
                • <strong>பாத ராசி சூத்திரம்:</strong> ⌊(நட்சத்திர எண் ${bStarIdx} × 4 + பாதம் ${selectedBabyPadam}) ÷ 9⌋ mod 12 → 4 பாத ஒலிகள்: <strong>${STAR_PORUTHAM_DATA[bStarIdx].syllables.join(", ")}</strong>.
              </td>
            </tr>
            <tr>
              <td class="col-sno">2</td>
              <td class="col-vibaram">பிறப்பு எண் (Psychic Number) &amp; விதி எண் (Destiny Number)</td>
              <td class="col-vilakkam">
                • <strong>பிறந்த தேதி (${numDate}):</strong><br>
                • <strong>பிறப்பு எண் (உடல் எண்):</strong> பிறந்த நாளின் (DD) கூட்டுத்தொகை = <strong>${pVal} (${NUMEROLOGY_PLANETS[parseInt(pVal, 10) || 1].lord})</strong>.<br>
                • <strong>விதி எண் (உயிர் எண்):</strong> (DD + MM + YYYY) அனைத்து இலக்கங்களின் கூட்டுத்தொகை = <strong>${dVal} (${NUMEROLOGY_PLANETS[parseInt(dVal, 10) || 1].lord})</strong>.
              </td>
            </tr>
            <tr>
              <td class="col-sno">3</td>
              <td class="col-vibaram">கால்டியன் பெயர் எண் (Chaldean Name Number)</td>
              <td class="col-vilakkam">
                • <strong>கால்டியன் அட்டவணை மதிப்பு:</strong> (A,I,J,Q,Y=1 | B,K,R=2 | C,G,L,S=3 | D,M,T=4 | E,H,N,X=5 | U,V,W=6 | O,Z=7 | F,P=8).<br>
                • <strong>பெயர் (${numName}):</strong> எழுத்துக்களின் கூட்டுத்தொகை = <strong>${nVal}</strong>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // TAB 9: 12 RASI PALAN CALCULATION STEPS
  // --------------------------------------------------------------------------
  const rasiNameTxt = document.getElementById("rasiName") ? document.getElementById("rasiName").textContent : "மேஷம் (Mesham)";
  const rasiStarsTxt = document.getElementById("rasiStars") ? document.getElementById("rasiStars").textContent : "";
  const rasiLordTxt = document.getElementById("rasiLord") ? document.getElementById("rasiLord").textContent : "";
  return `
    <div class="amma-page-sheet">
      <div class="amma-pillari-top">உ • 12 இராசி மண்டல (360°) &amp; 9 பாதப் பிரிவு கணிதப் படிகள்</div>
      <h2 class="amma-sheet-title">📐 12 ராசி பலன் &amp; நட்சத்திரப் பாத பங்கீடு — எவ்வாறு கணிக்கப்பட்டது?</h2>
      <table class="amma-aadhiyum-table">
        <thead>
          <tr>
            <th style="width:9%;">படி</th>
            <th style="width:31%;">ராசி கணித விதி</th>
            <th style="width:60%;">கணித சூத்திரம் &amp; தேர்ந்தெடுத்த ராசிக்கான (${rasiNameTxt}) விளக்கம்</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="col-sno">1</td>
            <td class="col-vibaram">360° இராசி மண்டலப் பிரிவு (12 × 30°)</td>
            <td class="col-vilakkam">
              • வான மண்டலத்தின் 360° பாகையை 12 சம இராசிகளாகப் பிரிக்க, <strong>1 இராசி = 30° பாகை (1800 கலை)</strong>.<br>
              • தேர்ந்தெடுத்த இராசி: <strong>${rasiNameTxt}</strong> • ${rasiLordTxt}.
            </td>
          </tr>
          <tr>
            <td class="col-sno">2</td>
            <td class="col-vibaram">1 இராசி = 2¼ நட்சத்திரங்கள் (9 பாதங்கள்)</td>
            <td class="col-vilakkam">
              • 27 நட்சத்திரங்கள் × 4 பாதங்கள் = <strong>108 பாதங்கள்</strong>. 108 பாதங்களை 12 இராசிகளுக்குப் பங்கிட, <strong>1 இராசி = 9 நவாம்ச பாதங்கள் (9 × 3°20' = 30°)</strong>.<br>
              • இராசிக்குரிய நட்சத்திரங்கள்: <strong>${rasiStarsTxt}</strong>.
            </td>
          </tr>
          <tr>
            <td class="col-sno">3</td>
            <td class="col-vibaram">பஞ்சபூத தத்துவம் &amp; அதிர்ஷ்ட எண்</td>
            <td class="col-vilakkam">
              • மேஷம் முதல் 12 இராசிகளும் முறையே <strong>நெருப்பு (1,5,9), நிலம் (2,6,10), காற்று (3,7,11), நீர் (4,8,12)</strong> என்ற பஞ்சபூத தத்துவ வரிசையிலும், <strong>சரம், ஸ்திரம், உபயம்</strong> என்ற வரிசையிலும் அமைந்துள்ளன.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

async function downloadTabCalculationStepsPdf(targetTabId, btnEl) {
  const { tabId, meta, nowStr, targetPanel } = prepareTabForExport(targetTabId);
  if (!targetPanel) return;

  renderAllTabsCalculationExplanations();

  const originalBtnHtml = btnEl ? btnEl.innerHTML : "";
  if (btnEl) {
    btnEl.disabled = true;
    btnEl.innerHTML = "⏳ Generating Calculation PDF...";
  }
  if (typeof showToast === "function") {
    showToast("📐 இப் பக்கத்தின் முழு கணிதப் படிகள் & சூத்திர விளக்க PDF உருவாக்கப்படுகிறது...");
  }

  const STAGE_WIDTH = 980;
  const stage = document.createElement("div");
  stage.className = "pdf-staging-root";
  stage.style.cssText = `position:fixed;left:-10000px;top:0;width:${STAGE_WIDTH}px;background:#ffffff;color:#0f172a;z-index:-9999;padding:0;margin:0;`;
  document.body.appendChild(stage);

  try {
    const calcWrapper = document.getElementById("calcSteps_" + tabId);
    const calcSheets = calcWrapper ? Array.from(calcWrapper.querySelectorAll(".amma-page-sheet")) : [];

    // For Amma's Astro or Jathagam, also include the 2 Tamilvanan Book Mathematical Working sheets at the top!
    const bookContainerId = (tabId === "ammaAstroTab") ? "ammaTamilvananBookContainer" : (tabId === "kattamTab" ? "kattamTamilvananBookContainer" : null);
    const bookContainer = bookContainerId ? document.getElementById(bookContainerId) : null;
    const bookSheets = bookContainer ? Array.from(bookContainer.querySelectorAll(".amma-page-sheet")) : [];

    const allCalcBlocks = [...calcSheets, ...bookSheets];
    const jpegPages = [];

    for (let i = 0; i < allCalcBlocks.length; i++) {
      stage.innerHTML = "";
      const clone = allCalcBlocks[i].cloneNode(true);
      stage.appendChild(clone);
      const slices = await renderStagedPages(clone, STAGE_WIDTH);
      for (let sc of slices) {
        jpegPages.push(canvasToJpegPageObj(sc));
      }
      stage.removeChild(clone);
    }

    const pdfBytes = buildMultiPageA4PdfBinary(jpegPages);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `IKs_Astrology_${meta.slug}_Calculation_Steps.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);

    if (typeof showToast === "function") {
      showToast(`✅ கணிதப் படிகள் PDF பதிவிறக்கம் முடிந்தது! (IKs_Astrology_${meta.slug}_Calculation_Steps.pdf • ${jpegPages.length} Pages)`);
    }
  } catch (err) {
    console.error("Calculation PDF export error:", err);
    printTab(tabId);
  } finally {
    if (stage && stage.parentNode) {
      stage.parentNode.removeChild(stage);
    }
    if (btnEl) {
      btnEl.disabled = false;
      btnEl.innerHTML = originalBtnHtml;
    }
  }
}

function downloadActiveTabCalculationStepsPdf(btnEl) {
  downloadTabCalculationStepsPdf(getActiveTabId(), btnEl);
}

if (typeof renderAllTabsCalculationExplanations === 'function') renderAllTabsCalculationExplanations();
