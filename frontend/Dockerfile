FROM node:12.22-buster-slim
ARG baseURL="http://127.0.0.1:8811"
ARG env="development"
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
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=0 /code/nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /code/build /static
