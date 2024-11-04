FROM node:18-alpine

# Set environment variable to skip Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Chrome and dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Add Chrome executable path for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Verify Chrome installation
RUN chromium-browser --version

# Install your app here  
WORKDIR /app 
COPY package*.json ./
RUN npm install  
COPY . .
RUN npx prisma generate
RUN npm run build 
EXPOSE 3000  
CMD ["npm", "start"] 