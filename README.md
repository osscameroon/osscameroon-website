# OssCameroon

Our goal as a community is to improve the lives of individual members of the society. We hope to accomplish this by reinforcing Cameroonian developers to take up the habit of contributing to open source projects and technologies; especially projects with the potential to enhance the quality of life for our local communities. By promoting mentorship, collaboration and knowledge sharing, we ensure to provide a joyful environment for developers to put their best skill in the service of the society.

You can access the WebSite [here](https://www.osscameroon.com/).

## Community Chat

- Telegram : https://t.me/joinchat/UpKZh_T3W02LsGvQ
- Telegram channel: https://t.me/osscameroonchannel

## Frontend
Here is the part responsible to serve the page the users will interact with. The main feature
- Browse the list of developers registered on GitHub
- Browse the list of projects on GitHub maintained by Cameroonian develop
- View the trending tweets on the hashtag #caparledev

#### Requirements
- Node.js 10+
- Yarn 1.21+

#### How to install
```bash
cd frontend
yarn install
```

Create configuration file for local environment by copying the `.env.example` 
file then edit the content to met your local configuration
```bash
cp .env.example .env
nano .env
```

#### How to launch
```bash
yarn start
```


## Backend api

This is the backend part.

#### Requirements

- Python (3.x recommended)
- pip (18.1)
- make (GNU Make 4.2.1)
- [meilisearch](https://www.meilisearch.com/)

#### How to install

You just have to follow these steps :
```shell
# cd to the api
cd api

# With make
make install-deps
```

#### How to launch

```sh
make run
```


## Scraper

On the scraper, we have :
- The Twitter scraper (For tweets containing a specific hashtag)
- The github scraper to scrap projects and developers list.
We're going to add other scrapers !

#### Requirements

- Python (3.x recommended)
- pip (18.1)
- make (GNU Make 4.2.1)

#### How to install

You just have to follow these steps :
```shell
# cd to the twitter scraper
cd scraper/twitter
# or to the scraper/github

# With make
make install-deps
```

#### How to launch

To launch :
```sh
make run
```


## How to contribute

- Create an issue where you explain clearly the problem you want to solve 
- Make a PR
- If it's relevant, we're going to merge it.
Yeah, it's simple as this !


## LICENSE

- [GPL](./LICENSE)
