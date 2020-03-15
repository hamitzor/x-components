import React, { useState } from 'react';
import Button from '../components/Button';
import Panel from '../components/Panel';
import { propValues } from '../components/Button/Button';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';
import { Icon } from '../index';
import { MdLock, MdAccountBalance } from 'react-icons/md';

const useStyles = createUseStyles({
   buttonsContainer: {
      margin: 15,
      display: 'flex',
      alignItems: 'center'
   },
   button: {
      marginRight: 20
   }
});

const Demo = () => {
   const [color, setColor] = useState('primary');
   const [type, setType] = useState('filled');
   const [rounded, setRounded] = useState(true);
   const [round, setRound] = useState(false);
   const [disabled, setDisabled] = useState(false);
   const [fullWidth, setFullWidth] = useState(false);
   const [buttonText, setButtonText] = useState('Login');
   const [justify, setJustify] = useState('center');
   const classes = useStyles();
   const buttonProps = {
      color,
      type,
      rounded,
      round,
      disabled,
      fullWidth,
      justify,
   };

   return (
      <div>
         <Settings
            onChange={{
               color: setColor,
               type: setType,
               rounded: setRounded,
               round: setRound,
               disabled: setDisabled,
               fullWidth: setFullWidth,
               buttonText: setButtonText,
               justify: setJustify
            }}
            values={{ color, type, rounded, round, disabled, fullWidth, buttonText, justify }}
            settingsData={{
               props: [
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'type', type: 'select', values: propValues.type },
                  { name: 'rounded', type: 'bool' },
                  { name: 'round', type: 'bool' },
                  { name: 'disabled', type: 'bool' },
                  { name: 'fullWidth', type: 'bool' },
                  { name: 'justify', type: 'select', values: propValues.justify }
               ],
               variables: [
                  { name: 'buttonText', type: 'text' },
               ]
            }} />
         <Panel className={classes.buttonsContainer}>
            <Button className={classes.button} {...buttonProps}>
               {buttonText}
            </Button>
            <Button className={classes.button} {...buttonProps}>
               {buttonText}
               <Icon leftGap>
                  <MdLock />
               </Icon>
            </Button>
            <Button className={classes.button} {...buttonProps}>
               <Icon rightGap>
                  <MdLock />
               </Icon>
               {buttonText}
            </Button>
            <Button className={classes.button} {...buttonProps}>
               <Icon rightGap>
                  <MdLock />
               </Icon>
               {buttonText}
               <Icon leftGap>
                  <MdLock />
               </Icon>
            </Button>
            <Button iconButton className={classes.button} {...buttonProps}>
               <Icon>
                  <MdAccountBalance />
               </Icon>
            </Button>
         </Panel>
      </div>
   );
};


export default { name: 'Button', component: Demo };