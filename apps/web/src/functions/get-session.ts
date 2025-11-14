import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { authClient } from '@/lib/auth-client';

export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const cookie = getRequest().headers.get('cookie');

    if (!cookie) return null;

    const session = await authClient.getSession({
      fetchOptions: {
        headers: {
          cookie,
        },
        throw: true,
      },
    });

    return session;
  },
);
