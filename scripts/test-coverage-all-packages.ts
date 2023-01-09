import { getAllPatterns } from './test-coverage/packages';
import { report } from './test-coverage/report';

report({
  name: 'all-packages',
  include: getAllPatterns(),
  reporter: ['lcov', 'cobertura'],
});
