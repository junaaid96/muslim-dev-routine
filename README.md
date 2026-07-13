# ☽ Muslim Dev Routine

A free, open daily-routine site for Muslim software engineers — anchored on the five daily prayers, with live Salah times, deep work blocks, post-Asr skill learning, and a Practice page for checklists, muhasabah, and focus sessions.

**Anyone can use it, fork it, change it, and share it.** It is free. There is no copyright claim on this project — use it however you like, with or without attribution.

## Pages

| Page | File | Purpose |
|------|------|---------|
| **Routine** | `index.html` | Live prayer times, self-adjusting day timeline, weekly skill rotation, habit loop |
| **Practice** | `practice.html` | Daily checklist, intention/MIT, water & streak, muhasabah notes, Pomodoro timer |

Open either file in a browser (or serve the folder locally). No build step, no backend.

## Features

### Routine (`index.html`)

- **Live prayer times** — today + your location via the [Aladhan API](https://aladhan.com/prayer-times-api) (Karachi method, common for Bangladesh)
- **Location-aware** — Bangladesh cities (Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, Rangpur, Barisal, Mymensingh) or **Use my location** (GPS)
- **Madhab toggle** — Hanafi or Standard (Shafi/Maliki/Hanbali) for Asr
- **Self-adjusting schedule** — Fajr/Dhuhr/Asr/Maghrib/Isha plus wake-up and post-prayer blocks shift with real times and re-sort by clock order across seasons
- **Next-prayer countdown** — live hours / minutes / seconds to the next Salah
- **Prayer pills** — today’s five times at a glance
- **Live clock** in the header
- **"NOW" card** — current block + countdown context
- **Day progress** + **scroll progress** bars
- **Interactive timeline** — expand any block for tips
- **Category filters** — Prayer / Work / Learning / Wellness / Personal
- **Editable weekly skill rotation** — post-Asr plan; edit, save, or reset (stored in the browser)
- **Habit loop** — Adhan → Wudu + Salah → Barakah → Focused work
- **Graceful fallback** — if offline or the API fails, approximate times with a warning

### Practice (`practice.html`)

- **Intention & MIT** — niyyah, Most Important Task, one focused ibadah (after Fajr)
- **Daily checklist** — Salah on time, Sunnah & spiritual, health & body, work/family/mind
- **Progress ring**, **streak** (≥50% checklist), **water tracker** (8 glasses), **7-day heatmap**
- **Focus timer** — Focus 25 / Break 5 / Break 15 / Deep 50; session count for today
- **Muhasabah notes** — gratitudes, learning, tomorrow’s focus, free notes; copy to clipboard
- **Sunnah & health anchors** — quick reference tips
- **Private & local** — everything in `localStorage` on this browser only

## Quick start

```bash
# Option A — open directly
open index.html

# Option B — simple local server (recommended for geolocation)
npx serve .
# then visit http://localhost:3000
```

## File structure

```
muslim-dev-routine/
├── index.html      # Routine page
├── practice.html   # Practice page
├── style.css       # Shared theme · layout · responsive styles
├── script.js       # Prayer API · schedule · timeline · weekly rotation
├── practice.js     # Checklist · notes · water · streak · focus timer
└── README.md
```

## Schedule overview

Times below are template defaults (Dhaka-like). Live prayer blocks and relative blocks (wake-up, post-prayer, etc.) move with real Salah times.

| Time | Block | Category |
|------|-------|----------|
| 3:30 AM | Wake up & wudu | Wellness |
| 3:45 AM | **Fajr Prayer** | Prayer |
| 4:05 AM | Quran & morning adhkar | Prayer |
| 5:00 AM | Exercise & freshening up | Wellness |
| 5:45 AM | Breakfast & day planning | Wellness |
| 6:30 AM | **Deep work — block 1** | Work |
| 11:57 AM | **Dhuhr Prayer** | Prayer |
| 12:25 PM | Qaylulah — midday nap | Wellness |
| 12:45 PM | Lunch | Wellness |
| 1:15 PM | Work block 2 — collaboration | Work |
| 3:16 PM | **Asr Prayer** | Prayer |
| 3:35 PM | **Skill learning block** | Learning |
| 4:55 PM | Day review & planning | Work |
| 5:20 PM | Family & personal time | Personal |
| 6:42 PM | **Maghrib Prayer** | Prayer |
| 7:10 PM | Dinner & family time | Personal |
| 8:08 PM | **Isha Prayer** | Prayer |
| 8:35 PM | Evening reflection & reading | Personal |
| 9:15 PM | Wind down — screens off | Wellness |
| 10:00 PM | Sleep | Wellness |

## Weekly skill rotation (post-Asr)

Default plan — editable on the Routine page:

| Day | Focus |
|-----|-------|
| Monday | DSA & Competitive Programming (Codeforces) |
| Tuesday | Java / Spring Boot internals |
| Wednesday | DevOps & Cloud (Docker, K8s, Terraform) |
| Thursday | System Design & Distributed Systems |
| Friday | Islamic learning (lighter day) |
| Saturday | Personal project work |
| Sunday | Rest & weekly review |

## Design

- **Theme:** Desert Night — deep navy with teal Islamic accents and amber prayer highlights
- **Fonts:** Fraunces (display) · Plus Jakarta Sans (body) · JetBrains Mono (times)
- **Icons:** Font Awesome 6

## Islamic references

- Morning barakah: Tirmidhi 1212
- Qaylulah: Tabarani (midday nap Sunnah)
- Moderation in eating: Ibn Majah 3349
- Asr emphasis: Quran 2:238

## License / freedom to use

**Free for everyone. No copyright.**

You may copy, modify, redistribute, and use this project for personal or commercial purposes without restriction and without asking permission. Contributions and forks are welcome.

---

*Built for a Muslim Software Engineer in Dhaka, Bangladesh · Aligned with Quran & Sunnah*  
*Developed by [Md. Junaidul Islam](https://www.junaidul.pro.bd)*
