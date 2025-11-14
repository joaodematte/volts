import 'dotenv/config';
import { trpcServer } from '@hono/trpc-server';
import { createContext } from '@solarjot/api/context';
import { appRouter } from '@solarjot/api/routers/index';
import { auth } from '@solarjot/auth';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono();

app.use(logger());

app.use(
  '/*',
  cors({
    origin: process.env.CORS_ORIGIN ?? '',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.on(['POST', 'GET'], '/auth/*', (c) => auth.handler(c.req.raw));

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => {
      return createContext({ context });
    },
  }),
);

app.get('/', (c) => {
  return c.text('OK');
});

export default app;
