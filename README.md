# Dr. Jerin James & Merin M. Joy — Wedding Invitation Website

A luxury Christian wedding invitation website celebrating the Holy Matrimony of **Dr. Jerin James** and **Merin M. Joy**.

Published at: [https://orynza.github.io/JERIN-MERIN-WEDDING/](https://orynza.github.io/JERIN-MERIN-WEDDING/)

---

## Key Features

- **Multilingual Support**: Complete translations in English, Malayalam (മലയാളം), Tamil (தமிழ்), and Hindi (हिन्दी) with scriptural fidelity (Psalms 126:3).
- **Couple Portrait**: Featured illustration section (*"Always Us"*) preserving the full 2:3 artwork without cropping.
- **Event Itinerary & Direction Guides**:
  - **Engagement Ceremony**: Thursday, 21 January 2027 • 11:00 AM • St. George's Malankara Catholic Church, Lakkoor
  - **Engagement Reception**: Thursday, 21 January 2027 • Following Ceremony • St. George Orthodox Maha Edavaka Auditorium, Konni
  - **Wedding Holy Matrimony**: Monday, 1 February 2027 • 10:30 AM • St. Mary's Malankara Catholic Church, Valakom
  - **Wedding Reception (Feast)**: Monday, 1 February 2027 • Following Ceremony • Pratheeksha Auditorium, Valakom
- **Interactive RSVP System**: Real-time attendance confirmation connected to Google Sheets via Google Apps Script with automated schema synchronization and 11-column data validation.
- **Refined Color Palette**: Warm Ivory (`#F8F5EE`), Elegant Black (`#171A18`), Deep Emerald (`#14251D`), Turquoise Blue (`#40C4C6`), Pastel Sage Green (`#C9D8C5`), and Champagne Gold (`#C5A15A`).
- **Media & Audio**: Ambient background hymns with floating music player and interactive opening curtain.

---

## Project Structure

```
JERIN-MERIN-WEDDING/
├── index.html                 # Semantic HTML5 markup
├── css/
│   └── style.css              # Design tokens and responsive styles
├── js/
│   ├── wedding-config.js      # Core event dates, Google Apps Script endpoint, and metadata
│   ├── translations.js        # Multilingual translations (en, ml, ta, hi)
│   └── main.js                # Form submission, music player, countdown, and animations
├── assets/
│   ├── coupleimage.jpeg       # Couple portrait artwork
│   └── weddingmusic.mp3       # Background instrumental audio
├── google-apps-script/
│   ├── Code.gs                # Google Apps Script Web App for Google Sheet RSVP handling
│   └── README.md              # Deployment guide and schema documentation
└── README.md                  # Project overview
```

---

## Deployment to GitHub Pages

This is a static web application requiring no build step:
1. Enable **GitHub Pages** under repository **Settings → Pages**.
2. Set **Source** to `Deploy from a branch`.
3. Choose branch `main` and folder `/ (root)`.
4. The site will be available at `https://orynza.github.io/JERIN-MERIN-WEDDING/`.
