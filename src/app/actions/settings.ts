'use server'

import fs from 'fs'
import path from 'path'

function getConfigPath() {
  return path.join(process.cwd(), 'store-config.json')
}

function readConfig() {
  const configPath = getConfigPath()
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'))
  }
  return {}
}

function writeConfig(config: any) {
  const configPath = getConfigPath()
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}

export async function saveGoogleSheetsWebhook(url: string) {
  try {
    const config = readConfig()
    config.googleSheetsWebhookUrl = url
    writeConfig(config)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function saveTrackingConfig(data: { metaPixelId?: string; metaCapiToken?: string; tiktokPixelId?: string }) {
  try {
    const config = readConfig()
    config.metaPixelId = data.metaPixelId || ''
    config.metaCapiToken = data.metaCapiToken || ''
    config.tiktokPixelId = data.tiktokPixelId || ''
    writeConfig(config)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
