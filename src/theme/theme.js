const textColors = {
   normal: '#1a1a1a',
   reversed: '#f7f7f7',
};
const panelColor = '#ffffff';
const colors = {
   primary: {
      normal: '#2696ff',
      light: '#4faaff',
      dark: '#0073e0',
      disabled: '#63b3ff',
   },
   secondary: {
      normal: '#8b36d6',
      light: '#a23efa',
      dark: '#742db3',
      disabled: '#a162d9',
   },
   success: {
      normal: '#32a877',
      light: '#2dbd81',
      dark: '#2f9168',
      disabled: '#74c2a2',
   },
   warning: {
      normal: '#f1bb00',
      light: '#face34',
      dark: '#1c945a',
      disabled: '#c29c1b',
   },
   error: {
      normal: '#e34234',
      light: '#ff6759',
      dark: '#b03025',
      disabled: '#ff9187',
   },
   lightgrey: {
      normal: '#f2f2f2',
      light: '#fafafa',
      dark: '#e4e4e4',
      disabled: '#fefefe',
   }
};
const animationDuration = 300;
const unit = 5;
const fontSizes = {
   h1: 56,
   h2: 38,
   h3: 28,
   h4: 23,
   h5: 18,
   h6: 16,
   small: 14,
   normal: 14,
   large: 20
};
const breakpointValues = {
   xs: 0,
   sm: 600,
   md: 960,
   lg: 1280,
   xl: 1600,
   xxl: 1920
};
const shadows = [
   'none',
   '0px 1px 3px 0px rgba(0,0,0,0.09),0px 1px 1px 0px rgba(0,0,0,0.06),0px 2px 4px -1px rgba(0,0,0,0.02)',
   '1px 1px 3px 0px rgba(0,0,0,0.1),-1px 0px 1px 0px rgba(0,0,0,0.1),1px 2px 4px -1px rgba(0,0,0,0.07)',
   '1px 1px 5px 0px rgba(0,0,0,0.07),1px 2px 2px 0px rgba(0,0,0,0.07),1px 3px 1px -2px rgba(0,0,0,0.07)',
   '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)',
   '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
   '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)'
];
const z = {
   Alert: 4000,
   Popup: 4100,
   Select: 3900
};
const breakpoints = () => Object.keys(breakpointValues);
const width = widthInPixels => {
   let width = 'xs';
   if (widthInPixels >= breakpointValues.sm) width = 'sm';
   if (widthInPixels >= breakpointValues.md) width = 'md';
   if (widthInPixels >= breakpointValues.lg) width = 'lg';
   if (widthInPixels >= breakpointValues.xl) width = 'xl';
   return width;
};
const pixel = value => typeof value === 'number' ? value : breakpointValues[value];
const screenWidth = () => width(window.innerWidth);
const min = width => `@media (min-width:${pixel(width)}px)`;
const max = width => `@media (max-width:${pixel(width)}px)`;
const between = (min, max) => `${min(min)} and ${max(max)}`;
const transition = (properties = ['all'], duration = animationDuration) => properties.map(property => `${property} ${duration}ms`).join(',');
const transform = value => ({ '-ms-transform': value, '-webkit-transform': value, transform: value });
const fontFamily = 'Roboto';

const theme = {
   textColors,
   panelColor,
   colors,
   animationDuration,
   unit,
   fontSizes,
   fontFamily,
   breakpointValues,
   shadows,
   z,
   breakpoints,
   width,
   pixel,
   screenWidth,
   min,
   max,
   between,
   transition,
   transform
};

export default theme;