# 📊 Google Sheets Sync Guide

Your Cash-on-Delivery Admin Dashboard has a powerful, built-in Google Sheets sync engine. You can connect it to **any Gmail account** at any time.

There are two ways it syncs:
1. **Real-Time Auto-Sync:** Every time a customer places a new order on your storefront, it instantly appears in your Google Sheet.
2. **Bulk Filter Sync:** On your Orders Dashboard, you can filter orders (e.g. "Last 7 Days") and click "Sync to Sheets" to blast the entire list into your Google Sheet at once.

## How to Connect Your Gmail Account

Follow these steps to connect any Gmail account to your store:

### Step 1: Create a Google Sheet
1. Open your browser, log into the Gmail account you want to use, and go to [Google Sheets](https://sheets.google.com).
2. Create a blank spreadsheet and name it something like `Arwa Store Orders`.
3. In the first row, add these headers exactly:
   - A1: `Order ID`
   - B1: `Date`
   - C1: `Customer Name`
   - D1: `Phone`
   - E1: `City`
   - F1: `Address`
   - G1: `Amount`
   - H1: `Status`
   - I1: `Is Duplicate`

### Step 2: Add the Sync Script
1. In your Google Sheet, click **Extensions** > **Apps Script** in the top menu.
2. Delete any code there, and paste this exact script:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Add the row
    sheet.appendRow([
      data.order_id || "",
      data.date || "",
      data.customer_name || "",
      data.phone || "",
      data.city || "",
      data.address || "",
      data.amount || "",
      data.status || "",
      data.is_duplicate || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy & Get Webhook URL
1. Click the blue **Deploy** button at the top right, then select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill out the form exactly like this:
   - **Description**: Store Webhook
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone (Very important! Must be "Anyone" so your website can send data to it).
4. Click **Deploy**. (Google will ask you to authorize access—click Advanced > Go to script).
5. Copy the **Web app URL** it gives you! (It will look like `https://script.google.com/macros/s/.../exec`).

### Step 4: Link it to your Website
1. Go back to your project folder: `C:\Users\USER\.gemini\antigravity\scratch\official-store`
2. Open the `.env.local` file.
3. Paste the URL you copied like this:
   `GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_URL/exec"`

**You are done!** 
Any new orders will automatically appear in your sheet, and clicking the green "Sync to Sheets" button on your admin dashboard will push your filtered orders there instantly. You can repeat this process to link a different Gmail account whenever you want!
