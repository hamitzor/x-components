import React, { useState } from 'react';
import Panel from '../components/Panel';
import Flex from '../components/Flex';
import Anchor from '../components/Anchor';
import { propValues } from '../components/Anchor/Anchor';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles({
   container: {
      display: 'flex',
   },
   anchor: {
      margin: 10
   }
});

const Demo = () => {
   const [disabled, setDisabled] = useState(false);
   const [textValue, setTextValue] = useState('Create a new account by clicking here.');
   const classes = useStyles();

   return (
      <div>
         <Settings
            onChange={{
               disabled: setDisabled,
               textValue: setTextValue,
            }}
            values={{ disabled, textValue }}
            settingsData={{
               props: [
                  { name: 'disabled', type: 'bool' },
               ],
               variables: [
                  { name: 'textValue', type: 'text' },
               ]
            }} />
         <Panel className={classes.container}>
            <Flex container direction="column">
               {propValues.color.map(color =>
                  <div key={color} >
                     <Anchor className={classes.anchor} disabled={disabled} color={color}>
                        <a href="#">{textValue}</a>
                     </Anchor>
                  </div>
               )}
            </Flex>
         </Panel>
      </div>
   );
};


export default { name: 'Anchor', component: Demo };