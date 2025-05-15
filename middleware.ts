import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // NEVER run middleware on the callback route!
    if (request.nextUrl.pathname.includes('/auth/callback') || 
        request.nextUrl.pathname.includes('/api/auth')) {
        console.log('Skipping middleware on auth callback path');
        return NextResponse.next();
    }

    // Only check auth for protected routes
    const protectedRoutes = ['/dashboard', '/messages', '/profile'];
    const isProtectedRoute = protectedRoutes.some(path => 
        request.nextUrl.pathname.startsWith(path)
    );
    
    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    let response = NextResponse.next();
    
    try {
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

        // Check session
        const { data: { session } } = await supabase.auth.getSession();

        if (!session && isProtectedRoute) {
            const redirectUrl = new URL('/auth/signin', request.url);
            return NextResponse.redirect(redirectUrl);
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        // On error, allow the request to proceed but log the issue
        return response;
    }

    return response;
}

// Only run middleware on specific paths
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/messages/:path*',
        '/profile/:path*'
    ],
}; 