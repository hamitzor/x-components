import React, { useState } from 'react';
import Input from '../components/Input';
import Panel from '../components/Panel';
import Tooltip from '../components/Tooltip';
import { propValues } from '../components/Input/Input';
import Settings from './Settings';
import TextInput from '../components/TextInput';
import InputExtension from '../components/InputExtension';
import Icon from '../components/Icon';
import Button from '../components/Button';
import { FaChessKnight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdVpnKey } from 'react-icons/md';

const Demo = () => {
   const [simple, setSimple] = useState(false);
   const [color, setColor] = useState('primary');
   const [fullWidth, setFullWidth] = useState(false);
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [textValue, setTextValue] = useState('');
   const [disabled, setDisabled] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

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
         <Panel>
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
                     <Button onClick={() => setShowPassword(!showPassword)} color="grey" round disabled={disabled} iconButton type="transparent">
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
               <TextInput disabled={disabled} value={textValue} onChange={e => setTextValue(e.target.value)} />
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
               <TextInput disabled={disabled} lineNumber={4} value={textValue} onChange={e => setTextValue(e.target.value)} />
            </Input>
         </Panel>
      </div>
   );
};

export default { name: 'InputExtension', component: Demo };