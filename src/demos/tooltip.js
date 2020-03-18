import React, { useState } from 'react';
import Button from '../components/Button';
import Panel from '../components/Panel';
import Tooltip from '../components/Tooltip';
import { propValues } from '../components/Tooltip/Tooltip';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles({
   container: {
      display: 'inline-block',
      margin: 15,
      padding: 50
   },
   button: {
      margin: '30px'
   }
});
const Demo = () => {
   const classes = useStyles();
   const [position, setPosition] = useState('bottom');
   const [text, setText] = useState('This is a tooltip');
   return (
      <div>
         <Settings
            onChange={{
               position: setPosition,
               text: setText
            }}
            values={{  position, text }}
            settingsData={{
               props: [
                  { name: 'position', type: 'select', values: propValues.position },
                  { name: 'text', type: 'text' },
               ],
               variables: []
            }} />
         <Panel className={classes.container}>
            <Tooltip key={position} position={position} text={text}>
               <Button className={classes.button} color="error" type="default">Hover me</Button>
            </Tooltip>
         </Panel>
      </div >
   );
};

export default { name: 'Tooltip', component: Demo };