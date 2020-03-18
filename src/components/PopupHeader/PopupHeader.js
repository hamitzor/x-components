import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import PopupTitle from '../PopupTitle';
import PopupHeaderExtension from '../PopupHeaderExtension';

const propValues = {
   color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error']
};

const colorClasses = theme => propValues.color.reduce((acc, color) => ({
   ...acc,
   [color]: {
      backgroundColor: theme.colors[color][theme.darkOrLight('lighter', 'normal')]
   }
}), {});

const useStyles = createUseStyles(theme => {
   return {
      root: {
         display: 'flex',
         padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
         alignItems: 'center'
      },
      whiteTitle: {
         color: theme.textColors.reversed
      },
      ...colorClasses(theme)
   };
});

const resolveChildren = children => {
   const result = {};
   React.Children.forEach(children, child => {
      if (child)
         if (child.type === PopupTitle)
            result.title = child;
         else {
            result.extension = child;
         }
   });
   return result;
};

const PopupHeader = React.forwardRef((props, ref) => {
   const { children, color, full, className, ...others } = props;
   const classes = useStyles();
   const { title, extension } = resolveChildren(children);

   return (
      <div className={classnames(classes.root, { [classes[color]]: full }, className)} {...others} ref={ref}>
         {title && React.cloneElement(title, { className: classnames({ [classes.whiteTitle]: full }) })}
         {extension}
      </div>
   );
});

PopupHeader.propTypes = {
   children: childrenValidator([{ type: PopupTitle, max: 1 }, { type: PopupHeaderExtension, max: 1 }]),
   className: PropTypes.string,
   color: PropTypes.oneOf(propValues.color),
   full: PropTypes.bool
};

PopupHeader.defaultProps = {
   className: '',
   color: 'primary',
   full: false
};

export { PopupHeader, propValues };