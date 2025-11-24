import { getPatterns } from './test-coverage/packages';
import { report } from './test-coverage/report';
import { isMainBranch } from './utils/isMainBranch';

report({
  name: 'packages',
  include: getPatterns(isMainBranch()),
  reporter: ['lcov', 'text-summary', 'cobertura'],
});
