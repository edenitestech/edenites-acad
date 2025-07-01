import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

export const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};