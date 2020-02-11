import React from 'react';
import ReactDOM from 'react-dom';
import { XThemeProvider } from '../index';

export default (component, id) => ReactDOM.render((
   <XThemeProvider>
      {component}
   </XThemeProvider>
), document.getElementById(id));