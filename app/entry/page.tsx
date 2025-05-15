"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function EntryPage() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error('Error checking session:', error);
                    router.push('/auth/signin');
                    return;
                }

                if (session) {
                    console.log('Session found, redirecting to dashboard');
                    router.push('/dashboard');
                } else {
                    console.log('No session found, redirecting to sign in');
                    router.push('/auth/signin');
                }
            } catch (error) {
                console.error('Unexpected error checking session:', error);
                router.push('/auth/signin');
            }
        };

        checkSession();
    }, [router, supabase.auth]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl">Loading...</h2>
            </div>
        </div>
    );
}
