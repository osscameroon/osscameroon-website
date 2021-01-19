.DEFAULT_GOAL=help

VENVPATH=venv
PYTHON=$(VENVPATH)/bin/python3

venv: $(VENVPATH)/bin/activate
$(VENVPATH)/bin/activate: requirements.txt
	test -d $(VENVPATH) || virtualenv -p python3 $(VENVPATH); \
	. $(VENVPATH)/bin/activate; \
	pip install -r requirements.txt; \
	touch $(VENVPATH)/bin/activate;


##venv: setup your dev environment
install-deps: venv

##run: run the scraper and accepts the number of PAGES as argument
## 		example: make run
run: install-deps
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json $(PYTHON) -m app.cli

lint: venv
	$(PYTHON) -m flake8 . --show-source --statistics
	$(PYTHON) -m flake8 ./ --statistics

##test: test your code
test: install-deps lint
	$(PYTHON) -m pytest

clean:
	rm -rf $(VENVPATH)

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY : help venv install-deps test lint
