import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Search, Filter, Calendar, ShieldBan, ShoppingBag, Edit2 } from 'lucide-react'
import OrderActions from './OrderActions'
import OrdersClient from './OrdersClient'

export default async function AdminOrdersPage(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>
}) {
  const searchParams = await props.searchParams
  const supabase = await createClient()

  // 1. Build Query
  let query = supabase
    .from('orders')
    .select('id, display_id, total_amount, status, created_at, duplicate_flag, customers(full_name, phone, city)')
    .order('created_at', { ascending: false })

  // Status Filter
  if (searchParams?.status) {
    query = query.eq('status', searchParams.status)
  }

  // Hide Duplicates Filter
  if (searchParams?.hide_dupes === 'on') {
    query = query.eq('duplicate_flag', false)
  }

  // Time Period / Custom Range Filter
  if (searchParams?.start_date || searchParams?.end_date) {
    // Custom Range takes priority
    if (searchParams.start_date) {
      query = query.gte('created_at', new Date(searchParams.start_date).toISOString())
    }
    if (searchParams.end_date) {
      // Add 23:59:59 to include the entire end day
      const endDate = new Date(searchParams.end_date)
      endDate.setHours(23, 59, 59, 999)
      query = query.lte('created_at', endDate.toISOString())
    }
  } else if (searchParams?.time) {
    // Preset Time Filter
    const now = new Date()
    let startDate = new Date()

    if (searchParams.time === 'today') {
      startDate.setHours(0, 0, 0, 0)
    } else if (searchParams.time === 'week') {
      startDate.setDate(now.getDate() - 7)
    } else if (searchParams.time === 'month') {
      startDate.setMonth(now.getMonth() - 1)
    }

    if (searchParams.time !== 'all') {
      query = query.gte('created_at', startDate.toISOString())
    }
  }

  // Search Filter (Search by phone or display_id)
  if (searchParams?.q) {
    query = query.ilike('display_id', `%${searchParams.q}%`)
  }

  const { data: orders } = await query

  return <OrdersClient orders={orders} searchParams={searchParams} />
}
