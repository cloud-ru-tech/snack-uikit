import { resolve } from 'path';

import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';

import { PLAYWRIGHT_ROOT_DIR, TEST_ID_ATTRIBUTE, UIKIT_URL } from './playwright/constants/common';
import { PROJECTS } from './playwright/constants/projects';
import { getCustomHeaders, getEnvironmentDependentConfigPart } from './playwright/utils';

config();

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  testDir: './packages',
  testMatch: ['**/__e2e__/**/*.spec.ts'],
  ...getEnvironmentDependentConfigPart({ outputDir: PLAYWRIGHT_ROOT_DIR }),
  outputDir: resolve(PLAYWRIGHT_ROOT_DIR, 'test-results'),
  testIgnore: ['**/node_modules/**'],
  fullyParallel: true,
  use: {
    baseURL: UIKIT_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: TEST_ID_ATTRIBUTE,
    actionTimeout: 10000,
    navigationTimeout: 20000,
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: getCustomHeaders(),
  },
  projects: PROJECTS,
});
