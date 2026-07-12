'use client'

import { useState } from 'react'
import { Link2, ShieldCheck, X, ArrowRight } from 'lucide-react'
import { saveGoogleSheetsWebhook } from '@/app/actions/settings'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GoogleSheetLinker({ initialUrl }: { initialUrl: string }) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState(initialUrl || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    // Validate email format
    if (!url.includes('@') || !url.includes('.')) {
      alert("Please enter a valid email address.")
      return
    }
    setIsSaving(true)
    const res = await saveGoogleSheetsWebhook(url)
    setIsSaving(false)
    if (res.success) {
      setIsOpen(false)
      window.location.reload()
    } else {
      alert("Failed to save account.")
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-void border border-border hover:border-green-500 text-light font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group"
      >
        <Link2 className="w-5 h-5 text-muted group-hover:text-green-500 transition-colors" /> 
        {initialUrl ? t.settings.manageConnection : t.settings.linkAccount}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-6 border-b border-border bg-surface-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-light">{t.settings.connectAccount}</h3>
                  <p className="text-sm text-muted">{t.settings.secureConnection}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted hover:text-light transition-colors p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-center">
              <p className="text-light text-sm">
                {t.settings.googleSheetsText}
              </p>

              <div className="space-y-2 text-left">
                <label className="text-sm font-bold text-light">{t.settings.enterEmail}</label>
                <input 
                  type="email"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t.settings.emailPlaceholder}
                  className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border bg-surface-2 flex justify-end gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-xl text-muted hover:text-light font-bold transition-colors"
              >
                {t.settings.cancel}
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving || !url}
                className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-xl transition-colors flex items-center gap-2"
              >
                {isSaving ? t.settings.linking : t.settings.linkAccount} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
