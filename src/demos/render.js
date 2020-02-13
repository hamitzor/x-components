import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '../index';
import { createTheme } from '../theme';

const App = ({ component }) => {
   const [appTheme, setAppTheme] = useState(createTheme('dark'));
   window.lightTheme = () => setAppTheme(createTheme('light'));
   window.darkTheme = () => setAppTheme(createTheme('dark'));
   return (
      <ThemeProvider
         theme={appTheme}>
         {component}
      </ThemeProvider>
   );
};

export default (component, id) => ReactDOM.render((
   <App
      component={component} />
), document.getElementById(id));