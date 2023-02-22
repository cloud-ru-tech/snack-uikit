import { CUSTOM_BRAND_STORAGE_KEY } from '../constants';

export function getCustomBrandList(): string[] {
  let brand: unknown;

  try {
    brand = JSON.parse(localStorage.getItem(CUSTOM_BRAND_STORAGE_KEY) ?? '[]');
  } catch {
    brand = undefined;
  }

  if (!brand || !Array.isArray(brand) || brand.length === 0) {
    return [];
  }

  return brand;
}
