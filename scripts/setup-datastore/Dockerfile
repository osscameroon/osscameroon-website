FROM python:3.8-slim-buster

RUN apt update && apt install git gcc -y

RUN apt install make

RUN pip3 install virtualenv

WORKDIR /app

ADD ./requirements.txt ./

ADD ./Makefile ./

RUN make install-deps

COPY . /app

CMD ["make", "run-with-emulator"]
