import { CUSTOM_BRAND_STORAGE_KEY } from '../constants';
import { BrandInfo } from '../types';
import { getCustomBrandList } from './getCustomBrandList';
import { getStorageKeys } from './getStorageKeys';

export function addBrand(key: string, brandInfo: BrandInfo) {
  const keys = getStorageKeys(key);

  localStorage.setItem(keys.title, brandInfo.title);
  localStorage.setItem(keys.color, brandInfo.color);
  localStorage.setItem(keys.fileName, brandInfo.fileName);
  localStorage.setItem(keys.content, brandInfo.content);
  localStorage.setItem(CUSTOM_BRAND_STORAGE_KEY, JSON.stringify([...getCustomBrandList(), key]));
}
