import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    // Handle any custom logic you want after authentication
    // This is optional, as Supabase can handle the redirect directly
    
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
    
    // Get the session to confirm authentication worked
    const { data } = await supabase.auth.getSession();
    
    // Log for debugging
    console.log('Auth callback reached, user authenticated:', !!data.session);
    
    // Redirect to dashboard or requested page
    return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
} 