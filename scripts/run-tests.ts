import { exec, exit } from 'shelljs';

import { getChangedPackages } from './utils/getChangedPackages';

const { BROWSER, RUN_ALL_TESTS } = process.env;

const changedPaths =
  RUN_ALL_TESTS === 'true'
    ? ''
    : getChangedPackages()
        .map(item => `${item}/__tests__/*.ts`)
        .join(' ');

exec(`testcafe ${BROWSER ? `${BROWSER}:headless` : 'chrome'} --config-file testcafe.config.js ${changedPaths}`, exit);
