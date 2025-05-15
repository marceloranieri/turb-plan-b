import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if exists
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth pages are accessible without session
  if (req.nextUrl.pathname.startsWith('/auth')) {
    // If user is already authenticated and tries to access auth pages,
    // redirect them to the home page
    if (session) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return res
  }

  // Redirect to login if no session and trying to access protected routes
  if (!session) {
    const redirectUrl = new URL('/auth/signin', req.url)
    // Preserve the original URL as a query parameter
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 