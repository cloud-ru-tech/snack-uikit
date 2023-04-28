## build sources
ARG NODE_BASE_IMAGE
FROM $NODE_BASE_IMAGE AS builder
COPY . .

RUN npm ci
RUN npm run build:packages
RUN npm run build:storybook

## create image
FROM proxies-docker.pkg.sbercloud.tech/nginx:alpine
COPY --from=builder /storybook-static /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
