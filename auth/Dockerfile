FROM node:alpine

WORKDIR /usr/local/auth

COPY . .

RUN npm install
RUN apk add --no-cache bash

EXPOSE 80

ENTRYPOINT bash -c 'while !</dev/tcp/auth-postgres/5432; do sleep 1; done; npm run migrate -- up; npm run dev'
