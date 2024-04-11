import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../config/database"
import { GetUsersRequestParameter } from "../types/controller";

const MAX_ITEMS = 30;

export const getUsers = async (req: Request, res: Response, _next: NextFunction) => {
  const { count, page, query, sort_type } = req.query as unknown as GetUsersRequestParameter;
  const pageValue = page ?? 1


  if (!query) {
    const users = await prismaClient.users.findMany({
      skip: (pageValue - 1) * MAX_ITEMS,
      take: count ? Math.min(count, MAX_ITEMS) : MAX_ITEMS,
    });

    const allUsers = await prismaClient.users.findMany();

    return res.json({
      result: {
        hits: users,
        limit: MAX_ITEMS,
        page: pageValue - 1,
        nbHits: allUsers.length,
        totalPages: Math.ceil(allUsers.length / MAX_ITEMS),
      },
    });
  }

  const users = await prismaClient.users.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { login: { contains: query } },
        { company: { contains: query } },
        { bio: { contains: query } },
      ]
    },
    skip: (pageValue - 1) * MAX_ITEMS,
    take: count ? Math.min(count, MAX_ITEMS) : MAX_ITEMS,
    orderBy: {
      ...(sort_type  === 'alphabetic' ? { name: 'asc' } : {}),
      ...(sort_type  === 'popularity' ? { followers_count: 'desc' } : {}),
      ...(sort_type  === 'most_recent' ? { id: 'asc' } : {}),
    }
  });

  const allUsers = await prismaClient.users.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { login: { contains: query } },
        { company: { contains: query } },
        { bio: { contains: query } },
      ]
    },
    orderBy: {
      ...(sort_type  === 'alphabetic' ? { name: 'asc' } : {}),
      ...(sort_type  === 'popularity' ? { followers_count: 'desc' } : {}),
      ...(sort_type  === 'most_recent' ? { id: 'asc' } : {}),
    }
  });

  return res.json({
    result: {
      hits: users,
      limit: MAX_ITEMS,
      page: 1,
      nbHits: allUsers.length,
      totalPages: Math.ceil(allUsers.length / MAX_ITEMS),
    },
  })
};