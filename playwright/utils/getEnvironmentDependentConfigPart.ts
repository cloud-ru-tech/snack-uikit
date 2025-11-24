import { resolve } from 'path';

import { Config as PlaywrightConfig, ReporterDescription } from '@playwright/test';

import { IS_CI } from '../constants/common';
import { getWorkers } from './getWorkers';

export function getEnvironmentDependentConfigPart({ outputDir }: { outputDir: string }): PlaywrightConfig {
  const junitReporter: ReporterDescription = ['junit', { outputFile: resolve(outputDir, 'reports/results.xml') }];

  if (IS_CI) {
    return {
      forbidOnly: true,
      retries: 3,
      workers: getWorkers(),
      reporter: [['list'], ['blob', { outputDir: resolve(outputDir, 'reports/blob') }], junitReporter],
    };
  }

  return {
    retries: 0,
    workers: 3,
    reporter: [['list'], junitReporter],
  };
}
