import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (!code) {
        return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    try {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
            console.error('Error exchanging code for session:', error);
            return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
        }

        return NextResponse.redirect(new URL("/", requestUrl.origin));
    } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        return NextResponse.redirect(new URL("/auth/signin", requestUrl.origin));
    }
} 