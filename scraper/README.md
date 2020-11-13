# CaParleDev-Scraper

A scrapper tool for devs users in Cameroun/Cameroon location.

### Project structure

- File/Folder structure :
```shell
.
├── github
│   ├── app
│   │   ├── cli.py
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   └── utils
│   │       ├── github_requests.py
│   │       ├── __init__.py
│   ├── install.sh
│   ├── README.md
│   ├── requirements.txt
│   └── tests
│       ├── __init__.py
│       └── test_github_requests.py
├── img
│   └── test_screen.png
├── README.md
└── twitter
    ├── app
    │   ├── __init__.py
    │   ├── main.py
    │   ├── settings.py
    │   └── utils
    │       ├── extractors.py
    │       ├── get_twitter_stats.py
    │       ├── __init__.py
    ├── example.config.txt
    ├── img
    │   ├── page_summary.png
    │   ├── top_follower.png
    │   └── top_mention.png
    ├── README.md
    ├── requirements.txt
    └── tests
        └── __init__.py
```

- Branches structure :
```shell
.
├── master
│   ├── dev
│   |    ├── backend/feature/dev/feature-name1
│   |    ├── frontend/feature/dev/feature-name2
|   |    |    └── frontend/fix/dev/fix-name1
│   |    ├── mobile/feature/dev/feature-name3
|   |    |    ├── mobile/fix/dev/fix-name4
|   |    |    └── mobile/fix/dev/fix-name5
......
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
