FROM node

COPY ./ /home/node/app
WORKDIR /home/node/app

RUN npm i --production

CMD node dist/server/app.js
