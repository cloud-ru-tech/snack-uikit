import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

enum CustomBadges {
  PRIVATE = 'private',
}

export const BADGE = { ...Badges, ...CustomBadges };

export enum Brand {
  Default = 'Default',
  Cloud = 'Cloud',
  MLSpace = 'MLSpace',
}
