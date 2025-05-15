import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
        
        try {
            await supabase.auth.exchangeCodeForSession(code);
        } catch (error) {
            console.error('Error exchanging code for session:', error);
            return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
        }
    }

    // Redirect to the callback page which will handle the client-side session check
    return NextResponse.redirect(new URL("/auth/callback", requestUrl.origin));
} 