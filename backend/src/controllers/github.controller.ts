import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../config/database"
import { GetProjectsRequestParameter, GetUsersRequestParameter } from "../types/controller";

const DEFAULT_MAX_ITEMS = 30;

export const getUsers = async (req: Request, res: Response, _next: NextFunction) => {
  const { count, page, query, sort_type } = req.query as unknown as GetUsersRequestParameter;
  const pageValue = page ? +page : 1;

  if (!query) {
    const users = await prismaClient.users.findMany({
      skip: (pageValue - 1) * DEFAULT_MAX_ITEMS,
      take: count ? Math.min(+count, DEFAULT_MAX_ITEMS) : DEFAULT_MAX_ITEMS,
    });

    const allUsers = await prismaClient.users.findMany();

    return res.json({
      result: {
        hits: users,
        limit: DEFAULT_MAX_ITEMS,
        page: pageValue,
        nbHits: allUsers.length,
        totalPages: Math.ceil(allUsers.length / DEFAULT_MAX_ITEMS),
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
    skip: (pageValue - 1) * DEFAULT_MAX_ITEMS,
    take: count ? Math.min(+count, DEFAULT_MAX_ITEMS) : DEFAULT_MAX_ITEMS,
    orderBy: {
      ...(sort_type  === 'alphabetic' ? { name: 'asc' } : {}),
      ...(sort_type  === 'popularity' ? { followers_count: 'desc' } : {}),
      ...(sort_type  === 'most_recent' ? { id: 'desc' } : {}),
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
      ...(sort_type  === 'most_recent' ? { id: 'desc' } : {}),
    }
  });

  return res.json({
    result: {
      hits: users,
      limit: DEFAULT_MAX_ITEMS,
      page: 1,
      nbHits: allUsers.length,
      totalPages: Math.ceil(allUsers.length / DEFAULT_MAX_ITEMS),
    },
  })
};

export const getProjects = async (req: Request, res: Response, _next: NextFunction) => {
  const { count, languages, page, query, sort_type } = req.query as unknown as GetProjectsRequestParameter;
  const pageValue = page ? +page : 1;

  console.log({ count, languages, page, query, sort_type });

  const languageFilter = languages ? languages.split(',') : [];

  const maxItems = count ? Math.min(+count, DEFAULT_MAX_ITEMS) : DEFAULT_MAX_ITEMS;

  if (!query) {
    console.log({ languageFilter })
    const projects = await prismaClient.projects.findMany({
      where: {
        language: languageFilter.length > 0 ? { in: languageFilter, mode: 'insensitive' } : undefined,
      },
      skip: (pageValue - 1) * maxItems,
      take: maxItems,
      orderBy: {
        ...(sort_type  === 'alphabetic' ? { name: 'asc' } : {}),
        ...(sort_type  === 'popularity' ? { stargazers_count: 'desc' } : {}),
        ...(sort_type  === 'most_recent' ? { id: 'desc' } : {}),
      }
    });

    const allProjects = await prismaClient.projects.findMany({
      where: {
        language: languageFilter.length > 0 ? { in: languageFilter, mode: 'insensitive' } : undefined,
      },
      orderBy: {
        ...(sort_type  === 'alphabetic' ? { name: 'asc' } : {}),
        ...(sort_type  === 'popularity' ? { stargazers_count: 'desc' } : {}),
        ...(sort_type  === 'most_recent' ? { id: 'desc' } : {}),
      }
    });

    return res.json({
      result: {
        hits: projects,
        limit: maxItems,
        page: pageValue,
        nbHits: allProjects.length,
        totalPages: Math.ceil(allProjects.length / maxItems),
      },
    });
  }

  const projects = await prismaClient.projects.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { fullName: { contains: query } },
        { description: { contains: query } },
        { language: languageFilter.length > 0 ? { in: languageFilter } : undefined },
      ]
    },
    skip: (pageValue - 1) * maxItems,
    take: maxItems,
    orderBy: {
      ...(sort_type  === 'alphabetic' ? { name: 'asc' } : {}),
      ...(sort_type  === 'popularity' ? { stargazers_count: 'desc' } : {}),
      ...(sort_type  === 'most_recent' ? { id: 'desc' } : {}),
    }
  });

  const allProjects = await prismaClient.projects.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { fullName: { contains: query } },
        { description: { contains: query } },
        { language: languageFilter.length > 0 ? { in: languageFilter } : undefined },
      ]
    },
    skip: (pageValue - 1) * maxItems,
    take: maxItems,
    orderBy: {
      ...(sort_type  === 'alphabetic' ? { name: 'asc' } : {}),
      ...(sort_type  === 'popularity' ? { stargazers_count: 'desc' } : {}),
      ...(sort_type  === 'most_recent' ? { id: 'desc' } : {}),
    }
  });

  return res.json({
    result: {
      hits: projects,
      limit: maxItems,
      page: 1,
      nbHits: allProjects.length,
      totalPages: Math.ceil(allProjects.length / maxItems),
    },
  })
};