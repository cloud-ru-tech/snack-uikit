import { useDarkMode } from 'storybook-dark-mode';

import DefaultBrandThemes from '@sbercloud/figma-tokens/build/css/brand.module.css';
import CloudBrandThemes from '@sbercloud/figma-tokens-cloud-platform/build/css/brand.module.css';
import MLSpaceBrandThemes from '@sbercloud/figma-tokens-mlspace/build/css/brand.module.css';

import { Brand } from './constants';
import { BrandConfig, getCustomBrands } from './customBrands';

const defaultBrandMap = {
  [Brand.Default]: DefaultBrandThemes as BrandConfig,
  [Brand.Cloud]: CloudBrandThemes as BrandConfig,
  [Brand.MLSpace]: MLSpaceBrandThemes as BrandConfig,
};

export function useStorybookBrand({ brand }: { brand: string }) {
  const isDark = useDarkMode();

  const brandMap = {
    ...defaultBrandMap,
    ...Object.fromEntries(getCustomBrands().map(brand => [brand.key, brand.config])),
  };

  return brandMap[brand]?.[isDark ? 'dark' : 'light'];
}
