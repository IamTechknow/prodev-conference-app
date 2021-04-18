FROM node:alpine

WORKDIR /usr/local/locations

COPY . .

RUN npm install
RUN apk add --no-cache bash

EXPOSE 80

ENTRYPOINT bash -c 'while !</dev/tcp/locations_db/5432; do sleep 1; done; npm run migrate -- up; npm run dev'
