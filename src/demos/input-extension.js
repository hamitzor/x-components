import React, { useState } from 'react';
import Input from '../components/Input';
import Panel from '../components/Panel';
import Tooltip from '../components/Tooltip';
import { propValues } from '../components/Input/Input';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';
import TextInput from '../components/TextInput';
import InputExtension from '../components/InputExtension';
import Icon from '../components/Icon';
import Button from '../components/Button';
import { FaChessKnight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdVpnKey } from 'react-icons/md';

const useStyles = createUseStyles({
   inputContainer: {
      '& .XInput': {
         marginRight: 40,
         marginBottom: 40
      }
   }
});
const Demo = () => {
   const [simple, setSimple] = useState(false),
      [color, setColor] = useState('primary'),
      [fullWidth, setFullWidth] = useState(false),
      [error, setError] = useState(false),
      [errorMessage, setErrorMessage] = useState(''),
      [textValue, setTextValue] = useState(''),
      [disabled, setDisabled] = useState(false),
      [showPassword, setShowPassword] = useState(false),
      classes = useStyles();

   return (
      <div>
         <Settings
            onChange={{
               simple: setSimple,
               color: setColor,
               fullWidth: setFullWidth,
               error: setError,
               errorMessage: setErrorMessage,
               disabled: setDisabled,
            }}
            values={{ simple, color, fullWidth, error, errorMessage, disabled }}
            settingsData={{
               props: [
                  { name: 'simple', type: 'bool' },
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'fullWidth', type: 'bool' },
                  { name: 'error', type: 'bool' },
                  { name: 'errorMessage', type: 'text' },
                  { name: 'disabled', type: 'bool' },
               ],
               variables: []
            }} />
         <Panel
            className={classes.inputContainer}>
            <Input
               simple={simple}
               color={color}
               fullWidth={fullWidth}
               error={error}
               errorMessage={errorMessage}
               desc="Enter your account's password"
               label="Password">
               <InputExtension>
                  <Icon>
                     <MdVpnKey />
                  </Icon>
               </InputExtension>
               <TextInput
                  type={showPassword ? 'text' : 'password'}
                  disabled={disabled}
                  value={textValue}
                  onChange={e => setTextValue(e.target.value)} />
               <InputExtension>
                  <Tooltip text="Hide/Show Password">
                     <Button
                        onClick={() => setShowPassword(!showPassword)}
                        color="grey"
                        round
                        disabled={disabled}
                        iconButton
                        type="transparent">
                        <Icon>
                           {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Icon>
                     </Button>
                  </Tooltip>
               </InputExtension>
            </Input>
            <Input
               simple={simple}
               color={color}
               fullWidth={fullWidth}
               error={error}
               errorMessage={errorMessage}
               desc="Activities you enjoy while doing"
               label="Hobbies">
               <InputExtension>
                  <Icon>
                     <FaChessKnight />
                  </Icon>
               </InputExtension>
               <TextInput
                  disabled={disabled}
                  value={textValue}
                  onChange={e => setTextValue(e.target.value)} />
            </Input>
            <Input
               simple={simple}
               color={color}
               fullWidth={fullWidth}
               error={error}
               errorMessage={errorMessage}
               desc="Activities you enjoy while doing"
               label="Hobbies">
               <InputExtension>
                  <Icon>
                     <FaChessKnight />
                  </Icon>
               </InputExtension>
               <TextInput
                  disabled={disabled}
                  lineNumber={4}
                  value={textValue}
                  onChange={e => setTextValue(e.target.value)} />
            </Input>
         </Panel>
      </div>
   );
};

export default { name: 'InputExtension', component: Demo };