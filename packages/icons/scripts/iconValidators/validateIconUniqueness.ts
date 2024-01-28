import { Validator } from './types';

export const validateIconUniqueness: Validator = {
  error: `duplicated icon, please remove it`,
  validate: ({ icon, allIcons }) => allIcons.filter(({ content }) => content === icon.content).length === 1,
};
