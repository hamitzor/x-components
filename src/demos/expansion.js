import React, { useState } from 'react';
import Panel from '../components/Panel';
import Expansion from '../components/Expansion';
import Flex from '../components/Flex';
import { propValues } from '../components/Expansion/Expansion';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles(theme => ({
   expansion: {
      marginBottom: 7
   },
   content: {
      color: theme.textColors.normal,
      padding: 10
   }
}));

const Demo = () => {
   const [type, setType] = useState('filled');
   const [color, setColor] = useState('primary');
   const [rounded, setRounded] = useState(true);
   const [animate, setAnimate] = useState(true);
   const [label, setLabel] = useState('Article');
   const classes = useStyles();
   const expansionProps = {
      type,
      color,
      rounded,
      animate
   };

   return (
      <div>
         <Settings
            onChange={{
               type: setType,
               color: setColor,
               rounded: setRounded,
               animate: setAnimate,
               label: setLabel
            }}
            values={{ type, color, rounded, animate, label }}
            settingsData={{
               props: [
                  { name: 'type', type: 'select', values: propValues.type },
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'rounded', type: 'bool' },
                  { name: 'animate', type: 'bool' },
                  { name: 'label', type: 'text' }
               ],
               variables: []
            }} />
         <Panel>
            <Flex container direction="column">
               {[1, 2, 3, 4].map(i =>
                  <Expansion key={i} className={classes.expansion} label={`${label} ${i}`} {...expansionProps}>
                     <div className={classes.content}>
                        <h1>This is heading 1</h1>
                        <h2>This is heading 2</h2>
                        <h3>This is heading 3</h3>
                     </div>
                  </Expansion>)}
            </Flex>
         </Panel>
      </div>
   );
};


export default { name: 'Expansion', component: Demo };