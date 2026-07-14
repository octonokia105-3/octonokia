import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { User, MapPin, Package, Clock, Phone, AlertTriangle, MessageSquare, Save } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default async function OrderDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()

  // Fetch Order
  const { data: order } = await supabase
    .from('orders')
    .select('*, customers(*), order_notes(*), order_status_history(*)')
    .eq('id', params.id)
    .single()

  if (!order) {
    notFound()
  }

  // Action for updating status
  async function updateStatus(formData: FormData) {
    'use server'
    const newStatus = formData.get('status') as string
    const note = formData.get('note') as string
    const sb = await createClient()
    
    // Auth check
    const { data: { user } } = await sb.auth.getUser()
    if (!user) return

    // Update order
    await sb.from('orders').update({ status: newStatus }).eq('id', order.id)

    // Add to history
    await sb.from('order_status_history').insert({
      order_id: order.id,
      old_status: order.status,
      new_status: newStatus,
      changed_by: user.id,
      note: note || null
    })

    revalidatePath(`/admin/orders/${order.id}`)
  }

  // Action for adding note
  async function addNote(formData: FormData) {
    'use server'
    const noteText = formData.get('note_text') as string
    if (!noteText.trim()) return

    const sb = await createClient()
    const { data: { user } } = await sb.auth.getUser()
    
    await sb.from('order_notes').insert({
      order_id: order.id,
      author_id: user?.id,
      note_text: noteText
    })

    revalidatePath(`/admin/orders/${order.id}`)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-light tracking-tight flex items-center gap-3">
            Order #{order.display_id}
            {order.duplicate_flag && (
              <span className="bg-urgent/20 text-urgent text-sm px-3 py-1 rounded-full uppercase font-black flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Duplicate Warning
              </span>
            )}
          </h1>
          <p className="text-muted mt-1">
            Submitted on {new Date(order.created_at).toLocaleString('en-GB')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Card */}
          <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-black text-light mb-4 flex items-center gap-2 border-b border-border pb-4">
              <User className="w-5 h-5 text-gold" /> Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted mb-1">Full Name</p>
                <p className="text-light font-bold text-lg">{order.customers.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Phone Number</p>
                <div className="flex items-center gap-2">
                  <p className="text-light font-bold text-lg font-mono">{order.customers.phone}</p>
                  <a href={`https://wa.me/${order.customers.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-green-500/20 text-green-500 p-1.5 rounded-lg hover:bg-green-500/30 transition-colors">
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted mb-1">Shipping Address</p>
                <div className="flex items-start gap-2 text-light font-medium bg-void border border-border rounded-xl p-4">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold mb-1">{order.customers.city}</span>
                    <span className="text-muted">{order.customers.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Card */}
          <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-black text-light mb-4 flex items-center gap-2 border-b border-border pb-4">
              <Package className="w-5 h-5 text-gold" /> Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-void border border-border rounded-xl">
                <div>
                  <p className="text-light font-bold">{order.package_selected}</p>
                  <p className="text-sm text-muted">Main Package</p>
                </div>
              </div>
              
              {order.has_order_bump && (
                <div className="flex justify-between items-center p-4 bg-gold/5 border border-gold/30 rounded-xl">
                  <div>
                    <span className="bg-urgent text-white text-[10px] px-2 py-0.5 rounded uppercase font-black mr-2">Upsell</span>
                    <span className="text-light font-bold">Premium Protection Case</span>
                  </div>
                  <span className="text-gold font-black">+49 د.م</span>
                </div>
              )}

              <div className="pt-4 flex justify-between items-center border-t border-border">
                <span className="text-lg text-muted font-bold">Total Cash to Collect</span>
                <span className="text-3xl font-black text-gold">{order.total_amount} د.م</span>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-black text-light mb-4 flex items-center gap-2 border-b border-border pb-4">
              <MessageSquare className="w-5 h-5 text-gold" /> Internal Notes
            </h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {order.order_notes?.length > 0 ? order.order_notes.map((note: any) => (
                <div key={note.id} className="bg-void border border-border rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gold">Agent Note</span>
                    <span className="text-xs text-muted">{new Date(note.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-light text-sm">{note.note_text}</p>
                </div>
              )) : (
                <p className="text-muted text-sm text-center py-4">No internal notes yet.</p>
              )}
            </div>

            <form action={addNote} className="flex gap-3">
              <input 
                type="text" 
                name="note_text"
                placeholder="Type a note about this order..." 
                className="flex-1 bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors"
                required
              />
              <button type="submit" className="bg-gold text-void font-bold px-6 rounded-xl hover:bg-gold-hover transition-colors">
                Add
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Workflow Actions */}
        <div className="space-y-6">
          
          {/* Status Updater */}
          <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl sticky top-6">
            <h2 className="text-lg font-black text-light mb-4 flex items-center gap-2 border-b border-border pb-4">
              <Clock className="w-5 h-5 text-gold" /> Update Status
            </h2>
            
            <div className="mb-6">
              <p className="text-sm text-muted mb-1">Current Status</p>
              <div className="bg-void border border-border px-4 py-3 rounded-xl font-black text-lg uppercase tracking-wider text-light text-center">
                {order.status.replace(/_/g, ' ')}
              </div>
            </div>

            <form action={updateStatus} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-light mb-1">Change to:</label>
                <select 
                  name="status"
                  defaultValue={order.status}
                  className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors appearance-none"
                >
                  <optgroup label="Call Center">
                    <option value="new">New</option>
                    <option value="awaiting_confirmation">Awaiting Confirmation</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="no_answer">No Answer</option>
                    <option value="fake_order">Fake / Duplicate</option>
                    <option value="canceled">Canceled</option>
                  </optgroup>
                  <optgroup label="Fulfillment">
                    <option value="ready_to_ship">Ready to Ship</option>
                    <option value="shipped">Shipped (With Courier)</option>
                  </optgroup>
                  <optgroup label="Delivery">
                    <option value="delivered">Delivered (Success)</option>
                    <option value="refused">Refused</option>
                    <option value="returned">Returned</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-light mb-1">Log Note (Optional)</label>
                <input 
                  type="text" 
                  name="note"
                  placeholder="Reason for change..." 
                  className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-gold to-[#f0c84a] text-void font-black py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Status
              </button>
            </form>

            {/* Timeline */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-bold text-muted mb-4 uppercase tracking-wider">History Log</h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border">
                {order.order_status_history?.map((history: any, idx: number) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-void bg-gold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" />
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-void border border-border p-3 rounded-xl shadow">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-light text-xs uppercase">{history.new_status.replace(/_/g, ' ')}</span>
                        <time className="text-[10px] text-muted">{new Date(history.created_at).toLocaleTimeString()}</time>
                      </div>
                      {history.note && <div className="text-xs text-muted mt-1">{history.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
