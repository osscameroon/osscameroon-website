import { NextFunction, Request, Response } from 'express';
import { prismaClient } from '../config/database';
import { GetProjectsRequestParameter, GetUsersRequestParameter } from '../types/controller';

const DEFAULT_MAX_ITEMS = 30;

export const getUsers = async (req: Request, res: Response, _next: NextFunction) => {
  const { count, page, query, sort_type } = req.query as unknown as GetUsersRequestParameter;
  const pageValue = page ? +page : 1;
  const maxItems = count ? Math.min(+count, DEFAULT_MAX_ITEMS) : DEFAULT_MAX_ITEMS;

  const hasNoQueryParameter = !count && !page && !query && !sort_type;

  if (hasNoQueryParameter) {
    const users = await prismaClient.user.findMany({
      orderBy: { name: 'asc' },
      skip: (pageValue - 1) * DEFAULT_MAX_ITEMS,
      take: maxItems,
    });

    const allUsers = await prismaClient.user.findMany();

    return res.json({
      result: {
        hits: users,
        limit: maxItems,
        nbHits: allUsers.length,
        page: pageValue,
        totalPages: Math.ceil(allUsers.length / maxItems),
      },
    });
  }

  if (pageValue < 0) {
    return res.json({
      result: {
        hits: [],
        limit: maxItems,
        nbHits: 0,
        page: 0,
        totalPages: 0,
      },
    });
  }

  const users = await prismaClient.user.findMany({
    orderBy: {
      ...(sort_type === 'popularity' ? { followers_count: 'desc' } : {}),
      ...(sort_type === 'most_recent' ? { id: 'desc' } : {}),
      ...(sort_type !== 'popularity' && sort_type !== 'most_recent' ? { name: 'asc' } : {}), // it means sort_type === 'alphabetic' by default
    },
    skip: (pageValue - 1) * maxItems,
    take: maxItems,
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { login: { contains: query, mode: 'insensitive' } },
            { company: { contains: query, mode: 'insensitive' } },
            { bio: { contains: query, mode: 'insensitive' } },
          ],
        }
      : undefined,
  });

  const allUsers = await prismaClient.user.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { login: { contains: query, mode: 'insensitive' } },
            { company: { contains: query, mode: 'insensitive' } },
            { bio: { contains: query, mode: 'insensitive' } },
          ],
        }
      : undefined,
  });

  return res.json({
    result: {
      hits: users,
      limit: maxItems,
      nbHits: allUsers.length,
      page: pageValue,
      totalPages: Math.ceil(allUsers.length / maxItems),
    },
  });
};

export const getProjects = async (req: Request, res: Response, _next: NextFunction) => {
  const { count, languages, page, query, sort_type } = req.query as unknown as GetProjectsRequestParameter;
  const pageValue = page ? +page : 1;

  console.log({ count, languages, page, query, sort_type });

  const languageFilter = languages ? languages.split(',') : [];
  const maxItems = count ? Math.min(+count, DEFAULT_MAX_ITEMS) : DEFAULT_MAX_ITEMS;

  if (!query) {
    const projects = await prismaClient.project.findMany({
      orderBy: {
        stargazers_count: 'desc',
      },
      skip: (pageValue - 1) * maxItems,
      take: maxItems,
    });

    const allProjects = await prismaClient.project.findMany();

    return res.json({
      result: {
        hits: projects,
        limit: maxItems,
        nbHits: allProjects.length,
        page: pageValue,
        totalPages: Math.ceil(allProjects.length / maxItems),
      },
    });
  }

  const projects = await prismaClient.project.findMany({
    orderBy: {
      ...(sort_type === 'alphabetic' ? { name: 'asc' } : {}),
      ...(sort_type === 'popularity' ? { stargazers_count: 'desc' } : {}),
      ...(sort_type === 'most_recent' ? { id: 'desc' } : {}),
    },
    skip: (pageValue - 1) * maxItems,
    take: maxItems,
    where: {
      OR: [
        { name: { contains: query } },
        { fullName: { contains: query } },
        { description: { contains: query } },
        { language: languageFilter.length > 0 ? { in: languageFilter } : undefined },
      ],
    },
  });

  const allProjects = await prismaClient.project.findMany({
    orderBy: {
      ...(sort_type === 'alphabetic' ? { name: 'asc' } : {}),
      ...(sort_type === 'popularity' ? { stargazers_count: 'desc' } : {}),
      ...(sort_type === 'most_recent' ? { id: 'desc' } : {}),
    },
    skip: (pageValue - 1) * maxItems,
    take: maxItems,
    where: {
      OR: [
        { name: { contains: query } },
        { fullName: { contains: query } },
        { description: { contains: query } },
        { language: languageFilter.length > 0 ? { in: languageFilter } : undefined },
      ],
    },
  });

  return res.json({
    result: {
      hits: projects,
      limit: maxItems,
      nbHits: allProjects.length,
      page: 1,
      totalPages: Math.ceil(allProjects.length / maxItems),
    },
  });
};
