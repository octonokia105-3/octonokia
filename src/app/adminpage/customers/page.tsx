import { createClient } from '@/lib/supabase/server'
import { Users, Search, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default async function CustomersPage() {
  const supabase = await createClient()

  // Fetch customers
  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-light tracking-tight flex items-center gap-3">
          <Users className="w-8 h-8 text-gold" />
          Customers CRM
        </h1>
        <p className="text-muted mt-1">Manage your customer database and identify fraud risks.</p>
      </div>

      <div className="bg-surface-2 border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-border flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full bg-void border border-border rounded-xl pl-12 pr-4 py-2 text-light focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-void/50 text-muted text-sm border-b border-border">
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Phone</th>
                <th className="p-4 font-bold">City</th>
                <th className="p-4 font-bold text-center">Total Orders</th>
                <th className="p-4 font-bold text-center">Delivered</th>
                <th className="p-4 font-bold">Fraud Risk</th>
                <th className="p-4 font-bold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-light">
              {customers?.map((customer: any) => (
                <tr key={customer.id} className="hover:bg-void/30 transition-colors group">
                  <td className="p-4 font-bold">{customer.full_name}</td>
                  <td className="p-4 font-mono text-sm">{customer.phone}</td>
                  <td className="p-4 text-muted">{customer.city}</td>
                  <td className="p-4 text-center font-bold text-gold">{customer.total_orders}</td>
                  <td className="p-4 text-center text-success font-bold">{customer.delivered_orders}</td>
                  <td className="p-4">
                    {customer.fraud_risk === 'high' ? (
                      <span className="flex items-center gap-1 text-urgent text-xs font-bold uppercase bg-urgent/10 px-2 py-1 rounded w-fit">
                        <AlertTriangle className="w-3 h-3" /> High
                      </span>
                    ) : customer.fraud_risk === 'medium' ? (
                      <span className="flex items-center gap-1 text-orange-500 text-xs font-bold uppercase bg-orange-500/10 px-2 py-1 rounded w-fit">
                        <AlertTriangle className="w-3 h-3" /> Med
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-success text-xs font-bold uppercase bg-success/10 px-2 py-1 rounded w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Low
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-muted">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
