'use server'

import { createClient } from '@/lib/supabase/server'

export async function getStoreSettings() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .eq('id', 1)
      .single()
      
    if (error && error.code !== 'PGRST116') {
      console.error("Error fetching settings:", error)
      return null
    }
    return data
  } catch (err) {
    return null
  }
}

export async function saveGoogleSheetsWebhook(url: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('store_settings')
      .upsert({ id: 1, google_sheets_webhook_url: url })
      
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function saveTrackingConfig(data: { metaPixelId?: string; metaCapiToken?: string; tiktokPixelId?: string; googleAdsId?: string }) {
  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('store_settings')
      .upsert({ 
        id: 1, 
        meta_pixel_id: data.metaPixelId || '',
        meta_capi_token: data.metaCapiToken || '',
        tiktok_pixel_id: data.tiktokPixelId || '',
        google_ads_id: data.googleAdsId || ''
      })
      
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
