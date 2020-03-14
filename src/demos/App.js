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
import Panel from '../components/Panel';
import textInput from './text-input';
import button from './button';
import icon from './icon';
import spinner from './spinner';
import list from './list';
import flex from './flex';
import inputExtension from './input-extension';
import tooltip from './tooltip';

const demos = [button, flex, icon, inputExtension, list, spinner, textInput, tooltip];

const useStyles = createUseStyles(theme => ({
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
      minHeight: '95vh'
   },
   link: {
      display: 'inline-block',
      fontWeight: 600,
      textDecoration: 'none',
      marginBottom: 5,
   }
}));


const App = () => {
   const [appTheme, setAppTheme] = useState(createTheme('light'));
   const [appThemeName, setAppThemeName] = useState('light');
   const classes = useStyles(null, appTheme);
   return (
      <ThemeProvider theme={appTheme}>
         <div className={`${classes.themeSwitch} ${appThemeName}`} onClick={() => {
            if (appThemeName === 'dark') {
               setAppTheme(createTheme('light'));
               setAppThemeName('light');
            }
            else {
               setAppTheme(createTheme('dark'));
               setAppThemeName('dark');
            }
         }}>{`Switch to ${appThemeName === 'dark' ? 'light' : 'dark'} theme`}</div>
         <BrowserRouter>
            <div className={classes.container}>
               <Panel className={classes.navigation}>
                  {demos.map((demo, i) => (
                     <div key={i}>
                        <Link to={`/${demo.name}`} className={classes.link} style={{ color: appTheme.textColors.normal }}>{demo.name}</Link>
                     </div>
                  ))}
               </Panel>
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