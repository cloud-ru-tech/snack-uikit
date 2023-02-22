import { CUSTOM_BRAND_STORAGE_KEY } from '../constants';
import { getCustomBrandList } from './getCustomBrandList';
import { getStorageKeys } from './getStorageKeys';

export function deleteBrand(key: string) {
  const keys = getStorageKeys(key);

  localStorage.removeItem(keys.title);
  localStorage.removeItem(keys.color);
  localStorage.removeItem(keys.fileName);
  localStorage.removeItem(keys.content);
  localStorage.setItem(CUSTOM_BRAND_STORAGE_KEY, JSON.stringify(getCustomBrandList().filter(item => item !== key)));
}
