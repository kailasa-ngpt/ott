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

# Install specific packages that might be missing
RUN npm install --save node-cache @types/node-cache

# Build TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]