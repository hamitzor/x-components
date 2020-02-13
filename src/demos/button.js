import React, { useState } from 'react';
import render from './render';
import Button from '../components/Button';
import Panel from '../components/Panel';
import { propValues } from '../components/Button/Button';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';
import { Icon } from '../index';
import { MdLock, MdAccountBalance } from 'react-icons/md';

const useStyles = createUseStyles({
   buttonsContainer: {
      margin: 20,
      display: 'flex',
      alignItems: 'center'
   },
   button: {
      marginRight: 20
   }
});

const Demo = () => {

   const [color, setColor] = useState('primary'),
      [type, setType] = useState('default'),
      [rounded, setRounded] = useState(true),
      [round, setRound] = useState(false),
      [disabled, setDisabled] = useState(false),
      [fullWidth, setFullWidth] = useState(false),
      [buttonText, setButtonText] = useState('Login'),
      [buttonFontSize, setButtonFontSize] = useState(14),
      classes = useStyles(),
      buttonProps = {
         color,
         type,
         rounded,
         round,
         disabled,
         fullWidth,
         style: { fontSize: buttonFontSize }
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
               buttonFontSize: setButtonFontSize
            }}
            values={{ color, type, rounded, round, disabled, fullWidth, buttonText, buttonFontSize }}
            settingsData={{
               props: [
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'type', type: 'select', values: propValues.type },
                  { name: 'rounded', type: 'bool' },
                  { name: 'round', type: 'bool' },
                  { name: 'disabled', type: 'bool' },
                  { name: 'fullWidth', type: 'bool' }
               ],
               variables: [
                  { name: 'buttonText', type: 'text' },
                  { name: 'buttonFontSize', type: 'number' }
               ]
            }} />
         <Panel
            className={classes.buttonsContainer}>
            <Button
               className={classes.button}
               {...buttonProps}>
               {buttonText}
            </Button>
            <Button
               className={classes.button}
               {...buttonProps}>
               {buttonText}
               <Icon
                  leftGap>
                  <MdLock
                     style={{ fontSize: buttonFontSize }} />
               </Icon>
            </Button>
            <Button
               className={classes.button}
               {...buttonProps}>
               <Icon
                  rightGap>
                  <MdLock
                     style={{ fontSize: buttonFontSize }} />
               </Icon>
               {buttonText}
            </Button>
            <Button
               className={classes.button}
               {...buttonProps}>
               <Icon
                  rightGap>
                  <MdLock
                     style={{ fontSize: buttonFontSize }} />
               </Icon>
               {buttonText}
               <Icon
                  leftGap>
                  <MdLock
                     style={{ fontSize: buttonFontSize }} />
               </Icon>
            </Button>
            <Button
               iconButton
               className={classes.button}
               {...buttonProps}>
               <Icon>
                  <MdAccountBalance
                     style={{ fontSize: buttonFontSize }} />
               </Icon>
            </Button>
         </Panel>
      </div>
   );
};


export default () => render(<Demo />, 'app');