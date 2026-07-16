'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { syncOrderToGoogleSheets } from '@/lib/integrations/google-sheets'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export async function submitOrder(prevState: any, formData: FormData) {
  try {
    // 1. Check if Supabase is configured (Dev Mode Fallback)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("⚠️ DEV MODE: No Supabase keys found. Saving to local mock database for preview.")
      
      const mockDbPath = process.env.VERCEL ? '/tmp/mock-db.json' : path.join(process.cwd(), 'mock-db.json')
      let mockOrders: any[] = []
      try {
        if (fs.existsSync(mockDbPath)) {
          mockOrders = JSON.parse(fs.readFileSync(mockDbPath, 'utf8'))
        }
      } catch(e) {}

      // Attempt to determine Total Price dynamically
      const packageSelected = formData.get('package') as string || ''
      const orderBump = formData.get('orderBump') === 'true'
      let finalPrice = 0
      if (packageSelected.includes('باك 1') || packageSelected.includes('1')) finalPrice = 249
      else if (packageSelected.includes('باك 2') || packageSelected.includes('2')) finalPrice = 399
      else if (packageSelected.includes('باك 3') || packageSelected.includes('3')) finalPrice = 549
      if (orderBump) finalPrice += 49
      if (finalPrice === 0) finalPrice = 399 // Fallback

      const fakeId = Math.floor(Math.random() * 10000)
      const fakeOrder = {
        id: fakeId,
        display_id: `DEV-${fakeId}`,
        created_at: new Date().toISOString(),
        total_amount: finalPrice,
        status: 'new',
        package_selected: packageSelected || 'باك 2 (توفير 99 درهم)',
        has_order_bump: orderBump,
        duplicate_flag: false,
        customers: {
          full_name: formData.get('fullName') as string || 'Dev User',
          phone: formData.get('phone') as string || '0000000000',
          city: formData.get('city') as string || 'Dev City',
          address: formData.get('address') as string || 'Dev Address'
        }
      }
      
      mockOrders.unshift(fakeOrder)
      fs.writeFileSync(mockDbPath, JSON.stringify(mockOrders, null, 2))

      // Trigger Integrations even in Dev Mode
      syncOrderToGoogleSheets({
        order_id: fakeOrder.display_id,
        date: fakeOrder.created_at,
        customer_name: fakeOrder.customers.full_name,
        phone: fakeOrder.customers.phone,
        city: fakeOrder.customers.city,
        address: fakeOrder.customers.address,
        package: fakeOrder.package_selected,
        total: fakeOrder.total_amount,
        status: 'New'
      }).catch(console.error)

      triggerMetaCAPI(
        fakeOrder.customers.phone, 
        fakeOrder.customers.full_name, 
        fakeOrder.customers.city, 
        fakeOrder.total_amount, 
        '127.0.0.1', 
        'dev-mode-user-agent'
      )

      return { 
        success: true, 
        message: 'تم استلام طلبك بنجاح! (Dev Mode - Saved to Local JSON)',
        orderId: `DEV-${fakeId}`
      }
    }

    const supabase = await createAdminClient()
    const headersList = await headers()
    
    // 1. Extract Form Data
    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
    const city = formData.get('city') as string
    const address = formData.get('address') as string
    const packageSelected = formData.get('package') as string
    const orderBump = formData.get('orderBump') === 'true'
    
    if (!fullName || !phone || !city || !address) {
      return { success: false, message: 'المرجوا ملء جميع الخانات' } // Please fill all fields
    }

    // Determine Total Price (Hardcoded for now based on UI, should be dynamic in future)
    let totalAmount = 0
    if (packageSelected.includes('باك 1')) totalAmount = 249
    else if (packageSelected.includes('باك 2')) totalAmount = 399
    else if (packageSelected.includes('باك 3')) totalAmount = 549
    
    if (orderBump) totalAmount += 49

    // 2. Anti-Fraud & Customer Management
    // Find existing customer by phone
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id, fraud_risk, total_orders')
      .eq('phone', phone)
      .single()

    let customerId = existingCustomer?.id
    let duplicateFlag = false

    if (!customerId) {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert({
          full_name: fullName,
          phone,
          city,
          address,
        })
        .select('id')
        .single()
        
      if (customerError) throw customerError
      customerId = newCustomer.id
    } else {
      // Mark as duplicate if they already ordered recently (simple logic)
      duplicateFlag = true
      
      // Update customer stats
      await supabase.from('customers').update({
        total_orders: ((existingCustomer as any)?.total_orders || 0) + 1,
        updated_at: new Date().toISOString()
      }).eq('id', customerId)
    }

    // 3. Create the Order
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null
    const userAgent = headersList.get('user-agent') || null

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customerId,
        package_selected: packageSelected,
        has_order_bump: orderBump,
        total_amount: totalAmount,
        status: 'new',
        ip_address: ipAddress,
        user_agent: userAgent,
        duplicate_flag: duplicateFlag
      })
      .select('id, display_id')
      .single()

    if (orderError) throw orderError

    // 4. Create History Log
    await supabase
      .from('order_status_history')
      .insert({
        order_id: order.id,
        new_status: 'new',
        note: 'Order submitted via Storefront'
      })

    // 5. Trigger Google Sheets Webhook
    // Do this asynchronously so it doesn't block the user response
    syncOrderToGoogleSheets({
      order_id: order.display_id,
      date: new Date().toISOString(),
      customer_name: fullName,
      phone: phone,
      city: city,
      address: address,
      package: packageSelected,
      total: totalAmount,
      status: 'New'
    }).catch(console.error)

    // 6. Meta Conversions API (CAPI) Server-Side Tracking
    triggerMetaCAPI(phone, fullName, city, totalAmount, ipAddress || '127.0.0.1', userAgent || '')

    return { success: true, message: 'تم استلام طلبك بنجاح! سنتصل بك قريباً لتأكيد الطلب.', orderId: order.display_id }

  } catch (error: any) {
    console.error('Order Submission Error:', error)
    return { success: false, message: 'حدث خطأ أثناء معالجة الطلب. المرجوا المحاولة لاحقاً.' }
  }
}

async function triggerMetaCAPI(phone: string, fullName: string, city: string, totalAmount: number, clientIp: string, clientUserAgent: string) {
  try {
    const { getStoreSettings } = await import('@/app/actions/settings');
    const settings = await getStoreSettings();
    
    if (settings && settings.meta_pixel_id && settings.meta_capi_token) {
      const eventData = {
        data: [
          {
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: {
              client_ip_address: clientIp,
              client_user_agent: clientUserAgent,
              ph: [crypto.createHash('sha256').update(phone).digest('hex')],
              fn: [crypto.createHash('sha256').update(fullName.split(' ')[0] || fullName).digest('hex')],
              ct: [crypto.createHash('sha256').update(city).digest('hex')],
              country: [crypto.createHash('sha256').update('ma').digest('hex')]
            },
            custom_data: {
              value: totalAmount,
              currency: 'MAD'
            }
          }
        ]
      }

      const capiUrl = `https://graph.facebook.com/v19.0/${settings.meta_pixel_id}/events?access_token=${settings.meta_capi_token}`
      
      fetch(capiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      }).then(res => res.json()).then(res => {
        if (res.error) console.error("Meta CAPI Error:", res.error)
      }).catch(e => console.error("Meta CAPI Fetch Failed:", e))
    }
  } catch (e) {
    console.error("CAPI Implementation Error:", e)
  }
}
