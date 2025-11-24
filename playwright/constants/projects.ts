import { Config, devices } from '@playwright/test';

export const PROJECTS: Config['projects'] = [
  {
    name: 'chrome',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'mobile',
    use: {
      ...devices['Pixel 7'],
    },
  },
];
