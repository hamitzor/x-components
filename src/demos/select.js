import React, { useState } from 'react';
import Input from '../components/Input';
import Panel from '../components/Panel';
import { propValues } from '../components/Input/Input';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';
import Select from '../components/Select';

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
      [desc, setDesc] = useState('Die beste Stadt in Bayern'),
      [error, setError] = useState(false),
      [errorMessage, setErrorMessage] = useState(''),
      [selectValue, setSelectValue] = useState(''),
      [disabled, setDisabled] = useState(false),
      [maxOption, setMaxOption] = useState(7),
      classes = useStyles();

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
         <Panel
            className={classes.inputContainer}>
            <Input
               simple={simple}
               color={color}
               fullWidth={fullWidth}
               desc={desc}
               error={error}
               errorMessage={errorMessage}
               label="Stadt">
               <Select onChange={e => setSelectValue(e.target.value)} value={selectValue} maxOption={Number(maxOption)} disabled={disabled} >
                  {['München', 'Nürnberg', 'Augsburg', 'Regensburg', 'Ingolstadt', 'Würzburg', 'Fürth', 'Erlangen', 'Plattling', 'Deggendorf'].map(val =>
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