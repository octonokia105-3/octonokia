import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get('admin-auth')

  if (isAuthenticated?.value === 'true') {
    redirect('/adminpage')
  }

  // Server Action for logging in
  async function login(formData: FormData) {
    'use server'
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    
    // Hardcoded credentials as requested
    if (username === 'admin' && password === 'Hamza@1994') {
      const cookieStore = await cookies()
      cookieStore.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
      redirect('/adminpage')
    } else {
      redirect('/adminpage/login?error=Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6">
      <div className="bg-surface-2 border border-border p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gold/20">
            <span className="text-gold font-black text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-black text-light">Admin Dashboard</h1>
          <p className="text-muted mt-2 text-sm">Sign in with your admin credentials</p>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-light mb-1">Username</label>
            <input 
              type="text" 
              name="username"
              placeholder="admin"
              required 
              className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-light mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••"
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
