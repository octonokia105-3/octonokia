import { createClient } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'
import SettingsClient from './SettingsClient'

export default async function AdminSettingsPage() {
  const supabase = await createClient()

  // Read current configuration
  let config: any = { googleSheetsWebhookUrl: '' }
  try {
    const configPath = path.join(process.cwd(), 'store-config.json')
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    }
  } catch (e) {}

  return <SettingsClient config={config} />
}
