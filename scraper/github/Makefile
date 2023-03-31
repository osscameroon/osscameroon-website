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

##install-deps: setup your dev environment
install-deps: venv $(CONFIG_FILE)

##run: run the scraper and accepts the number of PAGES as argument
## 		example: make run PAGES=5
run4users: install-deps
	$(PYTHON) -m app.cli -p $(PAGES) users
run4projects: install-deps
	$(PYTHON) -m app.cli projects

format:
	$(PYTHON) -m black .

lint: venv
	$(PYTHON) -m flake8 . --show-source --statistics

deploy: test
	cd deploy && ./deploy.sh

##test: test your code
test:
	$(PYTHON) -m pytest -s -vv --disable-pytest-warnings

clean:
	rm -rf $(VENVPATH)
	rm -rf __pycache__ */__pycache__ */*/__pycache__

start-mongo:
	docker run -d -p 27017:27017 --name mongo -h mongo --rm mongo:latest

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY : help venv install-deps test lint start-mongo clean deploy format
