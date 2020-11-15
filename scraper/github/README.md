# CaParleDev-Scraper

A scrapper tool for devs users in Cameroun/Cameroon location.


### Requirements

- Python (3.x recommended)
- requests / pytest

### Project structure

- File/Folder structure :
```shell
.
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── settings.py
│   └── utils.py
├── img
│   └── test_screen.png
├── README.md
├── requirements.txt
└── tests
    ├── __init__.py
    └── test_utils.py
```

- Branches structure :
```shell
.
├── master
│   ├── dev
│   |    ├── feature/dev/feature-name1
│   |    ├── feature/dev/feature-name2
|   |    |    └── fix/dev/fix-name1
│   |    ├── feature/dev/feature-name3
|   |    |    ├── fix/dev/fix-name4
|   |    |    └── fix/dev/fix-name5
......
```

### How to install

- Set up your virtualenv : 
```shell
virtualenv -p python3 venv
# activate it
source venv/bin/activate
```

- Install requirements :
```shell
pip install -r requirements.txt
```


### How to launch

- To get information for a dev user :
```shell
# You need to provide the username parameter here
# u or --user_name
GOOGLE_APPLICATION_CREDENTIALS=.secrets/service-account.json python -m app.cli -u elhmn
```

- To get the list of devs from cameroun : 
```shell
# You just need to provide the pagination
# For example to get first 12 pages :
python -m app.main -p 12
```

### How to test

- To run tests, you just have to hit `pytest`.
![](./img/test_screen.png)


### Contribution workflow

- Create an issue with your feature/improvement (Optionnal but recommended).
- Fork the project.
- Create a branch for your feature/update/fix(Make sure to have the latest master-branch updates).
- Create a Pull Request to dev branch.
- After a check, it will be verify and merge to the project.
