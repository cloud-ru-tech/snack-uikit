import { useState } from 'react';

type UseThemeProps<T extends string> = {
  themeMap: Record<T, string>;
  defaultTheme?: T;
};

export function useThemeConfig<T extends string>({ themeMap, defaultTheme }: UseThemeProps<T>) {
  const [theme, setTheme] = useState(defaultTheme);

  return {
    theme,
    themeClassName: theme ? themeMap[theme] : undefined,
    changeTheme: setTheme,
  };
}
