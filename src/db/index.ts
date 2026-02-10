import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

/**
 * Drizzle ORM database client connected to Vercel Postgres.
 * Uses the DATABASE_URL environment variable automatically via @vercel/postgres.
 */
export const db = drizzle(sql, { schema });

export type Database = typeof db;

// Re-export schema for convenience
export * from './schema';
