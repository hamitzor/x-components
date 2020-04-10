import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const useStyles = createUseStyles(theme => ({
   textInput: {
      border: 'none',
      backgroundColor: 'transparent',
      minWidth: theme.unit * 40,
      width: '100%',
      height: ({ lineNumber }) => `calc( ( ${theme.fontSizes.normal}px + 3px ) * ${lineNumber} )`,
      padding: 0,
      color: 'inherit',
      fontFamily: 'inherit',
      fontSize: theme.fontSizes.normal,
      resize: 'none',
      lineHeight: `calc( ( ${theme.fontSizes.normal}px + 3px ) )`,
      '&:-webkit-autofill,&:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
         '-webkit-transition': 'color 99999s ease-out, background-color 99999s ease-out',
         '-webkit-transition-delay': '99999s'
      },
      '&:focus': {
         outline: 'none'
      }
   },
   disabled: {
      color: theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark
   }
}));

const TextInput = React.forwardRef((props, ref) => {
   const { type, disabled, value, onChange, lineNumber, className, ...others } = props;
   const classes = useStyles({ lineNumber });

   return lineNumber < 2 ?
      <input
         ref={ref}
         spellCheck={false}
         onChange={onChange}
         className={classnames(classes.textInput, { [classes.disabled]: disabled }, className)}
         disabled={disabled}
         type={type}
         value={value}
         {...others} /> :
      <textarea
         ref={ref}
         spellCheck={false}
         onChange={onChange}
         className={classnames(classes.textInput, { [classes.disabled]: disabled }, className)}
         disabled={disabled}
         value={value}
         {...others} />;
});

TextInput.propTypes = {
   type: PropTypes.oneOf(['password', 'text']),
   disabled: PropTypes.bool,
   className: PropTypes.string,
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   lineNumber: PropTypes.number,
};

TextInput.defaultProps = {
   type: 'text',
   disabled: false,
   lineNumber: 1,
};

export { TextInput };