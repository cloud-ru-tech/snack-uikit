import { createContext, useContext } from 'react';

export type ThemeContextType = {
  theme: string | undefined;
  themeClassName: string | undefined;
  changeTheme: ((theme: string) => void) | undefined;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: undefined,
  themeClassName: undefined,
  changeTheme: undefined,
});

export const useThemeContext = () => useContext<ThemeContextType>(ThemeContext);
