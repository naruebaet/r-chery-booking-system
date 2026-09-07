import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import path from 'node:path';
import fs from 'node:fs';

const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  // Default local sqlite db file in project root
  const dbDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir, { recursive: true });
    } catch {
      // Ignore if cannot create
    }
  }
  return `file:${path.join(dbDir, 'archery.db')}`;
};

const client = createClient({
  url: getDatabaseUrl(),
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
export { client };
