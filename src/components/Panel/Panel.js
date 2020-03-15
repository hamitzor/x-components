import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

const useStyles = createUseStyles(theme => ({
   panel: {
      backgroundColor: theme.backgroundColors.panel,
      padding: ({ padding }) => padding && theme.unit * 2,
      boxShadow: ({ shadow }) => shadow ? theme.shadows[1] : theme.shadows[0],
      borderRadius: ({ rounded }) => rounded ? 4 : 0,
      height: ({ fullHeight }) => fullHeight && '100%',
   }
}));

const Panel = React.forwardRef((props, ref) => {
   const { children, className, padding, shadow, rounded, fullHeight, ...others } = props;
   const classes = useStyles(props);
   
   return (
      <div ref={ref} className={classnames(classes.panel, className)} {...others}>
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