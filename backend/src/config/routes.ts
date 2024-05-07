import express, { Application } from 'express';
import { getProjects, getUsers } from '../controllers/github.controller';

export const setupRoutes = (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/', (_req, res) => {
    return res.json({ message: 'Hello World!' });
  });

  app.get('/github/users/search', getUsers);
  app.get('/github/projects/search', getProjects);
};
