import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  try {
    const isAuthenticated = request.cookies.get('admin-auth')?.value === 'true'

    // Protect all /adminpage routes except login
    if (request.nextUrl.pathname.startsWith('/adminpage') && !request.nextUrl.pathname.startsWith('/adminpage/login')) {
      if (!isAuthenticated) {
        const url = request.nextUrl.clone()
        url.pathname = '/adminpage/login'
        return NextResponse.redirect(url)
      }
    }

    // Redirect to /adminpage if already logged in and visiting login page
    if (request.nextUrl.pathname === '/adminpage/login' && isAuthenticated) {
      const url = request.nextUrl.clone()
      url.pathname = '/adminpage'
      return NextResponse.redirect(url)
    }
  } catch (err) {
    console.error("Middleware Error:", err)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
