import { createClient } from '@/lib/supabase/server'
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react'
import AnalyticsCharts from './AnalyticsCharts'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Fetch raw orders
  const { data: orders } = await supabase.from('orders').select('status, created_at, total_amount')

  // Process Daily Trend
  const dailyCounts: Record<string, number> = {}
  let totalRevenue = 0

  orders?.forEach((order: any) => {
    const date = new Date(order.created_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
    dailyCounts[date] = (dailyCounts[date] || 0) + 1
    
    // Revenue counts delivered orders
    if (order.status === 'delivered') {
      totalRevenue += Number(order.total_amount)
    }
  })

  // Format for Recharts
  const dailyTrend = Object.entries(dailyCounts)
    .map(([date, count]) => ({ date, orders: count }))
    .slice(-7) // Last 7 active days

  // Process Status Distribution
  const statusCounts: Record<string, number> = {}
  orders?.forEach((order: any) => {
    statusCounts[order.status] = (statusCounts[order.status] || 0) + 1
  })

  const statusDistribution = Object.entries(statusCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const chartData = {
    dailyTrend,
    statusDistribution
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-light tracking-tight flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-gold" />
          Analytics & Performance
        </h1>
        <p className="text-muted mt-1">Key metrics for your COD business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl">
          <p className="text-sm text-muted font-bold flex items-center gap-2"><DollarSign className="w-4 h-4 text-success" /> Delivered Revenue</p>
          <p className="text-3xl font-black text-success mt-2">{totalRevenue.toLocaleString()} د.م</p>
        </div>
        <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl">
          <p className="text-sm text-muted font-bold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gold" /> Total Orders</p>
          <p className="text-3xl font-black text-light mt-2">{orders?.length || 0}</p>
        </div>
        <div className="bg-surface-2 border border-border rounded-2xl p-6 shadow-xl">
          <p className="text-sm text-muted font-bold">Delivery Success Rate</p>
          <p className="text-3xl font-black text-light mt-2">
            {orders?.length ? Math.round((statusCounts['delivered'] || 0) / orders.length * 100) : 0}%
          </p>
        </div>
      </div>

      <AnalyticsCharts data={chartData} />
    </div>
  )
}
