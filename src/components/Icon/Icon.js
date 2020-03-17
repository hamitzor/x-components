import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';

const propValues = {
   color: ['inherit', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
};

const useStyles = createUseStyles(theme => ({
   icon: {
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   leftGap: {
      marginLeft: theme.unit,
   },
   rightGap: {
      marginRight: theme.unit,
   },
   ...propValues.color.reduce((acc, color) => ({
      ...acc,
      [color]: {
         color: color !== 'inherit' ? theme.colors[color][theme.darkOrLight('light', 'normal')] : 'inherit'
      }
   }), {})
}));

const Icon = React.forwardRef((props, ref) => {
   const { children, color, leftGap, rightGap, ...others } = props;
   const classes = useStyles();

   return (
      <div ref={ref} className={classnames(classes.icon, classes[color], { [classes.leftGap]: leftGap, [classes.rightGap]: rightGap, })} {...others}>
         {children}
      </div>
   );
});

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