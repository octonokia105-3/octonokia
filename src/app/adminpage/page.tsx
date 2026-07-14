import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ShoppingBag, PhoneCall, CheckCircle2, TrendingUp, AlertCircle, RefreshCcw } from 'lucide-react'
import OverviewClient from './OverviewClient'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Date calculations
  const now = new Date()
  
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  
  const startOfWeek = new Date()
  startOfWeek.setDate(now.getDate() - 7)
  
  const startOfMonth = new Date()
  startOfMonth.setMonth(now.getMonth() - 1)

  // Fetch quick stats based on time
  const { count: ordersToday } = await supabase.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', startOfToday.toISOString())
  const { count: ordersWeek } = await supabase.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', startOfWeek.toISOString())
  const { count: ordersMonth } = await supabase.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth.toISOString())
  const { count: ordersAllTime } = await supabase.from('orders').select('*', { count: 'exact', head: true })

  // Recent Orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, display_id, total_amount, status, created_at, customers(full_name, city)')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <OverviewClient 
      ordersToday={ordersToday}
      ordersWeek={ordersWeek}
      ordersMonth={ordersMonth}
      ordersAllTime={ordersAllTime}
      recentOrders={recentOrders}
    />
  )
}
