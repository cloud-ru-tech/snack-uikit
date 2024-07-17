import { useEffect, useState } from 'react';

import { useThemeContext } from '@snack-uikit/utils';

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

type UseCalculatedThemeValuesProps = {
  stylesOriginNode: HTMLDivElement | null;
  themeName?: string;
};

export function useCalculatedThemeValues({ stylesOriginNode, themeName }: UseCalculatedThemeValuesProps) {
  const [values, setValues] = useState<typeof THEME_VARS | undefined>(undefined);

  const { themeClassName } = useThemeContext();

  const trigger = themeName ?? themeClassName;

  useEffect(() => {
    if (stylesOriginNode) {
      const styles = getComputedStyle(stylesOriginNode);
      setValues(getThemeVars(styles)(THEME_VARS) as typeof THEME_VARS);
    }
  }, [stylesOriginNode, trigger]);

  return values;
}
