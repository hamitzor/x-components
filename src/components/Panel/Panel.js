import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

const useStyles = createUseStyles(theme => ({
   panel: {
      backgroundColor: theme.backgroundColors.panel,
   },
   padding: {
      padding: theme.unit * 2
   },
   shadow: {
      boxShadow: theme.shadows[1]
   },
   rounded: {
      borderRadius: 4
   },
   fullHeight: {
      height: '100%'
   }
}));

const Panel = React.forwardRef((props, ref) => {
   const { children, className, padding, shadow, rounded, fullHeight, ...others } = props;
   const classes = useStyles(props);

   return (
      <div
         ref={ref}
         className={classnames(
            classes.panel,
            {
               [classes.padding]: padding,
               [classes.shadow]: shadow,
               [classes.rounded]: rounded,
               [classes.fullHeight]: fullHeight
            },
            className)}
         {...others}>
         {children}
      </div>
   );
});

Panel.propTypes = {
   children: PropTypes.any.isRequired,
   className: PropTypes.string,
   padding: PropTypes.bool,
   shadow: PropTypes.bool,
   rounded: PropTypes.bool,
   fullHeight: PropTypes.bool,
};

Panel.defaultProps = {
   className: '',
   padding: true,
   shadow: true,
   rounded: true,
   fullHeight: false,
};

export { Panel };