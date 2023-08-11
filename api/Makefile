.DEFAULT_GOAL=help
SHELL := /bin/bash
CONFIG_FILE=./config.txt
VENVPATH=venv
PY3=python3.11
PYTHON=$(VENVPATH)/bin/$(PY3)

# some dev targets for the code quality
RUFF=$(PYTHON) -m ruff app tests *.py
ISORT=$(PYTHON) -m isort app tests *.py
MYPY=$(PYTHON) -m mypy app tests *.py

venv: $(VENVPATH)/bin/activate
$(VENVPATH)/bin/activate: poetry.lock
	test -d $(VENVPATH) || virtualenv -p $(PY3) $(VENVPATH); \
	. $(VENVPATH)/bin/activate; \
	poetry install; \
	touch $(VENVPATH)/bin/activate;

$(CONFIG_FILE):
	echo "Adding config file..."
	cp example.config.txt $(CONFIG_FILE)

##install: setup your dev environment
install: venv $(CONFIG_FILE)

##run: run the api locally
run: install
	$(PYTHON) manage.py run

##format: Reformat project code.
format: venv
	${RUFF} --fix
	${ISORT}

##lint: Lint project code and check it with mypy
lint: venv
	${RUFF}
	${ISORT} --check-only --df
	${MYPY}

##test: test your code
test: install lint
	$(PYTHON) -m pytest

##clean: remove the venv and residuals
clean:
	rm -rf *.pyc
	rm -rf {*/__pycache__,*/*__pycache__,*/*/*__pycache__}

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

##lock: sync dependency tree between pyproject.toml and poetry.lock
lock: poetry.lock
	poetry lock --no-update

##docker-build: build the api docker image
docker-build:
	docker build -t oss-api:latest -f ./Dockerfile .

.PHONY : help venv run install-deps test lint docker-build
