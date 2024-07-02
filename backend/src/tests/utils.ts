import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const LICENSE_ID = 'MDc6TGljZW5zZTE=';

export const cleanDatabase = async (prismaClient: PrismaClient) => {
  await prismaClient.project.deleteMany();
  await prismaClient.license.deleteMany();
  await prismaClient.user.deleteMany();
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

const aProject = (userId: number, override: Partial<Prisma.ProjectCreateInput>): Prisma.ProjectCreateInput => {
  const id = faker.number.int({ max: 100000, min: 2 });
  const name = faker.company.buzzNoun();
  const userName = faker.internet.userName();

  return {
    allow_forking: Boolean(faker.number.int({ max: 1, min: 0 })),
    archive_url: `https://api.github.com/repos/${userName}/${name}/{archive_format}{/ref}`,
    assignees_url: `https://api.github.com/repos/${userName}/${name}/assignees{/user}`,
    blobs_url: `https://api.github.com/repos/${userName}/${name}/git/blobs{/sha}`,
    branches_url: `https://api.github.com/repos/${userName}/${name}/branches{/branch}`,
    clone_url: `https://github.com/${userName}/${name}.git`,
    collaborators_url: `https://api.github.com/repos/${userName}/${name}/collaborators{/collaborator}`,
    comments_url: `https://api.github.com/repos/${userName}/${name}/comments{/number}`,
    commits_url: `https://api.github.com/repos/${userName}/${name}/commits{/sha}`,
    compare_url: `https://api.github.com/repos/${userName}/${name}/compare/{base}...{head}`,
    contents_url: `https://api.github.com/repos/${userName}/${name}/contents/{+path}`,
    contributors_url: `https://api.github.com/repos/${userName}/${name}/contributors`,
    created_at: faker.date.past(),
    defaultBranch: faker.helpers.arrayElement(['main', 'master']),
    deployments_url: `https://api.github.com/repos/${userName}/${name}/deployments`,
    description: faker.lorem.sentences(2),
    downloads_url: `https://api.github.com/repos/${userName}/${name}/downloads`,
    events_url: `https://api.github.com/repos/${userName}/${name}/events`,
    forks_count: faker.number.int({ max: 100, min: 0 }),
    forks_url: `https://api.github.com/repos/${userName}/${name}/forks`,
    fullName: `${userName}/${name}`,
    git_commits_url: `https://api.github.com/repos/${userName}/${name}/commits{/sha}`,
    git_refs_url: `https://api.github.com/repos/${userName}/${name}/git/refs{/sha}`,
    git_tags_url: `https://api.github.com/repos/${userName}/${name}/git/tags{/sha}`,
    git_url: `git://github.com/${userName}/${name}.git`,
    has_downloads: Boolean(faker.number.int({ max: 1, min: 0 })),
    has_issues: Boolean(faker.number.int({ max: 1, min: 0 })),
    has_pages: Boolean(faker.number.int({ max: 1, min: 0 })),
    has_projects: Boolean(faker.number.int({ max: 1, min: 0 })),
    has_wiki: Boolean(faker.number.int({ max: 1, min: 0 })),
    homepage: `https://${userName}.github.io/${name}`,
    hooks_url: `https://api.github.com/repos/${userName}/${name}/hooks`,
    html_url: `https://github.com/${userName}/${name}`,
    id,
    is_archived: Boolean(faker.number.int({ max: 1, min: 0 })),
    is_disabled: Boolean(faker.number.int({ max: 1, min: 0 })),
    is_fork: Boolean(faker.number.int({ max: 1, min: 0 })),
    is_private: Boolean(faker.number.int({ max: 1, min: 0 })),
    is_template: Boolean(faker.number.int({ max: 1, min: 0 })),
    issue_comment_url: `https://api.github.com/repos/${userName}/${name}/issues/comments{/number}`,
    issue_events_url: `https://api.github.com/repos/${userName}/${name}/issues/events{/number}`,
    issues_url: `https://api.github.com/repos/${userName}/${name}/issues{/number}`,
    keys_url: `https://api.github.com/repos/${userName}/${name}/keys{/key_id}`,
    labels_url: `https://api.github.com/repos/${userName}/${name}/labels{/name}`,
    language: faker.helpers.arrayElement(['Java', 'JavaScript', 'PHP', 'Python', 'TypeScript']),
    languages_url: `https://api.github.com/repos/${userName}/${name}/languages`,
    licenses: {
      connect: {
        id: LICENSE_ID,
      },
    },
    merges_url: `https://api.github.com/repos/${userName}/${name}/merges`,
    milestones_url: `https://api.github.com/repos/${userName}/${name}/milestones{/number}`,
    mirror_url: null,
    name,
    node_id: faker.string.uuid(),
    open_issues_count: 0,
    permissions: `{"admin":false,"pull":true,"push":false,"maintain":false,"triage":false}`,
    pulls_url: `https://api.github.com/repos/${userName}/${name}/pulls{/number}`,
    pushed_at: faker.date.anytime(),
    releases_url: `https://api.github.com/repos/${userName}/${name}/releases{/id}`,
    size: faker.number.int({ max: 40000, min: 2000 }),
    ssh_url: `git@github.com:${userName}/${name}.git`,
    stargazers_count: faker.number.int({ max: 10000, min: 0 }),
    stargazers_url: `https://api.github.com/repos/${userName}/${name}/stargazers`,
    statuses_url: `https://api.github.com/repos/${userName}/${name}/statuses/{sha}`,
    subscribers_url: `https://api.github.com/repos/${userName}/${name}/subscribers`,
    subscription_url: `https://api.github.com/repos/${userName}/${name}/subscription`,
    svn_url: `https://github.com/${userName}/${name}`,
    tags_url: `https://api.github.com/repos/${userName}/${name}/tags`,
    teams_url: `https://api.github.com/repos/${userName}/${name}/teams`,
    topics: [],
    trees_url: `https://api.github.com/repos/${userName}/${name}/git/trees{/sha}`,
    updated_at: faker.date.anytime(),
    url: `https://api.github.com/repos/${userName}/${name}`,
    users: {
      connect: {
        id: userId,
      },
    },
    visibility: faker.helpers.arrayElement(['public', 'private']),
    watchers_count: faker.number.int({ max: 100, min: 0 }),
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

export const insertLicenses = (prismaClient: PrismaClient) => async () => {
  await prismaClient.license.create({
    data: {
      id: LICENSE_ID,
      key: 'agpl-3.0',
      name: 'GNU Affero General Public License v3.0',
      spdxId: 'AGPL-3.0',
      url: 'https://api.github.com/licenses/agpl-3.0',
    },
  });
};

export const insertProjects =
  (prismaClient: PrismaClient) => async (args?: { count: number; overrides: Array<Partial<Prisma.ProjectCreateInput>> }) => {
    const count = args?.count ?? 1;
    let overrides = args?.overrides ?? [];

    overrides = overrides.length === count ? overrides : [];

    const user = await prismaClient.user.create({
      data: aUser({}),
    });

    const inputs = new Array(count).fill({}).map((_, index) => {
      const override = overrides.length === 0 ? {} : overrides[index];

      return aProject(user.id, override);
    });

    for (const input of inputs) {
      // eslint-disable-next-line no-await-in-loop
      await prismaClient.project.create({ data: input });
    }
  };
