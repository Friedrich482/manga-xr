# Use the official Node.js image as the base image
FROM node:18-slim

# Set the working directory

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Verify that Chrome is installed at the expected location
RUN ls -alh /usr/bin/google-chrome-stable && \
    /usr/bin/google-chrome-stable --version
# Install your app here  
WORKDIR /app 
COPY package*.json ./
RUN npm install  
COPY . .
RUN npx prisma generate
RUN npm run build 
EXPOSE 3000  
CMD ["npm", "start"] 