import React from 'react';
import { createUseStyles } from 'react-jss';


const Select = props => {
   const {
      propName,
      propValues,
      onChange,
      value
   } = props;
   return (
      <div className="row prop" key={propName}>
         <div>{propName}</div>
         <div>
            <select value={value} onChange={e => onChange({ [propName]: e.target.value })}>
               {propValues.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
         </div>
      </div>
   );
};

const Bool = props => {
   const {
      propName,
      onChange,
      value
   } = props;
   return (
      <div className="row prop" key={propName}>
         <div>{propName}</div>
         <div>
            <input type="radio" id={`${propName}-true`} name={propName} checked={true === value}
               onChange={e => onChange({ [propName]: true })} />
            <label htmlFor={`${propName}-true`}>true</label>
            <input type="radio" id={`${propName}-false`} name={propName} checked={false === value}
               onChange={e => onChange({ [propName]: false })} />
            <label htmlFor={`${propName}-false`}>false</label>
         </div>
      </div>
   );
};

const Text = props => {
   const {
      propName,
      onChange,
      value
   } = props;
   return (
      <div className="row prop" key={propName}>
         <div>{propName}</div>
         <div>
            <input type="text" value={value} onChange={e => onChange({ [propName]: e.target.value })} />
         </div>
      </div>
   );
};

const NumberInput = props => {
   const {
      propName,
      onChange,
      value
   } = props;
   return (
      <div className="row prop" key={propName}>
         <div>{propName}</div>
         <div>
            <input type="number" value={value} onChange={e => onChange({ [propName]: Number(e.target.value) })} />
         </div>
      </div>
   );
};

const useStyles = createUseStyles({
   buttonContainer: {
      margin: 10
   },
   settings: {
      display: 'flex',
   },
   optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: 10,
      border: '1px solid #ddd',
      width: '30%',
      '& select': {
         width: '100%'
      },

      '& div.row': {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         height: 30,
         padding: '5px 15px',
         '&.header': {
            color: '#fff',
            fontWeight: 600,
            backgroundColor: '#444'
         },
         '&:nth-child(2n+1).prop': {
            backgroundColor: '#eee'
         },
         '& div': {
            width: '50%'
         }
      },
      '& *': {
         fontFamily: 'monospace',
      }
   }
});

const Settings = props => {
   const {
      onChange,
      values,
      settingsData
   } = props;
   const classes = useStyles();
   return (
      <div className={classes.settings}>
         <div className={classes.optionsContainer}>
            <div className="row header" key="title">
               <div>Prop Name</div>
               <div>Prop Value</div>
            </div>
            {settingsData.props.map(({ propName, type, propValues }) => (
               type === 'select' ? (
                  <Select key={propName} propName={propName} propValues={propValues} onChange={onChange} value={values[propName]} />
               ) : type === 'bool' ? (
                  <Bool key={propName} propName={propName} onChange={onChange} value={values[propName]} />
               ) : type === 'text' ? (
                  <Text key={propName} propName={propName} onChange={onChange} value={values[propName]} />
               ) : <NumberInput key={propName} propName={propName} onChange={onChange} value={values[propName]} />
            ))}
         </div>
         <div className={classes.optionsContainer}>
            <div className="row header" key="title">
               <div>Variable Name</div>
               <div>Variable Value</div>
            </div>
            {settingsData.variables.map(({ variableName, type, variablesValues }) => (
               type === 'select' ? (
                  <Select key={variableName} propName={variableName} propValues={variablesValues} onChange={onChange} value={values[variableName]} />
               ) : type === 'bool' ? (
                  <Bool key={variableName} propName={variableName} onChange={onChange} value={values[variableName]} />
               ) : type === 'text' ? (
                  <Text key={variableName} propName={variableName} onChange={onChange} value={values[variableName]} />
               ) : <NumberInput key={variableName} propName={variableName} onChange={onChange} value={values[variableName]} />
            ))}
         </div>
      </div>
   );
};

export default Settings;