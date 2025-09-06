# Use Node.js 21.7.3 Alpine for smaller image size
FROM node:21.7.3-alpine

# Set working directory
WORKDIR /app

COPY . .

RUN npm ci
# Build TypeScript and verify the output
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "dist/index.js"]
