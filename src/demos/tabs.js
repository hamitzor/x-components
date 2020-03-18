import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';
import Panel from '../components/Panel';
import { propValues } from '../components/Icon/Icon';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles({
   container: {
      margin: 15,
   },
   tabs: {
      marginBottom: 40
   }
});
const Demo = () => {
   const [activeTab, setActiveTab] = useState(0);
   const [size, setSize] = useState(100);
   const classes = useStyles();

   return (
      <div>
         <Settings
            onChange={{
               size: setSize
            }}
            values={{ size }}
            settingsData={{
               props: [
                  { name: 'size', type: 'select', values: propValues.color },
               ],
               variables: []
            }} />
         <Panel className={classes.container}>
            <Tabs className={classes.tabs} type="default" active={activeTab} onChange={(e, id) => setActiveTab(id)}>
               {[0, 1, 2, 3, 4, 5].map(num => <Tab key={num} tabId={num}>{`Tab ${num + 1}`}</Tab>)}
            </Tabs>

            <Tabs className={classes.tabs} type="default" active={activeTab} onChange={(e, id) => setActiveTab(id)}>
               {[0, 1, 2, 3].map(num => <Tab key={num} tabId={num}>{`Tab ${num + 1}`}</Tab>)}
            </Tabs>
         </Panel>
      </div>
   );
};

export default { name: 'Tabs', component: Demo };