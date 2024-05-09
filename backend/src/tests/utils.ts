import { Prisma, PrismaClient } from '@prisma/client';
import { ar, faker } from '@faker-js/faker';

export const cleanDatabase = async (prismaClient: PrismaClient) => {
  await prismaClient.user.deleteMany();
  await prismaClient.project.deleteMany();
  await prismaClient.license.deleteMany();
};

const aUser = (override: Partial<Prisma.UserCreateInput>): Prisma.UserCreateInput => {
  const sexType = faker.person.sexType();
  const firstName = faker.person.firstName(sexType);
  const lastName = faker.person.lastName(sexType);
  const login = faker.internet.userName({ firstName, lastName });
  const id = faker.number.int({ max: 8, min: 2 });

  return {
    avatar_url: `https://avatars.githubusercontent.com/u/${id}?v=4`,
    bio: faker.person.bio(),
    blog_url: null,
    company: faker.company.buzzNoun(),
    email: faker.internet.email({ firstName, lastName, provider: 'osscm.com' }),
    events_url: null,
    followers_count: faker.number.int({ max: 5000, min: 0 }),
    followers_url: `https://api.github.com/users/${login}/followers`,
    followingCount: faker.number.int({ max: 500, min: 0 }),
    following_url: `https://api.github.com/users/${login}/following{/other_user}`,
    gists_url: null,
    gravatar_id: null,
    hireable: Boolean(faker.number.int({ max: 1, min: 0 })),
    html_url: `https://github.com/${login}`,
    location: null,
    login,
    name: `${firstName} ${lastName}`,
    nodeId: faker.string.uuid(),
    organizations_url: `https://api.github.com/users/${login}/orgs`,
    public_gists_count: faker.number.int({ max: 100, min: 0 }),
    public_repos_count: faker.number.int({ max: 200, min: 0 }),
    received_events_url: `https://api.github.com/users/${login}/received_events`,
    repos_url: faker.internet.url(),
    site_admin: Boolean(faker.number.int({ max: 1, min: 0 })),
    starred_url: `https://api.github.com/users/${login}/starred{/owner}{/repo}`,
    subscriptions_url: `https://api.github.com/users/${login}/subscriptions`,
    twitter_handle: null,
    type: faker.helpers.arrayElement(['Organization', 'User']),
    url: `https://api.github.com/users/${login}`,
    ...override,
  };
};

export const insertUsers = (prismaClient: PrismaClient) => async (args?: { count: number; overrides: Array<Partial<Prisma.UserCreateInput>> }) => {
  const count = args?.count ?? 1;
  let overrides = args?.overrides ?? [];

  overrides = overrides.length === count ? overrides : [];

  const inputs = new Array(count).fill({}).map((_, index) => {
    const override = overrides.length === 0 ? {} : overrides[index];

    return aUser(override);
  });

  await prismaClient.user.createMany({
    data: inputs,
  });
};
