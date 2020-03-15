import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import TextInput from '../TextInput';
import Select from '../Select';
import InputExtension from '../InputExtension';

const resolveChildren = children => {
   const headExtensions = [], tailExtensions = [];
   let base = undefined;
   React.Children.forEach(children, (child, index) => {
      if (child)
         if (child.type === InputExtension)
            if (!base)
               headExtensions.push(<child.type key={index} {...child.props}></child.type>);
            else
               tailExtensions.push(<child.type key={index} {...child.props}></child.type>);
         else if (child.type === TextInput || child.type === Select && !base)
            base = child;
   });
   return { headExtensions, tailExtensions, base };
};

const propValues = {
   color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error']
};

const useStyles = createUseStyles(theme => ({
   input: {
      display: 'inline-block',
      color: theme.textColors.normal,
      cursor: ({ children }) => resolveChildren(children).base.type !== TextInput ? 'pointer' : 'text',
      width: ({ fullWidth }) => fullWidth && '100%'
   },
   container: {
      outline: 'none',
   },
   disabled: {
      pointerEvents: 'none',
      color: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}!important`
   },
   disabledLabel: {
      color: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}!important`
   },
   disabledDesc: {
      color: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}!important`
   },
   disabledFieldset: {
      borderColor: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}!important`
   },
   fieldset: {
      padding: '0 8px 4px 8px',
      borderRadius: 4,
      border: `2px solid ${theme.colors.lightgrey[theme.darkOrLight('darker', 'normal')]}`,
      transition: theme.transition(['border']),
      borderColor: ({ focused }) => !focused && theme.colors.lightgrey[theme.darkOrLight('normal', 'darker')],
      '& $label': {
         fontSize: ({ focused }) => focused && theme.fontSizes.normal - 2
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
      paddingBottom: 0,
      paddingLeft: 2,
      borderBottom: `2px solid ${theme.colors.lightgrey[theme.darkOrLight('darker', 'normal')]}`,
      borderColor: ({ focused }) => !focused && theme.colors.lightgrey[theme.darkOrLight('normal', 'darker')],
   },
   ...propValues.color.reduce((acc, color) => ({
      ...acc,
      [`${color}Fieldset`]: {
         borderColor: ({ focused }) => focused && theme.colors[color][theme.darkOrLight('light', 'normal')],
         '& $label, & $headExtension, & $tailExtension': {
            color: ({ focused }) => focused && theme.colors[color][theme.darkOrLight('light', 'normal')]
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
      color: theme.colors.grey[theme.darkOrLight('light', 'dark')],
      margin: `${theme.unit / 5 * 3}px ${theme.unit * 2}px 0px ${theme.unit}px`,
      textAlign: 'left',
      fontSize: theme.fontSizes.normal - 3
   },
   error: {
      display: 'inline-block',
      float: 'right',
      color: theme.colors.error[theme.darkOrLight('light', 'normal')],
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
      display: 'flex',
      alignItems: 'center',
      padding: '7px 0'
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

const Input = React.forwardRef((props, ref) => {
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
   const [ready, setReady] = useState(false);
   const [calculatedLegendWidth, setCalculatedLegendWidth] = useState(0);
   const [transformData, setTransformData] = useState([0, 0]);
   const [focused, setFocused] = useState(false);
   const legendRef = React.createRef();
   const labelRef = React.createRef();
   const baseRef = React.createRef();
   const { headExtensions, tailExtensions, base } = resolveChildren(children);
   const determinedColor = error ? 'error' : color;
   const actLikeFocused = error || (typeof base.props.value === 'number' ? true : base.props.value.length > 0);
   const classes = useStyles({ ...props, focused: focused || actLikeFocused });
   const computeTransformData = () => {
      const x = legendRef.current.offsetLeft - labelRef.current.offsetLeft + 3;
      const y = legendRef.current.offsetTop - labelRef.current.offsetTop - 1;
      return [x, y];
   };

   useEffect(() => {
      setReady(true);
      setCalculatedLegendWidth(legendRef.current.offsetWidth);
      setTransformData(computeTransformData());
   }, []);

   useEffect(() => {
      if (focused)
         baseRef.current.focus();
   }, [focused]);

   return (
      <div ref={ref} className={classnames(classes.input, { [classes.disabled]: base.props.disabled }, className)} {...others}>
         <div
            tabIndex="0"
            className={classes.container}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClick={e => base.type !== TextInput && baseRef.current.childNodes[0].click()}>
            <fieldset
               className={classnames(
                  classes.fieldset,
                  classes[`${determinedColor}Fieldset`],
                  {
                     [classes.onlyBottomBorder]: simple,
                     [classes.disabledFieldset]: base.props.disabled
                  })}>
               <legend
                  ref={legendRef}
                  className={classes.legend}
                  style={ready ? (actLikeFocused || focused ? { width: calculatedLegendWidth + 6 } : { width: 0 }) : {}}>
                  <span>{label}</span>
               </legend>
               <div className={classes.controlContainer}>
                  {headExtensions.length > 0 &&
                     <div className={classnames(classes.extension, classes.headExtension)}>
                        {headExtensions}
                     </div>}
                  <div className={classes.base}>
                     <div
                        ref={labelRef}
                        className={classnames(classes.label, { [classes.disabledLabel]: base.props.disabled })}
                        style={{ transform: actLikeFocused || focused ? `translate(${transformData[0]}px, ${transformData[1]}px)` : '' }}>
                        {label}
                     </div>
                     {React.cloneElement(base, {
                        ref: baseRef,
                        onChange: e => {
                           if (e.target.value === '')
                              setFocused(false);
                           base.props.onChange(e);
                        }
                     })}
                  </div>
                  {tailExtensions.length > 0 &&
                     <div className={classnames(classes.extension, classes.tailExtension)}>
                        {tailExtensions}
                     </div>}
               </div>
            </fieldset>
         </div>
         {!error && desc &&
            <span className={classnames(classes.desc, { [classes.disabledDesc]: base.props.disabled })}>
               {desc}
            </span>}
         {error &&
            <span className={classes.error}>
               {errorMessage}
            </span>}
      </div>
   );
});

Input.propTypes = {
   children: childrenValidator([
      { type: TextInput, max: 1 },
      { type: Select, max: 1 },
      { type: InputExtension }
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