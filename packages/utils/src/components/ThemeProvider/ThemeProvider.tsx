import { ReactNode } from 'react';

import { useThemeConfig } from '../../hooks';
import { ThemeContext } from './contexts';

type UseThemePropsWithDefaultTheme = {
  /**
   * Объект с указанием соответсвия темы и css-класса
   */
  themeMap: Record<string, string>;
  /**
   * Значение темы по умолчанию
   */
  defaultTheme: string;
};

type UseThemeProps = {
  /**
   * Объект с указанием соответсвия темы и css-класса
   */
  themeMap: Record<string, string>;
};

export type ThemeProviderProps = {
  /**
   * Дети, которые будут обёрнуты в провайдер
   */
  children: ReactNode;
} & (UseThemePropsWithDefaultTheme | UseThemeProps);

/**
 * Провайдер, предназначенный для работы с темами
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const themeConfig = useThemeConfig(props);

  return <ThemeContext.Provider value={themeConfig}>{children}</ThemeContext.Provider>;
}
