import { searchSchema, SearchQuery } from './validationSchemas';

/**
 * Fetches search results from an external API.
 * @param query - The search query string
 * @returns A promise that resolves to the search results
 * @throws Will throw an error if the query is invalid or if the API request fails
 */
export async function fetchSearchResults(query: string): Promise<any> {
  try {
    // Validate the query
    const validatedData: SearchQuery = searchSchema.parse({ query });

    // Make the API request
    const response = await fetch(
      `https://api.example.com/search?q=${encodeURIComponent(validatedData.query)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary API keys or authentication headers here
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error in fetchSearchResults:', err.message);
      throw new Error(`Failed to fetch search results: ${err.message}`);
    }
    throw err; // Re-throw if it's not an Error instance
  }
}
