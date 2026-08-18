# ==============================================================================
# LIVORA ENTERPRISE DOCKERFILE — OPTIMIZED FOR RED HAT OPENSHIFT SANDBOX
# ==============================================================================

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS builder
WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build Vite production bundle
COPY . .
RUN npm run build

# Stage 2: Production Server Environment
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy built frontend assets and backend server files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

# Ensure OpenShift arbitrary non-root user compatibility (Group ID 0 permissions)
RUN mkdir -p /app/server/data && \
    chown -R 1001:0 /app && \
    chmod -R g+rwX /app

USER 1001

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

CMD ["node", "server/server.js"]
