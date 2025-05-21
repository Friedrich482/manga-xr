# Build stage
FROM node:23-slim AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SESSION_SECRET
ENV SESSION_SECRET=${SESSION_SECRET}

ARG UPLOADTHING_TOKEN
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}

ARG BROWSERLESS_URL
ENV BROWSERLESS_URL=${BROWSERLESS_URL}

# Set up build environment
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV NODE_ENV=build-local

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
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
RUN npm run build

# Production stage
FROM node:23-slim AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

ENV SESSION_SECRET=""
ENV UPLOADTHING_TOKEN=""

EXPOSE 3000


# Use standalone Next.js server
CMD ["node", "server.js"]