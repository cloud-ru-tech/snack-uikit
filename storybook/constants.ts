import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

enum CustomBadges {
  PRIVATE = 'private',
}

export const BADGE = { ...Badges, ...CustomBadges };
