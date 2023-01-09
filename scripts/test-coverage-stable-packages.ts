import { getStablePatterns } from './test-coverage/packages';
import { report } from './test-coverage/report';

report({
  name: 'stable-packages',
  include: getStablePatterns(),
  reporter: ['lcov', 'text-summary'],
});
