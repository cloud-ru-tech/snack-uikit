import { execFileSync } from 'child_process';

const getLernaParameters = () => [
  'version',
  '--conventional-commits',
  '--include-merged-tags',
  '--exact',
  '--no-push',
  '--no-git-tag-version',
  '--yes',
];

const lernaParameters = getLernaParameters();

const lernaCommand = process.platform === 'win32' ? 'lerna.cmd' : 'lerna';
execFileSync(lernaCommand, lernaParameters, { stdio: 'inherit' });
execFileSync('git', ['restore', '**/package.json'], { stdio: 'inherit' });
