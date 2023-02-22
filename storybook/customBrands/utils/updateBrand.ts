import { BrandInfo } from '../types';
import { getStorageKeys } from './getStorageKeys';

export function updateBrand(key: string, brandInfo: Partial<BrandInfo>) {
  const keys = getStorageKeys(key);

  brandInfo.title && localStorage.setItem(keys.title, brandInfo.title);
  brandInfo.color && localStorage.setItem(keys.color, brandInfo.color);
  brandInfo.fileName && localStorage.setItem(keys.fileName, brandInfo.fileName);
  brandInfo.content && localStorage.setItem(keys.content, brandInfo.content);
}
