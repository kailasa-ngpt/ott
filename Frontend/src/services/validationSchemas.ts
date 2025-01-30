import { z } from 'zod';

/**
 * Schema for validating search queries.
 * Ensures the query is:
 * - Not empty
 * - Not too long
 * - Contains only alphanumeric characters and spaces
 */
export const searchSchema = z.object({
  query: z
    .string()
    .trim() // Remove leading and trailing whitespace
    .min(1, { message: "Search query cannot be empty" })
    .max(100, { message: "Search query is too long (max 100 characters)" })
    .regex(/^[a-zA-Z0-9\s]+$/, { 
      message: "Search query can only contain letters, numbers, and spaces" 
    }),
});

// Type inference for TypeScript
export type SearchQuery = z.infer<typeof searchSchema>;
