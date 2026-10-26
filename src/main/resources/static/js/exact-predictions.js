/* Exact Predictions module. Source provenance is intentionally explicit. No fake API results. */
(() => {
'use strict';
const SIGN_EN=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_TA=['மேஷம்','ரிஷபம்','மிதுனம்','கடகம்','சிம்மம்','கன்னி','துலாம்','விருச்சிகம்','தனுசு','மகரம்','கும்பம்','மீனம்'];
const PLANET_ID={PLANET_SUN:'sun',PLANET_MOON:'moon',PLANET_MARS:'mars',PLANET_MERCURY:'mercury',PLANET_JUPITER:'jupiter',PLANET_VENUS:'venus',PLANET_SATURN:'saturn',PLANET_RAHU:'rahu',PLANET_KETU:'ketu',PLANET_ASCENDANT:'lagnam',UPAGRAHA_MANDI:'mandi'};
const PKEY=['sun','moon','mars','mercury','jupiter','venus','saturn'];
const TA={lagnam:'லக்',sun:'சூரி',moon:'சந்',mars:'செவ்',mercury:'புத',jupiter:'குரு',venus:'சுக்',saturn:'சனி',rahu:'ராகு',ketu:'கேது',mandi:'மாந்தி'};
const PN={sun:'சூரியன்',moon:'சந்திரன்',mars:'செவ்வாய்',mercury:'புதன்',jupiter:'குரு',venus:'சுக்கிரன்',saturn:'சனி',rahu:'ராகு',ketu:'கேது',mandi:'மாந்தி',lagnam:'இலக்கனம்'};
const TOTALS={sun:48,moon:49,mars:39,mercury:54,jupiter:56,venus:52,saturn:39};
const GRID=[{r:1,c:1,i:11},{r:1,c:2,i:0},{r:1,c:3,i:1},{r:1,c:4,i:2},{r:2,c:1,i:10},{r:2,c:4,i:3},{r:3,c:1,i:9},{r:3,c:4,i:4},{r:4,c:1,i:8},{r:4,c:2,i:7},{r:4,c:3,i:6},{r:4,c:4,i:5}];
// This is the same classical contributor rule-set shipped in the preserved Amma's Astro tab.
const EP_AV_RULES = {
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
const $ = id => document.getElementById(id);
const esc = x => String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const NAK_TA={ASHWINI:'அசுவினி',BHARANI:'பரணி',KRITTIKA:'கார்த்திகை',ROHINI:'ரோகிணி',MRIGASHIRSHA:'மிருகசீரிடம்',ARDRA:'திருவாதிரை',PUNARVASU:'புனர்பூசம்',PUSHYA:'பூசம்',ASHLESHA:'ஆயில்யம்',MAGHA:'மகம்',PURVA_PHALGUNI:'பூரம்',UTTARA_PHALGUNI:'உத்திரம்',HASTA:'அஸ்தம்',CHITRA:'சித்திரை',SWATI:'சுவாதி',VISHAKHA:'விசாகம்',ANURADHA:'அனுஷம்',JYESHTHA:'கேட்டை',MULA:'மூலம்',PURVA_ASHADHA:'பூராடம்',UTTARA_ASHADHA:'உத்திராடம்',SHRAVANA:'திருவோணம்',DHANISHTA:'அவிட்டம்',SHATABHISHA:'சதயம்',PURVA_BHADRAPADA:'பூரட்டாதி',UTTARA_BHADRAPADA:'உத்திரட்டாதி',REVATI:'ரேவதி'};
const WORD_TA={CHITRAI:'சித்திரை',VAIKASI:'வைகாசி',AANI:'ஆனி',AADI:'ஆடி',AVANI:'ஆவணி',PURATTASI:'புரட்டாசி',AIPPASI:'ஐப்பசி',KARTHIGAI:'கார்த்திகை',MARGAZHI:'மார்கழி',THAI:'தை',MASI:'மாசி',PANGUNI:'பங்குனி',SUKLA:'வளர்பிறை',SHUKLA:'வளர்பிறை',KRISHNA:'தேய்பிறை',PRATIPADA:'பிரதமை',DVITIYA:'துவிதியை',TRITIYA:'திருதியை',CHATURTHI:'சதுர்த்தி',PANCHAMI:'பஞ்சமி',SHASHTHI:'சஷ்டி',SAPTAMI:'சப்தமி',ASHTAMI:'அஷ்டமி',NAVAMI:'நவமி',DASHAMI:'தசமி',EKADASHI:'ஏகாதசி',DVADASHI:'துவாதசி',TRAYODASHI:'திரயோதசி',CHATURDASHI:'சதுர்தசி',PURNIMA:'பௌர்ணமி',AMAVASYA:'அமாவாசை',SUN:'சூரியன்',MOON:'சந்திரன்',MARS:'செவ்வாய்',MERCURY:'புதன்',JUPITER:'குரு',VENUS:'சுக்கிரன்',SATURN:'சனி',RAHU:'ராகு',KETU:'கேது',ASCENDANT:'இலக்கனம்',MONDAY:'திங்கள்',TUESDAY:'செவ்வாய்',WEDNESDAY:'புதன்',THURSDAY:'வியாழன்',FRIDAY:'வெள்ளி',SATURDAY:'சனி',SUNDAY:'ஞாயிறு',PISCES:'மீனம்',ARIES:'மேஷம்',TAURUS:'ரிஷபம்',GEMINI:'மிதுனம்',CANCER:'கடகம்',LEO:'சிம்மம்',VIRGO:'கன்னி',LIBRA:'துலாம்',SCORPIO:'விருச்சிகம்',SAGITTARIUS:'தனுசு',CAPRICORN:'மகரம்',AQUARIUS:'கும்பம்',LAHIRI:'லஹிரி',PRO:'புரோ',START:'தொடக்கம்',END:'முடிவு',DURATION:'காலஅளவு',YEARS:'ஆண்டுகள்',LORD:'அதிபதி',PLANET:'கிரகம்',NAME:'பெயர்',PERIOD:'காலம்',MAHADASHA:'மகாதசை',MAHADASA:'மகாதசை',BHUKTI:'புத்தி',ANTARDASHA:'அந்தரதசை',PRATYANTAR:'பிரத்யந்தரம்',PRATIPADA:'பிரதமை',BAVA:'பவம்',VISHKAMBHA:'விஷ்கம்பம்'};
function readable(x){const raw=String(x??'');if(!raw)return '';const str=raw.replace(/^(PLANET|CHART_POINT|NAKSHATRA|TITHI|SIGN|NITHYA_YOGA|AYANAMSA|KARANA|TAMIL_YEAR|TAMIL_MONTH|WEEKDAY)_/,'').toUpperCase();if(NAK_TA[str])return NAK_TA[str];if(WORD_TA[str])return WORD_TA[str];if(str.startsWith('SHUKLA_'))return 'வளர்பிறை '+readable(str.slice(7));if(str.startsWith('KRISHNA_'))return 'தேய்பிறை '+readable(str.slice(8));return raw.includes('தமிழ்')||/[\u0B80-\u0BFF]/.test(raw)?raw:raw.replaceAll('_',' ');}
function displayValue(x){if(x==null||x==='')return '—';if(Array.isArray(x))return x.map(displayValue).join(' / ');if(typeof x==='object'){const best=field(x,'name_ta','name_tamil','tamil','label_ta','display_ta','label','name','value','start_date','end_date');return best!=null?displayValue(best):JSON.stringify(x).slice(0,100);}return readable(x);}
let allowLocal=false;
const field=(o,...ks)=>{for(const k of ks){if(o && typeof o==='object' && o[k]!==undefined && o[k]!==null) return o[k];}return null};
const root = data => {
  // ExactPredictions V2 COMBINED response: {status:"success", meta:{}, basic:{data:{...}}}.
  // Postman chart context itself has {data:{...}}; imported standalone payloads may
  // already be unwrapped. Walk recognized wrappers without fabricating missing values.
  const seen=new WeakSet();
  function search(p,depth=0){
    if(!p || typeof p!=='object' || Array.isArray(p) || depth>10 || seen.has(p))return null;
    seen.add(p);
    if((Array.isArray(p.planets) && p.planets.length>0) ||
       (p.rasi_chart && typeof p.rasi_chart==='object' && Object.keys(p.rasi_chart).length>0)) return p;
    for(const key of ['basic','data','result','response','horoscope','chart','payload']) {
      const result=search(p[key],depth+1);if(result)return result;
    }
    return null;
  }
  return search(data);
};
const signIdx = (p) => {if(!p)return -1;let x=String(p.sign_id??p.sign??'').replace(/^SIGN_/,'').toUpperCase();let i=SIGN_EN.findIndex(z=>z.toUpperCase()===x);if(i<0&&lon(p)!==null)i=Math.floor(lon(p)/30);return i;};
const lon = p => {if(p?.longitude==null || p.longitude==='')return null;const n=Number(p.longitude);return Number.isFinite(n)?((n%360)+360)%360:null};
let latest = null;
let latestReports = [];
let connectionOk = false;
function notify(msg,kind='normal',title='அறிக்கை நிலை') {const e=$('epNotice'); if(!e)return;e.className='ep-notice'+(kind==='error'?' is-error':kind==='ok'?' is-ok':'');e.innerHTML='<div class="ep-spark">'+(kind==='error'?'!':kind==='ok'?'✓':'✧')+'</div><div><strong>'+esc(title)+'</strong><p>'+esc(msg)+'</p></div>';}
function selectData(payload, selectedContext) {let d=root(selectedContext)||root(payload);if(!d)throw new Error('ExactPredictions பதிலில் கிரக நிலைகள் இல்லை. JSON விவரத்தைச் சரிபார்க்கவும்.');const planets=Array.isArray(d?.planets)?d.planets:Array.isArray(d?.chart?.planets)?d.chart.planets:[]; let points={}; for(const p of planets){let k=PLANET_ID[p.point_id] || PLANET_ID[p.planet_id];if(k && lon(p)!==null) points[k]=p;}
  // Merge Rasi-chart entries even if some planets were already found. Some paid
  // API variants return nodes/ascendant only in rasi_chart, not in `planets`.
  if(d?.rasi_chart){for(const ps of Object.values(d.rasi_chart)){if(!Array.isArray(ps))continue;for(const p of ps){const k=PLANET_ID[p.planet_id] || PLANET_ID[p.point_id];if(k && lon(p)!==null && !points[k])points[k]=p;}}}
  return {d,planets,points,ess:d?.essentials??payload?.basic?.essentials??payload?.essentials??{},solar:d?.solar??payload?.basic?.solar??{},raw:payload};
}
function sheet(title,n,content,kind='api',description='') {const src=latest?.mode==='POSTMAN_SAMPLE'?'சோதனைத் தரவு · API அழைக்கப்படவில்லை':kind==='api'?'ExactPredictions API தரவு':kind==='local'?'உள்ளூர் கணக்கீடு · உறுதிசெய்யப்படவில்லை':'API-யில் இந்தத் தகவல் கிடைக்கவில்லை';return '<article class="ep-sheet" id="epSheet'+n+'" data-number="'+n+'"><div class="ep-sheet-head"><div><div class="ep-sheet-num">IK’S ASTROLOGY · பக்கம் '+String(n).padStart(2,'0')+' / 23</div><h4>'+esc(title)+'</h4></div><div class="ep-source-chip '+(kind==='local'?'is-unverified':kind==='missing'?'is-missing':'')+'">'+src+'</div></div>'+content+(description?'<div class="ep-table-meta">'+esc(description)+'</div>':'')+'</article>';}

const empty=(title,detail)=>'<div class="ep-inline-notice"><strong>'+esc(title)+'</strong><div>'+esc(detail)+'</div></div>';
function chart(caption,assignments,numeric=false,houseLabels=null){if(!assignments)return empty('API தரவு இல்லை','சரிபார்க்கப்பட்ட கோள் நிலைத் தகவல் கிடைக்கவில்லை.');let cells=GRID.map(({r,c,i})=>{const vs=assignments[i]??[];let content=Array.isArray(vs)?vs.map(k=>esc(TA[k]??k)).join(' · '):esc(vs);return '<div class="ep-sign-cell" style="grid-row:'+r+';grid-column:'+c+'"><small class="ep-sign-name">'+SIGN_TA[i]+'</small>'+(houseLabels?.[i]?'<span class="ep-house-index">'+esc(houseLabels[i])+'</span>':'')+'<span class="ep-cell-content">'+content+'</span></div>';}).join('');return '<div class="ep-chart-grid">'+cells+'<div class="ep-chart-center">'+esc(caption)+'<small>தென்னிந்திய ஜாதகக் கட்டம்</small></div></div>';}
function positions(input,formula){const values=Array.from({length:12},()=>[]); let ct=0;for(const [name,p] of Object.entries(input)){const L=lon(p);if(L===null)continue;const sign=Math.floor(L/30),deg=L%30;const idx=formula?formula(sign,deg,name):sign; if(Number.isInteger(idx)&&idx>=0 && idx<12){values[idx].push(name);ct++;}}
 return ct>0?values:null;}
// Read only genuine provider divisional-chart placements in strict API mode.
// Rendering signs as a square chart is presentation, not re-computation.
const VARGA_KEYS={2:['hora_chart','hora_d2','d2','varga_2','varga2'],3:['drekkana_chart','drekkana_d3','d3','varga_3','varga3'],4:['chaturthamsa_chart','d4','varga_4','varga4'],5:['panchamsa_chart','panchamamsa','d5','varga_5','varga5'],6:['shashtamsa_chart','shastamsa','shashtamsha','d6','varga_6','varga6'],7:['saptamsa_chart','saptamamsa','d7','varga_7','varga7'],9:['navamsa_chart','navamsha','navamsa','d9','varga_9','varga9']};
function pointsFromProviderChart(obj){
 if(!obj||typeof obj!=='object')return null;
 const payload=obj.rasi_chart??obj.signs??obj.chart??obj.placements??obj.positions??obj;
 const entries=Array.isArray(payload)?payload:Object.entries(payload??{});
 const vals=Array.from({length:12},()=>[]);let ct=0;
 function insert(key,value,sign){const ix=signNumber(sign);if(ix<0)return;let pid=String(key??value?.point_id??value?.planet_id??'').toUpperCase();const k=PLANET_ID[pid]??Object.entries(PN).find(([a,v])=>v===key)?.[0]??null;if(k){vals[ix].push(k);ct++;}}
 if(Array.isArray(payload)){
  for(const p of payload){if(!p||typeof p!=='object')continue;insert(p.point_id??p.planet_id??p.planet,p,p.sign_id??p.sign??p.rasi);}
 }else if(payload&&typeof payload==='object'){
  for(const [k,v] of entries){const s=signNumber(k);
    if(s>=0){for(const x of (Array.isArray(v)?v:[v]))insert(x?.point_id??x?.planet_id??x?.planet??x?.short_name,x,k);}
    else if(v&&typeof v==='object'&&!Array.isArray(v))insert(k,v,v.sign_id??v.sign??v.rasi);
  }
 }
 return ct>0?vals:null;
}
function providerVarga(report,division){
 if(division===1)return positions(report.$normalized.points,null);
 const keys=VARGA_KEYS[division]??[];
 for(const node of [report.horoscope,report.chartContext]){
  const found=nestedNamed(node,keys);
  const chartObj=found?pointsFromProviderChart(found):null;
  if(chartObj)return chartObj;
 }
 return null;
}
function varga(pts,formula,name,n,explain,report,division) {
  const fromProvider=providerVarga(report,division);
  const pos=fromProvider || (allowLocal?positions(pts,formula):null);
  let content=pos?chart(name,pos):empty('API தரவு கிடைக்கவில்லை', 'இந்த வர்க்கச் சக்கரத்தின் தனிப்பட்ட ராசி நிலைகள் API பதிலில் இல்லை. உள்ளூர் மதிப்பீடு இயல்பாக முடக்கப்பட்டுள்ளது.');
  // The explicit values table makes the result available even when print/PDF CSS
  // hides the tiny South-Indian chart cell labels in some browsers.
  if(pos && (n===8 || n===9) && !fromProvider && allowLocal) {
    const rows=Object.entries(pts).filter(([,p])=>lon(p)!==null).map(([planet,p])=>{
      const l=lon(p),sign=Math.floor(l/30),part=l%30,idx=formula(sign,part,planet);
      return [PN[planet]??TA[planet]??planet,SIGN_TA[sign],(part).toFixed(4)+'°',SIGN_TA[idx]];
    });
    content+=table(['கிரகம்','ஜன்ம ராசி','ராசிக்குள் பாகை','வர்க்க ராசி'],rows,'ep-varga-table');
    content+='<p class="ep-table-meta">API கிரக நிலைகளிலிருந்து உள்ளூரில் கணக்கிடப்பட்டது. இம்முடிவு ExactPredictions வழங்கிய D'+division+' கட்டம் அல்ல.</p>';
  }
  return sheet(name,n,content,pos?(fromProvider||division===1?'api':'local'):'missing',pos?(fromProvider?'API நேரடியாக வழங்கிய வர்க்க ராசி நிலைகள்.':division===1?'API கிரக நிலைகளிலிருந்து வரையப்பட்டது.':'உள்ளூர் மாற்றுக் கணக்கீடு; சரிபார்க்கப்படவில்லை.'):'API-யில் இந்தக் கட்டத்திற்கான சுயாதீனமான வர்க்க ராசி நிலைகள் இல்லை.');
}
function table(headers, rows,cls='ep-matrix'){return '<div class="ep-tablescroll"><table class="'+cls+'"><thead><tr>'+headers.map(x=>'<th>'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map((x,i)=>'<td'+(i===0?' class="ep-row-name"':'')+'>'+esc(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';}
function nakSheet(d){const p=d.points;let arr=['lagnam','sun','moon','mars','mercury','jupiter','venus','saturn','rahu','ketu','mandi'].filter(x=>p[x]);let rows=arr.map(k=>{const x=p[k];return [PN[k]??TA[k],signIdx(x)<0?'—':SIGN_TA[signIdx(x)],x.pada??'—',readable(x.nakshatra_id)||'—',readable(x.nakshatra_lord_id)||'—',x.degree_in_sign_dm??'—'];});return sheet('நட்சத்திர கிரக பாத சாரம்',1,rows.length?table(['கிரகம்','ராசி','பாதம்','நட்சத்திரம்','சாரம்','நிலை'],rows):empty('கிரக விவரம் இல்லை','API பதிலில் கிரக / பாத விவரங்கள் கிடைக்கவில்லை.'),rows.length?'api':'missing');}
function getSpecificChart(data,keys){let obj=data?.d;for(const key of keys){const a=field(obj,key);if(a && typeof a==='object' && !Array.isArray(a))return a;}return null;}
/* Prefer actual provider house placements. KP cusps are shown as cusps only;
   they cannot silently be presented as a traditional Bhava Chalit map. */
function nestedNamed(obj,patterns,depth=0,visited=new WeakSet()){
 if(!obj || typeof obj!=='object'||depth>8||visited.has(obj))return null;
 visited.add(obj);
 if(Array.isArray(obj)){for(const sub of obj){const match=nestedNamed(sub,patterns,depth+1,visited);if(match)return match;}return null;}
 for(const [key,value] of Object.entries(obj)) if(patterns.some(x=>x===key.toLowerCase()) && value && typeof value==='object') return value;
 for(const [key,value] of Object.entries(obj)) if(!/^(planets|localized|input|meta)$/.test(key)&&value&&typeof value==='object'){
  const match=nestedNamed(value,patterns,depth+1,visited);if(match)return match;
 }
 return null;
}
// House cusps returned by ExactPredictions KP are *house starts*; the table and
// the drawn chart use the same twelve returned longitudes. This visual is explicitly
// NOT a claim that KP/Placidus equals the older reference book's Bhava method.
function parseDegreeValue(value){
 if(typeof value==='number')return Number.isFinite(value)?value:null;
 if(typeof value!=='string'||!value.trim())return null;
 const v=value.trim();
 if(/^[-+]?\d+(?:\.\d+)?$/.test(v))return Number(v);
 const m=v.match(/^([-+]?\d+)[°:\s]+(\d{1,2})(?:[':\s]+(\d{1,2}(?:\.\d+)?))?/);
 if(!m)return null;
 return Number(m[1])+(Number(m[2])||0)/60+(Number(m[3])||0)/3600;
}
function signNumber(raw){
 if(raw==null)return -1;
 const label=String(raw).trim().replace(/^SIGN_/i,'').toLowerCase();
 return SIGN_EN.findIndex(s=>s.toLowerCase()===label);
}
function cuspLongitude(o){
 if(o==null)return null;
 if(typeof o!=='object')return parseDegreeValue(o);
 const direct=field(o,'longitude','cusp_longitude','absolute_longitude','sidereal_longitude','longitude_deg','longitude_degrees');
 if(direct!=null)return parseDegreeValue(direct);
 const within=field(o,'degree_in_sign','degree_in_sign_dms','degree_in_sign_dm','degrees_in_sign','degree','degrees','position','value');
 const d=parseDegreeValue(within);
 if(d===null)return null;
 const sign=signNumber(field(o,'sign_id','sign','rasi','rasi_name'));
 // Degrees in sign require a sign for disambiguation. Never invent an absolute longitude.
 if(sign>=0 && d>=0 && d<30)return sign*30+d;
 if(d>=0 && d<360 && (d>=30 || field(o,'absolute')===true))return d;
 return null;
}
function normalizeCusps(raw){
 if(!raw || typeof raw!=='object')return null;
 let values;
 if(Array.isArray(raw))values=raw.map((item,i)=>({item,hint:i+1}));
 else values=Object.entries(raw).map(([key,item],i)=>({item,hint:Number(key.match(/\d+/)?.[0])||i+1}));
 const rows=values.map(({item,hint})=>{
  const obj=item&&typeof item==='object'?item:{longitude:item};
  const ordinal=Number(field(obj,'house','house_number','house_no','bhava_no','number','cusp_number')??hint);
  const longitude=cuspLongitude(obj);
  return {house:ordinal,longitude,sign:longitude===null?-1:Math.floor(((longitude%360)+360)%360/30),raw:obj};
 });
 if(rows.length!==12 || rows.some(x=>!Number.isInteger(x.house)||x.house<1||x.house>12)||new Set(rows.map(x=>x.house)).size!==12) return null;
 rows.sort((a,b)=>a.house-b.house);
 if(rows.some(x=>x.longitude===null || !Number.isFinite(x.longitude)))return null;
 for(const row of rows)row.longitude=((row.longitude%360)+360)%360;
 const spans=rows.map((row,i)=>(rows[(i+1)%12].longitude-row.longitude+360)%360);
 // Invalid ordering can make planets fall into multiple houses. Don't display that as verified.
 if(spans.some(x=>x<0.001)||Math.abs(spans.reduce((a,b)=>a+b,0)-360)>0.001)return null;
 return rows;
}
function cuspTable(cusps){
 return table(['பாவம்','இராசி','கஸ்ப் பாகை'],cusps.map(c=>[
  c.house,SIGN_TA[c.sign],c.longitude.toFixed(4)+'°'
 ]),'ep-bhava-table');
}
function formatCuspList(raw){
 const cusps=normalizeCusps(raw);
 // Incomplete provider cusp data may still be useful as a table, but cannot
 // establish a safe chart. Exact calculations require all 12 numeric cusps.
 if(cusps)return cuspTable(cusps);
 let values=Array.isArray(raw)?raw:Object.values(raw||{});
 if(values.length<12)return null;
 const rows=values.slice(0,12).map((v,i)=>{
  const x=v&&typeof v==='object'?v:{longitude:v};
  return [field(x,'house','house_number','house_no','number')??i+1,readable(field(x,'sign','sign_id','rasi','rasi_name')??'—'),field(x,'longitude','cusp_longitude','degree','degrees','position','value')??'—'];
 });
 return table(['பாவம்','இராசி','கஸ்ப் பாகை'],rows,'ep-bhava-table');
}
function kpBhavaChart(cusps,points){
 if(!cusps||cusps.length!==12)return null;
 const lagSign=signIdx(points.lagnam)>=0?signIdx(points.lagnam):cusps[0].sign;
 if(lagSign<0)return null;
 const values=Array.from({length:12},()=>[]),notes={};
 for(let h=1;h<=12;h++)notes[(lagSign+h-1)%12]='பாவம் '+h;
 const assignments=[];
 for(const [name,p] of Object.entries(points)){
  if(name==='lagnam')continue;
  const L=lon(p);if(L===null)continue;
  for(let i=0;i<12;i++){
   const start=cusps[i].longitude,next=cusps[(i+1)%12].longitude;
   const span=(next-start+360)%360,offset=(L-start+360)%360;
   if(offset<span){values[(lagSign+i)%12].push(name);assignments.push([name,i+1]);break;}
  }
 }
 // The lagnam marks H1; it is not treated as a transit planet.
 values[lagSign].unshift('lagnam');
 if(assignments.length===0)return null;
 const result=chart('பாவக சக்கரம் · KP பாவங்கள்',values,false,notes);
 return '<div class="ep-bhava-visual">'+result+'</div>'+
  '<p class="ep-bhava-method">KP house-cusp-derived chart · planets mapped by consecutive cusp boundaries · houses anchored to the Lagna Rasi. This is <strong>not independently verified</strong> as the reference book’s Bhava Chalit method.</p>'+
  '<p class="ep-table-meta">'+assignments.length+' planetary longitudes assigned to KP houses. The cusp table below shows the exact data used to draw the chart.</p>';
}
function bhavaSheet(d,report){
 const direct=nestedNamed(report.horoscope,['bhava_chart','bhava_chalit_chart','house_chart','bhava_chalit','bhava']) || nestedNamed(d.d,['bhava_chart','house_chart','bhava']);
 if(direct && !Array.isArray(direct) && typeof direct==='object'){
  const values=Array.from({length:12},()=>[]);let matched=0;
  for(const [key,items] of Object.entries(direct)){
   const idx=signNumber(key);
   if(idx<0||!Array.isArray(items))continue;
   values[idx]=items.map(o=>PLANET_ID[o?.planet_id||o?.point_id] || o?.short_name || o?.planet_id || String(o));
   matched++;
  }
  if(matched>=3)return sheet('பாவக சக்கரம்',4,chart('API பாவக் கட்டம்',values),'api','API நேரடியாக வழங்கிய ஜாதகக் கட்டம்.');
 }
 const cusps=nestedNamed(report.kpHouses,['house_cusps','bhava_cusps','cusps','cusp_details','house_cusp_longitudes','houses']) || nestedNamed(report.horoscope,['house_cusps','bhava_cusps','cusps']);
 const parsed=normalizeCusps(cusps);
 const tabular=cusps?formatCuspList(cusps):null;
 if(parsed){
  const plotted=kpBhavaChart(parsed,d.points);
  if(allowLocal && plotted)return sheet('பாவக சக்கரம்',4,plotted+'<div class="ep-bhava-cusps">'+tabular+'</div>','local','KP கஸ்ப் நிலைகளில் இருந்து உள்ளூரில் கிரக பாவங்கள் கணக்கிடப்பட்டன.');
  // API-only: a chart of the provider-returned twelve cusp signs and degrees.
  const cells=Array.from({length:12},()=>[]);
  for(const c of parsed)cells[c.sign].push('பா '+c.house+' · '+(c.longitude%30).toFixed(1)+'°');
  return sheet('பாவக சக்கரம்',4,chart('KP பாவக் கஸ்ப் வரைபடம்',cells)+'<div class="ep-bhava-cusps">'+tabular+'</div>','api','API வழங்கிய 12 பாவக் கஸ்ப் ராசி நிலைகளை வரைபடமாகக் காட்டுகிறது; புத்தகப் பாவசக்கரத்தின் கிரக நிலைகளாக ஊகிக்கப்படவில்லை.');
 }
 if(tabular)return sheet('பாவக சக்கரம்',4,
  empty('பாவ வரைபடம் உருவாக்க இயலவில்லை','API-யில் பாவக் கஸ்ப் அட்டவணை உள்ளது; 12 கஸ்ப் பாகைகளின் முழு விவரம் இல்லை. மூல JSON பதிவிறக்கி சரிபார்க்கவும்.')+tabular,
  'missing','பாவக் கஸ்ப் பாகைகள் முழுமையில்லை.');
 const why=report.kpStatus==='PROVIDER_ERROR'?'KP API: '+(report.kpError||'request failed'):
  report.kpStatus==='NOT_REQUESTED'?'KP பாவ விவர விருப்பத்தை இயக்கி மீண்டும் உருவாக்கவும்.':
  'KP API பதிலில் அறியக்கூடிய பாவக் கஸ்ப் விவரங்கள் இல்லை.';
 return sheet('பாவக சக்கரம்',4,empty('பாவக சக்கரம் கிடைக்கவில்லை',why),'missing');
}
// The V2 public collection documents /dasa and /dasa/deep but includes no
// actual response examples. When the provider omits machine-readable periods,
// derive *labelled* Vimshottari timings from the Moon longitude. The civil-year
// convention below (365.2425 days) is not asserted identical to ExactPredictions.
const VIM_LORDS=['ketu','venus','sun','moon','mars','rahu','jupiter','saturn','mercury'];
const VIM_YEARS=[7,20,6,10,7,18,16,19,17];
const VIM_YEAR_DAYS=365.2425;
const VIM_DAY_MS=86400000;
function localVimshottari(report) {
  const moon=report.$normalized?.points?.moon;
  const moonLongitude=lon(moon);
  const info=report.$normalized?.d?.input??{};
  const birthDate=report.input?.date || info.birth_date;
  const birthTime=report.input?.time || info.birth_time || '00:00';
  if(moonLongitude===null || !/^\d{4}-\d\d-\d\d$/.test(String(birthDate)))return null;
  const hourText=String(birthTime);
  const clock=/^\d{2}:\d{2}$/.test(hourText)?hourText+':00':hourText.slice(0,8);
  if(!/^\d{2}:\d{2}:\d{2}$/.test(clock))return null;
  const parsed=new Date(String(birthDate)+'T'+clock+'Z');
  if(!Number.isFinite(parsed.getTime()))return null;
  const segment=360/27;
  const nakshatraIndex=Math.min(26,Math.floor(moonLongitude/segment));
  const startingLordIndex=nakshatraIndex%9;
  const elapsed=(moonLongitude-nakshatraIndex*segment)/segment;
  const originalStart=parsed.getTime()-elapsed*VIM_YEARS[startingLordIndex]*VIM_YEAR_DAYS*VIM_DAY_MS;
  const mahadasas=[];
  let cursor=originalStart;
  for(let i=0;i<9;i++){
    const index=(startingLordIndex+i)%9;
    const end=cursor+VIM_YEARS[index]*VIM_YEAR_DAYS*VIM_DAY_MS;
    mahadasas.push({lord:VIM_LORDS[index],years:VIM_YEARS[index],start:cursor,end});
    cursor=end;
  }
  const bhuktis=(period)=>{
    const index=VIM_LORDS.indexOf(period.lord);
    let begin=period.start;
    return Array.from({length:9},(_,i)=>{
      const ix=(index+i)%9;
      const duration=VIM_YEARS[index]*VIM_YEARS[ix]/120 *VIM_YEAR_DAYS*VIM_DAY_MS;
      const record={maha:period.lord,lord:VIM_LORDS[ix],start:begin,end:begin+duration};
      begin+=duration;
      return record;
    });
  };
  return {moonLongitude,nakshatraIndex: nakshatraIndex+1,elapsed,
    mahadasas,bhuktisBirth:bhuktis(mahadasas[0]),bhuktisNext:bhuktis(mahadasas[1])};
}
function localDasaSheet(report,n,reason){
  const v=localVimshottari(report);
  const title=n===11?'மகாதசை விவரம்':n===12?'தசா–புத்தி விவரம் – 1':'தசா–புத்தி விவரம் – 2';
  if(!v)return sheet(title,n,empty('Vimshottari calculation unavailable','Moon longitude or birth date is missing. '+reason),'missing');
  const format=ms=>new Date(ms).toISOString().slice(0,10);
  let rows,description;
  if(n===11){
    rows=v.mahadasas.map(p=>[readable(p.lord),p.years,format(p.start),format(p.end)]);
    description='Birth Nakshatra '+v.nakshatraIndex+' · elapsed fraction '+(v.elapsed*100).toFixed(2)+'%';
  }else {
    const bhukti=n===12?v.bhuktisBirth:v.bhuktisNext;
    rows=bhukti.map(p=>[readable(p.maha),readable(p.lord),format(p.start),format(p.end)]);
    description='Bhukti periods for the '+(n===12?'birth':'next')+' Mahadasa ('+readable(bhukti[0].maha)+').';
  }
  const head=n===11?['மகாதசை','ஆண்டுகள்','தொடக்கம்','முடிவு']:['மகாதசை','புத்தி','தொடக்கம்','முடிவு'];
  const source=empty('Local calculation · NOT a verified API result',
    'Vimshottari 120-year cycle; dates use a 365.2425-day year. Compare the provider/book’s year-length, ayanamsa, and rounding conventions before use. '+reason);
  return sheet(title,n,source+table(head,rows,'ep-dasa-table'),'local',description);
}
function dasaBody(report,deep=false){const raw=deep?report.dasaDeep:report.dasa;return raw?.data??raw?.basic?.data??raw?.result??raw?.dasa??raw??null;}
function findDasaRows(obj,preferred,allowGeneric=false){
 if(!obj||typeof obj!=='object')return null;
 const seen=new WeakSet();
 function walk(node,depth){
  if(!node||typeof node!=='object'||depth>10||seen.has(node))return null;seen.add(node);
  if(Array.isArray(node)){
    if(allowGeneric && node.some(x=>x&&typeof x==='object' && (x.start||x.start_date||x.end||x.end_date||x.lord||x.planet||x.name||x.period)))return node;
    for(const entry of node){const found=walk(entry,depth+1);if(found)return found;}
    return null;
  }
  // Check meaningful keys before traversing to avoid mistaking Maha Dasa for Bhukti.
  for(const [k,v] of Object.entries(node))if(preferred.some(q=>k.toLowerCase().includes(q))){
    if(Array.isArray(v)&&v.some(x=>x&&typeof x==='object'))return v;
    if(v&&typeof v==='object') {const nested=walk(v,depth+1);if(nested)return nested;}
  }
  for(const [k,v] of Object.entries(node))if(v&&typeof v==='object' && !['meta','input','planets','rasi_chart'].includes(k)){
    const found=walk(v,depth+1);if(found)return found;
  }
  return null;
 }
 return walk(obj,0);
}
function dasaRowsToTable(rows,offset=0,limit=15){
 if(!Array.isArray(rows)||!rows.length)return null;
 const sample=rows.find(x=>x&&typeof x==='object'&&!Array.isArray(x));if(!sample)return null;
 const preferred=['lord','planet','mahadasha','mahadasha_lord','dasha_lord','bhukti_lord','antar_lord','name','period','start_date','start','end_date','end','duration','years'];
 let cols=preferred.filter(k=>Object.prototype.hasOwnProperty.call(sample,k));
 if(cols.length===0)cols=Object.keys(sample).filter(k=>typeof sample[k]!=='object').slice(0,6);
 if(!cols.length)return null;
 const show=rows.slice(offset,offset+limit);
 const nameMap={lord:'தசை அதிபதி',planet:'கிரகம்',mahadasha:'மகாதசை',mahadasha_lord:'மகாதசை அதிபதி',dasha_lord:'தசை அதிபதி',bhukti_lord:'புத்தி அதிபதி',antar_lord:'அந்தரம்',name:'பெயர்',period:'காலம்',start_date:'தொடக்கம்',start:'தொடக்கம்',end_date:'முடிவு',end:'முடிவு',duration:'கால அளவு',years:'ஆண்டுகள்'};
 return table(cols.map(k=>nameMap[k]||readable(k)),show.map(o=>cols.map(k=>displayValue(o?.[k]))));
}
function dasaSheet(d,n,report){
 const title=n===11?'மகாதசை விவரம்':n===12?'தசா–புத்தி விவரம் – 1':'தசா–புத்தி விவரம் – 2';
 const deep=n===13,main=dasaBody(report,false),advanced=dasaBody(report,true);
 // The first and second Dasa-Bhukti pages need distinct source periods.
 const obj=n===13?(advanced??main):(main??advanced);
 if(!obj){const error=[report.dasaError,report.dasaDeepError].filter(Boolean).join('; ');
   return allowLocal?localDasaSheet(report,n,error):sheet(title,n,empty('தசை விவரம் API-யில் இல்லை',error||'API-யில் காலவரிசை விவரம் கிடைக்கவில்லை.'),'missing');}
 const searchTerms=n===11?['mahadasha','maha_dasa','major','dasha','dasa','periods']:
                   n===12?['bhukti','antardasha','antar_dasha','sub_period','subperiod']:
                           ['pratyantar','antar_dasha','antardasha','bhukti','subperiod','sub_period'];
 const rows=findDasaRows(obj,searchTerms,n===11);
 const beginning=n===13 && obj===main && Array.isArray(rows)?15:0;
 let content=dasaRowsToTable(rows,beginning,15);
 if(!content){return allowLocal?localDasaSheet(report,n,'API தசை காலவரிசை கண்டறியப்படவில்லை.'):sheet(title,n,empty('தசை பட்டியல் இல்லை','API பதிலில் தசை காலவரிசை அடையாளம் காணப்படவில்லை. JSON பதிலைப் பதிவிறக்கவும்.'),'missing');}
 else if(beginning && rows.length<=beginning){return allowLocal?localDasaSheet(report,n,'புத்தி காலவரிசை API-யில் இல்லை.'):sheet(title,n,empty('இரண்டாவது புத்தி விவரம் இல்லை','API உரிய புத்தி விவரங்களை வழங்கவில்லை.'),'missing');}
 const descriptor=deep?'ExactPredictions விரிவான தசை API பதில்.':'ExactPredictions தசை API பதில்.';
 return sheet(title,n,content,'api',descriptor);
}
function rawAvResult(response, key){let r=response?.astavargam;if(!r)return null;const names=[key,'planet_'+key,key.toUpperCase(),'PLANET_'+key.toUpperCase()];let visited=0;
 function norm(x){if(Array.isArray(x)&&x.length===12 && x.every(n=>Number.isInteger(Number(n)) && Number(n)>=0&&Number(n)<=8)){const v=x.map(Number);return v.reduce((a,b)=>a+b,0)===TOTALS[key]?{cols:v,rows:null}:null;}
   if(x&&typeof x==='object'){const o=field(x,'colTotals','column_totals','totals','rasi_totals','bindus','values','points');if(o!==x){let v=norm(o);if(v)return v;}
    let matrix=field(x,'matrix','rows','contributors');if(Array.isArray(matrix)&&matrix.length===8){let rr=matrix.map(z=>Array.isArray(z)?z:field(z,'values','bindus','points'));if(rr.every(z=>Array.isArray(z)&&z.length===12&&z.every(v=>[0,1,'0','1',null].includes(v)))){const cols=Array.from({length:12},(_,j)=>rr.reduce((s,row)=>s+Number(row[j]||0),0));if(cols.reduce((a,b)=>a+b,0)===TOTALS[key])return {cols,rows:rr};}}}
   return null;}
 function walk(obj,depth=0){if(!obj||typeof obj!=='object'||depth>6||visited++>500)return null;if(Array.isArray(obj)){for(const v of obj){let q=walk(v,depth+1);if(q)return q;}return null;}for(const [name,value] of Object.entries(obj)){const nm=String(name).toLowerCase();if(names.map(x=>x.toLowerCase()).some(x=>nm===x)){const match=norm(value);if(match)return match;}}for(const value of Object.values(obj)){if(value&&typeof value==='object'){let q=walk(value,depth+1);if(q)return q;}}return null;}
 return walk(r);
}
function getAvLocal(pts,key){const source={};for(const nm of [...PKEY,'lagnam']){const s=signIdx(pts[nm]);if(s<0)return null;source[nm]=s;}const rows=[],cols=new Array(12).fill(0);for(const nm of [...PKEY,'lagnam']){let v=new Array(12).fill(0);for(const off of EP_AV_RULES[key][nm]){const idx=(source[nm]+off-1+12)%12;v[idx]=1;cols[idx]++;}rows.push(v);}return {rows,cols,from:'local'};}
function avGrid(vals,title){if(!vals)return '';let body=GRID.map(({r,c,i})=>'<div class="ep-mini-cell" style="grid-row:'+r+';grid-column:'+c+'">'+esc(vals[i])+'</div>').join('');return '<div><div class="ep-mini-title">'+esc(title)+'</div><div class="ep-mini-grid">'+body+'<div class="ep-mini-center">'+esc(title)+'</div></div></div>';}
// Legacy IK's algorithm is included for side-by-side study, not claimed as a provider shodhana result.
function shodhana(nums,positionsMap){let tri=[...nums];for(const i of [0,1,2,3]){const a=i,b=i+4,c=i+8,m=Math.min(tri[a],tri[b],tri[c]);tri[a]-=m;tri[b]-=m;tri[c]-=m;}const eka=[...tri];const occ=new Set(PKEY.map(k=>positionsMap[k]).filter(x=>x>=0));for(const [a,b] of [[0,7],[1,6],[2,5],[8,11],[9,10]]){let x=eka[a],y=eka[b];if(x===0||y===0)continue;const aa=occ.has(a),bb=occ.has(b);if(aa&&bb)continue;if(!aa&&!bb){eka[a]=Math.min(x,y);eka[b]=Math.min(x,y);}else if(aa&&!bb){eka[b]=y<=x?0:x;}else if(!aa&&bb){eka[a]=x<=y?0:y;}}return {tri,eka};}
function apiShodhana(key,phase){
 const phaseKeys=phase==='tri'?['trikona_shodhana','trikona','trikona_sodhana']:['ekadhipatya_shodhana','ekadhipatya','ekadhipathya'];
 const phaseObj=nestedNamed(latest?.astavargam,phaseKeys);
 if(!phaseObj)return null;
 const candidate=field(phaseObj,key,key.toUpperCase(),'PLANET_'+key.toUpperCase(),'planet_'+key);
 return numericTwelve(candidate,8);
}
function avSheet(report, key, n){const fromAPI=rawAvResult(report,key);const local=allowLocal?getAvLocal(report.$normalized.points,key):null;const d=fromAPI?{...fromAPI,from:'api'}:(allowLocal?local:null);let content;if(!d)content=empty('அஷ்டவர்க்கத் தரவு இல்லை','குறித்த கிரகத்தின் பிண்ண அஷ்டவர்க்க 12 ராசிப் பரல்கள் API பதிலில் அடையாளம் காணப்படவில்லை.');else{
  let rows=[];if(d.rows){rows=d.rows.map((v,i)=>[PN[[...PKEY,'lagnam'][i]],...v.map(x=>x||''),v.reduce((a,b)=>a+Number(b||0),0)]);}else{rows=[['API பரல்கள்',...d.cols,'']];}
  rows.push(['பரல்',...d.cols,d.cols.reduce((a,b)=>a+b,0)]);
  content=table(['கிரகம்',...SIGN_TA,'Σ'],rows);let pos={};for(const k of PKEY)pos[k]=signIdx(report.$normalized.points[k]);const sh=allowLocal?shodhana(d.cols,pos):null;
  const tri=apiShodhana(key,'tri')??sh?.tri;
  const eka=apiShodhana(key,'eka')??sh?.eka;
  content+='<div class="ep-av-triple">'+avGrid(d.cols,'பரல்')+
   (tri?avGrid(tri,'திரிகோணம்'):empty('திரிகோணம் இல்லை','API-யில் திரிகோண சோதனை விவரம் இல்லை.'))+
   (eka?avGrid(eka,'ஏகாதிபத்தியம்'):empty('ஏகாதிபத்தியம் இல்லை','API-யில் ஏகாதிபத்திய சோதனை விவரம் இல்லை.'))+'</div>';
  if(!fromAPI)content+=empty('API தனிப்பட்ட கட்டம் கிடைக்கவில்லை','இது IK உள்ளூர் அஷ்டவர்க்க விதிகளைப் பயன்படுத்துகிறது; API உறுதிப்படுத்திய முடிவு அல்ல.');
 }
 return {html:sheet(PN[key]+' அஷ்ட வர்க்கம்'+(d?' — '+d.cols.reduce((a,b)=>a+b,0)+' பரல்':' — API தரவு இல்லை'),n,content,d?.from==='api'?'api':d?'local':'missing'),data:d};}
function numericTwelve(raw,max=12){
 const o=Array.isArray(raw)?raw:field(raw,'rasi_totals','sign_totals','col_totals','totals','bindus','values','points','cols');
 if(!Array.isArray(o)||o.length!==12||o.some(x=>!Number.isInteger(Number(x))||Number(x)<0||Number(x)>max))return null;
 return o.map(Number);
}
function directSarvashtavarga(){
 const found=nestedNamed(latest?.astavargam,['sarvashtavarga','sarva_ashtavarga','sarva_ashtakavarga','sav_chart','sarvashtakavarga_chart','sarv_ashtavargam']);
 return numericTwelve(found,56);
}
function savSheet(data,n){const providerVals=directSarvashtavarga();const vals=providerVals??new Array(12).fill(0);let present=!!providerVals,provider=true;if(!providerVals){present=true;for(const k of PKEY){const av=data[k];if(!av){present=false;break;}if(av.from!=='api')provider=false;for(let i=0;i<12;i++)vals[i]+=av.cols[i];}}let c=present?chart('சர்வாங்க அஷ்ட வர்க்கம் · '+vals.reduce((a,b)=>a+b,0)+' பரல்',vals):empty('சர்வ அஷ்டவர்க்கம் இல்லை','7 கிரகங்களுக்கான பிண்ண அஷ்டவர்க்க 12-ராசி அட்டவணைகள் API வழியாக கிடைக்க வேண்டும்.');if(present)c+='<p class="ep-table-meta">'+esc(SIGN_TA.map((s,i)=>s+' '+vals[i]).join('  •  '))+'</p>';return sheet('சர்வாங்க அஷ்ட வர்க்கம்',n,c,!present?'missing':provider?'api':'local');}
const val = x => x===null||x===undefined||x===''?null:displayValue(x);
function apiField(names){
 const wanted=new Set(names.map(x=>x.toLowerCase()));let seen=new WeakSet();
 function visit(x,depth=0){if(!x||typeof x!=='object'||depth>8||seen.has(x))return null;seen.add(x);
 if(!Array.isArray(x))for(const [k,v] of Object.entries(x)){
  if(wanted.has(k.toLowerCase())&&v!=null&&v!==''&&(typeof v!=='object'||Array.isArray(v)||Object.keys(v).length>0))return v;
 }
 for(const [k,v] of Object.entries(x))if(k!=='meta'&&k!=='input'&&k!=='planets'&&typeof v==='object'){
  const result=visit(v,depth+1);if(result!=null)return result;
 }
 return null;}
 return visit(latest?.horoscope)??visit(latest?.astavargam)??visit(latest?.kpHouses);
}

function aadhi(d, page){const p=d.points,e=d.ess,s=d.solar,tamil=s?.tamil_calendar??{};const moon=p.moon;const v=[
 ['ஜாதகரின் பெயர்', latest?.input?.name],['ஆங்கில தேதி',latest?.input?.date],['தமிழ் தேதி',tamil.tamil_day!=null?readable(tamil.tamil_month_id)+' '+tamil.tamil_day+' · '+readable(tamil.tamil_year_id):null],
 ['நேரம்',latest?.input?.time],['கிழமை',readable(e?.weekday?.weekday_id)||null],['ஜாதகர் பிறந்த தேதி',latest?.input?.date],['பிறந்த ஊர்',latest?.input?.place],
 ['சூரியோதயம்',s?.sunrise],['சூரிய அஸ்தமனம்',s?.sunset],['அயனம்',apiField(['ayana','ayanam'])],['ருது',apiField(['ritu','ruthu','season'])],
 ['பக்ஷம்',field(e,'paksha','paksham')??apiField(['paksha','paksham'])],['திதி',readable(e?.tithi?.tithi_id)||null],['திதி சூனிய ராசிகள்',apiField(['tithi_sooniya','tithi_shunya','tithi_shunyam','tithi_shoonya_rasis'])],
 ['நட்சத்திரம்',moon?.nakshatra_id?readable(moon.nakshatra_id)+' · பாதம் '+moon.pada:null],['நாமயோகம்',readable(e?.nithya_yoga?.nithya_yoga_id)||null],
 ['யோகி',apiField(['yogi','yogi_planet'])],['அவயோகி',apiField(['avayogi','avayogi_planet'])],['கரணம்',readable(e?.karana?.karana_id)||null],
 ['முடக்கு',apiField(['mudakku','mudakku_rasi'])],['வைநாசிகம்',apiField(['vainasika','vainasika_nakshatra'])],['88வது பாதம்',apiField(['eighty_eighth_pada','pada_88','88th_pada'])],
 ['லக்னம்',signIdx(p.lagnam)>=0?SIGN_TA[signIdx(p.lagnam)]:null],['ராசி',signIdx(moon)>=0?SIGN_TA[signIdx(moon)]:null],['கணம்',apiField(['gana','ganam'])]
 ];const start=page===1?0:14, end=page===1?14:25,rows=v.slice(start,end).map(([label,value],i)=>[String(start+i+1),label,val(value)??'— (API-யில் இல்லை)']);let c=table(['எண்','விபரம்','விளக்கம்'],rows,'ep-aadhi-table');return sheet('ஆதியும் அந்தமும் · '+(page===1?'1–14':'15–25'),page===1?22:23,c,'api','API தரவில் இல்லாத பாரம்பரிய விவரங்கள் ஊகித்து நிரப்பப்படாது.');}

// Reference acceptance checks are drawn ONLY from the 18 user-supplied
// ExactPredictions screenshots (18-Oct-2026), NOT computed astrology.
// Values are in displayed sign degrees:minutes; screenshot display precision
// motivates a maximum five-arcminute allowance for longitude comparisons.
const EP_REFERENCE_1992={
  date:'1992-07-03',time:'13:49',place:'Kanchipuram',
  moonStar:'ASHLESHA',moonPada:4,
  positions:{
    lagnam:[6,11,30], sun:[2,17,53],moon:[3,27,25],
    mars:[0,19,50],mercury:[3,13,47],jupiter:[4,16,20],
    venus:[2,23,17],saturn:[9,23,44],rahu:[8,6,17],
    ketu:[2,6,17],mandi:[4,1,14]
  }
};
let latestVerification=null;
function userBirthIsReference(report){
 const birth=report.input||report.$normalized?.d?.input||{};
 const date=String(birth.date||birth.birth_date||'').slice(0,10),time=String(birth.time||birth.birth_time||'').slice(0,5),place=String(birth.place||'').toLowerCase();
 return date===EP_REFERENCE_1992.date&&time===EP_REFERENCE_1992.time&&(/kanchipuram|காஞ்சிபுரம்|kancheepuram/.test(place));
}
function referenceVerification(report){
 const authorized=report.mode!=='POSTMAN_SAMPLE' && userBirthIsReference(report);
 const result={basis:'18 reference screenshots submitted by the user; only the visibly readable values are checked',
  sampleOnly:report.mode==='POSTMAN_SAMPLE',birthMatched:authorized,appReportedMode:report.mode??'UNKNOWN',
  liveApiVerifiedByThisEnvironment:false,referenceData:'1992-07-03 13:49 Kanchipuram',
  positions:[],moonNakshatra:null,moonPada:null,sheets:[],counts:{match:0,mismatch:0,missing:0,not_checked:0,filled:0,partial:0,empty:0}};
 const planets=report.$normalized?.points||{};
 for(const [id,entry] of Object.entries(EP_REFERENCE_1992.positions)){
  const [sign,degree,minute]=entry,p=planets[id],sg=signIdx(p),lg=lon(p);
  const degreeInSign=lg===null?null:lg%30;
  const delta=degreeInSign===null?null:Math.abs(degreeInSign-(degree+minute/60))*60;
  const status=!authorized?'NOT_CHECKED':(sg<0||degreeInSign===null)?'MISSING':sg!==sign||delta>5?'MISMATCH':'MATCH';
  result.positions.push({planet:PN[id]||id,status,expectedRasi:SIGN_TA[sign],actualRasi:sg>=0?SIGN_TA[sg]:null,
    expectedDegrees:String(degree).padStart(2,'0')+':'+String(minute).padStart(2,'0'),
    actualDegrees:degreeInSign===null?null:String(Math.floor(degreeInSign)).padStart(2,'0')+':'+String(Math.round((degreeInSign%1)*60)).padStart(2,'0'),
    absoluteDifferenceArcMinutes:delta===null?null:Number(delta.toFixed(2))});
  if(status==='MATCH')result.counts.match++;
  else if(status==='MISMATCH')result.counts.mismatch++;
  else if(status==='MISSING')result.counts.missing++;
  else result.counts.not_checked++;
 }
 const moon=planets.moon||{};
 const moonNak=String(moon.nakshatra_id||'').replace(/^NAKSHATRA_/,'');
 result.moonNakshatra={expected:'ஆயில்யம்',actual:moonNak?readable(moon.nakshatra_id):null,
  status:!authorized?'NOT_CHECKED':!moonNak?'MISSING':moonNak==='ASHLESHA'?'MATCH':'MISMATCH'};
 result.moonPada={expected:4,actual:moon.pada??null,
  status:!authorized?'NOT_CHECKED':moon.pada==null?'MISSING':Number(moon.pada)===4?'MATCH':'MISMATCH'};
 for(let i=1;i<=23;i++){
  const el=$('epSheet'+i),header=el?.querySelector('h4')?.textContent||'—';
  const unavailable=!!el?.querySelector('.ep-source-chip.is-missing');
  const blanks=!!el?.querySelector('.ep-inline-notice')||((el?.textContent||'').includes('(API-யில் இல்லை)'));
  const usable=!!el?.querySelector('.ep-chart-grid,.ep-varga-table,.ep-bhava-table,.ep-dasa-table,.ep-matrix,.ep-mini-grid,.ep-aadhi-table');
  let availability=!usable||unavailable?'EMPTY':blanks?'PARTIAL':'FILLED';
  result.sheets.push({number:i,title:header,availability,referenceMatched:'NOT_VERIFIED',
   explanation:'Data/layout presence is not proof of calculation equality'});
  result.counts[availability.toLowerCase()]++;
 }
 return result;
}
function verificationUi(report){
 latestVerification=referenceVerification(report);
 const r=latestVerification;
 let area=$('epReferenceChecks');
 if(!area){area=document.createElement('section');area.id='epReferenceChecks';area.style.cssText='margin-top:16px;padding:16px;border:1px solid #9aab9c;border-radius:14px;background:#f7faf5;color:#204537';$('epDiagnostics')?.after(area);}
 if(!area)return;
 const badge=(label,good)=>'<strong style="color:'+(good?'#176847':'#ac5024')+'">'+esc(label)+'</strong>';
 const rows=r.positions.map(x=>'<tr><td>'+esc(x.planet)+'</td><td>'+esc(x.expectedRasi)+' '+esc(x.expectedDegrees)+'</td><td>'+esc((x.actualRasi||'—')+' '+(x.actualDegrees||''))+'</td><td>'+badge(x.status,x.status==='MATCH')+'</td></tr>').join('');
 const tableHtml='<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:13px"><thead><tr><th>கிரகம்</th><th>படம்</th><th>API பதில்</th><th>ஒப்பீடு</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
 const tablist=r.sheets.map(x=>'<span style="display:inline-block;padding:4px 7px;margin:3px;border-radius:7px;background:'+(x.availability==='FILLED'?'#e2f4e6':x.availability==='PARTIAL'?'#fff0d0':'#fce5df')+'">'+String(x.number).padStart(2,'0')+' '+(x.availability==='FILLED'?'தரவு உள்ளது':x.availability==='PARTIAL'?'பகுதி':'காலி')+'</span>').join('');
 area.innerHTML='<h3>படங்களுடன் ஒப்பீடு · 03-07-1992 13:49</h3>'+(
 r.birthMatched?'சமர்ப்பித்த ExactPredictions படங்களின் 11 கிரக/இலக்கன நிலைகளுடன் ஒப்பிடப்பட்டது. பாகை அனுமதி: ±5 வில் நிமிடங்கள் (arcminutes).':
 'இந்த ஒப்பீடு 03-07-1992 13:49 காஞ்சிபுரம் என்ற பிறப்பு விவரத்திற்கு மட்டுமே. மாதிரி/வேறு ஜாதகத் தரவுக்கு PASS வழங்கப்படாது.')+
 '<p><b>பொருத்தம்: '+r.counts.match+' · மாறுபாடு: '+r.counts.mismatch+' · கிடைக்கவில்லை: '+r.counts.missing+'</b></p>'+
 tableHtml+'<p><b>நட்சத்திரம்:</b> '+badge(r.moonNakshatra.status,r.moonNakshatra.status==='MATCH')+ ' · <b>பாதம்:</b> '+badge(r.moonPada.status,r.moonPada.status==='MATCH')+'</p>'+
 '<h4>23 பக்கத் தரவு இருப்பு (சரியானது எனும் சான்றல்ல)</h4><p>'+tablist+'</p>'+
 '<p style="font-size:12px">இந்த முறை பக்கங்களில் தரவு இருப்பை மட்டும் சரிபார்க்கிறது. ஒவ்வொரு வர்க்கம், தசை, அஷ்டவர்க்கம், பாவம் ஆகியவற்றை படங்களோடு எண் வாரியாக ஒப்பிட்டால் மட்டுமே முழு உறுதிப்படுத்தல் முடியும்.</p>'+
 '<button id="epDownloadVerification" type="button" class="ep-quiet">↓ ஒப்பீட்டு JSON (API சாவி இல்லாமல்)</button>';
 $('epDownloadVerification')?.addEventListener('click',()=>{
   const blob=new Blob([JSON.stringify(latestVerification,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
   a.href=url;a.download='IKS_ExactPredictions_Reference_Check_1992.json';a.click();URL.revokeObjectURL(url);
 });
}

function render(report){allowLocal=report?.allowLocal===true;const d=selectData(report.horoscope,report.chartContext); report.$normalized=d;latest=report;const pts=d.points;let pages=[];pages.push(nakSheet(d));
 pages.push(varga(pts,null,'இராசி',2,'',report,1));
 pages.push(varga(pts,(s,de)=>((s*9)+Math.min(8,Math.floor(de/(30/9))))%12,'நவாம்சம்',3,'',report,9));
 pages.push(bhavaSheet(d,report));
 pages.push(varga(pts,(s,de)=>(s%2===0?(de<15?4:3):(de<15?3:4)),'ஹோரை',5,'',report,2));
 pages.push(varga(pts,(s,de)=>(s+4*Math.min(2,Math.floor(de/10)))%12,'திரேக்காணம்',6,'',report,3));
 pages.push(varga(pts,(s,de)=>(s+3*Math.min(3,Math.floor(de/7.5)))%12,'சதுர்த்தாம்சம்',7,'',report,4));
 pages.push(varga(pts,(s,de)=> (s%2===0?[0,10,8,2,6]:[1,5,11,9,7])[Math.min(4,Math.floor(de/6))],'பஞ்சமாம்சம்',8,'',report,5));
 pages.push(varga(pts,(s,de)=>((s%2===0?0:6)+Math.min(5,Math.floor(de/5)))%12,'சஷ்டாம்சம்',9,'',report,6));
 pages.push(varga(pts,(s,de)=>(s+(s%2===0?0:6)+Math.min(6,Math.floor(de/(30/7))))%12,'சப்தமாம்சம்',10,'',report,7));
 for(const n of [11,12,13])pages.push(dasaSheet(d,n,report));
 let avMap={}; PKEY.forEach((p,j)=>{const a=avSheet(report,p,14+j);pages.push(a.html);avMap[p]=a.data;});pages.push(savSheet(avMap,21));pages.push(aadhi(d,1));pages.push(aadhi(d,2));
 if(pages.length!==23)throw Error('Report must contain exactly 23 pages.');
 $('epPrintRoot').innerHTML=pages.join('');const nav=$('epSheetNav');nav.innerHTML=pages.map((_,j)=>'<button type="button" data-scroll="epSheet'+(j+1)+'">'+String(j+1).padStart(2,'0')+'</button>').join('');nav.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>$(btn.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'})));
 $('epReportTools').hidden=false;$('epPrint').disabled=false;$('epDownloadJson').disabled=false;
 $('epReportTitle').textContent=(report.input?.name||'ஜாதகர்')+' · 23 பக்கங்கள்';
 $('epSourceIndicator').textContent=report.mode==='POSTMAN_SAMPLE'?'மாதிரி':report.mode==='IMPORTED'?'இறக்குமதி':'நேரடி API';$('epSourceDetail').textContent=report.mode==='POSTMAN_SAMPLE'?'Postman மாதிரித் தரவு':report.mode==='IMPORTED'?'JSON கோப்பிலிருந்து':report.requestsMade+' API அழைப்புகள்';
 $('epAvIndicator').textContent=report.astavargamStatus==='RETURNED'?'வந்துள்ளது':report.astavargamStatus==='PROVIDER_ERROR'?'பிழை':'கோரப்படவில்லை';
 const pointsCount=Object.keys(pts).length,apiAvCount=PKEY.filter(x=>rawAvResult(report,x)).length;
 verificationUi(report);
 notify((report.mode==='POSTMAN_SAMPLE'?'OFFLINE POSTMAN SAMPLE (not your birth chart). ':'')+'23 பக்க வடிவங்கள் உருவாக்கப்பட்டன. '+pointsCount+' கிரக நிலைகள் கண்டறியப்பட்டன. '+apiAvCount+'/7 அஷ்டவர்க்க அட்டவணைகள் API பதிலில் கண்டறியப்பட்டன. இல்லாத விவரங்கள் குறிக்கப்படும்.', 'ok',report.mode==='POSTMAN_SAMPLE'?'மாதிரி உருவானது':'API அறிக்கை உருவானது'); showDiagnostics(report);
 if(report.ashtavargamStatus==='PROVIDER_ERROR')$('epNotice').insertAdjacentHTML('beforeend','<div class="ep-error-inline">Ashtavargam request unsuccessful: '+esc(report.ashtavargamError)+'</div>');
}
function showDiagnostics(report){
 const box=$('epDiagnostics');if(!box)return;
 const d=report.diagnostics??{};
 const p=report.$normalized?.points??{};
 box.hidden=false;
 box.innerHTML='<strong>API பதில் விவரம்</strong><p>முறை: '+esc(report.mode??'LIVE')+
   ' · HTTP: '+esc(d.horoscopeHttpStatus??'not applicable')+
   ' · அறியப்பட்ட கிரகங்கள்: '+esc(Object.keys(p).length)+
   ' · அஷ்டவர்க்கம்: '+esc(report.astavargamStatus??'unknown')+'</p>'+
   '<p>தசை: '+esc(report.dasaStatus??'NOT_REQUESTED')+' · விரிவான தசை: '+esc(report.dasaDeepStatus??'NOT_REQUESTED')+' · KP பாவம்: '+esc(report.kpStatus??'NOT_REQUESTED')+'</p>'+
   ([report.dasaError,report.dasaDeepError,report.kpError].filter(Boolean).length?'<p>கூடுதல் API பிழைகள்: '+esc([report.dasaError,report.dasaDeepError,report.kpError].filter(Boolean).join(' | '))+'</p>':'')+
   '<p>புலங்கள்: '+esc(d.chartFields??Object.keys(report.$normalized?.d??{}).join(', '))+'</p>'+
   (d.providerRootFields?'<p>முதன்மை அமைப்பு: '+esc(d.providerRootFields)+'</p>':'')+
   (d.basicFields?'<p>அடிப்படைத் தரவு: '+esc(d.basicFields)+'</p>':'')+
   (d.requestId?'<p>API கோரிக்கை எண்: '+esc(d.requestId)+'</p>':'')+
   '<p><strong>பதிப்பு:</strong> api-first-tamil · உள்ளூர் மாற்றுக் கணக்கீடு இயல்பாக இல்லை</p>'+
   '<p><strong>Sheet 04 Bhava:</strong> '+($('epSheet4')?.querySelector('.ep-bhava-visual .ep-chart-grid')?'API பாவ வரைபடம் மற்றும் அட்டவணை':$('epSheet4')?.querySelector('.ep-bhava-table')?'KP அட்டவணை மட்டும்':'கஸ்ப் விவரங்கள் இல்லை')+'</p>'+
   '<p><strong>Sheets 08,09,11,12,13:</strong> '+[8,9,11,12,13].map(n=>{const el=$('epSheet'+n);return String(n).padStart(2,'0')+'='+ (el?.querySelector('.ep-chart-grid,.ep-dasa-table,.ep-varga-table')?'விவரம் உள்ளது':'விவரம் இல்லை');}).join(' · ')+'</p>'+
   '<small>API வழங்காத தகவல்கள் ஊகித்து நிரப்பப்படாது. இந்தச் சேவையின் அனைத்து 23 பக்கங்களும் கிடைப்பதாக உறுதி இல்லை.</small>';
}
async function loadPostmanSample(){
 try{
  const r=await fetch('/data/exact-postman-sample.json',{cache:'no-store'});
  if(!r.ok)throw new Error('Sample JSON unavailable (HTTP '+r.status+').');
  const payload=await r.json();render(payload);
 }catch(err){notify(err.message,'error','மாதிரி கிடைக்கவில்லை');}
}
async function importPostmanJson(ev){
 const file=ev.target.files?.[0];if(!file)return;
 try{
  if(file.size>8*1024*1024)throw new Error('Maximum JSON file size is 8 MB.');
  const obj=JSON.parse(await file.text());
  if(Array.isArray(obj?.item)&&obj?.info)throw new Error('You selected the Postman COLLECTION (requests). Export an actual API response JSON instead.');
  const horoscope=obj?.horoscope??obj;
  const parsed=root(horoscope);
  if(!parsed)throw new Error('This JSON does not contain planetary positions or a Rasi chart. Export the response from POST /v2/horoscope.');
  const birth=parsed.input??parsed.data?.input??{};
  const report=obj?.horoscope?obj:{provider:'Imported Postman response',horoscope,astavargam:null,astavargamStatus:'NOT_REQUESTED',requestsMade:0,input:{name:birth.name??'Postman chart',date:birth.birth_date??'',time:birth.birth_time??'',place:birth.place??''}};
  report.mode='IMPORTED';report.requestsMade=0;
  render(report);
 }catch(err){notify(err.message,'error','JSON கோப்பைத் திறக்க இயலவில்லை');}
 finally{ev.target.value='';}
}
function updatePlace(){const city=$('epPlace').value.trim().toLowerCase();const places={'kanchipuram':[12.8342,79.7036],'chennai':[13.0827,80.2707],'madurai':[9.9252,78.1198],'bengaluru':[12.9716,77.5946],'coimbatore':[11.0168,76.9558],'tiruchirappalli':[10.7905,78.7047]};if(places[city]){[$('epLat').value,$('epLon').value]=places[city];}}
async function checkConfigured(){try{const res=await fetch('/api/exact/status',{cache:'no-store'});const s=await res.json();connectionOk=!!s.configured;$('epConnection').textContent=connectionOk?'● API இணைக்கப்பட்டுள்ளது':'○ API சாவி இல்லை';$('epConnection').classList.toggle('is-ok',connectionOk);$('epConnection').classList.toggle('is-no',!connectionOk);if(!connectionOk)notify('நேரடி ஜாதகத்துக்கு சேவையகத்தில் EXACT_PREDICTIONS_API_KEY அமைத்து மீண்டும் தொடங்கவும்.','normal','API சாவி தேவை');}catch(e){$('epConnection').textContent='இணைப்பு இல்லை';$('epConnection').classList.add('is-no');}}
async function generate(e){e.preventDefault();const data={name:$('epName').value.trim(),date:$('epDate').value,time:$('epTime').value,place:$('epPlace').value.trim(),lat:Number($('epLat').value),lon:Number($('epLon').value),timezone:Number($('epTz').value),includeAstavargam:$('epAv').checked,includeDasa:$('epDasa').checked,includeBhava:$('epBhava').checked};if(!data.name||!data.date||!data.time||!data.place||!Number.isFinite(data.lat)||!Number.isFinite(data.lon)){notify('சரியான பிறப்பு விவரங்களை உள்ளிடவும்.','error');return;}const btn=$('epGenerate');btn.disabled=true;btn.textContent='ExactPredictions API அழைக்கப்படுகிறது…';notify('நேரடி ஜாதகம் கோரப்படுகிறது'+(data.includeDasa?', தசை விவரங்கள்':'')+(data.includeBhava?', KP பாவங்கள்':'')+(data.includeAstavargam?' மற்றும் அஷ்டவர்க்கம்':'')+'. ஒவ்வொரு வெற்றிகரமான அழைப்புக்கும் API கிரெடிட் செலவாகலாம்.','normal','கணக்கிடப்படுகிறது');try{const response=await fetch('/api/exact/chart',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const responseText=await response.text();let result;try{result=JSON.parse(responseText);}catch{throw new Error('Local server HTTP '+response.status+' did not return JSON. Check Spring Boot console logs.');}if(!response.ok){const status=result.providerStatus?' (provider HTTP '+result.providerStatus+')':'';const keys=[result.receivedRootFields?'Root: '+result.receivedRootFields:'', result.receivedBasicFields?'Basic: '+result.receivedBasicFields:'', result.receivedBasicDataFields?'Basic.data: '+result.receivedBasicDataFields:''].filter(Boolean).join(' | ');throw new Error((result.message||result.error||'API request failed')+status+(keys?' ['+keys+']':'')+(result.requestId?' Request ID: '+result.requestId:''));}render(result);}catch(err){notify(err?.message||'API error. Try again.','error','ஜாதகம் உருவாகவில்லை');}finally{btn.disabled=false;btn.innerHTML='23 பக்கத் தமிழ் ஜாதகம் உருவாக்குக <span>↗</span>';}}
async function downloadPdf(button){
 if(!latest)return;
 const original=button?.innerHTML;
 if(button){button.disabled=true;button.textContent='23 பக்க PDF உருவாக்கப்படுகிறது…';}
 let stage;
 try{
  if(typeof renderStagedPages!=='function' || typeof buildMultiPageA4PdfBinary!=='function')throw new Error('PDF இயந்திரம் கிடைக்கவில்லை');
  stage=document.createElement('div');stage.className='ep-panel';stage.style.cssText='position:fixed;left:-20000px;top:0;width:940px;padding:0;color:#153d37;background:white;z-index:-100';document.body.appendChild(stage);
  let pages=[];
  for(const sheet of document.querySelectorAll('#epPrintRoot .ep-sheet')){
   stage.replaceChildren();const copy=sheet.cloneNode(true);copy.style.cssText='width:940px;margin:0;padding:32px;min-height:0;max-height:none;box-shadow:none;border-radius:0;background:white;color:#173d34';stage.appendChild(copy);
   const canvases=await renderStagedPages(copy,940);
   for(const cv of canvases)pages.push(canvasToJpegPageObj(cv));
  }
  if(pages.length<23)throw new Error('PDF பக்கங்கள் முழுமையில்லை');
  const pdf=buildMultiPageA4PdfBinary(pages),blob=new Blob([pdf],{type:'application/pdf'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=(latest.mode==='POSTMAN_SAMPLE'?'SAMPLE_NOT_REAL_':'')+'IKs_ExactPredictions_23_Sheets_'+String(latest.input?.date||'chart')+'.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
  notify(pages.length+' A4 PDF பக்கங்கள் உருவானது. தரவு ஆதாரம் ஒவ்வொரு பக்கத்திலும் காணப்படும்.','ok','PDF தயார்');
 }catch(err){notify('PDF உருவாக்க முடியவில்லை. உலாவியின் PDF சேமிப்பு சாளரம் திறக்கப்படுகிறது.','normal','PDF அச்சு முறை');printReport();}
 finally{if(stage)stage.remove();if(button){button.disabled=false;button.innerHTML=original;}}
}
window.IKsExactDownloadPdf=downloadPdf;
function downloadRaw(){if(!latest)return;const { $normalized, ...clean }=latest;const blob=new Blob([JSON.stringify(clean,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=(latest.mode==='POSTMAN_SAMPLE'?'SAMPLE_NOT_REAL_':'')+'IKs-Astrology-Exact-Predictions-'+String(latest.input?.date||'chart')+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2500);}
function printReport(){if(!latest)return;const others=document.querySelectorAll('.tab-panel');const p=$('exactPredictionsTab');const was=p.classList.contains('active');p.classList.add('active');window.print();if(!was)p.classList.remove('active');}
function init(){const f=$('epBirthForm');if(!f)return;f.addEventListener('submit',generate);$('epPreviewSample')?.addEventListener('click',loadPostmanSample);$('epImportJson')?.addEventListener('change',importPostmanJson);$('epPlace').addEventListener('change',updatePlace);$('epPrint').addEventListener('click',()=>downloadPdf($('epPrint')));$('epDownloadJson').addEventListener('click',downloadRaw);checkConfigured();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
