import { CustomBrandConfig } from '../types';
import { getStorageKeys } from './getStorageKeys';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export function getCustomBrand(key: string): CustomBrandConfig | undefined {
  const keys = getStorageKeys(key);
  const lightClassName = `light_${key}`;
  const darkClassName = `dark_${key}`;
  const brandFileContent = localStorage.getItem(keys.content);

  if (!brandFileContent) {
    return undefined;
  }

  return {
    key,
    title: localStorage.getItem(keys.title) ?? key,
    color: localStorage.getItem(keys.color) ?? getRandomColor(),
    fileName: localStorage.getItem(keys.fileName) ?? undefined,
    content: brandFileContent.replace('.light', `.${lightClassName}`).replace('.dark', `.${darkClassName}`),
    config: {
      light: lightClassName,
      dark: darkClassName,
    },
  };
}
