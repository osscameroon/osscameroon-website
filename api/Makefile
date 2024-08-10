.DEFAULT_GOAL=help

CONFIG_FILE=./config.txt
VENVPATH=venv
PYTHON=$(VENVPATH)/bin/python3

venv: $(VENVPATH)/bin/activate
$(VENVPATH)/bin/activate: requirements.txt
	test -d $(VENVPATH) || python3 -m venv $(VENVPATH); \
	. $(VENVPATH)/bin/activate; \
	pip install -r requirements.txt; \
	touch $(VENVPATH)/bin/activate;

$(CONFIG_FILE):
	echo "adding config file..."
	cp example.config.txt $(CONFIG_FILE)

##install-deps: setup your dev environment
install-deps: venv $(CONFIG_FILE)

##run: run the api locally
run: install-deps
	$(PYTHON) manage.py run

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
