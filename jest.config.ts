import config from '@sbercloud/ft-config-jest';

const newConfig: typeof config = {
  ...config,
  testMatch: ['**/__unit-tests__/**/*.[jt]s?(x)'],
};

export default newConfig;
