FROM node:20-alpine

WORKDIR /usr/src

COPY package*.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]