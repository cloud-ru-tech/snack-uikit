import { getUnstablePatterns } from './test-coverage/packages';
import { report } from './test-coverage/report';

report({
  name: 'unstable-packages',
  include: getUnstablePatterns(),
  reporter: ['lcov', 'text-summary'],
});
