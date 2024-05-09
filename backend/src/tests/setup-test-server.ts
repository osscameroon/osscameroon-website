import * as http from 'node:http';
import express from 'express';
import dotenv from 'dotenv';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { PrismaClient } from '@prisma/client';

dotenv.config({
  path: '.env.test',
});

import { prismaClient } from '../config/database';
import { setupRoutes } from '../config/routes';

export type TestInstance = {
  apiClient: AxiosInstance;
  dbClient: PrismaClient;
  httpServer: http.Server;
};

const getAxiosResponseData = (response: AxiosResponse) => response.data;

const handleAxiosRequestFailure = ({ response }: AxiosError) => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    data: response?.data,
    status: response?.status,
  });
};

const resolveAxiosError = (e: any) => e;

export const setupTestServer = () => {
  const app = express();

  setupRoutes(app);

  return new Promise<http.Server>((resolve, _reject) => {
    const httpServer = app.listen(45000, async () => {
      await prismaClient.$connect();

      const originalClose = httpServer.close.bind(httpServer);

      // @ts-expect-error normal error
      httpServer.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };

      return resolve(httpServer);
    });
  });
};

const initializeServerAndApiClient = async (): Promise<TestInstance> => {
  const httpServer = await setupTestServer();
  // @ts-expect-error bad server types
  const baseURL = `http://localhost:${httpServer.address().port}`;

  const apiClient = axios.create({ baseURL });

  apiClient.interceptors.response.use(getAxiosResponseData, handleAxiosRequestFailure);

  return { apiClient, dbClient: prismaClient, httpServer };
};

export { initializeServerAndApiClient, resolveAxiosError };
