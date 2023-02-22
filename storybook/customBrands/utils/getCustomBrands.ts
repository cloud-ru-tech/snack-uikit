import { CustomBrandConfig } from '../types';
import { getCustomBrand } from './getCustomBrand';
import { getCustomBrandList } from './getCustomBrandList';

export function getCustomBrands(): CustomBrandConfig[] {
  const brands = getCustomBrandList();

  return brands.map(getCustomBrand).filter((item): item is CustomBrandConfig => Boolean(item));
}
