# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Runtime environment
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json to install production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy compiled files from the builder stage
COPY --from=builder /app/dist ./dist

# Specify the port the app will run on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]

