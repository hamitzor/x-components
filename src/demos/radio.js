import React, { useState } from 'react';
import Panel from '../components/Panel';
import Radio from '../components/Radio';
import { propValues } from '../components/Radio/Radio';
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
   const [value, setValue] = useState(false);
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
            <Radio onChange={e => setValue(e.target.value)} disabled={disabled} color={color} value='a' checked={value === 'a'} {...controlProps} />
            <Radio onChange={e => setValue(e.target.value)} disabled={disabled} color={color} value='b' checked={value === 'b'} {...controlProps} />
            <Radio onChange={e => setValue(e.target.value)} disabled={disabled} color={color} value='c' checked={value === 'c'} {...controlProps} />
            <Radio onChange={e => setValue(e.target.value)} disabled={disabled} color={color} value='d' checked={value === 'd'} {...controlProps} />
         </Panel>
      </div>
   );
};


export default { name: 'Radio', component: Demo };