import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

import DefaultBrandThemes from '@snack-uikit/figma-tokens/build/css/brand.module.css';

enum CustomBadges {
  PRIVATE = 'private',
  STABLE = 'stable',
}

export const BADGE = { ...Badges, ...CustomBadges };

export enum Brand {
  Default = 'Default',
}

export const DEFAULT_BRAND_MAP = {
  [Brand.Default]: DefaultBrandThemes,
};

export const DEFAULT_BRAND_COLORS_MAP = {
  [Brand.Default]: '#794ed3',
};
