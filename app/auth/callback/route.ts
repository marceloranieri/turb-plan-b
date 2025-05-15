import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard";

    console.log('Auth callback received:', {
        code: code ? 'present' : 'missing',
        redirectTo,
        origin: requestUrl.origin,
        fullUrl: request.url
    });

    if (!code) {
        console.error('No code provided in callback');
        return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    try {
        console.log('Exchanging code for session...');
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
            console.error('Error exchanging code for session:', {
                error: error.message,
                status: error.status,
                name: error.name
            });
            return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
        }

        // Get session data for debugging
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
            console.error('Error getting session:', sessionError);
            return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
        }

        console.log('Session established:', {
            exists: !!session,
            userId: session?.user?.id,
            email: session?.user?.email,
            redirectingTo: redirectTo,
            cookies: cookieStore.getAll().map(c => c.name)
        });

        // Redirect to the original destination or dashboard
        const redirectUrl = new URL(redirectTo, requestUrl.origin);
        console.log('Redirecting to:', redirectUrl.toString());
        return NextResponse.redirect(redirectUrl);
    } catch (error) {
        console.error('Unexpected error during auth callback:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
    }
} 