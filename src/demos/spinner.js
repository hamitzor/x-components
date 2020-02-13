import React, { useState } from 'react';
import render from './render';
import Spinner from '../components/Spinner';
import Panel from '../components/Panel';
import { propValues } from '../components/Spinner/Spinner';
import { createUseStyles } from 'react-jss';
import Settings from './Settings';

const useStyles = createUseStyles({
   spinnerContainer: {
      margin: 20,
   }
});

const Demo = () => {
   const [color, setColor] = useState('primary'),
      [visible, setVisible] = useState(true),
      [animate, setAnimate] = useState(true),
      [size, setSize] = useState(100);

   const classes = useStyles();
   return (
      <div>
         <Settings
            onChange={{
               color: setColor,
               visible: setVisible,
               animate: setAnimate,
               size: setSize
            }}
            values={{ color, visible, animate, size }}
            settingsData={{
               props: [
                  { name: 'color', type: 'select', values: propValues.color },
                  { name: 'visible', type: 'bool' },
                  { name: 'animate', type: 'bool' }
               ],
               variables: [
                  { name: 'size', type: 'number' }
               ]
            }} />
         <Panel
            className={classes.spinnerContainer}
            style={{ width: size, height: size }}>
            <Spinner
               color={color}
               visible={visible}
               animate={animate} />
         </Panel>
      </div>
   );
};

export default () => render(<Demo />, 'app');