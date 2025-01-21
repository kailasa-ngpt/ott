import type { NextApiRequest, NextApiResponse } from 'next';
import { searchSchema } from '@/app/services/validationSchemas';
import { z } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Validate query parameter using Zod schema
    const { query } = searchSchema.parse(req.query);

    // Fetch data from external API or database
    const response = await fetch(
      `https://api.example.com/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`External API request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
