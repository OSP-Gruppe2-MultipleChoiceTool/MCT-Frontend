FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine AS production-stage
COPY --from=build-stage /app/dist /app

RUN npm install -g http-server

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

COPY entrypoint.sh /docker-entrypoint.d/entrypoint.sh
RUN chmod +x /docker-entrypoint.d/entrypoint.sh

COPY default_cert.pem /app/cert.pem
COPY default_key.pem /app/key.pem

EXPOSE 80
EXPOSE 443
CMD ["/docker-entrypoint.d/entrypoint.sh"]
