FROM node:12.22.9-buster-slim

RUN mkdir /code
WORKDIR /code
ADD ./package.json ./
ADD ./yarn.lock ./

RUN yarn install

COPY . /code

CMD [ "yarn", "start" ]
