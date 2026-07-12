import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin')
  }

  // Server Action for logging in
  async function login(formData: FormData) {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      redirect('/admin/login?error=Invalid credentials')
    }
    
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6">
      <div className="bg-surface-2 border border-border p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gold/20">
            <span className="text-gold font-black text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-black text-light">Admin Dashboard</h1>
          <p className="text-muted mt-2 text-sm">Sign in to manage your COD operations</p>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-light mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              required 
              className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-light mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              required 
              className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full mt-6 bg-gold hover:bg-gold-hover text-void font-black text-lg py-3 rounded-xl shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
