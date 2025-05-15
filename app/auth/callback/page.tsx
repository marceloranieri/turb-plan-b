"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          router.push('/auth/signin');
          return;
        }
        
        if (session) {
          // Successful authentication, redirect to home page
          router.push('/');
        } else {
          // No session found, redirect to sign in
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        router.push('/auth/signin');
      }
    };

    handleAuthCallback();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Processing authentication...</h2>
        <p className="mt-2 text-sm text-gray-600">Please wait while we complete your sign in.</p>
      </div>
    </div>
  );
} 