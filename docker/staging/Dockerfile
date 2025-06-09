# Build stage
FROM node:23-slim AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

# Set up build environment
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV BUILD_ENV=build-local

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Puppeteer expects Chrome/Chromium at a known path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npx prisma generate
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm run build

# Production stage
FROM node:23-slim AS runner

WORKDIR /app
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy only necessary files from builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Use standalone Next.js server
CMD ["node", "server.js"]