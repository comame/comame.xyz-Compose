FROM node:alpine

WORKDIR /home/node/app

COPY package.json /home/node/app
RUN npm install

COPY src /home/node/app
COPY password.json /home/node/app
CMD node app.js

EXPOSE 80
