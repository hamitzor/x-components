import React, { useState } from 'react';
import Panel from '../components/Panel';
import Flex from '../components/Flex';
import Link from '../components/Link';
import { propValues } from '../components/Link/Link';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles({
   container: {
      display: 'flex',
   },
   link: {
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
                     <Link className={classes.link} disabled={disabled} color={color}>
                        <a href="#">{textValue}</a>
                     </Link>
                  </div>
               )}
            </Flex>
         </Panel>
      </div>
   );
};


export default { name: 'Link', component: Demo };