import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const useStyles = createUseStyles(theme => ({
   root: {
      border: 'none',
      backgroundColor: 'transparent',
      minWidth: theme.unit * 40,
      width: '100%',
      height: ({ lineNumber }) => `calc( ( ${theme.fontSizes.normal}px + 3px ) * ${lineNumber} )`,
      padding: 0,
      color: ({ disabled }) => disabled ? theme.colors.lightgrey.normal : 'inherit',
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
   }
}));

const TextInput = props => {

   const inputRef = React.createRef();

   useEffect(() => {
      props.getInputRef(inputRef);
   });

   const {
      type,
      disabled,
      value,
      onChange,
      lineNumber,
      className,
      getInputRef,
      ...others
   } = props;

   const classes = useStyles(props);

   const combinedClasses = {
      root: classnames(classes.root, className)
   };

   return (
      lineNumber < 2 ?
         <input
            ref={inputRef}
            spellCheck={false}
            onChange={onChange}
            className={combinedClasses.root}
            disabled={disabled}
            type={type}
            value={value}
            {...others} /> :
         <textarea
            ref={inputRef}
            spellCheck={false}
            onChange={onChange}
            className={combinedClasses.root}
            disabled={disabled}
            value={value}
            {...others} />
   );
};

TextInput.propTypes = {
   type: PropTypes.oneOf(['password', 'text']),
   disabled: PropTypes.bool,
   className: PropTypes.string,
   value: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   lineNumber: PropTypes.number,
   getInputRef: PropTypes.func,
};

TextInput.defaultProps = {
   type: 'text',
   disabled: false,
   lineNumber: 1,
   getInputRef: () => { },
};

export { TextInput };