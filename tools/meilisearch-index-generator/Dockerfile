FROM python:3.8-slim-buster

RUN apt update && apt install git gcc curl procps lsof -y

RUN apt install make

WORKDIR /app

ADD ./requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
