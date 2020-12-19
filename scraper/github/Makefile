.DEFAULT_GOAL=help

CONFIG_FILE=./config.txt
PAGES=2
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
	cp example.config.txt $(CONFIG_FILE)

##venv: setup your dev environment
install: venv $(CONFIG_FILE)

##run: run the scraper and accepts the number of PAGES as argument
## 		example: make run PAGES=5
run4users: install
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json $(PYTHON) -m app.cli -p $(PAGES) users
run4projects: install
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json $(PYTHON) -m app.cli projects

lint: venv
	$(PYTHON) -m flake8 . --show-source --statistics
	$(PYTHON) -m flake8 ./ --statistics

deploy: test
	cd deploy && ./deploy.sh

##test: test your code
test: install lint
	$(PYTHON) -m pytest

clean:
	rm -rf $(VENVPATH)

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY : help venv install test lint
