/**
 * Execute all tests
 */

import { testRoot, singleTestMatch } from './constants.mjs';

export const baseConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    testRoot,
  ],
  testMatch: [
    `${testRoot}/**/${singleTestMatch}`,
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  rootDir: `../${process.env.JEST_LIB_UNDER_TEST}`,
  setupFiles: [
    // `${testRoot}/setup/mocks.ts`,
  ],
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  moduleFileExtensions: ["ts", "js", "json"],
  // An array of regexp pattern strings used to skip coverage collection
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "package.json",
    "package-lock.json"
  ]
};
