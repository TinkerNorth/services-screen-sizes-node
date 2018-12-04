# base image
FROM keymetrics/pm2:latest-slim

# copy application and set permissions
RUN mkdir /home/node/services-screen-sizes-node
RUN chown node:node /home/node/services-screen-sizes-node
COPY --chown=node:node . /home/node/services-screen-sizes-node
WORKDIR /home/node/services-screen-sizes-node

RUN npm install

RUN npm prune --production

EXPOSE 8001

# switch to user "node"
USER node

# inject environment variables and run pm2
CMD [ "pm2-runtime", "start", "app.js"]