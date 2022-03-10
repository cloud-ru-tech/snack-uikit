import inquirer from 'inquirer';
import shell from 'shelljs';

import { logHelp, logInfo } from './utils/console';

const printInfoMessages = () => {
  logInfo('You are able to specify several packages via space separator');
  logHelp('Answer the following question to get started, or press CTRL+C (or Control+C) to abort...');
};

printInfoMessages();

inquirer
  .prompt([
    {
      type: 'input',
      name: 'packagesToRun',
      message: 'Package(s) to run in storybook',
    },
  ])
  .then(({ packagesToRun }: { packagesToRun: string }) =>
    shell.exec(`STORYBOOK_PACKAGE_NAME="?(${packagesToRun.trim().split(/\s+/).join('|')})" npm run storybook`),
  );
