'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyToken, exchangeCodeForToken } from '../../utils/api';

// Component that uses useSearchParams
function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    console.log('CallbackPage useEffect: Starting');
    const code = searchParams.get('code');
    console.log('CallbackPage useEffect: Code from URL:', code);
    
    if (code) {
      handleCallback(code);
    } else {
      console.error('CallbackPage useEffect: Code is missing from callback URL');
      router.push('/login?error=code_missing');
    }
    console.log('CallbackPage useEffect: Ending');
  }, [searchParams, router]);

  const handleCallback = async (code: string) => {
    console.log('CallbackPage: handleCallback starting with code:', code);
    
    try {
      // Exchange code for access token
      const accessToken = await exchangeCodeForToken(code);
      if (!accessToken) {
        console.error('CallbackPage: Failed to exchange code for access token');
        router.push('/login?error=token_exchange_failed');
        return;
      }

      // Verify the access token
      const userData = await verifyToken(accessToken);  // Use access token to verify

      if (userData) {
        // Store user data in local storage or a cookie if needed
        // localStorage.setItem('userData', JSON.stringify(userData));

        router.push('/');  // Redirect to the home page or dashboard
      } else {
        console.error('CallbackPage: handleCallback Token verification failed');
        router.push('/login?error=token_verification_failed');
      }
    } catch (error) {
      console.error('CallbackPage: handleCallback Error during callback:', error);
      router.push('/login?error=callback_error');
    } finally {
      console.log('CallbackPage: handleCallback ending');
    }
  };

  return <div>Processing login...</div>;
}

// Main component with Suspense boundary
export default function CallbackPage() {
  console.log('CallbackPage: Rendering');
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <CallbackContent />
    </Suspense>
  );
}