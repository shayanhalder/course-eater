# Use Node.js 21.7.3 Alpine for smaller image size
FROM node:21.7.3-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "dist/index.js"]