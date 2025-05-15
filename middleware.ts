import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Only run middleware on protected routes
    const protectedPaths = ['/dashboard', '/messages', '/profile'];
    const isProtectedRoute = protectedPaths.some(path => 
        request.nextUrl.pathname.startsWith(path)
    );
    
    // Don't run on auth-related routes
    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
    
    if (!isProtectedRoute && !isAuthRoute) {
        return NextResponse.next();
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });
    
    // Create supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: any) {
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                },
            },
        }
    );

    // For auth routes, just pass through
    if (isAuthRoute) {
        return response;
    }

    // For protected routes, verify session
    const { data: { session } } = await supabase.auth.getSession();

    // If no session and on protected route, redirect to sign-in
    if (!session && isProtectedRoute) {
        const redirectUrl = new URL('/auth/signin', request.url);
        redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // Allow access to protected routes if authenticated
    return response;
}

// Only run middleware on specific routes
export const config = {
    matcher: [
        // Protected routes
        '/dashboard/:path*',
        '/messages/:path*',
        '/profile/:path*',
        // Auth routes (to refresh tokens, etc.)
        '/auth/:path*',
    ],
}; 