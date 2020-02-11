import React from 'react';
import { ThemeProvider } from 'react-jss';
import theme from './theme';

const XThemeProvider = props => (
   <ThemeProvider theme={theme}>
      {props.children}
   </ThemeProvider>
);

export default XThemeProvider;