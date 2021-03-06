import React, { useState } from 'react';
import {
   BrowserRouter,
   Switch,
   Route,
   Link
} from 'react-router-dom';
import { ThemeProvider } from '../index';
import { createTheme } from '../theme';
import { createUseStyles } from 'react-jss';
import List from '../components/List';
import ListItem from '../components/ListItem';
import textInput from './text-input';
import button from './button';
import icon from './icon';
import spinner from './spinner';
import list from './list';
import flex from './flex';
import inputExtension from './input-extension';
import tooltip from './tooltip';
import select from './select';
import checkbox from './checkbox';
import alert from './alert';
import anchor from './anchor';
import badge from './badge';
import expansion from './expansion';
import menu from './menu';
import popup from './popup';
import tabs from './tabs';
import radio from './radio';

const demos = [
   alert,
   anchor,
   badge,
   button,
   checkbox,
   radio,
   expansion,
   flex,
   icon,
   inputExtension,
   list,
   menu,
   popup,
   select,
   spinner,
   tabs,
   textInput,
   tooltip
];

const useStyles = createUseStyles(theme => ({
   '@global': {
      body: {
         margin: 0
      }
   },
   themeSwitch: {
      textAlign: 'center',
      padding: '5px 0px',
      cursor: 'pointer',
      textTransform: 'uppercase',
      fontWeight: 600,
      '&.dark': {
         backgroundColor: '#e2e2e2',
         color: '#333333'
      },
      '&.light': {
         backgroundColor: '#454545',
         color: '#f4f4f4'
      }
   },
   container: {
      display: 'flex',
      margin: 15
   },
   navigation: {
      marginRight: 15,
      minHeight: '120vh',
   },
   link: {
      display: 'block',
      fontWeight: 600,
      textDecoration: 'none',
      padding: '10px 20px',
      width: '100%'
   }
}));

const App = () => {
   const [appTheme, setAppTheme] = useState(createTheme('light'));
   const [appThemeName, setAppThemeName] = useState('light');
   const classes = useStyles(null, appTheme);

   return (
      <ThemeProvider theme={appTheme}>
         <div
            className={`${classes.themeSwitch} ${appThemeName}`}
            onClick={() => {
               if (appThemeName === 'dark') {
                  setAppTheme(createTheme('light'));
                  setAppThemeName('light');
               }
               else {
                  setAppTheme(createTheme('dark'));
                  setAppThemeName('dark');
               }
            }}>
            {`Switch to ${appThemeName === 'dark' ? 'light' : 'dark'} theme`}
         </div>
         <BrowserRouter>
            <div className={classes.container}>
               <List className={classes.navigation}>
                  {demos.map(demo =>
                     <ListItem
                        itemId={demo.name}
                        key={demo.name}
                        style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/${demo.name}`} className={classes.link} style={{ color: appTheme.textColors.normal }}>
                           {demo.name}
                        </Link>
                     </ListItem>
                  )}
               </List>
               <Switch>
                  {demos.map(demo =>
                     <Route key={demo.name} exact path={`/${demo.name}`}>
                        <div>
                           <h2 style={{ color: appTheme.textColors.normal }}>{demo.name}</h2>
                           <demo.component />
                        </div>
                     </Route>
                  )}
               </Switch>
            </div>
         </BrowserRouter>
      </ThemeProvider >
   );
};

export default App;