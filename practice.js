/* ═══════════════════════════════════════════════════════════
   Muslim Dev Routine  ·  practice.js
   Checklist · notes · water · streak · focus timer
   ═══════════════════════════════════════════════════════════ */

'use strict';

const STORAGE = {
  checks: 'mdr-practice-checks',
  notes: 'mdr-practice-notes',
  intents: 'mdr-practice-intents',
  water: 'mdr-practice-water',
  streak: 'mdr-practice-streak',
  sessions: 'mdr-practice-sessions'
};

/* Checklist groups — Sunnah + healthy routine (additive to main schedule) */
const CHECK_GROUPS = [
  {
    id: 'salah',
    title: 'Salah',
    color: 's',
    items: [
      { id: 'fajr', label: 'Fajr on time', hint: 'Anchor of the day' },
      { id: 'dhuhr', label: 'Dhuhr on time', hint: 'Midday reset' },
      { id: 'asr', label: 'Asr on time', hint: 'Do not delay' },
      { id: 'maghrib', label: 'Maghrib on time', hint: 'Workday boundary' },
      { id: 'isha', label: 'Isha + Witr', hint: 'Seal the day' }
    ]
  },
  {
    id: 'spiritual',
    title: 'Sunnah & spiritual',
    color: 'l',
    items: [
      { id: 'adhkar_am', label: 'Morning adhkar', hint: 'After Fajr' },
      { id: 'quran', label: 'Quran (even a few ayahs)', hint: 'Consistency > volume' },
      { id: 'adhkar_pm', label: 'Evening adhkar', hint: 'After Asr / Maghrib' },
      { id: 'mulk', label: 'Surah Al-Mulk before sleep', hint: 'Sunnah of the night' },
      { id: 'dua', label: 'Sincere dua', hint: 'After Witr or quiet moment' }
    ]
  },
  {
    id: 'body',
    title: 'Health & body',
    color: 'h',
    items: [
      { id: 'wudu_care', label: 'Wudu with presence', hint: 'Taharah · half of faith' },
      { id: 'move', label: 'Exercise / walk / stretch', hint: 'Body is an amanah' },
      { id: 'eat', label: 'Eat with Bismillah · moderation', hint: '⅓ food · ⅓ drink · ⅓ air' },
      { id: 'qaylulah', label: 'Qaylulah (short nap)', hint: '≈20 min · Sunnah rest' },
      { id: 'hydrate', label: 'Hydrated (8 glasses goal)', hint: 'Track below' },
      { id: 'screens', label: 'Screens off before bed', hint: 'Protect sleep onset' }
    ]
  },
  {
    id: 'mind',
    title: 'Work, family & mind',
    color: 'w',
    items: [
      { id: 'mit_done', label: 'MIT started or finished', hint: 'Guard the barakah hours' },
      { id: 'deep_work', label: 'One deep-work session', hint: 'Notifications off' },
      { id: 'family', label: 'Family time with presence', hint: 'No phones at the table' },
      { id: 'muhasabah', label: 'Muhasabah written', hint: 'Notes panel →' },
      { id: 'plan_tomorrow', label: 'Tomorrow planned', hint: 'Top 3 before sleep' }
    ]
  }
];

const ALL_CHECK_IDS = CHECK_GROUPS.flatMap(g => g.items.map(i => i.id));

/* ─── Date helpers ───────────────────────────────────────── */
function todayKey(){
  const n=new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`;
}
function formatNiceDate(key){
  const [y,m,d]=key.split('-').map(Number);
  return new Date(y,m-1,d).toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'});
}
function shiftDay(key, delta){
  const [y,m,d]=key.split('-').map(Number);
  const dt=new Date(y,m-1,d+delta);
  return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
}

function loadJSON(key, fallback){
  try{
    const raw=localStorage.getItem(key);
    if(!raw) return fallback;
    return JSON.parse(raw);
  }catch{ return fallback; }
}
function saveJSON(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

/* ─── Checks ─────────────────────────────────────────────── */
function getChecksMap(){ return loadJSON(STORAGE.checks, {}); }
function getTodayChecks(){
  const map=getChecksMap();
  const k=todayKey();
  if(!map[k] || typeof map[k]!=='object') map[k]={};
  return { map, day: map[k], key: k };
}
function setCheck(id, on){
  const { map, day, key }=getTodayChecks();
  if(on) day[id]=true; else delete day[id];
  map[key]=day;
  saveJSON(STORAGE.checks, map);
  updateStreak();
  renderChecklist();
  renderSummary();
}
function clearTodayChecks(){
  if(!confirm('Clear all checklist items for today?')) return;
  const map=getChecksMap();
  map[todayKey()]={};
  saveJSON(STORAGE.checks, map);
  updateStreak();
  renderChecklist();
  renderSummary();
}
function dayCompletion(dayObj){
  if(!dayObj) return 0;
  const done=ALL_CHECK_IDS.filter(id=>dayObj[id]).length;
  return done / ALL_CHECK_IDS.length;
}

function updateStreak(){
  const map=getChecksMap();
  let streak=0;
  let k=todayKey();
  /* If today <50%, streak counts consecutive prior days */
  if(dayCompletion(map[k])>=0.5){
    while(dayCompletion(map[k])>=0.5){ streak++; k=shiftDay(k,-1); }
  }else{
    k=shiftDay(k,-1);
    while(dayCompletion(map[k])>=0.5){ streak++; k=shiftDay(k,-1); }
  }
  saveJSON(STORAGE.streak, { count: streak, updated: todayKey() });
  const el=document.getElementById('streakCount');
  if(el) el.textContent=String(streak);
}

function renderChecklist(){
  const root=document.getElementById('checklistRoot');
  if(!root) return;
  const { day }=getTodayChecks();
  root.innerHTML=CHECK_GROUPS.map(group=>`
    <div class="check-group check-cat-${group.color}">
      <h3 class="check-group-title">${group.title}</h3>
      <ul class="check-list">
        ${group.items.map(item=>{
          const on=!!day[item.id];
          return `<li>
            <label class="check-item${on?' done':''}">
              <input type="checkbox" data-check="${item.id}" ${on?'checked':''} />
              <span class="check-box" aria-hidden="true"></span>
              <span class="check-text">
                <span class="check-label">${item.label}</span>
                <span class="check-hint">${item.hint}</span>
              </span>
            </label>
          </li>`;
        }).join('')}
      </ul>
    </div>`).join('');

  root.querySelectorAll('[data-check]').forEach(input=>{
    input.addEventListener('change',()=>setCheck(input.dataset.check, input.checked));
  });
}

function renderSummary(){
  const { day, key }=getTodayChecks();
  const done=ALL_CHECK_IDS.filter(id=>day[id]).length;
  const total=ALL_CHECK_IDS.length;
  const pct=Math.round((done/total)*100);

  const countEl=document.getElementById('checkCountLabel');
  const pctEl=document.getElementById('checkPctLabel');
  const dateEl=document.getElementById('checkDateLabel');
  if(countEl) countEl.textContent=`${done} / ${total} done`;
  if(pctEl) pctEl.textContent=`${pct}%`;
  if(dateEl) dateEl.textContent=formatNiceDate(key);

  const ring=document.getElementById('progressRing');
  if(ring){
    const c=2*Math.PI*30;
    ring.style.strokeDasharray=`${c}`;
    ring.style.strokeDashoffset=`${c*(1-pct/100)}`;
  }

  /* Week heat */
  const heat=document.getElementById('weekHeat');
  const map=getChecksMap();
  if(heat){
    const cells=[];
    for(let i=6;i>=0;i--){
      const k=shiftDay(todayKey(), -i);
      const p=dayCompletion(map[k]);
      const [,,d]=k.split('-');
      let lvl='heat-0';
      if(p>=0.85) lvl='heat-4';
      else if(p>=0.5) lvl='heat-3';
      else if(p>=0.25) lvl='heat-2';
      else if(p>0) lvl='heat-1';
      cells.push(`<div class="heat-cell ${lvl}" title="${formatNiceDate(k)}: ${Math.round(p*100)}%"><span>${Number(d)}</span></div>`);
    }
    heat.innerHTML=cells.join('');
  }
}

/* ─── Water ──────────────────────────────────────────────── */
function getWater(){
  const map=loadJSON(STORAGE.water, {});
  const k=todayKey();
  return { map, count: Number(map[k]||0), key: k };
}
function setWater(n){
  const { map, key }=getWater();
  map[key]=Math.max(0, Math.min(8, n));
  saveJSON(STORAGE.water, map);
  /* Auto-check hydrate if 8 */
  if(map[key]>=8){
    const { map: cmap, day, key: ck }=getTodayChecks();
    day.hydrate=true;
    cmap[ck]=day;
    saveJSON(STORAGE.checks, cmap);
    renderChecklist();
  }
  renderWater();
  renderSummary();
}
function renderWater(){
  const { count }=getWater();
  const label=document.getElementById('waterCount');
  const row=document.getElementById('waterRow');
  if(label) label.textContent=String(count);
  if(!row) return;
  row.innerHTML=Array.from({length:8},(_,i)=>`
    <button type="button" class="water-glass${i<count?' filled':''}" data-n="${i+1}"
      aria-label="Set water to ${i+1} glasses" aria-pressed="${i<count}">
      <i class="fas fa-glass-water" aria-hidden="true"></i>
    </button>`).join('');
  row.querySelectorAll('.water-glass').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const n=parseInt(btn.dataset.n,10);
      const cur=getWater().count;
      setWater(cur===n ? n-1 : n);
    });
  });
}

/* ─── Intentions ─────────────────────────────────────────── */
function loadIntents(){
  const map=loadJSON(STORAGE.intents, {});
  return map[todayKey()] || { intent:'', mit:'', ibadah:'' };
}
function saveIntents(){
  const map=loadJSON(STORAGE.intents, {});
  map[todayKey()]={
    intent: document.getElementById('intentInput')?.value || '',
    mit: document.getElementById('mitInput')?.value || '',
    ibadah: document.getElementById('ibadahInput')?.value || ''
  };
  saveJSON(STORAGE.intents, map);
  setNotesStatus('Intention saved');
}
function initIntents(){
  const data=loadIntents();
  const intent=document.getElementById('intentInput');
  const mit=document.getElementById('mitInput');
  const ibadah=document.getElementById('ibadahInput');
  if(intent) intent.value=data.intent||'';
  if(mit) mit.value=data.mit||'';
  if(ibadah) ibadah.value=data.ibadah||'';
  [intent,mit,ibadah].forEach(el=>{
    el?.addEventListener('input', debounce(saveIntents, 350));
  });
}

/* ─── Notes ──────────────────────────────────────────────── */
function loadNotes(){
  const map=loadJSON(STORAGE.notes, {});
  return map[todayKey()] || { gratitude:'', learning:'', tomorrow:'', free:'' };
}
function saveNotes(){
  const map=loadJSON(STORAGE.notes, {});
  map[todayKey()]={
    gratitude: document.getElementById('gratitudeNote')?.value || '',
    learning: document.getElementById('learningNote')?.value || '',
    tomorrow: document.getElementById('tomorrowNote')?.value || '',
    free: document.getElementById('freeNote')?.value || ''
  };
  saveJSON(STORAGE.notes, map);

  const hasMuhasabah = [map[todayKey()].gratitude, map[todayKey()].learning, map[todayKey()].tomorrow]
    .some(v=>String(v).trim().length>0);
  if(hasMuhasabah){
    const { map: cmap, day, key }=getTodayChecks();
    day.muhasabah=true;
    if(String(map[todayKey()].tomorrow).trim()) day.plan_tomorrow=true;
    cmap[key]=day;
    saveJSON(STORAGE.checks, cmap);
    renderChecklist();
    renderSummary();
  }
  setNotesStatus('Saved · '+new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}));
}
function setNotesStatus(msg){
  const el=document.getElementById('notesStatus');
  if(el) el.textContent=msg;
}
function initNotes(){
  const data=loadNotes();
  const fields={
    gratitudeNote: data.gratitude,
    learningNote: data.learning,
    tomorrowNote: data.tomorrow,
    freeNote: data.free
  };
  Object.entries(fields).forEach(([id,val])=>{
    const el=document.getElementById(id);
    if(el){ el.value=val||''; el.addEventListener('input', debounce(saveNotes, 400)); }
  });
  document.getElementById('exportNotesBtn')?.addEventListener('click', async ()=>{
    const n=loadNotes();
    const i=loadIntents();
    const text=[
      `Muslim Dev Routine · ${formatNiceDate(todayKey())}`,
      '',
      `Intention: ${i.intent||'—'}`,
      `MIT: ${i.mit||'—'}`,
      `Ibadah: ${i.ibadah||'—'}`,
      '',
      `3 gratitudes:\n${n.gratitude||'—'}`,
      '',
      `1 learning:\n${n.learning||'—'}`,
      '',
      `Tomorrow:\n${n.tomorrow||'—'}`,
      '',
      `Notes:\n${n.free||'—'}`
    ].join('\n');
    try{
      await navigator.clipboard.writeText(text);
      setNotesStatus('Copied to clipboard');
    }catch{
      setNotesStatus('Copy failed — select text manually');
    }
  });
}

/* ─── Focus timer ────────────────────────────────────────── */
const timer = {
  remaining: 25*60,
  total: 25*60,
  running: false,
  interval: null
};

function getSessions(){
  const map=loadJSON(STORAGE.sessions, {});
  return Number(map[todayKey()]||0);
}
function bumpSession(){
  const map=loadJSON(STORAGE.sessions, {});
  const k=todayKey();
  map[k]=Number(map[k]||0)+1;
  saveJSON(STORAGE.sessions, map);
  const el=document.getElementById('sessionCount');
  if(el) el.textContent=String(map[k]);

  const { map: cmap, day, key }=getTodayChecks();
  day.deep_work=true;
  cmap[key]=day;
  saveJSON(STORAGE.checks, cmap);
  renderChecklist();
  renderSummary();
}

function fmtTimer(sec){
  const m=Math.floor(sec/60), s=sec%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function paintTimer(){
  const el=document.getElementById('timerDisplay');
  if(el) el.textContent=fmtTimer(timer.remaining);
  document.title = timer.running
    ? `${fmtTimer(timer.remaining)} · Practice`
    : 'Practice · Muslim Dev Routine';
}
function setTimerMode(mins){
  stopTimer(false);
  timer.total=mins*60;
  timer.remaining=mins*60;
  paintTimer();
  document.querySelectorAll('.timer-mode').forEach(btn=>{
    const on=parseInt(btn.dataset.mins,10)===mins;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', on?'true':'false');
  });
  syncTimerButtons();
}
function syncTimerButtons(){
  const start=document.getElementById('timerStartBtn');
  const pause=document.getElementById('timerPauseBtn');
  if(start) start.hidden=timer.running;
  if(pause) pause.hidden=!timer.running;
}
function startTimer(){
  if(timer.running) return;
  timer.running=true;
  syncTimerButtons();
  timer.interval=setInterval(()=>{
    timer.remaining-=1;
    if(timer.remaining<=0){
      timer.remaining=0;
      paintTimer();
      stopTimer(false);
      if(timer.total>=25*60) bumpSession();
      if(typeof Notification!=='undefined' && Notification.permission==='granted'){
        new Notification('Focus session complete',{ body:'Alhamdulillah — take a short break or pray if it is time.' });
      }
      return;
    }
    paintTimer();
  },1000);
}
function stopTimer(reset){
  timer.running=false;
  if(timer.interval){ clearInterval(timer.interval); timer.interval=null; }
  if(reset){ timer.remaining=timer.total; }
  paintTimer();
  syncTimerButtons();
}
function initTimer(){
  const el=document.getElementById('sessionCount');
  if(el) el.textContent=String(getSessions());
  paintTimer();
  syncTimerButtons();
  document.querySelectorAll('.timer-mode').forEach(btn=>{
    btn.addEventListener('click',()=>setTimerMode(parseInt(btn.dataset.mins,10)));
  });
  document.getElementById('timerStartBtn')?.addEventListener('click',()=>{
    if(typeof Notification!=='undefined' && Notification.permission==='default'){
      Notification.requestPermission().catch(()=>{});
    }
    startTimer();
  });
  document.getElementById('timerPauseBtn')?.addEventListener('click',()=>stopTimer(false));
  document.getElementById('timerResetBtn')?.addEventListener('click',()=>stopTimer(true));
}

/* ─── Utils ──────────────────────────────────────────────── */
function debounce(fn, ms){
  let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms); };
}
function updateClock(){
  const tEl=document.getElementById('clockTime'), dEl=document.getElementById('clockDate');
  if(!tEl) return;
  const n=new Date();
  tEl.textContent=n.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
  dEl.textContent=n.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
}
function updateScrollBar(){
  const bar=document.getElementById('scrollBar'); if(!bar) return;
  const total=document.documentElement.scrollHeight-window.innerHeight;
  bar.style.width=`${total>0?(window.scrollY/total)*100:0}%`;
}

/* ─── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  renderChecklist();
  renderWater();
  renderSummary();
  updateStreak();
  initIntents();
  initNotes();
  initTimer();
  updateClock();
  setInterval(updateClock, 1000);
  window.addEventListener('scroll', updateScrollBar, {passive:true});
  document.getElementById('resetChecksBtn')?.addEventListener('click', clearTodayChecks);
});
