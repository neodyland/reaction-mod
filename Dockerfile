FROM oven/bun:1 AS base
WORKDIR /app

# Copy monorepo configuration
COPY package.json bun.lock turbo.json ./

# Copy workspace packages
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN bun i

# Generate Prisma client
RUN bunx turbo run db:generate

# Build using Turborepo
RUN bun run build:bot

FROM debian:bookworm-slim
WORKDIR /app

ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2
COPY --from=base /app/apps/bot/bot .

CMD ["./bot"]