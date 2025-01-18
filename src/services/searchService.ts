/**
 * Fetches search results from the API.
 * @param {string} query - The search query.
 * @returns {Promise<any>} The search results.
 * @throws Will throw an error if the fetch fails.
 */
export async function fetchSearchResults(query: string): Promise<any> {
  console.log('Fetching search results for query:', query);

  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error; // Re-throw the error for the component to handle
  }
}
