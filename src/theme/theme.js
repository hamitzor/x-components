import Color from 'color';

const createTheme = (type, options) => {
   const textColors = {
      normal: type === 'light' ? '#333333' : '#f2f2f2',
      reversed: type === 'light' ? '#f7f7f7' : '#333333',
   };
   const backgroundColors = {
      default: type === 'light' ? '#f3f3f3' : '#333333',
      panel: type === 'light' ? '#ffffff' : '#404040'
   };
   const primary = Color('#2696ff'),
      secondary = Color('#8b36d6'),
      success = Color('#26ab49'),
      warning = Color('#e88d15'),
      error = Color('#e34234'),
      darkgrey = Color('#454545'),
      grey = Color('#707070'),
      lightgrey = Color('#dbdbdb');

   const colors = {
      primary: {
         disabled: primary.lighten(0.4).toString(),
         lighter: primary.lighten(0.3).toString(),
         light: primary.lighten(0.2).toString(),
         normal: primary.toString(),
         dark: primary.darken(0.2).toString(),
         darker: primary.darken(0.3).toString()
      },
      secondary: {
         disabled: secondary.lighten(0.4).toString(),
         lighter: secondary.lighten(0.3).toString(),
         light: secondary.lighten(0.2).toString(),
         normal: secondary.toString(),
         dark: secondary.darken(0.2).toString(),
         darker: secondary.darken(0.3).toString()
      },
      success: {
         disabled: success.lighten(0.4).toString(),
         lighter: success.lighten(0.3).toString(),
         light: success.lighten(0.2).toString(),
         normal: success.toString(),
         dark: success.darken(0.2).toString(),
         darker: success.darken(0.3).toString()
      },
      warning: {
         disabled: warning.lighten(0.4).toString(),
         lighter: warning.lighten(0.3).toString(),
         light: warning.lighten(0.2).toString(),
         normal: warning.toString(),
         dark: warning.darken(0.2).toString(),
         darker: warning.darken(0.3).toString()
      },
      error: {
         disabled: error.lighten(0.4).toString(),
         lighter: error.lighten(0.3).toString(),
         light: error.lighten(0.2).toString(),
         normal: error.toString(),
         dark: error.darken(0.2).toString(),
         darker: error.darken(0.3).toString()
      },
      lightgrey: {
         disabled: lightgrey.lighten(0.12).toString(),
         lighter: lightgrey.lighten(0.08).toString(),
         light: lightgrey.lighten(0.06).toString(),
         normal: lightgrey.toString(),
         dark: lightgrey.darken(0.2).toString(),
         darker: lightgrey.darken(0.3).toString()
      },
      grey: {
         disabled: grey.lighten(0.4).toString(),
         lighter: grey.lighten(0.3).toString(),
         light: grey.lighten(0.2).toString(),
         normal: grey.toString(),
         dark: grey.darken(0.2).toString(),
         darker: grey.darken(0.3).toString()
      },
      darkgrey: {
         disabled: darkgrey.lighten(0.4).toString(),
         lighter: darkgrey.lighten(0.3).toString(),
         light: darkgrey.lighten(0.2).toString(),
         normal: darkgrey.toString(),
         dark: darkgrey.darken(0.2).toString(),
         darker: darkgrey.darken(0.35).toString()
      }
   };
   const animationDuration = 300;
   const unit = 5;
   const fontFamily = 'Roboto';
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
   ];
   const z = {
      Alert: 4000,
      Popup: 4100,
      Select: 3900
   };
   return {
      type,
      textColors,
      backgroundColors,
      colors,
      animationDuration,
      unit,
      fontSizes,
      fontFamily,
      breakpointValues,
      shadows,
      z,
      breakpoints: () => Object.keys(breakpointValues),
      width: widthInPixels => {
         let width = 'xs';
         if (widthInPixels >= breakpointValues.sm) width = 'sm';
         if (widthInPixels >= breakpointValues.md) width = 'md';
         if (widthInPixels >= breakpointValues.lg) width = 'lg';
         if (widthInPixels >= breakpointValues.xl) width = 'xl';
         return width;
      },
      pixel: value => typeof value === 'number' ? value : breakpointValues[value],
      screenWidth: () => width(window.innerWidth),
      min: width => `@media (min-width:${pixel(width)}px)`,
      max: width => `@media (max-width:${pixel(width)}px)`,
      between: (min, max) => `${min(min)} and ${max(max)}`,
      transition: (properties = ['all'], duration = animationDuration) => properties.map(property => `${property} ${duration}ms`).join(','),
      transform: value => ({ '-ms-transform': value, '-webkit-transform': value, transform: value }),
      decide: (a, b) => type === 'dark' ? a : b
   };
};

export { createTheme };