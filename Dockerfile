# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
# USER nextjs
# Run as root to avoid permission issues with host volumes
USER root

# Expose the port
EXPOSE 6060

# Set hostname to 0.0.0.0 to allow external connections
ENV PORT=6060
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
