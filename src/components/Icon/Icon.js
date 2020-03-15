import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';

const propValues = {
   color: ['inherit', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
};

const useStyles = createUseStyles(theme => ({
   icon: {
      color: ({ color }) => color !== 'inherit' ? theme.colors[color][theme.darkOrLight('light', 'normal')] : 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: ({ leftGap }) => leftGap && theme.unit,
      marginRight: ({ rightGap }) => rightGap && theme.unit,
   }
}));

const Icon = React.forwardRef((props, ref) => {
   const { children, leftGap, rightGap, color, ...others } = props;
   const classes = useStyles(props);
   
   return (
      <div ref={ref} className={classnames(classes.icon)} {...others}>
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