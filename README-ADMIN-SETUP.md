# Admin Dashboard Setup Guide

You have successfully received the complete, production-ready Cash-on-Delivery Admin Dashboard codebase! 

Because this system handles real data, real authentication, and real Google Sheets synchronization, you must connect it to your own secure accounts. Follow these steps exactly to go live.

## 1. Supabase (Database & Auth) Setup
1. Go to [Supabase.com](https://supabase.com) and create a new project.
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open the `supabase_schema.sql` file provided in this repository, copy all the text, and paste it into the SQL Editor. Click **Run**. This creates all your tables, roles, and security policies.
4. Go to **Project Settings -> API**.
5. Open the `.env.local` file in your project (copy `.env.example` if it doesn't exist).
6. Copy the `Project URL` and paste it as `NEXT_PUBLIC_SUPABASE_URL`.
7. Copy the `anon` public key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
8. Copy the `service_role` secret key and paste it as `SUPABASE_SERVICE_ROLE_KEY`. (Keep this safe!)
9. Go to **Authentication -> Users** in Supabase and click "Add User". Create an email and password. This will be your Admin Login!

## 2. Google Sheets Setup
Instead of messing with complex Google Cloud JSON keys, we use a highly reliable Webhook pattern.
1. Create a new Google Sheet.
2. Name the first tab `Orders`. Add these columns in Row 1: `Order ID`, `Date`, `Customer`, `Phone`, `City`, `Address`, `Package`, `Total`, `Status`.
3. Click **Extensions -> Apps Script**.
4. Paste the following code:
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.order_id, data.date, data.customer_name, data.phone, data.city, data.address, data.package, data.total, data.status]);
  return ContentService.createTextOutput("Success");
}
```
5. Click **Deploy -> New Deployment**. Choose type `Web app`. Set "Who has access" to `Anyone`.
6. Copy the **Web app URL** it gives you.
7. Paste this URL into your `.env.local` file as `GOOGLE_SHEETS_WEBHOOK_URL="your-url"`.

## 3. Vercel Deployment
1. Push your code to a private GitHub repository.
2. Import the repository into [Vercel](https://vercel.com).
3. In the Vercel Environment Variables settings, add all the keys from your `.env.local` file (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_SHEETS_WEBHOOK_URL`).
4. Click Deploy!

## 4. Test Checklist
Once deployed, verify the system:
- [ ] Open the Storefront, fill out a fake order, and click Submit.
- [ ] Verify you see the green Success message.
- [ ] Open your Google Sheet and verify the row appeared instantly.
- [ ] Go to `/admin` on your website. Login with the email/password you created in Supabase.
- [ ] Go to Orders and click on the new order you just made.
- [ ] Try changing the status from "New" to "Confirmed". Verify the timeline updates!

## Next Recommended Improvements
Once you are comfortable with this setup, consider adding:
1. **Pixels**: Add your Meta/TikTok base code to `src/app/layout.tsx` and trigger `fbq('track', 'Purchase')` inside the `if (state?.success)` block in `CheckoutForm.tsx`.
2. **Multi-User Roles**: Manually edit the `profiles` table in Supabase to give employees `confirmation_agent` roles so they can only see specific statuses.
