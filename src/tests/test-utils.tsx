import ThemeProvider from '@/src/theme/ThemeProvider';
import { render, RenderOptions } from '@testing-library/react-native';
import React, { ReactElement } from 'react';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
