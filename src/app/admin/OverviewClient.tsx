'use client'

import Link from 'next/link'
import { ShoppingBag, PhoneCall, CheckCircle2, TrendingUp, AlertCircle, RefreshCcw } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function OverviewClient({ 
  ordersToday, 
  ordersWeek, 
  ordersMonth, 
  ordersAllTime, 
  recentOrders 
}: any) {
  const { t } = useLanguage()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-light tracking-tight">{t.overview.title}</h1>
        <p className="text-muted mt-1">{t.overview.subtitle}</p>
      </div>

      {/* Stats Grid - Time Based */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t.overview.totalOrders + " (Today)"} 
          value={ordersToday || 0} 
          icon={<ShoppingBag className="text-green-500" />}
          trend="Most Important Metric"
          urgent={ordersToday ? ordersToday > 0 : false}
        />
        <StatCard 
          title={t.overview.totalOrders + " (This Week)"} 
          value={ordersWeek || 0} 
          icon={<TrendingUp className="text-blue-500" />}
          trend="Last 7 Days"
        />
        <StatCard 
          title={t.overview.totalOrders + " (This Month)"} 
          value={ordersMonth || 0} 
          icon={<AlertCircle className="text-gold" />}
          trend="Last 30 Days"
        />
        <StatCard 
          title={t.overview.totalOrders + " (All Time)"} 
          value={ordersAllTime || 0} 
          icon={<CheckCircle2 className="text-purple-500" />}
          trend="Lifetime Volume"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-surface-2 border border-border rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-black text-light">{t.overview.recentOrders}</h2>
            <button onClick={() => window.location.reload()} className="text-gold text-sm font-bold hover:underline flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-void/50 text-muted text-sm border-b border-border">
                  <th className="p-4 font-bold">{t.orders.tableOrderId}</th>
                  <th className="p-4 font-bold">{t.orders.tableCustomer}</th>
                  <th className="p-4 font-bold">{t.orders.tableAmount}</th>
                  <th className="p-4 font-bold">{t.orders.tableStatus}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-light">
                {recentOrders?.length ? recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-void/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-gold">#{order.display_id}</td>
                    <td className="p-4 font-medium">{order.customers?.full_name}</td>
                    <td className="p-4 font-bold">{order.total_amount} د.م</td>
                    <td className="p-4">
                      <span className="bg-void border border-border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-muted">
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted">{t.orders.noOrdersFound}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Center / Quick Links */}
        <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-black text-light">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/call-center" className="w-full bg-gold hover:bg-gold-hover text-void font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between">
              <span>{t.sidebar.callCenter}</span>
              <PhoneCall className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, trend, urgent = false }: any) {
  return (
    <div className={`bg-surface-2 border rounded-2xl p-6 shadow-xl ${urgent ? 'border-urgent/50 bg-urgent/5' : 'border-border'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-void border border-border flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-muted text-sm font-bold mb-1">{title}</h3>
        <div className="text-3xl font-black text-light">{value}</div>
        <p className={`text-xs font-medium mt-2 ${urgent ? 'text-urgent' : 'text-success'}`}>{trend}</p>
      </div>
    </div>
  )
}
