# Forms → Google Sheets + Email Notifications

Every form on the site (Contact, Business Advisory, Demo Session, Newsletter)
posts through one shared function — `submitForm` in `src/lib/forms.ts` — so the
frontend never changes when the backend does.

Until the real backend exists, submissions land in **one Google Spreadsheet**
(a tab per form) and trigger an email to **performance@noboruworld.com**.

## 1. The spreadsheet

The spreadsheet already exists (owned by ai.noboruworld@gmail.com):

**[AP.com — Form Submissions](https://docs.google.com/spreadsheets/d/1uTyjGF-HVlLvfwXHynk5fxxtmp5v311PSzi6MELt0IY/edit)**

The script creates these tabs automatically on first submission:

- `Contact`
- `Business Advisory`
- `Demo Session`
- `Newsletter`
- `General Enquiries`

Each row: `Timestamp · Name · Email · Phone · Company · Source Page · Form Type · Submitted Data · Status` (Status defaults to `New`).

## 2. Add the Apps Script

In the spreadsheet: **Extensions → Apps Script**, replace the contents with
the script from [`apps-script/Code.gs`](../apps-script/Code.gs) (same code below):

```js
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

  const extra = JSON.stringify(p.data || {});
  sheet.appendRow([
    p.timestamp || new Date().toISOString(),
    p.name || "", p.email || "", p.phone || "", p.company || "",
    p.sourcePage || "", p.formType || "", extra, p.status || "New",
  ]);

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: `[AP.com] New ${tab} submission — ${p.name || p.email || "visitor"}`,
    body: [
      `Form: ${p.formType}`,
      `Page: ${p.sourcePage}`,
      `Time: ${p.timestamp}`,
      ``,
      `Name: ${p.name || "—"}`,
      `Email: ${p.email || "—"}`,
      `Phone: ${p.phone || "—"}`,
      `Company: ${p.company || "—"}`,
      ``,
      `Details:`,
      ...Object.entries(p.data || {}).map(([k, v]) => `  ${k}: ${v}`),
    ].join("\n"),
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy

**Deploy → New deployment → Web app**
- Execute as: **Me**
- Who has access: **Anyone**

Copy the web app URL (`https://script.google.com/macros/s/…/exec`).

## 4. Connect the site

Set the URL as an environment variable (Vercel/hosting dashboard or `.env.local`):

```
NEXT_PUBLIC_FORMS_ENDPOINT=https://script.google.com/macros/s/…/exec
```

Redeploy. Done — all four forms now write to the sheet and notify by email.

## Notes

- Requests are sent as `text/plain` with `mode: "no-cors"` — the supported,
  preflight-free way to call an Apps Script web app from a browser.
- With no endpoint configured the forms still complete for the visitor and log
  the payload to the console, so the frontend is testable standalone.
- When the real backend ships, replace the body of `submitForm` only; every
  form component stays as-is.
