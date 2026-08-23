# Estuda+ API — container production-ready for Render or any Docker host.
FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN npm install --global pnpm@9.12.0
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN npm install --global pnpm@9.12.0
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/scripts/migrate.ts ./scripts/migrate.ts
COPY --from=build /app/server/db.ts ./server/db.ts
COPY --from=build /app/drizzle/schema.ts ./drizzle/schema.ts
EXPOSE 3000
CMD ["pnpm", "start"]
