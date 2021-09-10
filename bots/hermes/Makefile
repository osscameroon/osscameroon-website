# we need shell to source the venv
SHELL := /bin/bash
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

##run: run the bot locally
run: install-deps
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json $(PYTHON) cron_script.py

start: install-deps
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json $(PYTHON) listen_start.py

lint: venv
	$(PYTHON) -m flake8 . --show-source --statistics

##test: test your code
test: install-deps lint
	rm -rf $(VENVPATH)

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY : help venv install-deps test lint run start
