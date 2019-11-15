FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json .

ENV NODE_ENV=production
ENV KEY=*k3y@st0n3*

USER node

RUN ["npm", "install", "--production"]

COPY --chown=node:node . .

EXPOSE 8080

RUN ["chmod", "+x", "./scripts/docker-start.sh"]

ENTRYPOINT [ "./scripts/docker-start.sh" ]