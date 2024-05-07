import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { prismaClient } from './config/database';
import { setupRoutes } from './config/routes';

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

setupRoutes(app);

app.listen(PORT, async () => {
  await prismaClient.$connect();

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
