FROM node:lts-buster-slim

RUN mkdir /code
WORKDIR /code
ADD ./package.json /code
ADD ./yarn.lock /code

RUN --mount=target=/code/node_modules,type=cache yarn install

COPY . /code

CMD [ "yarn", "start" ]
