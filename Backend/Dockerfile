# Use an official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files (including MongoDB scripts)
COPY . .

# Expose port 8080 and start the server
EXPOSE 8080
CMD ["node", "server.js"]  # Replace 'server.js' with your entry point file name.