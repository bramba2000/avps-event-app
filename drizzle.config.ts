import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || './local.sqlite',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
