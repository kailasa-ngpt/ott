'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../services/searchService';
import { searchSchema } from '../../services/validationSchemas';
import Header from '../shared/header';
import Footer from '../shared/footer';

// Component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        // Validate query parameter
        searchSchema.parse({ query });

        const data = await fetchSearchResults(query);
        setResults(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="bg-[#331717] p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{result.title}</h3>
              {/* Add more details as needed */}
            </div>
          ))
        ) : (
          <p>No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <div className="bg-[#220E0E] text-white min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading search results...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}