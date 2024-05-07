import type { Config } from 'jest';

const config: Config = {
  collectCoverage: !!process.env.CI,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: undefined,
  preset: 'ts-jest',
  prettierPath: require.resolve('prettier-2'), // https://github.com/jestjs/jest/issues/14305
  rootDir: '.',
  roots: ['<rootDir>'],
  setupFiles: [],
  setupFilesAfterEnv: [],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
};

export default config;
