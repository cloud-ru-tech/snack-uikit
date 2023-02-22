import { useEffect } from 'react';

import { Brand } from '../../constants';
import { useStorybookBrand } from '../../useStorybookBrand';
import { useCustomBrandContext } from '../contexts';

export function useCustomStyles(originalBrand: string) {
  const { brands, brandList } = useCustomBrandContext();
  const brand =
    brandList.includes(originalBrand) || (Object.values(Brand) as string[]).includes(originalBrand)
      ? originalBrand
      : Brand.Default;

  const themeClassName = useStorybookBrand({ brand });

  useEffect(() => {
    if (themeClassName) {
      document.body.classList.add(themeClassName);

      return () => {
        document.body.classList.remove(themeClassName);
      };
    }
  }, [themeClassName]);

  useEffect(() => {
    brands.forEach(config => {
      const style = document.createElement('style');
      style.innerText = config.content;
      document.head.appendChild(style);
    });
  }, [brands]);
}
