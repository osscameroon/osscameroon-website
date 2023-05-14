FROM python:3.11-slim-buster

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN pip install -U pip poetry && poetry install

COPY . /app

ENTRYPOINT ["/bin/sh", "-c"]

# TODO: Use gunicorn for prod and add a gunicorn config file that can be overriden by a ConfigMap
CMD ["uvicorn oss_website.main:app --host 0.0.0.0 --port 80"]
