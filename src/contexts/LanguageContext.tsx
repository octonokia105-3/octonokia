'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, dictionaries } from '@/locales/dictionaries'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof dictionaries.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Arabic as requested by user
  const [language, setLanguageState] = useState<Language>('ar')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedLang = localStorage.getItem('adminLanguage') as Language
    if (storedLang && (storedLang === 'en' || storedLang === 'ar')) {
      setLanguageState(storedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('adminLanguage', lang)
  }

  // Prevent hydration mismatch by returning null until mounted, 
  // or just render with default but avoid layout shifts.
  if (!mounted) {
    return <div className="min-h-screen bg-void flex items-center justify-center text-gold">Loading...</div>
  }

  const t = dictionaries[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-cairo' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
