import { Project } from '@prisma/client';

import { TestInstance, initializeServerAndApiClient } from '../tests/setup-test-server';
import { HttpResponseData } from '../types/controller';

describe('Test GitHub endpoints', () => {
  let testInstance: TestInstance;

  beforeAll(async () => {
    testInstance = await initializeServerAndApiClient();
  });

  afterAll(() => {
    testInstance.httpServer.close();
  });

  describe('Test endpoint GET /github/projects/search', () => {
    test('should return an array of projects', async () => {
      // GIVEN
      // WHEN
      const response: HttpResponseData<Project> = await testInstance.apiClient.get('/github/projects/search');

      // THEN
      expect(response).toMatchInlineSnapshot(`
        {
          "result": {
            "hits": [],
            "limit": 30,
            "nbHits": 0,
            "page": 1,
            "totalPages": 0,
          },
        }
      `);
    });
  });

  /*describe('Test endpoint GET /github/users/search', () => {

  });*/
});
