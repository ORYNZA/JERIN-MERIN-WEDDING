/**
 * Wedding RSVP & Attendance Collector Backend (Google Apps Script)
 * Couple: Dr. Jerin James & Merin M. Joy
 * Spreadsheet ID: 19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY
 * Expected Worksheet: Attendance Responses
 * 
 * Target 11-Column Schema:
 * 1.  Timestamp
 * 2.  Guest Name
 * 3.  House Name / Address
 * 4.  Family Side
 * 5.  Email
 * 6.  Mobile Number
 * 7.  Engagement Attending
 * 8.  Engagement Attendee Count
 * 9.  Wedding Attending
 * 10. Wedding Attendee Count
 * 11. Message
 * 
 * Rules:
 * - Guest name: mandatory.
 * - House name / address: mandatory.
 * - Family side: mandatory (must be "Bride's Side" or "Groom's Side").
 * - Contact: at least one valid contact method (email or mobile) must be provided.
 * - Email only: accepted when valid.
 * - Mobile only: accepted when valid (10-digit Indian mobile starting with 6–9).
 * - Both email and mobile: accepted when both are valid.
 * - Engagement attendance: Yes/No. If Yes, whole number 1–100. If No, count is 0.
 * - Wedding attendance: Yes/No. If Yes, whole number 1–100. If No, count is 0.
 * - Formula-injection protection applied to all incoming text fields.
 * - Resilient schema synchronization: automatically reconciles headers without rejecting guest submissions.
 */

var SPREADSHEET_ID = "19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY";
var SHEET_NAME = "Attendance Responses";

var HEADERS = [
  "Timestamp",
  "Guest Name",
  "House Name / Address",
  "Family Side",
  "Email",
  "Mobile Number",
  "Engagement Attending",
  "Engagement Attendee Count",
  "Wedding Attending",
  "Wedding Attendee Count",
  "Message"
];

// Handle incoming POST requests from the website attendance form
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Acquire lock for up to 10 seconds to handle concurrent writes safely
    lock.waitLock(10000);

    var payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    // 1. Validate Guest Full Name (Mandatory)
    var name = (payload.name || "").trim();
    if (!name) {
      return createJsonResponse({
        success: false,
        message: "Please provide your full name."
      });
    }

    // 2. Validate House Name / Address (Mandatory)
    var houseName = (payload.houseName || "").trim();
    if (!houseName) {
      return createJsonResponse({
        success: false,
        message: "Please provide your house name or address."
      });
    }

    // 3. Validate Family Side (Mandatory: "Bride's Side" or "Groom's Side")
    var familySide = (payload.familySide || "").trim();
    if (familySide !== "Bride's Side" && familySide !== "Groom's Side") {
      return createJsonResponse({
        success: false,
        message: "Please select a valid family side (Bride's Side or Groom's Side)."
      });
    }

    // 4. Validate Contact Fields (At least one required; optional individually)
    var emailRaw = (payload.email || "").trim();
    var mobileRaw = (payload.mobile || payload.phone || "").trim();

    var hasEmail = emailRaw.length > 0;
    var hasMobile = mobileRaw.length > 0;

    if (!hasEmail && !hasMobile) {
      return createJsonResponse({
        success: false,
        message: "Please provide either a mobile number or an email address so we can contact you."
      });
    }

    var normalizedEmail = "";
    if (hasEmail) {
      if (!validateEmail(emailRaw)) {
        return createJsonResponse({
          success: false,
          message: "Please provide a valid email address."
        });
      }
      normalizedEmail = emailRaw.toLowerCase();
    }

    var normalizedMobile = "";
    if (hasMobile) {
      var mobileValidation = validateAndNormalizeIndianMobile(mobileRaw);
      if (!mobileValidation.valid) {
        return createJsonResponse({
          success: false,
          message: "Please provide a valid 10-digit Indian mobile number."
        });
      }
      normalizedMobile = mobileValidation.normalized;
    }

    // 5. Validate Engagement Attendance (Yes / No)
    var engagementAttending = (payload.engagementAttending || "").trim();
    if (engagementAttending !== "Yes" && engagementAttending !== "No") {
      return createJsonResponse({
        success: false,
        message: "Please select attendance for both events."
      });
    }

    var engagementCount = 0;
    if (engagementAttending === "Yes") {
      var parsedEng = parseInt(payload.engagementCount, 10);
      if (isNaN(parsedEng) || parsedEng < 1 || parsedEng > 100 || String(parsedEng) !== String(payload.engagementCount).trim()) {
        return createJsonResponse({
          success: false,
          message: "Enter a whole-number attendee count from 1 to 100 for engagement."
        });
      }
      engagementCount = parsedEng;
    }

    // 6. Validate Wedding Attendance (Yes / No)
    var weddingAttending = (payload.weddingAttending || "").trim();
    if (weddingAttending !== "Yes" && weddingAttending !== "No") {
      return createJsonResponse({
        success: false,
        message: "Please select attendance for both events."
      });
    }

    var weddingCount = 0;
    if (weddingAttending === "Yes") {
      var parsedWed = parseInt(payload.weddingCount, 10);
      if (isNaN(parsedWed) || parsedWed < 1 || parsedWed > 100 || String(parsedWed) !== String(payload.weddingCount).trim()) {
        return createJsonResponse({
          success: false,
          message: "Enter a whole-number attendee count from 1 to 100 for wedding."
        });
      }
      weddingCount = parsedWed;
    }

    var message = (payload.message || "").trim();

    // 7. Connect to Google Spreadsheet & Target Worksheet
    var ss;
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (openErr) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Ensure sheet headers and schema are fully synchronized to 11 columns
    ensureSheetReady(sheet);

    var timestamp = new Date();
    var nextRow = Math.max(2, sheet.getLastRow() + 1);

    // Write strictly to columns 1..11 (A..K) of next row
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
      timestamp,
      sanitizeForSpreadsheet(name),
      sanitizeForSpreadsheet(houseName),
      sanitizeForSpreadsheet(familySide),
      sanitizeForSpreadsheet(normalizedEmail),
      sanitizeForSpreadsheet(normalizedMobile),
      engagementAttending,
      engagementCount,
      weddingAttending,
      weddingCount,
      sanitizeForSpreadsheet(message)
    ]]);

    return createJsonResponse({
      success: true,
      message: "Attendance details saved successfully."
    });

  } catch (err) {
    return createJsonResponse({
      success: false,
      message: "Error processing attendance: " + err.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

// Health check and diagnostic GET endpoint
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "";
  if (action === "inspectHeaders") {
    try {
      var ss;
      try {
        ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      } catch (err) {
        ss = SpreadsheetApp.getActiveSpreadsheet();
      }
      var sheet = ss.getSheetByName(SHEET_NAME);
      if (!sheet) {
        return createJsonResponse({ success: false, message: "Worksheet " + SHEET_NAME + " not found." });
      }
      var lastCol = Math.max(1, sheet.getLastColumn());
      var lastRow = sheet.getLastRow();
      var actualHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      return createJsonResponse({
        success: true,
        lastColumn: lastCol,
        lastRow: lastRow,
        headers: actualHeaders,
        expectedHeaders: HEADERS
      });
    } catch (inspectErr) {
      return createJsonResponse({
        success: false,
        error: inspectErr.toString()
      });
    }
  }

  return createJsonResponse({
    success: true,
    status: "active",
    message: "Jerin & Merin Wedding Attendance service is running.",
    schemaColumns: HEADERS.length
  });
}

// Helper: Normalize & validate Indian mobile numbers (10 digits starting with 6-9)
function validateAndNormalizeIndianMobile(raw) {
  if (!raw) return { valid: false, normalized: "", raw10: "" };
  var str = String(raw).trim();

  // Reject if letters are present
  if (/[a-zA-Z]/.test(str)) {
    return { valid: false, normalized: "", raw10: "" };
  }

  // Strip spaces, dashes, parentheses, dots
  var clean = str.replace(/[\s\-\(\)\.]/g, "");

  if (clean.indexOf("+91") === 0) {
    clean = clean.substring(3);
  } else if (clean.indexOf("+") === 0) {
    return { valid: false, normalized: "", raw10: "" };
  } else if (clean.indexOf("91") === 0 && clean.length === 12) {
    clean = clean.substring(2);
  } else if (clean.indexOf("0") === 0 && clean.length === 11) {
    clean = clean.substring(1);
  }

  // Must be exactly 10 digits starting with 6, 7, 8, or 9
  if (/^[6-9]\d{9}$/.test(clean)) {
    var formatted = "+91 " + clean.substring(0, 5) + " " + clean.substring(5);
    return { valid: true, normalized: formatted, raw10: clean };
  }

  return { valid: false, normalized: "", raw10: "" };
}

// Helper: Validate email address format
function validateEmail(email) {
  if (!email) return false;
  var str = String(email).trim();
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(str);
}

// Helper: Formula injection prevention for spreadsheet text cells
function sanitizeForSpreadsheet(val) {
  if (val === null || val === undefined) return "";
  var str = String(val).trim();
  if (/^[=\+\-\@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

// Helper: Return CORS-friendly JSON output
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Ensure sheet is properly initialized or migrated before writing rows
function ensureSheetReady(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow === 0 || lastCol === 0) {
    setupSheetHeadersIfNeeded(sheet);
    return;
  }

  var currentHeaders = sheet.getRange(1, 1, 1, Math.max(lastCol, HEADERS.length)).getValues()[0];
  var normalized = currentHeaders.map(function(h) {
    return String(h || "").trim().toLowerCase();
  });

  // If column 3 is "Email" or "Email Address", sheet is still on old 9-column schema
  if (normalized[2] && normalized[2].indexOf("email") !== -1) {
    sheet.insertColumnsAfter(2, 2);
    if (sheet.getLastColumn() > 11) {
      sheet.deleteColumn(12);
    }
  }

  // Canonicalize row 1 headers across columns 1..11 without failing submissions
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  formatSheetHeaders(sheet);
}

// Setup headers on empty sheet with elegant formatting
function setupSheetHeadersIfNeeded(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    formatSheetHeaders(sheet);
    sheet.autoResizeColumns(1, HEADERS.length);
  }
}

// Format header row with luxury dark emerald and ivory theme
function formatSheetHeaders(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground("#0F2318"); // Deep Forest Emerald
  headerRange.setFontColor("#FAF7F2");  // Warm Ivory
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}

/**
 * Safe, idempotent migration function for existing Attendance Responses sheet.
 * Can be run manually from Apps Script Editor:
 *   1. Select 'migrateAttendanceSheetSchema' from the function dropdown.
 *   2. Click 'Run'.
 *
 * Rules:
 * - Detects old schema (9 or 10 columns) -> inserts 2 columns after Guest Name for House Name & Family Side.
 * - Preserves all existing rows and data. Leaves new columns blank for historical rows.
 * - Synchronizes row 1 headers with canonical HEADERS.
 * - Safely removes legacy 12th column (such as old WhatsApp formula link) if present.
 */
function migrateAttendanceSheetSchema() {
  var ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("Could not access spreadsheet ID: " + SPREADSHEET_ID);
  }

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    setupSheetHeadersIfNeeded(sheet);
    return { success: true, message: "Worksheet created and initialized with 11-column schema." };
  }

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow === 0 || lastCol === 0) {
    setupSheetHeadersIfNeeded(sheet);
    return { success: true, message: "Empty worksheet initialized with 11-column schema." };
  }

  var currentHeaders = sheet.getRange(1, 1, 1, Math.max(lastCol, HEADERS.length)).getValues()[0];
  var normalized = currentHeaders.map(function(h) {
    return String(h || "").trim().toLowerCase();
  });

  // Check if column 3 is email (legacy 9/10-column schema)
  if (normalized[2] && normalized[2].indexOf("email") !== -1) {
    sheet.insertColumnsAfter(2, 2);
    if (sheet.getLastColumn() > 11) {
      sheet.deleteColumn(12);
    }
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    formatSheetHeaders(sheet);
    sheet.autoResizeColumns(1, HEADERS.length);

    var migratedRows = Math.max(0, lastRow - 1);
    Logger.log("Successfully migrated " + migratedRows + " row(s) to 11-column schema.");
    return {
      success: true,
      message: "Successfully migrated " + migratedRows + " row(s) to 11-column schema."
    };
  }

  // If already migrated, clean up any extra column beyond 11 if it's the old whatsapp column
  if (sheet.getLastColumn() > 11) {
    var col12Header = String(sheet.getRange(1, 12).getValue() || "").toLowerCase();
    if (col12Header.indexOf("whatsapp") !== -1 || col12Header === "") {
      sheet.deleteColumn(12);
    }
  }

  // Canonicalize row 1 headers
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  formatSheetHeaders(sheet);
  sheet.autoResizeColumns(1, HEADERS.length);

  Logger.log("Sheet schema confirmed. Headers synchronized to canonical 11-column schema.");
  return {
    success: true,
    message: "Sheet schema confirmed. Headers synchronized to canonical 11-column schema."
  };
}

/**
 * -------------------------------------------------------------
 * GUEST REMINDER AUTOMATION TOOLS (Google Sheets Custom Menu)
 * -------------------------------------------------------------
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("💒 Wedding RSVP Tools")
    .addItem("🔄 Migrate / Synchronize Sheet Schema (11 Columns)", "migrateAttendanceSheetSchemaPrompt")
    .addItem("📧 Send Email Reminder to Attending Guests", "sendEmailRemindersPrompt")
    .addItem("📊 Format & Resize Table", "formatSheetColumns")
    .addToUi();
}

function migrateAttendanceSheetSchemaPrompt() {
  var ui = SpreadsheetApp.getUi();
  try {
    var result = migrateAttendanceSheetSchema();
    ui.alert("Schema Synchronization Result", result.message, ui.ButtonSet.OK);
  } catch (err) {
    ui.alert("Migration Error", err.toString(), ui.ButtonSet.OK);
  }
}

function sendEmailRemindersPrompt() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    "Send Wedding Reminders",
    "This tool allows you to send an email reminder to all guests who registered their attendance.\n\nNo emails will be sent without your confirmation. Would you like to proceed?",
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    ui.alert("Cancelled: No reminders were sent.");
    return;
  }

  var eventPrompt = ui.prompt(
    "Target Event",
    "Enter 'wedding' for Wedding (1 Feb), 'engagement' for Engagement (21 Jan), or 'both' for All Attending Guests:",
    ui.ButtonSet.OK_CANCEL
  );

  if (eventPrompt.getSelectedButton() !== ui.Button.OK) return;
  var filterEvent = (eventPrompt.getResponseText() || "both").toLowerCase().trim();

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  var data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    ui.alert("No responses found in the sheet yet.");
    return;
  }

  var sentCount = 0;
  for (var i = 1; i < data.length; i++) {
    var guestName = data[i][1];
    var guestEmail = data[i][4]; // Email is column 5 (index 4) in 11-column schema
    var engagementAttending = String(data[i][6]); // Engagement Attending is column 7 (index 6)
    var weddingAttending = String(data[i][8]); // Wedding Attending is column 9 (index 8)

    if (guestEmail && guestEmail.indexOf("@") !== -1) {
      var match = false;
      if (filterEvent === "both" && (engagementAttending === "Yes" || weddingAttending === "Yes")) {
        match = true;
      } else if (filterEvent === "wedding" && weddingAttending === "Yes") {
        match = true;
      } else if (filterEvent === "engagement" && engagementAttending === "Yes") {
        match = true;
      }

      if (match) {
        var subject = "Celebration Reminder: Holy Matrimony of Dr. Jerin James & Merin M. Joy";
        var body = "Dear " + guestName + ",\n\n" +
          "Warm greetings from Dr. Jerin James and Merin M. Joy!\n\n" +
          "We are counting down the days to celebrate our Holy Matrimony with you and your family.\n\n" +
          "📅 Event Schedule:\n" +
          "• Holy Matrimony: Monday, 1st February 2027 at 10:30 a.m. at St. Mary's Malankara Catholic Church, Valakom\n" +
          "• Reception: Pratheeksha Auditorium, Valakom\n\n" +
          "View full details and directions anytime on our website:\n" +
          "https://jebin-james.github.io/jerin-wedding/\n\n" +
          "We look forward to your gracious presence, prayers, and blessings.\n\n" +
          "With heartfelt gratitude,\n" +
          "Dr. Jerin James & Merin M. Joy\n" +
          "Family Coordinators: Jebin James (+91 89219 93702) & Jerin Joy (+91 91504 30277)";

        try {
          MailApp.sendEmail(guestEmail, subject, body);
          sentCount++;
        } catch (e) {
          Logger.log("Failed to send to " + guestEmail + ": " + e.toString());
        }
      }
    }
  }

  ui.alert("Success: " + sentCount + " reminder email(s) sent successfully!");
}

function formatSheetColumns() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  sheet.autoResizeColumns(1, HEADERS.length);
}
