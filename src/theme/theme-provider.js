import React from 'react';
import { ThemeProvider as ReactJssThemeProvider } from 'react-jss';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   root: {
      backgroundColor: theme.backgroundColors.default,
      fontSize: theme.fontSizes.normal,
      fontFamily: theme.fontFamily,
      color: theme.textColors.normal,
      margin: 0,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      '& *': {
         boxSizing: 'border-box'
      },
      '& *::before': {
         boxSizing: 'border-box'
      },
      '& *::after': {
         boxSizing: 'border-box'
      },
   }
}));

const Root = ({ children }) =>
   <div className={useStyles().root}>
      {children}
   </div>;

const ThemeProvider = ({ theme, children }) =>
   <ReactJssThemeProvider theme={theme}>
      <Root>
         {children}
      </Root>
   </ReactJssThemeProvider>;

export default ThemeProvider;