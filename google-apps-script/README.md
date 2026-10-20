# Google Sheets Attendance Backend — Schema Migration & Deployment Guide

This guide explains how to update the Google Apps Script backend connected to your wedding website (`https://jebin-james.github.io/jerin-wedding/`) so that **House Name / Address** and **Family Side** (Bride's Side / Groom's Side) are captured and saved in your Google Spreadsheet.

---

## 1. Google Spreadsheet & Deployment Details

- **Spreadsheet URL**: [https://docs.google.com/spreadsheets/d/19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY/edit](https://docs.google.com/spreadsheets/d/19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY/edit)
- **Spreadsheet ID**: `19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY`
- **Worksheet Name**: `Attendance Responses`
- **Active Web App Endpoint**:
  `https://script.google.com/macros/s/AKfycbx4bropYZRiPuXYIFGqwNYzVvQ2Zhe5BGgZ22hPqfCKDAhu7uwgZn1G18ekv3kN7gpt/exec`

---

## 2. Updated 11-Column Schema

The worksheet `Attendance Responses` must contain these **exact 11 columns in this order**:

| Col # | Column Header | Description |
| :---: | :--- | :--- |
| **1** | `Timestamp` | Date and time of attendance submission |
| **2** | `Guest Name` | Full name of the guest |
| **3** | `House Name / Address` | House name or residence address |
| **4** | `Family Side` | `Bride's Side` or `Groom's Side` |
| **5** | `Email` | Normalized email address (lowercase), or blank if mobile-only |
| **6** | `Mobile Number` | Normalized mobile number (`+91 XXXXX XXXXX`), or blank if email-only |
| **7** | `Engagement Attending` | `Yes` or `No` |
| **8** | `Engagement Attendee Count` | Headcount (1–100 if Yes, 0 if No) |
| **9** | `Wedding Attending` | `Yes` or `No` |
| **10** | `Wedding Attendee Count` | Headcount (1–100 if Yes, 0 if No) |
| **11** | `Message` | Warm wishes, prayers, or personal note |

---

## 3. Idempotent Schema Migration

The updated [`Code.gs`](./Code.gs) includes a dedicated migration function `migrateAttendanceSheetSchema()`:
- **Safe & Non-Destructive**: Preserves all existing historical responses.
- **Idempotent**: Detects whether columns are already migrated; running it multiple times will **never** duplicate columns.
- **Two Columns Inserted**: Inserts `House Name / Address` and `Family Side` directly after `Guest Name`, shifting historical emails, phone numbers, and attendance counts into columns 5–11.
- **Historical Data Preserved**: Leaves the two new columns blank for past entries (no invented values).
- **Safety Stop**: If the sheet has an unrecognized schema, it halts immediately with an error rather than corrupting data.

---

## 4. Step-by-Step Instructions to Update & Deploy

Follow these steps to update your live Apps Script and migrate the Google Sheet:

### Step A: Open Apps Script Project
1. Open your Google Spreadsheet:  
   [https://docs.google.com/spreadsheets/d/19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY/edit](https://docs.google.com/spreadsheets/d/19S0UbbDwlOiemQiBegZC7wCawXr5zLi91_AmbSsNejY/edit)
2. In the top menu bar, click **Extensions** > **Apps Script**.

### Step B: Replace Code in `Code.gs`
1. In the Apps Script file navigator on the left, select `Code.gs`.
2. Select all text (`Ctrl + A`) and delete it.
3. Copy the complete code from [`google-apps-script/Code.gs`](./Code.gs) in this repository and paste it into the editor.
4. Click the **Save** icon (`Ctrl + S`).

### Step C: Run the Schema Migration Function
1. In the toolbar at the top of the Apps Script editor, locate the **function dropdown** (next to *Debug* and *Run*).
2. Select `migrateAttendanceSheetSchema` from the dropdown list.
3. Click **Run**.
4. If prompted with *"Authorization required"*, click **Review permissions** > select your Google Account > click **Advanced** > **Go to Wedding RSVP Backend (unsafe)** > click **Allow**.
5. The execution log at the bottom will display:
   ```text
   Successfully migrated X row(s) to the 11-column schema.
   ```
   *(Or `"Sheet is already migrated to 11-column schema."` if already up to date).*

### Step D: Verify the Spreadsheet Headers
1. Switch back to your Google Sheet tab.
2. Check the `Attendance Responses` worksheet:
   - Header row contains the 11 columns in the exact order listed above.
   - Pre-existing response rows have their Guest Names, Emails, Mobiles, and Attendance counts properly aligned under the new columns.
   - Columns C (`House Name / Address`) and D (`Family Side`) are blank for historical records.

### Step E: Deploy a New Version of the Web App
1. Return to the Apps Script editor.
2. In the top right corner, click **Deploy** > **Manage deployments**.
3. In the dialog that appears, click the **Edit (pencil icon)** on the active Web App deployment.
4. In the **Version** dropdown, select **New version** (e.g. Version 3).
5. Ensure:
   - **Execute as**: `Me (<your-email>)`
   - **Who has access**: `Anyone`
6. Click **Deploy**.
7. The Web App URL remains **identical**:
   `https://script.google.com/macros/s/AKfycbx4bropYZRiPuXYIFGqwNYzVvQ2Zhe5BGgZ22hPqfCKDAhu7uwgZn1G18ekv3kN7gpt/exec`

---

## 5. End-to-End Verification

1. Open your live wedding invitation website:  
   [https://jebin-james.github.io/jerin-wedding/](https://jebin-james.github.io/jerin-wedding/)
2. Scroll to the RSVP section.
3. Fill in:
   - Full Name: `Test Guest`
   - House Name / Address: `Test Residence, Kollam`
   - Family Side: Select `Groom's Side` (or `Bride's Side`)
   - Mobile: `9876543210`
   - Attendance: `Joyfully Accept` for Wedding
4. Click **Confirm Attendance**.
5. Once the confirmation message appears with confetti, open your Google Sheet.
6. Verify that the new row appears with all 11 columns populated accurately, including House Name and Family Side!

---

## 6. Troubleshooting: "The existing sheet headers do not match the expected format"

If you encounter this error message:
- **Cause**: An earlier version of the Apps Script deployment contained a rigid header comparison check in `doPost` that rejected submissions if column count exceeded 11 (such as legacy column 12 from previous WhatsApp formulas) or if column header labels differed in casing or wording (e.g. `Full Name` vs `Guest Name`, `Email Address` vs `Email`).
- **Solution**: The updated [`Code.gs`](./Code.gs) eliminates this fragile check. It automatically synchronizes columns 1..11 (`A1:K1`) to the canonical headers, cleans up any legacy 12th column, and writes data strictly into columns A through K of the new row without rejecting guest submissions.
- **Action**: Replace `Code.gs` in the Google Apps Script editor with the latest version from this repository, then click **Deploy** > **Manage deployments** > **Edit** > **New version** > **Deploy**.

