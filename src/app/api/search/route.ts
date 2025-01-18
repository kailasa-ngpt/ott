import { NextResponse } from 'next/server';

// Define the structure of a video result
interface VideoResult {
  id: string;
  title: string;
  thumbnailUrl: string;
  // Add other relevant fields
}

/**
 * Handles GET requests for the search API.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function GET(req: Request): Promise<NextResponse> {
  // Extract the query parameter from the URL
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  // Validate the query parameter
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // TODO: Replace this with your actual API call
    const apiUrl = `https://your-video-api.com/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: VideoResult[] = await response.json();

    // Return the search results
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
      }
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching' },
      { status: 500 }
    );
  }
}
