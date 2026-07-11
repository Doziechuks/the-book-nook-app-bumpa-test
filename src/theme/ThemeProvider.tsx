import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, Theme } from './colors';

type ColorScheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  colorScheme: ColorScheme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const colorScheme: ColorScheme = systemScheme === 'dark' ? 'dark' : 'light';
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const value = useMemo(() => ({ theme, colorScheme }), [theme, colorScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

export default ThemeProvider;
