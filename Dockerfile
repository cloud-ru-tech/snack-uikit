## create image
ARG NGINX_BASE_IMAGE
FROM $NGINX_BASE_IMAGE
COPY ./storybook-static/. /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
