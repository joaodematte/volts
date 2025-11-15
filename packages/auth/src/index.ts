import { db } from '@solarjot/db';
import * as schema from '@solarjot/db/schema';
import { type BetterAuthOptions, betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth<BetterAuthOptions>({
  basePath: '/auth',
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN ?? ''],
  advanced: {
    cookiePrefix: 'volts',
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === 'production',
      domain: '.usevolts.com',
    },
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
    database: {
      generateId: false,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10 * 60,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
  },
});
