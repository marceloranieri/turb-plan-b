"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function SessionCheck() {
    const [isLoading, setIsLoading] = useState(true);
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

                if (!session) {
                    console.log('No session found, redirecting to sign in');
                    router.push('/auth/signin');
                    return;
                }

                console.log('Session found:', {
                    user: session.user.email,
                    expiresAt: new Date(session.expires_at! * 1000).toISOString()
                });
            } catch (error) {
                console.error('Unexpected error checking session:', error);
                router.push('/auth/signin');
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [router, supabase.auth]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl">Loading...</h2>
                </div>
            </div>
        );
    }

    return null;
} 