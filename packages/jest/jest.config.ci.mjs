import {
  testRoot,
  singleTestMatch,
  unitTestsFolderName,
  integrationTestsFolderName,
} from './constants.mjs';
import { baseConfig } from './jest.config.mjs';

const unitConfig = {
  ...baseConfig,
  testMatch: [
    `${testRoot}/${integrationTestsFolderName}/**/${singleTestMatch}`,
    `${testRoot}/${unitTestsFolderName}/**/${singleTestMatch}`,
  ],
};

export default unitConfig;
