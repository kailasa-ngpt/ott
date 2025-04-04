# Use an official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install both production and development dependencies
# We need dev dependencies to compile TypeScript
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the port your app runs on
EXPOSE 8080

# Start the server using the compiled JavaScript files
CMD ["node", "dist/app.js"]