## build sources
FROM node:16-alpine AS builder
COPY . .

RUN npm run all:cleaninstall
RUN npm run build:storybook

## create image
FROM nginx:alpine
COPY --from=builder /storybook-static /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
