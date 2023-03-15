import * as Icons from '@snack-ui/icons';

export const ICONS = {
  none: undefined,
  ...Object.fromEntries(
    Object.keys(Icons).map(key => {
      const Icon = Icons[key];
      return [key, <Icon key={key} />];
    }),
  ),
};
