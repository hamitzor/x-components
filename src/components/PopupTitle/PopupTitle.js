import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
   popupTitle: {
      color: theme.textColors.normal,
      fontSize: theme.fontSizes.h6,
      margin: 0,
   }
}));

const PopupTitle = props => {
   const { className } = props;
   const classes = useStyles();
   return <h2 className={classnames(classes.popupTitle, className)}>{props.children}</h2>;
};

PopupTitle.propTypes = {
   children: PropTypes.string.isRequired,
   className: PropTypes.string
};

PopupTitle.defaultProps = {
   className: ''
};

export { PopupTitle };

