#syntax = docker/dockerfile:experimental
FROM python:3.8-slim-buster

RUN apt update && apt install git gcc -y
ENV PYHTONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD ./requirements.txt /code
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt

COPY . /code

CMD [ "python", "manage.py", "run" ]
