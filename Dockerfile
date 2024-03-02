
FROM node:alpine

WORKDIR /app

RUN npm install --global npm

COPY package.json package-lock.json ./

RUN npm install

COPY . .



CMD ["npm","run" ,"start:dev"]