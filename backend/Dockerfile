# Use Node.js 21.7.3 Alpine for smaller image size
FROM node:21.7.3-alpine

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Define build arguments
#ARG NODE_ENV
#ARG PORT
#ARG DB_URI

# Set environment variables from build args (only for non-sensitive values)
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
# Note: DB_URI is passed at runtime via environment, not stored in image

# Install dependencies
RUN npm ci

# Build TypeScript and verify the output
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port
EXPOSE $PORT

# Start the application
CMD ["node", "dist/index.js"]
