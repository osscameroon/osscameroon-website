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

run: install
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json $(PYTHON) -m main.py 
