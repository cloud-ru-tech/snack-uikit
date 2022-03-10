import shell from 'shelljs';

import { logError } from './console';

export const getGitUserName = () => {
  const user = shell.exec('git config user.name', { silent: true }).stdout.trim();
  if (!user) {
    logError('No username set - please set it in git with \'git config --global user.name "Firstname Lastname"\'');
    process.exit(1);
  }
  return user;
};

export const getGitEmail = () => {
  const email = shell.exec('git config user.email', { silent: true }).stdout.trim();
  if (!email) {
    logError('No email set - please set it in git with \'git config --global user.email "yoursemail@sbrecloud.ru"\'');
    process.exit(1);
  }
  return email;
};

export const gitFetch = () => shell.exec('git fetch', { silent: true });

export const checkIfBehindMaster = () => {
  const behindMaster = shell.exec('git log @..origin/master', { silent: true }).stdout.trim();

  if (behindMaster) {
    logError(
      'Looks like you are not up to date with origin/master - do a rebase and try again (git pull --rebase origin master)',
    );
    process.exit(1);
  }
};
