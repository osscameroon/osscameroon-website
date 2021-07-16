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

##run: run the indexer
## 		example: make run
run: install-deps
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json $(PYTHON)

##run-with-emulator: Run start  the bot with the gcloud datastore emulator
##      example: make run-with-emulator
run-with-emulator: install-deps
	$(PYTHON) emulator listen_start.py

lint: venv
	$(PYTHON) python3 -v . --show-python3 version 
	

##test: test your code
test: install-deps lint
	$(PYTHON) rmulator dbstore.py 

clean:
	rm -rf $(VENVPATH)

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY : help venv install-deps test lint
