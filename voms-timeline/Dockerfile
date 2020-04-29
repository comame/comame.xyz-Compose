FROM node

WORKDIR /home/node/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i --production

COPY ./ ./

CMD node --enable-source-maps dist/server/app.js
