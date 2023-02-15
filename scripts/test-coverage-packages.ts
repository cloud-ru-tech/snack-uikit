import { getPatterns } from './test-coverage/packages';
import { report } from './test-coverage/report';

report({
  name: 'all-packages',
  include: getPatterns(),
  reporter: ['lcov', 'text-summary'],
});
