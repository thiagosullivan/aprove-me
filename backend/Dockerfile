FROM node:latest

WORKDIR /usr/src/api

COPY . .

RUN npm install --quite --no-optional -no-fund --loglevel=error

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]