# Github-Scraper

## Requirements

- Python (3.x recommended)
- requests / pytest

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

## Output

- The Output of Summary scrapping
![summary](./img/page_summary.png)

- The Output of Top-Follower
![top-follower](./img/top_follower.png)

- The Output of Top-Mention
![top-mention](./img/top_mention.png)
