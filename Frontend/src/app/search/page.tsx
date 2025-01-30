'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../services/searchService';
import { searchSchema } from '../../services/validationSchemas';

export default function SearchPage() {
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
    <div>
      <h1>Search Results for "{query}"</h1>
      <div className="results-grid">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <h3>{result.title}</h3>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
