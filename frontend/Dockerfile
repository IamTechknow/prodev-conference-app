FROM node:alpine

WORKDIR /usr/local/frontend

COPY . .

RUN npm install

ARG REACT_APP_API_URL

RUN ["npm", "run", "build"]

EXPOSE 80

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY frontend.nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /usr/local/frontend/build .