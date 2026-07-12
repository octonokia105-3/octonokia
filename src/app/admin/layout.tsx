'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, ShoppingBag, PhoneCall, Users, BarChart3, Settings, LogOut, Globe } from 'lucide-react'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'

function SidebarContent() {
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()
  
  const handleSignOut = async () => {
    const sb = createClient()
    await sb.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 bg-surface-2 border-r border-border hidden md:flex flex-col shrink-0">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
            <span className="text-void font-black text-lg">A</span>
          </div>
          <span className="font-black text-light text-xl tracking-tight">{t.sidebar.admin}</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavLink href="/admin" icon={<LayoutDashboard className="w-5 h-5" />} label={t.sidebar.overview} />
        <NavLink href="/admin/orders" icon={<ShoppingBag className="w-5 h-5" />} label={t.sidebar.orders} />
        <NavLink href="/admin/call-center" icon={<PhoneCall className="w-5 h-5" />} label={t.sidebar.callCenter} />
        <NavLink href="/admin/customers" icon={<Users className="w-5 h-5" />} label={t.sidebar.customers} />
        <NavLink href="/admin/analytics" icon={<BarChart3 className="w-5 h-5" />} label={t.sidebar.analytics} />
        <NavLink href="/admin/settings" icon={<Settings className="w-5 h-5" />} label={t.sidebar.settings} />
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        {/* Language Switcher */}
        <div className="flex items-center justify-between px-4 py-2 bg-void/50 rounded-lg border border-border">
          <div className="flex items-center gap-2 text-muted">
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{language === 'en' ? 'English' : 'عربي'}</span>
          </div>
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="text-xs font-bold text-gold hover:underline"
          >
            {language === 'en' ? 'عربي' : 'EN'}
          </button>
        </div>

        <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2 w-full text-muted hover:text-urgent hover:bg-urgent/10 rounded-lg transition-colors font-medium">
          <LogOut className="w-5 h-5" />
          <span>{t.sidebar.signOut}</span>
        </button>
      </div>
    </aside>
  )
}

function NavLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-light hover:bg-void transition-all font-bold">
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-void flex">
        <SidebarContent />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-surface-2 border-b border-border flex items-center justify-end px-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-light">admin@arwa.store</div>
                <div className="text-xs text-muted">Administrator</div>
              </div>
              <div className="w-10 h-10 bg-void rounded-full border border-border flex items-center justify-center">
                <span className="text-light font-bold">AD</span>
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}
