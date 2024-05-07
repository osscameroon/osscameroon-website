import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'test' ? [] : ['query'],
});

export { prismaClient };
