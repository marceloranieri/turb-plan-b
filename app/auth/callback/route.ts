import { createServerClient } from '@supabase/ssr';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard";

    console.log('Auth callback details:', {
        url: request.url,
        code: code ? 'present' : 'missing',
        redirectTo,
        origin: requestUrl.origin,
        headers: Array.from(request.headers.entries()).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {} as Record<string, string>)
    });

    if (!code) {
        console.error('No code provided in callback');
        return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value
                },
                set(name, value, options) {
                    cookieStore.set({ name, value, ...options })
                },
                remove(name, options) {
                    cookieStore.set({ name, value: '', ...options })
                },
            },
        }
    );
    
    try {
        console.log('Exchanging code for session...');
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
            console.error('Error exchanging code for session:', error);
            return NextResponse.redirect(new URL("/auth/signin?error=session_exchange", requestUrl.origin));
        }

        console.log('Session established:', {
            exists: !!data.session,
            userId: data.session?.user?.id,
            email: data.session?.user?.email,
            redirectingTo: redirectTo
        });

        // Redirect to the original destination or dashboard
        return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
    } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        return NextResponse.redirect(new URL("/auth/signin?error=unexpected", requestUrl.origin));
    }
} 