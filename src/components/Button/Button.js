import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import Icon from '../Icon';
import Badge from '../Badge';
import Color from 'color';

const propValues = {
   color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
   type: ['default', 'filled', 'transparent'],
   justify: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around']
};

const useStyles = createUseStyles(theme => ({
   button: {
      position: 'relative',
      display: 'inline-block',
      textTransform: 'uppercase',
      padding: 0,
      border: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      transition: theme.transition(['background', 'color']),
      fontWeight: 600,
      cursor: 'pointer',
      '&:focus': {
         outline: 'none'
      }
   },
   round: {
      borderRadius: '50%'
   },
   rounded: {
      borderRadius: theme.fontSizes.normal / 4
   },
   disabled: {
      cursor: 'default'
   },
   fullWidth: {
      width: '100%'
   },
   content: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '8px 15px',
   },
   iconButton: {
      padding: '8px 8px'
   },
   ...propValues.justify.reduce((acc, justify) => ({
      ...acc,
      [justify]: {
         justifyContent: justify
      }
   }), {}),
   ...propValues.color.reduce((acc, color) => ({
      ...acc,
      ...['enabled', 'disabled'].reduce((acc, status) => ({
         ...acc,
         ...propValues.type.reduce((acc, type) => {
            const style = { '&:hover': {}, '&:active': {} };
            switch (type) {
               case 'transparent':
                  style.color = theme.colors[color].disabled;
                  style.backgroundColor = 'transparent';
                  if (status === 'enabled') {
                     style.color = theme.colors[color][theme.darkOrLight('light', 'normal')];
                     style['&:hover'].backgroundColor = Color(style.color).alpha(0.2).string();
                     style['&:active'].backgroundColor = Color(style.color).alpha(0.35).string();
                  }
                  break;
               case 'filled':
                  style.boxShadow = theme.darkOrLight('none', theme.shadows[2]);
                  style.backgroundColor = theme.colors[color].disabled;
                  style.color = theme.textColors.reversed;
                  if (status === 'enabled') {
                     style.backgroundColor = theme.colors[color][theme.darkOrLight('light', 'normal')];
                     style['&:hover'].backgroundColor = theme.colors[color][theme.darkOrLight('normal', 'dark')];
                     style['&:active'].backgroundColor = theme.colors[color][theme.darkOrLight('lighter', 'light')];
                  }
                  break;
               default:
                  style.boxShadow = theme.darkOrLight('none', theme.shadows[2]);
                  style.color = theme.colors[color].disabled;
                  style.backgroundColor = theme.colors[theme.darkOrLight('darkgrey', 'lightgrey')]
                  [status === 'enabled' ? theme.darkOrLight('darker', 'light') : 'disabled'];
                  if (status === 'enabled') {
                     style.color = theme.colors[color][theme.darkOrLight('lighter', 'normal')];
                     style['&:hover'].backgroundColor = theme.colors[theme.darkOrLight('darkgrey', 'lightgrey')][theme.darkOrLight('dark', 'normal')];
                     style['&:active'].backgroundColor = theme.colors[theme.darkOrLight('darkgrey', 'lightgrey')][theme.darkOrLight('normal', 'light')];
                  }
            }
            return {
               ...acc,
               [`${type}${color}${status}`]: style
            };
         }, {})
      }), {})
   }), {}),
   noShadow: {
      boxShadow: 'none'
   }
}));

const Button = React.forwardRef((props, ref) => {
   const {
      children,
      color,
      type,
      rounded,
      round,
      disabled,
      fullWidth,
      iconButton,
      className,
      justify,
      contentClassName,
      badge,
      noShadow,
      ...others
   } = props;
   const classes = useStyles();

   return (
      <button
         ref={ref}
         className={classnames(
            classes.button,
            classes[`${type}${color}${disabled ? 'disabled' : 'enabled'}`],
            {
               [classes.rounded]: !round && rounded,
               [classes.round]: round,
               [classes.disabled]: disabled,
               [classes.fullWidth]: fullWidth,
               [classes.noShadow]: noShadow
            },
            className
         )}
         {...others}>
         {badge}
         <div className={classnames(classes.content, classes[justify], { [classes.iconButton]: iconButton }, contentClassName)}>
            {children}
         </div>
      </button>
   );
});

Button.propTypes = {
   children: childrenValidator([{ type: 'string' }, { type: 'span' }, { type: Icon }, { type: 'number' }]),
   className: PropTypes.string,
   color: PropTypes.oneOf(propValues.color),
   type: PropTypes.oneOf(propValues.type),
   rounded: PropTypes.bool,
   round: PropTypes.bool,
   disabled: PropTypes.bool,
   fullWidth: PropTypes.bool,
   iconButton: PropTypes.bool,
   justify: PropTypes.oneOf(propValues.justify),
   contentClassName: PropTypes.string,
   badge: childrenValidator([{ type: Badge, max: 1 }]),
   noShadow: PropTypes.bool
};

Button.defaultProps = {
   className: '',
   color: 'primary',
   type: 'filled',
   rounded: true,
   round: false,
   disabled: false,
   fullWidth: false,
   iconButton: false,
   justify: 'center',
   contentClassName: '',
   noShadow: false
};

export { Button, propValues };