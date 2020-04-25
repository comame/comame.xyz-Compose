FROM node

COPY ./ /home/node/app
WORKDIR /home/node/app

RUN npm i --production

CMD npx nodemon dist/server/app.js
