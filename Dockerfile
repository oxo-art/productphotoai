
# Multi-stage build for Node.js web service deployment
FROM node:18-alpine as build

WORKDIR /app

# Copy package files (remove bun.lockb reference for npm consistency)
COPY package*.json ./

# Install ALL dependencies (including dev dependencies needed for TypeScript compilation)
RUN npm ci

# Copy source code
COPY . .

# Build the application (TypeScript compilation + Vite build)
RUN npm run build

# Production stage with Node.js (not nginx)
FROM node:18-alpine as production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Create a simple server script
RUN echo 'const express = require("express"); const path = require("path"); const app = express(); const PORT = process.env.PORT || 8080; app.use(express.static("dist")); app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "dist", "index.html")); }); app.listen(PORT, "0.0.0.0", () => { console.log(`Server running on port ${PORT}`); });' > server.js

# Add express for serving
RUN npm install express

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# Expose port 8080
EXPOSE 8080

# Start the Node.js web service
CMD ["node", "server.js"]
