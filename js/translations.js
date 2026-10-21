/**
 * Jerin Marriage — Multilingual Translation Dictionary
 * Supports: English (en), Malayalam (ml), Tamil (ta), Hindi (hi)
 *
 * Couple names (Dr. Jerin James, Merin M. Joy) and parent names remain
 * in English/Latin script across ALL languages per design requirement.
 */

const TRANSLATIONS = {

  /* ── English ─────────────────────────────────────────────── */
  en: {
    /* Language Selector */
    chooseLang: 'Choose Your Language',
    langEn: 'English',
    langMl: 'Malayalam',
    langTa: 'Tamil',
    langHi: 'Hindi',

    /* Opening Curtain / Cover */
    holyMatrimonyOf: 'Holy Matrimony of',
    coupleNames: 'Dr. Jerin James & Merin M. Joy',
    weddingDate: 'Monday, 1st February 2027',
    weddingTime: '10:30 a.m.',
    tapSealHint: 'Tap wax seal to open invitation • Or click here',
    coupleConnector: '&',

    /* Scripture */
    scriptureVerse: '\u201cThe Lord has done great things for us,\nand we are filled with joy.\u201d',
    scriptureRef: '— Psalms 126:3',

    /* Announcement Bar */
    announcementLabel: '💍 HOLY MATRIMONY',

    /* Hero Section */
    gratitudeText: 'With hearts filled with gratitude to God and joy in our hearts,',
    sectionTagPresence: 'Cordially Request Your Presence & Blessings',
    heroBtnVenues: 'Venues & Directions',
    heroBtnRsvp: 'RSVP & Contacts',

    /* Countdown Section */
    anticipatingTag: 'Anticipating The Holy Matrimony',
    countdownTitle: 'Counting Down To Our Sacred Vows',
    countdownNote: 'Until Monday, 1st February 2027 at 10:30 a.m. IST',
    countdownDone: 'The Wedding Day is Here! Blessed Holy Matrimony celebrations have begun.',
    labelDays: 'Days',
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds',

    /* Family Section */
    familyTag: 'Together With Their Families',
    familyTitle: 'Cordially Invited',
    groomsParents: "Groom's Parents",
    bridesParents: "Bride's Parents",
    invitationLead: 'cordially invite you and your family to bless the Holy Matrimony of their beloved children',
    groomSuffix: '',
    proseConnector: ' with ',
    brideSuffix: '',
    unionDesc: 'as they unite in marriage and begin a new chapter of their lives together, founded on love, faith and togetherness.',
    blessingClosing: 'Your gracious presence, prayers and blessings will make this joyous occasion even more memorable.',

    /* Portrait Section */
    portraitTag: 'Our Journey',
    portraitTitle: 'Always Us',
    portraitSubtitle: 'A little glimpse of our journey together.',

    /* Events Section */
    eventsTag: 'Order Of The Celebrations',
    eventsTitle: 'Ceremony & Reception Venues',
    labelDate: 'Date:',
    labelTime: 'Time:',
    labelVenue: 'Venue:',
    getDirections: 'Get Directions',
    getDirectionsChurch: 'Get Directions to Church',
    getDirectionsReception: 'Get Directions to Reception',
    getDirectionsEngagementChurch: 'Get Directions to Church',
    getDirectionsEngagementReception: 'Get Directions to Reception',

    /* Event Groups & Cards */
    engagementGroupTag: '💍 PRE-WEDDING CELEBRATION',
    engagementGroupTitle: 'Engagement Ceremony & Reception',
    weddingGroupTag: '⛪ SACRED MATRIMONY & FEAST',
    weddingGroupTitle: 'Wedding Ceremony & Reception',

    eventEngagementCeremonyBadge: 'Engagement Ceremony',
    eventEngagementCeremonyTitle: 'Engagement Ceremony',
    eventEngagementCeremonySubtitle: 'Solemn Betrothal & Blessing',
    eventEngagementReceptionBadge: 'Engagement Reception',
    eventEngagementReceptionTitle: 'Engagement Reception',
    eventEngagementReceptionSubtitle: 'Celebration & Fellowship',

    eventWeddingCeremonyBadge: 'Holy Matrimony',
    eventWeddingCeremonyTitle: 'Wedding Ceremony',
    eventWeddingCeremonySubtitle: 'Holy Matrimony & Nuptial Blessing',
    eventWeddingReceptionBadge: 'Wedding Reception',
    eventWeddingReceptionTitle: 'Wedding Reception',
    eventWeddingReceptionSubtitle: 'Celebration & Feast to follow the ceremony',

    /* Event Dates & Times */
    eventEngagementCeremonyDate: 'Thursday, 21 January 2027',
    eventEngagementCeremonyTime: '11:00 a.m.',
    eventEngagementReceptionDate: 'Thursday, 21 January 2027',
    eventEngagementReceptionTime: 'Following the Engagement Ceremony',
    eventWeddingCeremonyDate: 'Monday, 1st February 2027',
    eventWeddingCeremonyTime: '10:30 a.m.',
    eventWeddingReceptionDate: 'Monday, 1st February 2027',
    eventWeddingReceptionTime: 'Following the ceremony',

    /* Stay Connected Section */
    connectTag: 'COMMUNITY & UPDATES',
    connectTitle: 'Stay Connected',
    connectSubtitle: 'Stay updated with the latest wedding announcements and details.',
    connectCardTitle: 'Official Wedding Updates Group',
    connectCardDesc: 'Join our official WhatsApp group for wedding announcements, event updates, schedules, and venue directions.',
    connectBtn: 'Join WhatsApp Updates Group',

    /* WhatsApp Community / Updates */
    shareGroupTitle: 'Official WhatsApp Group',
    shareGroupDesc: 'Join the wedding community group for instant event announcements, schedules, and live directions.',
    shareBtnGroup: 'Join WhatsApp Updates Group',
    whatsAppGroupBtn: 'Join WhatsApp Updates Group',
    whatsAppGroupDesc: 'Stay updated with celebration announcements, directions, and schedule:',


    /* Compliments Section */
    complimentsFrom: 'With Best Compliments from',
    complimentsGroup: 'Family & Friends',

    /* RSVP Section */
    rsvpTag: 'Your Presence Is A Blessing',
    rsvpTitle: 'Will You Join Us?',
    rsvpBlessing: 'Your gracious presence, prayers and blessings will make this joyous occasion even more memorable.',
    formLabelName: 'Full Name',
    formRequired: '*',
    formLabelEmail: 'Email Address',
    formOptional: '(Optional)',
    formLabelMobile: 'Mobile Number',
    formContactHint: 'Contact Information: Please provide either your mobile number or email address (or both) so we can confirm your attendance.',
    formLabelHouseName: 'House Name / Address',
    formLabelFamilySide: 'Which side are you from?',
    formBridesSide: "Bride's Side",
    formGroomsSide: "Groom's Side",
    formLabelEngagement: '💍 Engagement Ceremony',
    formEngagementBadge: 'Pre-Wedding Function',
    formEngagementDate: 'Thursday, 21 January 2027',
    formLabelWedding: '⛪ Wedding Ceremony & Reception',
    formWeddingBadge: 'Holy Matrimony & Feast',
    formWeddingDate: 'Monday, 1 February 2027 • 10:30 a.m.',
    formWillAttend: 'Will you attend?',
    formAccept: 'Joyfully Accept',
    formDecline: 'Regretfully Decline',
    formLabelAttendeesEng: 'Attendees for Engagement',
    formLabelAttendeesWed: 'Attendees for Wedding',
    formCountHint: '(Whole number 1–100)',
    formLabelMessage: 'Warm Wishes or Message for Couple',
    formSubmit: 'Confirm Attendance',
    formSubmitting: 'Connecting to wedding registry...',
    formContactsTitle: 'Questions or Early Confirmations',
    formContactsSubtitle: 'Feel free to reach out directly to our family coordinators:',
    formBtnCall: 'Call',
    formBtnWhatsApp: 'WhatsApp',
    formMsgPlaceholder: 'Share a blessing, prayer, or personal note for Dr. Jerin & Merin...',

    /* Validation Messages */
    validName: 'Please provide your full name.',
    validContact: 'Please provide either a mobile number or an email address so we can contact you.',
    validEmail: 'Please provide a valid email address.',
    validMobile: 'Please provide a valid 10-digit mobile number.',
    validHouseName: 'Please provide your house name or address.',
    validFamilySide: 'Please select which family side you are from.',
    validCount: 'Enter a whole-number attendee count from 1 to 100.',
    validCountEng: 'Enter a whole-number attendee count from 1 to 100 for engagement.',
    validCountWed: 'Enter a whole-number attendee count from 1 to 100 for wedding.',
    validCheckFields: 'Please review and complete the highlighted fields above.',

    /* Success / Error */
    successPrefix: '✨ Thank you,',
    successSuffix: 'Your attendance response for',
    successSaved: 'has been saved successfully in our wedding register.',
    successCelebrate: 'We look forward to celebrating with you!',
    successDeclined: 'We received your note with gratitude. Your prayers and blessings are warmly appreciated.',
    errorServer: 'Unable to save attendance details.',
    errorNetwork: 'Notice: Connection Issue Encountered',
    errorNetworkDetail: 'We could not reach the attendance registry to save your details automatically.',
    errorNetworkFallback: 'Your response was not yet recorded in the spreadsheet. You can retry now, or send your attendance directly to our family coordinator via WhatsApp:',
    errorNetworkWABtn: 'Send Details to Coordinator on WhatsApp',

    /* Share Section */
    shareTag: 'Share With Loved Ones',
    shareTitle: 'Share The Invitation',
    shareWATitle: 'Forward on WhatsApp',
    shareWADesc: 'Send the wedding invitation directly to family and friends with pre-composed wedding details and directions.',
    shareBtnWhatsApp: 'Share via WhatsApp',
    shareQRTitle: 'Scan QR Code',
    shareQRDesc: 'Display or print the QR code for instant smartphone access to the ceremony and venue details.',
    shareBtnQR: 'View & Scan QR Code',

    /* QR Modal */
    qrModalTitle: 'Wedding QR Code',
    qrModalNote: 'Point your smartphone camera at this QR code to open the invitation on your phone.',
    qrClose: 'Close',

    /* Footer */
    footerSub: 'Monday, 1st February 2027',
    footerReplay: '✉️ Replay Opening Experience',

    /* Floating Quick Bar */
    quickVenues: 'Venues',
    quickRsvp: 'RSVP',
    quickShare: 'Share',

    /* Music Toggle */
    musicPlay: 'Play background wedding music',
    musicPause: 'Pause background wedding music',
    musicToggle: 'Toggle background wedding chimes music',

    /* Summary strings for RSVP success */
    summaryEngagement: 'Engagement',
    summaryWedding: 'Wedding Ceremony & Reception',
    summaryAttendee: 'attendee',
    summaryAttendees: 'attendees',
    summaryDeclined: 'Both events declined',

    /* Engagement / Wedding count wrap labels */
    engagementCountLabel: 'Attendees for Engagement',
    weddingCountLabel: 'Attendees for Wedding',
  },

  /* ── Malayalam ───────────────────────────────────────────── */
  ml: {
    /* Language Selector */
    chooseLang: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    langEn: 'English',
    langMl: 'മലയാളം',
    langTa: 'தமிழ்',
    langHi: 'हिन्दी',

    /* Opening Curtain / Cover */
    holyMatrimonyOf: 'പരിശുദ്ധ വിവാഹം',
    coupleNames: 'Dr. Jerin James & Merin M. Joy',
    weddingDate: 'തിങ്കൾ, 2027 ഫെബ്രുവരി 1',
    weddingTime: 'രാവിലെ 10:30',
    tapSealHint: 'ക്ഷണക്കത്ത് തുറക്കാൻ സീൽ ടാപ്പ് ചെയ്യൂ',
    coupleConnector: '&',

    /* Scripture */
    scriptureVerse: 'കര്‍ത്താവു ഞങ്ങള്‍ക്കുവേണ്ടി വന്‍കാര്യങ്ങള്‍ ചെയ്തിരിക്കുന്നു; ഞങ്ങള്‍ സന്തോഷിക്കുന്നു.',
    scriptureRef: '— സങ്കീര്‍ത്തനങ്ങള്‍ 126:3',

    /* Announcement Bar */
    announcementLabel: '💍 പരിശുദ്ധ വിവാഹം',

    /* Hero Section */
    gratitudeText: 'ദൈവത്തോടുള്ള കൃതജ്ഞതയോടും ഹൃദ്യമായ ആനന്ദത്തോടും കൂടി,',
    sectionTagPresence: 'സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു',
    heroBtnVenues: 'വേദികൾ & ദിശകൾ',
    heroBtnRsvp: 'RSVP & ബന്ധപ്പെടൽ',

    /* Countdown Section */
    anticipatingTag: 'പരിശുദ്ധ വിവാഹ ദിനം ആഗതമാകുന്നു',
    countdownTitle: 'ഞങ്ങളുടെ പരിശുദ്ധ ഉടമ്പടിയിലേക്ക്',
    countdownNote: 'തിങ്കൾ, 2027 ഫെബ്രുവരി 1, രാവിലെ 10:30 IST വരെ',
    countdownDone: 'വിവാഹ ദിനം ആഗതമായി! അനുഗ്രഹം നിറഞ്ഞ ആഘോഷങ്ങൾ ആരംഭിച്ചു.',
    labelDays: 'ദിവസം',
    labelHours: 'മണിക്കൂർ',
    labelMinutes: 'മിനിട്ട്',
    labelSeconds: 'സെക്കൻഡ്',

    /* Family Section */
    familyTag: 'ഇരു കുടുംബങ്ങളും ഒരുമിച്ച്',
    familyTitle: 'ആദരപൂർവ്വം ക്ഷണിക്കുന്നു',
    groomsParents: 'വരന്റെ മാതാപിതാക്കൾ',
    bridesParents: 'വധുവിന്റെ മാതാപിതാക്കൾ',
    invitationLead: 'തങ്ങളുടെ പ്രിയ മക്കളായ',
    groomSuffix: '-നെയും',
    proseConnector: ' ',
    brideSuffix: '-യെയും',
    unionDesc: 'ദൈവസന്നിധിയിൽ വിശുദ്ധ വിവാഹ കൂദാശയിലൂടെ ഒന്നിക്കുന്ന ഈ മംഗളവേളയിൽ, തങ്ങളുടെ സാന്നിധ്യം കൊണ്ടും പ്രാർത്ഥനകൾ കൊണ്ടും അനുഗ്രഹിക്കുവാൻ സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.',
    blessingClosing: 'നിങ്ങളുടെ പ്രാർത്ഥനകളും ആശംസകളും അവരുടെ പുതുജീവിതത്തിന് ദൈവാനുഗ്രഹവും സന്തോഷവും പകരട്ടെ.',

    /* Portrait Section */
    portraitTag: 'ഞങ്ങളുടെ യാത്ര',
    portraitTitle: 'Always Us',
    portraitSubtitle: 'ഞങ്ങളുടെ സ്നേഹയാത്രയുടെ ഒരു സുന്ദര നിമിഷം.',

    /* Events Section */
    eventsTag: 'ആഘോഷങ്ങളുടെ ക്രമം',
    eventsTitle: 'വിവാഹ ചടങ്ങ് & വിരുന്ന് വേദികൾ',
    labelDate: 'തീയതി:',
    labelTime: 'സമയം:',
    labelVenue: 'സ്ഥലം:',
    getDirections: 'വഴി കണ്ടെത്തുക',
    getDirectionsChurch: 'ദേവാലയത്തിലേക്ക് വഴി',
    getDirectionsReception: 'വിരുന്ന് വേദിയിലേക്ക് വഴി',
    getDirectionsEngagementChurch: 'ദേവാലയത്തിലേക്ക് വഴി',
    getDirectionsEngagementReception: 'വിരുന്ന് വേദിയിലേക്ക് വഴി',

    /* Event Groups & Cards */
    engagementGroupTag: '💍 വിവാഹ നിശ്ചയാഘോഷം',
    engagementGroupTitle: 'വിവാഹ നിശ്ചയ ചടങ്ങും സൽക്കാരവും',
    weddingGroupTag: '⛪ പരിശുദ്ധ വിവാഹവും വിരുന്നും',
    weddingGroupTitle: 'വിവാഹ ചടങ്ങും വിരുന്നും',

    eventEngagementCeremonyBadge: 'വിവാഹ നിശ്ചയം',
    eventEngagementCeremonyTitle: 'വിവാഹ നിശ്ചയ ചടങ്ങ്',
    eventEngagementCeremonySubtitle: 'പ്രാർത്ഥനയും ആശീർവാദവും',
    eventEngagementReceptionBadge: 'നിശ്ചയ സൽക്കാരം',
    eventEngagementReceptionTitle: 'നിശ്ചയ സൽക്കാരം',
    eventEngagementReceptionSubtitle: 'സ്നേഹവിരുന്നും ആദരവും',

    eventWeddingCeremonyBadge: 'പരിശുദ്ധ വിവാഹം',
    eventWeddingCeremonyTitle: 'വിവാഹ ചടങ്ങ്',
    eventWeddingCeremonySubtitle: 'വിശുദ്ധ വിവാഹ കൂദാശയും ആശീർവാദവും',
    eventWeddingReceptionBadge: 'വിവാഹ വിരുന്ന്',
    eventWeddingReceptionTitle: 'വിവാഹ വിരുന്ന്',
    eventWeddingReceptionSubtitle: 'വിവാഹ ചടങ്ങിന് ശേഷം സ്നേഹപൂർവ്വം ഒരുക്കുന്ന വിരുന്ന്',

    /* Event Dates & Times */
    eventEngagementCeremonyDate: 'വ്യാഴം, 21 ജനുവരി 2027',
    eventEngagementCeremonyTime: 'രാവിലെ 11:00',
    eventEngagementReceptionDate: 'വ്യാഴം, 21 ജനുവരി 2027',
    eventEngagementReceptionTime: 'നിശ്ചയ ചടങ്ങിനെ തുടർന്ന്',
    eventWeddingCeremonyDate: 'തിങ്കൾ, 2027 ഫെബ്രുവരി 1',
    eventWeddingCeremonyTime: 'രാവിലെ 10:30',
    eventWeddingReceptionDate: 'തിങ്കൾ, 2027 ഫെബ്രുവരി 1',
    eventWeddingReceptionTime: 'വിവാഹ ചടങ്ങിനെ തുടർന്ന്',

    /* Stay Connected Section */
    connectTag: 'വിശേഷങ്ങളും അറിയിപ്പുകളും',
    connectTitle: 'വിശേഷങ്ങൾ അറിയാൻ ഒപ്പം ചേരൂ',
    connectSubtitle: 'വിവാഹത്തിന്റെ ഏറ്റവും പുതിയ അറിയിപ്പുകളും വിവരങ്ങളും തത്സമയം അറിയാം.',
    connectCardTitle: 'ഔദ്യോഗിക WhatsApp കൂട്ടായ്മ',
    connectCardDesc: 'വിവാഹ അറിയിപ്പുകൾ, ചടങ്ങുകളുടെ സമയക്രമം, യാത്രാ നിർദേശങ്ങൾ എന്നിവക്കായി ഞങ്ങളുടെ ഔദ്യോഗിക WhatsApp ഗ്രൂപ്പിൽ ചേരൂ.',
    connectBtn: 'WhatsApp ഗ്രൂപ്പിൽ ചേരുക',

    /* WhatsApp Community / Updates */
    shareGroupTitle: 'ഔദ്യോഗിക വാട്ട്‌സ്ആപ്പ് ഗ്രൂപ്പ്',
    shareGroupDesc: 'വിവാഹ അറിയിപ്പുകളും തത്സമയ ദിശകളും സമയക്രമങ്ങളും അറിയാൻ ഔദ്യോഗിക കമ്മ്യൂണിറ്റി ഗ്രൂപ്പിൽ ചേരുക.',
    shareBtnGroup: 'വാട്ട്‌സ്ആപ്പ് ഗ്രൂപ്പിൽ ചേരുക',
    whatsAppGroupBtn: 'വാട്ട്‌സ്ആപ്പ് അപ്‌ഡേറ്റ് ഗ്രൂപ്പിൽ ചേരുക',
    whatsAppGroupDesc: 'വിവാഹ വിവരങ്ങളും അറിയിപ്പുകളും തത്സമയം അറിയാൻ:',


    /* Compliments Section */
    complimentsFrom: 'ആദരപൂർവ്വം',
    complimentsGroup: 'കുടുംബവും സ്നേഹിതരും',

    /* RSVP Section */
    rsvpTag: 'നിങ്ങളുടെ സാന്നിധ്യം ഒരു അനുഗ്രഹം',
    rsvpTitle: 'നിങ്ങൾ ഞങ്ങളോടൊപ്പം ചേരുമോ?',
    rsvpBlessing: 'നിങ്ങളുടെ പ്രാർത്ഥനകളും ആശംസകളും ഈ ദിനം ഓർമ്മീയമാക്കും.',
    formLabelName: 'മുഴുവൻ പേര്',
    formRequired: '*',
    formLabelEmail: 'ഇ-മെയിൽ വിലാസം',
    formOptional: '(ഐച്ഛിക)',
    formLabelMobile: 'മൊബൈൽ നമ്പർ',
    formContactHint: 'ബന്ധപ്പെടൽ: ഞങ്ങൾക്ക് ബന്ധപ്പെടാൻ ഒരു മൊബൈൽ നമ്പർ അല്ലെങ്കിൽ ഇ-മെയിൽ നൽകുക.',
    formLabelHouseName: 'വീടിന്റെ പേര് / വിലാസം',
    formLabelFamilySide: 'നിങ്ങൾ ഏത് ഭാഗത്ത് നിന്ന്?',
    formBridesSide: 'വധൂ ഭാഗം',
    formGroomsSide: 'വരൻ ഭാഗം',
    formLabelEngagement: '💍 നിശ്ചയ ചടങ്ങ്',
    formEngagementBadge: 'വിവാഹ പൂർവ ചടങ്ങ്',
    formEngagementDate: 'വ്യാഴം, 21 ജനുവരി 2027',
    formLabelWedding: '⛪ വിവാഹ ചടങ്ങ് & വിരുന്ന്',
    formWeddingBadge: 'പരിശുദ്ധ വിവാഹം & വിരുന്ന്',
    formWeddingDate: 'തിങ്കൾ, 2027 ഫെബ്രുവരി 1 • രാവിലെ 10:30',
    formWillAttend: 'നിങ്ങൾ പങ്കെടുക്കുമോ?',
    formAccept: 'സന്തോഷത്തോടെ സ്വീകരിക്കുന്നു',
    formDecline: 'ഖേദത്തോടെ ക്ഷമിക്കണം',
    formLabelAttendeesEng: 'നിശ്ചയ ചടങ്ങിൽ പങ്കെടുക്കുന്നവർ',
    formLabelAttendeesWed: 'വിവാഹ ചടങ്ങിൽ പങ്കെടുക്കുന്നവർ',
    formCountHint: '(1–100 ഒരു മുഴു സംഖ്യ)',
    formLabelMessage: 'ദമ്പതികൾക്ക് ആശംസകൾ',
    formSubmit: 'സ്ഥിരീകരിക്കുക',
    formSubmitting: 'വിവാഹ രജിസ്ട്രിയിലേക്ക് ബന്ധിക്കുന്നു...',
    formContactsTitle: 'ചോദ്യങ്ങൾ അല്ലെങ്കിൽ സ്ഥിരീകരണം',
    formContactsSubtitle: 'ഞങ്ങളുടെ ഏകോപകരെ നേരിട്ട് ബന്ധപ്പെടാം:',
    formBtnCall: 'വിളിക്കുക',
    formBtnWhatsApp: 'WhatsApp',
    formMsgPlaceholder: 'Dr. Jerin & Merin-നു ഒരു ആശംസ, പ്രാർത്ഥന, അല്ലെങ്കിൽ വ്യക്തിഗത കുറിപ്പ് പങ്കുവയ്ക്കൂ...',

    /* Validation Messages */
    validName: 'ദയവായി നിങ്ങളുടെ മുഴുവൻ പേര് നൽകുക.',
    validContact: 'ഞങ്ങൾക്ക് ബന്ധപ്പെടാൻ ഒരു മൊബൈൽ നമ്പർ അല്ലെങ്കിൽ ഇ-മെയിൽ നൽകുക.',
    validEmail: 'ഒരു സാധുവായ ഇ-മെയിൽ വിലാസം നൽകുക.',
    validMobile: 'ഒരു സാധുവായ 10-അക്ക മൊബൈൽ നമ്പർ നൽകുക.',
    validHouseName: 'ദയവായി നിങ്ങളുടെ വീടിന്റെ പേര് നൽകുക.',
    validFamilySide: 'ദയവായി ഒരു കുടുംബ ഭാഗം തിരഞ്ഞെടുക്കുക.',
    validCount: '1 മുതൽ 100 വരെ ഒരു സംഖ്യ നൽകുക.',
    validCountEng: 'നിശ്ചയ ചടങ്ങിൽ 1–100 ഇടയ്ക്ക് ഒരു സംഖ്യ നൽകുക.',
    validCountWed: 'വിവാഹ ചടങ്ങിൽ 1–100 ഇടയ്ക്ക് ഒരു സംഖ്യ നൽകുക.',
    validCheckFields: 'ദയവായി മുകളിൽ അടയാളപ്പെടുത്തിയ വിവരങ്ങൾ പരിശോധിക്കുക.',

    /* Success / Error */
    successPrefix: '✨ നന്ദി,',
    successSuffix: 'നിങ്ങളുടെ പ്രതികരണം',
    successSaved: 'ഞങ്ങളുടെ വിവാഹ രജിസ്ട്രിയിൽ സൂക്ഷിക്കപ്പെട്ടു.',
    successCelebrate: 'നിങ്ങളോടൊപ്പം ആഘോഷിക്കാൻ ഞങ്ങൾ കാത്തിരിക്കുന്നു!',
    successDeclined: 'നിങ്ങളുടെ കുറിപ്പ് കൃതജ്ഞതയോടെ ലഭിച്ചു. നിങ്ങളുടെ പ്രാർത്ഥനകൾ ഞങ്ങൾ വിലമതിക്കുന്നു.',
    errorServer: 'ഹാജർ വിശദാംശങ്ങൾ സൂക്ഷിക്കാൻ കഴിഞ്ഞില്ല.',
    errorNetwork: 'ശ്രദ്ധിക്കുക: കണക്ഷൻ പ്രശ്നം',
    errorNetworkDetail: 'ഹാജർ രജിസ്ട്രിയിൽ ബന്ധിക്കാൻ കഴിഞ്ഞില്ല.',
    errorNetworkFallback: 'നിങ്ങളുടെ പ്രതികരണം ഇതുവരെ രജിസ്ട്രിയിൽ ചേർക്കപ്പെട്ടിട്ടില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക, അല്ലെങ്കിൽ WhatsApp-ൽ ബന്ധപ്പെടുക:',
    errorNetworkWABtn: 'Coordinator-ന് WhatsApp-ൽ അറിയിക്കുക',

    /* Share Section */
    shareTag: 'പ്രിയപ്പെട്ടവരുമായി പങ്കുവയ്ക്കൂ',
    shareTitle: 'ക്ഷണക്കത്ത് പങ്കിടുക',
    shareWATitle: 'WhatsApp-ൽ കൈമാറൂ',
    shareWADesc: 'വിവാഹ ക്ഷണക്കത്ത് കുടുംബത്തോടും സ്നേഹിതരോടും WhatsApp-ൽ പങ്കുവയ്ക്കൂ.',
    shareBtnWhatsApp: 'WhatsApp-ൽ ഷെയർ ചെയ്യൂ',
    shareQRTitle: 'QR കോഡ് സ്കാൻ ചെയ്യൂ',
    shareQRDesc: 'QR കോഡ് പ്രദർശിപ്പിക്കുകയോ പ്രിന്റ് ചെയ്യുകയോ ചെയ്ത് ക്ഷണക്കത്ത് പ്രവേശിക്കൂ.',
    shareBtnQR: 'QR കോഡ് കാണൂ',

    /* QR Modal */
    qrModalTitle: 'വിവാഹ QR കോഡ്',
    qrModalNote: 'ഈ QR കോഡ് ഫോൺ ക്യാമറ കൊണ്ട് സ്കാൻ ചെയ്ത് ക്ഷണക്കത്ത് തുറക്കൂ.',
    qrClose: 'അടയ്ക്കുക',

    /* Footer */
    footerSub: 'തിങ്കൾ, 2027 ഫെബ്രുവരി 1',
    footerReplay: '✉️ ഓപ്പണിംഗ് ആനിമേഷൻ ആവർത്തിക്കൂ',

    /* Floating Quick Bar */
    quickVenues: 'വേദി',
    quickRsvp: 'RSVP',
    quickShare: 'ഷെയർ',

    /* Music Toggle */
    musicPlay: 'പശ്ചാത്തല സംഗീതം ഓൺ',
    musicPause: 'പശ്ചാത്തല സംഗീതം ഓഫ്',
    musicToggle: 'പശ്ചാത്തല സംഗീതം',

    /* Summary strings */
    summaryEngagement: 'നിശ്ചയ ചടങ്ങ്',
    summaryWedding: 'വിവാഹ ചടങ്ങ് & വിരുന്ന്',
    summaryAttendee: 'ആൾ',
    summaryAttendees: 'ആളുകൾ',
    summaryDeclined: 'രണ്ട് ചടങ്ങുകളും നിരസിക്കപ്പെട്ടു',
    engagementCountLabel: 'നിശ്ചയ ചടങ്ങിൽ പങ്കെടുക്കുന്നവർ',
    weddingCountLabel: 'വിവാഹ ചടങ്ങിൽ പങ്കെടുക്കുന്നവർ',
  },

  /* ── Tamil ───────────────────────────────────────────────── */
  ta: {
    /* Language Selector */
    chooseLang: 'மொழியை தேர்ந்தெடுக்கவும்',
    langEn: 'English',
    langMl: 'Malayalam',
    langTa: 'தமிழ்',
    langHi: 'हिन्दी',

    /* Opening Curtain / Cover */
    holyMatrimonyOf: 'பரிசுத்த திருமண விழா',
    coupleNames: 'Dr. Jerin James & Merin M. Joy',
    weddingDate: 'திங்கள், 1 பிப்ரவரி 2027',
    weddingTime: 'காலை 10:30',
    tapSealHint: 'அழைப்பிதழைத் திறக்க முத்திரையைத் தொடவும்',
    coupleConnector: '&',

    /* Scripture */
    scriptureVerse: 'கர்த்தர் நமக்குப் பெரிய காரியங்களைச் செய்தார்; இதினிமித்தம் நாம் மகிழ்ந்திருக்கிறோம்.',
    scriptureRef: '— சங்கீதம் 126:3',

    /* Announcement Bar */
    announcementLabel: '💍 பரிசுத்த திருமணம்',

    /* Hero Section */
    gratitudeText: 'இறைவனுக்கு நன்றி நிறைந்த இதயத்துடனும் பெருமகிழ்ச்சியுடனும்,',
    sectionTagPresence: 'தங்கள் அன்பான வருகையையும் ஆசிகளையும் வேண்டுகிறோம்',
    heroBtnVenues: 'நிகழ்விடங்கள் & வழித்தடம்',
    heroBtnRsvp: 'RSVP & தொடர்புக்கு',

    /* Countdown Section */
    anticipatingTag: 'பரிசுத்த திருமண நாளை எதிர்நோக்கி',
    countdownTitle: 'எங்கள் புனித திருமண உடன்படிக்கையை நோக்கி',
    countdownNote: 'திங்கள், 1 பிப்ரவரி 2027, காலை 10:30 IST வரை',
    countdownDone: 'திருமண திருநாள் இதோ வந்துவிட்டது! ஆசீர்வாதமான கொண்டாட்டங்கள் இனிதே தொடங்கின.',
    labelDays: 'நாட்கள்',
    labelHours: 'மணி',
    labelMinutes: 'நிமிடம்',
    labelSeconds: 'வினாடி',

    /* Family Section */
    familyTag: 'இரு குடும்பத்தினரும் இணைந்து',
    familyTitle: 'அன்புடன் அழைக்கிறோம்',
    groomsParents: 'மணமகனின் பெற்றோர்',
    bridesParents: 'மணமகளின் பெற்றோர்',
    invitationLead: 'தங்கள் அன்புச் செல்வங்களான',
    groomSuffix: '',
    proseConnector: ' மற்றும் ',
    brideSuffix: '',
    unionDesc: 'இறைவன் திருமுன்னிலையில் புனித திருமண அருட்சாதனத்தால் இணையும் இந்த மங்கல நாளில், தங்களின் வருகையினாலும் ஜெபங்களினாலும் ஆசீர்வதிக்க அன்புடன் அழைக்கிறோம்.',
    blessingClosing: 'உங்கள் மேலான வருகையும் ஆசீர்வாதங்களும் இவர்களின் புதுவாழ்விற்கு இறைவனின் மகிழ்ச்சியையும் அமைதியையும் சேர்க்கட்டும்.',

    /* Portrait Section */
    portraitTag: 'எங்கள் பயணம்',
    portraitTitle: 'Always Us',
    portraitSubtitle: 'எங்கள் வாழ்வின் அழகான பயணத்திலிருந்து ஒரு பார்வை.',

    /* Events Section */
    eventsTag: 'நிகழ்ச்சி நிரல்',
    eventsTitle: 'திருமண விழா & வரவேற்பு நிகழ்விடங்கள்',
    labelDate: 'தேதி:',
    labelTime: 'நேரம்:',
    labelVenue: 'இடம்:',
    getDirections: 'வழித்தடம் அறிய',
    getDirectionsChurch: 'தேவாலயத்திற்கான வழித்தடம்',
    getDirectionsReception: 'வரவேற்பு மண்டபத்திற்கான வழித்தடம்',
    getDirectionsEngagementChurch: 'தேவாலயத்திற்கான வழித்தடம்',
    getDirectionsEngagementReception: 'வரவேற்பு மண்டபத்திற்கான வழித்தடம்',

    /* Event Groups & Cards */
    engagementGroupTag: '💍 நிச்சயதார்த்த விழா',
    engagementGroupTitle: 'நிச்சயதார்த்த விழாவும் வரவேற்பும்',
    weddingGroupTag: '⛪ புனித திருமணமும் விருந்தும்',
    weddingGroupTitle: 'திருமண விழாவும் விருந்துபசாரமும்',

    eventEngagementCeremonyBadge: 'நிச்சயதார்த்தம்',
    eventEngagementCeremonyTitle: 'நிச்சயதார்த்த விழா',
    eventEngagementCeremonySubtitle: 'புனித வாக்குறுதியும் ஆசீர்வாதமும்',
    eventEngagementReceptionBadge: 'நிச்சயதார்த்த வரவேற்பு',
    eventEngagementReceptionTitle: 'நிச்சயதார்த்த வரவேற்பு',
    eventEngagementReceptionSubtitle: 'நிச்சயதார்த்தத்தைத் தொடர்ந்து அன்பின் விருந்து',

    eventWeddingCeremonyBadge: 'புனித திருமணம்',
    eventWeddingCeremonyTitle: 'திருமண விழா',
    eventWeddingCeremonySubtitle: 'புனித திருமண வழிபாடும் ஆசீர்வாதமும்',
    eventWeddingReceptionBadge: 'திருமண விருந்து',
    eventWeddingReceptionTitle: 'திருமண விருந்து',
    eventWeddingReceptionSubtitle: 'திருமண விழாவைத் தொடர்ந்து நடைபெறும் அன்பின் விருந்து',

    /* Event Dates & Times */
    eventEngagementCeremonyDate: 'வியாழன், 21 ஜனவரி 2027',
    eventEngagementCeremonyTime: 'காலை 11:00',
    eventEngagementReceptionDate: 'வியாழன், 21 ஜனவரி 2027',
    eventEngagementReceptionTime: 'நிச்சயதார்த்த விழாவைத் தொடர்ந்து',
    eventWeddingCeremonyDate: 'திங்கள், 1 பிப்ரவரி 2027',
    eventWeddingCeremonyTime: 'காலை 10:30',
    eventWeddingReceptionDate: 'திங்கள், 1 பிப்ரவரி 2027',
    eventWeddingReceptionTime: 'திருமண விழாவைத் தொடர்ந்து',

    /* Stay Connected Section */
    connectTag: 'அறிவிப்புகள் & செய்திகள்',
    connectTitle: 'தொடர்பில் இருங்கள்',
    connectSubtitle: 'சமீபத்திய திருமண அறிவிப்புகள் மற்றும் விவரங்களை உடனுக்குடன் பெறுங்கள்.',
    connectCardTitle: 'அதிகாரப்பூர்வ WhatsApp குழு',
    connectCardDesc: 'திருமண அறிவிப்புகள், நிகழ்ச்சி நேரங்கள் மற்றும் வழித்தட விவரங்களை உடனுக்குடன் பெற எங்கள் அதிகாரப்பூர்வ WhatsApp குழுவில் இணையுங்கள்.',
    connectBtn: 'WhatsApp குழுவில் இணையுங்கள்',

    /* WhatsApp Community / Updates */
    shareGroupTitle: 'அதிகாரப்பூர்வ WhatsApp குழு',
    shareGroupDesc: 'நிகழ்ச்சி அறிவிப்புகள் மற்றும் வழிகாட்டுதல்களை உடனுக்குடன் பெற எங்கள் அதிகாரப்பூர்வ WhatsApp குழுவில் இணையவும்.',
    shareBtnGroup: 'WhatsApp குழுவில் இணையவும்',
    whatsAppGroupBtn: 'WhatsApp அப்டேட் குழுவில் இணையவும்',
    whatsAppGroupDesc: 'விழா அறிவிப்புகளையும் வழிகாட்டுதல்களையும் உடனுக்குடன் பெற:',


    /* Compliments Section */
    complimentsFrom: 'அன்புடன்',
    complimentsGroup: 'குடும்பத்தினரும் நண்பர்களும்',

    /* RSVP Section */
    rsvpTag: 'உங்கள் வருகை ஒரு ஆசீர்வாதம்',
    rsvpTitle: 'எங்களோடு இணைவீர்களா?',
    rsvpBlessing: 'உங்கள் வருகையும் ஆசீர்வாதங்களும் இந்த நாளை சிறப்பாக்கும்.',
    formLabelName: 'முழு பெயர்',
    formRequired: '*',
    formLabelEmail: 'மின்னஞ்சல் முகவரி',
    formOptional: '(விருப்பமானது)',
    formLabelMobile: 'கைபேசி எண்',
    formContactHint: 'தொடர்பு தகவல்: தொடர்பு கொள்ள மொபைல் எண் அல்லது மின்னஞ்சல் வழங்கவும்.',
    formLabelHouseName: 'வீட்டுப் பெயர் / முகவரி',
    formLabelFamilySide: 'நீங்கள் யார் பக்கம்?',
    formBridesSide: 'மணமகள் வீட்டார்',
    formGroomsSide: 'மணமகன் வீட்டார்',
    formLabelEngagement: '💍 நிச்சயதார்த்த விழா',
    formEngagementBadge: 'திருமணத்திற்கு முந்தைய விழா',
    formEngagementDate: 'வியாழன், 21 ஜனவரி 2027',
    formLabelWedding: '⛪ திருமண விழா & விருந்து',
    formWeddingBadge: 'புனித திருமணம் & விருந்து',
    formWeddingDate: 'திங்கள், 1 பிப்ரவரி 2027 • காலை 10:30',
    formWillAttend: 'கலந்துகொள்வீர்களா?',
    formAccept: 'மகிழ்ச்சியுடன் கலந்து கொள்கிறேன்',
    formDecline: 'கலந்து கொள்ள இயலாமைக்கு வருந்துகிறேன்',
    formLabelAttendeesEng: 'நிச்சயதார்த்தத்தில் கலந்துகொள்பவர்கள்',
    formLabelAttendeesWed: 'திருமணத்தில் கலந்துகொள்பவர்கள்',
    formCountHint: '(1–100 எண்)',
    formLabelMessage: 'தம்பதிக்கு வாழ்த்துக்கள்',
    formSubmit: 'வருகையை உறுதி செய்க',
    formSubmitting: 'பதிவு செய்யப்படுகிறது...',
    formContactsTitle: 'தகவல் & தொடர்புக்கு',
    formContactsSubtitle: 'எங்கள் குடும்ப ஒருங்கிணைப்பாளர்களை நேரடியாக தொடர்பு கொள்ளலாம்:',
    formBtnCall: 'அழைக்கவும்',
    formBtnWhatsApp: 'WhatsApp',
    formMsgPlaceholder: 'Dr. Jerin & Merin-க்கு ஒரு ஆசீர்வாதம் அல்லது வாழ்த்துக் குறிப்பைப் பகிரவும்...',

    /* Validation Messages */
    validName: 'உங்கள் முழு பெயரை உள்ளிடவும்.',
    validContact: 'தொடர்பு கொள்ள மொபைல் எண் அல்லது மின்னஞ்சல் வழங்கவும்.',
    validEmail: 'சரியான மின்னஞ்சல் முகவரி உள்ளிடவும்.',
    validMobile: 'சரியான 10 இலக்க மொபைல் எண் உள்ளிடவும்.',
    validHouseName: 'உங்கள் வீட்டின் பெயரை உள்ளிடவும்.',
    validFamilySide: 'ஒரு குடும்ப பக்கத்தை தேர்ந்தெடுக்கவும்.',
    validCount: '1 முதல் 100 வரை ஒரு எண் உள்ளிடவும்.',
    validCountEng: 'நிச்சயதார்த்தத்தில் 1–100 உள்ளிடவும்.',
    validCountWed: 'திருமணத்தில் 1–100 உள்ளிடவும்.',
    validCheckFields: 'தயவுசெய்து மேலே சிறப்பிக்கப்பட்டுள்ள விவரங்களை சரிபார்க்கவும்.',

    /* Success / Error */
    successPrefix: '✨ மனமார்ந்த நன்றி,',
    successSuffix: 'தங்களின் பதிவு',
    successSaved: 'எங்கள் திருமண பதிவேட்டில் பதிவு செய்யப்பட்டது.',
    successCelebrate: 'உங்களுடன் இணைந்து கொண்டாட ஆவலுடன் காத்திருக்கிறோம்!',
    successDeclined: 'தங்கள் தகவல் அன்புடன் பெறப்பட்டது. தங்களின் மேலான ஜெபங்களையும் ஆசிகளையும் பெரிதும் மதிக்கிறோம்.',
    errorServer: 'வருகை விவரங்களை சேமிக்க முடியவில்லை.',
    errorNetwork: 'கவனிக்கவும்: இணைப்பு சிக்கல்',
    errorNetworkDetail: 'வருகை பதிவேட்டை அணுக முடியவில்லை.',
    errorNetworkFallback: 'உங்கள் பதில் இன்னும் பதிவு செய்யப்படவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது WhatsApp மூலம் தொடர்பு கொள்ளவும்:',
    errorNetworkWABtn: 'ஒருங்கிணைப்பாளருக்கு WhatsApp அனுப்பவும்',

    /* Share Section */
    shareTag: 'அன்பானவர்களுடன் பகிரவும்',
    shareTitle: 'அழைப்பிதழைப் பகிரவும்',
    shareWATitle: 'WhatsApp-ல் பகிரவும்',
    shareWADesc: 'திருமண அழைப்பிதழை குடும்பத்தினருக்கும் நண்பர்களுக்கும் WhatsApp மூலம் பகிரவும்.',
    shareBtnWhatsApp: 'WhatsApp மூலம் பகிர',
    shareQRTitle: 'QR குறியீட்டை ஸ்கேன் செய்யவும்',
    shareQRDesc: 'அழைப்பிதழை உடனடியாக தொலைபேசியில் திறக்க QR குறியீட்டை ஸ்கேன் செய்யவும்.',
    shareBtnQR: 'QR குறியீட்டைப் பார்க்கவும்',

    /* QR Modal */
    qrModalTitle: 'திருமண QR குறியீடு',
    qrModalNote: 'இந்த QR குறியீட்டை தொலைபேசி கேமராவால் ஸ்கேன் செய்து அழைப்பிதழைத் திறக்கவும்.',
    qrClose: 'மூடவும்',

    /* Footer */
    footerSub: 'திங்கள், 1 பிப்ரவரி 2027',
    footerReplay: '✉️ திறப்பு அனிமேஷனை மீண்டும் பார்க்கவும்',

    /* Floating Quick Bar */
    quickVenues: 'நிகழ்விடம்',
    quickRsvp: 'RSVP',
    quickShare: 'பகிர',

    /* Music Toggle */
    musicPlay: 'பின்னணி இசையை இயக்கவும்',
    musicPause: 'பின்னணி இசையை நிறுத்தவும்',
    musicToggle: 'பின்னணி திருமண இசை',

    /* Summary strings */
    summaryEngagement: 'நிச்சயதார்த்தம்',
    summaryWedding: 'திருமண விழா & விருந்து',
    summaryAttendee: 'நபர்',
    summaryAttendees: 'நபர்கள்',
    summaryDeclined: 'இரண்டு நிகழ்வுகளும் நிராகரிக்கப்பட்டன',
    engagementCountLabel: 'நிச்சயதார்த்தத்தில் கலந்துகொள்பவர்கள்',
    weddingCountLabel: 'திருமணத்தில் கலந்துகொள்பவர்கள்',
  },

  /* ── Hindi ───────────────────────────────────────────────── */
  hi: {
    /* Language Selector */
    chooseLang: 'भाषा चुनें',
    langEn: 'English',
    langMl: 'Malayalam',
    langTa: 'தமிழ்',
    langHi: 'हिन्दी',

    /* Opening Curtain / Cover */
    holyMatrimonyOf: 'पवित्र विवाह संस्कार',
    coupleNames: 'Dr. Jerin James & Merin M. Joy',
    weddingDate: 'सोमवार, 1 फरवरी 2027',
    weddingTime: 'सुबह 10:30',
    tapSealHint: 'आमंत्रण खोलने के लिए मुहर पर टैप करें',
    coupleConnector: '&',

    /* Scripture */
    scriptureVerse: 'यहोवा ने हमारे साथ बड़े बड़े काम किए हैं; और इससे हम आनन्दित हैं।',
    scriptureRef: '— भजन संहिता 126:3',

    /* Announcement Bar */
    announcementLabel: '💍 पवित्र विवाह',

    /* Hero Section */
    gratitudeText: 'ईश्वर के प्रति कृतज्ञता और हृदय में अपार हर्ष के साथ,',
    sectionTagPresence: 'आपकी गरिमामयी उपस्थिति और शुभाशीष के लिए सादर आमंत्रण',
    heroBtnVenues: 'स्थान & मार्ग',
    heroBtnRsvp: 'RSVP & संपर्क',

    /* Countdown Section */
    anticipatingTag: 'पवित्र विवाह की पावन प्रतीक्षा में',
    countdownTitle: 'हमारे पवित्र विवाह बंधन की ओर',
    countdownNote: 'सोमवार, 1 फरवरी 2027, सुबह 10:30 IST तक',
    countdownDone: 'शुभ विवाह का पावन दिन आ गया! मंगलमय समारोह प्रारंभ हो चुका है।',
    labelDays: 'दिन',
    labelHours: 'घंटे',
    labelMinutes: 'मिनट',
    labelSeconds: 'सेकंड',

    /* Family Section */
    familyTag: 'दोनों परिवारों की ओर से',
    familyTitle: 'सादर आमंत्रण',
    groomsParents: 'वर के माता-पिता',
    bridesParents: 'वधू के माता-पिता',
    invitationLead: 'अपने प्रिय बच्चों',
    groomSuffix: '',
    proseConnector: ' और ',
    brideSuffix: '',
    unionDesc: 'के पवित्र विवाह संस्कार में, जो प्रेम, विश्वास और सहभागिता की नींव पर नवजीवन का आरंभ कर रहे हैं, आपको व आपके परिवार को शुभाशीष देने हेतु सादर आमंत्रित करते हैं।',
    blessingClosing: 'आपकी गरिमामयी उपस्थिति, प्रार्थनाएं और मंगलकामनाएं इस पावन अवसर को और भी आनंदमय बना देंगी।',

    /* Portrait Section */
    portraitTag: 'हमारा सफर',
    portraitTitle: 'Always Us',
    portraitSubtitle: 'हमारे सुखद सफर की एक सुंदर झलक।',

    /* Events Section */
    eventsTag: 'कार्यक्रम की रूपरेखा',
    eventsTitle: 'विवाह समारोह एवं प्रीतिभोज स्थल',
    labelDate: 'तारीख:',
    labelTime: 'समय:',
    labelVenue: 'स्थान:',
    getDirections: 'मार्ग देखें',
    getDirectionsChurch: 'चर्च का मार्ग देखें',
    getDirectionsReception: 'प्रीतिभोज स्थल का मार्ग देखें',
    getDirectionsEngagementChurch: 'चर्च का मार्ग देखें',
    getDirectionsEngagementReception: 'प्रीतिभोज स्थल का मार्ग देखें',

    /* Event Groups & Cards */
    engagementGroupTag: '💍 सगाई समारोह',
    engagementGroupTitle: 'सगाई समारोह और स्वागत समारोह',
    weddingGroupTag: '⛪ पवित्र विवाह एवं प्रीतिभोज',
    weddingGroupTitle: 'पवित्र विवाह संस्कार एवं प्रीतिभोज',

    eventEngagementCeremonyBadge: 'सगाई समारोह',
    eventEngagementCeremonyTitle: 'सगाई समारोह',
    eventEngagementCeremonySubtitle: 'सगाई एवं आशीष',
    eventEngagementReceptionBadge: 'सगाई स्वागत',
    eventEngagementReceptionTitle: 'सगाई स्वागत समारोह',
    eventEngagementReceptionSubtitle: 'सगाई समारोह के उपरांत स्नेहभोज',

    eventWeddingCeremonyBadge: 'पवित्र विवाह',
    eventWeddingCeremonyTitle: 'विवाह समारोह',
    eventWeddingCeremonySubtitle: 'पवित्र विवाह संस्कार एवं आशीष',
    eventWeddingReceptionBadge: 'विवाह प्रीतिभोज',
    eventWeddingReceptionTitle: 'विवाह प्रीतिभोज',
    eventWeddingReceptionSubtitle: 'विवाह समारोह के उपरांत स्नेहभोज',

    /* Event Dates & Times */
    eventEngagementCeremonyDate: 'गुरुवार, 21 जनवरी 2027',
    eventEngagementCeremonyTime: 'सुबह 11:00',
    eventEngagementReceptionDate: 'गुरुवार, 21 जनवरी 2027',
    eventEngagementReceptionTime: 'सगाई समारोह के बाद',
    eventWeddingCeremonyDate: 'सोमवार, 1 फरवरी 2027',
    eventWeddingCeremonyTime: 'सुबह 10:30',
    eventWeddingReceptionDate: 'सोमवार, 1 फरवरी 2027',
    eventWeddingReceptionTime: 'विवाह समारोह के बाद',

    /* Stay Connected Section */
    connectTag: 'घोषणाएं & अपडेट्स',
    connectTitle: 'जुड़े रहें',
    connectSubtitle: 'विवाह की नवीनतम सूचनाओं और विवरणों से जुड़े रहें।',
    connectCardTitle: 'आधिकारिक WhatsApp ग्रुप',
    connectCardDesc: 'विवाह घोषणाओं, कार्यक्रम विवरण, समय सारणी और मार्ग दर्शन के लिए हमारे आधिकारिक WhatsApp ग्रुप से जुड़ें।',
    connectBtn: 'WhatsApp ग्रुप से जुड़ें',

    /* WhatsApp Community / Updates */
    shareGroupTitle: 'आधिकारिक WhatsApp ग्रुप',
    shareGroupDesc: 'समारोह के अपडेट, समय और लाइव दिशाएं तुरंत प्राप्त करने के लिए हमारे आधिकारिक WhatsApp ग्रुप से जुड़ें।',
    shareBtnGroup: 'WhatsApp ग्रुप में शामिल हों',
    whatsAppGroupBtn: 'WhatsApp अपडेट ग्रुप में शामिल हों',
    whatsAppGroupDesc: 'समारोह के अपडेट और दिशा-निर्देश तुरंत पाने के लिए:',


    /* Compliments Section */
    complimentsFrom: 'सस्नेह',
    complimentsGroup: 'परिवार और मित्रगण',

    /* RSVP Section */
    rsvpTag: 'आपकी उपस्थिति एक आशीर्वाद है',
    rsvpTitle: 'क्या आप हमारे इस आनंद में शामिल होंगे?',
    rsvpBlessing: 'आपकी उपस्थिति और आशीर्वाद इस पावन दिन को यादगार बना देंगे।',
    formLabelName: 'पूरा नाम',
    formRequired: '*',
    formLabelEmail: 'ईमेल पता',
    formOptional: '(वैकल्पिक)',
    formLabelMobile: 'मोबाइल नंबर',
    formContactHint: 'संपर्क जानकारी: हमसे संपर्क करने के लिए मोबाइल नंबर या ईमेल दें।',
    formLabelHouseName: 'घर का नाम / पता',
    formLabelFamilySide: 'आप किस पक्ष से हैं?',
    formBridesSide: 'वधू पक्ष',
    formGroomsSide: 'वर पक्ष',
    formLabelEngagement: '💍 सगाई समारोह',
    formEngagementBadge: 'विवाह-पूर्व समारोह',
    formEngagementDate: 'गुरुवार, 21 जनवरी 2027',
    formLabelWedding: '⛪ विवाह समारोह & प्रीतिभोज',
    formWeddingBadge: 'पवित्र विवाह & प्रीतिभोज',
    formWeddingDate: 'सोमवार, 1 फरवरी 2027 • सुबह 10:30',
    formWillAttend: 'क्या आप उपस्थित होंगे?',
    formAccept: 'सहर्ष स्वीकार',
    formDecline: 'असमर्थता के लिए खेद',
    formLabelAttendeesEng: 'सगाई में उपस्थित लोग',
    formLabelAttendeesWed: 'विवाह में उपस्थित लोग',
    formCountHint: '(1–100 पूर्ण संख्या)',
    formLabelMessage: 'दम्पती के लिए शुभकामनाएं',
    formSubmit: 'उपस्थिति दर्ज करें',
    formSubmitting: 'विवाह रजिस्टर में दर्ज किया जा रहा है...',
    formContactsTitle: 'प्रश्न या जानकारी हेतु',
    formContactsSubtitle: 'हमारे पारिवारिक समन्वयकों से सीधे संपर्क कर सकते हैं:',
    formBtnCall: 'कॉल करें',
    formBtnWhatsApp: 'WhatsApp',
    formMsgPlaceholder: 'Dr. Jerin & Merin के लिए अपनी शुभकामनाएं, प्रार्थना या संदेश लिखें...',

    /* Validation Messages */
    validName: 'कृपया अपना पूरा नाम दर्ज करें।',
    validContact: 'संपर्क के लिए मोबाइल नंबर या ईमेल दें।',
    validEmail: 'एक वैध ईमेल पता दर्ज करें।',
    validMobile: 'एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें।',
    validHouseName: 'कृपया अपने घर का नाम दर्ज करें।',
    validFamilySide: 'कृपया एक पक्ष चुनें।',
    validCount: '1 से 100 के बीच एक संख्या दर्ज करें।',
    validCountEng: 'सगाई के लिए 1–100 के बीच संख्या दर्ज करें।',
    validCountWed: 'विवाह के लिए 1–100 के बीच संख्या दर्ज करें।',
    validCheckFields: 'कृपया ऊपर चिह्नित विवरण की समीक्षा करें।',

    /* Success / Error */
    successPrefix: '✨ हार्दिक धन्यवाद,',
    successSuffix: 'आपकी उपस्थिति',
    successSaved: 'विवाह रजिस्टर में सफलतापूर्वक दर्ज कर ली गई है।',
    successCelebrate: 'हम आपके साथ इस आनंदोत्सव को मनाने की प्रतीक्षा कर रहे हैं!',
    successDeclined: 'आपकी सूचना कृतज्ञतापूर्वक प्राप्त हुई। आपकी प्रार्थनाएं एवं मंगलकामनाएं हमारे लिए अमूल्य हैं।',
    errorServer: 'उपस्थिति विवरण सहेजने में असमर्थ।',
    errorNetwork: 'सूचना: कनेक्शन समस्या',
    errorNetworkDetail: 'उपस्थिति रजिस्ट्री तक पहुंच नहीं हो सकी।',
    errorNetworkFallback: 'आपका उत्तर अभी तक दर्ज नहीं हुआ। पुनः प्रयास करें या WhatsApp पर संपर्क करें:',
    errorNetworkWABtn: 'समन्वयक को WhatsApp पर भेजें',

    /* Share Section */
    shareTag: 'प्रियजनों के साथ साझा करें',
    shareTitle: 'आमंत्रण साझा करें',
    shareWATitle: 'WhatsApp पर भेजें',
    shareWADesc: 'विवाह आमंत्रण परिवार और मित्रों को WhatsApp पर भेजें।',
    shareBtnWhatsApp: 'WhatsApp पर साझा करें',
    shareQRTitle: 'QR कोड स्कैन करें',
    shareQRDesc: 'QR कोड स्कैन करके आमंत्रण तुरंत फोन पर खोलें।',
    shareBtnQR: 'QR कोड देखें',

    /* QR Modal */
    qrModalTitle: 'विवाह QR कोड',
    qrModalNote: 'फोन कैमरे से QR कोड स्कैन करके आमंत्रण खोलें।',
    qrClose: 'बंद करें',

    /* Footer */
    footerSub: 'सोमवार, 1 फरवरी 2027',
    footerReplay: '✉️ उद्घाटन अनुभव दोबारा देखें',

    /* Floating Quick Bar */
    quickVenues: 'स्थान',
    quickRsvp: 'RSVP',
    quickShare: 'साझा करें',

    /* Music Toggle */
    musicPlay: 'पृष्ठभूमि संगीत चलाएं',
    musicPause: 'पृष्ठभूमि संगीत रोकें',
    musicToggle: 'पृष्ठभूमि विवाह संगीत',

    /* Summary strings */
    summaryEngagement: 'सगाई',
    summaryWedding: 'विवाह समारोह & प्रीतिभोज',
    summaryAttendee: 'अतिथि',
    summaryAttendees: 'अतिथि',
    summaryDeclined: 'दोनों समारोहों से अनुपस्थित',
    engagementCountLabel: 'सगाई में उपस्थित लोग',
    weddingCountLabel: 'विवाह में उपस्थित लोग',
  }
};

/* ── Export ──────────────────────────────────────────────── */
if (typeof window !== 'undefined') {
  window.TRANSLATIONS = TRANSLATIONS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TRANSLATIONS;
}
