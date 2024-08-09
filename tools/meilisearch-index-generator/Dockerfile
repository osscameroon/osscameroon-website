FROM python:3.8-slim-buster

RUN apt update && apt install git gcc curl procps lsof -y

RUN apt install make

# Create appuser
ENV USER=user
ENV UID=10001

RUN adduser \
    --disabled-password \
    --gecos "" \
    --shell "/sbin/nologin" \
    --uid "${UID}" \
    "${USER}"

WORKDIR /app

ADD ./requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

# set user to `user`
CMD ["python", "-m", "app.cli"]
