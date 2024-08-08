FROM node:12.22-buster-slim
ARG baseURL="https://osscameroon-website-api.stage.osscameroon.com"
ENV REACT_APP_API_BASE_URL=$baseURL
ENV REACT_APP_ENV=$env

RUN mkdir /code
WORKDIR /code
ADD ./package.json ./
ADD ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM flashspys/nginx-static
RUN apk update && apk upgrade
COPY --from=0 /code/build /static
