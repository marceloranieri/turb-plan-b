import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    // Handle any custom logic you want after authentication
    // This is optional, as Supabase can handle the redirect directly
    
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Get the session to confirm authentication worked
    const { data } = await supabase.auth.getSession();
    
    // Log for debugging
    console.log('Auth callback reached, user authenticated:', !!data.session);
    
    // Redirect to dashboard or requested page
    return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
} 