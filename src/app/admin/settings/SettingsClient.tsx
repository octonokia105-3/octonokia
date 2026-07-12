'use client'

import { Database, CheckCircle2 } from 'lucide-react'
import GoogleSheetLinker from './GoogleSheetLinker'
import TrackingSettings from './TrackingSettings'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SettingsClient({ config }: { config: any }) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-light tracking-tight">{t.settings.title}</h1>
        <p className="text-muted mt-1">{t.settings.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Sheets Integration Card */}
        <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
                <Database className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-light">{t.settings.googleSheets}</h2>
                <p className="text-sm text-muted">{t.settings.googleSheetsDesc}</p>
              </div>
            </div>
            {config.googleSheetsWebhookUrl ? (
              <span className="bg-green-500/10 text-green-500 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {t.settings.linked}
              </span>
            ) : (
              <span className="bg-urgent/10 text-urgent border border-urgent/30 px-3 py-1 rounded-full text-xs font-bold">
                {t.settings.disconnected}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted leading-relaxed">
              {t.settings.googleSheetsText}
            </p>
            
            <GoogleSheetLinker initialUrl={config.googleSheetsWebhookUrl} />
          </div>
        </div>

        {/* Ad Tracking Integration Card */}
        <TrackingSettings initialConfig={config} />
      </div>
    </div>
  )
}
