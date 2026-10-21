# Jerin Marriage — Wedding Invitation Website

## Project Overview
A premium, responsive, accessible, and high-performance single-page Christian wedding invitation website celebrating the Holy Matrimony and Reception of **Dr. Jerin James** and **Merin M. Joy**.

> [!IMPORTANT]
> **Event Scope**: This website is **STRICTLY for the Marriage Ceremony and Reception** on **Monday, 1 February 2027**. No other ceremonies or preliminary functions are included on this website.

## Confirmed Wedding Details
* **Wedding Date & Time**: Monday, 1st February 2027 at 10:30 a.m. IST (`2027-02-01T10:30:00+05:30`)
* **Couple**:
  * Groom: **Dr. Jerin James**
  * Bride: **Merin M. Joy**
  * Monogram: **J & M**
* **Parents & Family Details**:
  * Groom's Parents: **Mr. James D & Mrs. Rosilin James**  
    *Address*: Karikkathil Thekkethil Veedu, Andoor P.O., Cheruvalloor, Kollam
  * Bride's Parents: **Mr. Joy & Mrs. Mini Joy**  
    *Address*: Puthenparambil House, Lakkoor, Vellapara P.O., Pathanamthitta
* **Bible Verse**:
  > “The Lord has done great things for us, and we are filled with joy.” — Psalms 126:3
* **Venues & Exact Map Links**:
  * **Ceremony (10:30 a.m.)**: **St. Mary's Malankara Catholic Church**, Valakom, Kollam  
    Google Maps: `https://maps.app.goo.gl/Da2ffQNDySAqRJjC7`
  * **Reception**: **Pratheeksha Auditorium**, Valakom  
    Google Maps: `https://maps.app.goo.gl/4sYNNLfQ3Zyqh4T38`
* **With Best Compliments From**: **Jebin James & Jerin Joy**, Family & Friends
* **RSVP & Attendance System**: Connected to Google Sheets via Google Apps Script Web App (`Attendance Responses` sheet in spreadsheet `19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY`).
  * Contact Validation: Full Name required. Email and Mobile are optional individually, but at least one must be provided.
  * Separate Attendance Options: Engagement Ceremony (21 Jan 2027) and Wedding Ceremony & Reception (1 Feb 2027), with conditional attendee counts (1–100).
* **QR Code & Website URL**: The QR code and WhatsApp share link use the published URL at runtime (`window.location.href`). Live at `https://orynza.github.io/JERIN-MERIN-WEDDING/`.

## Tech Stack & Architecture Guidelines
* **Zero Heavy Frameworks**: Pure vanilla HTML5, CSS3, and modern ES6+ JavaScript.
* **No Server/Backend**: Fully static client-side project deployable on GitHub Pages, Cloudflare Pages, Netlify, or Vercel.
* **Configuration Decoupling**: All event-specific details (names, dates, times, venues, URLs, invitation messages) MUST reside in `js/wedding-config.js`. `index.html` and `js/main.js` must consume this config so future updates never require markup refactoring.
* **Asset Organization**:
  ```text
  E:\Jerin Marriage\
  ├── AGENTS.md             # Project guidelines and confirmed details
  ├── .gitignore            # Standard git exclusions
  ├── index.html            # Semantic markup
  ├── css/
  │   └── style.css         # Design system & responsive styles
  ├── js/
  │   ├── wedding-config.js # Centralized event configuration
  │   └── main.js           # Countdown, sharing, modals, dynamic rendering
  └── assets/               # Images, monogram, badges
  ```

## Design System & UX Standards
* **Aesthetic**: Premium Christian wedding luxury design (Champagne Gold `#C5A059`, Deep Forest Emerald `#0F2318`, Warm Ivory `#FAF7F2`, Charcoal `#272822`).
* **Typography**: Classic luxury serif for headings (Cinzel / Playfair Display / Cormorant Garamond) paired with modern legible sans-serif for body (Montserrat).
* **Responsive & Mobile-First**: Mobile screen layouts must be polished and touch-friendly (>80% of wedding invitations are opened on smartphones via WhatsApp).
* **Accessibility (a11y)**:
  * WCAG AA contrast compliance across all text and buttons.
  * Explicit `aria-label`, `aria-live`, and keyboard navigation support.
  * Native `<dialog>` for modals with `showModal()`, light-dismiss backdrop, and `Esc` handling.
  * Respect `prefers-reduced-motion` for animations.
