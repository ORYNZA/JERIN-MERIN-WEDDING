/**
 * Jerin Marriage — Main Application Logic & Premium Animation Suite
 * Consumes WEDDING_CONFIG from wedding-config.js and TRANSLATIONS from translations.js
 * 
 * Features:
 * - Multilingual Support: English (en), Malayalam (ml), Tamil (ta), Hindi (hi)
 * - First-Visit Dedicated Language Selection Screen with Botanical Decor & Monogram
 * - 3D Animated Book Opening Experience
 * - Persistent Language Switcher (EN | ML | TA | HI)
 * - Interactive Wax Seal & Opening Envelope Curtain
 * - 60fps Floating Golden Stardust Particle Canvas
 * - Web Audio API Background Wedding Music Controller
 * - Native IntersectionObserver Scroll Reveals
 * - Animated Countdown with Heartbeat Card Pulse
 * - Enhanced Attendance Form with House Name & Family Side
 * - Conditional Contact Validation (Email or Mobile or Both)
 * - Real Google Apps Script Web App Integration
 * - Golden Celebration Confetti Burst on Buttons
 * - Native <dialog> Modal with Light-Dismiss Compliance
 */

(function () {
  'use strict';

  // Ensure configuration is loaded
  if (typeof WEDDING_CONFIG === 'undefined') {
    console.error('WEDDING_CONFIG is missing. Please ensure js/wedding-config.js is loaded.');
    return;
  }

  const config = WEDDING_CONFIG;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Active language state (default: English)
  let currentLang = 'en';

  /**
   * Helper: Safely escape HTML to prevent XSS
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Translation lookup helper
   */
  function t(key) {
    if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key] !== undefined) {
      return TRANSLATIONS[currentLang][key];
    }
    if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS['en'] && TRANSLATIONS['en'][key] !== undefined) {
      return TRANSLATIONS['en'][key];
    }
    return '';
  }

  /**
   * Apply translations to all DOM elements with data-i18n or data-i18n-placeholder
   */
  function applyTranslations(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update body language class for script-specific typography
    document.body.className = document.body.className.replace(/\blang-[a-z]{2}\b/g, '').trim() + ' lang-' + lang;

    // Fallback: render events if container is not yet populated
    const eventsContainer = document.querySelector('.js-events-container');
    if (eventsContainer && !eventsContainer.children.length) {
      renderEvents();
    }

    // Translate text content in place
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (typeof translation === 'string') {
        if (key === 'scriptureVerse') {
          el.innerText = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // Translate input placeholders in place
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = t(key);
      if (typeof translation === 'string') {
        el.setAttribute('placeholder', translation);
      }
    });

    // Update language switcher active buttons
    document.querySelectorAll('.lang-switcher-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });

    // Re-hydrate WhatsApp share link with active language message
    setupWhatsAppShare();
  }

  /**
   * Set and persist active language
   */
  function setLanguage(lang, persist = true) {
    if (!['en', 'ml', 'ta', 'hi'].includes(lang)) {
      lang = 'en';
    }
    currentLang = lang;
    if (persist) {
      try {
        localStorage.setItem('jerin_wedding_lang', lang);
      } catch (e) {
        // Handle localStorage restrictions in private browsing or iframe
      }
    }
    applyTranslations(lang);
  }

  /**
   * Detect initial language preference
   */
  function detectInitialLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && ['en', 'ml', 'ta', 'hi'].includes(urlLang)) {
        return { lang: urlLang, isStored: true };
      }
    } catch (e) {}

    try {
      const stored = localStorage.getItem('jerin_wedding_lang');
      if (stored && ['en', 'ml', 'ta', 'hi'].includes(stored)) {
        return { lang: stored, isStored: true };
      }
    } catch (e) {}

    return { lang: 'en', isStored: false };
  }

  /**
   * 1. First-Visit Language Selection Screen (Opens Invitation Directly)
   */
  let langAnimId = null;

  function setupLanguageSelector(onLangChosen) {
    const langSelector = document.getElementById('language-selector');
    if (!langSelector) {
      if (typeof onLangChosen === 'function') onLangChosen('en', false);
      return;
    }

    const { lang: initialLang, isStored } = detectInitialLanguage();

    if (isStored) {
      // User has already chosen a language: show invitation directly
      setLanguage(initialLang, false);
      langSelector.classList.add('is-dismissed');
      langSelector.style.display = 'none';
      checkScrollReveals();
      if (typeof onLangChosen === 'function') onLangChosen(initialLang, false);
      return;
    }

    // First-time visit: display full-screen language selection screen
    langSelector.style.display = 'flex';
    setupLangParticlesCanvas();

    const langCards = langSelector.querySelectorAll('.lang-card');
    langCards.forEach(card => {
      const handleSelect = () => {
        const chosen = card.getAttribute('data-lang') || 'en';
        setLanguage(chosen, true);

        // Immediate visual feedback
        langCards.forEach(c => c.setAttribute('aria-checked', 'false'));
        card.setAttribute('aria-checked', 'true');
        card.style.transform = 'scale(0.97)';

        // Stop particles loop
        if (langAnimId) {
          cancelAnimationFrame(langAnimId);
          langAnimId = null;
        }

        // Direct opening: smoothly dissolve language selector straight into the invitation
        setTimeout(() => {
          langSelector.classList.add('is-dismissed');
          setTimeout(() => {
            langSelector.style.display = 'none';
          }, 250);

          // Reveal all initial viewport content immediately
          checkScrollReveals();

          if (typeof onLangChosen === 'function') {
            onLangChosen(chosen, true);
          }
        }, 120);
      };

      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });
  }

  /**
   * Dedicated subtle golden motes on language selector
   */
  function setupLangParticlesCanvas() {
    if (isReducedMotion) return;
    const canvas = document.getElementById('lang-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.6,
      vy: Math.random() * 0.25 + 0.1,
      alpha: Math.random() * 0.45 + 0.2
    }));

    function render() {
      const parent = canvas.closest('.lang-selector');
      if (!parent || parent.classList.contains('is-dismissed') || parent.style.display === 'none') {
        cancelAnimationFrame(langAnimId);
        langAnimId = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.45)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.vy;
        if (p.y < -5) p.y = height + 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      langAnimId = requestAnimationFrame(render);
    }

    if (langAnimId) cancelAnimationFrame(langAnimId);
    langAnimId = requestAnimationFrame(render);
  }

  /**
   * 3. Setup Persistent Language Switcher Pill (EN | ML | TA | HI)
   */
  function setupLanguageSwitcher() {
    const switcherBtns = document.querySelectorAll('.lang-switcher-btn');
    switcherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (lang) {
          setLanguage(lang, true);
        }
      });
    });
  }

  /**
   * Initialize Dynamic Content from Configuration
   */
  function initDynamicContent() {
    // Monogram
    document.querySelectorAll('.js-monogram').forEach(el => {
      el.textContent = config.couple.monogram;
    });

    // Couple Names
    document.querySelectorAll('.js-groom-name').forEach(el => {
      el.textContent = config.couple.groom;
    });
    document.querySelectorAll('.js-groom-short').forEach(el => {
      el.textContent = config.couple.groomShort;
    });
    document.querySelectorAll('.js-bride-name').forEach(el => {
      el.textContent = config.couple.bride;
    });
    document.querySelectorAll('.js-bride-short').forEach(el => {
      el.textContent = config.couple.brideShort;
    });

    // Confirmed Wedding Date & Time
    document.querySelectorAll('.js-wedding-date').forEach(el => {
      el.textContent = config.weddingDate.displayDate;
    });
    document.querySelectorAll('.js-wedding-time').forEach(el => {
      el.textContent = config.weddingDate.displayTime;
    });

    // Scripture Section
    const scriptureVerseEl = document.querySelector('.js-scripture-verse');
    if (scriptureVerseEl && config.scripture) {
      scriptureVerseEl.innerText = t('scriptureVerse') || config.scripture.verse;
    }
    const scriptureRefEl = document.querySelector('.js-scripture-ref');
    if (scriptureRefEl && config.scripture) {
      scriptureRefEl.textContent = t('scriptureRef') || config.scripture.reference;
    }

    // Parents & Addresses
    const groomParentsEl = document.querySelector('.js-groom-parents');
    if (groomParentsEl && config.couple.groomParents) {
      groomParentsEl.textContent = config.couple.groomParents;
    }
    const groomAddressEl = document.querySelector('.js-groom-address');
    if (groomAddressEl && config.couple.groomAddress) {
      groomAddressEl.textContent = config.couple.groomAddress;
    }

    const brideParentsEl = document.querySelector('.js-bride-parents');
    if (brideParentsEl && config.couple.brideParents) {
      brideParentsEl.textContent = config.couple.brideParents;
    }
    const brideAddressEl = document.querySelector('.js-bride-address');
    if (brideAddressEl && config.couple.brideAddress) {
      brideAddressEl.textContent = config.couple.brideAddress;
    }

    // Render Grouped Event Schedule Cards (Engagement & Wedding)
    renderEvents();
  }

  /**
   * Render Event Schedule Cards grouped by celebration (Engagement & Wedding)
   */
  function renderEvents() {
    const eventsContainer = document.querySelector('.js-events-container');
    if (!eventsContainer || !config.events || !Array.isArray(config.events)) return;

    const groups = [
      {
        id: 'engagement',
        tagKey: 'engagementGroupTag',
        defaultTag: '💍 PRE-WEDDING CELEBRATION',
        titleKey: 'engagementGroupTitle',
        defaultTitle: 'Engagement Ceremony & Reception',
        style: ''
      },
      {
        id: 'wedding',
        tagKey: 'weddingGroupTag',
        defaultTag: '⛪ SACRED MATRIMONY & FEAST',
        titleKey: 'weddingGroupTitle',
        defaultTitle: 'Wedding Ceremony & Reception',
        style: 'margin-top: 3.5rem;'
      }
    ];

    eventsContainer.innerHTML = groups.map(grp => {
      const groupEvents = config.events.filter(e => e.group === grp.id);
      if (groupEvents.length === 0) return '';

      const groupTagText = t(grp.tagKey) || grp.defaultTag;
      const groupTitleText = t(grp.titleKey) || grp.defaultTitle;

      const cardsHtml = groupEvents.map(event => {
        const isReception = event.id.includes('reception');
        const cardModifier = isReception ? 'event-card-reception' : 'event-card-ceremony';

        const titleText = t(event.i18nTitleKey) || event.title;
        const subtitleText = t(event.i18nSubtitleKey) || event.subtitle;
        const badgeText = t(event.i18nBadgeKey) || event.badge;
        const dirText = t(event.i18nDirKey) || event.directionsLabel || 'Get Directions';

        let dateHtml = '';
        if (event.date) {
          const dateVal = (event.i18nDateKey && t(event.i18nDateKey)) ? t(event.i18nDateKey) : event.date;
          dateHtml = `
            <li class="event-detail-item">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span><strong data-i18n="labelDate">${escapeHtml(t('labelDate') || 'Date:')}</strong> <span ${event.i18nDateKey ? `data-i18n="${escapeHtml(event.i18nDateKey)}"` : ''}>${escapeHtml(dateVal)}</span></span>
            </li>
          `;
        }

        let timeHtml = '';
        if (event.time) {
          const timeVal = (event.i18nTimeKey && t(event.i18nTimeKey)) ? t(event.i18nTimeKey) : event.time;
          timeHtml = `
            <li class="event-detail-item">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span><strong data-i18n="labelTime">${escapeHtml(t('labelTime') || 'Time:')}</strong> <span ${event.i18nTimeKey ? `data-i18n="${escapeHtml(event.i18nTimeKey)}"` : ''}>${escapeHtml(timeVal)}</span></span>
            </li>
          `;
        }

        return `
          <article class="event-card ${cardModifier} reveal-on-scroll" id="event-${escapeHtml(event.id)}">
            <div class="event-card-header">
              <span class="event-badge ${escapeHtml(event.badgeClass || '')}" data-i18n="${escapeHtml(event.i18nBadgeKey || '')}">${escapeHtml(badgeText)}</span>
              <h4 class="event-title" data-i18n="${escapeHtml(event.i18nTitleKey || '')}">${escapeHtml(titleText)}</h4>
              <p class="event-subtitle" data-i18n="${escapeHtml(event.i18nSubtitleKey || '')}">${escapeHtml(subtitleText)}</p>
            </div>
            
            <ul class="event-details-list">
              ${dateHtml}
              ${timeHtml}
              <li class="event-detail-item">
                <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span><strong data-i18n="labelVenue">${escapeHtml(t('labelVenue') || 'Venue:')}</strong> ${escapeHtml(event.venueName)}${event.venueAddress ? '<br><small style="color: var(--color-text-muted);">' + escapeHtml(event.venueAddress) + '</small>' : ''}</span>
              </li>
            </ul>

            <div class="event-card-actions">
              <a href="${escapeHtml(event.mapUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-shine js-btn-celebrate" aria-label="Get directions to ${escapeHtml(event.venueName)} (opens in new tab)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
                <span data-i18n="${escapeHtml(event.i18nDirKey || '')}">${escapeHtml(dirText)}</span>
              </a>
            </div>
          </article>
        `;
      }).join('');

      return `
        <div class="event-group" id="group-${escapeHtml(grp.id)}" ${grp.style ? 'style="' + grp.style + '"' : ''}>
          <div class="event-group-header">
            <span class="event-group-badge" data-i18n="${escapeHtml(grp.tagKey)}">${escapeHtml(groupTagText)}</span>
            <h3 class="event-group-title" data-i18n="${escapeHtml(grp.titleKey)}">${escapeHtml(groupTitleText)}</h3>
          </div>
          <div class="events-grid">
            ${cardsHtml}
          </div>
        </div>
      `;
    }).join('');

    // Reconnect confetti triggers on newly rendered buttons
    setupConfettiButtons();
  }

  function setupOtherSections() {

    // Compliments Section
    const complimentsNamesEl = document.querySelector('.js-compliments-names');
    if (complimentsNamesEl && config.compliments) {
      complimentsNamesEl.textContent = config.compliments.names;
    }
    const complimentsGroupEl = document.querySelector('.js-compliments-group');
    if (complimentsGroupEl && config.compliments) {
      complimentsGroupEl.textContent = t('complimentsGroup') || config.compliments.group;
    }

    // RSVP Section Setup
    setupRSVPSection();

    // WhatsApp Invitation Link Setup
    setupWhatsAppShare();

    // Setup QR Code
    setupQRCodeModal();

    // Setup Interactive Confetti on Celebration Buttons
    setupConfettiButtons();
  }

  /**
   * Countdown Timer targeting 1 February 2027 at 10:30 a.m. IST with Pulse Animation
   */
  function initCountdown() {
    const targetDate = new Date(config.weddingDate.isoTarget).getTime();

    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minutesEl = document.getElementById('count-minutes');
    const secondsEl = document.getElementById('count-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function padZero(num) {
      return num < 10 ? '0' + num : String(num);
    }

    let prevD = '', prevH = '', prevM = '', prevS = '';

    function update() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        if (daysEl.textContent !== '00') daysEl.textContent = '00';
        if (hoursEl.textContent !== '00') hoursEl.textContent = '00';
        if (minutesEl.textContent !== '00') minutesEl.textContent = '00';
        if (secondsEl.textContent !== '00') secondsEl.textContent = '00';
        const note = document.querySelector('.countdown-note');
        if (note) note.textContent = t('countdownDone') || 'The Wedding Day is Here! Blessed Holy Matrimony celebrations have begun.';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const dStr = padZero(days);
      const hStr = padZero(hours);
      const mStr = padZero(minutes);
      const sStr = padZero(seconds);

      if (dStr !== prevD) { daysEl.textContent = dStr; prevD = dStr; }
      if (hStr !== prevH) { hoursEl.textContent = hStr; prevH = hStr; }
      if (mStr !== prevM) { minutesEl.textContent = mStr; prevM = mStr; }
      if (sStr !== prevS) { secondsEl.textContent = sStr; prevS = sStr; }
    }

    update();
    setInterval(update, 1000);
  }

  /**
   * Helper: Normalize and validate Indian mobile numbers (10 digits, starts with 6-9, accepts +91 or 0 prefix)
   */
  function normalizeIndianMobile(raw) {
    if (!raw) return { valid: false, normalized: '', raw10: '' };
    const trimmed = String(raw).trim();
    if (/[a-zA-Z]/.test(trimmed)) {
      return { valid: false, normalized: '', raw10: '' };
    }
    let clean = trimmed.replace(/[\s\-\(\)\.]/g, '');
    if (clean.startsWith('+91')) {
      clean = clean.substring(3);
    } else if (clean.startsWith('+')) {
      return { valid: false, normalized: '', raw10: '' };
    } else if (clean.startsWith('91') && clean.length === 12) {
      clean = clean.substring(2);
    } else if (clean.startsWith('0') && clean.length === 11) {
      clean = clean.substring(1);
    }
    if (/^[6-9]\d{9}$/.test(clean)) {
      const formatted = '+91 ' + clean.substring(0, 5) + ' ' + clean.substring(5);
      return { valid: true, normalized: formatted, raw10: clean };
    }
    return { valid: false, normalized: '', raw10: '' };
  }

  /**
   * Helper: Validate standard email address format
   */
  function isValidEmail(email) {
    if (!email) return false;
    const trimmed = String(email).trim();
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(trimmed);
  }

  /**
   * Setup RSVP Section:
   * - Hydrate Family Coordinator cards with dual Call and WhatsApp buttons
   * - Independent attendance controls for Engagement and Wedding
   * - House name and family side validation
   * - Conditional contact validation (email or mobile or both; neither is individually required)
   * - Submission to Google Apps Script Web App with multilingual feedback
   */
  function setupRSVPSection() {
    // 1. Hydrate Family Coordinator Contact Cards
    const contactsGrid = document.querySelector('.js-contacts-grid');
    if (contactsGrid && Array.isArray(config.rsvp.contactPersons)) {
      contactsGrid.innerHTML = config.rsvp.contactPersons.map(contact => `
        <article class="contact-card">
          <div class="contact-card-name">${escapeHtml(contact.name)}</div>
          <div class="contact-card-role">${escapeHtml(contact.role || 'Family Coordinator')}</div>
          <div class="contact-card-phone">${escapeHtml(contact.displayPhone)}</div>
          <div class="contact-actions-row">
            <a href="${escapeHtml(contact.callUrl)}" class="contact-action-btn btn-contact-call" aria-label="Call ${escapeHtml(contact.name)}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span data-i18n="formBtnCall">${escapeHtml(t('formBtnCall') || 'Call')}</span>
            </a>
            <a href="${escapeHtml(contact.whatsappUrl)}" target="_blank" rel="noopener noreferrer" class="contact-action-btn btn-contact-whatsapp js-btn-celebrate" aria-label="Send WhatsApp message to ${escapeHtml(contact.name)}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.043.071.043.419-.101.824z"/>
              </svg>
              <span data-i18n="formBtnWhatsApp">${escapeHtml(t('formBtnWhatsApp') || 'WhatsApp')}</span>
            </a>
          </div>
        </article>
      `).join('');
    }

    // 2. RSVP Attendance Form Interactivity
    const rsvpForm = document.getElementById('wedding-rsvp-form');
    if (!rsvpForm) return;

    // Prevent duplicate event listener bindings
    if (rsvpForm.dataset.initialized === 'true') return;
    rsvpForm.dataset.initialized = 'true';

    const nameInput = document.getElementById('rsvp-name');
    const houseNameInput = document.getElementById('rsvp-housename');
    const emailInput = document.getElementById('rsvp-email');
    const mobileInput = document.getElementById('rsvp-mobile');
    const messageInput = document.getElementById('rsvp-message');
    const familySideGroup = document.getElementById('rsvp-family-side-group') || rsvpForm.querySelector('.rsvp-family-side-group');
    const engagementCountWrap = document.getElementById('rsvp-engagement-count-wrap');
    const engagementCountInput = document.getElementById('rsvp-engagement-count');
    const weddingCountWrap = document.getElementById('rsvp-wedding-count-wrap');
    const weddingCountInput = document.getElementById('rsvp-wedding-count');
    const feedbackBox = document.getElementById('rsvp-feedback');
    const submitBtn = document.getElementById('rsvp-submit-btn');

    // Inline field error utilities
    function clearFieldError(errorId, element) {
      const errEl = document.getElementById(errorId);
      if (errEl) {
        errEl.textContent = '';
        errEl.classList.remove('is-visible');
      }
      if (element) {
        element.classList.remove('has-error');
      }
    }

    function setFieldError(errorId, element, message) {
      const errEl = document.getElementById(errorId);
      if (errEl) {
        errEl.textContent = message;
        errEl.classList.add('is-visible');
      }
      if (element) {
        element.classList.add('has-error');
      }
    }

    function clearAllErrors() {
      rsvpForm.querySelectorAll('.rsvp-field-error').forEach(el => {
        el.textContent = '';
        el.classList.remove('is-visible');
      });
      rsvpForm.querySelectorAll('.has-error').forEach(el => {
        el.classList.remove('has-error');
      });
      if (feedbackBox && !feedbackBox.classList.contains('is-success')) {
        feedbackBox.className = 'rsvp-feedback-box';
        feedbackBox.innerHTML = '';
      }
    }

    // Live validation error clearing on user input
    nameInput?.addEventListener('input', () => clearFieldError('error-name', nameInput));
    houseNameInput?.addEventListener('input', () => clearFieldError('error-housename', houseNameInput));

    emailInput?.addEventListener('input', () => {
      clearFieldError('error-email', emailInput);
      clearFieldError('error-contact', null);
    });

    mobileInput?.addEventListener('input', () => {
      clearFieldError('error-mobile', mobileInput);
      clearFieldError('error-contact', null);
    });

    engagementCountInput?.addEventListener('input', () => {
      clearFieldError('error-engagement-count', engagementCountInput);
    });

    weddingCountInput?.addEventListener('input', () => {
      clearFieldError('error-wedding-count', weddingCountInput);
    });

    // Family side radio toggle styling & live error clear
    const familySideRadios = rsvpForm.querySelectorAll('input[name="familySide"]');
    familySideRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        familySideRadios.forEach(r => {
          const pill = r.closest('.rsvp-radio-pill');
          if (pill) pill.classList.toggle('is-selected', r.checked);
        });
        clearFieldError('error-familyside', familySideGroup);
      });
    });

    // Engagement radio toggle
    const engagementRadios = rsvpForm.querySelectorAll('input[name="engagementAttending"]');
    engagementRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        engagementRadios.forEach(r => {
          const pill = r.closest('.rsvp-radio-pill');
          if (pill) pill.classList.toggle('is-selected', r.checked);
        });
        const isAttending = radio.value === 'Yes';
        if (engagementCountWrap) {
          if (isAttending) {
            engagementCountWrap.classList.remove('is-hidden');
            if (engagementCountInput) {
              engagementCountInput.disabled = false;
              engagementCountInput.setAttribute('required', 'required');
              if (!engagementCountInput.value || parseInt(engagementCountInput.value, 10) < 1) {
                engagementCountInput.value = '1';
              }
            }
          } else {
            engagementCountWrap.classList.add('is-hidden');
            if (engagementCountInput) {
              engagementCountInput.disabled = true;
              engagementCountInput.removeAttribute('required');
              engagementCountInput.value = '0';
              clearFieldError('error-engagement-count', engagementCountInput);
            }
          }
        }
      });
    });

    // Wedding radio toggle
    const weddingRadios = rsvpForm.querySelectorAll('input[name="weddingAttending"]');
    weddingRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        weddingRadios.forEach(r => {
          const pill = r.closest('.rsvp-radio-pill');
          if (pill) pill.classList.toggle('is-selected', r.checked);
        });
        const isAttending = radio.value === 'Yes';
        if (weddingCountWrap) {
          if (isAttending) {
            weddingCountWrap.classList.remove('is-hidden');
            if (weddingCountInput) {
              weddingCountInput.disabled = false;
              weddingCountInput.setAttribute('required', 'required');
              if (!weddingCountInput.value || parseInt(weddingCountInput.value, 10) < 1) {
                weddingCountInput.value = '1';
              }
            }
          } else {
            weddingCountWrap.classList.add('is-hidden');
            if (weddingCountInput) {
              weddingCountInput.disabled = true;
              weddingCountInput.removeAttribute('required');
              weddingCountInput.value = '0';
              clearFieldError('error-wedding-count', weddingCountInput);
            }
          }
        }
      });
    });

    // Handle Form Submit
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      clearAllErrors();

      const nameVal = (nameInput ? nameInput.value : '').trim();
      const houseNameVal = (houseNameInput ? houseNameInput.value : '').trim();
      const emailRaw = (emailInput ? emailInput.value : '').trim();
      const mobileRaw = (mobileInput ? mobileInput.value : '').trim();
      const messageVal = (messageInput ? messageInput.value : '').trim();

      const invalidFields = [];

      // 1. Full name validation (Mandatory)
      if (!nameVal) {
        setFieldError('error-name', nameInput, t('validName') || 'Please provide your full name.');
        invalidFields.push(nameInput);
      }

      // 2. House name / address validation (Mandatory)
      if (!houseNameVal) {
        setFieldError('error-housename', houseNameInput, t('validHouseName') || 'Please provide your house name or address.');
        invalidFields.push(houseNameInput);
      }

      // 3. Family side validation (Mandatory)
      const selectedFamilySide = rsvpForm.querySelector('input[name="familySide"]:checked');
      const familySideVal = selectedFamilySide ? selectedFamilySide.value : '';
      if (!familySideVal) {
        setFieldError('error-familyside', familySideGroup, t('validFamilySide') || 'Please select which family side you are from.');
        invalidFields.push(familySideGroup);
      }

      // 4. Contact field validation (At least one required; optional individually)
      const hasEmail = emailRaw.length > 0;
      const hasMobile = mobileRaw.length > 0;

      if (!hasEmail && !hasMobile) {
        setFieldError('error-contact', null, t('validContact') || 'Please provide either a mobile number or an email address so we can contact you.');
        invalidFields.push(mobileInput || emailInput);
      }

      let normalizedEmail = '';
      if (hasEmail) {
        if (!isValidEmail(emailRaw)) {
          setFieldError('error-email', emailInput, t('validEmail') || 'Please provide a valid email address.');
          invalidFields.push(emailInput);
        } else {
          normalizedEmail = emailRaw.toLowerCase();
        }
      }

      let normalizedMobile = '';
      let raw10Digits = '';
      if (hasMobile) {
        const mobileResult = normalizeIndianMobile(mobileRaw);
        if (!mobileResult.valid) {
          setFieldError('error-mobile', mobileInput, t('validMobile') || 'Please provide a valid 10-digit mobile number.');
          invalidFields.push(mobileInput);
        } else {
          normalizedMobile = mobileResult.normalized;
          raw10Digits = mobileResult.raw10;
        }
      }

      // 5. Event attendance & attendee count validation
      const selectedEngRadio = rsvpForm.querySelector('input[name="engagementAttending"]:checked');
      const engagementAttending = selectedEngRadio ? selectedEngRadio.value : 'No';
      let engagementCount = 0;
      if (engagementAttending === 'Yes') {
        const parsedEng = parseInt(engagementCountInput ? engagementCountInput.value : '1', 10);
        if (isNaN(parsedEng) || parsedEng < 1 || parsedEng > 100) {
          setFieldError('error-engagement-count', engagementCountInput, t('validCountEng') || 'Enter a whole-number attendee count from 1 to 100 for engagement.');
          invalidFields.push(engagementCountInput);
        } else {
          engagementCount = parsedEng;
        }
      }

      const selectedWedRadio = rsvpForm.querySelector('input[name="weddingAttending"]:checked');
      const weddingAttending = selectedWedRadio ? selectedWedRadio.value : 'No';
      let weddingCount = 0;
      if (weddingAttending === 'Yes') {
        const parsedWed = parseInt(weddingCountInput ? weddingCountInput.value : '1', 10);
        if (isNaN(parsedWed) || parsedWed < 1 || parsedWed > 100) {
          setFieldError('error-wedding-count', weddingCountInput, t('validCountWed') || 'Enter a whole-number attendee count from 1 to 100 for wedding.');
          invalidFields.push(weddingCountInput);
        } else {
          weddingCount = parsedWed;
        }
      }

      // If validation fails, DO NOT clear user-entered inputs; highlight errors and scroll to first invalid field
      if (invalidFields.length > 0) {
        const firstInvalid = invalidFields[0];
        if (firstInvalid) {
          if (typeof firstInvalid.focus === 'function') {
            firstInvalid.focus({ preventScroll: true });
          }
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        showFeedback(t('validCheckFields') || 'Please review and complete the highlighted fields above.', 'error');
        return;
      }

      // Build payload matching exact backend parameters
      const payload = {
        name: nameVal,
        houseName: houseNameVal,
        familySide: familySideVal,
        email: normalizedEmail,
        mobile: raw10Digits || normalizedMobile,
        engagementAttending: engagementAttending,
        engagementCount: String(engagementCount),
        weddingAttending: weddingAttending,
        weddingCount: String(weddingCount),
        message: messageVal
      };

      const endpoint = config.rsvp.googleAppsScriptUrl;

      // In-flight state: disable button to prevent double-submissions
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
      }
      showFeedback(`
        <span class="rsvp-loading-spinner" aria-hidden="true"></span>
        <span>${t('formSubmitting') || 'Connecting to wedding registry...'}</span>
      `, 'loading');

      try {
        if (endpoint && endpoint.startsWith('http')) {
          const searchParams = new URLSearchParams(payload);
          const response = await fetch(endpoint, {
            method: 'POST',
            body: searchParams
          });

          const result = await response.json();

          if (result && result.success) {
            let eventsSummary = [];
            const attendeeSingular = t('summaryAttendee') || 'attendee';
            const attendeePlural = t('summaryAttendees') || 'attendees';

            if (engagementAttending === 'Yes') {
              const engWord = t('summaryEngagement') || 'Engagement';
              eventsSummary.push(`${engWord} (${engagementCount} ${engagementCount > 1 ? attendeePlural : attendeeSingular})`);
            }
            if (weddingAttending === 'Yes') {
              const wedWord = t('summaryWedding') || 'Wedding Ceremony & Reception';
              eventsSummary.push(`${wedWord} (${weddingCount} ${weddingCount > 1 ? attendeePlural : attendeeSingular})`);
            }

            const summaryText = eventsSummary.length > 0 ? eventsSummary.join(' &amp; ') : (t('summaryDeclined') || 'Both events declined');
            const prefix = t('successPrefix') || '✨ Thank you,';
            const suffix = t('successSuffix') || 'Your attendance response for';
            const savedNote = t('successSaved') || 'has been saved successfully in our wedding register.';
            const celebrationNote = eventsSummary.length > 0
              ? (t('successCelebrate') || 'We look forward to celebrating with you!')
              : (t('successDeclined') || 'We received your note with gratitude. Your prayers and blessings are warmly appreciated.');

            showFeedback(`
              <div class="rsvp-feedback-success-inner">
                <div class="rsvp-success-icon-wrap" aria-hidden="true">
                  <svg class="rsvp-success-check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 class="rsvp-success-title">${prefix} ${escapeHtml(nameVal)}!</h3>
                <div class="rsvp-success-summary-box">
                  <div class="rsvp-summary-line"><span class="rsvp-summary-label">${suffix}</span> <span class="rsvp-summary-events">${summaryText}</span></div>
                  <div class="rsvp-summary-note">${savedNote}</div>
                </div>
                <p class="rsvp-success-note">${celebrationNote}</p>
              </div>
            `, 'success');

            // Celebratory confetti burst
            const submitRect = submitBtn ? submitBtn.getBoundingClientRect() : null;
            launchGoldenConfetti(
              submitRect ? submitRect.left + submitRect.width / 2 : window.innerWidth / 2,
              submitRect ? submitRect.top + submitRect.height / 2 : window.innerHeight / 2
            );

            // Mark session
            try {
              sessionStorage.setItem('wedding_rsvp_submitted', JSON.stringify({ name: nameVal, timestamp: new Date().toISOString() }));
            } catch (e) {}

            if (submitBtn) {
              submitBtn.textContent = 'RSVP Confirmed ✓';
              submitBtn.classList.add('is-confirmed');
            }

          } else {
            const serverMsg = result && result.message ? result.message : (t('errorServer') || 'Unable to save attendance details.');
            showFeedback(`
              <div class="rsvp-feedback-error-inner">
                <div class="rsvp-error-icon-wrap" aria-hidden="true">⚠️</div>
                <h3 class="rsvp-error-title">${escapeHtml(serverMsg)}</h3>
              </div>
            `, 'error');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.removeAttribute('aria-busy');
            }
          }

        } else {
          showFeedback(`
            <div class="rsvp-feedback-error-inner">
              <div class="rsvp-error-icon-wrap" aria-hidden="true">⚠️</div>
              <h3 class="rsvp-error-title">Attendance registry endpoint is not configured. Please contact our family coordinators below.</h3>
            </div>
          `, 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
          }
        }

      } catch (networkErr) {
        console.error('Attendance submission network error:', networkErr);
        
        const coordinator = (config.rsvp.contactPersons && config.rsvp.contactPersons[0]) || { name: 'Jebin James', rawPhone: '8921993702' };
        const coordPhone = coordinator.rawPhone ? coordinator.rawPhone.replace(/[^0-9]/g, '') : '918921993702';
        const waText = encodeURIComponent(`Hi ${coordinator.name},\nI tried confirming attendance on the website for *${nameVal}*:\n• House/Address: ${houseNameVal}\n• Side: ${familySideVal}\n• Mobile: ${normalizedMobile || 'N/A'}\n• Email: ${normalizedEmail || 'N/A'}\n• Engagement: ${engagementAttending} (${engagementCount} guests)\n• Wedding: ${weddingAttending} (${weddingCount} guests)\n${messageVal ? '• Note: "' + messageVal + '"\n' : ''}(Sending via WhatsApp due to connection issue)`);
        const fallbackUrl = `https://wa.me/${coordPhone}?text=${waText}`;

        showFeedback(`
          <div class="rsvp-feedback-error-inner">
            <div class="rsvp-error-icon-wrap" aria-hidden="true">⚠️</div>
            <h3 class="rsvp-error-title">${t('errorNetwork') || 'Notice: Connection Issue Encountered'}</h3>
            <p style="margin:0.25rem 0 0.5rem; color:#842029;">${t('errorNetworkDetail') || 'We could not reach the attendance registry to save your details automatically.'}</p>
            <p style="font-size:0.875rem; margin:0 0 0.75rem; color:#842029;">
              ${t('errorNetworkFallback') || 'Your response was not yet recorded in the spreadsheet. You can retry now, or send your attendance directly to our family coordinator via WhatsApp:'}
            </p>
            <a href="${fallbackUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-shine" style="padding:0.6rem 1.25rem; font-size:0.875rem; display:inline-flex; align-items:center; gap:0.5rem;">
              <span>💬</span> ${t('errorNetworkWABtn') || 'Send Details to Coordinator on WhatsApp'}
            </a>
          </div>
        `, 'error');

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
        }
      }
    });

    function showFeedback(htmlContent, type) {
      if (!feedbackBox) return;
      feedbackBox.className = `rsvp-feedback-box is-${type}`;
      feedbackBox.innerHTML = htmlContent;
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /**
   * WhatsApp Sharing Setup
   */
  function setupWhatsAppShare() {
    const shareBtns = document.querySelectorAll('.js-share-whatsapp-btn');
    if (!shareBtns.length) return;

    const isHosted = window.location.protocol.startsWith('http');
    const publishedUrl = isHosted ? window.location.href : (config.sharing.siteUrl || '');

    const urlSuffix = publishedUrl ? `\n🔗 ${publishedUrl}` : '';
    const fullMessage = `${config.sharing.whatsappMessage}${urlSuffix}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;

    shareBtns.forEach(btn => {
      btn.href = whatsappUrl;
    });
  }

  /**
   * Native Dialog & QR Code Modal setup
   */
  function setupQRCodeModal() {
    const qrDialog = document.getElementById('qr-modal');
    const openBtn = document.querySelector('.js-open-qr-btn');
    const closeBtn = document.querySelector('.js-close-qr-btn');
    const qrContainer = document.getElementById('qr-code-image');
    const qrNote = document.getElementById('qr-modal-note');

    if (!qrDialog || !openBtn) return;

    const isHosted = window.location.protocol.startsWith('http');
    const targetUrl = isHosted ? window.location.href : (config.qrCode.targetUrl || '');

    if (qrContainer) {
      if (targetUrl) {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(targetUrl)}&margin=10&color=0F2318`;
        qrContainer.src = qrApiUrl;
        qrContainer.alt = `QR Code linking to wedding invitation for ${config.couple.groom} & ${config.couple.bride}`;
        if (qrNote) {
          qrNote.textContent = t('qrModalNote') || 'Point your smartphone camera at this QR code to open the invitation on mobile.';
        }
      } else {
        qrContainer.style.display = 'none';
        if (qrNote) {
          qrNote.innerHTML = `
            <div class="qr-fallback-note">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 0.5rem; color: var(--color-gold-primary);">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <p><strong>Published QR Code</strong></p>
              <p style="margin-top: 0.35rem;">When deployed to your live website, this QR code will automatically generate using the published web address.</p>
            </div>
          `;
        }
      }
    }

    openBtn.addEventListener('click', (e) => {
      launchGoldenConfetti(e.clientX, e.clientY);
      if (typeof qrDialog.showModal === 'function') {
        qrDialog.showModal();
      } else {
        alert(`Wedding Invitation:\nDr. Jerin James & Merin M. Joy\n1 February 2027`);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        qrDialog.close();
      });
    }

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      qrDialog.addEventListener('click', (event) => {
        if (event.target !== qrDialog) return;
        const rect = qrDialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isDialogContent) {
          qrDialog.close();
        }
      });
    }
  }

  /**
   * 4. Footer Language Reselection Action
   */
  function setupReplayLanguageButton() {
    const replayBtn = document.getElementById('replay-envelope-btn');
    if (!replayBtn) return;

    replayBtn.addEventListener('click', () => {
      const langSelector = document.getElementById('language-selector');
      if (langSelector) {
        langSelector.style.display = 'flex';
        langSelector.classList.remove('is-dismissed');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setupLangParticlesCanvas();
      }
    });
  }

  /**
   * 5. Smooth Scroll Reveal Engine (Native IntersectionObserver)
   */
  function setupScrollReveals() {
    if (isReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
      });

      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('is-revealed');
      });
    }
  }

  function checkScrollReveals() {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.9) {
        el.classList.add('is-revealed');
      }
    });
  }

  /**
   * 6. Floating Golden Stardust Canvas Engine
   */
  function setupParticleCanvas() {
    if (isReducedMotion) return;

    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 8 : 16;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.6,
      speedY: Math.random() * 0.25 + 0.08,
      speedX: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.45 + 0.15,
      alphaDelta: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1)
    }));

    let animId = null;
    let isVisible = !document.hidden;

    function draw() {
      if (!isVisible) {
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX;
        p.alpha += p.alphaDelta;

        if (p.alpha >= 0.55 || p.alpha <= 0.12) {
          p.alphaDelta *= -1;
        }

        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(draw);
      } else if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    });

    animId = requestAnimationFrame(draw);
  }

  /**
   * 7. Lightweight Golden Celebration Confetti Burst
   */
  function launchGoldenConfetti(originX, originY) {
    if (isReducedMotion) return;

    const count = 36;
    const colors = ['#C5A059', '#D4AF37', '#F3E5AB', '#FAF7F2', '#234733', '#FFFFFF'];
    const particles = [];

    const startX = originX || window.innerWidth / 2;
    const startY = originY || window.innerHeight / 2;

    const overlay = document.createElement('canvas');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '10006';
    overlay.width = window.innerWidth;
    overlay.height = window.innerHeight;
    document.body.appendChild(overlay);

    const ctx = overlay.getContext('2d');

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        alpha: 1,
        life: 0
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, overlay.width, overlay.height);
      frame++;

      let active = false;
      particles.forEach(p => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.alpha = Math.max(0, 1 - p.life / 65);

        if (p.alpha > 0) {
          active = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3);
          ctx.restore();
        }
      });

      if (active && frame < 75) {
        requestAnimationFrame(animate);
      } else {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }
    }

    requestAnimationFrame(animate);
  }

  let confettiDelegated = false;
  function setupConfettiButtons() {
    if (confettiDelegated) return;
    confettiDelegated = true;
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-btn-celebrate');
      if (btn) {
        launchGoldenConfetti(e.clientX, e.clientY);
      }
    }, { passive: true });
  }

  /**
   * 8. Background Wedding Music Controller
   */
  let isPlayingAudio = false;
  let weddingAudio = null;

  function initAudioElement() {
    if (!weddingAudio) {
      weddingAudio = document.getElementById('wedding-audio');
      const audioSourcePath = (config.music && config.music.audioFile) ? config.music.audioFile : 'assets/weddingmusic.mp3';

      if (weddingAudio) {
        const sourceEl = weddingAudio.querySelector('source');
        if (sourceEl && sourceEl.getAttribute('src') !== audioSourcePath) {
          sourceEl.setAttribute('src', audioSourcePath);
          weddingAudio.load();
        }
      } else {
        weddingAudio = new Audio(audioSourcePath);
        weddingAudio.loop = true;
      }
      weddingAudio.volume = (config.music && typeof config.music.volume === 'number') ? config.music.volume : 0.7;

      weddingAudio.addEventListener('play', () => {
        isPlayingAudio = true;
        const musicBtn = document.getElementById('music-toggle-btn');
        if (musicBtn) {
          musicBtn.classList.add('is-playing');
          musicBtn.setAttribute('aria-label', t('musicPause') || 'Pause background wedding music');
        }
      });

      weddingAudio.addEventListener('pause', () => {
        isPlayingAudio = false;
        const musicBtn = document.getElementById('music-toggle-btn');
        if (musicBtn) {
          musicBtn.classList.remove('is-playing');
          musicBtn.setAttribute('aria-label', t('musicPlay') || 'Play background wedding music');
        }
      });

      weddingAudio.addEventListener('ended', () => {
        weddingAudio.currentTime = 0;
        weddingAudio.play().catch(() => {});
      });
    }
  }

  function startAmbientAudio() {
    initAudioElement();
    if (!weddingAudio) return;

    const playPromise = weddingAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlayingAudio = true;
        const musicBtn = document.getElementById('music-toggle-btn');
        if (musicBtn) musicBtn.classList.add('is-playing');
      }).catch(err => {
        console.log('Audio playback waiting for user gesture:', err.message);
      });
    }
  }

  function stopAmbientAudio() {
    if (weddingAudio && !weddingAudio.paused) {
      weddingAudio.pause();
    }
    isPlayingAudio = false;
    const musicBtn = document.getElementById('music-toggle-btn');
    if (musicBtn) {
      musicBtn.classList.remove('is-playing');
    }
  }

  function setupAudioToggle() {
    const musicBtn = document.getElementById('music-toggle-btn');
    if (!musicBtn) return;

    musicBtn.addEventListener('click', () => {
      initAudioElement();
      if (weddingAudio && !weddingAudio.paused) {
        stopAmbientAudio();
      } else {
        startAmbientAudio();
      }
    });
  }

  /**
   * Main App Initialization Flow
   */
  function startApplication() {
    // 1. Initialize content from config
    initDynamicContent();

    // 2. Setup dynamic sections (compliments, RSVP form & coordinators, WhatsApp share, QR code)
    setupOtherSections();

    // 3. Setup persistent language switcher
    setupLanguageSwitcher();

    // 3. Setup countdown
    initCountdown();

    // 4. Setup scroll reveals and optimized particles
    setupScrollReveals();
    setupParticleCanvas();

    // 5. Setup audio toggle
    setupAudioToggle();

    // 6. Setup celebrate button delegation
    setupConfettiButtons();

    // 7. Setup footer language reselection button
    setupReplayLanguageButton();

    // 8. Handle language selection screen: once selected, invitation opens DIRECTLY
    setupLanguageSelector((chosenLang, wasInteractive) => {
      checkScrollReveals();
      if (wasInteractive) {
        startAmbientAudio();
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApplication);
  } else {
    startApplication();
  }

})();
