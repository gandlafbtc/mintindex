FROM node:20 as build
WORKDIR /mintindex
COPY . .

RUN npm i
RUN npm run build
CMD [ "/bin/sh", "./docker-startup.sh" ]
# FROM node:20 as prod
# # WORKDIR /app

# COPY --from=build /mintindex/build ./build
# RUN npm i -g vite
# EXPOSE 4173/tcp
# USER node