'use client'

import { useState } from 'react'
import { Webhook, Save, CheckCircle2 } from 'lucide-react'
import { saveTrackingConfig } from '@/app/actions/settings'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TrackingSettings({ initialConfig }: { initialConfig: any }) {
  const { t } = useLanguage()
  const [metaPixelId, setMetaPixelId] = useState(initialConfig?.metaPixelId || '')
  const [metaCapiToken, setMetaCapiToken] = useState(initialConfig?.metaCapiToken || '')
  const [tiktokPixelId, setTiktokPixelId] = useState(initialConfig?.tiktokPixelId || '')
  const [googleAdsId, setGoogleAdsId] = useState(initialConfig?.googleAdsId || '')
  
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const res = await saveTrackingConfig({ metaPixelId, metaCapiToken, tiktokPixelId, googleAdsId })
    setIsSaving(false)
    if (res.success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      alert("Failed to save tracking settings.")
    }
  }

  return (
    <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
            <Webhook className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-black text-light">{t.settings.adTracking}</h2>
            <p className="text-sm text-muted">{t.settings.adTrackingDesc}</p>
          </div>
        </div>
        {saved ? (
          <span className="bg-green-500/10 text-green-500 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {t.settings.saved}
          </span>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-light">{t.settings.metaPixelId}</label>
          <input 
            type="text" 
            value={metaPixelId}
            onChange={(e) => setMetaPixelId(e.target.value)}
            placeholder="e.g. 123456789012345" 
            className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-light">{t.settings.metaCapiToken}</label>
          <input 
            type="password" 
            value={metaCapiToken}
            onChange={(e) => setMetaCapiToken(e.target.value)}
            placeholder="Paste your long CAPI Access Token here..." 
            className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-xs text-muted">{t.settings.metaCapiDesc}</p>
        </div>

        <div className="space-y-2 pt-4 border-t border-border">
          <label className="text-sm font-bold text-light">{t.settings.tiktokPixelId}</label>
          <input 
            type="text" 
            value={tiktokPixelId}
            onChange={(e) => setTiktokPixelId(e.target.value)}
            placeholder="e.g. C1234567890ABCDEF" 
            className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2 pt-4 border-t border-border">
          <label className="text-sm font-bold text-light">Google Ads Tag ID</label>
          <input 
            type="text" 
            value={googleAdsId}
            onChange={(e) => setGoogleAdsId(e.target.value)}
            placeholder="e.g. AW-123456789" 
            className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
        >
          <Save className="w-5 h-5" />
          {isSaving ? t.settings.saving : t.settings.saveTrackingSettings}
        </button>
      </div>
    </div>
  )
}
