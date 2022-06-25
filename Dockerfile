### STAGE 1 Client Builder ###

FROM node as builder

WORKDIR /usr/src/client

COPY ./client .

RUN npm install

RUN npm run build

### STAGE 2 Server ###
FROM node

WORKDIR /usr/src/server

COPY ./server .

COPY --from=builder ./usr/src/client/dist ./static

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run-script", "start:prod"]