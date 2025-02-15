'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyToken } from '../../utils/api';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const iss = searchParams.get('iss');

    if (code && state && iss) {
      handleCallback(code, state, iss);
    }
  }, [searchParams]);

  const handleCallback = async (code: string, state: string, iss: string) => {
    try {
      const result = await verifyToken(code);
      if (result.sessionId) {
        // Token verified successfully
        router.push('/'); // Redirect to home page or dashboard
      } else {
        console.error('Token verification failed');
        router.push('/login?error=authentication_failed');
      }
    } catch (error) {
      console.error('Error during callback:', error);
      router.push('/login?error=callback_error');
    }
  };

  return <div>Processing login...</div>;
}
