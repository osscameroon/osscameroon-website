#!/usr/bin/env zx

import { $, sleep } from 'zx';

const PG_DATABASE = 'oss-cameroon';
const CONTAINER_NAME = 'oss-cameroon-test-db';

if (!process.env.CI) {
    console.log('Create the test database if necessary');

    try {
        await $`docker ps | grep ${CONTAINER_NAME}`;
    } catch (error) {
        // Container not found, creating a new one.
        await $`docker run -d --rm --name ${CONTAINER_NAME} -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=${PG_DATABASE} -p 5434:5432 postgres:14.11`;

        await sleep(5000); // Wait for 5 seconds the container to initialize
    }

    process.env.DATABASE_URL = `postgresql://user:password@127.0.0.1:5434/${PG_DATABASE}?schema=public`;

    // Reset database and apply all migrations
    await $`yarn prisma migrate reset --force`;
}

