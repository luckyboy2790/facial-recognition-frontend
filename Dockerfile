# Stage 1: Build the Vite app
FROM node:23 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend source files
COPY . ./

# Build the Vite app in production mode
RUN npm run build

# Stage 2: Serve the built files using Nginx
FROM nginx:alpine

# Copy the build output to Nginx’s public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy mime.types file into the container
COPY mime.types /etc/nginx/mime.types

# Expose the port for Nginx to serve files
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
