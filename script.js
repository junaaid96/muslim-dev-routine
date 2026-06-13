/* ═══════════════════════════════════════════════════════════
   Muslim Dev Routine  ·  script.js
   Live prayer times via Aladhan API + dynamic routine
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Schedule template ──────────────────────────────────
   Prayer blocks (cat 's' + prayerKey) get LIVE times from API.
   "Wake up" is anchored to Fajr − 15 min (relativeTo).
   Other blocks keep fixed template times.
   ──────────────────────────────────────────────────────── */

const SCHEDULE = [
  { id:'wake',  time:'3:30 AM',  name:'Wake up & wudu', cat:'h',
    icon:'fas fa-moon', dur:'15 min', relativeTo:'Fajr', offset:-15,
    tips:[
      "Recite dua upon waking: Alhamdulillahilladhi ahyana ba'da ma amatana wa ilaihin nushur",
      'Make wudu — it clears sleep and mentally prepares you for Salah',
      'Miswak before prayer is an established Sunnah'
    ]},
  { id:'fajr',  time:'3:45 AM',  name:'Fajr Prayer', cat:'s', prayerKey:'Fajr',
    icon:'fas fa-mosque', dur:'20 min', anchor:true,
    tips:[
      '2 rakat Sunnah + 2 rakat Fard',
      'Post-prayer adhkar: SubhanAllah 33×, Alhamdulillah 33×, AllahuAkbar 33×, then Ayatul Kursi',
      '"O Allah, bless my Ummah in its early morning" — Prophet ﷺ (Tirmidhi 1212)',
      'The 30 minutes after Fajr are especially blessed — use them for Quran and dhikr, not sleep'
    ]},
  { id:'quran', time:'4:05 AM',  name:'Quran & morning adhkar', cat:'s', relativeTo:'Fajr', offset:20,
    icon:'fas fa-book-open', dur:'50 min',
    tips:[
      'Read Quran with translation — half a page daily beats sporadic full pages',
      'Morning adhkar from Hisnul Muslim (10–15 min): comprehensive duas for protection',
      "Set niyyah: 'I work to provide halal, serve my family — this is ibadah'",
      'Ishraq prayer (2 rakat) ~15 min after sunrise — immense reward'
    ]},
  { id:'exer',  time:'5:00 AM',  name:'Exercise & freshening up', cat:'h',
    icon:'fas fa-person-running', dur:'45 min',
    tips:[
      '20–30 min walk, stretching, or bodyweight exercises — physical health is an amanah from Allah',
      'Movement boosts dopamine and creative problem-solving for the deep work block ahead',
      "Change clothes, freshen up — your mental 'commute' from home mode into work mode"
    ]},
  { id:'bfast', time:'5:45 AM',  name:'Breakfast & day planning', cat:'h',
    icon:'fas fa-mug-hot', dur:'45 min',
    tips:[
      'Light nutritious breakfast: eggs, oats, dates, fruits. Heavy carbs = brain fog for coding.',
      'Eat with Bismillah, with right hand, seated — Sunnah acts in ordinary moments carry reward',
      'Identify your MIT (Most Important Task) before opening your laptop',
      'Review Notion board: what to code, what to learn, any blockers from yesterday'
    ]},
  { id:'work1', time:'6:30 AM',  name:'Deep work — block 1', cat:'w',
    icon:'fas fa-code', dur:'~5 hr',
    tips:[
      'The most barakah-filled and cognitively sharp window of the day — guard it fiercely',
      'Tackle the hardest tasks first: complex features, architecture, algorithms, hard bugs',
      'Pomodoro: 25 min full focus → 5 min break (dhikr, water, stretch). Repeat.',
      'All notifications OFF — this block produces the majority of your real daily output',
      'For: Spring Boot features, Angular work, microservices, eGeneration platform, freelance builds'
    ]},
  { id:'dhuhr', time:'11:57 AM', name:'Dhuhr Prayer', cat:'s', prayerKey:'Dhuhr',
    icon:'fas fa-mosque', dur:'25 min', anchor:true,
    tips:[
      "Stop work 10 min early — save progress, write a 'where I left off' note",
      '4 rakat Sunnah + 4 rakat Fard + 2 rakat Sunnah',
      "Friday: Jumu'ah replaces Dhuhr — attend mosque congregation without compromise",
      'The midday pause resets your mental state. A feature, not an interruption.'
    ]},
  { id:'nap',   time:'12:25 PM', name:'Qaylulah — midday nap', cat:'h', relativeTo:'Dhuhr', offset:28,
    icon:'fas fa-bed', dur:'20 min',
    tips:[
      "'Take a nap, for the shayatin do not take naps' — Prophet ﷺ (Tabarani). An active Sunnah.",
      'Keep it strictly 20 min max — set an alarm. Longer causes grogginess.',
      'Even resting with eyes closed (without sleeping) fulfills the Sunnah',
      'Science confirms: a short nap significantly improves afternoon alertness and memory'
    ]},
  { id:'lunch', time:'12:45 PM', name:'Lunch', cat:'h', relativeTo:'Dhuhr', offset:48,
    icon:'fas fa-utensils', dur:'30 min',
    tips:[
      "'Fill one-third for food, one-third for drink, one-third for air' — Ibn Majah 3349",
      'Protein + complex carbs = sustained afternoon energy. Avoid heavy rice-only meals.',
      'Eat with family or a colleague — strengthens bonds, is a Sunnah act'
    ]},
  { id:'work2', time:'1:15 PM',  name:'Work block 2 — collaboration', cat:'w',
    icon:'fas fa-comments', dur:'~2 hr',
    tips:[
      'Post-lunch: slightly lower energy — ideal for important but less intense tasks',
      'Code reviews, PR feedback, team sync, documentation, bug fixes, meetings',
      'Continue Pomodoro — 5 min break: dhikr, stretch, water refill',
      'Batch messages and emails — continuous checking destroys flow state'
    ]},
  { id:'asr',   time:'3:16 PM',  name:'Asr Prayer', cat:'s', prayerKey:'Asr',
    icon:'fas fa-mosque', dur:'15 min', anchor:true,
    tips:[
      "Asr is called 'the middle prayer' in Quran 2:238 — specially emphasized. Do NOT delay.",
      'Make wudu, 4 rakat Sunnah + 4 rakat Fard',
      'Post-prayer dhikr — Asr beautifully divides your workday into two natural halves'
    ]},
  { id:'learn', time:'3:35 PM',  name:'Skill learning block', cat:'l', relativeTo:'Asr', offset:19,
    icon:'fas fa-graduation-cap', dur:'1 hr 20 min',
    tips:[
      'Mon: DSA & competitive programming (Codeforces) — algorithmic thinking for interviews',
      'Tue: Java/Spring Boot deep-dives (Kafka, Redis, JPA, microservice patterns)',
      'Wed: DevOps & cloud (Docker, Kubernetes, CI/CD, Terraform) — high career leverage',
      'Thu: System design & distributed systems — separates junior from senior engineers',
      'Sat: Personal project work (stake-ledger, ERP, freelance builds)',
      'Always take notes in Notion — reviewing notes 10× more valuable than re-reading'
    ]},
  { id:'review',time:'4:55 PM',  name:'Day review & planning', cat:'w',
    icon:'fas fa-clipboard-check', dur:'20 min',
    tips:[
      'Did you complete your MIT? If not, what blocked you? Note it precisely.',
      "Write tomorrow's top 3 tasks now — while today's context is fresh",
      'Note any ideas, blockers, or topics to research tomorrow',
      'Commit and push code — close all open loops before stepping away'
    ]},
  { id:'family1',time:'5:20 PM', name:'Family & personal time', cat:'f',
    icon:'fas fa-heart', dur:'~1 hr',
    tips:[
      'Fully disconnect from work screens — you gave the day its due; guard this boundary',
      'Quality time with family: parents, siblings, spouse — this is ibadah in Islam',
      'Short outdoor walk resets mood, restores attention, surfaces creative insights',
      'Handle personal errands or admin deferred during focused work blocks'
    ]},
  { id:'maghrib',time:'6:42 PM', name:'Maghrib Prayer', cat:'s', prayerKey:'Maghrib',
    icon:'fas fa-mosque', dur:'25 min', anchor:true,
    tips:[
      '3 rakat Fard + 2 rakat Sunnah',
      'Evening adhkar (5–10 min): Ayatul Kursi, last 2 verses of Al-Baqarah, Al-Ikhlas × 3, Al-Falaq, An-Nas',
      'Blow on palms and wipe the body 3× after the three Quls — established Sunnah',
      'Maghrib marks the true end of the workday. Shift into calm, slow evening mode.'
    ]},
  { id:'dinner',time:'7:10 PM',  name:'Dinner & family time', cat:'f', relativeTo:'Maghrib', offset:28,
    icon:'fas fa-bowl-food', dur:'55 min',
    tips:[
      'Eat with family — one of the most consistent relationship investments you can make',
      'Moderate dinner — slightly heavier than lunch is fine; do not overeat before sleep',
      'No phones at the table — full presence compounds powerfully over months and years',
      "Check in on family members' days, express gratitude, offer help"
    ]},
  { id:'isha',  time:'8:08 PM',  name:'Isha Prayer', cat:'s', prayerKey:'Isha',
    icon:'fas fa-mosque', dur:'25 min', anchor:true,
    tips:[
      '4 rakat Sunnah + 4 rakat Fard + 2 rakat Sunnah + 3 rakat Witr',
      'Never skip Witr — the Prophet ﷺ never abandoned it even while travelling',
      'Make sincere dua after Witr: for yourself, your family, your work, your ummah',
      'This prayer seals the day spiritually — end it with gratitude and hope'
    ]},
  { id:'reflect',time:'8:35 PM', name:'Evening reflection & reading', cat:'f', relativeTo:'Isha', offset:27,
    icon:'fas fa-pen', dur:'35 min',
    tips:[
      '3 gratitudes: what went well — professionally, personally, and spiritually?',
      '1 learning: what did I understand better, improve, or realize today?',
      '1 tomorrow focus: one concrete action or study goal to carry forward',
      'Optional: read 15–20 min — tech books, Islamic books, biographies. No social media.'
    ]},
  { id:'wind',  time:'9:15 PM',  name:'Wind down — screens off', cat:'h',
    icon:'fas fa-display', dur:'45 min',
    tips:[
      'All screens strictly off — blue light shifts sleep onset 1–2 hours later',
      'Prepare sleep environment: dark, cool, quiet',
      'Recite Surah Al-Mulk (67) — Sunnah before sleep, protection from grave punishment',
      'Recite Surahs Al-Ikhlas, Al-Falaq, An-Nas (blow on palms and wipe body 3×)',
      'Dua before sleep: Allahumma bismika amutu wa ahya'
    ]},
  { id:'sleep', time:'10:00 PM', name:'Sleep', cat:'h',
    icon:'fas fa-moon', dur:'~5.5 hr',
    tips:[
      'Sleep on your right side — Sunnah of the Prophet ﷺ',
      'Aim for adequate rest — combine night sleep with the 20-min Qaylulah',
      'Sleep earlier in winter when Fajr is later, adjust as the season shifts',
      'Set a single alarm — multiple alarms fragment sleep cycles and worsen rest quality'
    ]}
];

/* ─── Prayer order (filled live) ─────────────────────────── */
let PRAYERS = [
  { name:'Fajr',    time:'3:45 AM',  min: 3*60+45  },
  { name:'Dhuhr',   time:'11:57 AM', min: 11*60+57 },
  { name:'Asr',     time:'3:16 PM',  min: 15*60+16 },
  { name:'Maghrib', time:'6:42 PM',  min: 18*60+42 },
  { name:'Isha',    time:'8:08 PM',  min: 20*60+8  }
];

/* ─── Cities (lat/lng) ───────────────────────────────────── */
const CITIES = {
  dhaka:      { name:'Dhaka',       lat:23.8103, lng:90.4125 },
  chittagong: { name:'Chittagong',  lat:22.3569, lng:91.7832 },
  sylhet:     { name:'Sylhet',      lat:24.8949, lng:91.8687 },
  rajshahi:   { name:'Rajshahi',    lat:24.3745, lng:88.6042 },
  khulna:     { name:'Khulna',      lat:22.8456, lng:89.5403 },
  rangpur:    { name:'Rangpur',     lat:25.7439, lng:89.2752 },
  barisal:    { name:'Barisal',     lat:22.7010, lng:90.3535 },
  mymensingh: { name:'Mymensingh',  lat:24.7471, lng:90.4203 }
};

/* ─── App state ──────────────────────────────────────────── */
const state = {
  lat: 23.8103, lng: 90.4125,
  cityLabel: 'Dhaka',
  school: 1,            /* 1 = Hanafi, 0 = Standard (Shafi/Maliki/Hanbali) */
  source: 'default'     /* default | api | geo */
};

/* ─── Weekly rotation ────────────────────────────────────── */
const WEEKLY = [
  { day:'Monday',    cls:'',       topic:'DSA & Competitive',  desc:'Codeforces problems, algorithms, data structures, contest prep' },
  { day:'Tuesday',   cls:'',       topic:'Java & Spring Boot', desc:'Kafka, Redis, JPA internals, microservice patterns' },
  { day:'Wednesday', cls:'',       topic:'DevOps & Cloud',     desc:'Docker, Kubernetes, CI/CD, Terraform, cloud deployment' },
  { day:'Thursday',  cls:'',       topic:'System Design',      desc:'Distributed systems, CAP theorem, senior-level architecture' },
  { day:'Friday',    cls:'wk-fri', topic:'Islamic Learning',   desc:"Lighter day — Jumu'ah, Quran study, reflection" },
  { day:'Saturday',  cls:'wk-sat', topic:'Personal Projects',  desc:'stake-ledger, ERP builds, freelance, side products' },
  { day:'Sunday',    cls:'wk-sun', topic:'Rest & Review',      desc:'Week retrospective, plan next week, full rest' }
];

const CAT_LABEL = { s:'Salah', w:'Work', l:'Learning', h:'Wellness', f:'Personal' };

/* ─── Time helpers ───────────────────────────────────────── */
function toMin(str){
  const [t,ap]=str.split(' '); const [h,m]=t.split(':').map(Number);
  let hh=h; if(ap==='PM'&&h!==12)hh+=12; if(ap==='AM'&&h===12)hh=0;
  return hh*60+m;
}
function minToStr(min){
  min=((min%1440)+1440)%1440;
  let h=Math.floor(min/60), m=min%60, ap=h>=12?'PM':'AM';
  let hh=h%12; if(hh===0)hh=12;
  return `${hh}:${String(m).padStart(2,'0')} ${ap}`;
}
function curMin(){ const n=new Date(); return n.getHours()*60+n.getMinutes(); }

function getCurrentBlock(){
  const cm=curMin(); let cur=null;
  const sorted=[...SCHEDULE].sort((a,b)=>toMin(a.time)-toMin(b.time));
  for(const b of sorted){ if(cm>=toMin(b.time)) cur=b; }
  return cur;
}
function getNextPrayer(){
  const cm=curMin();
  for(const p of PRAYERS){ if(cm<p.min) return p; }
  return PRAYERS[0];
}
function fmtCountdown(d){ if(d<0)d+=1440; const h=Math.floor(d/60),m=d%60; return h>0?`${h}h ${m}m`:`${m}m`; }

/* ─── Aladhan API: fetch live prayer times ───────────────── */
async function fetchPrayerTimes(){
  const banner=document.getElementById('liveBanner');
  if(banner) banner.textContent='Fetching live prayer times…';
  try{
    const url=`https://api.aladhan.com/v1/timings?latitude=${state.lat}`
      +`&longitude=${state.lng}&method=1&school=${state.school}`;
    const res=await fetch(url);
    if(!res.ok) throw new Error('API '+res.status);
    const json=await res.json();
    const t=json.data.timings;       /* { Fajr:"03:44", Dhuhr:"11:59", ... } 24h */
    const order=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
    PRAYERS=order.map(name=>{
      const [h,m]=t[name].split(':').map(Number);
      const min=h*60+m;
      return { name, min, time:minToStr(min) };
    });
    /* Push live times into SCHEDULE prayer blocks */
    SCHEDULE.forEach(b=>{
      if(b.prayerKey){
        const p=PRAYERS.find(x=>x.name===b.prayerKey);
        if(p) b.time=p.time;
      }
    });
    /* Anchor relative blocks (wake-up, post-prayer blocks) */
    SCHEDULE.forEach(b=>{
      if(b.relativeTo){
        const p=PRAYERS.find(x=>x.name===b.relativeTo);
        if(p) b.time=minToStr(p.min + (b.offset||0));
      }
    });
    state.source='api';
    rerenderAll();
    updateBanner(true, json.data.meta);
    return true;
  }catch(err){
    state.source='default';
    updateBanner(false);
    rerenderAll();
    return false;
  }
}

function updateBanner(ok, meta){
  const banner=document.getElementById('liveBanner');
  if(!banner) return;
  if(ok){
    const today=new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
    const tz = meta && meta.timezone ? '' : '';
    banner.innerHTML=`<i class="fas fa-circle-check"></i> Live · ${state.cityLabel} · ${today}`;
    banner.className='live-banner ok';
  }else{
    banner.innerHTML=`<i class="fas fa-triangle-exclamation"></i> Offline — showing approximate times`;
    banner.className='live-banner warn';
  }
}

/* ─── Geolocation ────────────────────────────────────────── */
function useMyLocation(){
  const banner=document.getElementById('liveBanner');
  if(!navigator.geolocation){ alert('Geolocation not supported by this browser.'); return; }
  if(banner) banner.textContent='Requesting your location…';
  navigator.geolocation.getCurrentPosition(
    pos=>{
      state.lat=pos.coords.latitude;
      state.lng=pos.coords.longitude;
      state.cityLabel='Your location';
      state.source='geo';
      const sel=document.getElementById('citySelect'); if(sel) sel.value='__geo';
      fetchPrayerTimes();
    },
    err=>{
      alert('Could not get location ('+err.message+'). Using selected city instead.');
      if(banner) updateBanner(state.source==='api');
    },
    { enableHighAccuracy:false, timeout:8000, maximumAge:600000 }
  );
}

/* ─── Renders ────────────────────────────────────────────── */
function renderPrayers(){
  const pillsEl=document.getElementById('prayerPills');
  const nextEl=document.getElementById('prayerNext');
  if(!pillsEl) return;
  const next=getNextPrayer(), cm=curMin();
  pillsEl.innerHTML=PRAYERS.map(p=>`
    <div class="ppill${p===next?' active':''}" role="listitem" title="${p.name}: ${p.time}">
      <span class="ppill-name">${p.name}</span>
      <span class="ppill-time">${p.time}</span>
    </div>`).join('');
  if(nextEl){ let d=next.min-cm; if(d<0)d+=1440; nextEl.innerHTML=`Next: <strong>${next.name}</strong> in ${fmtCountdown(d)}`; }
}

function renderNowCard(){
  const el=document.getElementById('nowCard'); if(!el) return;
  const block=getCurrentBlock(), next=getNextPrayer(), cm=curMin();
  let d=next.min-cm; if(d<0)d+=1440;
  if(!block){
    el.className='now-card now-cat-s';
    el.innerHTML=`<div class="now-card-inner">
      <div class="now-icon-wrap"><i class="fas fa-moon now-icon" style="color:var(--cs)"></i></div>
      <div class="now-meta"><div class="now-kicker">NOW</div>
        <div class="now-name">Before Fajr</div>
        <div class="now-tip">Prepare for the most blessed prayer of the day</div></div>
      <div class="now-right"><div class="now-next">${next.name} in ${fmtCountdown(d)}</div></div></div>`;
    return;
  }
  el.className=`now-card now-cat-${block.cat}`;
  el.innerHTML=`<div class="now-card-inner">
    <div class="now-icon-wrap"><i class="${block.icon} now-icon"></i></div>
    <div class="now-meta">
      <div class="now-kicker">NOW · ${new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true})}</div>
      <div class="now-name">${block.name}</div>
      <div class="now-tip">${block.tips[0]}</div></div>
    <div class="now-right"><div class="now-time">${block.dur}</div>
      <div class="now-next">${next.name} in ${fmtCountdown(d)}</div></div></div>`;
}

function renderTimeline(){
  const tl=document.getElementById('timeline'); if(!tl) return;
  tl.innerHTML='';
  const sorted=[...SCHEDULE].sort((a,b)=>toMin(a.time)-toMin(b.time));
  const nowBlock=getCurrentBlock();
  sorted.forEach((b,idx)=>{
    const isNow=b===nowBlock;
    const el=document.createElement('div');
    el.className=`block cat-${b.cat}${b.anchor?' anchor':''}${isNow?' is-now':''}`;
    el.dataset.cat=b.cat;
    el.style.transitionDelay=`${idx*0.03}s`;
    el.innerHTML=`
      <div class="blk-time"><span class="blk-time-val">${b.time}</span>
        ${isNow?'<span class="blk-now-badge">NOW</span>':''}</div>
      <div class="blk-dot-col"><div class="blk-dot"></div></div>
      <div class="blk-card" tabindex="0" role="button" aria-expanded="false" aria-label="Expand: ${b.name}">
        <div class="blk-head">
          <i class="${b.icon} blk-ico"></i>
          <span class="blk-name">${b.name}</span>
          <span class="blk-dur">${b.dur}</span>
          <span class="blk-badge">${CAT_LABEL[b.cat]}</span>
          <i class="fas fa-chevron-down blk-chev"></i></div>
        <div class="blk-detail-wrap"><div class="blk-detail-inner"><div class="blk-detail">
          <ul class="tip-list">${b.tips.map(t=>`<li>${t}</li>`).join('')}</ul>
        </div></div></div>
      </div>`;
    const card=el.querySelector('.blk-card'), wrap=el.querySelector('.blk-detail-wrap');
    function toggle(){
      const open=wrap.classList.contains('open');
      document.querySelectorAll('.blk-detail-wrap.open').forEach(w=>w.classList.remove('open'));
      document.querySelectorAll('.block.expanded').forEach(x=>{x.classList.remove('expanded');
        x.querySelector('.blk-card')?.setAttribute('aria-expanded','false');});
      if(!open){ wrap.classList.add('open'); el.classList.add('expanded'); card.setAttribute('aria-expanded','true'); }
    }
    el.addEventListener('click',toggle);
    card.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();} });
    tl.appendChild(el);
  });
  requestAnimationFrame(()=>{ document.querySelectorAll('.block').forEach((el,i)=>setTimeout(()=>el.classList.add('in'),i*26)); });
}

function renderWeekGrid(){
  const el=document.getElementById('weekGrid'); if(!el) return;
  el.innerHTML=WEEKLY.map(w=>`<div class="wk-card ${w.cls}">
    <div class="wk-day">${w.day}</div><div class="wk-topic">${w.topic}</div>
    <div class="wk-desc">${w.desc}</div></div>`).join('');
}

function updateClock(){
  const tEl=document.getElementById('clockTime'), dEl=document.getElementById('clockDate');
  if(!tEl) return; const n=new Date();
  tEl.textContent=n.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
  dEl.textContent=n.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
}

function updateProgress(){
  const fill=document.getElementById('progressFill'), pct=document.getElementById('progressPct'),
        track=document.getElementById('progressTrack'), label=document.getElementById('progressLabel');
  if(!fill) return;
  const sorted=[...SCHEDULE].sort((a,b)=>toMin(a.time)-toMin(b.time));
  const START=toMin(sorted[0].time), END=toMin(sorted[sorted.length-1].time);
  const cm=curMin(); let p=0;
  if(cm>=START&&cm<=END) p=Math.round(((cm-START)/(END-START))*100); else if(cm>END) p=100;
  fill.style.width=`${p}%`;
  if(pct)pct.textContent=`${p}%`;
  if(track)track.setAttribute('aria-valuenow',p);
  const cur=getCurrentBlock();
  if(label)label.textContent=cur?`Now: ${cur.name}`:'Day progress';
}

function updateScrollBar(){
  const bar=document.getElementById('scrollBar'); if(!bar) return;
  const total=document.documentElement.scrollHeight-window.innerHeight;
  bar.style.width=`${total>0?(window.scrollY/total)*100:0}%`;
}

function rerenderAll(){ renderTimeline(); renderPrayers(); renderNowCard(); updateProgress(); }

/* ─── Controls ───────────────────────────────────────────── */
function initControls(){
  const sel=document.getElementById('citySelect');
  if(sel){
    sel.addEventListener('change',()=>{
      const v=sel.value;
      if(v==='__geo'){ useMyLocation(); return; }
      const c=CITIES[v]; if(c){ state.lat=c.lat; state.lng=c.lng; state.cityLabel=c.name; fetchPrayerTimes(); }
    });
  }
  document.querySelectorAll('.madhab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.madhab-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      state.school=parseInt(btn.dataset.school,10);
      fetchPrayerTimes();
    });
  });
}

function initFilters(){
  document.querySelectorAll('.filter').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      const cat=btn.dataset.cat;
      document.querySelectorAll('.block').forEach(bl=>{
        const show=cat==='all'||bl.dataset.cat===cat;
        bl.classList.toggle('out',!show);
        if(!show){ bl.querySelector('.blk-detail-wrap')?.classList.remove('open'); bl.classList.remove('expanded'); }
      });
    });
  });
}

/* ─── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  renderWeekGrid();
  rerenderAll();
  updateClock();
  initControls();
  initFilters();
  fetchPrayerTimes();              /* live times on load */

  setInterval(updateClock,1000);
  setInterval(()=>{ renderPrayers(); renderNowCard(); updateProgress();
    document.querySelectorAll('.block').forEach(el=>el.classList.remove('is-now'));
    document.querySelectorAll('.blk-now-badge').forEach(b=>b.remove());
    const cur=getCurrentBlock();
    if(cur){
      const sorted=[...SCHEDULE].sort((a,b)=>toMin(a.time)-toMin(b.time));
      const i=sorted.indexOf(cur);
      const el=document.querySelectorAll('.block')[i];
      if(el){ el.classList.add('is-now');
        const t=el.querySelector('.blk-time');
        if(t&&!t.querySelector('.blk-now-badge')){ const s=document.createElement('span'); s.className='blk-now-badge'; s.textContent='NOW'; t.appendChild(s); } }
    }
  },60000);
  /* Refresh live prayer times hourly */
  setInterval(fetchPrayerTimes, 60*60*1000);

  window.addEventListener('scroll',updateScrollBar,{passive:true});
});
