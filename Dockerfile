FROM node:20 as build
WORKDIR /mintindex
COPY . .

RUN npm i
RUN npm run build
EXPOSE 3000/tcp
CMD [ "/bin/sh", "./docker-startup.sh" ]
# FROM node:20 as prod
# # WORKDIR /app

# COPY --from=build /mintindex/build ./build
# RUN npm i -g vite
# USER node