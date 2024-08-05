FROM python:3.10.11-slim-buster

WORKDIR /src

COPY pyproject.toml poetry.lock ./
RUN pip install -U pip poetry

RUN poetry config virtualenvs.create false && poetry install

COPY . .

ENTRYPOINT ["/bin/sh", "-c"]

# TODO: Use gunicorn for prod and add a gunicorn config file that can be overriden by a ConfigMap
CMD ["python3 manage.py"]
