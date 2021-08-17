SHELL := /bin/bash
.DEFAULT_GOAL=help

VENVPATH=venv
PYTHON=$(VENVPATH)/bin/python3

export GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json

##venv-activate: Activate the virtual environment
##
venv-activate:
	source $(VENVPATH)/bin/activate

##venv: setup and install requirements in your dev environment
##
install: 
	test -d $(VENVPATH) || virtualenv -p python3 $(VENVPATH)
	chmod a+x $(VENVPATH)/bin/activate
	source $(VENVPATH)/bin/activate
	pip install -r requirements.txt

##gen_requirements: Generate the requirements file
##
gen_requirements: venv-activate
	pip freeze > requirements.txt

##uninstall: uninstall all requirements
##
uninstall:
	rm -rf $(VENVPATH)

##run: run the cron script
##  example: make run
##
run: venv-activate
	python cron_script.py

##start: Run start script to listen for /start commands
##  example: make start
##
start: venv-activate
	python listen_start.py

##lint: lint code, TODO
##
lint: venv-activate

##test: test code, TODO
##
test: venv-activate

##clean: clean up code
##
clean: uninstall

##help: show help
##
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY: help venv-activate install gen_requirements uninstall run start test lint
