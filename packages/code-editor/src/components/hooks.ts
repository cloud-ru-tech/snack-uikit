import { useEffect, useMemo, useState } from 'react';

import { useThemeContext } from '@snack-ui/utils';

import { THEME_VARS } from './constants';

function getThemeVars(styles: CSSStyleDeclaration) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function mapComputedTree(tree: string | Record<string, any>): Record<string, any> | string {
    if (typeof tree === 'string') {
      return styles.getPropertyValue(tree);
    }

    const res = {} as Record<string, unknown>;

    Object.entries(tree).forEach(cur => {
      res[cur[0]] = mapComputedTree(cur[1]);
    });

    return res;
  };
}

export function useCalculatedThemeValues(themeClassNameProps?: string) {
  const [values, setValues] = useState<typeof THEME_VARS | undefined>(undefined);

  const { themeClassName: themeClassNameContext } = useThemeContext();

  const themeClassName = useMemo(
    () => themeClassNameProps ?? themeClassNameContext,
    [themeClassNameContext, themeClassNameProps],
  );

  useEffect(() => {
    const elem = document.querySelector(themeClassName ? '.' + themeClassName : 'body');

    if (elem) {
      const styles = getComputedStyle(elem);

      setValues(getThemeVars(styles)(THEME_VARS) as typeof THEME_VARS);
    }
  }, [themeClassName]);

  return values;
}
