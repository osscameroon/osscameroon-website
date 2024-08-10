FROM python:3.8-slim-buster

# https://smirnov-am.github.io/running-flask-in-production-with-docker/
# https://abdul-the-coder.medium.com/how-to-deploy-a-containerised-python-web-application-with-docker-flask-and-uwsgi-8862a08bd5df

RUN apt update && apt install git gcc nginx build-essential systemd systemd-sysv curl procps lsof -y

RUN pip install uwsgi

# Create appuser
ENV USER=user
ENV UID=10001

RUN adduser \
    --disabled-password \
    --gecos "" \
    --shell "/sbin/nologin" \
    --uid "${UID}" \
    "${USER}"

ENV PYHTONUNBUFFERED 1

# set user to `user`
USER user

RUN mkdir /home/user/code
WORKDIR /home/user/code
ADD ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . /home/user/code

CMD ["uwsgi", "--ini", "api.ini"]
