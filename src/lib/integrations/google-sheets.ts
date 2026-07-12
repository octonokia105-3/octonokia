// Simple server-side fetch to push row data to a Google Apps Script Webhook.
// This is the most robust way to integrate Google Sheets into a template without
// forcing the user to manage complex GCP Service Account JSON keys.

import fs from 'fs'
import path from 'path'

export async function syncOrderToGoogleSheets(orderData: any) {
  let webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  
  // Also check dynamic config saved from the Admin UI
  try {
    const configPath = path.join(process.cwd(), 'store-config.json')
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      if (config.googleSheetsWebhookUrl) {
        webhookUrl = config.googleSheetsWebhookUrl
      }
    }
  } catch (e) {}

  if (!webhookUrl) {
    console.warn("Google Sheets Webhook URL is missing. Skipping sync.")
    return false
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    })

    const result = await response.json()
    
    if (result.status === 'success') {
      return true
    } else {
      console.error("Google Sheets Webhook returned error:", result)
      return false
    }
  } catch (error) {
    console.error("Failed to call Google Sheets Webhook:", error)
    return false
  }
}
