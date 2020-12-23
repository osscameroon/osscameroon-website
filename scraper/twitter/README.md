# Twitter-Scraper

## Requirements

- Python (3.x recommended)
- Bearer Token from Twitter Projects

### Setting up a python virtualenv

- Set up your virtualenv : 
```shell
python -m venv <venv name>

# activate it
source <venv name>/bin/activate
```

- Install requirements:
```shell
pip install -r requirements.txt
```

### Generating config file 'config.ini'
- Run python generate\_config\_file.py

### [optional] Import MySQL database schema (if running the mysql script)
- mysql -u <username> -p < files/twitter\_db\_schema.sql

### Run script without MySQL connection
```shell
python main.py
```
### Run script with MySQL connection
```shell
python main_mysql.py
```
