import React from 'react';
import { createUseStyles } from 'react-jss';
import Panel from '../components/Panel';
import Color from 'color';

const Select = props => {
   const {
      propName,
      propValues,
      onChange,
      value
   } = props;
   return (
      <div className="row prop" key={propName}>
         <div style={{ fontFamily: 'Monospace', fontWeight: 600 }}>{propName}</div>
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
         <div style={{ fontFamily: 'Monospace', fontWeight: 600 }}>{propName}</div>
         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
               <input type="radio" id={`${propName}-true`} name={propName} checked={true === value}
                  onChange={e => onChange(true)} />
               <label htmlFor={`${propName}-true`}>true</label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <input type="radio" id={`${propName}-false`} name={propName} checked={false === value}
                  onChange={e => onChange(false)} />
               <label htmlFor={`${propName}-false`}>false</label>
            </div>
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
         <div style={{ fontFamily: 'Monospace', fontWeight: 600 }}>{propName}</div>
         <div>
            <input style={{ width: '100%' }} type="text" value={value} onChange={e => onChange(e.target.value)} />
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
         <div style={{ fontFamily: 'Monospace', fontWeight: 600 }}>{propName}</div>
         <div>
            <input style={{ width: '100%' }} type="number" value={value} onChange={e => onChange(Number(e.target.value))} />
         </div>
      </div>
   );
};

const SettingsSet = ({ name, data, classes, values, onChange }) => data.length > 0 && (
   <div className={classes.optionsContainer}>
      <div className="row header" key="title">
         <div>{name} Name</div>
         <div>{name} Value</div>
      </div>
      {data.map(({ name, type, values: possibleValues }) => (
         type === 'select' ? (
            <Select key={name} propName={name} propValues={possibleValues} onChange={onChange[name]} value={values[name]} />
         ) : type === 'bool' ? (
            <Bool key={name} propName={name} onChange={onChange[name]} value={values[name]} />
         ) : type === 'text' ? (
            <Text key={name} propName={name} onChange={onChange[name]} value={values[name]} />
         ) : <NumberInput key={name} propName={name} onChange={onChange[name]} value={values[name]} />
      ))}
   </div>);

const useStyles = createUseStyles(theme => ({
   settings: {
      display: 'flex',
      marginBottom: 15,
   },
   optionsContainer: {
      color: theme.textColors.normal,
      width: 600,
      display: 'flex',
      flexDirection: 'column',
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
            backgroundColor: theme.colors.primary[theme.decide('light', 'normal')],
            color: theme.textColors[Color(theme.colors.primary.dark).isLight() ? 'normal' : 'reversed'],
            fontWeight: 600,
         },
         '&:nth-child(2n).prop': {
            backgroundColor: theme.colors[theme.decide('darkgrey', 'lightgrey')][theme.decide('dark', 'disabled')],
         },
         '&:nth-child(2n+1).prop': {
            backgroundColor: theme.colors[theme.decide('darkgrey', 'lightgrey')][theme.decide('normal', 'light')],
         },
         '& div': {
            width: '50%'
         }
      },
      propName: {
         fontFamily: 'monospace',
      }
   }
}));

const Settings = props => {
   const {
      onChange,
      values,
      settingsData,
   } = props;
   const classes = useStyles();
   return (
      <Panel
         className={classes.settings}>
         <SettingsSet onChange={onChange} values={values} classes={classes} name="Prop" data={settingsData.props} />
         <SettingsSet onChange={onChange} values={values} classes={classes} name="Variable" data={settingsData.variables} />
      </Panel>
   );
};

export default Settings;