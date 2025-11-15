import type { auth } from '@volts/auth';
import {
  inferAdditionalFields,
  organizationClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  basePath: '/auth',
  baseURL: import.meta.env.VITE_SERVER_URL,
  plugins: [inferAdditionalFields<typeof auth>(), organizationClient()],
  fetchOptions: {
    credentials: 'include',
  },
});
