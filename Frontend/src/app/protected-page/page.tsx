'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '../utils/api';
import Header from '../shared/header';
import Footer from '../shared/footer';

export default function ProtectedPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await getSession();
        if (session && session.user) {
          setIsAuthenticated(true);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Protected Page</h1>
        <p className="text-xl">This content is only visible to authenticated users.</p>
      </div>
      <Footer />
    </div>
  );
}