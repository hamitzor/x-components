import React, { useState } from 'react';
import Panel from '../components/Panel';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { propValues } from '../components/Badge/Badge';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles({
   container: {
      display: 'flex',
   },
   button: {
      marginRight: 5
   }
});

const Demo = () => {
   const [value, setValue] = useState('0');
   const [maxValue, setMaxValue] = useState(10);
   const [color, setColor] = useState('primary');
   const classes = useStyles();
   const alertProps = {
      value,
      maxValue,
      color
   };

   const badge = <Badge {...alertProps}></Badge>;

   return (
      <div>
         <Settings
            onChange={{
               value: setValue,
               maxValue: setMaxValue,
               color: setColor
            }}
            values={{ value, maxValue, color }}
            settingsData={{
               props: [
                  { name: 'value', type: 'text' },
                  { name: 'maxValue', type: 'number' },
                  { name: 'color', type: 'select', values: propValues.color }
               ],
               variables: []
            }} />
         <Panel className={classes.container}>
            <Button badge={badge} className={classes.button} type="default">News</Button>
         </Panel>
      </div>
   );
};


export default { name: 'Badge', component: Demo };