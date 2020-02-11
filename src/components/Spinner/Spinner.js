import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const propValues = {
   color: ['primary', 'secondary', 'success', 'warning', 'error']
};

const useStyles = createUseStyles(theme => ({
   '@keyframes spin': {
      from: theme.transform('rotate(0deg)'),
      to: theme.transform('rotate(360deg)')
   },
   spinner: {
      animation: '$spin 1s linear infinite',
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: '50%',
      borderColor: '#f2f2f2',
      borderTopColor: ({ color }) => theme.colors[color].normal,
      width: '100%',
      height: '100%',
      minWidth: '10px',
      minHeight: '10px'
   },
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

const Spinner = props => {
   const { color, visible, animate, ...others } = props;
   const theme = useTheme();
   const classes = useStyles({ ...props, theme });
   const component = <div className={classes.spinner}  {...others}></div>;
   if (animate)
      return <CSSTransition
         in={visible}
         timeout={theme.animationDuration}
         unmountOnExit
         classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            exit: classes.exit,
            exitActive: classes.exitActive
         }}
      >{component}</CSSTransition>;
   else
      return visible && component;
};

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