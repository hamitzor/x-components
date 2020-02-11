import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';

const propValues = {
   color: ['inherit', 'primary', 'secondary', 'success', 'warning', 'error'],
};

const useStyles = createUseStyles(theme => ({
   icon: {
      color: ({ color }) => color !== 'inherit' ? theme.colors[color].normal : 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   leftGap: {
      marginLeft: theme.unit
   },
   rightGap: {
      marginRight: theme.unit
   }
}));

const Icon = props => {
   const { children, leftGap, rightGap, color, ...others } = props;
   const classes = useStyles(props);
   const iconClasses = classnames(
      classes.icon,
      {
         [classes.leftGap]: leftGap,
         [classes.rightGap]: rightGap
      }
   );
   return <div className={iconClasses} {...others}>{children}</div>;
};

Icon.propTypes = {
   children: PropTypes.any.isRequired,
   color: PropTypes.oneOf(propValues.color),
   leftGap: PropTypes.bool,
   rightGap: PropTypes.bool
};

Icon.defaultProps = {
   color: 'inherit',
   leftGap: false,
   rightGap: false
};

export { Icon, propValues };