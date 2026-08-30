import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import ws from 'ws';
import * as schema from '@shared/schema';

// Required for Neon serverless in certain environments
if (process.env.NODE_ENV !== 'production') {
  neonConfig.webSocketConstructor = ws;
}

// We can't throw here if we want the app to start without a DB (fallback to MemStorage),
// so export nullable placeholders when DATABASE_URL is not configured.
export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
export const db = sql ? drizzle(sql, { schema }) : null;
