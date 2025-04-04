# Use an official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install both production and development dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Debug: Check what files exist in the current directory
RUN ls -la

# Debug: Show tsconfig.json content
RUN cat tsconfig.json

# Debug: Run build with verbose output
RUN npm run build --verbose

# Debug: Check if dist directory was created
RUN ls -la dist || echo "dist directory does not exist"

# Try to use the TypeScript compiler directly if npm run build fails
RUN npx tsc || echo "tsc command failed"

# Check again if dist directory was created
RUN ls -la dist || echo "dist directory still does not exist"

# As a fallback, use ts-node
EXPOSE 8080
CMD ["npx", "ts-node", "app.ts"]