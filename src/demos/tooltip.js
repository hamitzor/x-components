import React from 'react';
import Button from '../components/Button';
import Panel from '../components/Panel';
import Tooltip from '../components/Tooltip';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
   container: {
      display: 'inline-block',
      margin: 15,
      padding: 50
   },
   button: {
      margin: '30px'
   }
});
const Demo = () => {
   const classes = useStyles();
   const tooltipRef = React.createRef();

   return (
      <div>
         <Panel className={classes.container}>
            {['bottom', 'top', 'left', 'right'].map(position => 
               <Tooltip ref={tooltipRef} key={position} position={position} text='Cancel this operation'>
                  <Button className={classes.button} color="error" type="default">{position}</Button>
               </Tooltip>
            )}
         </Panel>
      </div >
   );
};

export default { name: 'Tooltip', component: Demo };