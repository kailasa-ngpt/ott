import { NextResponse, NextRequest } from 'next/server';
import { searchSchema } from '../../../services/validationSchemas';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const validatedQuery = searchSchema.parse({ query: query });

    const response = await fetch(
      `https://api.example.com/search?q=${encodeURIComponent(validatedQuery.query)}`
    );

    if (!response.ok) {
      throw new Error(`External API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
