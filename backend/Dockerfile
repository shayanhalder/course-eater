# Use Node.js 21.7.3 Alpine for smaller image size
FROM node:21.7.3-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci
RUN npm install typescript

# Copy source code
COPY . .

# Verify TypeScript compiler is available and build
RUN npx tsc --version && npm run build && ls -la dist/

# Remove dev dependencies to reduce image size (after build is complete)
RUN npm prune --production

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "dist/index.js"]