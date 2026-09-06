# Dockerfile — SolidStart (Vinxi, preset bun), multi-stage.
# Runtime: bun .output/server/index.mjs, listen NITRO_PORT || PORT || 3000 (D7: internal selalu 3000).
# Health gate: GET /health -> 200 (D5).
#
# PENTING: VITE_API_URL adalah build-time embed (import.meta.env). .env yang
# di-generate CI dari secrets.ENV_FILE HARUS ada saat `docker build` (COPY . .
# membawanya; image lokal saja, tidak di-push ke registry — D2). Jangan taruh
# .env di .dockerignore.

# ---- build stage ----
FROM oven/bun:1-alpine AS build
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# ---- runtime stage ----
FROM oven/bun:1-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
USER bun
CMD ["bun", ".output/server/index.mjs"]
