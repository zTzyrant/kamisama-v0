# Dockerfile — SolidStart (Vinxi, preset bun), multi-stage.
# Runtime: bun .output/server/index.mjs, listen NITRO_PORT || PORT || 3000 (D7: internal selalu 3000).
# Health gate: GET /health -> 200 (D5).
#
# PENTING: VITE_API_URL adalah build-time embed (import.meta.env). .env yang
# di-generate CI dari secrets.ENV_FILE HARUS ada saat `docker build` (COPY . .
# membawanya; image lokal saja, tidak di-push ke registry — D2). Jangan taruh
# .env di .dockerignore.
#
# PENTING 2: stage build WAJIB Node, bukan Bun. Bun >=1.3 crash
# "Illegal instruction / CPU lacks AVX support" di CPU server (non-AVX, sse42
# only) saat menjalankan Vite — lihat oven-sh/bun#26353. `bun install` aman
# (terbukti di CI), yang crash hanya eksekusi JS berat (build, dan berpotensi
# runtime). Kalau /health gate gagal karena runtime Bun ikut crash, pindahkan
# runtime ke node:22-alpine + NITRO_PRESET=node-server (full Node).

# ---- deps stage (bun install OK di CPU non-AVX) ----
FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# ---- build stage (Node 22 — engines: node >=22) ----
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# vinxi bin shebang = node, jadi `npm run build` jalan di bawah Node.
RUN npm run build

# ---- runtime stage ----
FROM oven/bun:1-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
USER bun
CMD ["bun", ".output/server/index.mjs"]
