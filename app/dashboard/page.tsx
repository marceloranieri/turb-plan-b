"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [sessionError, setSessionError] = useState<string | null>(null);
    const [sessionInfo, setSessionInfo] = useState<any>(null);
    
    useEffect(() => {
        const checkSession = async () => {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            
            try {
                const { data, error } = await supabase.auth.getSession();
                
                console.log('Session check:', {
                    hasSession: !!data.session,
                    sessionError: error?.message,
                    userId: data.session?.user?.id,
                    expiresAt: data.session?.expires_at
                });
                
                setSessionInfo({
                    hasSession: !!data.session,
                    userId: data.session?.user?.id,
                    email: data.session?.user?.email,
                    expiresAt: data.session?.expires_at
                });
                
                if (error) {
                    console.error('Session error:', error);
                    setSessionError(error.message);
                }
                
                if (!data.session) {
                    console.log('No session found, redirecting to sign in');
                    router.push('/auth/signin');
                }
            } catch (err) {
                console.error('Session check error:', err);
                setSessionError('An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };
        
        checkSession();
    }, [router]);
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl">Loading session...</h2>
                </div>
            </div>
        );
    }
    
    if (sessionError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl text-red-600">Error: {sessionError}</h2>
                    <button
                        onClick={() => router.push('/auth/signin')}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Return to Sign In
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                
                {/* Session Debug Info */}
                <div className="bg-gray-100 p-4 rounded-lg mb-8">
                    <h2 className="text-lg font-semibold mb-4">Session Information</h2>
                    <pre className="bg-white p-4 rounded overflow-auto">
                        {JSON.stringify(sessionInfo, null, 2)}
                    </pre>
                </div>
                
                {/* Dashboard Content */}
                <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-gray-600">You are authenticated!</p>
                    {/* Add your dashboard content here */}
                </div>
            </div>
        </div>
    );
} 