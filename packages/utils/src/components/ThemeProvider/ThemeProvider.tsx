import { ReactNode } from 'react';

import { useThemeConfig } from '../../hooks';
import { ThemeContext } from './contexts';

type UseThemePropsWithDefaultTheme = { themeMap: Record<string, string>; defaultTheme: string };
type UseThemeProps = { themeMap: Record<string, string> };

export type ThemeProviderProps = { children: ReactNode } & (UseThemePropsWithDefaultTheme | UseThemeProps);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const themeConfig = useThemeConfig(props);

  return <ThemeContext.Provider value={themeConfig}>{children}</ThemeContext.Provider>;
}
