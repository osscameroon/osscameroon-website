# Create the virtual env
# Install the packages
#

VENVPATH=venv
PYTHON=$(VENVPATH)/bin/python3

virtualenv_activate:
	test -d venv || virtualenv $(VENVPATH)
install: virtualenv_activate
	. venv/bin/activate; pip install -Ur requirements.txt
	touch venv/touchfile

.DEFAULT_GOAL=help

CONFIG_FILE=./config.ini
VENVPATH=venv
PYTHON=$(VENVPATH)/bin/python3

venv: $(VENVPATH)/bin/activate
$(VENVPATH)/bin/activate: requirements.txt
	test -d $(VENVPATH) || virtualenv -p python3 $(VENVPATH); \
	. $(VENVPATH)/bin/activate; \
	pip install -r requirements.txt; \
	touch $(VENVPATH)/bin/activate;

$(CONFIG_FILE):
	echo "adding config file..."
	cp example.config.ini $(CONFIG_FILE)

##install-deps: setup your dev environment
install-deps: venv $(CONFIG_FILE)

##run: run the api locally
run: install-deps
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json $(PYTHON) main.py

lint: venv
	$(PYTHON) -m flake8 . --show-source --statistics

##test: test your code
test: install-deps lint
	$(PYTHON) -m pytest

clean:
	rm -rf $(VENVPATH)

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY : help venv install-deps test lint
