FROM node:lts-buster-slim

RUN mkdir /code
WORKDIR /code
ADD ./package.json ./
ADD ./yarn.lock ./

RUN yarn install

COPY . /code

CMD [ "yarn", "start" ]
