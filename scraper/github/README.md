# Github-Scraper

## Requirements

- Python (3.x recommended)
- requests / pytest

### How to install

### Using Makefile

```bash
# To install dev dependencies
make install-dev-deps

# To install prod dependencies
make install-deps
```

### Manually

- Set up your virtualenv :
```shell
virtualenv -p python3 venv
# activate it
source venv/bin/activate
```

- Install requirements :
```shell
# or requirements-dev.txt
pip install -r requirements.txt
```

- Copy `example.config.txt` to `config.txt` and provide real values.


### How to launch

- To get information for a dev user :
```shell
# You need to provide the username parameter here
# u or --user_name
python -m app.cli -u elhmn
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
