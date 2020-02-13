import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import TextInput from '../TextInput';

const resolveChildren = children => {
   const headExtensions = [], tailExtensions = [];
   let base = undefined;
   React.Children.forEach(children, (child, index) => {
      if (child)
         if (child.type === 'InputExtension')
            if (!base)
               headExtensions.push(<child.type key={index} {...child.props}></child.type>);
            else
               tailExtensions.push(<child.type key={index} {...child.props}></child.type>);
         else if (child.type === TextInput || child.type === 'Select' && !base)
            base = child;
   });
   return { headExtensions, tailExtensions, base };
};

const propValues = {
   color: ['darkgrey', 'primary', 'secondary', 'success', 'warning', 'error']
};

const useStyles = createUseStyles(theme => ({
   input: {
      display: 'inline-block',
      color: theme.textColors.normal,
      cursor: props => resolveChildren(props.children).base.type !== TextInput ? 'pointer' : 'text',
      width: ({ fullWidth }) => fullWidth && '100%'
   },
   container: {
      outline: 'none',
   },
   disabled: {
      pointerEvents: 'none',
      color: `${theme.colors[theme.decide('grey', 'lightgrey')].normal}!important`
   },
   disabledLabel: {
      color: `${theme.colors[theme.decide('grey', 'lightgrey')].normal}!important`
   },
   disabledDesc: {
      color: `${theme.colors[theme.decide('grey', 'lightgrey')].normal}!important`
   },
   disabledFieldset: {
      borderColor: `${theme.colors[theme.decide('grey', 'lightgrey')].normal}!important`
   },
   fieldset: {
      padding: '4px 8px 8px 8px',
      borderRadius: 4,
      border: `2px solid ${theme.colors.lightgrey[theme.decide('darker', 'normal')]}`,
      transition: theme.transition(['border']),
      '&:hover:not(:focus-within):not(.actLikeFocused)': {
         borderColor: theme.colors.lightgrey[theme.decide('normal', 'darker')],
      },
      '&:focus-within, &.actLikeFocused $label': {
         fontSize: theme.fontSizes.normal - 2
      }
   },
   legend: {
      padding: 0,
      color: 'transparent',
      transition: theme.transition(['padding', 'width']),
      fontSize: theme.fontSizes.normal - 2,
      '& span': {
         textOverflow: 'ellipsis',
         whiteSpace: 'nowrap',
         overflow: 'hidden'
      }
   },
   onlyBottomBorder: {
      border: 'none',
      borderRadius: 0,
      paddingRight: 2,
      paddingLeft: 2,
      paddingBottom: 3,
      borderBottom: `2px solid ${theme.colors.lightgrey[theme.decide('darker', 'normal')]}`,
      '&:hover:not(:focus-within):not(.actLikeFocused)': {
         borderBottomColor: theme.colors.lightgrey[theme.decide('normal', 'darker')],
      }
   },
   ...propValues.color.reduce((acc, color) => ({
      ...acc,
      [`${color}Fieldset`]: {
         '&:focus-within, &.actLikeFocused': {
            borderColor: theme.colors[color][theme.decide('light', 'normal')],
            '& $label, & $headExtension, & $tailExtension': {
               color: theme.colors[color][theme.decide('light', 'normal')]
            }
         }
      }
   }), {}),
   label: {
      position: 'absolute',
      zIndex: 0,
      whiteSpace: 'nowrap',
      transition: theme.transition(['opacity', 'color', 'font-size', 'transform']),
      overflow: 'hidden',
      textOverflow: 'ellipsis',
   },
   desc: {
      display: 'inline-block',
      float: 'left',
      color: theme.colors.grey[theme.decide('light', 'dark')],
      margin: `${theme.unit / 5 * 3}px ${theme.unit * 2}px 0px ${theme.unit}px`,
      textAlign: 'left',
      fontSize: theme.fontSizes.normal - 3
   },
   error: {
      display: 'inline-block',
      float: 'right',
      color: theme.colors.error[theme.decide('light', 'normal')],
      margin: `${theme.unit / 5 * 3}px ${theme.unit}px 0px ${theme.unit * 2}px`,
      textAlign: 'right',
      fontSize: theme.fontSizes.normal - 3
   },
   controlContainer: {
      display: 'flex',
      alignItems: 'center'
   },
   base: {
      flex: 1,
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
   },
   extension: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transition(['color']),
      fontSize: theme.fontSizes.normal + 2
   },
   headExtension: {
      marginLeft: 3,
      marginRight: 8
   },
   tailExtension: {
      marginLeft: 8,
      marginRight: 3
   }
}));

const Input = props => {
   const [ready, setReady] = useState(false),
      [calculatedLegendWidth, setCalculatedLegendWidth] = useState(0),
      [transformData, setTransformData] = useState([0, 0]),
      [focused, setFocused] = useState(false),
      legendRef = React.createRef(),
      labelRef = React.createRef();
   let inputRef;

   const computeTransformData = () => {
      const labelRect = labelRef.current.getBoundingClientRect();
      const legendRect = legendRef.current.getBoundingClientRect();
      const x = 3 - (labelRect.left - legendRect.left) - (props.simple ? 3 : 0);
      const y = legendRect.top - labelRect.top - (resolveChildren(props.children).base.type !== TextInput ? 12.5 : 2);
      return [x, y];
   };

   useEffect(() => {
      setReady(true);
      setCalculatedLegendWidth(legendRef.current.offsetWidth);
      setTransformData(computeTransformData());
   }, []);

   useEffect(() => {
      if (focused)
         inputRef.current.focus();
   }, [focused]);

   const {
      children,
      simple,
      color,
      fullWidth,
      label,
      desc,
      error,
      errorMessage,
      className,
      ...others
   } = props;

   const classes = useStyles(props),
      { headExtensions, tailExtensions, base } = resolveChildren(children),
      determinedColor = error ? 'error' : color,
      actLikeFocused = error || (typeof base.props.value === 'number' ? true : base.props.value.length > 0),
      combinedClasses = {
         input: classnames('XInput', classes.input, { [classes.disabled]: base.props.disabled }, className),
         fieldset: classnames(classes.fieldset, classes[`${determinedColor}Fieldset`], {
            [classes.onlyBottomBorder]: simple,
            'actLikeFocused': actLikeFocused,
            [classes.disabledFieldset]: base.props.disabled
         }, 'captureClick'),
         headExtension: classnames(classes.extension, classes.headExtension),
         label: classnames(classes.label, { [classes.disabledLabel]: base.props.disabled }),
         tailExtension: classnames(classes.extension, classes.tailExtension),
         desc: classnames(classes.desc, { [classes.disabledDesc]: base.props.disabled }),
      };

   return (
      <div
         className={combinedClasses.input} {...others}>
         <div
            tabIndex="0"
            className={classes.container}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClick={e => base.type !== TextInput && e.target.className.includes('captureClick') && inputRef.current.childNodes[0].click()}>
            <fieldset
               className={combinedClasses.fieldset}>
               <legend
                  ref={legendRef}
                  className={classes.legend}
                  style={ready ? (actLikeFocused || focused ? { width: calculatedLegendWidth + 6 } : { width: 0 }) : {}}>
                  <span>{label}</span>
               </legend>
               <div
                  className={classes.controlContainer}>
                  {headExtensions.length > 0 &&
                     <div
                        className={combinedClasses.headExtension}>
                        {headExtensions}
                     </div>}
                  <div
                     className={classes.base}>
                     <div
                        ref={labelRef}
                        className={combinedClasses.label}
                        style={{ transform: actLikeFocused || focused ? `translate(${transformData[0]}px, ${transformData[1]}px)` : '' }}>
                        {label}
                     </div>
                     <base.type
                        {...base.props}
                        color={base.type !== TextInput ? (base.props.disabled ? 'grey' : determinedColor) : undefined}
                        getInputRef={ref => { inputRef = ref; }} />
                  </div>
                  {tailExtensions.length > 0 &&
                     <div
                        className={combinedClasses.tailExtension}>
                        {tailExtensions}
                     </div>}
               </div>
            </fieldset>
         </div>
         {!error && desc &&
            <span
               className={combinedClasses.desc}>
               {desc}
            </span>}
         {error &&
            <span
               className={classes.error}>
               {errorMessage}
            </span>}
      </div>
   );
};

Input.propTypes = {
   children: childrenValidator([
      { type: TextInput, max: 1 },
      { type: 'Select', max: 1 },
      { type: 'InputExtension' }
   ]),
   simple: PropTypes.bool,
   color: PropTypes.oneOf(propValues.color),
   fullWidth: PropTypes.bool,
   label: PropTypes.string.isRequired,
   desc: PropTypes.string,
   error: PropTypes.bool,
   errorMessage: PropTypes.string,
   className: PropTypes.string,
};

Input.defaultProps = {
   simple: false,
   color: 'primary',
   fullWidth: false,
   desc: '',
   error: false,
   errorMessage: '',
   className: ''
};

export { Input, propValues };