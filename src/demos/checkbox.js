import React, { useState } from 'react';
import Panel from '../components/Panel';
import Checkbox from '../components/Checkbox';
import { propValues } from '../components/Checkbox/Checkbox';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles(theme => ({
   container: {
      marginBottom: 15,
      display: 'flex',
   }
}));

const Demo = () => {
   const [color, setColor] = useState('primary');
   const [disabled, setDisabled] = useState(false);
   const [checked, setChecked] = useState([false, false, false, false]);
   const classes = useStyles();
   const controlProps = {
      color,
      disabled,
   };

   console.log(checked);
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
            {[0, 1, 2, 3].map(i =>
               <Checkbox
                  key={i}
                  onChange={e => {
                     if (!disabled)
                        setChecked(checked.map((val, index) => i === index ? e.target.checked : val));
                  }}
                  disabled={disabled}
                  color={color}
                  checked={checked[i]}
                  {...controlProps} />
            )}
         </Panel>
      </div>
   );
};


export default { name: 'Checkbox', component: Demo };