FROM python:3.8-slim-buster

RUN apt update && apt install git gcc -y
RUN apt install make
RUN pip3 install virtualenv
COPY . /app
WORKDIR /app
CMD ["make", "run-with-emulator"]
