import React, { useState } from 'react';
import Panel from '../components/Panel';
import Alert from '../components/Alert';
import Button from '../components/Button';
import { propValues } from '../components/Alert/Alert';
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
   const [active, setActive] = useState('');
   const [fullWidth, setFullWidth] = useState(false);
   const [animate, setAnimate] = useState(true);
   const [filled, setFilled] = useState(false);
   const [fixed, setFixed] = useState(true);
   const [absolute, setAbsolute] = useState(true);
   const [textValue, setTextValue] = useState('Something happened');
   const classes = useStyles();
   const alertProps = {
      fullWidth,
      animate,
      filled,
      fixed,
      absolute
   };

   return (
      <div>
         <Settings
            onChange={{
               fullWidth: setFullWidth,
               animate: setAnimate,
               filled: setFilled,
               fixed: setFixed,
               absolute: setAbsolute,
               textValue: setTextValue
            }}
            values={{ fullWidth, animate, filled, fixed, absolute, textValue }}
            settingsData={{
               props: [
                  { name: 'fullWidth', type: 'bool' },
                  { name: 'animate', type: 'bool' },
                  { name: 'filled', type: 'bool' },
                  { name: 'fixed', type: 'bool' },
                  { name: 'absolute', type: 'bool' },
               ],
               variables: [
                  { name: 'textValue', type: 'text' },
               ]
            }} />
         {propValues.type.map(type => {
            console.log(type, active === type);
            return <Alert type={type} open={active === type} key={type} onClick={() => setActive('')} {...alertProps}>{textValue}</Alert>;
         })}
         <Panel className={classes.container}>
            {propValues.type.map(type =>
               <Button className={classes.button} key={type} type="transparent" onClick={() => setActive(type)}>{type}</Button>
            )}
         </Panel>
      </div>
   );
};


export default { name: 'Alert', component: Demo };