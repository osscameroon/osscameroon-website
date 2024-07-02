import { Project, User } from '@prisma/client';

import { TestInstance, initializeServerAndApiClient } from '../tests/setup-test-server';
import { HttpResponseData } from '../types/controller';
import { cleanDatabase, insertLicenses, insertProjects, insertUsers } from '../tests/utils';

describe('Test GitHub endpoints', () => {
  let testInstance: TestInstance;

  beforeAll(async () => {
    testInstance = await initializeServerAndApiClient();
    await insertLicenses(testInstance.dbClient)();
  });

  afterEach(async () => {
    await cleanDatabase(testInstance.dbClient);
  });

  afterAll(() => {
    testInstance.httpServer.close();
  });

  describe('Test endpoint GET /github/users/search', () => {
    test('return all users in the system', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({ count: 2, overrides: [{ name: 'User Test' }, { name: 'John Doe' }] });

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get('/github/users/search');

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ name: 'John Doe' }), expect.objectContaining({ name: 'User Test' })],
          limit: 30,
          nbHits: 2,
          page: 1,
          totalPages: 1,
        },
      });
    });

    test('changing the number of users to retrieve per page to 2 will returns 2 users per page', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [{ name: 'User Test' }, { name: 'John Doe' }, { name: 'Anita Sala' }, { name: 'Rico Teco' }],
      });
      const queryParams: Record<string, string> = {
        count: '2',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ name: 'Anita Sala' }), expect.objectContaining({ name: 'John Doe' })],
          limit: 2,
          nbHits: 4,
          page: 1,
          totalPages: 2,
        },
      });
    });

    test('changing the number of users to retrieve per page to a higher value than the max value (30) will return at most 30 users', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [{ name: 'User Test' }, { name: 'John Doe' }, { name: 'Anita Sala' }, { name: 'Rico Teco' }],
      });
      const queryParams: Record<string, string> = {
        count: '50',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [
            expect.objectContaining({ name: 'Anita Sala' }),
            expect.objectContaining({ name: 'John Doe' }),
            expect.objectContaining({ name: 'Rico Teco' }),
            expect.objectContaining({ name: 'User Test' }),
          ],
          limit: 30,
          nbHits: 4,
          page: 1,
          totalPages: 1,
        },
      });
    });

    test('retrieving users at a specific page will return the expected users', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 5,
        overrides: [{ name: 'User Test' }, { name: 'John Doe' }, { name: 'Anita Sala' }, { name: 'Zora Sela' }, { name: 'Rico Teco' }],
      });
      const queryParams = {
        count: '2',
        page: '2',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ name: 'Rico Teco' }), expect.objectContaining({ name: 'User Test' })],
          limit: 2,
          nbHits: 5,
          page: 2,
          totalPages: 3,
        },
      });
    });

    test('retrieving users at a the last page', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 5,
        overrides: [{ name: 'User Test' }, { name: 'John Doe' }, { name: 'Anita Sala' }, { name: 'Zora Sela' }, { name: 'Rico Teco' }],
      });
      const queryParams = {
        count: '2',
        page: '3',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ name: 'Zora Sela' })],
          limit: 2,
          nbHits: 5,
          page: 3,
          totalPages: 3,
        },
      });
    });

    test('return no users when the page number is higher than the total page', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 3,
        overrides: [{ name: 'User Test' }, { name: 'John Doe' }, { name: 'Anita Sala' }],
      });
      const queryParams = {
        count: '2',
        page: '55',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [],
          limit: 2,
          nbHits: 3,
          page: 55,
          totalPages: 2,
        },
      });
    });

    test('return no users when the page number is lower than zero', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 3,
        overrides: [{ name: 'User Test' }, { name: 'John Doe' }, { name: 'Anita Sala' }],
      });
      const queryParams = {
        count: '2',
        page: '-3',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [],
          limit: 2,
          nbHits: 0,
          page: 0,
          totalPages: 0,
        },
      });
    });

    test('retrieve users sorted by popularity', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [{ followers_count: 10 }, { followers_count: 2491 }, { followers_count: 98 }, { followers_count: 378 }],
      });
      const queryParams = {
        count: '2',
        sort_type: 'popularity',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ followers_count: 2491 }), expect.objectContaining({ followers_count: 378 })],
          limit: 2,
          nbHits: 4,
          page: 1,
          totalPages: 2,
        },
      });
    });

    test('retrieve users sorted by popularity with pagination', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 5,
        overrides: [{ followers_count: 10 }, { followers_count: 2491 }, { followers_count: 98 }, { followers_count: 378 }, { followers_count: 56 }],
      });
      const queryParams = {
        count: '2',
        page: '2',
        sort_type: 'popularity',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ followers_count: 98 }), expect.objectContaining({ followers_count: 56 })],
          limit: 2,
          nbHits: 5,
          page: 2,
          totalPages: 3,
        },
      });
    });

    test('retrieve users sorted by most recent sign up', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [{ name: 'Most Recent 4' }, { name: 'Most Recent 3' }, { name: 'Most Recent 2' }, { name: 'Most Recent 1' }],
      });
      const queryParams = {
        sort_type: 'most_recent',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [
            expect.objectContaining({ name: 'Most Recent 1' }),
            expect.objectContaining({ name: 'Most Recent 2' }),
            expect.objectContaining({ name: 'Most Recent 3' }),
            expect.objectContaining({ name: 'Most Recent 4' }),
          ],
          limit: 30,
          nbHits: 4,
          page: 1,
          totalPages: 1,
        },
      });
    });

    test('retrieve users having the name matching the keyword', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [
          { bio: 'bio1', company: 'comp1', login: 'user1', name: 'Rico Baha' },
          { bio: 'bio2', company: 'comp2', login: 'user2', name: 'Walter Obrien' },
          { bio: 'bio3', company: 'comp3', login: 'user3', name: 'Terry Doe' },
          { bio: 'bio4', company: 'comp4', login: 'user4', name: 'Jane Doe' },
        ],
      });
      const queryParams = {
        query: 'ter',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ name: 'Terry Doe' }), expect.objectContaining({ name: 'Walter Obrien' })],
          limit: 30,
          nbHits: 2,
          page: 1,
          totalPages: 1,
        },
      });
    });

    test('retrieve users having the login matching the keyword', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [
          { bio: 'bio1', company: 'comp1', login: 'USER1', name: 'name1' },
          { bio: 'bio2', company: 'comp2', login: 'no_game', name: 'name2' },
          { bio: 'bio3', company: 'comp3', login: 'titan12', name: 'name3' },
          { bio: 'bio4', company: 'comp4', login: 'user4', name: 'name4' },
        ],
      });
      const queryParams = {
        query: 'ser',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ login: 'USER1' }), expect.objectContaining({ login: 'user4' })],
          limit: 30,
          nbHits: 2,
          page: 1,
          totalPages: 1,
        },
      });
    });

    test('retrieve users having the company matching the keyword', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [
          { bio: 'bio1', company: 'Ino Tech', login: 'user1', name: 'name4' },
          { bio: 'bio2', company: 'tech-corp', login: 'user2', name: 'name2' },
          { bio: 'bio3', company: 'comp3', login: 'user3', name: 'name3' },
          { bio: 'bio4', company: 'VivaTech', login: 'user4', name: 'name1' },
        ],
      });
      const queryParams = {
        query: 'tech',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [
            expect.objectContaining({ company: 'VivaTech' }),
            expect.objectContaining({ company: 'tech-corp' }),
            expect.objectContaining({ company: 'Ino Tech' }),
          ],
          limit: 30,
          nbHits: 3,
          page: 1,
          totalPages: 1,
        },
      });
    });

    test('retrieve users having the bio matching the keyword', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [
          { bio: 'no description here', company: 'comp1', login: 'user1', name: 'name1' },
          { bio: 'my best bio ever', company: 'comp2', login: 'user2', name: 'name2' },
          { bio: 'Bio of life', company: 'comp3', login: 'user3', name: 'name3' },
          { bio: 'Nothing here', company: 'comp4', login: 'user4', name: 'name4' },
        ],
      });
      const queryParams = {
        query: 'bio',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [expect.objectContaining({ bio: 'my best bio ever' }), expect.objectContaining({ bio: 'Bio of life' })],
          limit: 30,
          nbHits: 2,
          page: 1,
          totalPages: 1,
        },
      });
    });

    test('retrieve users having the name, login, company or bio matching the keyword', async () => {
      // GIVEN
      await insertUsers(testInstance.dbClient)({
        count: 4,
        overrides: [
          { bio: 'National food lover', company: 'comp1', login: 'user1', name: 'Meta Loga' },
          { bio: 'no description here', company: 'Lition Corp', login: 'user2', name: 'Sala Rina' },
          { bio: 'Bio of life', company: 'comp3', login: 'rational-mf95', name: 'Tata Mino' },
          { bio: 'Nothing here', company: 'comp4', login: 'user4', name: 'Rico Itiona' },
        ],
      });
      const queryParams = {
        query: 'tion',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get(`/github/users/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<User>>({
        result: {
          hits: [
            expect.objectContaining({ bio: 'National food lover', name: 'Meta Loga' }),
            expect.objectContaining({ name: 'Rico Itiona' }),
            expect.objectContaining({ company: 'Lition Corp', name: 'Sala Rina' }),
            expect.objectContaining({ login: 'rational-mf95', name: 'Tata Mino' }),
          ],
          limit: 30,
          nbHits: 4,
          page: 1,
          totalPages: 1,
        },
      });
    });
  });

  describe.only('Test endpoint GET /github/projects/search', () => {
    test('return all projects in the system', async () => {
      // GIVEN
      await insertProjects(testInstance.dbClient)({ count: 2, overrides: [{ name: 'Project One' }, { name: 'Project Two' }] });

      // WHEN
      const response: HttpResponseData<User> = await testInstance.apiClient.get('/github/projects/search');

      // THEN
      expect(response).toMatchObject<HttpResponseData<Project>>({
        result: {
          hits: [expect.objectContaining({ name: 'Project One' }), expect.objectContaining({ name: 'Project Two' })],
          limit: 30,
          nbHits: 2,
          page: 1,
          totalPages: 1,
        },
      });
    });

    test('changing the number of projects to retrieve per page to 2 will returns 2 projects per page', async () => {
      // GIVEN
      await insertProjects(testInstance.dbClient)({
        count: 4,
        overrides: [{ name: 'Project One' }, { name: 'Project Two' }, { name: 'Project Three' }, { name: 'Project Four' }],
      });
      const queryParams: Record<string, string> = {
        count: '2',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<Project> = await testInstance.apiClient.get(`/github/projects/search?${queryString}`);

      // THEN
      expect(response).toMatchObject<HttpResponseData<Project>>({
        result: {
          hits: [expect.objectContaining({ name: 'Project One' }), expect.objectContaining({ name: 'Project Two' })],
          limit: 2,
          nbHits: 4,
          page: 1,
          totalPages: 2,
        },
      });
    });

    test.only('changing the number of users to retrieve per page to a higher value than the max value (30) will return at most 30 users', async () => {
      // GIVEN
      await insertProjects(testInstance.dbClient)({
        count: 4,
        overrides: [{ name: 'Project One' }, { name: 'Project Two' }, { name: 'Project Three' }, { name: 'Project Four' }],
      });
      const queryParams: Record<string, string> = {
        count: '50',
      };
      const queryString = new URLSearchParams(queryParams);

      // WHEN
      const response: HttpResponseData<Project> = await testInstance.apiClient.get(`/github/projects/search?${queryString}`);

      console.log(response);
      // THEN
      expect(response).toMatchObject<HttpResponseData<Project>>({
        result: {
          hits: [expect.objectContaining({ name: 'Project One' }), expect.objectContaining({ name: 'Project Two' })],
          limit: 30,
          nbHits: 4,
          page: 1,
          totalPages: 1,
        },
      });
    });
  });
});
