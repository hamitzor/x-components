import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

const propValues = {
   color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error']
};

const useStyles = createUseStyles(theme => ({
   '@keyframes spin': {
      from: theme.transform('rotate(0deg)'),
      to: theme.transform('rotate(360deg)')
   },
   spinner: {
      animation: '$spin 1s linear infinite',
      border: `2px solid ${theme.colors[theme.darkOrLight('grey', 'lightgrey')].normal}`,
      borderRadius: '50%',
      width: '100%',
      height: '100%',
      minWidth: '10px',
      minHeight: '10px'
   },
   ...propValues.color.reduce((acc, color) => ({
      ...acc,
      [color]: {
         borderTopColor: theme.colors[color][theme.darkOrLight('light', 'normal')]
      }
   }), {}),
   enter: {
      opacity: 0,
   },
   enterActive: {
      opacity: 1,
      transition: theme.transition()
   },
   exit: {
      opacity: 1,
   },
   exitActive: {
      opacity: 0,
      transition: theme.transition()
   },
}));

const Spinner = React.forwardRef((props, ref) => {
   const { color, visible, animate, ...others } = props;
   const theme = useTheme();
   const classes = useStyles({ ...props, theme });

   const spinner = <div ref={ref} className={classnames(classes.spinner, classes[color])} {...others} />;

   return animate ?
      <CSSTransition
         in={visible}
         timeout={theme.animationDuration}
         unmountOnExit
         classNames={{ enter: classes.enter, enterActive: classes.enterActive, exit: classes.exit, exitActive: classes.exitActive }}>
         {spinner}
      </CSSTransition> : visible && spinner;
});

Spinner.propTypes = {
   color: PropTypes.oneOf(propValues.color),
   visible: PropTypes.bool,
   animate: PropTypes.bool,
};

Spinner.defaultProps = {
   color: 'primary',
   visible: false,
   animate: true
};

export { Spinner, propValues };