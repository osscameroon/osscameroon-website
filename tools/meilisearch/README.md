# Meilisearch index creator

This `cli` tool creates [meilisearch](https://docs.meilisearch.com/guides/introduction/quick_start_guide.html#download-and-launch) index, that our api uses to implement the global search



## How to use

To run the `cli`, you must ssh to  the droplet where our meilisearch instance is being deployed (contact an admin to get access to the droplet) 

```bash
$> ssh <instance_host>
```



#### Then clone this repository :

```bash
$> git clone <this_repository>
```



#### Once you have downloaded the repository you will need to setup some cli secrets: 

- Add in the root of the cloned repository a `.secrets` folder then add a `.secrets/service-account.json` in this folder (contact an  admin)
- Add `meilisearch` master key : add this line `export MEILISEARCH_MASTER_KEY=<your_master_key>`   in your `~/.bashrc` (contact an admin) . The key might be set in your droplet  `/etc/systemd/system/meilisearch.service` file



#### Run the cli:

When you are ready run the cli

```bash
$> make run
```



## Run locally

To run the cli locally it is important that you install and run meilisearch as such

```bash
$> curl -L https://install.meilisearch.com | sh
$> ./meilisearch
```



now that an instance of mielisearch is running you can run the command as usual

```bash
$> make run
```

