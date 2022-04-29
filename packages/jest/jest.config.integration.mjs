import { testRoot, singleTestMatch, integrationTestsFolderName } from './constants.mjs';
import { baseConfig } from './jest.config.mjs';

const integrationConfig = {
  ...baseConfig,
  testMatch: [
    `${testRoot}/${integrationTestsFolderName}/**/${singleTestMatch}`,
  ],
  maxWorkers: 1,
};

export default integrationConfig;
