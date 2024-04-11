import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { prismaClient } from "./config/database"
import {getUsers} from "./controllers/github.controller";

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.get('/github/users/search', getUsers);

app.listen(PORT, async () => {
  await prismaClient.$connect();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
