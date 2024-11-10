# Build stage
FROM node:18-alpine AS builder

# Set up build environment
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Chrome executable path for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env .env
COPY .env.local .env.local

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Install only the needed Chrome dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Chrome executable path for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/.env.local ./.env.local

# Install only production dependencies
RUN npm install --only=production

EXPOSE 3000

# Use standalone Next.js server
CMD ["node", "server.js"]