### OSS Cameroon

## How to install and launch

- Copy and update the with correct params (you can use the stage api)

```bash
cp .env.example .env
```

- Then start the frontend
  - From your computer
    ```bash
    # install dependencies
    yarn install

    # start the frontend
    yarn start
    ```
  - From the dockerfile
    ```bash
    # Build the docker image
    docker build --no-cache -t osscameroon:latest -f Dockerfile .

    # Then run it on port 3000
    docker run -it -p 3000:3000 osscameroon
    ```

Then the app should be running on localhost:3000
