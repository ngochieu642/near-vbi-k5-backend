FROM node:14-buster-slim as build-stage
WORKDIR /app
COPY package*.json /app/
RUN yarn
COPY . .
RUN npm run build

FROM nginx:1.21

COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

