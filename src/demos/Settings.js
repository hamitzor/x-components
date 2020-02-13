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
            <select value={value} onChange={e => onChange(e.target.value)}>
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
               onChange={e => onChange(true)} />
            <label htmlFor={`${propName}-true`}>true</label>
            <input type="radio" id={`${propName}-false`} name={propName} checked={false === value}
               onChange={e => onChange(false)} />
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
            <input type="text" value={value} onChange={e => onChange(e.target.value)} />
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
            <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} />
         </div>
      </div>
   );
};

const SettingsSet = ({ name, data, classes, values, onChange }) => data.length > 0 && (
   <div
      className={classes.optionsContainer}>
      <div
         className="row header"
         key="title">
         <div>{name} Name</div>
         <div>{name} Value</div>
      </div>
      {data.map(({ name, type, values: possibleValues }) => (
         type === 'select' ? (
            <Select
               key={name}
               propName={name}
               propValues={possibleValues}
               onChange={onChange[name]}
               value={values[name]} />
         ) : type === 'bool' ? (
            <Bool
               key={name}
               propName={name}
               onChange={onChange[name]}
               value={values[name]} />
         ) : type === 'text' ? (
            <Text
               key={name}
               propName={name}
               onChange={onChange[name]}
               value={values[name]} />
         ) : <NumberInput
                     key={name}
                     propName={name}
                     onChange={onChange[name]}
                     value={values[name]} />
      ))}
   </div>);

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
      border: '1px solid #ddd',
      width: '35%',
      '& select': {
         width: '100%'
      },
      '&:nth-child(2)': {
         marginLeft: 20
      },
      '& div.row': {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         padding: '5px 15px',
         '&.header': {
            color: '#fff',
            fontWeight: 600,
            backgroundColor: '#444',
            '& div': {
               fontFamily: 'Roboto'
            }
         },
         '&:nth-child(2n).prop': {
            backgroundColor: '#fff'
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
      <div
         className={classes.settings}>
         <SettingsSet onChange={onChange} values={values} classes={classes} name="Prop" data={settingsData.props} />
         <SettingsSet onChange={onChange} values={values} classes={classes} name="Variable" data={settingsData.variables} />
      </div>
   );
};

export default Settings;