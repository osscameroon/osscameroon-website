# Create the virtual env
# Install the packages
#

VENVPATH=venv

install: 
	test -d venv || virtualenv $(VENVPATH)
	. venv/bin/activate; pip install -Ur requirements.txt
	touch venv/touchfile

run: install
	GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json python -m main.py 
