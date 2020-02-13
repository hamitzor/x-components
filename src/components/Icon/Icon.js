import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const propValues = {
   color: ['inherit', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
};

const useStyles = createUseStyles(theme => ({
   icon: {
      color: ({ color }) => color !== 'inherit' ? theme.colors[color][theme.decide('light', 'normal')] : 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: ({ leftGap }) => leftGap && theme.unit,
      marginRight: ({ rightGap }) => rightGap && theme.unit,
   }
}));

const Icon = props => {
   const { children, leftGap, rightGap, color, ...others } = props;
   const classes = useStyles(props);
   return (
      <div
         className={classes.icon}
         {...others}>
         {children}
      </div>
   );
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