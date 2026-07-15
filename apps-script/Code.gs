/**
 * AP.com — form submissions backend (Google Apps Script).
 *
 * Paste this into the Apps Script editor of the spreadsheet
 * "AP.com — Form Submissions":
 * https://docs.google.com/spreadsheets/d/1uTyjGF-HVlLvfwXHynk5fxxtmp5v311PSzi6MELt0IY/edit
 * (Extensions → Apps Script), then Deploy → New deployment → Web app
 * with "Execute as: Me" and "Who has access: Anyone".
 *
 * The site posts every form (Contact, Business Advisory, Demo Session,
 * Newsletter) here via src/lib/forms.ts. Each submission is appended to
 * the tab matching its form type and emailed to NOTIFY_EMAIL.
 * Full setup guide: docs/forms-google-sheets.md
 */

const NOTIFY_EMAIL = "performance@noboruworld.com";

const HEADERS = [
  "Timestamp", "Name", "Email", "Phone", "Company",
  "Source Page", "Form Type", "Submitted Data", "Status",
];

const TABS = [
  "Contact", "Business Advisory", "Demo Session",
  "Newsletter", "General Enquiries",
];

function doPost(e) {
  const p = JSON.parse(e.postData.contents);
  const tab = TABS.includes(p.formType) ? p.formType : "General Enquiries";
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(tab);
  if (!sheet) {
    sheet = ss.insertSheet(tab);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    p.timestamp || new Date().toISOString(),
    p.name || "", p.email || "", p.phone || "", p.company || "",
    p.sourcePage || "", p.formType || "",
    JSON.stringify(p.data || {}), p.status || "New",
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "[AP.com] New " + tab + " submission — " + (p.name || p.email || "visitor"),
    body: [
      "Form: " + (p.formType || "—"),
      "Page: " + (p.sourcePage || "—"),
      "Time: " + (p.timestamp || "—"),
      "",
      "Name: " + (p.name || "—"),
      "Email: " + (p.email || "—"),
      "Phone: " + (p.phone || "—"),
      "Company: " + (p.company || "—"),
      "",
      "Details:",
    ]
      .concat(Object.entries(p.data || {}).map(function (kv) { return "  " + kv[0] + ": " + kv[1]; }))
      .join("\n"),
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
