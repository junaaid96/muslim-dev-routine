# ☽ Muslim Dev Routine

A complete daily routine website for a Muslim Software Engineer in Dhaka, Bangladesh — anchored around the five daily prayers with deep work blocks, post-Asr skill learning, and Sunnah habits integrated throughout.

## ✨ Features

- **Live prayer times** — fetched for *today* and *your location* via the [Aladhan API](https://aladhan.com/prayer-times-api) (Karachi calculation method, the standard for Bangladesh)
- **Location-aware** — pick any Bangladesh city, or tap "Use my location" for GPS-based times (Dhaka, Chittagong, Sylhet, etc. all differ)
- **Madhab toggle** — switch Asr calculation between Hanafi and Standard (Shafi/Maliki/Hanbali)
- **Self-adjusting routine** — Fajr/Dhuhr/Asr/Maghrib/Isha blocks, plus wake-up and post-prayer blocks, shift automatically with the real times and re-sort by clock order across seasons
- **Live clock** — real-time display in the header
- **"NOW" card** — shows the current active block and live countdown to the next Salah
- **Day progress bar** + **scroll progress bar**
- **Interactive timeline** — 20 blocks, click any to expand tips with smooth animation
- **Category filter** — Prayer / Work / Learning / Wellness / Personal
- **Weekly skill rotation** — structured 7-day post-Asr learning plan
- **Habit loop visualization** — Adhan → Wudu + Salah → Barakah → Focused work
- **Responsive + accessible** — ARIA roles, keyboard navigation, focus styles
- **Graceful fallback** — if offline or the API fails, approximate times are shown with a warning badge

## 🗂️ File structure

```
muslim-dev-routine/
├── index.html   # Semantic HTML structure
├── style.css    # Dark theme · animations · responsive design
└── script.js    # All data + live features + interactivity
```

## 🕌 Schedule overview

| Time | Block | Category |
|------|-------|----------|
| 3:30 AM | Wake up & wudu | Wellness |
| 3:45 AM | **Fajr Prayer** | Prayer |
| 4:05 AM | Quran & morning adhkar | Prayer |
| 5:00 AM | Exercise & freshening up | Wellness |
| 5:45 AM | Breakfast & day planning | Wellness |
| 6:30 AM | **Deep work — block 1** | Work |
| 11:57 AM | **Dhuhr Prayer** | Prayer |
| 12:25 PM | Qaylulah (midday nap) | Wellness |
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

## 📚 Weekly skill rotation (post-Asr)

| Day | Focus |
|-----|-------|
| Monday | DSA & Competitive Programming (Codeforces) |
| Tuesday | Java / Spring Boot internals |
| Wednesday | DevOps & Cloud (Docker, K8s, Terraform) |
| Thursday | System Design & Distributed Systems |
| Friday | Islamic learning (lighter day) |
| Saturday | Personal project work |
| Sunday | Rest & weekly review |

## 🌱 Design

- **Theme:** Desert Night — deep navy with teal-green Islamic accents and amber prayer highlights
- **Fonts:** Syne (headers) · Space Mono (time labels) · Outfit (body)
- **Icons:** Font Awesome 6

## 📖 Islamic references

- Morning barakah: Tirmidhi 1212
- Qaylulah: Tabarani (midday nap Sunnah)
- Moderation in eating: Ibn Majah 3349
- Asr emphasis: Quran 2:238

---

*Built for a Muslim Software Engineer in Dhaka, Bangladesh · Aligned with Quran & Sunnah*
