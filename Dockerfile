# Stage 1: Build Docusaurus documentation
FROM node:23-alpine AS docs-builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10

# Copy workspace config and lockfile
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./

# Copy docs package
COPY packages/docs ./packages/docs

# Copy handbook and tsconfig from core (needed for docs build)
COPY packages/core/handbook ./packages/core/handbook
COPY packages/core/tsconfig.json ./packages/core/tsconfig.json
COPY packages/core/src ./packages/core/src

# Install dependencies for docs only
RUN pnpm install --filter @mangojs/docs...

# Build Docusaurus
RUN pnpm --filter @mangojs/docs build

# Stage 2: Final nginx image with website + docs
FROM nginx:alpine

# Copy static website files
COPY packages/website /usr/share/nginx/html

# Remove website package.json (not needed in production)
RUN rm -f /usr/share/nginx/html/package.json

# Copy built Docusaurus docs into /docs subfolder
COPY --from=docs-builder /app/packages/docs/build /usr/share/nginx/html/docs

# Copy nginx configuration
COPY packages/website/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8010

CMD ["nginx", "-g", "daemon off;"]
