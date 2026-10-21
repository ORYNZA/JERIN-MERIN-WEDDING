/**
 * Jerin Marriage — Central Wedding Configuration
 * 
 * IMPORTANT: This website is EXCLUSIVELY for the Wedding Ceremony and Reception on 1 February 2027.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: "Dr. Jerin James",
    groomShort: "Jerin",
    groomParents: "Mr. James D & Mrs. Rosilin James",
    groomAddress: "Karikkathil Thekkethil Veedu, Andoor P.O., Cheruvalloor, Kollam",
    
    bride: "Merin M. Joy",
    brideShort: "Merin",
    brideParents: "Mr. Joy & Mrs. Mini Joy",
    brideAddress: "Puthenparambil House, Lakkoor, Vellapara P.O., Pathanamthitta",
    
    monogram: "J & M"
  },

  // Confirmed Wedding Date & Time
  weddingDate: {
    confirmed: true,
    day: 1,
    month: "February",
    year: 2027,
    dayOfWeek: "Monday",
    displayDate: "Monday, 1st February 2027",
    displayTime: "10:30 a.m. IST",
    // Countdown target: 1 February 2027, 10:30 a.m. IST (+05:30)
    isoTarget: "2027-02-01T10:30:00+05:30"
  },

  // Scripture Quote (Prominent near beginning)
  scripture: {
    verse: "“The Lord has done great things for us,\nand we are filled with joy.”",
    reference: "— Psalms 126:3"
  },

  // Invitation Prose & Wording
  prose: {
    gratitude: "With hearts filled with gratitude to God and joy in our hearts,",
    invitationLead: "cordially invite you and your family to bless the Holy Matrimony of their beloved children",
    unionDescription: "as they unite in marriage and begin a new chapter of their lives together, founded on love, faith and togetherness.",
    blessingClosing: "Your gracious presence, prayers and blessings will make this joyous occasion even more memorable."
  },

  // Event Schedule & Venues: Engagement & Wedding
  events: [
    {
      id: "engagement-ceremony",
      group: "engagement",
      groupBadge: "Pre-Wedding Celebration",
      groupTitle: "Engagement Celebrations",
      badge: "Engagement Ceremony",
      title: "Engagement Ceremony",
      subtitle: "Solemn Betrothal & Blessing",
      date: "Thursday, 21 January 2027",
      time: "11:00 a.m.",
      venueName: "St. George's Malankara Catholic Church",
      venueAddress: "Lakkoor",
      mapUrl: "https://maps.app.goo.gl/7cwcCBCAkckT6LMc6?g_st=aw",
      badgeClass: "badge-engagement",
      icon: "ring",
      directionsLabel: "Get Directions to Church",
      i18nTitleKey: "eventEngagementCeremonyTitle",
      i18nSubtitleKey: "eventEngagementCeremonySubtitle",
      i18nBadgeKey: "eventEngagementCeremonyBadge",
      i18nDirKey: "getDirectionsEngagementChurch",
      i18nDateKey: "eventEngagementCeremonyDate",
      i18nTimeKey: "eventEngagementCeremonyTime"
    },
    {
      id: "engagement-reception",
      group: "engagement",
      groupBadge: "Pre-Wedding Celebration",
      groupTitle: "Engagement Celebrations",
      badge: "Engagement Reception",
      title: "Engagement Reception",
      subtitle: "Celebration & Fellowship",
      date: "Thursday, 21 January 2027",
      time: "Following the Engagement Ceremony",
      venueName: "St. George Orthodox Maha Edavaka Auditorium",
      venueAddress: "Konni",
      mapUrl: "https://maps.app.goo.gl/fidEYTTP5AiHz5AG9",
      badgeClass: "badge-engagement-reception",
      icon: "toast",
      directionsLabel: "Get Directions to Reception",
      i18nTitleKey: "eventEngagementReceptionTitle",
      i18nSubtitleKey: "eventEngagementReceptionSubtitle",
      i18nBadgeKey: "eventEngagementReceptionBadge",
      i18nDirKey: "getDirectionsEngagementReception",
      i18nDateKey: "eventEngagementReceptionDate",
      i18nTimeKey: "eventEngagementReceptionTime"
    },
    {
      id: "wedding-ceremony",
      group: "wedding",
      groupBadge: "Sacred Matrimony",
      groupTitle: "Wedding Celebrations",
      badge: "Holy Matrimony",
      title: "Wedding Ceremony",
      subtitle: "Holy Matrimony & Nuptial Blessing",
      date: "Monday, 1st February 2027",
      time: "10:30 a.m.",
      venueName: "St. Mary's Malankara Catholic Church",
      venueAddress: "Valakom, Kollam",
      mapUrl: "https://maps.app.goo.gl/Da2ffQNDySAqRJjC7",
      badgeClass: "badge-wedding",
      icon: "church",
      directionsLabel: "Get Directions to Church",
      i18nTitleKey: "eventWeddingCeremonyTitle",
      i18nSubtitleKey: "eventWeddingCeremonySubtitle",
      i18nBadgeKey: "eventWeddingCeremonyBadge",
      i18nDirKey: "getDirectionsChurch",
      i18nDateKey: "eventWeddingCeremonyDate",
      i18nTimeKey: "eventWeddingCeremonyTime"
    },
    {
      id: "wedding-reception",
      group: "wedding",
      groupBadge: "Sacred Matrimony",
      groupTitle: "Wedding Celebrations",
      badge: "Wedding Reception",
      title: "Wedding Reception",
      subtitle: "Celebration & Feast to follow the ceremony",
      date: "Monday, 1st February 2027",
      time: "Following the ceremony",
      venueName: "Pratheeksha Auditorium",
      venueAddress: "Valakom",
      mapUrl: "https://maps.app.goo.gl/4sYNNLfQ3Zyqh4T38",
      badgeClass: "badge-wedding-reception",
      icon: "toast",
      directionsLabel: "Get Directions to Reception",
      i18nTitleKey: "eventWeddingReceptionTitle",
      i18nSubtitleKey: "eventWeddingReceptionSubtitle",
      i18nBadgeKey: "eventWeddingReceptionBadge",
      i18nDirKey: "getDirectionsReception",
      i18nDateKey: "eventWeddingReceptionDate",
      i18nTimeKey: "eventWeddingReceptionTime"
    }
  ],

  // Best Compliments
  compliments: {
    heading: "With Best Compliments from",
    names: "Jebin James & Jerin Joy",
    group: "Family & Friends"
  },

  // RSVP & Attendance Configuration
  rsvp: {
    // Deployed Google Sheets Web App URL (Google Apps Script doPost endpoint)
    googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbx4bropYZRiPuXYIFGqwNYzVvQ2Zhe5BGgZ22hPqfCKDAhu7uwgZn1G18ekv3kN7gpt/exec",

    // Connected Google Spreadsheet and Worksheet
    spreadsheetId: "19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY",
    spreadsheetUrl: "https://docs.google.com/spreadsheets/d/19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY/edit",
    sheetName: "Attendance Responses",

    // Optional Google Form URL fallback (kept null since custom attendance system is active)
    googleFormUrl: null,

    // Events available for attendance
    events: {
      engagement: {
        title: "Engagement Ceremony",
        date: "Thursday, 21 January 2027"
      },
      wedding: {
        title: "Wedding Ceremony & Reception",
        date: "Monday, 1 February 2027",
        time: "10:30 a.m. IST"
      }
    },

    // Family Coordinator Contacts (Call & WhatsApp)
    contactPersons: [
      {
        name: "Jebin James",
        role: "Groom's Family",
        displayPhone: "+91 89219 93702",
        rawPhone: "8921993702",
        callUrl: "tel:+918921993702",
        whatsappUrl: "https://wa.me/918921993702?text=Hi%20Jebin,%20regarding%20Dr.%20Jerin's%20wedding%20invitation"
      },
      {
        name: "Jerin Joy",
        role: "Bride's Family",
        displayPhone: "+91 91504 30277",
        rawPhone: "+91 91504 30277",
        callUrl: "tel:+919150430277",
        whatsappUrl: "https://wa.me/919150430277?text=Hi%20Jerin,%20regarding%20Merin's%20wedding%20invitation"
      }
    ]
  },

  // WhatsApp Sharing Configuration
  sharing: {
    title: "Wedding Invitation — Dr. Jerin James & Merin M. Joy",
    whatsappGroupUrl: "https://chat.whatsapp.com/Jfd2ltKLye8E83PuAZQkJI",
    whatsappMessage: "✨ *Wedding Invitation* ✨\n\n“The Lord has done great things for us,\nand we are filled with joy.” — Psalms 126:3\n\nWith hearts filled with gratitude to God and joy in our hearts,\n*Mr. James D & Mrs. Rosilin James*\nand\n*Mr. Joy & Mrs. Mini Joy*\ncordially invite you and your family to bless the Holy Matrimony of their beloved children\n\n💍 *Dr. Jerin James* with *Merin M. Joy* 💍\n\n🗓 *Monday, 1st February 2027 at 10:30 a.m.*\n⛪ *St. Mary's Malankara Catholic Church*, Valakom, Kollam\n🎉 *Reception to follow at Pratheeksha Auditorium*, Valakom\n\nKindly view event details, venue directions, and schedule on our wedding invitation website:\n",
    // When published, window.location.href will be used automatically.
    // Set to null while local so no fake or invented domain is displayed.
    siteUrl: null
  },

  // QR Code Configuration
  qrCode: {
    title: "Invitation QR Code",
    description: "Scan this QR code with any smartphone camera to open the invitation on your phone or share with loved ones.",
    // Uses window.location.href automatically when hosted on the web
    targetUrl: null
  },

  // Standardized Background Wedding Music Configuration
  music: {
    enabled: true,
    // Put any audio file with this name in assets/ to replace the music without changing code
    audioFile: "assets/weddingmusic.mp3",
    title: "Wedding Background Music",
    loop: true,
    volume: 0.7
  }
};

// Export to window for browser usage
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}

// Export for Node/testing environment
if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
}
