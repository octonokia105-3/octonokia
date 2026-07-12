import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PhoneCall, Clock, CheckCircle2, XCircle } from 'lucide-react'

export default async function CallCenterPage() {
  const supabase = await createClient()

  // Fetch only orders that need attention from the call center
  const { data: queue } = await supabase
    .from('orders')
    .select('id, display_id, total_amount, status, created_at, duplicate_flag, customers(full_name, phone, city)')
    .in('status', ['new', 'awaiting_confirmation', 'no_answer'])
    .order('created_at', { ascending: true }) // Oldest first to process queue fairly

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-light tracking-tight flex items-center gap-3">
          <PhoneCall className="w-8 h-8 text-gold" />
          Call Center Queue
        </h1>
        <p className="text-muted mt-1">Orders requiring immediate confirmation calls.</p>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface-2 border border-border rounded-2xl p-4 shadow-xl">
          <p className="text-sm text-muted font-bold">Total in Queue</p>
          <p className="text-3xl font-black text-light">{queue?.length || 0}</p>
        </div>
        <div className="bg-surface-2 border border-urgent/30 rounded-2xl p-4 shadow-xl">
          <p className="text-sm text-urgent font-bold">No Answer (Retry)</p>
          <p className="text-3xl font-black text-urgent">
            {queue?.filter(o => o.status === 'no_answer').length || 0}
          </p>
        </div>
      </div>

      {/* Actionable Queue List */}
      <div className="bg-surface-2 border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-border bg-void/50 flex justify-between items-center">
          <h2 className="font-bold text-light">Prioritized Queue (Oldest First)</h2>
        </div>
        <div className="divide-y divide-border">
          {queue?.length ? queue.map((order: any) => (
            <div key={order.id} className="p-6 hover:bg-void/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono font-black text-gold text-lg">#{order.display_id}</span>
                  {order.status === 'no_answer' && (
                    <span className="bg-urgent/10 text-urgent text-xs px-2 py-1 rounded font-bold uppercase">Retry Call</span>
                  )}
                  {order.status === 'new' && (
                    <span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded font-bold uppercase">Fresh Order</span>
                  )}
                  {order.duplicate_flag && (
                    <span className="bg-urgent text-white text-xs px-2 py-1 rounded font-black uppercase shadow-[0_0_10px_rgba(255,0,0,0.3)] animate-pulse">
                      Duplicate Warning
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-light">{order.customers.full_name}</h3>
                <p className="text-muted flex items-center gap-2 mt-1">
                  <span>{order.customers.city}</span>
                  <span className="w-1 h-1 bg-border rounded-full"></span>
                  <span className="font-bold text-light">{order.total_amount} د.م</span>
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="bg-void border border-border px-4 py-2 rounded-xl text-center w-full">
                  <p className="text-xs text-muted mb-1">Phone Number</p>
                  <p className="text-lg font-mono font-black text-light tracking-wider">{order.customers.phone}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                <a 
                  href={`https://wa.me/${order.customers.phone.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl text-center transition-colors shadow-lg"
                >
                  WhatsApp
                </a>
                <Link 
                  href={`/admin/orders/${order.id}`}
                  className="bg-gold hover:bg-gold-hover text-void font-bold py-2 px-6 rounded-xl text-center transition-colors shadow-[0_5px_20px_rgba(232,184,58,0.3)]"
                >
                  Open Order to Confirm
                </Link>
              </div>

            </div>
          )) : (
            <div className="p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-light mb-2">Queue is Empty!</h3>
              <p className="text-muted">All orders have been processed. Great job!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
