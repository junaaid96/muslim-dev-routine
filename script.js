/* ═══════════════════════════════════════════════════════════
   Muslim Dev Routine  ·  script.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Schedule data ─────────────────────────────────────── */

const SCHEDULE = [
  {
    time: '3:30 AM', name: 'Wake up & wudu', cat: 'h',
    icon: 'fas fa-moon', dur: '15 min',
    tips: [
      "Recite dua upon waking: Alhamdulillahilladhi ahyana ba'da ma amatana wa ilaihin nushur",
      'Make wudu — it clears sleep and mentally prepares you for Salah',
      'Miswak before prayer is an established Sunnah'
    ]
  },
  {
    time: '3:45 AM', name: 'Fajr Prayer', cat: 's',
    icon: 'fas fa-mosque', dur: '20 min', anchor: true,
    tips: [
      '2 rakat Sunnah + 2 rakat Fard',
      'Post-prayer adhkar: SubhanAllah 33×, Alhamdulillah 33×, AllahuAkbar 33×, then Ayatul Kursi',
      '"O Allah, bless my Ummah in its early morning" — Prophet ﷺ (Tirmidhi 1212)',
      'The 30 minutes after Fajr are especially blessed — use them for Quran and dhikr, not sleep'
    ]
  },
  {
    time: '4:05 AM', name: 'Quran & morning adhkar', cat: 's',
    icon: 'fas fa-book-open', dur: '50 min',
    tips: [
      'Read Quran with translation — half a page daily beats sporadic full pages',
      'Morning adhkar from Hisnul Muslim (10–15 min): comprehensive duas for protection',
      "Set niyyah: 'I work to provide halal, serve my family — this is ibadah'",
      'Ishraq prayer (2 rakat) ~15 min after sunrise (5:11 AM) — immense reward'
    ]
  },
  {
    time: '5:00 AM', name: 'Exercise & freshening up', cat: 'h',
    icon: 'fas fa-person-running', dur: '45 min',
    tips: [
      '20–30 min walk, stretching, or bodyweight exercises — physical health is an amanah from Allah',
      'Movement boosts dopamine and creative problem-solving for the deep work block ahead',
      "Change clothes, freshen up — your mental 'commute' from home mode into work mode"
    ]
  },
  {
    time: '5:45 AM', name: 'Breakfast & day planning', cat: 'h',
    icon: 'fas fa-mug-hot', dur: '45 min',
    tips: [
      'Light nutritious breakfast: eggs, oats, dates, fruits. Heavy carbs = brain fog for coding.',
      'Eat with Bismillah, with right hand, seated — Sunnah acts in ordinary moments carry reward',
      'Identify your MIT (Most Important Task) before opening your laptop',
      'Review Notion board: what to code, what to learn, any blockers from yesterday'
    ]
  },
  {
    time: '6:30 AM', name: 'Deep work — block 1', cat: 'w',
    icon: 'fas fa-code', dur: '5 hr 25 min',
    tips: [
      'The most barakah-filled and cognitively sharp window of the day — guard it fiercely',
      'Tackle the hardest tasks first: complex features, architecture, algorithms, hard bugs',
      'Pomodoro: 25 min full focus → 5 min break (dhikr, water, stretch). Repeat.',
      'All notifications OFF — this block produces the majority of your real daily output',
      'For: Spring Boot features, Angular work, microservices, eGeneration platform, freelance builds'
    ]
  },
  {
    time: '11:57 AM', name: 'Dhuhr Prayer', cat: 's',
    icon: 'fas fa-mosque', dur: '25 min', anchor: true,
    tips: [
      "Stop work 10 min early — save progress, write a 'where I left off' note",
      '4 rakat Sunnah + 4 rakat Fard + 2 rakat Sunnah',
      "Friday: Jumu'ah replaces Dhuhr — attend mosque congregation without compromise",
      'The midday pause resets your mental state. A feature, not an interruption.'
    ]
  },
  {
    time: '12:25 PM', name: 'Qaylulah — midday nap', cat: 'h',
    icon: 'fas fa-bed', dur: '20 min',
    tips: [
      "'Take a nap, for the shayatin do not take naps' — Prophet ﷺ (Tabarani). An active Sunnah.",
      'Keep it strictly 20 min max — set an alarm. Longer causes grogginess.',
      'Even resting with eyes closed (without sleeping) fulfills the Sunnah',
      'Science confirms: a short nap significantly improves afternoon alertness and memory'
    ]
  },
  {
    time: '12:45 PM', name: 'Lunch', cat: 'h',
    icon: 'fas fa-utensils', dur: '30 min',
    tips: [
      "'Fill one-third for food, one-third for drink, one-third for air' — Ibn Majah 3349",
      'Protein + complex carbs = sustained afternoon energy. Avoid heavy rice-only meals.',
      'Eat with family or a colleague — strengthens bonds, is a Sunnah act'
    ]
  },
  {
    time: '1:15 PM', name: 'Work block 2 — collaboration', cat: 'w',
    icon: 'fas fa-comments', dur: '2 hr',
    tips: [
      'Post-lunch: slightly lower energy — ideal for important but less intense tasks',
      'Code reviews, PR feedback, team sync, documentation, bug fixes, meetings',
      'Continue Pomodoro — 5 min break: dhikr, stretch, water refill',
      'Batch messages and emails — continuous checking destroys flow state'
    ]
  },
  {
    time: '3:16 PM', name: 'Asr Prayer', cat: 's',
    icon: 'fas fa-mosque', dur: '15 min', anchor: true,
    tips: [
      "Asr is called 'the middle prayer' in Quran 2:238 — specially emphasized. Do NOT delay.",
      'Make wudu, 4 rakat Sunnah + 4 rakat Fard',
      'Post-prayer dhikr — Asr beautifully divides your workday into two natural halves'
    ]
  },
  {
    time: '3:35 PM', name: 'Skill learning block', cat: 'l',
    icon: 'fas fa-graduation-cap', dur: '1 hr 20 min',
    tips: [
      'Mon: DSA & competitive programming (Codeforces) — algorithmic thinking for interviews',
      'Tue: Java/Spring Boot deep-dives (Kafka, Redis, JPA, microservice patterns)',
      'Wed: DevOps & cloud (Docker, Kubernetes, CI/CD, Terraform) — high career leverage',
      'Thu: System design & distributed systems — separates junior from senior engineers',
      'Sat: Personal project work (stake-ledger, ERP, freelance builds)',
      'Always take notes in Notion — reviewing notes 10× more valuable than re-reading'
    ]
  },
  {
    time: '4:55 PM', name: 'Day review & planning', cat: 'w',
    icon: 'fas fa-clipboard-check', dur: '20 min',
    tips: [
      "Did you complete your MIT? If not, what blocked you? Note it precisely.",
      "Write tomorrow's top 3 tasks now — while today's context is fresh",
      'Note any ideas, blockers, or topics to research tomorrow',
      'Commit and push code — close all open loops before stepping away'
    ]
  },
  {
    time: '5:20 PM', name: 'Family & personal time', cat: 'f',
    icon: 'fas fa-heart', dur: '1 hr 20 min',
    tips: [
      'Fully disconnect from work screens — you gave the day its due; guard this boundary',
      'Quality time with family: parents, siblings, spouse — this is ibadah in Islam',
      'Short outdoor walk resets mood, restores attention, surfaces creative insights',
      'Handle personal errands or admin deferred during focused work blocks'
    ]
  },
  {
    time: '6:42 PM', name: 'Maghrib Prayer', cat: 's',
    icon: 'fas fa-mosque', dur: '25 min', anchor: true,
    tips: [
      '3 rakat Fard + 2 rakat Sunnah',
      'Evening adhkar (5–10 min): Ayatul Kursi, last 2 verses of Al-Baqarah, Al-Ikhlas × 3, Al-Falaq, An-Nas',
      'Blow on palms and wipe the body 3× after the three Quls — established Sunnah',
      'Maghrib marks the true end of the workday. Shift into calm, slow evening mode.'
    ]
  },
  {
    time: '7:10 PM', name: 'Dinner & family time', cat: 'f',
    icon: 'fas fa-bowl-food', dur: '55 min',
    tips: [
      'Eat with family — one of the most consistent relationship investments you can make',
      'Moderate dinner — slightly heavier than lunch is fine; do not overeat before sleep',
      'No phones at the table — full presence compounds powerfully over months and years',
      "Check in on family members' days, express gratitude, offer help"
    ]
  },
  {
    time: '8:08 PM', name: 'Isha Prayer', cat: 's',
    icon: 'fas fa-mosque', dur: '25 min', anchor: true,
    tips: [
      '4 rakat Sunnah + 4 rakat Fard + 2 rakat Sunnah + 3 rakat Witr',
      'Never skip Witr — the Prophet ﷺ never abandoned it even while travelling',
      'Make sincere dua after Witr: for yourself, your family, your work, your ummah',
      'This prayer seals the day spiritually — end it with gratitude and hope'
    ]
  },
  {
    time: '8:35 PM', name: 'Evening reflection & reading', cat: 'f',
    icon: 'fas fa-pen', dur: '35 min',
    tips: [
      '3 gratitudes: what went well — professionally, personally, and spiritually?',
      '1 learning: what did I understand better, improve, or realize today?',
      '1 tomorrow focus: one concrete action or study goal to carry forward',
      'Optional: read 15–20 min — tech books, Islamic books, biographies. No social media.'
    ]
  },
  {
    time: '9:15 PM', name: 'Wind down — screens off', cat: 'h',
    icon: 'fas fa-display', dur: '45 min',
    tips: [
      'All screens strictly off — blue light shifts sleep onset 1–2 hours later',
      'Prepare sleep environment: dark, cool, quiet',
      'Recite Surah Al-Mulk (67) — Sunnah before sleep, protection from grave punishment',
      'Recite Surahs Al-Ikhlas, Al-Falaq, An-Nas (blow on palms and wipe body 3×)',
      'Dua before sleep: Allahumma bismika amutu wa ahya'
    ]
  },
  {
    time: '10:00 PM', name: 'Sleep', cat: 'h',
    icon: 'fas fa-moon', dur: '5.5 hr',
    tips: [
      'Sleep on your right side — Sunnah of the Prophet ﷺ',
      '5.5 hrs + 20 min Qaylulah ≈ 6 hrs total rest (sufficient with good sleep quality)',
      'In winter, Fajr ~5:15 AM — you gain ~1.5 hours of extra sleep automatically',
      'Set a single alarm — multiple alarms fragment sleep cycles and worsen rest quality'
    ]
  }
];

/* ─── Prayer times (Dhaka approximate — verify daily) ─── */

const PRAYERS = [
  { name: 'Fajr',    time: '3:45 AM',  min: 3 * 60 + 45  },
  { name: 'Dhuhr',   time: '11:57 AM', min: 11 * 60 + 57 },
  { name: 'Asr',     time: '3:16 PM',  min: 15 * 60 + 16 },
  { name: 'Maghrib', time: '6:42 PM',  min: 18 * 60 + 42 },
  { name: 'Isha',    time: '8:08 PM',  min: 20 * 60 + 8  }
];

/* ─── Weekly rotation ────────────────────────────────── */

const WEEKLY = [
  { day: 'Monday',    cls: '',      topic: 'DSA & Competitive',  desc: 'Codeforces problems, algorithms, data structures, contest prep' },
  { day: 'Tuesday',   cls: '',      topic: 'Java & Spring Boot', desc: 'Kafka, Redis, JPA internals, microservice patterns' },
  { day: 'Wednesday', cls: '',      topic: 'DevOps & Cloud',     desc: 'Docker, Kubernetes, CI/CD, Terraform, cloud deployment' },
  { day: 'Thursday',  cls: '',      topic: 'System Design',      desc: 'Distributed systems, CAP theorem, senior-level architecture' },
  { day: 'Friday',    cls: 'wk-fri', topic: 'Islamic Learning', desc: "Lighter day — Jumu'ah, Quran study, reflection" },
  { day: 'Saturday',  cls: 'wk-sat', topic: 'Personal Projects', desc: 'stake-ledger, ERP builds, freelance, side products' },
  { day: 'Sunday',    cls: 'wk-sun', topic: 'Rest & Review',    desc: 'Week retrospective, plan next week, full rest' }
];

const CAT_LABEL = { s: 'Salah', w: 'Work', l: 'Learning', h: 'Wellness', f: 'Personal' };

/* ─── Helpers ────────────────────────────────────────── */

function toMin(timeStr) {
  const [t, ampm] = timeStr.split(' ');
  const [hS, mS] = t.split(':');
  let h = parseInt(hS, 10);
  const m = parseInt(mS, 10);
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

function curMin() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

function getCurrentBlock() {
  const cm = curMin();
  let cur = null;
  for (const b of SCHEDULE) {
    if (cm >= toMin(b.time)) cur = b;
  }
  return cur;
}

function getNextPrayer() {
  const cm = curMin();
  for (const p of PRAYERS) {
    if (cm < p.min) return p;
  }
  return PRAYERS[0]; // next day's Fajr
}

function fmtCountdown(diffMin) {
  if (diffMin < 0) diffMin += 24 * 60;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/* ─── Render: Prayer pills ───────────────────────────── */

function renderPrayers() {
  const pillsEl = document.getElementById('prayerPills');
  const nextEl  = document.getElementById('prayerNext');
  if (!pillsEl) return;

  const next = getNextPrayer();
  const cm   = curMin();

  pillsEl.innerHTML = PRAYERS.map(p => `
    <div class="ppill${p === next ? ' active' : ''}" role="listitem" title="${p.name}: ${p.time}">
      <span class="ppill-name">${p.name}</span>
      <span class="ppill-time">${p.time}</span>
    </div>
  `).join('');

  if (nextEl) {
    let diff = next.min - cm;
    if (diff < 0) diff += 24 * 60;
    nextEl.innerHTML = `Next: <strong>${next.name}</strong> in ${fmtCountdown(diff)}`;
  }
}

/* ─── Render: Now card ───────────────────────────────── */

function renderNowCard() {
  const el = document.getElementById('nowCard');
  if (!el) return;

  const block = getCurrentBlock();
  const next  = getNextPrayer();
  const cm    = curMin();
  let diff    = next.min - cm;
  if (diff < 0) diff += 24 * 60;

  if (!block) {
    el.innerHTML = `
      <div class="now-card-inner">
        <div class="now-icon-wrap"><i class="fas fa-moon" aria-hidden="true" style="color:var(--cs)"></i></div>
        <div class="now-meta">
          <div class="now-kicker">NOW</div>
          <div class="now-name">Before Fajr</div>
          <div class="now-tip">Prepare for the most blessed prayer of the day</div>
        </div>
        <div class="now-right">
          <div class="now-next">${next.name} in ${fmtCountdown(diff)}</div>
        </div>
      </div>`;
    el.className = 'now-card now-cat-s';
    return;
  }

  el.className = `now-card now-cat-${block.cat}`;
  el.innerHTML = `
    <div class="now-card-inner">
      <div class="now-icon-wrap">
        <i class="${block.icon}" aria-hidden="true"></i>
      </div>
      <div class="now-meta">
        <div class="now-kicker">NOW · ${new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true})}</div>
        <div class="now-name">${block.name}</div>
        <div class="now-tip">${block.tips[0]}</div>
      </div>
      <div class="now-right">
        <div class="now-time">${block.dur}</div>
        <div class="now-next">${next.name} in ${fmtCountdown(diff)}</div>
      </div>
    </div>`;
}

/* ─── Render: Timeline ───────────────────────────────── */

function renderTimeline() {
  const tl = document.getElementById('timeline');
  if (!tl) return;

  const cm = curMin();

  SCHEDULE.forEach((b, idx) => {
    const isNow = b === getCurrentBlock();
    const el = document.createElement('div');
    el.className = `block cat-${b.cat}${b.anchor ? ' anchor' : ''}${isNow ? ' is-now' : ''}`;
    el.dataset.cat = b.cat;
    el.role = 'listitem';
    el.style.transitionDelay = `${idx * 0.03}s`;

    el.innerHTML = `
      <div class="blk-time">
        <span class="blk-time-val">${b.time}</span>
        ${isNow ? '<span class="blk-now-badge">NOW</span>' : ''}
      </div>
      <div class="blk-dot-col"><div class="blk-dot"></div></div>
      <div class="blk-card" tabindex="0" role="button"
           aria-expanded="false" aria-label="Expand: ${b.name}">
        <div class="blk-head">
          <i class="${b.icon} blk-ico" aria-hidden="true"></i>
          <span class="blk-name">${b.name}</span>
          <span class="blk-dur">${b.dur}</span>
          <span class="blk-badge">${CAT_LABEL[b.cat]}</span>
          <i class="fas fa-chevron-down blk-chev" aria-hidden="true"></i>
        </div>
        <div class="blk-detail-wrap">
          <div class="blk-detail-inner">
            <div class="blk-detail">
              <ul class="tip-list">
                ${b.tips.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>`;

    /* Toggle expand */
    const card = el.querySelector('.blk-card');
    const wrap = el.querySelector('.blk-detail-wrap');
    function toggle() {
      const open = wrap.classList.contains('open');
      /* Close all */
      document.querySelectorAll('.blk-detail-wrap.open').forEach(w => w.classList.remove('open'));
      document.querySelectorAll('.block.expanded').forEach(b => {
        b.classList.remove('expanded');
        b.querySelector('.blk-card')?.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        wrap.classList.add('open');
        el.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
      }
    }
    el.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    tl.appendChild(el);
  });

  /* Stagger animate in */
  requestAnimationFrame(() => {
    document.querySelectorAll('.block').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), i * 28);
    });
  });
}

/* ─── Render: Weekly grid ────────────────────────────── */

function renderWeekGrid() {
  const el = document.getElementById('weekGrid');
  if (!el) return;
  el.innerHTML = WEEKLY.map(w => `
    <div class="wk-card ${w.cls}">
      <div class="wk-day">${w.day}</div>
      <div class="wk-topic">${w.topic}</div>
      <div class="wk-desc">${w.desc}</div>
    </div>
  `).join('');
}

/* ─── Live: Clock ────────────────────────────────────── */

function updateClock() {
  const tEl = document.getElementById('clockTime');
  const dEl = document.getElementById('clockDate');
  if (!tEl) return;
  const n = new Date();
  tEl.textContent = n.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });
  dEl.textContent = n.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });
}

/* ─── Live: Day progress ─────────────────────────────── */

function updateProgress() {
  const fillEl   = document.getElementById('progressFill');
  const pctEl    = document.getElementById('progressPct');
  const trackEl  = document.getElementById('progressTrack');
  const labelEl  = document.getElementById('progressLabel');
  if (!fillEl) return;

  const START = 3 * 60 + 30;  /* 3:30 AM */
  const END   = 22 * 60;      /* 10:00 PM */
  const cm    = curMin();
  let pct = 0;

  if (cm >= START && cm <= END) pct = Math.round(((cm - START) / (END - START)) * 100);
  else if (cm > END) pct = 100;

  fillEl.style.width = `${pct}%`;
  if (pctEl)   pctEl.textContent              = `${pct}%`;
  if (trackEl) trackEl.setAttribute('aria-valuenow', pct);

  const cur = getCurrentBlock();
  if (labelEl) labelEl.textContent = cur ? `Now: ${cur.name}` : 'Day progress';
}

/* ─── Live: Scroll bar ───────────────────────────────── */

function updateScrollBar() {
  const bar   = document.getElementById('scrollBar');
  if (!bar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
  bar.style.width = `${pct}%`;
}

/* ─── Filter ─────────────────────────────────────────── */

function initFilters() {
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const cat = btn.dataset.cat;
      document.querySelectorAll('.block').forEach(bl => {
        const show = cat === 'all' || bl.dataset.cat === cat;
        bl.classList.toggle('out', !show);
        /* If hiding, also close accordion */
        if (!show) {
          bl.querySelector('.blk-detail-wrap')?.classList.remove('open');
          bl.classList.remove('expanded');
        }
      });
    });
  });
}

/* ─── Init ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  /* Initial renders */
  renderTimeline();
  renderWeekGrid();
  renderPrayers();
  renderNowCard();
  updateClock();
  updateProgress();

  /* Live intervals */
  setInterval(updateClock, 1000);
  setInterval(() => {
    renderPrayers();
    renderNowCard();
    updateProgress();
    /* Refresh current-block highlight */
    document.querySelectorAll('.block').forEach(el => el.classList.remove('is-now'));
    document.querySelectorAll('.blk-time .blk-now-badge').forEach(b => b.remove());
    const cur = getCurrentBlock();
    if (cur) {
      const curIdx = SCHEDULE.indexOf(cur);
      const curEl  = document.querySelectorAll('.block')[curIdx];
      if (curEl) {
        curEl.classList.add('is-now');
        const timeEl = curEl.querySelector('.blk-time');
        if (timeEl && !timeEl.querySelector('.blk-now-badge')) {
          const badge = document.createElement('span');
          badge.className = 'blk-now-badge';
          badge.textContent = 'NOW';
          timeEl.appendChild(badge);
        }
      }
    }
  }, 60 * 1000);

  /* Scroll bar */
  window.addEventListener('scroll', updateScrollBar, { passive: true });

  /* Filters */
  initFilters();
});
