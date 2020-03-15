import React from 'react';
import { ThemeProvider as ReactJssThemeProvider } from 'react-jss';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   '@global': {
      body: {
         backgroundColor: theme.backgroundColors.default,
         minHeight: '100%',
         fontSize: 14,
         fontFamily: 'Roboto',
         margin: 0
      }
   },
   root: {
      '& *': {
         boxSizing: 'border-box'
      },
      '& *::before': {
         boxSizing: 'border-box'
      },
      '& *::after': {
         boxSizing: 'border-box'
      },
      fontSize: theme.fontSizes.normal,
      fontFamily: theme.fontFamily
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