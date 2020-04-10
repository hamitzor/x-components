import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';
import Panel from '../components/Panel';
import { propValues } from '../components/Tabs/Tabs';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles({
   container: {
      margin: 15,
      maxWidth: 600
   },
   tabs: {
      marginBottom: 40
   }
});

const Demo = () => {
   const [activeTab, setActiveTab] = useState(1);
   const [color, setColor] = useState('primary');
   const [type, setType] = useState('default');
   const [rounded, setRounded] = useState(true);
   const [hideControls, setHideControls] = useState(false);
   const [tabName, setTabName] = useState('Tab');
   const classes = useStyles();

   return (
      <div>
         <Settings
            onChange={{
               color: setColor,
               type: setType,
               rounded: setRounded,
               hideControls: setHideControls,
               tabName: setTabName
            }}
            values={{ color, type, rounded, hideControls, tabName }}
            settingsData={{
               props: [
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'type', type: 'select', values: propValues.type },
                  { name: 'rounded', type: 'bool' },
                  { name: 'hideControls', type: 'bool' }
               ],
               variables: [
                  { name: 'tabName', type: 'text' }
               ]
            }} />
         <Panel className={classes.container}>
            <Tabs
               className={classes.tabs}
               hideControls={hideControls}
               color={color}
               type={type}
               rounded={rounded}
               active={activeTab}
               onChange={(e, id) => setActiveTab(id)}>
               {[1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14].map(num => <Tab key={num} tabId={num}>{`${tabName} ${num}`}</Tab>)}
            </Tabs>
            <Tabs
               className={classes.tabs}
               hideControls={hideControls}
               color={color}
               type={type}
               rounded={rounded}
               active={activeTab}
               onChange={(e, id) => setActiveTab(id)}>
               {[1, 2, 3].map(num => <Tab key={num} tabId={num}>{`${tabName} ${num}`}</Tab>)}
            </Tabs>
         </Panel>
      </div>
   );
};

export default { name: 'Tabs', component: Demo };