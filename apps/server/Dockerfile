FROM oven/bun:1.3.2 AS base

FROM base AS builder
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune server --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN bun install

COPY --from=builder /app/out/full/ .

RUN NODE_ENV=production bun turbo build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 hono
RUN adduser --system --uid 1001 hono
USER hono
COPY --from=installer /app .

EXPOSE 3000

CMD NODE_ENV=production bun run apps/server/dist/index.js
