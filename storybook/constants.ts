import { BADGE as Badges } from '@geometricpanda/storybook-addon-badges';

import DefaultBrandThemes from '@sbercloud/figma-tokens/build/css/brand.module.css';
import CloudBrandThemes from '@sbercloud/figma-tokens-cloud-platform/build/css/brand.module.css';
import MLSpaceBrandThemes from '@sbercloud/figma-tokens-mlspace/build/css/brand.module.css';

enum CustomBadges {
  PRIVATE = 'private',
}

export const BADGE = { ...Badges, ...CustomBadges };

export enum Brand {
  Default = 'Default',
  Cloud = 'Cloud',
  MLSpace = 'MLSpace',
}

export const DEFAULT_BRAND_MAP = {
  [Brand.Default]: DefaultBrandThemes,
  [Brand.Cloud]: CloudBrandThemes,
  [Brand.MLSpace]: MLSpaceBrandThemes,
};

export const DEFAULT_BRAND_COLORS_MAP = {
  [Brand.Default]: '#794ed3',
  [Brand.Cloud]: '#06b877',
  [Brand.MLSpace]: '#5558fa',
};
