import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import Icon from '../Icon';
import Color from 'color';

const propValues = {
   color: ['darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
   type: ['default', 'filled', 'transparent'],
};

const useStyles = createUseStyles(theme => ({
   button: {
      display: 'inline-block',
      textTransform: 'uppercase',
      padding: 0,
      border: 'none',
      fontFamily: 'inherit',
      fontSize: theme.fontSizes.normal,
      transition: theme.transition(['background', 'color']),
      fontWeight: 500,
      borderRadius: ({ round, rounded }) => round ? '50%' : rounded ? theme.fontSizes.normal / 3 : 0,
      boxShadow: ({ type }) => type === 'transparent' ? 'none' : theme.shadows[1],
      cursor: ({ disabled }) => disabled ? 'default' : 'pointer',
      width: ({ fullWidth }) => fullWidth && '100%',
      '&:focus': {
         outline: 'none'
      }
   },
   content: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: ({ iconButton }) => iconButton ? '6px 6px' : '6px 15px',
   },
   ...propValues.color.reduce((acc, color) => ({
      ...acc,
      ...['enabled', 'disabled'].reduce((acc, status) => ({
         ...acc,
         ...propValues.type.reduce((acc, type) => {
            const style = { '&:hover': {}, '&:active': {} };
            switch (type) {
               case 'transparent':
                  style.color = theme.colors[color][status === 'enabled' ? theme.decide('light', 'normal') : 'disabled'];
                  style.backgroundColor = 'transparent';
                  if (status === 'enabled') {
                     style['&:hover'].backgroundColor = Color(style.color).alpha(0.2).string();
                     style['&:active'].backgroundColor = Color(style.color).alpha(0.35).string();
                  }
                  break;
               case 'filled':
                  style.backgroundColor = theme.colors[color][status === 'enabled' ? theme.decide('light', 'normal') : 'disabled'];
                  style.color = theme.textColors[Color(theme.colors[color].dark).isLight() ? 'normal' : 'reversed'];
                  if (status === 'enabled') {
                     style['&:hover'].backgroundColor = theme.colors[color][theme.decide('normal', 'dark')];
                     style['&:active'].backgroundColor = theme.colors[color][theme.decide('lighter', 'light')];
                  }
                  break;
               default:
                  style.color = theme.colors[color][status === 'enabled' ? theme.decide('lighter', 'normal') : 'disabled'];
                  style.backgroundColor = theme.colors[theme.decide('darkgrey', 'lightgrey')]
                  [status === 'enabled' ? theme.decide('darker', 'light') : 'disabled'];
                  if (status === 'enabled') {
                     style['&:hover'].backgroundColor = theme.colors[theme.decide('darkgrey', 'lightgrey')][theme.decide('dark', 'normal')];
                     style['&:active'].backgroundColor = theme.colors[theme.decide('darkgrey', 'lightgrey')][theme.decide('normal', 'light')];
                  }
            }
            return {
               ...acc,
               [`${type}${color}${status}`]: style
            };
         }, {})
      }), {})
   }), {}),
}));

const Button = props => {
   const { children, color, type, rounded, round, disabled, fullWidth, iconButton, className, ...others } = props;
   const classes = useStyles(props);
   const combinedClasses = {
      button: classnames(className, classes.button, classes[`${type}${color}${disabled ? 'disabled' : 'enabled'}`]),
   };
   return (
      <button
         className={combinedClasses.button}
         {...others}>
         <div
            className={classes.content}>
            {children}
         </div>
      </button>
   );
};

Button.propTypes = {
   children: childrenValidator([{ type: 'string' }, { type: 'span' }, { type: Icon }, { type: 'number' }]),
   className: PropTypes.string,
   color: PropTypes.oneOf(propValues.color),
   type: PropTypes.oneOf(propValues.type),
   rounded: PropTypes.bool,
   round: PropTypes.bool,
   disabled: PropTypes.bool,
   fullWidth: PropTypes.bool,
   iconButton: PropTypes.bool
};

Button.defaultProps = {
   className: '',
   color: 'primary',
   type: 'default',
   rounded: true,
   round: false,
   disabled: false,
   fullWidth: false,
   iconButton: false
};

export { Button, propValues };