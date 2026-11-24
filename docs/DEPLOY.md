# Deployment Guide: Vercel & Supabase

Follow this step-by-step guide to deploy KURMI.FASHIONS to production.

---

## 1. Supabase Database Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab.
3. Copy the contents of [`/lib/db/schema.sql`](/lib/db/schema.sql) and run it. This will create all tables, indexes, constraints, and Row Level Security policies.
4. Go to **Project Settings** > **API**. Note down:
   - `Project URL`
   - `anon public key`
   - `service_role secret key`

---

## 2. Google Sheets Mirror (Optional)

To mirror each inquiry into a live Google Sheet:
1. Open a new Google Sheet.
2. Go to **Extensions** > **Apps Script**.
3. Paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.timestamp,
      data.supporterNumber,
      data.name,
      data.whatsapp,
      data.email,
      data.city,
      data.contactPreference,
      data.items,
      data.notes,
      data.referralCode
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
4. Click **Deploy** > **New Deployment** > Select type **Web app**.
5. Set:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
6. Copy the Web app URL and assign it to `GOOGLE_SHEET_WEBHOOK_URL` in your environment variables.

---

## 3. Vercel Deployment

1. Push your repository to GitHub / GitLab.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. In **Environment Variables**, add:

| Key | Value | Description |
|-----|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Supabase service role key |
| `ADMIN_SECRET` | `your_secure_random_admin_password` | Passcode for `/admin` |
| `GOOGLE_SHEET_WEBHOOK_URL` | `https://script.google.com/...` | (Optional) Apps Script URL |
| `HASH_SALT` | `random_salt_string` | Cryptographic salt for IP hashing |

4. Click **Deploy**. Vercel will build and launch the site globally on edge networks.
