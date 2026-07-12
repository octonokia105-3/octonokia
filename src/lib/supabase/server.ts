import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key'

  const client = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  // PREVIEW MODE DEEP MOCK: Prevent network crashes and read from local JSON
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const createMockChain = (isSingle = false): any => {
      const chain: any = {
        select: () => createMockChain(isSingle),
        eq: () => createMockChain(isSingle),
        order: () => createMockChain(isSingle),
        in: () => createMockChain(isSingle),
        limit: () => createMockChain(isSingle),
        ilike: () => createMockChain(isSingle),
        gte: () => createMockChain(isSingle),
        lte: () => createMockChain(isSingle),
        single: () => createMockChain(true),
        insert: () => createMockChain(isSingle),
        update: () => createMockChain(isSingle),
        upsert: () => createMockChain(isSingle),
        then: (resolve: any) => {
          let data: any = []
          try {
            const fs = require('fs')
            const path = require('path')
            const mockDbPath = path.join(process.cwd(), 'mock-db.json')
            if (fs.existsSync(mockDbPath)) {
              data = JSON.parse(fs.readFileSync(mockDbPath, 'utf8'))
            }
          } catch(e) {}
          
          resolve({ data: isSingle ? (data[0] || null) : data, error: null, count: data.length })
        }
      };
      return chain;
    };
    client.from = (table: string) => createMockChain();
  }

  return client;
}

export async function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co'
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-key'

  const client = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() { return [] },
        setAll() {},
      },
    }
  )

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const createMockChain = (isSingle = false): any => {
      const chain: any = {
        select: () => createMockChain(isSingle),
        eq: () => createMockChain(isSingle),
        order: () => createMockChain(isSingle),
        in: () => createMockChain(isSingle),
        limit: () => createMockChain(isSingle),
        single: () => createMockChain(true),
        insert: () => createMockChain(isSingle),
        update: () => createMockChain(isSingle),
        upsert: () => createMockChain(isSingle),
        then: (resolve: any) => resolve({ data: isSingle ? null : [], error: null, count: 0 })
      };
      return chain;
    };
    client.from = (table: string) => createMockChain();
  }

  return client;
}
