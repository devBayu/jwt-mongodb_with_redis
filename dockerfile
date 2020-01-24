FROM node

WORKDIR /service

COPY ./dist ./dist
COPY ./package*.json ./
COPY ./.env.docker ./.env

RUN npm install
RUN ls -al
RUN cat .env

EXPOSE 80
CMD ["npm", "start"]