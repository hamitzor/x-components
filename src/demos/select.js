import React, { useState } from 'react';
import Input from '../components/Input';
import Panel from '../components/Panel';
import { propValues } from '../components/Input/Input';
import Settings from './Settings';
import Select from '../components/Select';

const Demo = () => {
   const [simple, setSimple] = useState(false);
   const [color, setColor] = useState('primary');
   const [fullWidth, setFullWidth] = useState(false);
   const [desc, setDesc] = useState('Die beste Stadt in Bayern');
   const [error, setError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [selectValue, setSelectValue] = useState('');
   const [disabled, setDisabled] = useState(false);
   const [maxOption, setMaxOption] = useState(7);

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
               disabled: setDisabled,
               maxOption: setMaxOption
            }}
            values={{ simple, color, fullWidth, desc, error, errorMessage, disabled, maxOption }}
            settingsData={{
               props: [
                  { name: 'simple', type: 'bool' },
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'fullWidth', type: 'bool' },
                  { name: 'desc', type: 'text' },
                  { name: 'error', type: 'bool' },
                  { name: 'errorMessage', type: 'text' },
                  { name: 'disabled', type: 'bool' },
                  { name: 'maxOption', type: 'number' },
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
               label="Stadt">
               <Select
                  onChange={e => setSelectValue(e.target.value)}
                  value={selectValue}
                  maxOption={Number(maxOption)}
                  disabled={disabled} >
                  {['München', 'Nürnberg', 'Augsburg', 'Regensburg', 'Ingolstadt', 'Würzburg', 'Fürth', 'Erlangen', 'Deggendorf'].map(val =>
                     <option key={val} value={val} >
                        {val}
                     </option>
                  )}
               </Select>
            </Input>
         </Panel>
      </div>
   );
};

export default { name: 'Select', component: Demo };