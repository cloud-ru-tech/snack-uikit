import { exec, exit } from 'shelljs';

const { BROWSER } = process.env;

exec(`testcafe ${BROWSER ? `${BROWSER}:headless` : 'chrome'} --config-file testcafe.config.js`, exit);
