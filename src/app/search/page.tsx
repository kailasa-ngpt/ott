'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchSearchResults } from '@/services/searchService';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// Define the structure of a video result
interface VideoResult {
  id: string;
  title: string;
  thumbnailUrl: string;
  // Add other relevant fields
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (!query) return;

      setLoading(true);
      try {
        const data = await fetchSearchResults(query);
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
        // TODO: Handle error state, e.g., show error message to user
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  return (
    <div className="bg-[#220E0E] text-white font-sans min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((video) => (
              <div key={video.id} className="video-thumbnail">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  width={300}
                  height={169}
                  layout="responsive"
                  className="rounded-md"
                />
                <h3 className="mt-2 text-sm font-medium">{video.title}</h3>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
