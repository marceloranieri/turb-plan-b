"use client";

import type { NextPage } from "next";
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Suspense, useEffect } from "react";

// Create a client component that uses useSearchParams
function SignInContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // Get the redirectTo parameter or default to dashboard
    const redirectTo = searchParams?.get('redirectTo') || '/dashboard';

    useEffect(() => {
        // Log URL parameters
        console.log('Sign-in page loaded with params:', Object.fromEntries([...searchParams.entries()]));
        
        // Check if user is already authenticated
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            console.log('Current session state:', {
                hasSession: !!data.session,
                user: data.session?.user?.email || 'none'
            });
        };
        
        checkSession();
    }, [searchParams, supabase.auth]);

    const handleGoogleSignIn = async () => {
        console.log('Starting Google sign in...', {
            redirectTo,
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL
        });
        
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL + 
                    `?redirectTo=${encodeURIComponent(redirectTo)}`,
            },
        });
    };

    const handleFacebookSignIn = async () => {
        console.log('Starting Facebook sign in...', {
            redirectTo,
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL
        });
        
        await supabase.auth.signInWithOAuth({
            provider: "facebook",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL + 
                    `?redirectTo=${encodeURIComponent(redirectTo)}`,
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Choose your preferred sign in method
                    </p>
                </div>
                <div className="mt-8 space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Image
                            src="/images/google.svg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Continue with Google
                    </button>
                    <button
                        onClick={handleFacebookSignIn}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Image
                            src="/images/facebook.svg"
                            alt="Facebook"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Continue with Facebook
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    );
}

// Import at component level
import { useSearchParams } from "next/navigation";

const SignIn: NextPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-xl">Loading sign in options...</h2>
                </div>
            </div>
        }>
            <SignInContent />
        </Suspense>
    );
};

export default SignIn;
