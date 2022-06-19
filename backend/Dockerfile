FROM node:12.13-alpine As development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG DB_HOST
ENV DB_HOST=${DB_HOST}

ARG DB_PORT
ENV DB_PORT=${DB_PORT}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

# PEM IN HERE
COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]
