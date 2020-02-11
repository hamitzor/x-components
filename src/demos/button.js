import React from 'react';
import render from './render';
import Button from '../components/Button';
import { propValues } from '../components/Button/Button';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';
import { Icon } from '../index';
import { MdLock } from 'react-icons/md';

class ButtonDemosContainer extends React.Component {
   state = {
      color: 'primary',
      type: 'light',
      rounded: true,
      round: false,
      disabled: false,
      fullWidth: false,
      buttonText: 'hello',
      buttonFontSize: 16
   }
   render() {
      return <ButtonDemos {...this.state} onChange={data => this.setState(data)} />;
   }
}
const useStyles = createUseStyles({
   buttonContainer: {
      margin: 10
   }
});
const ButtonDemos = props => {
   const {
      color,
      type,
      rounded,
      round,
      disabled,
      fullWidth,
      onChange,
      buttonText,
      buttonFontSize
   } = props;
   const classes = useStyles();
   const buttonProps = {
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
            onChange={onChange}
            values={{ color, type, rounded, round, disabled, fullWidth, buttonText, buttonFontSize }}
            settingsData={{
               props: [
                  { propName: 'color', type: 'select', propValues: propValues.color },
                  { propName: 'type', type: 'select', propValues: propValues.type },
                  { propName: 'rounded', type: 'bool' },
                  { propName: 'round', type: 'bool' },
                  { propName: 'disabled', type: 'bool' },
                  { propName: 'fullWidth', type: 'bool' }
               ],
               variables: [
                  { variableName: 'buttonText', type: 'text' },
                  { variableName: 'buttonFontSize', type: 'number' }
               ]
            }} />
         <div className={classes.buttonContainer}>
            <Button {...buttonProps}>{buttonText}</Button>
         </div>
         <div className={classes.buttonContainer}>
            <Button {...buttonProps}>{buttonText}
               <Icon leftGap>
                  <MdLock style={{ fontSize: buttonFontSize }} />
               </Icon>
            </Button>
         </div>
         <div className={classes.buttonContainer}>
            <Button {...buttonProps}>
               <Icon rightGap>
                  <MdLock style={{ fontSize: buttonFontSize }} />
               </Icon>
               {buttonText}
            </Button>
         </div>
         <div className={classes.buttonContainer}>
            <Button {...buttonProps}>
               <Icon rightGap>
                  <MdLock style={{ fontSize: buttonFontSize }} />
               </Icon>
               {buttonText}
               <Icon leftGap>
                  <MdLock style={{ fontSize: buttonFontSize }} />
               </Icon>
            </Button>
         </div>
      </div>
   );
};


export default () => render(<ButtonDemosContainer />, 'app');