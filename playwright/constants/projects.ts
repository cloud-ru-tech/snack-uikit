import { Config, devices } from '@playwright/test';

import { TEST_TIMEZONE } from './common';

export const PROJECTS: Config['projects'] = [
  {
    name: 'chrome',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1200, height: 871 },
      timezoneId: TEST_TIMEZONE,
    },
  },
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      viewport: { width: 1200, height: 871 },
      timezoneId: TEST_TIMEZONE,
    },
  },
  {
    name: 'mobile',
    use: {
      ...devices['Pixel 7'],
      timezoneId: TEST_TIMEZONE,
    },
  },
];
