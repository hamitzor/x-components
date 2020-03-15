import React, { useState } from 'react';
import Input from '../components/Input';
import Panel from '../components/Panel';
import { propValues } from '../components/Input/Input';
import Settings from './Settings';
import TextInput from '../components/TextInput';

const Demo = () => {
   const [simple, setSimple] = useState(false);
   const [color, setColor] = useState('primary');
   const [fullWidth, setFullWidth] = useState(false);
   const [desc, setDesc] = useState('Activities you enjoy the most');
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [textValue, setTextValue] = useState('');
   const [disabled, setDisabled] = useState(false);

   return (
      <div>
         <Settings
            onChange={{
               simple: setSimple,
               color: setColor,
               fullWidth: setFullWidth,
               desc: setDesc,
               error: setError,
               errorMessage: setErrorMessage,
               disabled: setDisabled
            }}
            values={{ simple, color, fullWidth, desc, error, errorMessage, disabled }}
            settingsData={{
               props: [
                  { name: 'simple', type: 'bool' },
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'fullWidth', type: 'bool' },
                  { name: 'desc', type: 'text' },
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
               desc={desc}
               error={error}
               errorMessage={errorMessage}
               label="Hobbies">
               <TextInput
                  disabled={disabled}
                  value={textValue}
                  onChange={e => setTextValue(e.target.value)} />
            </Input>
            <Input
               simple={simple}
               color={color}
               fullWidth={fullWidth}
               desc={desc}
               error={error}
               errorMessage={errorMessage}
               label="Hobbies">
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

export default { name: 'TextInput', component: Demo };