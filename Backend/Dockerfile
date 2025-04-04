# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build the app (if using TypeScript)
RUN npm run build || echo "No build script found, continuing..."

# Runtime stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy from build stage
COPY --from=builder /app .

# Expose port 4000
EXPOSE 4000

# Start the server
CMD ["npm", "run", "start"]