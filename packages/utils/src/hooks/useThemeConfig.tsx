import { useState } from 'react';

type UseThemePropsWithDefaultTheme<T extends string> = { themeMap: Record<T, string>; defaultTheme: T };
type UseThemeProps<T extends string> = {
  /**
   * Объект с указанием соответсвия темы и css-класса
   */
  themeMap: Record<T, string>;
};

function hasDefaultTheme<T extends string>(
  props: UseThemePropsWithDefaultTheme<T> | UseThemeProps<T>,
): props is UseThemePropsWithDefaultTheme<T> {
  return Boolean((props as UseThemePropsWithDefaultTheme<T>).defaultTheme);
}

/**
 * Хук для работы с темами
 */
export function useThemeConfig<T extends string>(
  props: UseThemeProps<T>,
): {
  theme: T | undefined;
  themeClassName: string | undefined;
  changeTheme(theme: T): void;
};

export function useThemeConfig<T extends string>(
  props: UseThemePropsWithDefaultTheme<T>,
): {
  theme: T;
  themeClassName: string;
  changeTheme(theme: T): void;
};

export function useThemeConfig<T extends string>(props: UseThemePropsWithDefaultTheme<T> | UseThemeProps<T>) {
  const [theme, setTheme] = useState(hasDefaultTheme(props) ? props.defaultTheme : undefined);

  return {
    theme,
    themeClassName: theme ? props.themeMap[theme] : undefined,
    changeTheme: setTheme,
  };
}
