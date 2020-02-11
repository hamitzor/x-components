import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import Icon from '../Icon';
import Color from 'color';

const propValues = {
   color: ['primary', 'secondary', 'success', 'warning', 'error'],
   type: ['light', 'filled', 'transparent'],
};

const useStyles = createUseStyles(theme => ({
   button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: '100%',
      position: 'relative',
      textTransform: 'uppercase',
      border: 'none',
      fontFamily: theme.fontFamily,
      transition: theme.transition(['background', 'color']),
      cursor: 'pointer',
      boxShadow: theme.shadows[1],
      fontSize: theme.fontSizes.normal,
      fontWeight: 500,
      padding: '6px 15px',
      '&:focus': {
         outline: 'none'
      },
      '&::-moz-focus-inner': {
         border: 0
      }
   },
   rounded: {
      borderRadius: theme.fontSizes.normal / 3,
   },
   round: {
      borderRadius: '50%',
   },
   noShadow: {
      boxShadow: 'none',
   },
   disabled: {
      cursor: 'default'
   },
   ...propValues.color.reduce((acc, color) => ({
      ...acc,
      ...['enabled', 'disabled'].reduce((acc, status) => ({
         ...acc,
         ...propValues.type.reduce((acc, type) => {
            const style = { '&:hover': {}, '&:active': {} };
            switch (type) {
               case 'transparent':
                  style.color = theme.colors[color][status === 'enabled' ? 'normal' : 'disabled'];
                  style.backgroundColor = 'transparent';
                  if (status === 'enabled') {
                     style['&:hover'].backgroundColor = Color(style.color).alpha(0.15).string();
                     style['&:active'].backgroundColor = Color(style.color).alpha(0.3).string();
                  }
                  break;
               case 'filled':
                  style.backgroundColor = theme.colors[color][status === 'enabled' ? 'normal' : 'disabled'];
                  style.color = theme.textColors[Color(theme.colors[color].dark).isLight() ? 'normal' : 'reversed'];
                  if (status === 'enabled') {
                     style['&:hover'].backgroundColor = theme.colors[color].dark;
                     style['&:active'].backgroundColor = theme.colors[color].light;
                  }
                  break;
               default:
                  style.color = theme.colors[color][status === 'enabled' ? 'normal' : 'disabled'];
                  style.backgroundColor = theme.colors.lightgrey[status === 'enabled' ? 'normal' : 'disabled'];
                  if (status === 'enabled') {
                     style['&:hover'].backgroundColor = theme.colors.lightgrey.dark;
                     style['&:active'].backgroundColor = theme.colors.lightgrey.light;
                  }
            }
            return {
               ...acc,
               [`${type}-${color}-${status}`]: style
            };
         }, {})
      }), {})
   }), {}),
   fullWidth: {
      width: '100%'
   }
}));

const Button = props => {
   const { children, color, type, rounded, round, disabled, fullWidth, ...others } = props;
   const classes = useStyles(props);
   const buttonClasses = classnames(
      'XButton',
      classes.button,
      classes[`${type}-${color}-${disabled ? 'disabled' : 'enabled'}`],
      {
         [classes.noShadow]: type === 'transparent',
         [classes.disabled]: disabled,
         [classes.fullWidth]: fullWidth,
         [classes.rounded]: rounded,
         [classes.round]: round,
      }
   );
   return <button className={buttonClasses} {...others}>{children}</button>;
};

Button.propTypes = {
   children: childrenValidator([{ type: 'string' }, { type: 'span' }, { type: Icon }, { type: 'number' }]),
   color: PropTypes.oneOf(propValues.color),
   type: PropTypes.oneOf(propValues.type),
   rounded: PropTypes.bool,
   round: PropTypes.bool,
   disabled: PropTypes.bool,
   fullWidth: PropTypes.bool,
};

Button.defaultProps = {
   color: 'primary',
   type: 'light',
   rounded: true,
   round: false,
   disabled: false,
   fullWidth: false,
};

export { Button, propValues };