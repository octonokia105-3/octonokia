'use client'

import Link from 'next/link'
import { Search, Filter, Calendar, ShieldBan, ShoppingBag, Edit2 } from 'lucide-react'
import OrderActions from './OrderActions'
import { useLanguage } from '@/contexts/LanguageContext'

export default function OrdersClient({ orders, searchParams }: { orders: any[], searchParams: any }) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-light tracking-tight">{t.orders.title}</h1>
          <p className="text-muted mt-1">{t.orders.subtitle}</p>
        </div>
        
        {/* Client Component for Actions (Sync/Export) */}
        <OrderActions searchParams={searchParams} />
      </div>

      {/* Advanced Filters Bar using native HTML form for instant URL updates */}
      <form method="GET" className="bg-surface-2 border border-border rounded-2xl p-4 shadow-xl flex flex-col gap-4">
        
        {/* Top Row: Search & Status & Toggles */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              name="q"
              defaultValue={searchParams?.q}
              placeholder={t.orders.searchPlaceholder}
              className="w-full bg-void border border-border rounded-xl pl-12 pr-4 py-3 text-light focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Status Filter */}
            <div className="relative flex-1 min-w-[150px]">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <select name="status" defaultValue={searchParams?.status || ""} className="w-full bg-void border border-border rounded-xl pl-9 pr-4 py-3 text-sm text-light focus:outline-none focus:border-gold transition-colors appearance-none">
                <option value="">{t.orders.allStatuses}</option>
                <option value="new">{t.orders.statusNew}</option>
                <option value="awaiting_confirmation">{t.orders.statusAwaiting}</option>
                <option value="confirmed">{t.orders.statusConfirmed}</option>
                <option value="shipped">{t.orders.statusShipped}</option>
                <option value="delivered">{t.orders.statusDelivered}</option>
              </select>
            </div>

            {/* Hide Duplicates Toggle */}
            <label className="flex items-center gap-2 bg-void border border-border rounded-xl px-4 py-3 cursor-pointer hover:border-gold transition-colors">
              <input 
                type="checkbox" 
                name="hide_dupes" 
                defaultChecked={searchParams?.hide_dupes === 'on'}
                className="w-4 h-4 accent-gold"
              />
              <ShieldBan className="w-4 h-4 text-urgent" />
              <span className="text-sm font-bold text-light whitespace-nowrap">{t.orders.hideDupes}</span>
            </label>

            {/* Apply Button */}
            <button type="submit" className="bg-gold hover:bg-gold-hover text-void font-bold py-3 px-6 rounded-xl transition-colors shrink-0">
              {t.orders.apply}
            </button>
          </div>
        </div>

        {/* Bottom Row: Date Filters */}
        <div className="flex flex-wrap items-center gap-4 p-3 bg-void/30 rounded-xl border border-border/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted" />
            <span className="text-sm font-bold text-light">{t.orders.dateRange}</span>
          </div>

          {/* Quick Preset Dropdown */}
          <select name="time" defaultValue={searchParams?.time || "all"} className="bg-void border border-border rounded-xl px-4 py-2 text-sm text-light focus:outline-none focus:border-gold transition-colors appearance-none min-w-[120px]">
            <option value="all">{t.orders.allTime}</option>
            <option value="today">{t.orders.today}</option>
            <option value="week">{t.orders.week}</option>
            <option value="month">{t.orders.month}</option>
          </select>

          <span className="text-muted text-sm font-bold">OR:</span>

          {/* Custom Date Pickers */}
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              name="start_date" 
              defaultValue={searchParams?.start_date} 
              className="bg-void border border-border rounded-xl px-3 py-2 text-sm text-light focus:outline-none focus:border-gold transition-colors" 
              title="Start Date"
            />
            <span className="text-muted text-sm">{t.orders.to}</span>
            <input 
              type="date" 
              name="end_date" 
              defaultValue={searchParams?.end_date} 
              className="bg-void border border-border rounded-xl px-3 py-2 text-sm text-light focus:outline-none focus:border-gold transition-colors" 
              title="End Date"
            />
          </div>
        </div>
      </form>

      {/* Data Table */}
      <div className="bg-surface-2 border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-void/50 text-muted text-sm border-b border-border">
                <th className="p-4 font-bold">{t.orders.tableOrderId}</th>
                <th className="p-4 font-bold">{t.orders.tableDate}</th>
                <th className="p-4 font-bold">{t.orders.tableCustomer}</th>
                <th className="p-4 font-bold">{t.orders.tablePhone}</th>
                <th className="p-4 font-bold">{t.orders.tablePackage}</th>
                <th className="p-4 font-bold">{t.orders.tableAmount}</th>
                <th className="p-4 font-bold">{t.orders.tableStatus}</th>
                <th className="p-4 font-bold text-center">{t.orders.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-light">
              {orders?.length ? orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-void/30 transition-colors group">
                  <td className="p-4 font-mono font-bold text-gold">#{order.display_id}</td>
                  <td className="p-4 text-sm text-muted whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-4">
                    <div className="font-medium flex items-center gap-2">
                      {order.customers?.full_name}
                      {order.duplicate_flag && (
                        <span className="bg-urgent/20 text-urgent text-[10px] px-2 py-0.5 rounded-full uppercase font-black" title={t.orders.repetitiveOrder}>
                          DUP
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm">{order.customers?.phone}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold truncate max-w-[150px]" title={order.package_selected}>{order.package_selected || t.orders.standard}</span>
                      {order.has_order_bump && (
                        <span className="w-fit bg-gold/10 text-gold text-[10px] px-2 py-0.5 rounded-full font-bold">
                          + {t.orders.upsell}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-bold whitespace-nowrap">{order.total_amount} د.م</td>
                  <td className="p-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-4 text-center">
                    <Link 
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex p-2 text-muted hover:text-gold bg-void rounded-lg border border-border hover:border-gold transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                      <p>{t.orders.noOrdersFound}</p>
                      {searchParams?.hide_dupes === 'on' && <p className="text-xs mt-2">{t.orders.tryUncheckingDupes}</p>}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const { t } = useLanguage()
  let colorClass = "bg-void border-border text-muted"
  
  let label = status.replace(/_/g, ' ')
  switch(status) {
    case 'new':
      colorClass = "bg-blue-500/10 border-blue-500/30 text-blue-400"
      label = t.orders.statusNew
      break;
    case 'awaiting_confirmation':
      colorClass = "bg-gold/10 border-gold/30 text-gold"
      label = t.orders.statusAwaiting
      break;
    case 'confirmed':
      colorClass = "bg-success/10 border-success/30 text-success"
      label = t.orders.statusConfirmed
      break;
    case 'delivered':
      colorClass = "bg-green-500/10 border-green-500/30 text-green-400"
      label = t.orders.statusDelivered
      break;
    case 'shipped':
      colorClass = "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
      label = t.orders.statusShipped
      break;
    case 'refused':
    case 'canceled':
    case 'fake_order':
      colorClass = "bg-urgent/10 border-urgent/30 text-urgent"
      break;
  }

  return (
    <span className={`border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colorClass}`}>
      {label}
    </span>
  )
}
