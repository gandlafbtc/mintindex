FROM node:alpine as build
WORKDIR /nutstash
COPY . .

RUN npm i
RUN npm run build

FROM node:alpine as prod
# WORKDIR /app
COPY ./package*.json ./
RUN npm ci --production --silent --ignore-scripts
COPY --from=build /nutstash/build ./build
COPY --from=build /nutstash/docker-startup.sh ./build

EXPOSE 3000/tcp
USER node
CMD [ "/bin/sh", "build/docker-startup.sh" ]