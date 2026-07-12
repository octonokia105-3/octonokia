'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { syncOrderToGoogleSheets } from '@/lib/integrations/google-sheets'

export async function bulkSyncToSheets(searchParams: any) {
  try {
    const supabase = await createAdminClient()

    let query = supabase
      .from('orders')
      .select('id, display_id, total_amount, status, created_at, duplicate_flag, customers(full_name, phone, city, address)')
      .order('created_at', { ascending: false })

    if (searchParams?.status) {
      query = query.eq('status', searchParams.status)
    }

    if (searchParams?.hide_dupes === 'on') {
      query = query.eq('duplicate_flag', false)
    }

    if (searchParams?.start_date || searchParams?.end_date) {
      if (searchParams.start_date) {
        query = query.gte('created_at', new Date(searchParams.start_date).toISOString())
      }
      if (searchParams.end_date) {
        const endDate = new Date(searchParams.end_date)
        endDate.setHours(23, 59, 59, 999)
        query = query.lte('created_at', endDate.toISOString())
      }
    } else if (searchParams?.time) {
      const now = new Date()
      let startDate = new Date()
      if (searchParams.time === 'today') startDate.setHours(0, 0, 0, 0)
      else if (searchParams.time === 'week') startDate.setDate(now.getDate() - 7)
      else if (searchParams.time === 'month') startDate.setMonth(now.getMonth() - 1)

      if (searchParams.time !== 'all') {
        query = query.gte('created_at', startDate.toISOString())
      }
    }

    if (searchParams?.q) {
      query = query.ilike('display_id', `%${searchParams.q}%`)
    }

    const { data: orders, error } = await query

    if (error || !orders) throw new Error("Failed to fetch orders for sync")

    // We can use the existing syncOrderToGoogleSheets function in a loop, or modify it to accept arrays.
    // For simplicity and to reuse the webhook structure, we'll loop and send. 
    // A more advanced webhook would accept the entire array.
    
    // In Preview Mode, just return success
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { success: true, count: 0 }
    }

    // Process all fetched orders
    for (const order of orders) {
      const cust: any = order.customers
      const formattedData = {
        order_id: order.display_id,
        date: new Date(order.created_at).toISOString(),
        customer_name: cust?.full_name || '',
        phone: cust?.phone || '',
        city: cust?.city || '',
        address: cust?.address || '',
        amount: order.total_amount,
        status: order.status,
        is_duplicate: order.duplicate_flag ? "YES" : "NO"
      }
      // Assuming syncOrderToGoogleSheets handles the actual webhook push
      await syncOrderToGoogleSheets(formattedData)
    }

    return { success: true, count: orders.length }
  } catch (error: any) {
    console.error("Bulk sync error:", error)
    return { success: false, error: error.message }
  }
}

export async function exportToCSV(searchParams: any) {
  try {
    const supabase = await createAdminClient()
    let query = supabase
      .from('orders')
      .select('display_id, total_amount, status, created_at, customers(full_name, phone, city, address)')
      .order('created_at', { ascending: false })

    // ... Apply the exact same filters as above ...
    if (searchParams?.status) query = query.eq('status', searchParams.status)
    if (searchParams?.hide_dupes === 'on') query = query.eq('duplicate_flag', false)
    if (searchParams?.start_date) query = query.gte('created_at', new Date(searchParams.start_date).toISOString())
    if (searchParams?.end_date) {
      const endDate = new Date(searchParams.end_date)
      endDate.setHours(23, 59, 59, 999)
      query = query.lte('created_at', endDate.toISOString())
    }
    if (searchParams?.q) query = query.ilike('display_id', `%${searchParams.q}%`)

    const { data: orders } = await query
    
    if (!orders) return { success: false }

    const header = ['Order ID', 'Date', 'Customer Name', 'Phone', 'City', 'Address', 'Amount', 'Status']
    const rows = orders.map(o => {
      const cust: any = o.customers
      return [
        o.display_id,
        new Date(o.created_at).toLocaleDateString(),
        `"${cust ? cust.full_name : ''}"`,
        `'${cust ? cust.phone : ''}'`,
        `"${cust ? cust.city : ''}"`,
        `"${cust ? cust.address : ''}"`,
        o.total_amount,
        o.status
      ]
    })

    const csvContent = [header.join(','), ...rows.map(r => r.join(','))].join('\n')
    return { success: true, csv: csvContent }
  } catch (error) {
    return { success: false }
  }
}
