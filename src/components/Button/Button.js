import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import Icon from '../Icon';
import Color from 'color';

const propValues = {
   color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
   type: ['default', 'filled', 'transparent'],
   justify: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around']
};

const useStyles = createUseStyles(theme => ({
   button: {
      display: 'inline-block',
      textTransform: 'uppercase',
      padding: 0,
      border: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      transition: theme.transition(['background', 'color']),
      fontWeight: 600,
      borderRadius: ({ round, rounded }) => round ? '50%' : rounded ? theme.fontSizes.normal / 4 : 0,
      boxShadow: ({ type }) => type === 'transparent' ? 'none' : (theme.type === 'dark' ? 'none' : theme.shadows[1]),
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
      justifyContent: ({ justify }) => justify,
      padding: ({ iconButton }) => iconButton ? '8px 8px' : '8px 15px',
   },
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
                  style.backgroundColor = theme.colors[color].disabled;
                  style.color = theme.textColors[Color(theme.colors[color].dark).isLight() ? 'normal' : 'reversed'];
                  if (status === 'enabled') {
                     style.backgroundColor = theme.colors[color][theme.darkOrLight('light', 'normal')];
                     style['&:hover'].backgroundColor = theme.colors[color][theme.darkOrLight('normal', 'dark')];
                     style['&:active'].backgroundColor = theme.colors[color][theme.darkOrLight('lighter', 'light')];
                  }
                  break;
               default:
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
}));

const Button = React.forwardRef((props, ref) => {
   const { children, color, type, rounded, round, disabled, fullWidth, iconButton, className, contentClassName, ...others } = props;
   const classes = useStyles(props);
   
   return (
      <button ref={ref} className={classnames(className, classes.button, classes[`${type}${color}${disabled ? 'disabled' : 'enabled'}`])} {...others}>
         <div className={classnames(classes.content, contentClassName)}>
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
   contentClassName: PropTypes.string
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
   contentClassName: ''
};

export { Button, propValues };