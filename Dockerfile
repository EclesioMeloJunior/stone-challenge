FROM node:10-alpine

WORKDIR /app

COPY ./package.json .

RUN ["npm", "install"]

ENV NODE_ENV=production

COPY . .

ENTRYPOINT [ "./scripts/docker-start.sh" ]