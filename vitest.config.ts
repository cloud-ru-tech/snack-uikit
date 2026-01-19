import createConfig from '@cloud-ru/ft-config-vitest';
export default createConfig(
  {
    test: {
      include: ['**/__unit__/**/*.spec.(ts|tsx)'],
    },
  },
  { useAliases: false },
);
