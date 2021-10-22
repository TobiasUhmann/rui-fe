#
# Build Vue app
#

FROM node:16 AS build-vue

WORKDIR /rui-fe/

COPY package.json package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

#
# Build Docker image
#

FROM nginx:1

COPY nginx.conf /etc/nginx/

COPY --from=build-vue /rui-fe/dist/ /usr/share/nginx/html/
