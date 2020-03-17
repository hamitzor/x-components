import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import TextInput from '../TextInput';
import Select from '../Select';
import InputExtension from '../InputExtension';

const propValues = {
   color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error']
};

const useStyles = createUseStyles(theme => ({
   input: {
      display: 'inline-block',
      color: theme.textColors.normal,
      cursor: 'text',
   },
   pointer: {
      cursor: 'pointer'
   },
   fullWidth: {
      width: '100%'
   },
   container: {
      outline: 'none',
   },
   fieldset: {
      padding: '0 8px 4px 8px',
      borderRadius: 4,
      border: `2px solid ${theme.colors.lightgrey[theme.darkOrLight('darker', 'normal')]}`,
      transition: theme.transition(['border']),
      borderColor: theme.colors.lightgrey[theme.darkOrLight('normal', 'darker')],
   },
   simpleFieldset: {
      border: 'none',
      borderRadius: 0,
      paddingRight: 2,
      paddingBottom: 0,
      paddingLeft: 2,
      borderBottom: `2px solid ${theme.colors.lightgrey[theme.darkOrLight('darker', 'normal')]}`,
   },
   simpleFieldsetUnfocused: {
      borderColor: theme.colors.lightgrey[theme.darkOrLight('normal', 'darker')],
   },
   ...propValues.color.reduce((acc, color) => ({
      ...acc,
      [`${color}FieldsetFocused`]: {
         borderColor: theme.colors[color][theme.darkOrLight('light', 'normal')],
         '& $label, & $headExtension, & $tailExtension': {
            color: theme.colors[color][theme.darkOrLight('light', 'normal')]
         }
      }
   }), {}),
   disabledFieldset: {
      borderColor: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}`
   },
   fieldsetFocused: {
      '& $label': {
         fontSize: theme.fontSizes.normal - 2,
         transform: ({ transformData }) => `translate(${transformData[0]}px, ${transformData[1]}px)`
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
   legendFocused: {
      width: ({ calculatedLegendWidth }) => calculatedLegendWidth + 6
   },
   legendUnfocused: {
      width: 0
   },
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
   disabledDesc: {
      color: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}`
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
   },
   disabled: {
      pointerEvents: 'none',
      '& $label, & $headExtension, & $tailExtension': {
         color: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}`
      }
   },
}));

const Input = React.forwardRef((props, ref) => {
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
   const actLikeFocused = (error || (typeof base.props.value === 'number' ? true : base.props.value.length > 0)) || focused;
   const childrenType = base.type;
   const classes = useStyles({ calculatedLegendWidth, transformData });

   const computeTransformData = () => {
      const x = legendRef.current.offsetLeft - labelRef.current.offsetLeft + 3;
      const y = legendRef.current.offsetTop - labelRef.current.offsetTop - 1;
      return [x, y];
   };

   useEffect(() => {
      setCalculatedLegendWidth(legendRef.current.offsetWidth);
      setTransformData(computeTransformData());
      setReady(true);
   }, []);

   useEffect(() => {
      if (focused)
         baseRef.current.focus();
   }, [focused]);

   return (
      <div
         ref={ref}
         className={classnames(
            classes.input,
            {
               [classes.disabled]: base.props.disabled,
               [classes.pointer]: childrenType === Select,
               [classes.fullWidth]: fullWidth
            },
            className)}
         {...others}>
         <div
            tabIndex="0"
            className={classes.container}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClick={e => childrenType === Select && !e.target.classList.contains('SelectMenuCover') && baseRef.current.childNodes[0].click()}>
            <fieldset
               className={classnames(
                  classes.fieldset,
                  {
                     [classes[`${determinedColor}FieldsetFocused`]]: actLikeFocused,
                     [classes.simpleFieldset]: simple,
                     [classes.simpleFieldsetUnfocused]: simple && !actLikeFocused,
                     [classes.disabledFieldset]: base.props.disabled,
                     [classes.fieldsetFocused]: actLikeFocused,
                  }
               )}>
               <legend
                  ref={legendRef}
                  className={classnames(
                     classes.legend,
                     {
                        [classes.legendFocused]: ready && actLikeFocused,
                        [classes.legendUnfocused]: ready && !actLikeFocused
                     }
                  )}>
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
                        className={classnames(
                           classes.label,
                           {
                              [classes.labelFocused]: actLikeFocused
                           }
                        )}>
                        {label}
                     </div>
                     {React.cloneElement(base, { ref: baseRef })}
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