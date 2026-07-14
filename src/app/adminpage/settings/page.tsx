import { getStoreSettings } from '@/app/actions/settings'
import SettingsClient from './SettingsClient'

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings()
  
  // Map snake_case from DB to camelCase for the client component
  const config = {
    googleSheetsWebhookUrl: settings?.google_sheets_webhook_url || '',
    metaPixelId: settings?.meta_pixel_id || '',
    metaCapiToken: settings?.meta_capi_token || '',
    tiktokPixelId: settings?.tiktok_pixel_id || '',
    googleAdsId: settings?.google_ads_id || ''
  }

  return <SettingsClient config={config} />
}
