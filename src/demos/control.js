import React, { useState } from 'react';
import Panel from '../components/Panel';
import Flex from '../components/Flex';
import Control from '../components/Control';
import { propValues } from '../components/Control/Control';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles(theme => ({
   container: {
      marginBottom: 15,
      display: 'flex',
   },
   control: {
      marginRight: 10,
      cursor: 'pointer'
   },
   label: {
      padding: 10,
      color: theme.textColors.normal
   }
}));

const Demo = () => {
   const [color, setColor] = useState('primary');
   const [disabled, setDisabled] = useState(false);
   const [radioValue, setRadioValue] = useState('Car');
   const [checkboxValue, setCheckboxValue] = useState(false);
   const classes = useStyles();
   const controlProps = {
      color,
      disabled,
   };

   return (
      <div>
         <Settings
            onChange={{
               color: setColor,
               disabled: setDisabled
            }}
            values={{ color, disabled }}
            settingsData={{
               props: [
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'disabled', type: 'bool' }
               ],
               variables: []
            }} />
         <Panel className={classes.container}>
            {['Car', 'Airplane', 'Heli', 'On Foot'].map(val =>
               <Flex key={val} container alignItems="center" className={classes.control} onClick={() => !disabled && setRadioValue(val)} >
                  <Control kind="radio" color={color} checked={val === radioValue} {...controlProps} />
                  <div className={classes.label}>{val}</div>
               </Flex>
            )}
         </Panel>
         <Panel className={classes.container}>
            <Flex container alignItems="center" className={classes.control} onClick={() => !disabled && setCheckboxValue(!checkboxValue)} >
               <Control kind="checkbox" color={color} checked={checkboxValue} {...controlProps} />
               <div className={classes.label}>Remember Me</div>
            </Flex>
         </Panel>
      </div>
   );
};


export default { name: 'Control', component: Demo };