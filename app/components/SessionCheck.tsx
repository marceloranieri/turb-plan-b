"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SessionCheck() {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClientComponentClient({
        cookieOptions: {
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        }
    });
    
    useEffect(() => {
        const checkSession = async () => {
            try {
                console.log('Checking session...', {
                    path: pathname,
                    isAuthPage: pathname?.startsWith('/auth')
                });

                const { data: { session }, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error('Session check error:', error);
                    return;
                }

                console.log('Session check result:', {
                    hasSession: !!session,
                    userId: session?.user?.id,
                    email: session?.user?.email,
                    path: pathname
                });
                
                // Don't redirect if we're already on an auth page
                if (pathname?.startsWith('/auth')) {
                    console.log('On auth page, skipping redirect');
                    return;
                }
                
                if (!session) {
                    console.log('No session found, redirecting to signin...');
                    router.push('/auth/signin');
                } else {
                    console.log('Session found, user ID:', session.user.id);
                }
            } catch (error) {
                console.error('Unexpected error in session check:', error);
            }
        };
        
        checkSession();
    }, [router, supabase, pathname]);
    
    return null;
} 