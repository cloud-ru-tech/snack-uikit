import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

import DefaultBrandThemes from '@snack-uikit/figma-tokens/build/css/brand.module.css';
import NachosBrandThemes from '@snack-uikit/figma-tokens-nachos/build/css/brand.module.css';

enum CustomBadges {
  PRIVATE = 'private',
  STABLE = 'stable',
}

export const BADGE = { ...Badges, ...CustomBadges };

export enum Brand {
  Default = 'default',
  Nachos = 'nachos',
}

export const DEFAULT_BRAND_MAP = {
  [Brand.Default]: DefaultBrandThemes,
  [Brand.Nachos]: NachosBrandThemes,
};

export const DEFAULT_BRAND_COLORS_MAP = {
  [Brand.Default]: '#06b877',
  [Brand.Nachos]: '#794ed3',
};
