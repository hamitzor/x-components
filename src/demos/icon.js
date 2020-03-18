import React, { useState } from 'react';
import Icon from '../components/Icon';
import Panel from '../components/Panel';
import { MdNotifications } from 'react-icons/md';
import { propValues } from '../components/Icon/Icon';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles({
   container: {
      display: 'inline-block',
      margin: 15,
   }
});
const Demo = () => {
   const [color, setColor] = useState('primary');
   const [size, setSize] = useState(100);
   const classes = useStyles();

   return (
      <div>
         <Settings
            onChange={{
               color: setColor,
               size: setSize
            }}
            values={{ color, size }}
            settingsData={{
               props: [
                  { name: 'color', type: 'select', values: propValues.color },
               ],
               variables: [
                  { name: 'size', type: 'number' }
               ]
            }} />
         <Panel className={classes.container}>
            <Icon color={color}>
               <MdNotifications style={{ fontSize: size }} />
            </Icon>
         </Panel>
      </div>
   );
};

export default { name: 'Icon', component: Demo };