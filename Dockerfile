## build sources
ARG NODE_BASE_IMAGE
ARG NGINX_BASE_IMAGE

FROM $NODE_BASE_IMAGE AS builder
COPY . .
RUN export NODE_OPTIONS="--max-old-space-size=8192"
RUN npm ci
RUN npm run build:packages
RUN npm run build:storybook

## create image
FROM $NGINX_BASE_IMAGE
COPY --from=builder /storybook-static /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
